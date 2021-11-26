# Vue3 test task

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Finished task video overview
- https://app.usebubbles.com/tQNaLg33wetgfRLJnD1MV8/25-november-2021-comments-with-bubbles

### Execution flow
- Create branch from `main` branch and name it with next convention: `dev-[lastname]-[date]`. Example: `dev-smith-24112021`.
- Once done, create PR into main from your dev branch. Add `Andriy Vasylytsya` and `Viktor Romanyuk` as reviewers.
- Ping contact person about finishing the task.

### Task description
Main idea of the task is to group job openings items (coming from `jobOpeningsService.fetchJobOpenings()` method) by departments key. All available departments are coming from `jobOpeningsService.fetchDepartments()`.

### Details
- You need to implement filtering of all job openings groups using value from `el-select` dropdown component and its v-model: `selectedDepartments` with `OR` logic.
- Filter dropdown options should include only departments which has job openings inside of it.
- If job opening doesn't have any departments, it should be grouped into `Other` group. `Other` group should be also available in departments dropdown.
- If jo opening has a department which doesn't exist in all departments list - ignore this job opening.
- Group should render only 5 job openings.
- Show see more button only in case group has more than 5 job openings.
- Dynamically show 2 values of currently filtered items and all items in the copy example: `'Showing 200 out of 1092 job openings'`
- Sort all departments in rendered tree alphabetically.
- Task should be implemented with all Vue.js best practices in scope of performance and rendering.

