## ADDED Requirements

### Requirement: Edit note text inline
The system SHALL allow users to enter and edit the text content of a sticky note directly within the note.

#### Scenario: Click to edit
- **WHEN** user clicks on the text area of a note
- **THEN** the text area becomes editable and receives focus

#### Scenario: Type text in note
- **WHEN** the note's text area is focused
- **AND** user types characters
- **THEN** the text content updates in real time

#### Scenario: Auto-save on text change
- **WHEN** the text content of a note changes
- **THEN** the store is updated with the new text

#### Scenario: Text wraps within note
- **WHEN** text content exceeds the note width
- **THEN** the text wraps to the next line within the note boundaries

#### Scenario: Empty note text
- **WHEN** a note has no text content
- **THEN** the text area displays an empty state (placeholder text such as "Type here...")
