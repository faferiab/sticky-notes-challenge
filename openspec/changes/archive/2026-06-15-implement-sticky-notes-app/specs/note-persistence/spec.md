## ADDED Requirements

### Requirement: Persist notes to LocalStorage
The system SHALL save all notes to LocalStorage and restore them on page load.

#### Scenario: Notes saved on change
- **WHEN** any note is created, moved, resized, deleted, or edited
- **THEN** the complete notes collection is saved to LocalStorage under a known key ("sticky-notes")

#### Scenario: Notes restored on load
- **WHEN** the page loads
- **AND** there are saved notes in LocalStorage
- **THEN** the notes are loaded from LocalStorage and displayed on the canvas

#### Scenario: Empty state on first load
- **WHEN** the page loads for the first time
- **AND** there are no saved notes in LocalStorage
- **THEN** the canvas displays an empty state with no notes

### Requirement: Persist notes via mock REST API
The system SHALL provide an asynchronous mock REST API repository that simulates saving and loading notes.

#### Scenario: Mock API returns notes
- **WHEN** the system loads notes from the mock API
- **THEN** the mock API returns a Promise that resolves with an array of Note objects after a simulated delay (300-800ms)

#### Scenario: Mock API saves notes
- **WHEN** the system saves notes to the mock API
- **THEN** the mock API returns a Promise that resolves after a simulated delay (300-800ms)

### Requirement: Repository abstraction
The system SHALL use the Repository Pattern so that persistence mechanisms can be swapped without changing UI code.

#### Scenario: Repository interface is used
- **WHEN** any persistence operation is performed
- **THEN** it goes through the `NotesRepository` interface with `load()` and `save()` methods
