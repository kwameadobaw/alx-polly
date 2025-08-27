import { Metadata } from 'next'
import { PollsList } from '@/components/polls/polls-list'
import { CreatePollButton } from '@/components/polls/create-poll-button'
import { SearchPolls } from '@/components/polls/search-polls'

export const metadata: Metadata = {
  title: 'Polls | ALX Polly',
  description: 'Browse and participate in polls',
}

export default function PollsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Polls</h1>
            <p className="text-muted-foreground">
              Discover and participate in community polls
            </p>
          </div>
          <CreatePollButton />
        </div>
        
        <SearchPolls />
        
        <PollsList />
      </div>
    </div>
  )
}