"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", views: 1200 },
  { name: "Fev", views: 800 },
  { name: "Mar", views: 1600 },
  { name: "Abr", views: 2200 },
  { name: "Mai", views: 1800 },
  { name: "Jun", views: 2400 },
  { name: "Jul", views: 3200 },
]

export function Overview() {
  return (
    <div className="h-[300px] w-full sm:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            width={40}
            tickCount={5}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Visualizações</span>
                        <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 6,
              style: { fill: "#2563eb", opacity: 0.8 },
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

