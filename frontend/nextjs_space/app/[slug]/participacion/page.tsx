
'use client'

import { useParams } from 'next/navigation'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Send,
  TrendingUp,
  Users,
  AlertCircle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ParticipacionPage() {
  const { toast } = useToast()
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initiatives = [
    {
      id: 1,
      title: 'Nuevo Parque Comunal en Sector Norte',
      description: 'Propuesta para construir un parque de 5 hectáreas con áreas verdes, juegos infantiles y canchas deportivas',
      category: 'Infraestructura',
      votes: { favor: 1234, contra: 89 },
      comments: 45,
      status: 'voting',
      endDate: new Date(Date.now() + 604800000).toISOString()
    },
    {
      id: 2,
      title: 'Ampliación de Horarios de Biblioteca Municipal',
      description: 'Extender horario de atención hasta las 22:00 horas y abrir los sábados',
      category: 'Educación',
      votes: { favor: 892, contra: 156 },
      comments: 28,
      status: 'voting',
      endDate: new Date(Date.now() + 259200000).toISOString()
    },
    {
      id: 3,
      title: 'Programa de Reciclaje Domiciliario',
      description: 'Implementar sistema de recolección diferenciada de residuos en todos los sectores',
      category: 'Medio Ambiente',
      votes: { favor: 2156, contra: 234 },
      comments: 67,
      status: 'approved',
      endDate: new Date(Date.now() - 86400000).toISOString()
    }
  ]

  const handleVote = (initiativeId: number, voteType: 'favor' | 'contra') => {
    toast({
      title: 'Voto Registrado',
      description: `Tu voto ${voteType === 'favor' ? 'a favor' : 'en contra'} ha sido registrado`,
    })
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    setIsSubmitting(true)
    
    setTimeout(() => {
      toast({
        title: 'Comentario Enviado',
        description: 'Tu comentario ha sido publicado exitosamente',
      })
      setComment('')
      setIsSubmitting(false)
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    const config = {
      voting: { label: 'Votación Activa', variant: 'default' as const },
      approved: { label: 'Aprobada', variant: 'default' as const },
      rejected: { label: 'Rechazada', variant: 'destructive' as const }
    }

    const { label, variant } = config[status as keyof typeof config] || config.voting
    return <Badge variant={variant}>{label}</Badge>
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Participación Ciudadana</h1>
        <p className="text-muted-foreground">
          Vota y comenta sobre propuestas e iniciativas municipales
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Iniciativas Activas</p>
                <p className="text-3xl font-bold text-blue-600">12</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Participantes</p>
                <p className="text-3xl font-bold text-green-600">3,456</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Comentarios</p>
                <p className="text-3xl font-bold text-purple-600">892</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Iniciativas */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Iniciativas para Votación</h2>
        
        {initiatives.map((initiative) => (
          <Card key={initiative.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{initiative.title}</CardTitle>
                    {getStatusBadge(initiative.status)}
                    <Badge variant="outline">{initiative.category}</Badge>
                  </div>
                  <CardDescription className="text-base">
                    {initiative.description}
                  </CardDescription>
                  {initiative.status === 'voting' && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Votación cierra: {new Date(initiative.endDate).toLocaleDateString('es-CL')}
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Resultados de votación */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Resultados</span>
                  <span className="text-sm text-muted-foreground">
                    {initiative.votes.favor + initiative.votes.contra} votos totales
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <ThumbsUp className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">A Favor</span>
                        <span className="text-sm text-green-600 font-medium">
                          {initiative.votes.favor} votos
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-600"
                          style={{ 
                            width: `${(initiative.votes.favor / (initiative.votes.favor + initiative.votes.contra)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <ThumbsDown className="h-5 w-5 text-red-600" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">En Contra</span>
                        <span className="text-sm text-red-600 font-medium">
                          {initiative.votes.contra} votos
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-600"
                          style={{ 
                            width: `${(initiative.votes.contra / (initiative.votes.favor + initiative.votes.contra)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              {initiative.status === 'voting' && (
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    onClick={() => handleVote(initiative.id, 'favor')}
                    className="flex-1"
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Votar a Favor
                  </Button>
                  <Button
                    onClick={() => handleVote(initiative.id, 'contra')}
                    variant="outline"
                    className="flex-1"
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Votar en Contra
                  </Button>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                <MessageSquare className="h-4 w-4" />
                <span>{initiative.comments} comentarios</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Formulario de comentario */}
      <Card>
        <CardHeader>
          <CardTitle>Deja tu Comentario</CardTitle>
          <CardDescription>
            Comparte tu opinión sobre las iniciativas municipales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Tu Comentario</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe tu comentario aquí..."
                rows={4}
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" disabled={isSubmitting || !comment.trim()}>
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Enviando...' : 'Enviar Comentario'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Información */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-blue-800">
            <AlertCircle className="h-5 w-5" />
            Cómo Funciona la Participación
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• Cada ciudadano puede votar una vez por iniciativa</p>
          <p>• Los comentarios son moderados antes de ser publicados</p>
          <p>• Las iniciativas con más del 60% de aprobación son implementadas</p>
          <p>• Puedes seguir el progreso de iniciativas aprobadas en la sección de Proyectos</p>
        </CardContent>
      </Card>
    </div>
  )
}
