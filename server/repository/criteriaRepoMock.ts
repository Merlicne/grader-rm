import { Criteria } from "../model/criteria";
import { CriteriaRepository } from "../service/criteria";

class CriteriaRepositoryMock implements CriteriaRepository {
    private criteria: Criteria[] = [
        {
            id: "criteria1",
            problem_id: "problem1",
            description: "Syntax 80%: forgot to add a colon, missing indentation",
            weight: 80,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: "criteria2",
            problem_id: "problem1",
            description: "Logic 20%: using the correct formula to calculate the nth Fibonacci number, don't forget to handle the base cases",
            weight: 20,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: "criteria3",
            problem_id: "problem2",
            description: "Syntax 80%: The code must be written in python and must be syntactically correct",
            weight: 80,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: "criteria4",
            problem_id: "problem2",
            description: "Logic 20%: The code must use the correct logic to solve the problem",
            weight: 20,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: "criteria5",
            problem_id: "problem3",
            description: "Syntax 80%: The code must be written in python and must be syntactically correct",
            weight: 80,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: "criteria6",
            problem_id: "problem3",
            description: "Logic 20%: The code must use the correct logic to solve the problem",
            weight: 20,
            created_at: new Date(),
            updated_at: new Date()
        },
    ];

    getCriteriaByProblemId(problem_id: string): Criteria[] {
        return this.criteria.filter((c) => c.problem_id === problem_id);
    }
    getCriteriaById(id: string): Criteria | undefined {
        return this.criteria.find((c) => c.id === id);
    }
    getCriteriaByProblemIdAndId(problem_id: string, id: string): Criteria | undefined {
        return this.criteria.find((c) => c.problem_id === problem_id && c.id === id);
    }
    createCriteria(criteria: Criteria): Criteria {
        criteria.id = `criteria${this.criteria.length + 1}`;
        criteria.created_at = new Date();
        criteria.updated_at = new Date();
        criteria.problem_id = criteria.problem_id;
        criteria.description = criteria.description;
        criteria.weight = criteria.weight;
        this.criteria.push(criteria);
        return criteria;
    }
    updateCriteria(criteria: Criteria): Criteria {
        const index = this.criteria.findIndex((c: Criteria) => c.id === criteria.id);
        if (index !== -1) {
            this.criteria[index] = criteria;
        }
        return criteria;
    }
    deleteCriteria(id: string): void {
        const index = this.criteria.findIndex((c) => c.id === id);
        if (index !== -1) {
            this.criteria.splice(index, 1);
        }
    }
}

export { CriteriaRepositoryMock };

