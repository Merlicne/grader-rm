import { Criteria } from "../model/criteria";


export interface CriteriaRepository {
    getAllCriteria(): Criteria[];
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

    // Get all criteria
    getAllCriteria(): Criteria[] {
        return this.criteriaRepo.getAllCriteria();
    }

    // Get criteria by problem id
    getCriteriaByProblemId(problem_id: string): Criteria[] {
        return this.criteriaRepo.getCriteriaByProblemId(problem_id);
    }

    deleteCriteria(id: string): void {
        this.criteriaRepo.deleteCriteria(id);
    }

    createCriteria(criteria: Criteria): Criteria {
        return this.criteriaRepo.createCriteria(criteria);
    }

    updateCriteria(criteria: Criteria): Criteria {
        return this.criteriaRepo.updateCriteria(criteria);
    }

    getCriteriaById(id: string): Criteria | undefined {
        return this.criteriaRepo.getCriteriaById(id);
    }

    getCriteriaByProblemIdAndId(problem_id: string, id: string): Criteria | undefined {
        return this.criteriaRepo.getCriteriaByProblemIdAndId(problem_id, id);
    }
}