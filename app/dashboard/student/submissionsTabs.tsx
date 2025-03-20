"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UserCircle, LogOut, CheckCircle, AlertCircle } from "lucide-react"



export default function SubmissionsTap() {
    return (

        <TabsContent value="submissions" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>My Submissions</CardTitle>
                    <CardDescription>View your previous code submissions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="rounded-md border">
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Problem 1: Fibonacci Sequence</h3>
                                        <p className="text-sm text-muted-foreground">Submitted on March 15, 2025</p>
                                    </div>
                                    <Badge className="bg-green-500">Passed</Badge>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Score: 100/100</span>
                                </div>
                            </div>
                            <div className="border-t p-4 bg-muted/50">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium">Test Results</h4>
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Problem 2: Sorting Algorithm</h3>
                                        <p className="text-sm text-muted-foreground">Submitted on March 10, 2025</p>
                                    </div>
                                    <Badge variant="outline" className="bg-red-500">
                                        Failed
                                    </Badge>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                    <span className="text-sm">Score: 60/100</span>
                                </div>
                            </div>
                            <div className="border-t p-4 bg-muted/50">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium">Test Results</h4>
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}