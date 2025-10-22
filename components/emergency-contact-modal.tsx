"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MapPin, Clock } from "lucide-react"

interface EmergencyContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EmergencyContactModal({ isOpen, onClose }: EmergencyContactModalProps) {
  const [calling, setCalling] = useState(false)

  const handleEmergencyCall = (number: string) => {
    setCalling(true)
    // Simulate calling
    setTimeout(() => {
      setCalling(false)
      // In a real app, this would initiate a phone call
      window.open(`tel:${number}`, "_self")
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">📞 Contactos de Emergencia</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-bold text-red-800">Bomberos</h3>
              </div>
              <p className="text-red-700 mb-3">Emergencias de incendio</p>
              <Button
                onClick={() => handleEmergencyCall("119")}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg h-12"
                disabled={calling}
              >
                {calling ? "Llamando..." : "Llamar 119"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-bold text-blue-800">Policía</h3>
              </div>
              <p className="text-blue-700 mb-3">Emergencias generales</p>
              <Button
                onClick={() => handleEmergencyCall("123")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12"
                disabled={calling}
              >
                {calling ? "Llamando..." : "Llamar 123"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-bold text-green-800">Centro de Control QUYCA</h3>
              </div>
              <p className="text-green-700 mb-3">Soporte técnico 24/7</p>
              <Button
                onClick={() => handleEmergencyCall("+57-1-234-5678")}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg h-12"
                disabled={calling}
              >
                {calling ? "Llamando..." : "Llamar Soporte"}
              </Button>
            </CardContent>
          </Card>

          <Button onClick={onClose} variant="outline" className="w-full text-lg h-12 bg-transparent">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
