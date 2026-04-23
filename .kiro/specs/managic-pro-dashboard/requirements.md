# Requirements Document

## Introduction

Convert the existing "Managic Pro" HTML dashboard into a React application. The dashboard is a management activity tracking tool that displays team performance, meetings, and task progress. The conversion must preserve all existing UI functionality while introducing a proper React component structure, state management, and interactivity.

## Glossary

- **App**: The top-level React application component
- **Sidebar**: The left navigation panel containing navigation links, team member list, and user account section
- **MainContent**: The primary content area containing the header, filters, stats, task distribution, meeting overview, and member status sections
- **FilterBar**: The row of filter controls (manager dropdown, time period dropdown, more filters button)
- **StatsCard**: A card component displaying a single metric with a label and supplementary value
- **TaskDistribution**: The hierarchical task view showing Management > Tasks breakdown and priority task list
- **MeetingOverview**: The table displaying scheduled/past meetings with date, purpose, manager, and outcomes columns
- **MemberStatus**: The section displaying each team member's current work status
- **Task**: A data object representing a single task item with a name, description, and priority
- **Meeting**: A data object representing a meeting with date, time, purpose, manager, and outcomes fields
- **Member**: A data object representing a team member with name, role, and current work fields
- **Manager**: A team member who can be selected in the manager filter dropdown

## Requirements

### Requirement 1: Application Shell and Layout

**User Story:** As a user, I want to see the Managic Pro dashboard rendered in a browser, so that I can access all management tracking features in one place.

#### Acceptance Criteria

1. THE App SHALL render a full-page layout consisting of a Sidebar on the left and MainContent on the right.
2. THE App SHALL apply a consistent visual style matching the original HTML dashboard's color scheme and typography.
3. THE Sidebar SHALL have a fixed width and remain visible while the MainContent area scrolls independently.

---

### Requirement 2: Sidebar Navigation

**User Story:** As a user, I want to navigate between dashboard sections using the sidebar, so that I can access different parts of the application.

#### Acceptance Criteria

1. THE Sidebar SHALL display navigation links for: Dashboard, Activity Tracking, Board Members, and Meetings.
2. WHEN a navigation link is clicked, THE Sidebar SHALL apply an active visual state to the selected link.
3. THE Sidebar SHALL display a list of team members: Max Maraston, Sasha Glinsky, and Yana Snezin.
4. THE Sidebar SHALL display a user account section showing the username "AmirBaqian" and role "Product Manager".

---

### Requirement 3: Dashboard Header

**User Story:** As a user, I want to see a clear header for the main content area, so that I understand the purpose of the dashboard at a glance.

#### Acceptance Criteria

1. THE MainContent SHALL display the heading "Management Activity Tracking".
2. THE MainContent SHALL display the subtitle "Overview of team performance, meetings, and task progress." beneath the heading.

---

### Requirement 4: Filter Controls

**User Story:** As a manager, I want to filter dashboard data by manager and time period, so that I can focus on relevant activity.

#### Acceptance Criteria

1. THE FilterBar SHALL display a manager dropdown with options: All Managers, Max Maraston, and Sasha Glinsky.
2. THE FilterBar SHALL display a time period dropdown with options: This Week, Last 30 Days, and This Quarter.
3. THE FilterBar SHALL display a "More Filters" button.
4. WHEN a manager option is selected, THE FilterBar SHALL update the selected manager state to the chosen value.
5. WHEN a time period option is selected, THE FilterBar SHALL update the selected time period state to the chosen value.

---

### Requirement 5: Stats Card

**User Story:** As a manager, I want to see a summary metric for meetings conducted, so that I can quickly assess team activity.

#### Acceptance Criteria

1. THE StatsCard SHALL display the label "Meetings Conducted".
2. THE StatsCard SHALL display the primary value "42".
3. THE StatsCard SHALL display the supplementary value "+18 attendees".

---

### Requirement 6: Task Distribution and Priority Tasks

**User Story:** As a manager, I want to view the task hierarchy and priority task list, so that I can track what the team is working on.

#### Acceptance Criteria

1. THE TaskDistribution SHALL display a hierarchical view with "Management" as the parent node and "Tasks" as the child node.
2. THE TaskDistribution SHALL display a Priority Tasks list containing the following items:
   - "Logo Design" with description "Visual identity changes"
   - "Instagr Story" with description "Promotion campaign assets"
   - "Branding" with description "Update brand guidelines"
3. THE TaskDistribution SHALL display a "New Task" button below the priority task list.
4. WHEN the "New Task" button is clicked, THE TaskDistribution SHALL add a new empty Task entry to the priority task list.

---

### Requirement 7: Meeting Overview Table

**User Story:** As a manager, I want to see a table of meetings with their details, so that I can review meeting history and outcomes.

#### Acceptance Criteria

1. THE MeetingOverview SHALL display a table with columns: Date & Time, Purpose, Manager, and Outcomes.
2. THE MeetingOverview SHALL render one row per Meeting in the meetings data set.
3. THE MeetingOverview SHALL display the 3 pre-populated meeting rows from the original dashboard data.
4. WHEN the meetings data set is empty, THE MeetingOverview SHALL display a message indicating no meetings are available.

---

### Requirement 8: Member Status Section

**User Story:** As a manager, I want to see the current work status of each team member, so that I can monitor team activity.

#### Acceptance Criteria

1. THE MemberStatus SHALL display one entry per Member in the members data set.
2. THE MemberStatus SHALL display each Member's name, role, and current work description.
3. THE MemberStatus SHALL display the following pre-populated members:
   - Max Maraston with role "Administrator"
   - Sasha Glinsky with role "Admin"
   - Yana Snezin with role "Member"

---

### Requirement 9: Component Data Architecture

**User Story:** As a developer, I want dashboard data to be managed as structured state, so that the application is maintainable and extensible.

#### Acceptance Criteria

1. THE App SHALL define meetings, tasks, and members as typed data structures (or PropTypes-validated objects).
2. THE App SHALL pass data to child components via props.
3. WHEN a Task is added via the "New Task" button, THE App SHALL update the tasks state and re-render the TaskDistribution component with the new task included.
4. THE App SHALL initialize all data from a single source (a constants or data file) rather than hardcoding values inline in JSX.
