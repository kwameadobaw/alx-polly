'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Vote, MessageCircle, Plus, Users } from 'lucide-react'

interface Activity {
  id: string
  type: 'vote' | 'comment' | 'poll_created' | 'poll_closed'
  user?: {
    name: string
    avatar: string
  }
  pollTitle: string
  pollId: string
  timestamp: string
  details?: string
}

// Mock data - replace with actual API call
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'vote',
    user: {
      name: 'Alice Johnson',
      avatar: '/avatars/alice.jpg'
    },
    pollTitle: 'What is your favorite programming language?',
    pollId: '1',
    timestamp: '2024-01-15T16:30:00Z'
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'Bob Smith',
      avatar: '/avatars/bob.jpg'
    },
    pollTitle: 'Best time for team meetings?',
    pollId: '2',
    timestamp: '2024-01-15T15:45:00Z',
    details: 'Great poll! I think morning meetings work best.'
  },
  {
    id: '3',
    type: 'poll_created',
    pollTitle: 'Coffee or tea preference?',
    pollId: '4',
    timestamp: '2024-01-15T14:20:00Z'
  },
  {
    id: '4',
    type: 'vote',
    user: {
      name: 'Carol Davis',
      avatar: '/avatars/carol.jpg'
    },
    pollTitle: 'Preferred development environment?',
    pollId: '3',
    timestamp: '2024-01-15T13:15:00Z'
  },
  {
    id: '5',
    type: 'poll_closed',
    pollTitle: 'Weekend work preferences',
    pollId: '5',
    timestamp: '2024-01-15T12:00:00Z'
  }
]

export function PollActivity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'vote':
        return <Vote className="h-4 w-4 text-blue-600" />
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-green-600" />
      case 'poll_created':
        return <Plus className="h-4 w-4 text-purple-600" />
      case 'poll_closed':
        return <Users className="h-4 w-4 text-gray-600" />
      default:
        return <Users className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'vote':
        return `${activity.user?.name} voted on`
      case 'comment':
        return `${activity.user?.name} commented on`
      case 'poll_created':
        return 'You created'
      case 'poll_closed':
        return 'Poll closed:'
      default:
        return 'Activity on'
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`;    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest interactions with your polls
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0 mt-1">
                {activity.user ? (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback className="text-xs">
                      {activity.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm">
                    <span className="font-medium">{getActivityText(activity)}</span>
                    <span className="text-muted-foreground"> "{activity.pollTitle}"</span>
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {activity.type.replace('_', ' ')}
                  </Badge>
                </div>
                
                {activity.details && (
                  <p className="text-xs text-muted-foreground italic">
                    "{activity.details}"
                  </p>
                )}
                
                <p className="text-xs text-muted-foreground">
                  {formatTime(activity.timestamp)}
                </p>
              </div>
              
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
            </div>
          ))}
        </div>
        
        {mockActivities.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No recent activity</p>
            <p className="text-xs">Activity will appear here as people interact with your polls</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}