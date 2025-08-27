'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Users, MessageCircle, Eye } from 'lucide-react'
import Link from 'next/link'

interface Poll {
  id: string
  title: string
  status: 'active' | 'closed' | 'draft'
  totalVotes: number
  totalComments: number
  createdAt: string
}

// Mock data - replace with actual API call
const mockRecentPolls: Poll[] = [
  {
    id: '1',
    title: 'What is your favorite programming language?',
    status: 'active',
    totalVotes: 245,
    totalComments: 12,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Best time for team meetings?',
    status: 'active',
    totalVotes: 89,
    totalComments: 5,
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    title: 'Preferred development environment?',
    status: 'closed',
    totalVotes: 156,
    totalComments: 8,
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    title: 'Coffee or tea preference?',
    status: 'draft',
    totalVotes: 0,
    totalComments: 0,
    createdAt: '2024-01-12'
  }
]

export function RecentPolls() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'closed':
        return 'secondary'
      case 'draft':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Polls</CardTitle>
        <CardDescription>
          Your latest polls and their performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRecentPolls.map((poll) => (
            <div key={poll.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-sm leading-tight">
                    {poll.title.length > 40 
                      ? `${poll.title.substring(0, 40)}...` 
                      : poll.title
                    }
                  </h4>
                  <Badge variant={getStatusColor(poll.status)} className="text-xs">
                    {poll.status}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{poll.totalVotes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{poll.totalComments}</span>
                  </div>
                  <span>{formatDate(poll.createdAt)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/polls/${poll.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/polls">
              View All Polls
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}