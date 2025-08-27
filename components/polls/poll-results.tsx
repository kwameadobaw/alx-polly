'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BarChart3 } from 'lucide-react'

interface PollResultsProps {
  pollId: string
}

interface PollOption {
  id: string
  text: string
  votes: number
  percentage: number
}

// Mock data - replace with actual API call
const mockResults = {
  totalVotes: 245,
  options: [
    { id: '1', text: 'JavaScript', votes: 89, percentage: 36.3 },
    { id: '2', text: 'Python', votes: 76, percentage: 31.0 },
    { id: '3', text: 'TypeScript', votes: 45, percentage: 18.4 },
    { id: '4', text: 'Go', votes: 35, percentage: 14.3 }
  ]
}

export function PollResults({ pollId }: PollResultsProps) {
  const [results, setResults] = useState(mockResults)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // TODO: Fetch poll results from API based on pollId
    setIsLoading(false)
  }, [pollId])

  const getWinningOption = () => {
    return results.options.reduce((prev, current) => 
      prev.votes > current.votes ? prev : current
    )
  }

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const winningOption = getWinningOption()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Poll Results</span>
        </CardTitle>
        <CardDescription>
          Total votes: {results.totalVotes.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {results.options
            .sort((a, b) => b.votes - a.votes)
            .map((option, index) => (
            <div key={option.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{option.text}</span>
                  {option.id === winningOption.id && (
                    <Badge variant="default" className="text-xs">
                      Leading
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{option.votes} votes</span>
                  <span>({option.percentage}%)</span>
                </div>
              </div>
              <Progress 
                value={option.percentage} 
                className="h-3"
              />
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t">
          <div className="text-center space-y-1">
            <p className="text-sm font-medium">
              Current Leader: {winningOption.text}
            </p>
            <p className="text-xs text-muted-foreground">
              {winningOption.votes} votes ({winningOption.percentage}%)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}