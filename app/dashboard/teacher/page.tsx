"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, LogOut } from "lucide-react"
import CriteriaTab from "./criteriaTab"
import ResultsTab from "./resultsTab"

export default function TeacherDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Code Grader</h1>
          <nav className="ml-auto flex items-center gap-4">
            <span className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              <span>Teacher</span>
            </span>
            <Link href="/">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <Tabs defaultValue="criteria" className="space-y-4">
          <TabsList>
            <TabsTrigger value="criteria">Manage Criteria</TabsTrigger>
            <TabsTrigger value="results">Grading Results</TabsTrigger>
          </TabsList>
          <TabsContent value="criteria">
            <CriteriaTab />
          </TabsContent>
          <TabsContent value="results">
            <ResultsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

