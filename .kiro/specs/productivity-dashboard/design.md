# Design Document: Productivity Dashboard

## Overview

The Productivity Dashboard is a client-side web application that transforms a basic to-do list into a comprehensive productivity tool. The application integrates four main components: a greeting widget with time/date display, a 25-minute Pomodoro focus timer, an enhanced task management system, and quick links for favorite websites. All data persists in browser Local Storage, requiring no backend infrastructure.

The design extends the existing to-do list implementation by adding new components while refactoring the current code for better modularity and maintainability. The architecture follows a component-based pattern where each widget operates independently but shares common utilities for storage and DOM manipulation.

### Design Goals

- Maintain simplicity: vanilla JavaScript, HTML, CSS only
- Component isolation: each widget manages its own state and DOM
- Consistent data persistence: unified Local Storage interface
- Responsive UI: immediate visual feedback for all user actions
- Extensibility: easy to add new widgets in the future

## Architecture

### High-Level Structure

The application follows a modular component architecture where each widget is implemented as a self-contained module with its own initialization, state management, and rendering logic.

```
┌─────────────────────────────────────────────────────────┐
│                    index.html (Shell)                    │
│  ┌────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │  Greeting  │ │  Focus   │ │   Task   │ │  Quick   │ │
│  │  Widget    │ │  Timer   │ │   List   │ │  Links   │ │
│  └─────┬──────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ │
│        │             │             │             │       │
│        └─────────────┴─────────────┴─────────────┘       │
│                          │                               │
│                  ┌───────▼────────┐                      │
│                  │  Storage Utils │                      │
│                  └────────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

### Component Responsibilities

**Greeting Widget**
- Displays current time (12-hour format with AM/PM)
- Displays current date (day of week, month, day)
- Shows contextual greeting based on time of day
- Updates time display every second

**Focus Timer**
- Manages 25-minute countdown timer
- Provides start, stop, reset controls
- Updates display every second during countdown
- Handles button state (enable/disable based on timer state)

**Task List** (Enhanced)
- Adds new tasks with validation
- Marks tasks as complete/incomplete
- Edits task text inline
- Deletes tasks
- Persists all changes to Local Storage

**Quick Links**
- Adds website shortcuts with name and URL
- Opens links in new tabs
- Validates and normalizes URLs
- Deletes links
- Persists all changes to Local Storage

**Storage Utilities**
- Provides consistent interface for Local Storage operations
- Handles serialization/deserialization
- Manages storage keys for different components

### File Organization

```
productivity-dashboard/
├── index.html          # Main HTML structure
├── styles.css          # All component styles
└── script.js           # All JavaScript (modular structure)
```

The single-file approach maintains simplicity while using clear code organization through:
- IIFE (Immediately Invoked Function Expressions) for component encapsulation
- Shared utility functions at the top
- Component initialization at the bottom

## Components and Interfaces

### Storage Utility Module

Provides a consistent interface for all Local Storage operations.

```javascript
const StorageUtil = {
  get(key, defaultValue = null) {
    // Retrieves and parses data from Local Storage
    // Returns defaultValue if key doesn't exist or parsing fails
  },
  
  set(key, value) {
    // Serializes and stores data in Local Storage
    // Returns boolean indicating success
  },
  
  remove(key) {
    // Removes key from Local Storage
  }
};
```

### Greeting Widget Component

```javascript
const GreetingWidget = {
  init() {
    // Initializes the widget
    // Starts the update interval
  },
  
  update() {
    // Updates time, date, and greeting display
    // Called every second
  },
  
  getGreeting(hour) {
    // Returns appropriate greeting based on hour (0-23)
    // "Good Morning" (5-11), "Good Afternoon" (12-16),
    // "Good Evening" (17-20), "Good Night" (21-4)
  },
  
  formatTime(date) {
    // Returns time string in 12-hour format with AM/PM
  },
  
  formatDate(date) {
    // Returns date string (e.g., "Monday, January 15")
  }
};
```

### Focus Timer Component

```javascript
const FocusTimer = {
  state: {
    duration: 1500,        // 25 minutes in seconds
    remaining: 1500,       // Current remaining time
    isRunning: false,      // Timer active state
    intervalId: null       // setInterval reference
  },
  
  init() {
    // Initializes timer UI and event listeners
  },
  
  start() {
    // Starts or resumes countdown
    // Updates UI every second
  },
  
  stop() {
    // Pauses countdown
  },
  
  reset() {
    // Resets to 25 minutes and stops
  },
  
  tick() {
    // Decrements remaining time
    // Stops automatically at zero
  },
  
  updateDisplay() {
    // Updates timer display in MM:SS format
  },
  
  updateButtons() {
    // Enables/disables buttons based on state
  },
  
  formatTime(seconds) {
    // Converts seconds to MM:SS string
  }
};
```

### Task List Component

```javascript
const TaskList = {
  tasks: [],  // Array of task objects
  
  init() {
    // Loads tasks from storage
    // Sets up event listeners
    // Renders initial state
  },
  
  load() {
    // Loads tasks from Local Storage
  },
  
  save() {
    // Saves tasks to Local Storage
  },
  
  add(text) {
    // Creates new task if text is valid
    // Saves and re-renders
  },
  
  toggle(id) {
    // Toggles task completion status
    // Saves and re-renders
  },
  
  edit(id, newText) {
    // Updates task text if valid
    // Saves and re-renders
  },
  
  delete(id) {
    // Removes task from array
    // Saves and re-renders
  },
  
  render() {
    // Renders all tasks to DOM
  },
  
  isValidText(text) {
    // Returns true if text is non-empty after trimming
  }
};
```

### Quick Links Component

```javascript
const QuickLinks = {
  links: [],  // Array of link objects
  
  init() {
    // Loads links from storage
    // Sets up event listeners
    // Renders initial state
  },
  
  load() {
    // Loads links from Local Storage
  },
  
  save() {
    // Saves links to Local Storage
  },
  
  add(name, url) {
    // Creates new link if inputs are valid
    // Normalizes URL (adds https:// if needed)
    // Saves and re-renders
  },
  
  delete(id) {
    // Removes link from array
    // Saves and re-renders
  },
  
  open(url) {
    // Opens URL in new tab
  },
  
  render() {
    // Renders all links to DOM
  },
  
  normalizeUrl(url) {
    // Adds https:// protocol if missing
  },
  
  isValidUrl(url) {
    // Returns true if URL is non-empty after trimming
  }
};
```

## Data Models

### Task Object

```javascript
{
  id: string,           // Unique identifier (timestamp-based)
  text: string,         // Task description
  completed: boolean,   // Completion status
  createdAt: number     // Timestamp of creation
}
```

### Link Object

```javascript
{
  id: string,      // Unique identifier (timestamp-based)
  name: string,    // Display name for the link
  url: string      // Website URL (normalized with protocol)
}
```

### Local Storage Keys

```javascript
{
  'tasks': Task[],      // Array of task objects
  'links': Link[]       // Array of link objects
}
```

### Timer State (In-Memory Only)

```javascript
{
  duration: 1500,       // Fixed duration (25 minutes)
  remaining: number,    // Current remaining seconds
  isRunning: boolean,   // Whether timer is active
  intervalId: number    // setInterval ID for cleanup
}
```

Note: Timer state is not persisted to Local Storage. Each page load starts with a fresh 25-minute timer.


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies:
- Multiple persistence properties (5.5, 6.3, 7.4, 8.2, 10.3, 12.2) can be consolidated into comprehensive properties about storage operations
- Task and link creation properties can be combined with their respective persistence properties
- UI update properties (8.3, 12.3) are implementation details covered by functional tests

The following properties represent the minimal set needed for comprehensive validation:

### Property 1: Time Format Validation

*For any* Date object, the time formatting function should produce a string in 12-hour format (1-12) followed by either "AM" or "PM".

**Validates: Requirements 1.1**

### Property 2: Date Format Completeness

*For any* Date object, the date formatting function should produce a string containing the day of week, month name, and day of month.

**Validates: Requirements 1.2**

### Property 3: Timer Display Format

*For any* non-negative integer representing seconds (0 to 1500), the timer formatting function should produce a string in MM:SS format where MM is zero-padded minutes and SS is zero-padded seconds.

**Validates: Requirements 3.5**

### Property 4: Task Creation with Valid Input

*For any* non-empty, non-whitespace string, adding it as a task should result in the task list growing by one and the new task appearing in the list with that text.

**Validates: Requirements 5.1, 5.5**

### Property 5: Task Creation Rejects Whitespace

*For any* string composed entirely of whitespace characters (spaces, tabs, newlines), attempting to add it as a task should result in no change to the task list.

**Validates: Requirements 5.4**

### Property 6: Input Field Cleared After Task Creation

*For any* valid task text, after successfully adding the task, the input field should be empty.

**Validates: Requirements 5.3**

### Property 7: Task Completion Toggle

*For any* task in the task list, toggling its completion status should change the completed flag from true to false or false to true, and the change should persist in Local Storage.

**Validates: Requirements 6.1, 6.3**

### Property 8: Completed Task Styling

*For any* task marked as completed, the rendered DOM element should include strikethrough styling on the task text.

**Validates: Requirements 6.2**

### Property 9: Task Edit with Valid Input

*For any* existing task and any non-empty, non-whitespace string, editing the task with that string should update the task text to the new value and persist the change to Local Storage.

**Validates: Requirements 7.2, 7.4**

### Property 10: Task Edit Rejects Whitespace

*For any* existing task with original text, attempting to edit it with a string composed entirely of whitespace should result in the task text remaining unchanged at its original value.

**Validates: Requirements 7.3**

### Property 11: Task Deletion

*For any* task in the task list, deleting that task should remove it from the list, decrease the list length by one, and persist the change to Local Storage.

**Validates: Requirements 8.1, 8.2**

### Property 12: Task Storage Round-Trip

*For any* valid array of task objects, serializing to JSON and storing in Local Storage, then retrieving and deserializing should produce an equivalent array with the same tasks in the same order with the same properties.

**Validates: Requirements 9.3**

### Property 13: Task List Loading

*For any* valid array of task objects stored in Local Storage under the 'tasks' key, loading the task list should populate the tasks array with all stored tasks.

**Validates: Requirements 9.1**

### Property 14: Quick Link Creation with Valid Input

*For any* non-empty name string and non-empty URL string, adding them as a quick link should result in the links list growing by one and the new link appearing with that name and URL, persisted to Local Storage.

**Validates: Requirements 10.1, 10.3**

### Property 15: Quick Link Creation Rejects Empty URL

*For any* name string and an empty or whitespace-only URL string, attempting to add a quick link should result in no change to the links list.

**Validates: Requirements 10.2**

### Property 16: Quick Link Display Name

*For any* link in the links list, the rendered DOM should include a button element containing the link's name as visible text.

**Validates: Requirements 10.4**

### Property 17: URL Protocol Preservation

*For any* URL string that includes "http://" or "https://" protocol, storing and retrieving the link should preserve the exact protocol specified.

**Validates: Requirements 11.2**

### Property 18: URL Protocol Normalization

*For any* URL string that does not include a protocol (http:// or https://), the normalized URL should have "https://" prepended to it.

**Validates: Requirements 11.3**

### Property 19: Quick Link Deletion

*For any* link in the links list, deleting that link should remove it from the list, decrease the list length by one, and persist the change to Local Storage.

**Validates: Requirements 12.1, 12.2**

### Property 20: Link Storage Round-Trip

*For any* valid array of link objects, serializing to JSON and storing in Local Storage, then retrieving and deserializing should produce an equivalent array with the same links in the same order with the same properties.

**Validates: Requirements 13.3**

### Property 21: Link List Loading

*For any* valid array of link objects stored in Local Storage under the 'links' key, loading the links list should populate the links array with all stored links.

**Validates: Requirements 13.1**

## Error Handling

### Local Storage Availability

The application must handle scenarios where Local Storage is unavailable (private browsing modes, storage quota exceeded, or disabled by user):

- **Detection**: Wrap all storage operations in try-catch blocks
- **Fallback**: If Local Storage is unavailable, maintain state in memory only
- **User Notification**: Display a subtle warning message that data will not persist
- **Graceful Degradation**: All features remain functional, just without persistence

### Invalid Data in Storage

The application must handle corrupted or invalid data in Local Storage:

- **Validation**: Check that retrieved data is valid JSON and matches expected structure
- **Recovery**: If data is invalid, initialize with empty arrays and log error to console
- **No Crashes**: Invalid data should never cause the application to fail to load

### Timer Edge Cases

- **Zero State**: When timer reaches 0, ensure it stops and doesn't go negative
- **Rapid Clicks**: Debounce or disable buttons during state transitions to prevent race conditions
- **Page Visibility**: Timer continues running even if page is not visible (no pause on tab switch)

### Input Validation

- **XSS Prevention**: All user input (task text, link names, URLs) must be properly escaped when rendered to DOM
- **Length Limits**: While not enforced, extremely long inputs should not break layout
- **Special Characters**: Support full Unicode character set in task and link names

### URL Handling

- **Invalid URLs**: Accept any string as URL (browser will handle invalid URLs when opened)
- **Protocol Handling**: Normalize URLs without protocol by adding https://
- **Relative URLs**: Not supported - all URLs treated as absolute

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit Tests**: Verify specific examples, edge cases, error conditions, and integration points
- **Property-Based Tests**: Verify universal properties across randomized inputs

This dual approach ensures both concrete correctness (unit tests) and general correctness across the input space (property tests).

### Property-Based Testing Configuration

**Library Selection**: Use **fast-check** for JavaScript property-based testing

**Configuration Requirements**:
- Minimum 100 iterations per property test (due to randomization)
- Each property test must include a comment tag referencing the design document property
- Tag format: `// Feature: productivity-dashboard, Property {number}: {property_text}`

**Example Property Test Structure**:
```javascript
// Feature: productivity-dashboard, Property 4: Task Creation with Valid Input
fc.assert(
  fc.property(fc.string().filter(s => s.trim().length > 0), (text) => {
    const initialLength = tasks.length;
    addTask(text);
    return tasks.length === initialLength + 1 && 
           tasks[tasks.length - 1].text === text.trim();
  }),
  { numRuns: 100 }
);
```

### Unit Testing Focus Areas

Unit tests should focus on:

1. **Specific Examples**:
   - Greeting messages at boundary times (4:59 AM, 5:00 AM, 11:59 AM, 12:00 PM, etc.)
   - Timer initialization at 25 minutes (1500 seconds)
   - Timer reaching zero and stopping
   - Empty state initialization when no data in Local Storage

2. **Edge Cases**:
   - Empty input validation
   - Whitespace-only input validation
   - Local Storage unavailable scenarios
   - Invalid JSON in Local Storage
   - Timer at zero boundary

3. **Integration Points**:
   - Component initialization sequence
   - Storage utility integration with components
   - DOM event listener setup
   - Button state management based on timer state

4. **Error Conditions**:
   - Local Storage quota exceeded
   - Invalid data structures in storage
   - Missing DOM elements
   - Rapid button clicks

### Test Organization

```
tests/
├── unit/
│   ├── greeting-widget.test.js
│   ├── focus-timer.test.js
│   ├── task-list.test.js
│   ├── quick-links.test.js
│   └── storage-util.test.js
└── property/
    ├── formatting.property.test.js
    ├── task-operations.property.test.js
    ├── link-operations.property.test.js
    └── storage.property.test.js
```

### Testing Tools

- **Test Runner**: Jest or Mocha
- **Property Testing**: fast-check
- **DOM Testing**: jsdom for Node.js environment
- **Assertions**: Chai or Jest's built-in assertions
- **Coverage**: Istanbul/nyc for code coverage reporting

### Coverage Goals

- **Line Coverage**: Minimum 90%
- **Branch Coverage**: Minimum 85%
- **Function Coverage**: 100% (all functions should be tested)
- **Property Coverage**: 100% (all correctness properties must have corresponding property tests)

### Manual Testing Checklist

Some requirements require manual verification:

- Visual design consistency (Requirement 16)
- Cross-browser compatibility (Requirement 15)
- UI responsiveness and timing (Requirement 14)
- Accessibility and contrast ratios
- Layout on different screen sizes

