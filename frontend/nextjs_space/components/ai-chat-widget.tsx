
'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Bot, ShieldCheck, Trash2, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AIChat } from '@/components/ai-chat'
import { motion, AnimatePresence } from 'framer-motion'

const TEASER_MESSAGES = [
  "¿Dudas sobre presupuesto y proyectos?",
  "Consulta contratos y gastos públicos",
  "Pregunta por proyectos en tu comuna"
]

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [currentTeaser, setCurrentTeaser] = useState(0)
  const [showTeaser, setShowTeaser] = useState(true)
  const chatRef = useRef<any>(null)

  // Rotar teasers cada 4 segundos
  useEffect(() => {
    if (!isOpen && showTeaser) {
      const interval = setInterval(() => {
        setCurrentTeaser((prev) => (prev + 1) % TEASER_MESSAGES.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isOpen, showTeaser])

  // Ocultar teaser después de 15 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(false)
    }, 15000)
    return () => clearTimeout(timer)
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
    setShowTeaser(false)
  }

  const handleClearConversation = () => {
    if (chatRef.current?.clearConversation) {
      chatRef.current.clearConversation()
    }
  }

  return (
    <>
      {/* Teasers animados */}
      <AnimatePresence>
        {!isOpen && showTeaser && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <motion.div
              key={currentTeaser}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-2xl px-4 py-3 max-w-[280px] border-2 border-blue-200"
            >
              <p className="text-sm text-gray-700 font-medium">
                {TEASER_MESSAGES[currentTeaser]}
              </p>
              <div className="flex gap-1 mt-2">
                {TEASER_MESSAGES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === currentTeaser ? 'bg-blue-600 w-6' : 'bg-gray-300 w-1'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button con Avatar */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={handleOpen}
              size="lg"
              className="h-16 w-16 rounded-full shadow-2xl hover:scale-110 transition-transform bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 relative overflow-hidden group"
              aria-label="Abrir asistente de IA"
            >
              {/* Avatar animado */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 rounded-full animate-pulse" />
                <Bot className="h-8 w-8 text-white relative z-10" />
              </div>
              {/* Indicador de "conectado" */}
              <span className="absolute bottom-1 right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed ${
              isMaximized 
                ? 'inset-4' 
                : 'bottom-6 right-6 w-[420px] max-w-[calc(100vw-3rem)]'
            } z-50 transition-all duration-300`}
          >
            <Card className={`shadow-2xl border-2 border-blue-200 ${
              isMaximized ? 'h-full' : 'h-[650px] max-h-[calc(100vh-8rem)]'
            } flex flex-col`}>
              {/* Header mejorado */}
              <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar del bot */}
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      {/* Indicador de estado "conectado" */}
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">Asistente Lumen</CardTitle>
                      <p className="text-xs text-blue-100 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Conectado y listo para ayudar
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Botón para borrar conversación */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearConversation}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                      aria-label="Borrar conversación"
                      title="Borrar conversación"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {/* Botón para maximizar/minimizar */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMaximized(!isMaximized)}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                      aria-label={isMaximized ? "Minimizar" : "Maximizar"}
                    >
                      {isMaximized ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </Button>
                    {/* Botón para cerrar */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                      aria-label="Cerrar chat"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Chat Content */}
              <CardContent className="p-0 flex-1 overflow-hidden flex flex-col min-h-0 bg-gray-50">
                <AIChat 
                  ref={chatRef}
                  placeholder="Escribe tu pregunta aquí..."
                  showHeader={false}
                  compact={true}
                />
              </CardContent>

              {/* Footer con información de accesibilidad */}
              <div className="px-4 py-2 bg-gray-100 border-t text-xs text-gray-500 text-center flex-shrink-0">
                Usa Tab para navegar • Presiona Esc para cerrar
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
