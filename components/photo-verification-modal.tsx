"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, CheckCircle, XCircle, RotateCcw } from "lucide-react"

interface PhotoVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerification: (hasFire: boolean) => void
}

export function PhotoVerificationModal({ isOpen, onClose, onVerification }: PhotoVerificationModalProps) {
  const [isCapturing, setIsCapturing] = useState(false)
  const [photoTaken, setPhotoTaken] = useState(false)
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null)

  const handleTakePhoto = () => {
    setIsCapturing(true)
    // Simulate photo capture process
    setTimeout(() => {
      setIsCapturing(false)
      setPhotoTaken(true)
    }, 2000)
  }

  const handleVerification = (hasFire: boolean) => {
    setVerificationResult(hasFire)
    onVerification(hasFire)

    // Close modal after showing result briefly
    setTimeout(() => {
      handleClose()
    }, 2000)
  }

  const handleClose = () => {
    setIsCapturing(false)
    setPhotoTaken(false)
    setVerificationResult(null)
    onClose()
  }

  const handleRetakePhoto = () => {
    setPhotoTaken(false)
    setVerificationResult(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">📸 Verificación Visual</DialogTitle>
          <DialogDescription className="text-center text-base">
            Tome una foto del área para verificar si existe un incendio
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Photo Display Area */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                {isCapturing ? (
                  <div className="text-center space-y-4">
                    <Camera className="h-16 w-16 text-primary animate-pulse mx-auto" />
                    <p className="text-lg font-medium">Capturando foto...</p>
                  </div>
                ) : photoTaken ? (
                  <>
                    {/* Simulated photo - using placeholder */}
                    <img
                      src="/forest-area-with-trees-and-vegetation-for-fire-mon.jpg"
                      alt="Foto capturada del área de monitoreo"
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Foto capturada
                      </Badge>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
                    <p className="text-lg text-muted-foreground">Presione el botón para tomar la foto</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            {!photoTaken && !isCapturing && (
              <Button onClick={handleTakePhoto} size="lg" className="w-full h-14 text-lg font-bold">
                <Camera className="h-6 w-6 mr-2" />
                Tomar Foto
              </Button>
            )}

            {photoTaken && verificationResult === null && (
              <>
                <div className="text-center space-y-4">
                  <p className="text-lg font-medium">¿Observa signos de incendio en la imagen?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleVerification(false)}
                      size="lg"
                      variant="outline"
                      className="h-14 text-lg font-bold border-green-200 hover:bg-green-50 hover:border-green-300"
                    >
                      <CheckCircle className="h-6 w-6 mr-2 text-green-600" />🟢 No hay incendio
                    </Button>
                    <Button
                      onClick={() => handleVerification(true)}
                      size="lg"
                      variant="destructive"
                      className="h-14 text-lg font-bold"
                    >
                      <XCircle className="h-6 w-6 mr-2" />🔴 Sí hay incendio
                    </Button>
                  </div>
                </div>

                <Button onClick={handleRetakePhoto} variant="outline" size="lg" className="w-full bg-transparent">
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Tomar otra foto
                </Button>
              </>
            )}

            {verificationResult !== null && (
              <div className="text-center space-y-4">
                <div
                  className={`p-6 rounded-lg ${verificationResult ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"}`}
                >
                  {verificationResult ? (
                    <>
                      <XCircle className="h-12 w-12 text-red-600 mx-auto mb-2" />
                      <p className="text-xl font-bold text-red-800">🔴 INCENDIO DETECTADO</p>
                      <p className="text-red-700">Se ha registrado la alerta. Contacte inmediatamente a emergencias.</p>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <p className="text-xl font-bold text-green-800">🟢 ÁREA SEGURA</p>
                      <p className="text-green-700">No se detectaron signos de incendio. Verificación completada.</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
