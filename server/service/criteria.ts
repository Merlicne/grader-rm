import { Criteria } from "../model/criteria";


export interface CriteriaRepository {
    getCriteriaByProblemId(problem_id: string): Criteria[];
    getCriteriaById(id: string): Criteria | undefined;
    getCriteriaByProblemIdAndId(problem_id: string, id: string): Criteria | undefined;
    createCriteria(criteria: Criteria): Criteria;
    updateCriteria(criteria: Criteria): Criteria;
    deleteCriteria(id: string): void;
}

export class CriteriaService {
    private criteriaRepo: CriteriaRepository;

    constructor(criteriaRepo: CriteriaRepository) {
        this.criteriaRepo = criteriaRepo;
    }

    getCriteriaByProblemId(problem_id: string): Criteria[] {
        return this.criteriaRepo.getCriteriaByProblemId(problem_id);
    }
}