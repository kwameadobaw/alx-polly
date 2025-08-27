'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, MessageCircle } from 'lucide-react'
import Link from 'next/link'

// Mock data - replace with actual API call
const mockPolls = [
  {
    id: '1',
    title: 'What is your favorite programming language?',
    description: 'Help us understand the community preferences for programming languages.',
    author: 'John Doe',
    createdAt: '2024-01-15',
    totalVotes: 245,
    totalComments: 12,
    status: 'active',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Best time for team meetings?',
    description: 'Let\'s find the optimal time slot that works for everyone.',
    author: 'Jane Smith',
    createdAt: '2024-01-14',
    totalVotes: 89,
    totalComments: 5,
    status: 'active',
    category: 'Work'
  },
  {
    id: '3',
    title: 'Favorite coffee shop in the city?',
    description: 'Share your recommendations for the best coffee spots.',
    author: 'Mike Johnson',
    createdAt: '2024-01-13',
    totalVotes: 156,
    totalComments: 23,
    status: 'closed',
    category: 'Lifestyle'
  }
]

export function PollsList() {
  const [polls, setPolls] = useState(mockPolls)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // TODO: Fetch polls from API
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {polls.map((poll) => (
        <Card key={poll.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg leading-tight">{poll.title}</CardTitle>
                <CardDescription>by {poll.author}</CardDescription>
              </div>
              <Badge variant={poll.status === 'active' ? 'default' : 'secondary'}>
                {poll.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{poll.description}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{poll.totalVotes} votes</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{poll.totalComments} comments</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{poll.createdAt}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/polls/${poll.id}`}>
                {poll.status === 'active' ? 'Vote Now' : 'View Results'}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}