## ADDED Requirements

### Requirement: Create note
The system SHALL allow users to create a new sticky note at a specified position and size on the canvas.

#### Scenario: Create via toolbar button
- **WHEN** user clicks the "Create Note" button in the toolbar
- **THEN** a new note appears at a default position (centered, or next to existing notes) with default size (200×200) and the default color

#### Scenario: Create via keyboard shortcut
- **WHEN** user presses the `N` key
- **THEN** a new note is created at the center of the visible canvas area and receives focus

#### Scenario: Created note receives focus
- **WHEN** a new note is created
- **THEN** the note's textarea receives focus for immediate text entry

### Requirement: Move note
The system SHALL allow users to move a sticky note by dragging it.

#### Scenario: Drag note by header
- **WHEN** user presses pointer on the note header and moves the pointer
- **THEN** the note follows the pointer position and is re-rendered at the new coordinates

#### Scenario: Move note via keyboard
- **WHEN** a note is focused and user presses arrow keys
- **THEN** the note moves 10px in the corresponding direction
- **WHEN** user presses Shift + Arrow keys
- **THEN** the note moves 1px in the corresponding direction (fine adjustment)

#### Scenario: Note position persists after move
- **WHEN** user finishes dragging a note (pointer up)
- **THEN** the note stays at the new position

### Requirement: Resize note
The system SHALL allow users to change the size of a sticky note by dragging a resize handle.

#### Scenario: Drag resize handle
- **WHEN** user presses pointer on a resize handle at the bottom-right corner of a note
- **AND** moves the pointer to change the dimensions
- **THEN** the note width and height update accordingly, with a minimum size of 100×80

#### Scenario: Resize via keyboard
- **WHEN** a note is focused and user presses Shift + Arrow keys
- **THEN** the note width/height changes by 10px (right/down arrows increase, left/up arrows decrease)

#### Scenario: Resize respects minimum dimensions
- **WHEN** user attempts to resize a note below 100px width or 80px height
- **THEN** the resize operation is clamped to the minimum dimensions

### Requirement: Delete note via trash zone
The system SHALL allow users to delete a sticky note by dragging it over a predefined trash zone.

#### Scenario: Drag note to trash zone
- **WHEN** user drags a note and the note overlaps the trash zone at the bottom of the screen
- **THEN** the trash zone visually indicates it is active (highlighted)
- **WHEN** user releases the note while it overlaps the trash zone
- **THEN** the note is removed from the canvas

#### Scenario: Delete note via keyboard
- **WHEN** a note is focused and user presses the Delete key
- **THEN** the note is removed and focus moves to the next logical note

#### Scenario: Trash zone announces deletion
- **WHEN** a note is deleted via the trash zone
- **THEN** a screen reader announcement is made ("Note deleted")
