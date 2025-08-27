import { Metadata } from 'next'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { RecentPolls } from '@/components/dashboard/recent-polls'
import { PollActivity } from '@/components/dashboard/poll-activity'
import { CreatePollButton } from '@/components/polls/create-poll-button'

export const metadata: Metadata = {
  title: 'Dashboard | ALX Polly',
  description: 'Manage your polls and view your activity',
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-8">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your polls and track your activity
            </p>
          </div>
          <CreatePollButton />
        </div>
        
        <DashboardStats />
        
        <div className="grid gap-8 md:grid-cols-2">
          <RecentPolls />
          <PollActivity />
        </div>
      </div>
    </div>
  )
}