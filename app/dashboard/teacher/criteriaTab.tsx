"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { criteriaService, problemService } from "@/server/registry"
import { Criteria } from "@/server/model/criteria"
import { Problem } from "@/server/model/problem"
import { SearchBar } from "./components/SearchBar"
import { LoadingState } from "./components/LoadingState"
import { CriteriaTable } from "./components/CriteriaTable"
import { AddCriteriaButton } from "./components/AddCriteriaButton"

export default function CriteriaTab() {
    const [searchTerm, setSearchTerm] = useState("")
    const [criteriaList, setCriteriaList] = useState<Criteria[]>([])
    const [problems, setProblems] = useState<Problem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            // Fetch problems first
            const allProblems = problemService.getProblems()
            setProblems(allProblems)
            
            // Get criteria for all problems for now
            // In a real app, you might want to paginate or filter this
            let allCriteria: Criteria[] = []
            for (const problem of allProblems) {
                const problemCriteria = criteriaService.getCriteriaByProblemId(problem.id)
                allCriteria = [...allCriteria, ...problemCriteria]
            }
            setCriteriaList(allCriteria)
            setLoading(false)
        }

        fetchData()
    }, [])

    // Filter criteria based on search term
    const filteredCriteria = criteriaList.filter(criteria => 
        // Check if criteria description includes the search term
        criteria.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // Find the problem name and check if it includes the search term
        problems.find(p => p.id === criteria.problem_id)?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Function to get problem name by id
    const getProblemName = (problemId: string): string => {
        return problems.find(p => p.id === problemId)?.name || 'Unknown Problem'
    }
    
    const handleDeleteCriteria = (id: string) => {
        if (confirm('Are you sure you want to delete this criteria?')) {
            criteriaService.deleteCriteria(id)
            setCriteriaList(prev => prev.filter(criteria => criteria.id !== id))
        }
    }

    const handleAddCriteria = () => {
        // This would show a modal or navigate to a form in a real application
        alert("Add criteria functionality would be implemented here")
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Grading Criteria</h2>
                <AddCriteriaButton onClick={handleAddCriteria} />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Criteria List</CardTitle>
                    <CardDescription>Manage grading criteria for programming assignments</CardDescription>
                    <div className="relative mt-2">
                        <SearchBar 
                            searchTerm={searchTerm} 
                            setSearchTerm={setSearchTerm} 
                            placeholder="Search criteria..." 
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <LoadingState message="Loading criteria..." />
                    ) : (
                        <CriteriaTable 
                            filteredCriteria={filteredCriteria}
                            getProblemName={getProblemName}
                            onDelete={handleDeleteCriteria}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    )
} 