import { CriteriaService } from "./service/criteria";
import { CriteriaRepositoryMock } from "./repository/criteriaRepoMock";
import { ProblemRepositoryMock } from "./repository/problemRepoMock";
import { ProblemService } from "./service/problem";
import { SubmissionService } from "./service/submission";
import { SubmissionRepositoryMock } from "./repository/submissionRepoMock";
import { TestcaseService } from "./service/testcase";
import { TestcaseRepositoryMock } from "./repository/testcaseRepoMock";


const problemService = new ProblemService(new ProblemRepositoryMock());
const criteriaService = new CriteriaService(new CriteriaRepositoryMock());
const submissionService = new SubmissionService(new SubmissionRepositoryMock());
const testcaseService = new TestcaseService(new TestcaseRepositoryMock());

export { 
    problemService, 
    criteriaService, 
    submissionService, 
    testcaseService 
};