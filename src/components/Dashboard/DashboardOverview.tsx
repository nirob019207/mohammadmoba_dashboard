"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, DollarSign, Users, BookOpen } from "lucide-react"
import { CourseOverview } from "./CourseOverview"
import { StudentChart } from "./StudentChart"
import { useDashboardDataQuery } from "@/Redux/Api/userApi"


export default function DashboardOverview() {
  const {data,isLoading}=useDashboardDataQuery({})
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            <DollarSign className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.data?.students}</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Courses</CardTitle>
            <Users className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold">{data?.data?.courses}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Professor</CardTitle>
            <GraduationCap className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold">{data?.data?.professors}</div>
          </CardContent>
        </Card>
      
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Student Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StudentChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseOverview />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

