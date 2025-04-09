"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface SearchBarProps {
  initialValue: string
  onSearch: (query: string) => void
}

export default function SearchBar({ initialValue, onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue)

  useEffect(() => {
    setSearchQuery(initialValue)
  }, [initialValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search by job title or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full"
          data-testid="search-input"
        />
      </div>
      <Button type="submit" className="ml-2">
        Search
      </Button>
    </form>
  )
}
