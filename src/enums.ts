// Closed option sets shared by the data arrays and the components that render them.

export enum Lang {
  En = 'en',
  Tr = 'tr',
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum ButtonVariant {
  Primary = 'btn btn-primary',
  Secondary = 'btn',
}

export enum IconName {
  Star = 'star',
  X = 'x',
  Check = 'check',
  Notebook = 'notebook',
  Sheet = 'sheet',
  Folder = 'folder',
}

// Kinds of node in the reference graph; the legend CSS classes are `k-<kind>`.
export enum NodeKind {
  Series = 'series',
  Book = 'book',
  Chapter = 'chapter',
  Character = 'character',
  Location = 'location',
}

// Anchor ids of the page sections (nav links and `<section id>` share these).
export enum SectionId {
  Top = 'top',
  Problem = 'problem',
  Model = 'model',
  Engine = 'engine',
  Ethos = 'ethos',
  Open = 'open',
  Waitlist = 'waitlist',
}

export enum RuleSeverity {
  Error = 'error',
  Warning = 'warning',
}

// Rows of the file tree in the hero editor preview.
export enum TreeRowKind {
  Group = 'group',
  Folder = 'folder',
  File = 'file',
  ActiveFile = 'active-file',
}

// States of the waitlist form.
export enum WaitlistStatus {
  Idle = 'idle',
  Submitting = 'submitting',
  Success = 'success',
  Duplicate = 'duplicate',
  Invalid = 'invalid',
  Error = 'error',
}
