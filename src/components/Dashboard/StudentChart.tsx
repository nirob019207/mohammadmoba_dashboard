"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", students: 25000 },
  { month: "Feb", students: 15000 },
  { month: "Mar", students: 45000 },
  { month: "Apr", students: 95000 },
  { month: "May", students: 45000 },
  { month: "Jun", students: 25000 },
  { month: "Jul", students: 35000 },
  { month: "Aug", students: 105000 },
  { month: "Sep", students: 45000 },
  { month: "Oct", students: 15000 },
  { month: "Nov", students: 105000 },
  { month: "Dec", students: 155000 },
]

export function StudentChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip />
          <Line type="monotone" dataKey="students" stroke="#4338ca" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

