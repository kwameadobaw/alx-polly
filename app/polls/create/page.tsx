import { Metadata } from 'next'
import { CreatePollForm } from '@/components/polls/create-poll-form'

export const metadata: Metadata = {
  title: 'Create Poll | ALX Polly',
  description: 'Create a new poll for the community',
}

export default function CreatePollPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Create a New Poll</h1>
            <p className="text-muted-foreground">
              Create an engaging poll and get insights from the community
            </p>
          </div>
          
          <CreatePollForm />
        </div>
      </div>
    </div>
  )
}