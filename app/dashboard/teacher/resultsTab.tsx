"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function ResultsTab() {
    const [searchTerm, setSearchTerm] = useState("")

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
                            <TableRow>
                                <TableCell className="font-medium">John Doe</TableCell>
                                <TableCell>Fibonacci Sequence</TableCell>
                                <TableCell>March 15, 2025</TableCell>
                                <TableCell>100/100</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Jane Smith</TableCell>
                                <TableCell>Sorting Algorithm</TableCell>
                                <TableCell>March 14, 2025</TableCell>
                                <TableCell>85/100</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Mike Johnson</TableCell>
                                <TableCell>Binary Search</TableCell>
                                <TableCell>March 12, 2025</TableCell>
                                <TableCell>90/100</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Sarah Williams</TableCell>
                                <TableCell>Fibonacci Sequence</TableCell>
                                <TableCell>March 10, 2025</TableCell>
                                <TableCell>75/100</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
} 