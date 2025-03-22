"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { submissionService, problemService } from "@/server/registry"
import { Problem } from "@/server/model/problem"
import { SubmissionWithScore } from "./interfaces"
import { SearchBar } from "./components/SearchBar"
import { LoadingState } from "./components/LoadingState"
import { SubmissionsTable } from "./components/SubmissionsTable"

export default function ResultsTab() {
    const [searchTerm, setSearchTerm] = useState("")
    const [submissions, setSubmissions] = useState<SubmissionWithScore[]>([])
    const [problems, setProblems] = useState<Problem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            
            // Fetch all problems
            const allProblems = problemService.getProblems()
            setProblems(allProblems)
            
            // Fetch submissions for all problems
            const submissionsWithScores: SubmissionWithScore[] = []
            
            for (const problem of allProblems) {
                const problemSubmissions = submissionService.getSubmissionsByProblemId(problem.id)
                
                // Process each submission to get scores
                for (const submission of problemSubmissions) {
                    const results = submissionService.getSubmissionResults(submission.id)
                    
                    // Calculate total score
                    const totalScore = results.reduce((acc, result) => acc + result.score, 0)
                    // For this example, assume maximum score is 100
                    // In a real app, you might get max scores from criteria weights
                    const maxScore = 100
                    
                    submissionsWithScores.push({
                        submission,
                        totalScore,
                        maxScore
                    })
                }
            }
            
            setSubmissions(submissionsWithScores)
            setLoading(false)
        }
        
        fetchData()
    }, [])

    // Filter submissions based on search term
    const filteredSubmissions = submissions.filter(item => {
        const problem = problems.find(p => p.id === item.submission.problem_id)
        
        return (
            // Search by user ID (since we don't have user names)
            item.submission.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            // Search by problem name
            problem?.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    // Helper to format date
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    // Helper to get problem name
    const getProblemName = (problemId: string): string => {
        return problems.find(p => p.id === problemId)?.name || 'Unknown Problem'
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Grading Results</h2>
                <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    placeholder="Search student or problem..." 
                />
            </div>
            <Card>
                <CardContent className="pt-6">
                    {loading ? (
                        <LoadingState message="Loading submissions..." />
                    ) : (
                        <SubmissionsTable 
                            filteredSubmissions={filteredSubmissions}
                            problems={problems}
                            formatDate={formatDate}
                            getProblemName={getProblemName}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    )
} 