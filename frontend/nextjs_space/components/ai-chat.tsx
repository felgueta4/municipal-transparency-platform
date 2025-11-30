
'use client'

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Bot, User, Loader2, Sparkles, ExternalLink, MapPin, Calendar, DollarSign, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIChatProps {
  context?: string
  placeholder?: string
  title?: string
  description?: string
  showHeader?: boolean
  compact?: boolean
}

// Chips de sugerencias mejorados
const SUGGESTION_CHIPS = [
  { text: "Presupuesto 2025", icon: DollarSign },
  { text: "Proyectos en Renca", icon: MapPin },
  { text: "Contratos vigentes", icon: Calendar }
]

// Acciones rápidas
const QUICK_ACTIONS = [
  { text: "Ver panel de proyectos", link: "/ciudadano/proyectos" },
  { text: "Consultar mapas", link: "/ciudadano/mapas" }
]

export const AIChat = forwardRef(({ 
  context, 
  placeholder = "Pregunta sobre presupuestos, gastos, proyectos o contratos...",
  title = "Consulta Inteligente",
  description = "Haz preguntas en lenguaje natural sobre los datos municipales",
  showHeader = true,
  compact = false
}: AIChatProps, ref) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [botStatus, setBotStatus] = useState<'idle' | 'thinking' | 'typing'>('idle')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Cargar conversación del localStorage (persistencia)
  useEffect(() => {
    const savedMessages = localStorage.getItem('lumen-chat-history')
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })))
      } catch (e) {
        console.error('Error loading chat history:', e)
      }
    }
  }, [])

  // Guardar conversación en localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('lumen-chat-history', JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll al final
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Exponer función para borrar conversación
  useImperativeHandle(ref, () => ({
    clearConversation: () => {
      setMessages([])
      localStorage.removeItem('lumen-chat-history')
    }
  }))

  // Manejar tecla Esc para cerrar (accesibilidad)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && compact) {
        // Cerrar widget si está en modo compact
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [compact])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setBotStatus('thinking')

    try {
      const response = await fetch('/api/ai-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.content,
          context
        }),
      })

      if (!response.ok) {
        throw new Error('Error al procesar la consulta')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''
      
      const assistantMsgId = (Date.now() + 1).toString()
      setMessages(prev => [...prev, {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }])

      setBotStatus('typing')

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content || ''
              if (content) {
                assistantMessage += content
                setMessages(prev => prev.map(msg => 
                  msg.id === assistantMsgId 
                    ? { ...msg, content: assistantMessage }
                    : msg
                ))
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      setBotStatus('idle')

    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo.',
        timestamp: new Date()
      }])
      setBotStatus('idle')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChipClick = (text: string) => {
    setInput(text)
  }

  if (compact) {
    return (
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-1 p-3" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-4">
              <div className="relative">
                <Bot className="h-14 w-14 text-blue-600" />
                <TrendingUp className="h-6 w-6 text-green-500 absolute -bottom-1 -right-1" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-base">¡Bienvenido/a!</h3>
                <p className="text-xs text-muted-foreground px-4">
                  Pregunta sobre presupuestos, gastos, proyectos y contratos públicos de tu municipalidad
                </p>
              </div>

              {/* Chips de sugerencias */}
              <div className="w-full space-y-2 mt-4">
                <p className="text-xs font-medium text-gray-500">Sugerencias:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTION_CHIPS.map((chip, i) => {
                    const Icon = chip.icon
                    return (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="h-auto py-2 px-3 text-xs hover:bg-blue-50 hover:border-blue-300 transition-colors"
                        onClick={() => handleChipClick(chip.text)}
                      >
                        <Icon className="h-3 w-3 mr-1.5" />
                        {chip.text}
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className="w-full space-y-2 mt-4 pt-4 border-t">
                <p className="text-xs font-medium text-gray-500">Acciones rápidas:</p>
                <div className="space-y-2">
                  {QUICK_ACTIONS.map((action, i) => (
                    <a
                      key={i}
                      href={action.link}
                      className="flex items-center justify-between w-full text-left text-xs py-2 px-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-colors group"
                    >
                      <span className="font-medium text-blue-700">{action.text}</span>
                      <ExternalLink className="h-3 w-3 text-blue-500 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex gap-2 items-start",
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border border-blue-300">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-xl px-3 py-2.5 max-w-[85%] shadow-sm",
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                        : 'bg-white border border-gray-200'
                    )}
                  >
                    <p className="text-xs whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <span className={cn(
                      "text-[10px] mt-1.5 block",
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                    )}>
                      {message.timestamp.toLocaleTimeString('es-CL', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-start"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border border-blue-300">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                      <span className="text-xs text-gray-500">
                        {botStatus === 'thinking' ? 'Consultando datos...' : 'Escribiendo...'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </ScrollArea>
        <div className="border-t p-3 bg-white">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              disabled={isLoading}
              className="flex-1 text-sm h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              aria-label="Escribe tu pregunta"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()} 
              size="sm" 
              className="h-10 px-4 bg-blue-600 hover:bg-blue-700"
              aria-label="Enviar mensaje"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    )
  }

  // Versión no compacta (para usar en páginas)
  return (
    <Card className="w-full">
      {showHeader && (
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="text-blue-100">{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <Bot className="h-16 w-16 text-blue-600 opacity-50" />
              <div>
                <h3 className="font-semibold text-lg mb-2">¡Hola! Estoy aquí para ayudarte</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Puedes preguntarme sobre presupuestos, gastos, proyectos y contratos municipales
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Preguntas sugeridas:</p>
                  {SUGGESTION_CHIPS.map((chip, i) => {
                    const Icon = chip.icon
                    return (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start h-auto py-2 px-3"
                        onClick={() => handleChipClick(chip.text)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {chip.text}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 items-start",
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 max-w-[80%]",
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className={cn(
                      "text-xs mt-1 block",
                      message.role === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                    )}>
                      {message.timestamp.toLocaleTimeString('es-CL', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
})

AIChat.displayName = 'AIChat'
