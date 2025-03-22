import { CriteriaService } from "./service/criteria";
import { CriteriaRepositoryMock } from "./repository/criteriaRepoMock";
import { ProblemRepositoryMock } from "./repository/problemRepoMock";
import { ProblemService } from "./service/problem";
import { SubmissionService } from "./service/submission";
import { SubmissionRepositoryMock } from "./repository/submissionRepoMock";
import { TestcaseService } from "./service/testcase";
import { TestcaseRepositoryMock } from "./repository/testcaseRepoMock";

const criteriaRepo = new CriteriaRepositoryMock();
const problemRepo = new ProblemRepositoryMock();
const submissionRepo = new SubmissionRepositoryMock();
const testcaseRepo = new TestcaseRepositoryMock();

const problemService = new ProblemService(problemRepo);
const criteriaService = new CriteriaService(criteriaRepo);
const submissionService = new SubmissionService(submissionRepo);
const testcaseService = new TestcaseService(testcaseRepo);

export { 
    criteriaRepo,
    problemRepo,
    submissionRepo,
    testcaseRepo,
    
    problemService, 
    criteriaService, 
    submissionService, 
    testcaseService 
};