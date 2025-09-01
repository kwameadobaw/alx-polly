'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

// Define the Poll type
type Poll = {
  id: string
  title: string
  description: string
  category: string
  created_at: string
  user_id: string
  profiles?: {
    username: string
    full_name: string
  }
  totalVotes?: number
  totalComments?: number
  status?: string
}

export function PollsList() {
  const [polls, setPolls] = useState<Poll[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchPolls() {
      try {
        setIsLoading(true)
        
        // Fetch polls with user information
        const { data, error } = await supabase
          .from('polls')
          .select(`
            *,
            profiles:user_id (username, full_name)
          `)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        
        // Get vote counts for each poll
        const pollsWithCounts = await Promise.all(
          (data || []).map(async (poll) => {
            // Count votes
            const { count: voteCount, error: voteError } = await supabase
              .from('votes')
              .select('id', { count: 'exact', head: false })
              .eq('poll_id', poll.id)
            
            // For now, we'll set comments to 0 as we don't have a comments table yet
            const totalComments = 0
            
            return {
              ...poll,
              totalVotes: voteCount || 0,
              totalComments,
              status: 'active' // We can implement status logic later
            }
          })
        )
        
        setPolls(pollsWithCounts)
      } catch (err: any) {
        console.error('Error fetching polls:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPolls()
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

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        Error loading polls: {error}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {polls.length === 0 && !isLoading ? (
        <div className="col-span-full text-center p-8">
          <p className="text-muted-foreground">No polls found. Create your first poll!</p>
        </div>
      ) : (
        polls.map((poll) => (
          <Card key={poll.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg leading-tight">{poll.title}</CardTitle>
                  <CardDescription>
                    by {poll.profiles?.username || poll.profiles?.full_name || 'Anonymous'}
                  </CardDescription>
                </div>
                <Badge variant={poll.status === 'active' ? 'default' : 'secondary'}>
                  {poll.status || 'active'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{poll.description}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{poll.totalVotes || 0} votes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{poll.totalComments || 0} comments</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(poll.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                    {poll.category}
                  </Badge>
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
        ))
      )}
    </div>
  )
}