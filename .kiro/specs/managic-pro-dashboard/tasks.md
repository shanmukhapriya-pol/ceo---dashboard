# Implementation Plan: Managic Pro Dashboard (React Conversion)

## Overview

Convert the existing HTML dashboard into a React application using a unidirectional data flow pattern. All state lives in `App` and flows down via props. Data is initialized from a constants file.

## Tasks

- [x] 1. Set up project structure and data constants
  - Create `src/data/constants.js` with `INITIAL_TASKS`, `INITIAL_MEETINGS`, `INITIAL_MEMBERS`, and filter option arrays
  - Ensure each record matches the `Task`, `Meeting`, and `Member` shapes defined in the design
  - _Requirements: 6.2, 7.3, 8.3, 9.1, 9.4_

- [x] 2. Implement App component with state management
  - [x] 2.1 Create `src/App.jsx` with all state (`activeNav`, `selectedManager`, `selectedPeriod`, `tasks`, `meetings`, `members`) initialized from constants
    - Implement `handleNavChange`, `handleFilterChange`, and `handleAddTask` callbacks
    - Wire `Sidebar` and `MainContent` with the correct props
    - _Requirements: 1.1, 9.1, 9.2, 9.3_

  - [ ]* 2.2 Write unit tests for App
    - Test that App renders both Sidebar and MainContent
    - Test that `handleAddTask` appends a new task to state
    - _Requirements: 1.1, 9.3_

- [x] 3. Implement Sidebar component
  - [x] 3.1 Create `src/components/Sidebar.jsx`
    - Render nav links (Dashboard, Activity Tracking, Board Members, Meetings)
    - Apply active class to the link matching `activeNav` prop; call `onNavChange` on click
    - Render team member list and hardcoded user account section ("AmirBaqian", "Product Manager")
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 3.2 Write property test for active nav link (Property 1)
    - **Property 1: Active nav link reflects selection**
    - **Validates: Requirements 2.2**

  - [ ]* 3.3 Write unit tests for Sidebar
    - Test all four nav link labels are rendered
    - Test member names and user account section are present
    - _Requirements: 2.1, 2.3, 2.4_

- [x] 4. Implement FilterBar component
  - [x] 4.1 Create `src/components/FilterBar.jsx`
    - Render manager `<select>` and period `<select>` dropdowns from constants option arrays
    - Call `onFilterChange('manager', value)` and `onFilterChange('period', value)` on change
    - Render "More Filters" button
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 4.2 Write property test for filter change callback (Property 2)
    - **Property 2: Filter change callback receives correct value**
    - **Validates: Requirements 4.4, 4.5**

  - [ ]* 4.3 Write unit tests for FilterBar
    - Test all manager and period options are rendered
    - Test "More Filters" button is present
    - _Requirements: 4.1, 4.2, 4.3_

- [x] 5. Implement StatsCard component
  - [x] 5.1 Create `src/components/StatsCard.jsx`
    - Accept `label`, `value`, and `supplementary` props and render them
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 5.2 Write unit tests for StatsCard
    - Test that label, value, and supplementary text all appear in the output
    - _Requirements: 5.1, 5.2, 5.3_

- [x] 6. Implement TaskDistribution component
  - [x] 6.1 Create `src/components/TaskDistribution.jsx`
    - Render the Management > Tasks hierarchy
    - Render a priority task list from the `tasks` prop (name, description, priority)
    - Render "New Task" button that calls `onAddTask`
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 6.2 Write property test for new task addition (Property 3)
    - **Property 3: New Task grows the task list by one**
    - **Validates: Requirements 6.4, 9.3**

  - [ ]* 6.3 Write unit tests for TaskDistribution
    - Test initial task names are rendered
    - Test "New Task" button is present
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 7. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Implement MeetingOverview component
  - [x] 8.1 Create `src/components/MeetingOverview.jsx`
    - Render a table with columns: Date & Time, Purpose, Manager, Outcomes
    - Render one `<tr>` per meeting in the `meetings` prop
    - When `meetings` is empty, render a "No meetings available" message instead of an empty table
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ]* 8.2 Write property test for meeting row count (Property 4)
    - **Property 4: MeetingOverview renders one row per meeting**
    - **Validates: Requirements 7.2**

  - [ ]* 8.3 Write unit tests for MeetingOverview
    - Test column headers are rendered
    - Test 3 rows appear with INITIAL_MEETINGS
    - Test empty-state message appears when passed `[]`
    - _Requirements: 7.1, 7.3, 7.4_

- [x] 9. Implement MemberStatus component
  - [x] 9.1 Create `src/components/MemberStatus.jsx`
    - Render one entry per member showing name, role, and currentWork
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ]* 9.2 Write property test for member field rendering (Property 5)
    - **Property 5: MemberStatus renders all member fields**
    - **Validates: Requirements 8.1, 8.2**

  - [ ]* 9.3 Write unit tests for MemberStatus
    - Test all three pre-populated member names appear
    - _Requirements: 8.3_

- [x] 10. Implement MainContent and wire all components together
  - [x] 10.1 Create `src/components/MainContent.jsx`
    - Render Header with "Management Activity Tracking" heading and subtitle
    - Compose FilterBar, StatsCard, TaskDistribution, MeetingOverview, and MemberStatus with correct props
    - _Requirements: 1.1, 3.1, 3.2, 9.2_

  - [ ]* 10.2 Write unit tests for MainContent
    - Test heading and subtitle text are rendered
    - _Requirements: 3.1, 3.2_

- [x] 11. Apply global styles
  - Create `src/App.css` with styles matching the original dashboard's color scheme, typography, and layout (fixed sidebar, scrollable main content)
  - _Requirements: 1.2, 1.3_

- [x] 12. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Property tests use **fast-check** with a minimum of 100 iterations per test
- Each property test must include the comment: `// Feature: managic-pro-dashboard, Property {N}: {property_text}`
- All data initialized from `src/data/constants.js` — no inline hardcoding in JSX
