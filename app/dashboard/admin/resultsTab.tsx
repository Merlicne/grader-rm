"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ResultDataProps {
    id: number
    student: string
    problem: string
    submissionDate: string
    score: string
}

function ResultData({ result }: { result: ResultDataProps }) {
    return (
        <TableRow>
            <TableCell className="font-medium">{result.student}</TableCell>
            <TableCell>{result.problem}</TableCell>
            <TableCell>{result.submissionDate}</TableCell>
            <TableCell>{result.score}</TableCell>
            <TableCell className="text-right">
                <Button variant="outline" size="sm">
                    View Details
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default function ResultsTab() {
    const [searchTerm, setSearchTerm] = useState("")

    const results = [
        {
            id: 1,
            student: "John Doe",
            problem: "Fibonacci Sequence",
            submissionDate: "March 15, 2025",
            score: "100/100",
        },
        {
            id: 2,
            student: "Jane Smith",
            problem: "Sorting Algorithm",
            submissionDate: "March 14, 2025",
            score: "85/100",
        },
        {
            id: 3,
            student: "Mike Johnson",
            problem: "Binary Search",
            submissionDate: "March 12, 2025",
            score: "90/100",
        },
        {
            id: 4,
            student: "Sarah Williams",
            problem: "Fibonacci Sequence",
            submissionDate: "March 10, 2025",
            score: "75/100",
        },
    ]

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Grading Results</h2>
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search student or problem..."
                        className="pl-8 w-[300px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>Problem</TableHead>
                                <TableHead>Submission Date</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.map((result) => (
                                <ResultData key={result.id} result={result} />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
} 