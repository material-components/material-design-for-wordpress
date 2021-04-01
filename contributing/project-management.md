# Project management guidelines

## Project boards

In addition to [Milestones][milestones], which are used to manage releases, project boards are used to manage issue statuses.

### Definition project board

The [Definition][definition] project board covers the pipeline which issues go through in preparation for execution. The board contains the following columns:

* Revisit Later
* Prioritization
* Acceptance Criteria
* Implementation Brief
* Review
* Estimate

### Execution project board

The [Execution][execution] project board covers the execution pipeline which issues go through for implementation. The board contains the following columns:

* Blocked
* Backlog
* To Do
* In Progress
* Code Review
* QA
* Demo
* Approval
* Done

## Labels

The labels below are utilized to categorize issues:

* Type: `{type}` = the issue type (ex. `Type: Bug`, `Type: Feature`, `Type: Support`)
* P`{priority}` = the priority of the task (ex. `P1`, `P2`, `P3`)
* Size: `{size`} = the issue size (ex. `S`, `M`, `L`)
* Sprint: `{sprint_number`} = the sprint associated to the issue (ex. `Sprint: 1`, `Sprint: 2`, `Sprint: 3`)

## Life of an issue

**IMPORTANT**: We use GitHub issues to track all task statuses, therefore PRs should **only** be associated with an issue, **not** assigned a label, project, and/or milestone.

### Triage

The [GitHub issues][issues] view serves as the “Awaiting Triage” backlog.

1. An issue is created.
1. The issue “Type” label is assigned.

### Issue cycle by type

#### Type: `Bug`, `Enhancement`, `Feature`

##### Definition

| Step | Task | Role  |
| :--- | :--- | :--- |
| 1. | An issue requiring work is added to the [Definition][definition] project board (automatically added to Prioritization column). | `Project Manager`
| 2. | The issue is assigned a “Priority” and moved to the “Acceptance Criteria” column. | `Product Owner`
| 3. | “Acceptance Criteria” are added to the issue description, and the issue is moved to the “Implementation Brief” column. | `Project Manager` `Product Owner` `Lead Engineer`
| 4. | “Implementation Brief” is added to the issue description, and the issue is moved to the “Review” column. | `Engineer`
| 5. | The “Implementation Brief” is reviewed and the issue is moved to the “Estimate” column upon approval. The issue is moved back to the “Implementation Brief” column if changes in the “Implementation Brief” description are requested. | `Lead Engineer`
| 6. | The issue is estimated using T-Shirt sizing and moved to the [Execution][execution] project board (automatically added to the Backlog). | `Project Manager` `Engineer`

##### Execution
| Step | Task | Role  |
| :--- | :--- | :--- |
| 1. | An issue requiring work is added to the [Execution][execution] project board (automatically added to the Backlog) after going through the [Definition][definition] project board pipeline. | `Project Manager`
| 2. | The issue is assigned a “[Milestone][milestones]” and “Sprint” label. | `Project Manager`
| 3. | The issue is moved to the “To Do” column if it is assigned to the current sprint. | `Project Manager`
| 4. | The issue is assigned (or may be self-assigned) to an engineer. | `Project Manager` `Engineer`
| 5. | The issue is moved to the “In Progress” column when development starts. A PR is created, following the [Branching Strategy](engineering.md#branches). The PR must contain details for each section predefined in the PR template, with a reference to the associated issue. **IMPORTANT:** do not add [GitHub keywords](https://help.github.com/en/articles/closing-issues-using-keywords) which would automatically close an issue once the PR is merged. | `Engineer`
| 6. | The “[Changelog Message](engineering.md#changelog)” is added to the relevant section of the issue description once development is completed. | `Engineer`
| 7. | The “QA Testing Instructions“ are added to the relevant section of the issue description and the issue is moved to the “Code Review” column. | `Engineer`
| 8. | The code review is done in the referred PR and the issue is moved to the “QA” column once the review is completed and the PR is approved, merged and deployed to the QA environment. The reviewer must ensure that the “Acceptance Criteria” match the implementation and that the “QA Testing Instructions“ has been added to the issue before moving it to QA. | `Engineer`
| 9. | The issue is moved to the “Demo” column once QA is passed or moved back to the “To Do” column if changes are required, in which case the cycle from the “To Do” column onwards is repeated. | `QA Specialist`
| 9. | A video or screenshots demoing the implementation are added to the relevant section of the issue description. | `Engineer`
| 10. | The issue is moved to the “Approval” column once the demo is added. | `Engineer`
| 11. | The issue goes through a final review and moved to the “Done” once approved or moved back to the “To Do” column if changes are required, in which case the cycle from the “To Do” column onwards is repeated. | `Project Manager`
| 12. | The issue is closed. | `Product Manager`

#### Type: `Task`

##### Definition

| Step | Task | Role  |
| :--- | :--- | :--- |
| 1. | An issue requiring work is added to the [Definition][definition] project board (automatically added to Prioritization column). | `Project Manager`
| 2. | The issue is assigned a “Priority” and moved to the “Acceptance Criteria” column. | `Project Manager`
| 3. | “Acceptance Criteria” are added to the issue description, and the issue is moved to the “Estimate" column. | `Project Manager` `Product Owner` `Lead Engineer`
| 4. | The issue is estimated using T-Shirt sizing and moved to the [Execution][execution] project board (automatically added to the Backlog). | `Task specific`

##### Execution
| Step | Task | Role  |
| :--- | :--- | :--- |
| 1. | An issue requiring work is added to the [Execution][execution] project board (automatically added to the Backlog) after going through the [Definition][definition] project board pipeline. | `Project Manager`
| 2. | The issue is assigned a “Sprint” label. | `Project Manager`
| 3. | The issue is moved to the “To Do” column if it is assigned to the current sprint. | `Project Manager`
| 4. | The issue is assigned (or may be self-assigned) | `Project Manager` `Assignee`
| 5. | The issue is moved to the “In progress” column when work starts. | `Assignee`
| 8. | The issue is moved to the “Approval” column the work is done. | `Assignee`
| 9. | The issue goes through a final review and moved to the “Done” once approved or moved back to the “To Do” column if changes are required, in which case the cycle from the “To Do” column onwards is repeated. | `Project Manager`
| 10. | The issue is closed. | `Project Manager`

[milestones]: https://github.com/material-components/material-design-for-wordpress/milestones
[issues]: https://github.com/material-components/material-design-for-wordpress/issues
[definition]: https://github.com/material-components/material-design-for-wordpress/projects/1
[execution]: https://github.com/material-components/material-design-for-wordpress/projects/2
