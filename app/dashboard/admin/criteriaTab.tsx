"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2 } from "lucide-react"

interface CriteriaDataProps {
    id: number
    name: string
    description: string
    weight: string
    problem: string
}

function CriteriaData({ criteria }: { criteria: CriteriaDataProps }) {
    return (
        <TableRow>
            <TableCell className="font-medium">{criteria.name}</TableCell>
            <TableCell>{criteria.description}</TableCell>
            <TableCell>{criteria.weight}</TableCell>
            <TableCell>{criteria.problem}</TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default function CriteriaTab() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddCriteriaOpen, setIsAddCriteriaOpen] = useState(false)

    const criteria = [
        {
            id: 1,
            name: "Correctness",
            description: "Code produces correct output for all test cases",
            weight: "60%",
            problem: "Fibonacci Sequence",
        },
        {
            id: 2,
            name: "Efficiency",
            description: "Code runs within the specified time limit",
            weight: "20%",
            problem: "Fibonacci Sequence",
        },
        {
            id: 3,
            name: "Code Quality",
            description: "Code is well-structured and follows best practices",
            weight: "20%",
            problem: "Fibonacci Sequence",
        },
    ]

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Grading Criteria</h2>
                <Dialog open={isAddCriteriaOpen} onOpenChange={setIsAddCriteriaOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Criteria
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add New Criteria</DialogTitle>
                            <DialogDescription>Create new grading criteria for programming problems.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Criteria Name</Label>
                                <Input id="name" placeholder="e.g., Correctness" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe the criteria in detail..."
                                    className="min-h-[100px]"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="weight">Weight</Label>
                                <Input id="weight" type="number" placeholder="60" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="problem">Problem</Label>
                                <Select>
                                    <SelectTrigger id="problem">
                                        <SelectValue placeholder="Select problem" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fibonacci">Fibonacci Sequence</SelectItem>
                                        <SelectItem value="sorting">Sorting Algorithm</SelectItem>
                                        <SelectItem value="binary">Binary Search</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddCriteriaOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Save Criteria</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Criteria List</CardTitle>
                    <CardDescription>Manage grading criteria for programming problems</CardDescription>
                    <div className="relative mt-2">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search criteria..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Weight</TableHead>
                                <TableHead>Problem</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {criteria.map((criteria) => (
                                <CriteriaData key={criteria.id} criteria={criteria} />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
} 