import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    placeholder?: string;
}

export function SearchBar({ 
    searchTerm, 
    setSearchTerm, 
    placeholder = "Search..." 
}: SearchBarProps) {
    return (
        <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder={placeholder}
                className="pl-8 w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
} 