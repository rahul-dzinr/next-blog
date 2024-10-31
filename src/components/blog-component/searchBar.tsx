import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (term: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Input
      type="text"
      placeholder="Search blogs..."
      onChange={(e) => onSearch(e.target.value)}
      className="max-w-sm"
    />
  )
}