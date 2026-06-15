## ADDED Requirements

### Requirement: Select note color
The system SHALL allow users to change the color of a sticky note from a predefined palette.

#### Scenario: Change color via toolbar
- **WHEN** user selects a note
- **AND** user clicks a color swatch in the toolbar's color picker
- **THEN** the selected note's background color updates to the chosen color

#### Scenario: Change color via keyboard
- **WHEN** a note is focused
- **AND** user presses a number key (1-5) corresponding to a color preset
- **THEN** the note's color updates to the corresponding preset

### Requirement: Predefined color palette
The system SHALL provide a set of predefined colors that meet WCAG AAA contrast requirements.

#### Scenario: Default color palette is available
- **WHEN** user opens the color picker
- **THEN** at least 5 color options are displayed, each with a visible label (color name)

#### Scenario: Colors meet contrast requirements
- **WHEN** any color from the palette is applied to a note
- **THEN** the note text remains readable with WCAG AAA contrast ratio against the note background

### Requirement: Color is displayed on the note
The system SHALL visually indicate a note's current color.

#### Scenario: Note reflects selected color
- **WHEN** a color is applied to a note
- **THEN** the note background displays that color immediately
