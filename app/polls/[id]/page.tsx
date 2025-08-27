import { Metadata } from 'next'
import { PollDetails } from '@/components/polls/poll-details'
import { PollVoting } from '@/components/polls/poll-voting'
import { PollResults } from '@/components/polls/poll-results'
import { PollComments } from '@/components/polls/poll-comments'
import { notFound } from 'next/navigation'

interface PollPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PollPageProps): Promise<Metadata> {
  // TODO: Fetch poll data and generate dynamic metadata
  return {
    title: `Poll ${params.id} | ALX Polly`,
    description: 'View and participate in this poll',
  }
}

export default function PollPage({ params }: PollPageProps) {
  // TODO: Fetch poll data based on params.id
  // For now, we'll use placeholder logic
  const pollExists = true // Replace with actual poll existence check
  
  if (!pollExists) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <PollDetails pollId={params.id} />
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <PollVoting pollId={params.id} />
          </div>
          
          <div className="space-y-6">
            <PollResults pollId={params.id} />
          </div>
        </div>
        
        <PollComments pollId={params.id} />
      </div>
    </div>
  )
}