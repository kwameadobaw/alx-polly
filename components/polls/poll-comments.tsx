'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, Send, Heart } from 'lucide-react'

interface PollCommentsProps {
  pollId: string
}

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    username: string
  }
  content: string
  createdAt: string
  likes: number
  isLiked: boolean
}

// Mock data - replace with actual API call
const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'Alice Johnson',
      avatar: '/avatars/alice.jpg',
      username: 'alice_dev'
    },
    content: 'Great poll! I think JavaScript is still the most versatile language for web development.',
    createdAt: '2024-01-15T14:30:00Z',
    likes: 5,
    isLiked: false
  },
  {
    id: '2',
    author: {
      name: 'Bob Smith',
      avatar: '/avatars/bob.jpg',
      username: 'bobsmith'
    },
    content: 'Python is my go-to for data science and machine learning projects. The ecosystem is amazing!',
    createdAt: '2024-01-15T15:45:00Z',
    likes: 3,
    isLiked: true
  }
]

export function PollComments({ pollId }: PollCommentsProps) {
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)
    
    // TODO: Implement actual comment submission
    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'Current User',
        avatar: '/avatars/current-user.jpg',
        username: 'currentuser'
      },
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    }
    
    setTimeout(() => {
      setComments(prev => [comment, ...prev])
      setNewComment('')
      setIsSubmitting(false)
    }, 1000)
  }

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        }
      }
      return comment
    }))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5" />
          <span>Comments ({comments.length})</span>
        </CardTitle>
        <CardDescription>
          Share your thoughts about this poll
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Comment Form */}
        <div className="space-y-4">
          <Textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <Button 
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
            className="w-full sm:w-auto"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
        
        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3 p-4 border rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>
                    {comment.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{comment.author.name}</span>
                    <span className="text-xs text-muted-foreground">@{comment.author.username}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikeComment(comment.id)}
                      className={`h-8 px-2 ${comment.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
                      {comment.likes}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}