"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Simulated alert history data
const alertHistory = [
  {
    id: 1,
    datetime: "2024-01-15 14:30",
    temperature: 47.2,
    riskLevel: "Crítico",
    action: "Foto tomada - Sin incendio detectado",
  },
  {
    id: 2,
    datetime: "2024-01-15 12:15",
    temperature: 38.5,
    riskLevel: "Riesgo",
    action: "Verificación visual realizada",
  },
  {
    id: 3,
    datetime: "2024-01-15 09:45",
    temperature: 42.1,
    riskLevel: "Crítico",
    action: "Contacto con emergencias",
  },
  {
    id: 4,
    datetime: "2024-01-14 16:20",
    temperature: 36.8,
    riskLevel: "Riesgo",
    action: "Monitoreo continuo activado",
  },
  {
    id: 5,
    datetime: "2024-01-14 11:30",
    temperature: 29.2,
    riskLevel: "Normal",
    action: "Sistema funcionando correctamente",
  },
]

const getRiskBadgeVariant = (riskLevel: string) => {
  switch (riskLevel) {
    case "Crítico":
      return "destructive"
    case "Riesgo":
      return "secondary"
    default:
      return "outline"
  }
}

const getRiskBadgeClass = (riskLevel: string) => {
  if (riskLevel === "Normal") {
    return "bg-chart-1 text-white hover:bg-chart-1/90"
  }
  return ""
}

export function AlertHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Historial de Alertas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-base font-bold">Fecha/Hora</TableHead>
                <TableHead className="text-base font-bold">Temperatura</TableHead>
                <TableHead className="text-base font-bold">Estado de Riesgo</TableHead>
                <TableHead className="text-base font-bold">Acción Tomada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alertHistory.map((alert) => (
                <TableRow key={alert.id} className="hover:bg-muted/50">
                  <TableCell className="text-base font-medium">{alert.datetime}</TableCell>
                  <TableCell className="text-base font-bold tabular-nums">{alert.temperature}°C</TableCell>
                  <TableCell>
                    <Badge
                      variant={getRiskBadgeVariant(alert.riskLevel)}
                      className={`text-base font-bold ${getRiskBadgeClass(alert.riskLevel)}`}
                    >
                      {alert.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-base">{alert.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
