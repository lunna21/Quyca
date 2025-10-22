"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Settings, Bell, Thermometer, Camera } from "lucide-react"

interface ConfigurationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ConfigurationModal({ isOpen, onClose }: ConfigurationModalProps) {
  const [notifications, setNotifications] = useState(true)
  const [autoPhoto, setAutoPhoto] = useState(false)
  const [tempThreshold, setTempThreshold] = useState([35])
  const [updateInterval, setUpdateInterval] = useState([30])

  const handleSave = () => {
    // Save configuration logic here
    console.log("[v0] Configuration saved:", {
      notifications,
      autoPhoto,
      tempThreshold: tempThreshold[0],
      updateInterval: updateInterval[0],
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Settings className="h-6 w-6" />
            ⚙️ Configuración
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-5 w-5" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="text-base">
                  Alertas automáticas
                </Label>
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-photo" className="text-base">
                  Foto automática en alerta
                </Label>
                <Switch id="auto-photo" checked={autoPhoto} onCheckedChange={setAutoPhoto} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Thermometer className="h-5 w-5" />
                Temperatura
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base">Umbral de alerta: {tempThreshold[0]}°C</Label>
                <Slider
                  value={tempThreshold}
                  onValueChange={setTempThreshold}
                  max={50}
                  min={25}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-base">Intervalo de actualización: {updateInterval[0]} segundos</Label>
                <Slider
                  value={updateInterval}
                  onValueChange={setUpdateInterval}
                  max={120}
                  min={10}
                  step={10}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Camera className="h-5 w-5" />
                Cámara
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor="camera-quality" className="text-base">
                  Calidad de imagen
                </Label>
                <select id="camera-quality" className="w-full p-2 border rounded-md text-base" defaultValue="high">
                  <option value="low">Baja (rápida)</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta (recomendada)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleSave} className="flex-1 text-lg h-12">
              Guardar Configuración
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 text-lg h-12 bg-transparent">
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
