"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface TemperatureData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  isRising: boolean;
}

interface TemperatureChartProps {
  data: TemperatureData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const temp = payload[0].value;
    const isAlert = temp >= 45; // Cambio: antes era 35
    const isCritical = temp >= 100; // Cambio: antes era 45

    return (
      <div className="bg-white border-2 border-gray-300 rounded-xl p-4 shadow-xl">
        <p className="font-bold text-xl mb-2 text-gray-800">{`${label}`}</p>
        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full ${
              isCritical
                ? "bg-red-500"
                : isAlert
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          ></div>
          <span className="text-2xl font-bold text-gray-800">{temp}°C</span>
        </div>
        <p
          className={`text-lg font-medium mt-2 ${
            isCritical
              ? "text-red-600"
              : isAlert
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          {isCritical ? "🔥 ¡PELIGRO!" : isAlert ? "⚠️ Riesgo" : "✅ Normal"}
        </p>
      </div>
    );
  }
  return null;
};

export function TemperatureChart({ data }: TemperatureChartProps) {
  const simplifiedData = data.map((item) => ({
    time: item.time,
    temperature: Math.round(
      (item.high + item.low + item.close + item.open) / 4
    ),
    isRising: item.isRising,
  }));

  const currentTemp =
    simplifiedData[simplifiedData.length - 1]?.temperature || 0;
  const previousTemp =
    simplifiedData[simplifiedData.length - 2]?.temperature || 0;
  const isIncreasing = currentTemp > previousTemp;
  const tempChange = Math.abs(currentTemp - previousTemp);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          {isIncreasing ? (
            <TrendingUp className="h-12 w-12 text-red-500" />
          ) : (
            <TrendingDown className="h-12 w-12 text-green-500" />
          )}
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">
              {isIncreasing
                ? "🔥 TEMPERATURA SUBIENDO"
                : "❄️ TEMPERATURA BAJANDO"}
            </p>
            <p className="text-xl text-gray-600">
              Cambio: {tempChange}°C en la última hora
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
          <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
          <p className="text-lg font-bold text-green-700">NORMAL</p>
          <p className="text-sm text-green-600">Menos de 45°C</p>
        </div>
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
          <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2"></div>
          <p className="text-lg font-bold text-yellow-700">RIESGO</p>
          <p className="text-sm text-yellow-600">45°C - 99°C</p>
        </div>
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
          <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
          <p className="text-lg font-bold text-red-700">CRÍTICO</p>
          <p className="text-sm text-red-600">100°C o más</p>
        </div>
      </div>

      <div className="h-80 w-full bg-white border-2 border-gray-200 rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={simplifiedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient
                id="temperatureGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              strokeWidth={1}
            />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 14, fill: "#374151" }}
              axisLine={{ stroke: "#6b7280", strokeWidth: 2 }}
              interval={Math.max(Math.floor(simplifiedData.length / 6), 1)}
            />
            <YAxis
              tick={{ fontSize: 16, fill: "#374151" }}
              axisLine={{ stroke: "#6b7280", strokeWidth: 2 }}
              domain={[15, 120]}
              label={{
                value: "Temperatura °C",
                angle: -90,
                position: "insideLeft",
                style: {
                  textAnchor: "middle",
                  fontSize: "16px",
                  fontWeight: "bold",
                },
              }}
            />
            <ReferenceLine
              y={45}
              stroke="#f59e0b"
              strokeWidth={3}
              strokeDasharray="5 5"
              label={{
                value: "⚠️ RIESGO 45°C",
                position: "topRight",
                style: { fontSize: "14px", fontWeight: "bold" },
              }}
            />
            <ReferenceLine
              y={100}
              stroke="#ef4444"
              strokeWidth={3}
              strokeDasharray="5 5"
              label={{
                value: "🔥 CRÍTICO 100°C",
                position: "topRight",
                style: { fontSize: "14px", fontWeight: "bold" },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="#2563eb"
              strokeWidth={4}
              fill="url(#temperatureGradient)"
              dot={{ fill: "#2563eb", strokeWidth: 2, r: 6 }}
              activeDot={{
                r: 8,
                stroke: "#2563eb",
                strokeWidth: 3,
                fill: "#ffffff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
        <AlertTriangle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
        <p className="text-lg font-bold text-blue-800 mb-2">
          ¿Cómo leer este gráfico?
        </p>
        <p className="text-base text-blue-700">
          La línea muestra la temperatura a lo largo del tiempo.
          <strong>
            {" "}
            Si la línea sube = temperatura aumenta. Si baja = temperatura
            disminuye.
          </strong>
          <br />
          Los colores te ayudan: Verde = Normal (&lt;45°C), Amarillo = Riesgo
          (45-99°C), Rojo = Crítico (≥100°C).
        </p>
      </div>
    </div>
  );
}
