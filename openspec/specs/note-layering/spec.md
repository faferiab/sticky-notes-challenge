## ADDED Requirements

### Requirement: Bring note to front
The system SHALL bring a note to the highest z-index when it is selected or interacted with.

#### Scenario: Click brings note to front
- **WHEN** user clicks on a note that is partially or fully behind other notes
- **THEN** the clicked note is moved to the highest z-index, appearing above all other notes

#### Scenario: Keyboard bring to front
- **WHEN** a note is focused
- **AND** user presses the Enter key
- **THEN** the focused note is brought to the highest z-index

#### Scenario: Z-index assignment
- **WHEN** a note is brought to front
- **THEN** the note receives a z-index value one higher than the current highest z-index among all notes

#### Scenario: New notes appear on top
- **WHEN** a new note is created
- **THEN** it receives the highest z-index, appearing above all existing notes
