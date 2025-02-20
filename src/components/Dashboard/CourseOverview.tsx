"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Button } from "@/components/ui/button"

const data = [
  { name: "Artificial Intelligence", value: 45, color: "#2563eb" },
  { name: "Machine Learning", value: 35, color: "#f97316" },
  { name: "Cyber Security", value: 25, color: "#10b981" },
]

export function CourseOverview() {
  return (
    <div className="space-y-4">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold mb-2">40.5K</div>
        <div className="text-sm text-muted-foreground">Total Students</div>
      </div>

      <Button className="w-full" variant="outline">
        View Details
      </Button>
    </div>
  )
}

