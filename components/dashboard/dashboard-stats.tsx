'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Users, MessageCircle, TrendingUp } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2">
          <p className="text-xs text-muted-foreground">{description}</p>
          {trend && (
            <div className={`flex items-center text-xs ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`h-3 w-3 mr-1 ${
                trend.isPositive ? '' : 'rotate-180'
              }`} />
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  // Mock data - replace with actual API call
  const stats = {
    totalPolls: 12,
    totalVotes: 1247,
    totalComments: 89,
    activePolls: 8
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Polls"
        value={stats.totalPolls}
        description="Polls you've created"
        icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: 12, isPositive: true }}
      />
      
      <StatCard
        title="Total Votes"
        value={stats.totalVotes.toLocaleString()}
        description="Votes on your polls"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: 8, isPositive: true }}
      />
      
      <StatCard
        title="Comments"
        value={stats.totalComments}
        description="Comments on your polls"
        icon={<MessageCircle className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: 15, isPositive: true }}
      />
      
      <StatCard
        title="Active Polls"
        value={stats.activePolls}
        description="Currently running polls"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}