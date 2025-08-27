'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export function CreatePollButton() {
  return (
    <Button asChild>
      <Link href="/polls/create">
        <Plus className="mr-2 h-4 w-4" />
        Create Poll
      </Link>
    </Button>
  )
}