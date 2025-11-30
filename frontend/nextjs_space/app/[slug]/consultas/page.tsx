
'use client'

import { useParams } from 'next/navigation'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, TrendingUp, DollarSign, Briefcase, FileText, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SUGGESTED_QUERIES = [
  {
    icon: DollarSign,
    text: '¿Cuál es el presupuesto total de este año?',
    category: 'Presupuestos'
  },
  {
    icon: TrendingUp,
    text: '¿Cuánto se ha gastado en educación?',
    category: 'Gastos'
  },
  {
    icon: Briefcase,
    text: '¿Qué proyectos están en ejecución?',
    category: 'Proyectos'
  },
  {
    icon: FileText,
    text: '¿Cuáles son los contratos más recientes?',
    category: 'Contratos'
  }
]

export default function ConsultasIAPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy tu asistente virtual de transparencia municipal. Puedo ayudarte a consultar información sobre presupuestos, gastos, proyectos y contratos. ¿Qué te gustaría saber?',
      timestamp: new Date(2024, 0, 1)
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSuggestedQuery = (query: string) => {
    setInput(query)
    textareaRef.current?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Math.floor(Math.random() * 1000000).toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(2024, 0, 1)
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: userMessage.content,
          conversationHistory: messages 
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''
      
      const assistantMessageId = (Math.floor(Math.random() * 1000000) + 1).toString()
      setMessages(prev => [...prev, {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(2024, 0, 1)
      }])

      if (reader) {
        let partialRead = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          partialRead += decoder.decode(value, { stream: true })
          let lines = partialRead.split('\n')
          partialRead = lines.pop() || ''

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') continue

              try {
                const parsed = JSON.parse(data)
                const content = parsed.choices?.[0]?.delta?.content || ''
                if (content) {
                  assistantContent += content
                  setMessages(prev => prev.map(msg => 
                    msg.id === assistantMessageId 
                      ? { ...msg, content: assistantContent }
                      : msg
                  ))
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        id: Math.floor(Math.random() * 1000000).toString(),
        role: 'assistant',
        content: 'Lo siento, ocurrió un error al procesar tu consulta. Por favor, intenta nuevamente.',
        timestamp: new Date(2024, 0, 1)
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Consultas con IA
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Pregunta sobre presupuestos, gastos, proyectos y contratos en lenguaje natural. 
            La IA analizará los datos reales y te proporcionará respuestas precisas.
          </p>
        </div>

        {/* Suggested Queries - solo mostrar si es el primer mensaje */}
        {messages.length === 1 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Consultas sugeridas:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SUGGESTED_QUERIES.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuery(query.text)}
                  className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all text-left group"
                >
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <query.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-2">{query.category}</Badge>
                    <p className="text-sm text-gray-700">{query.text}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Container */}
        <Card className="bg-white shadow-xl border-0">
          <div className="h-[500px] overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700' 
                    : 'bg-gradient-to-br from-purple-600 to-purple-700'
                } rounded-full p-2`}>
                  {message.role === 'user' ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-white" />
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex-1 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}>
                  <div className={`inline-block max-w-[80%] px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString('es-CL', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-full p-2">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-4 py-3 rounded-2xl bg-gray-100">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                      <span className="text-gray-600">Analizando tu consulta...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4 bg-gray-50">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                placeholder="Escribe tu consulta aquí... (presiona Enter para enviar)"
                className="flex-1 min-h-[60px] resize-none"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="icon"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              La IA analiza datos reales de presupuestos, gastos, proyectos y contratos municipales.
            </p>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Inteligente</h3>
                <p className="text-sm text-blue-700">
                  Comprende preguntas en lenguaje natural
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 mb-1">Preciso</h3>
                <p className="text-sm text-purple-700">
                  Respuestas basadas en datos reales
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Disponible 24/7</h3>
                <p className="text-sm text-green-700">
                  Consulta información en cualquier momento
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
