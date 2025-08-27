'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Users, MessageCircle, Share2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface PollDetailsProps {
  pollId: string
}

// Mock data - replace with actual API call
const mockPollData = {
  id: '1',
  title: 'What is your favorite programming language?',
  description: 'Help us understand the community preferences for programming languages. This poll will help us decide which technologies to focus on in our upcoming projects and training sessions.',
  author: {
    name: 'John Doe',
    avatar: '/avatars/john-doe.jpg',
    username: 'johndoe'
  },
  createdAt: '2024-01-15T10:30:00Z',
  expiresAt: '2024-02-15T10:30:00Z',
  totalVotes: 245,
  totalComments: 12,
  status: 'active',
  category: 'Technology',
  isOwner: false
}

export function PollDetails({ pollId }: PollDetailsProps) {
  const [poll, setPoll] = useState(mockPollData)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // TODO: Fetch poll details from API based on pollId
    setIsLoading(false)
  }, [pollId])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: poll.title,
          text: poll.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // TODO: Show toast notification
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-2xl">{poll.title}</CardTitle>
              <Badge variant={poll.status === 'active' ? 'default' : 'secondary'}>
                {poll.status}
              </Badge>
            </div>
            <CardDescription className="text-base">
              {poll.description}
            </CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={poll.author.avatar} alt={poll.author.name} />
              <AvatarFallback>
                {poll.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{poll.author.name}</p>
              <p className="text-sm text-muted-foreground">@{poll.author.username}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
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
              <span>Created {formatDate(poll.createdAt)}</span>
            </div>
          </div>
        </div>
        
        {poll.status === 'active' && poll.expiresAt && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <Clock className="inline h-4 w-4 mr-1" />
              This poll expires on {formatDate(poll.expiresAt)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}