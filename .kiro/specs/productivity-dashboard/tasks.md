# Implementation Plan: Productivity Dashboard

## Overview

This plan transforms the existing basic to-do list into a comprehensive productivity dashboard by adding three new components (Greeting Widget, Focus Timer, Quick Links) and enhancing the existing task list with edit functionality. The implementation follows a modular component-based architecture where each widget operates independently but shares common storage utilities.

The approach prioritizes incremental development with early validation through property-based tests using fast-check (minimum 100 iterations per property). Each component is built, tested, and integrated before moving to the next, ensuring a stable foundation throughout development.

## Tasks

- [x] 1. Set up project structure and shared utilities
  - Refactor existing code to use modular IIFE pattern
  - Create StorageUtil module with get, set, and remove methods
  - Update existing task list code to use StorageUtil
  - Add fast-check library via CDN to index.html for property testing
  - Create tests directory structure (tests/unit/ and tests/property/)
  - _Requirements: 17.1, 17.2_

- [ ]* 1.1 Write property tests for StorageUtil
  - **Property 12: Task Storage Round-Trip** - Validates: Requirements 9.3
  - **Property 20: Link Storage Round-Trip** - Validates: Requirements 13.3
  - Test with fast-check using minimum 100 iterations per property

- [ ] 2. Implement Greeting Widget component
  - [x] 2.1 Add HTML structure for greeting widget to index.html
    - Add greeting container div with time, date, and greeting message elements
    - Position at top of dashboard layout
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4_
  
  - [x] 2.2 Implement GreetingWidget module in script.js
    - Create IIFE module with init, update, getGreeting, formatTime, formatDate methods
    - Implement time-based greeting logic (morning 5-11, afternoon 12-16, evening 17-20, night 21-4)
    - Set up setInterval to update display every second
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4_
  
  - [ ]* 2.3 Write property tests for greeting widget
    - **Property 1: Time Format Validation** - Validates: Requirements 1.1
    - **Property 2: Date Format Completeness** - Validates: Requirements 1.2
    - Test with fast-check using minimum 100 iterations per property
  
  - [ ]* 2.4 Write unit tests for greeting widget
    - Test greeting boundaries (4:59 AM, 5:00 AM, 11:59 AM, 12:00 PM, 4:59 PM, 5:00 PM, 8:59 PM, 9:00 PM)
    - Test time format with various hours and minutes
    - Test date format with different dates
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4_
  
  - [x] 2.5 Add CSS styling for greeting widget
    - Style greeting container with appropriate spacing and typography
    - Ensure minimum 14px font size for readability
    - Use consistent color scheme
    - _Requirements: 16.1, 16.2, 16.3, 16.4_

- [x] 3. Checkpoint - Verify greeting widget functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement Focus Timer component
  - [x] 4.1 Add HTML structure for focus timer to index.html
    - Add timer container with display and control buttons (start, stop, reset)
    - Position in dashboard layout
    - _Requirements: 3.1, 4.1, 4.2, 4.3_
  
  - [x] 4.2 Implement FocusTimer module in script.js
    - Create IIFE module with state object (duration, remaining, isRunning, intervalId)
    - Implement init, start, stop, reset, tick, updateDisplay, updateButtons, formatTime methods
    - Initialize with 1500 seconds (25 minutes)
    - Update display every second during countdown
    - Stop automatically at zero
    - Manage button states (disable start when running, disable stop when stopped)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [ ]* 4.3 Write property tests for focus timer
    - **Property 3: Timer Display Format** - Validates: Requirements 3.5
    - Test with fast-check using minimum 100 iterations per property
  
  - [ ]* 4.4 Write unit tests for focus timer
    - Test timer initialization at 1500 seconds
    - Test timer countdown and automatic stop at zero
    - Test start, stop, reset operations
    - Test button state management
    - Test MM:SS format with various second values (0, 59, 60, 1499, 1500)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [x] 4.5 Add CSS styling for focus timer
    - Style timer display with large, readable font
    - Style control buttons with clear visual states (enabled/disabled)
    - Use consistent color scheme
    - _Requirements: 16.1, 16.2, 16.3, 16.4_

- [x] 5. Checkpoint - Verify focus timer functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Enhance Task List with edit functionality
  - [x] 6.1 Refactor existing TaskList into IIFE module
    - Convert existing code to modular structure
    - Add id and createdAt fields to task objects
    - Update task rendering to use unique IDs instead of array indices
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 6.4, 8.1, 8.2, 8.3, 9.1, 9.2, 9.3, 9.4_
  
  - [x] 6.2 Implement task edit functionality
    - Add click event listener to task text elements
    - Make task text editable on click (contenteditable or input replacement)
    - Save changes on Enter key or blur event
    - Validate edited text (reject empty/whitespace-only)
    - Restore original text if validation fails
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [ ]* 6.3 Write property tests for task operations
    - **Property 4: Task Creation with Valid Input** - Validates: Requirements 5.1, 5.5
    - **Property 5: Task Creation Rejects Whitespace** - Validates: Requirements 5.4
    - **Property 6: Input Field Cleared After Task Creation** - Validates: Requirements 5.3
    - **Property 7: Task Completion Toggle** - Validates: Requirements 6.1, 6.3
    - **Property 8: Completed Task Styling** - Validates: Requirements 6.2
    - **Property 9: Task Edit with Valid Input** - Validates: Requirements 7.2, 7.4
    - **Property 10: Task Edit Rejects Whitespace** - Validates: Requirements 7.3
    - **Property 11: Task Deletion** - Validates: Requirements 8.1, 8.2
    - **Property 13: Task List Loading** - Validates: Requirements 9.1
    - Test with fast-check using minimum 100 iterations per property
  
  - [ ]* 6.4 Write unit tests for task list
    - Test empty input validation
    - Test whitespace-only input validation
    - Test task creation with valid input
    - Test task completion toggle
    - Test task edit with valid and invalid input
    - Test task deletion
    - Test Local Storage integration (save and load)
    - Test empty state initialization
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 7.3, 7.4, 8.1, 8.2, 8.3, 9.1, 9.2, 9.3, 9.4_
  
  - [x] 6.5 Update task list CSS styling
    - Add styles for editable task text state
    - Ensure consistent styling with new components
    - _Requirements: 16.1, 16.2, 16.3, 16.4_

- [x] 7. Checkpoint - Verify enhanced task list functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement Quick Links component
  - [x] 8.1 Add HTML structure for quick links to index.html
    - Add quick links container with input fields (name, URL) and add button
    - Add container for rendering link buttons
    - Position in dashboard layout
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 11.1, 11.2, 11.3, 12.1, 12.2, 12.3, 13.1, 13.2, 13.3, 13.4_
  
  - [x] 8.2 Implement QuickLinks module in script.js
    - Create IIFE module with links array and methods (init, load, save, add, delete, open, render, normalizeUrl, isValidUrl)
    - Implement URL validation (reject empty URLs)
    - Implement URL normalization (add https:// if no protocol)
    - Implement link creation with unique IDs
    - Implement link deletion with Local Storage persistence
    - Implement link opening in new tab
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 11.1, 11.2, 11.3, 12.1, 12.2, 12.3, 13.1, 13.2, 13.3, 13.4_
  
  - [ ]* 8.3 Write property tests for quick links
    - **Property 14: Quick Link Creation with Valid Input** - Validates: Requirements 10.1, 10.3
    - **Property 15: Quick Link Creation Rejects Empty URL** - Validates: Requirements 10.2
    - **Property 16: Quick Link Display Name** - Validates: Requirements 10.4
    - **Property 17: URL Protocol Preservation** - Validates: Requirements 11.2
    - **Property 18: URL Protocol Normalization** - Validates: Requirements 11.3
    - **Property 19: Quick Link Deletion** - Validates: Requirements 12.1, 12.2
    - **Property 21: Link List Loading** - Validates: Requirements 13.1
    - Test with fast-check using minimum 100 iterations per property
  
  - [ ]* 8.4 Write unit tests for quick links
    - Test link creation with valid inputs
    - Test empty URL validation
    - Test URL normalization (with and without protocol)
    - Test link deletion
    - Test Local Storage integration (save and load)
    - Test empty state initialization
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 11.1, 11.2, 11.3, 12.1, 12.2, 12.3, 13.1, 13.2, 13.3, 13.4_
  
  - [x] 8.5 Add CSS styling for quick links
    - Style input section for name and URL fields
    - Style link buttons with hover effects
    - Style delete buttons for links
    - Use consistent color scheme
    - _Requirements: 16.1, 16.2, 16.3, 16.4_

- [x] 9. Checkpoint - Verify quick links functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Integrate all components and finalize layout
  - [x] 10.1 Update index.html with complete dashboard layout
    - Arrange all four components in logical layout
    - Update page title to "Productivity Dashboard"
    - Ensure proper visual hierarchy and spacing
    - _Requirements: 16.1, 16.2, 16.5_
  
  - [x] 10.2 Finalize CSS with responsive design
    - Implement dashboard grid or flexbox layout
    - Ensure consistent color scheme across all components
    - Add visual separation between components
    - Ensure minimum font sizes and contrast ratios
    - Test layout responsiveness
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_
  
  - [x] 10.3 Initialize all components in script.js
    - Add DOMContentLoaded event listener
    - Call init methods for all components in correct order
    - Ensure no initialization race conditions
    - _Requirements: 14.1, 14.2, 14.3, 14.4_
  
  - [ ]* 10.4 Write integration tests
    - Test component initialization sequence
    - Test Local Storage integration across components
    - Test error handling for unavailable Local Storage
    - Test error handling for invalid data in Local Storage
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 13.1, 13.2, 13.3, 13.4, 15.4_

- [ ] 11. Add error handling and edge cases
  - [x] 11.1 Implement Local Storage error handling
    - Wrap all storage operations in try-catch blocks
    - Detect Local Storage availability
    - Provide fallback to in-memory state if unavailable
    - Display subtle warning message if persistence unavailable
    - _Requirements: 15.4_
  
  - [x] 11.2 Implement input sanitization
    - Escape user input when rendering to DOM (prevent XSS)
    - Handle special characters in task text and link names
    - _Requirements: 14.1, 14.3_
  
  - [x] 11.3 Add validation for corrupted storage data
    - Validate JSON structure when loading from Local Storage
    - Initialize with empty arrays if data is invalid
    - Log errors to console for debugging
    - _Requirements: 9.4, 13.4_
  
  - [ ]* 11.4 Write unit tests for error handling
    - Test Local Storage unavailable scenario
    - Test invalid JSON in Local Storage
    - Test storage quota exceeded
    - Test XSS prevention in user input
    - _Requirements: 15.4_

- [x] 12. Final checkpoint - Complete testing and validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check library with minimum 100 iterations
- All components use modular IIFE pattern for encapsulation
- Checkpoints ensure incremental validation throughout development
- Existing to-do list code will be refactored, not rewritten from scratch
