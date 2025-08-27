'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Vote } from 'lucide-react'

interface PollVotingProps {
  pollId: string
}

// Mock data - replace with actual API call
const mockPollOptions = [
  { id: '1', text: 'JavaScript', votes: 89 },
  { id: '2', text: 'Python', votes: 76 },
  { id: '3', text: 'TypeScript', votes: 45 },
  { id: '4', text: 'Go', votes: 35 }
]

export function PollVoting({ pollId }: PollVotingProps) {
  const [selectedOption, setSelectedOption] = useState('')
  const [hasVoted, setHasVoted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [options] = useState(mockPollOptions)

  const handleVote = async () => {
    if (!selectedOption) {
      setError('Please select an option to vote')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // TODO: Implement actual voting logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      setHasVoted(true)
      // TODO: Update poll results
    } catch (error) {
      setError('Failed to submit vote. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (hasVoted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Vote className="h-5 w-5 text-green-600" />
            <span>Vote Submitted</span>
          </CardTitle>
          <CardDescription>
            Thank you for participating! Your vote has been recorded.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              You can view the results in the results section. You cannot change your vote once submitted.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cast Your Vote</CardTitle>
        <CardDescription>
          Select your preferred option and submit your vote
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label 
                htmlFor={option.id} 
                className="flex-1 cursor-pointer font-medium"
              >
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <Button 
          onClick={handleVote} 
          disabled={isLoading || !selectedOption}
          className="w-full"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Vote
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          Note: You can only vote once. Your choice cannot be changed after submission.
        </p>
      </CardContent>
    </Card>
  )
}