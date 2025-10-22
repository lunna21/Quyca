"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Eye, Phone, Wind } from "lucide-react"

interface SafetyManualModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SafetyManualModal({ isOpen, onClose }: SafetyManualModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">📋 Manual de Seguridad</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  En caso de incendio
                </CardTitle>
              </CardHeader>
              <CardContent className="text-red-700">
                <ol className="list-decimal list-inside space-y-2 text-base">
                  <li>
                    <strong>Mantenga la calma</strong> y evalúe la situación
                  </li>
                  <li>
                    <strong>Llame inmediatamente</strong> a los bomberos (119)
                  </li>
                  <li>
                    <strong>Evacue el área</strong> de manera ordenada
                  </li>
                  <li>
                    <strong>No use ascensores</strong>, use las escaleras
                  </li>
                  <li>
                    <strong>Reúnase en el punto de encuentro</strong> designado
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Eye className="h-5 w-5" />
                  Señales de alerta
                </CardTitle>
              </CardHeader>
              <CardContent className="text-orange-700">
                <ul className="list-disc list-inside space-y-2 text-base">
                  <li>
                    <strong>Humo visible</strong> en el área
                  </li>
                  <li>
                    <strong>Olor a quemado</strong> persistente
                  </li>
                  <li>
                    <strong>Temperatura elevada</strong> {">35°C"}
                  </li>
                  <li>
                    <strong>Chispas o llamas</strong> visibles
                  </li>
                  <li>
                    <strong>Sonidos inusuales</strong> (crepitación)
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Wind className="h-5 w-5" />
                  Prevención
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700">
                <ul className="list-disc list-inside space-y-2 text-base">
                  <li>
                    <strong>Mantenga limpia</strong> el área de vegetación seca
                  </li>
                  <li>
                    <strong>No fume</strong> en áreas de riesgo
                  </li>
                  <li>
                    <strong>Revise regularmente</strong> el sistema QUYCA
                  </li>
                  <li>
                    <strong>Reporte inmediatamente</strong> cualquier anomalía
                  </li>
                  <li>
                    <strong>Mantenga despejadas</strong> las rutas de evacuación
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Phone className="h-5 w-5" />
                  Números importantes
                </CardTitle>
              </CardHeader>
              <CardContent className="text-green-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                  <div>
                    <strong>Bomberos:</strong> 119
                    <br />
                    <strong>Policía:</strong> 123
                    <br />
                    <strong>Cruz Roja:</strong> 132
                  </div>
                  <div>
                    <strong>QUYCA Soporte:</strong>
                    <br />
                    +57-1-234-5678
                    <br />
                    <strong>Email:</strong> emergencias@quyca.com
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
        <Button onClick={onClose} className="w-full text-lg h-12">
          Cerrar Manual
        </Button>
      </DialogContent>
    </Dialog>
  )
}
