"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TemperatureChart } from "@/components/temperature-chart";
import { AlertHistory } from "@/components/alert-history";
import { PhotoVerificationModal } from "@/components/photo-verification-modal";
import { EmergencyContactModal } from "@/components/emergency-contact-modal";
import { SafetyManualModal } from "@/components/safety-manual-modal";
import { ConfigurationModal } from "@/components/configuration-modal";
import {
  Camera,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";

const generateTemperatureData = () => {
  const now = new Date();
  const data = [];
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const baseTemp = 22 + Math.sin(i * 0.3) * 8;

    // Generate OHLC data for each hour
    const open = baseTemp + Math.random() * 4 - 2;
    const close = baseTemp + Math.random() * 4 - 2;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 2;

    data.push({
      time: time.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      open: Math.round(open * 10) / 10,
      high: Math.round(high * 10) / 10,
      low: Math.round(low * 10) / 10,
      close: Math.round(close * 10) / 10,
      isRising: close > open,
    });
  }
  return data;
};

const getRiskLevel = (temperature: number) => {
  if (temperature >= 45)
    return { level: "Crítico", color: "destructive", icon: XCircle };
  if (temperature >= 35)
    return { level: "Riesgo", color: "secondary", icon: AlertTriangle };
  return { level: "Normal", color: "chart-1", icon: CheckCircle };
};

export default function QUYCADashboard() {
  const [currentTemp, setCurrentTemp] = useState<number | null>(null); // Inicializar como null
  const [temperatureData, setTemperatureData] = useState<any[]>([]); // Array vacío inicial
  const [isClient, setIsClient] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  useEffect(() => {
    // Marcar que estamos en el cliente
    setIsClient(true);

    // Inicializar datos solo en el cliente
    setCurrentTemp(28.5);
    setTemperatureData(generateTemperatureData());
  }, []);

  useEffect(() => {
    if (!isClient) return; // No ejecutar en servidor

    const interval = setInterval(() => {
      const newTemp = 22 + Math.sin(Date.now() * 0.001) * 8 + Math.random() * 4;
      setCurrentTemp(Math.round(newTemp * 10) / 10);

      if (Math.random() < 0.1) {
        setTemperatureData(generateTemperatureData());
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isClient]);

  // Mostrar loading mientras hidrata
  if (!isClient || currentTemp === null) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Cargando dashboard...</div>
        </div>
      </div>
    );
  }

  const riskInfo = getRiskLevel(currentTemp);
  const RiskIcon = riskInfo.icon;

  const handlePhotoCapture = () => {
    setIsPhotoModalOpen(true);
  };

  const handleVerification = (hasFire: boolean) => {
    // Here you could add logic to save the verification result
    console.log("[v0] Fire verification result:", hasFire);

    // You could also trigger an alert or update the alert history
    if (hasFire) {
      // Add emergency alert logic here
      console.log("[v0] Emergency alert triggered!");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <Image
              src="/quyca-logo.png"
              alt="QUYCA Logo"
              width={500}
              height={20}
              className="h-16 w-auto"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            QUYCA
          </h1>
          <p className="text-lg text-muted-foreground">
            Sistema de monitoreo en tiempo real para prevención de incendios
          </p>
        </header>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Temperature Display */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Thermometer className="h-8 w-8 text-primary" />
                  Temperatura Actual
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-8xl md:text-9xl font-bold text-primary tabular-nums">
                  {currentTemp}°C
                </div>
                <div className="flex items-center justify-center gap-3">
                  <RiskIcon
                    className={`h-8 w-8 ${
                      riskInfo.color === "destructive"
                        ? "text-destructive"
                        : riskInfo.color === "secondary"
                        ? "text-secondary"
                        : "text-chart-1"
                    }`}
                  />
                  <Badge
                    variant={
                      riskInfo.color === "destructive"
                        ? "destructive"
                        : "secondary"
                    }
                    className={`text-xl px-6 py-2 font-bold ${
                      riskInfo.color === "chart-1"
                        ? "bg-chart-1 text-white hover:bg-chart-1/90"
                        : ""
                    }`}
                  >
                    {riskInfo.level}
                  </Badge>
                </div>

                {/* Risk Level Explanations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Alert className="border-green-500 bg-green-50">
                    <CheckCircle className="h-5 w-5 text-green-700" />
                    <AlertDescription className="text-base font-medium text-green-800">
                      🟢 <strong>Normal:</strong> Temperatura segura (&lt;35°C)
                    </AlertDescription>
                  </Alert>
                  <Alert className="border-yellow-500 bg-yellow-50">
                    <AlertTriangle className="h-5 w-5 text-yellow-700" />
                    <AlertDescription className="text-base font-medium text-yellow-800">
                      🟡 <strong>Riesgo:</strong> Temperatura elevada (≥45°C)
                    </AlertDescription>
                  </Alert>
                  <Alert className="border-red-500 bg-red-50">
                    <XCircle className="h-5 w-5 text-red-700" />
                    <AlertDescription className="text-base font-medium text-red-800">
                      🔴 <strong>Crítico:</strong> Peligro de incendio (≥100°C)
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Temperature Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Evolución de Temperatura (24 horas)
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Gráfico de velas mostrando temperaturas máximas, mínimas y
                  tendencias por hora
                </p>
              </CardHeader>
              <CardContent>
                <TemperatureChart data={temperatureData} />
              </CardContent>
            </Card>
          </div>

          {/* Verification and Actions */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  Verificación Visual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handlePhotoCapture}
                  size="lg"
                  className="w-full h-16 text-lg font-bold"
                >
                  <Camera className="h-6 w-6 mr-2" />
                  📸 Tomar foto de verificación
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Use esta función para confirmar visualmente si existe un
                  incendio
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-base bg-transparent hover:bg-red-50 border-red-200"
                  onClick={() => setIsEmergencyModalOpen(true)}
                >
                  📞 Contactar Emergencias
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-base bg-transparent hover:bg-blue-50 border-blue-200"
                  onClick={() => setIsSafetyModalOpen(true)}
                >
                  📋 Ver Manual de Seguridad
                </Button>

              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alert History */}
        <AlertHistory />

        {/* Modal components */}
        <PhotoVerificationModal
          isOpen={isPhotoModalOpen}
          onClose={() => setIsPhotoModalOpen(false)}
          onVerification={handleVerification}
        />

        <EmergencyContactModal
          isOpen={isEmergencyModalOpen}
          onClose={() => setIsEmergencyModalOpen(false)}
        />

        <SafetyManualModal
          isOpen={isSafetyModalOpen}
          onClose={() => setIsSafetyModalOpen(false)}
        />

        <ConfigurationModal
          isOpen={isConfigModalOpen}
          onClose={() => setIsConfigModalOpen(false)}
        />
      </div>
    </div>
  );
}
