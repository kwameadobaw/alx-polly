'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'

export function SearchPolls() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for:', { searchQuery, category, status })
  }

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search polls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>
      
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="technology">Technology</SelectItem>
          <SelectItem value="work">Work</SelectItem>
          <SelectItem value="lifestyle">Lifestyle</SelectItem>
          <SelectItem value="entertainment">Entertainment</SelectItem>
          <SelectItem value="education">Education</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
      
      <Button onClick={handleSearch} className="w-full md:w-auto">
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>
    </div>
  )
}