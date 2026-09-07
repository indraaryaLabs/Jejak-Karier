# Product Requirements Document — Job Application Tracker

> **Working title:** Job Application Tracker  
> **Product type:** Personal, local-first mobile application  
> **Platforms:** iOS first, Android compatible  
> **Document version:** 1.0  
> **Status:** Ready for implementation  
> **Target build time:** 7–10 focused working days with an AI coding agent  
> **Language:** Indonesian by default; architecture must be ready for English localization  

---

## 1. Executive Summary

Job Application Tracker is a focused mobile app for recording job opportunities, monitoring application progress, remembering follow-ups, and understanding the user's job-search pipeline without spreadsheets.

The product is designed primarily for personal use and as a polished portfolio project. It must feel like a deliberate, production-quality product: calm, fast, useful, visually refined, and native to the device. The app should not imitate a generic SaaS dashboard or use decorative UI that does not improve the task.

The MVP is **local-first and offline-first**. It requires no account, backend, subscription, paid API, or cloud database. All core data stays on the device in SQLite. This keeps development cost at Rp0 while making the first version faster to finish and easier to demonstrate.

The central product promise is:

> **Know where every opportunity stands, and what needs attention next.**

### MVP outcome

At completion, a user must be able to:

1. Save and edit a job opportunity in under one minute.
2. See all applications and their current stages.
3. Move an application through a clear recruitment pipeline.
4. Add notes and see a chronological history of important changes.
5. Schedule local reminders for follow-ups, interviews, and deadlines.
6. Find a specific application quickly through search, filters, and sorting.
7. View honest, locally calculated insights about their search activity.
8. Export their data without creating an account.

---

## 2. Product Context and Reference Analysis

This product takes functional lessons from established global job-search products, but narrows them into a more focused mobile experience.

| Reference | What is worth adopting | What must not be copied into this MVP |
| --- | --- | --- |
| [Huntr](https://huntr.co/product/job-tracker) | Clear visual pipeline, job cards, dates, tasks, notes, and a sense of progress | Horizontal desktop Kanban drag-and-drop, map view, resume builder, autofill, and contact CRM |
| [Teal Job Tracker](https://www.tealhq.com/tools/job-tracker) | A single place for job details, status, notes, contacts, and follow-up context | Resume scoring, AI writing, browser extension, email automation, and other platform-scale features |
| [Simplify Tracker](https://simplify.jobs/job-application-tracker) | Status-centric organization, quick summaries, follow-up awareness, and simple analytics | Automatic application capture, browser autofill, job matching, and remote account sync |
| [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines) | Clear hierarchy, familiar navigation, readable content, native behavior, restraint, and accessibility | Literal imitation of system apps or excessive translucent “glass” surfaces |
| [Material Design 3](https://m3.material.io/components/navigation-bar/guidelines) | Android-appropriate navigation, 48dp touch behavior, predictable back navigation, and accessible component states | Making Android look exactly like iOS |

### Product interpretation

- Use Huntr's **pipeline clarity**, not its desktop board density.
- Use Teal's **detail completeness**, not its feature volume.
- Use Simplify's **at-a-glance insight**, not its automation ecosystem.
- Use Apple HIG as the primary interaction foundation.
- Respect Android conventions where platform behavior differs. React Native explicitly supports platform-specific behavior when needed, so the product may share most code while adapting selected interactions per platform ([React Native platform-specific code](https://reactnative.dev/docs/platform-specific-code)).

### Positioning

Unlike feature-heavy job-search suites, this app is a private, focused application journal. Its value comes from clarity and consistent use, not AI generation or automatic applying.

---

## 3. Goals and Non-Goals

### 3.1 Product goals

- Replace a spreadsheet or scattered notes with one coherent mobile workflow.
- Make the next important action visible within seconds of opening the app.
- Reduce missed interviews, deadlines, and follow-ups through local reminders.
- Provide enough structure to create reliable habits without turning job searching into data entry.
- Demonstrate portfolio-level skills in product thinking, mobile UX, data modeling, accessibility, offline persistence, and quality assurance.
- Complete the MVP with no paid infrastructure or API usage.

### 3.2 Success criteria for the MVP

- A new application can be created in no more than 60 seconds with only three required fields.
- The dashboard identifies overdue and upcoming actions without opening another screen.
- Search and status filtering return the correct results for at least 100 stored applications.
- All data remains available after closing and reopening the app.
- Local reminders can be created, edited, completed, and cancelled correctly.
- The app has useful empty, loading, success, error, and destructive-confirmation states.
- Core flows pass on at least one iPhone-sized viewport and one common Android viewport.
- No unfinished buttons, fake AI, fabricated analytics, placeholder text, or dead navigation ships in the final build.

### 3.3 Non-goals for v1

The following are explicitly out of scope:

- Account registration, login, multi-user support, or cloud synchronization.
- Web dashboard or desktop app.
- Job discovery, job-board scraping, or browser extension.
- Automatic job application submission or form autofill.
- AI resume writing, cover-letter generation, ATS scoring, or paid LLM APIs.
- Email or calendar account integration.
- Contact relationship management beyond simple recruiter/contact fields.
- File attachments for CVs, portfolios, or certificates.
- Collaborative sharing.
- Complex custom pipeline creation.
- Drag-and-drop Kanban on mobile.
- Gamification, streaks, badges, motivational quotes, or arbitrary “job fit scores.”

These exclusions are scope safeguards, not future commitments.

---

## 4. Target User

### Primary persona

**Independent job seeker**

- Actively applying to multiple roles.
- Mostly discovers openings through LinkedIn, company career pages, job boards, WhatsApp, or referrals.
- Currently uses memory, browser bookmarks, notes, or a spreadsheet.
- Needs to know which applications are active, when to follow up, and what happened previously.
- Values privacy and does not need cross-device collaboration in the first version.
- Uses a phone as the fastest place to update application status.

### Primary jobs-to-be-done

- “When I find a relevant opening, I want to save it quickly so I do not lose or duplicate it.”
- “When a recruiter contacts me, I want to see the job context and my previous notes immediately.”
- “When I open the app, I want to know what needs attention today.”
- “When my search feels unclear, I want a factual view of my pipeline without inflated or invented claims.”

---

## 5. Scope and Priorities

### P0 — Required for MVP

1. First-run welcome and meaningful empty state.
2. Dashboard with pipeline summary and next actions.
3. Create, view, edit, and delete an application.
4. Seven fixed statuses: Saved, Applied, Assessment, Interview, Offer, Rejected, Withdrawn.
5. Application list with search, filter, and sort.
6. Status update with automatic history entry.
7. Notes and chronological activity timeline.
8. Local reminders for Follow-up, Interview, Deadline, and Other.
9. Insights calculated only from local data.
10. Light and dark themes, defaulting to the system setting.
11. Local SQLite persistence.
12. JSON and CSV export through the native share sheet.
13. Settings, demo data, privacy explanation, and destructive “Delete all data.”
14. Accessibility basics and reduced-motion support.

### P1 — Build only after all P0 acceptance criteria pass

- Import previously exported JSON with schema validation and a confirmation preview.
- Optional app lock using device biometrics, if it works without creating unstable platform-specific code.
- Swipe actions for quick status change and reminder completion.
- Home-screen quick action for “Add application.”
- App icon and launch screen refinement beyond the functional placeholder.

### P2 — Future possibilities, not part of this build

- Encrypted cloud backup and multi-device sync.
- Calendar integration.
- Resume/CV version tracking.
- Share extension to capture jobs from Safari or Chrome.
- Custom pipeline statuses.
- Tablet-specific board layout.
- Web companion.

---

## 6. Information Architecture

Use a four-destination bottom tab bar. Four destinations stay within the three-to-five range recommended for small-screen navigation by Material Design, while remaining familiar on iOS.

| Tab | Purpose | Primary action |
| --- | --- | --- |
| Home | Current overview and tasks needing attention | Add application |
| Applications | Searchable source of truth for all opportunities | Add application |
| Insights | Factual patterns and pipeline distribution | Change time range |
| Settings | Preferences, data tools, privacy, and app information | Context dependent |

### Navigation hierarchy

```text
Root
├── First-run welcome
├── Tabs
│   ├── Home
│   ├── Applications
│   ├── Insights
│   └── Settings
├── Application detail
├── Add/Edit application modal
├── Add/Edit reminder modal
├── Add note modal
└── Filters sheet
```

### Navigation rules

- Use native-feeling stacks and sheets through Expo Router.
- iOS: forms open as sheets where appropriate; destructive actions use confirmation dialogs/action sheets.
- Android: respect the system back button and use platform-appropriate modal presentation.
- Preserve list search/filter state when opening and returning from details.
- Deep-link notification taps to the related application detail.
- Do not hide core actions inside an ambiguous ellipsis if there is adequate space.

---

## 7. Core Data Model

SQLite is the source of truth. Expo documents SQLite as persistent across app restarts and suitable for local-first applications ([Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/), [Expo local-first guide](https://docs.expo.dev/guides/local-first/)).

### 7.1 `applications`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | TEXT UUID | Yes | Generated locally |
| `company_name` | TEXT | Yes | Trim whitespace; 1–100 characters |
| `role_title` | TEXT | Yes | 1–120 characters |
| `status` | TEXT enum | Yes | Default `saved` |
| `priority` | TEXT enum | Yes | `low`, `medium`, `high`; default `medium` |
| `source` | TEXT nullable | No | LinkedIn, JobStreet, referral, company site, etc. |
| `job_url` | TEXT nullable | No | Validate as an http/https URL if provided |
| `location` | TEXT nullable | No | Free text |
| `work_mode` | TEXT enum nullable | No | `onsite`, `hybrid`, `remote` |
| `employment_type` | TEXT enum nullable | No | `full_time`, `part_time`, `contract`, `internship`, `freelance` |
| `salary_min` | INTEGER nullable | No | Non-negative |
| `salary_max` | INTEGER nullable | No | Must be greater than or equal to min |
| `salary_currency` | TEXT | Yes | Default `IDR` |
| `salary_period` | TEXT enum nullable | No | `month`, `year`, `project`, `hour` |
| `contact_name` | TEXT nullable | No | Recruiter or hiring contact |
| `contact_email` | TEXT nullable | No | Validate only when filled |
| `job_description` | TEXT nullable | No | Plain text; no rich-text editor |
| `personal_notes` | TEXT nullable | No | Optional summary; timeline notes remain separate |
| `saved_at` | INTEGER timestamp | Yes | Defaults to creation time |
| `applied_at` | INTEGER timestamp nullable | No | Auto-suggest current time when status first becomes Applied |
| `created_at` | INTEGER timestamp | Yes | Immutable |
| `updated_at` | INTEGER timestamp | Yes | Updated on every mutation |

### 7.2 `activities`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | TEXT UUID | Yes | Generated locally |
| `application_id` | TEXT FK | Yes | Cascade delete |
| `type` | TEXT enum | Yes | `created`, `status_change`, `note`, `reminder_created`, `reminder_completed` |
| `title` | TEXT | Yes | Human-readable event title |
| `body` | TEXT nullable | No | Note or contextual detail |
| `from_status` | TEXT nullable | No | Only for status changes |
| `to_status` | TEXT nullable | No | Only for status changes |
| `occurred_at` | INTEGER timestamp | Yes | Chronological ordering |

### 7.3 `reminders`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | TEXT UUID | Yes | Generated locally |
| `application_id` | TEXT FK | Yes | Cascade delete |
| `type` | TEXT enum | Yes | `follow_up`, `interview`, `deadline`, `other` |
| `title` | TEXT | Yes | 1–100 characters |
| `notes` | TEXT nullable | No | Brief context |
| `due_at` | INTEGER timestamp | Yes | Stored consistently; display in local timezone |
| `notification_id` | TEXT nullable | No | Returned by notification scheduler |
| `is_completed` | INTEGER boolean | Yes | Default false |
| `completed_at` | INTEGER timestamp nullable | No | Set when completed |
| `created_at` | INTEGER timestamp | Yes | Immutable |
| `updated_at` | INTEGER timestamp | Yes | Updated on mutation |

### 7.4 `settings`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `key` | TEXT PK | Yes | Stable setting key |
| `value` | TEXT | Yes | JSON-encoded when appropriate |

Initial keys: `theme`, `locale`, `default_currency`, `week_start`, `onboarding_completed`, `demo_data_loaded`, and `schema_version`.

### Database rules

- Enable foreign-key enforcement.
- Use parameterized statements only.
- Store enums as stable English identifiers; localize labels at the UI layer.
- Implement versioned, idempotent migrations from the first commit.
- Never silently delete or rewrite user records during a migration.
- Repository functions return typed domain objects, not raw database rows.
- UI components must not execute SQL directly.

---

## 8. Status Model and Business Rules

### Pipeline order

1. Saved
2. Applied
3. Assessment
4. Interview
5. Offer

Terminal statuses:

- Rejected
- Withdrawn

### Status behavior

- Any status may move to any other status; real recruitment processes are not always linear.
- Every status change creates one activity record showing the old and new status.
- Returning to the same status creates no duplicate activity.
- On the first transition to `applied`, suggest setting `applied_at` to now. The user may edit it.
- Rejected and Withdrawn applications are excluded from “Active” totals but remain searchable.
- Offer remains active until the user explicitly marks it Rejected or Withdrawn; do not invent an “Accepted” state in v1.
- Deleting an application requires confirmation and deletes its activities, reminders, and scheduled notifications.

### Duplicate warning

When saving, compare a normalized combination of company name and role title against existing records.

- If a possible duplicate exists, show a non-blocking warning with “Review existing” and “Save anyway.”
- Never merge records automatically.

---

## 9. Functional Requirements by Screen

### 9.1 First-run experience

#### Purpose

Explain the product in one screen and get the user to useful content immediately.

#### Content

- Quiet wordmark/app name.
- Headline: “Keep every opportunity in view.”
- Short copy explaining that data stays on the device and no account is required.
- Primary button: “Add first application.”
- Secondary text action: “Explore with sample data.”

#### Rules

- No multi-page carousel.
- No permission request on launch.
- Notification permission is requested only when the user creates their first reminder.
- Selecting sample data creates a small, clearly fictional dataset and records that it was loaded.
- The user can delete demo data later without affecting records they created.

#### Acceptance criteria

- User can reach the add form with one tap.
- User can load sample data with one explicit action.
- The screen never reappears after completion unless onboarding state is reset during development.

### 9.2 Home

#### Purpose

Answer three questions: What is active? What needs attention? What changed recently?

#### Sections

1. **Header** — current date, restrained greeting, add button.
2. **Focus card** — nearest overdue or upcoming reminder; if none, show a useful calm state.
3. **Pipeline summary** — compact counts for Applied, Assessment, Interview, and Offer; tapping filters Applications.
4. **This week** — applications created/applied in the last seven calendar days.
5. **Upcoming** — up to five incomplete reminders ordered by due date.
6. **Recent activity** — last five status changes or notes.

#### Empty state

- Headline: “Your search starts here.”
- Explanation: save roles, track decisions, and remember follow-ups.
- Primary action: “Add application.”
- Secondary action: “Load sample data.”

#### Acceptance criteria

- Overdue items are visibly distinct but not alarmist.
- Dashboard numbers update immediately after application/reminder changes.
- Every card that appears interactive opens the relevant destination.
- No graph is displayed when there is insufficient data; show explanatory copy instead.

### 9.3 Applications list

#### Purpose

Provide a fast, trustworthy source of truth for every opportunity.

#### Layout

- Native header with title and add action.
- Search field below the header.
- Horizontally scrollable status filters: All, Active, Saved, Applied, Assessment, Interview, Offer, Rejected, Withdrawn.
- Sort control: Recently updated, Newest saved, Oldest saved, Company A–Z, Next action.
- Vertical list of application rows/cards.

#### Application card content

- Company initials monogram in a restrained colored tile; do not fetch remote logos.
- Role title.
- Company name.
- Status indicator.
- Location or work mode when present.
- Applied/saved date.
- Nearest incomplete reminder, if one exists.

#### Search behavior

- Search company, role, location, and source.
- Case-insensitive and whitespace-tolerant.
- Debounce only if necessary; with a local dataset under 500 records, immediate filtering is acceptable.

#### Acceptance criteria

- Search, status, and sort work together.
- “Active” excludes Rejected and Withdrawn.
- The selected filter remains when returning from detail.
- Zero results show a contextual clear-filter action.
- The list remains smooth with 500 seeded records.

### 9.4 Add/Edit application

#### Presentation

- iOS: form sheet/modal with Cancel and Save in the navigation bar.
- Android: full-screen modal or standard screen with back navigation and a clear Save action.

#### Form sections

**Essentials**

- Company name — required.
- Role title — required.
- Status — required, default Saved.
- Priority — default Medium.

**Opportunity**

- Source.
- Job URL.
- Location.
- Work mode.
- Employment type.
- Saved date and applied date.

**Compensation**

- Minimum and maximum salary.
- Currency.
- Period.

**Contact**

- Name.
- Email.

**Context**

- Job description.
- Personal notes.

#### UX rules

- Show only Essentials initially, with other sections below in the same scroll view; do not use a wizard.
- Required fields are validated inline after blur and on save.
- Disable Save only while a save is in progress, not merely because optional fields are empty.
- If the user closes a dirty form, ask whether to discard changes.
- URL and email errors must explain how to fix the value.
- Salary fields use a numeric keyboard and locale-aware display.
- Saving creates a `created` activity for new records.

#### Acceptance criteria

- Valid data saves once even if the user taps Save repeatedly.
- Keyboard never covers the focused field or primary action.
- Existing values are preserved when editing.
- Invalid min/max salary, email, or URL cannot be saved.
- Possible duplicates warn but do not block.

### 9.5 Application detail

#### Purpose

Act as the complete record for one opportunity.

#### Header

- Company initials tile.
- Role and company.
- Status control.
- Priority marker.
- Overflow menu: Edit and Delete.

#### Content order

1. Next incomplete reminder or “Add next action.”
2. Key facts: location, work mode, employment type, source, saved/applied dates.
3. Compensation, when present.
4. Recruiter/contact, when present, with copy email action.
5. Job link with “Open job posting.”
6. Notes/job description in collapsible sections when long.
7. Activity timeline.

#### Quick actions

- Change status.
- Add reminder.
- Add note.
- Open job URL.

#### Status control

- Open a bottom sheet/menu with all statuses.
- Clearly show the current status.
- Confirm only if a change would complete/cancel an existing reminder; ordinary changes need no extra confirmation.

#### Acceptance criteria

- All optional sections disappear cleanly when empty.
- Activity is newest first, with an optional “Show oldest first” toggle not required.
- External URL requires a valid supported scheme.
- Deletion states exactly what related information will be removed.
- Detail reflects edits immediately without a full app restart.

### 9.6 Add note

- Single multiline text field.
- Required after trimming whitespace.
- Save adds a `note` activity with current timestamp.
- A note can be deleted from its timeline item after confirmation.
- Editing existing notes is P1; do not add it unless implementation is stable.

### 9.7 Add/Edit reminder

#### Fields

- Type: Follow-up, Interview, Deadline, Other.
- Title — required and prefilled contextually.
- Date — required.
- Time — required.
- Notes — optional.

#### Notification behavior

- Ask notification permission at the moment the first reminder is saved.
- If permission is denied, still save the reminder and show a calm explanation that alerts are disabled.
- Schedule a local notification, not a remote push notification. Expo confirms that local notifications remain available without a remote notification service ([Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)).
- Notification title: reminder title.
- Notification body: `{role_title} at {company_name}`.
- Notification data contains only the application ID and a deep-link route.
- Editing reschedules the notification.
- Completing or deleting cancels it.
- A reminder due in the past may be saved but must be labeled Overdue and must not schedule a notification retroactively.

#### Acceptance criteria

- Reminder state is correct even when notification permission is denied.
- Tapping a notification opens the related application when supported.
- No duplicate scheduled notifications remain after editing.
- Completing a reminder updates Home and adds an activity event.

### 9.8 Insights

#### Purpose

Show factual patterns, not predictions or motivational scoring.

#### Time ranges

- 7 days.
- 30 days — default.
- All time.

#### Metrics

| Metric | Formula |
| --- | --- |
| Applications added | Count of records whose `created_at` is inside the selected range |
| Applications submitted | Count with `applied_at` inside the selected range |
| Active pipeline | Current count excluding Rejected and Withdrawn; label as current, not range-based |
| Interview rate | Applications that have ever entered Interview ÷ applications that have ever entered Applied × 100 |
| Offer rate | Applications that have ever entered Offer ÷ applications that have ever entered Applied × 100 |
| Current status distribution | Current count grouped by status |
| Source breakdown | Count grouped by non-empty source, top five plus Other |

“Ever entered” must be derived from status-change activities and current status. The app must not infer responses, success, or recruiter behavior from missing data.

#### Visualization

- Use simple horizontal bars and numbers built with React Native views.
- Do not add a chart dependency for the MVP.
- Always show values in text, not color alone.
- When the denominator is zero, show `—`, not `0%`.
- Explain each rate through an info tooltip or short supporting label.

#### Acceptance criteria

- Calculations are covered by unit tests.
- Changing the range updates only range-based metrics.
- Insights do not claim causation, job fit, or probability of being hired.
- Empty state explains that insights will appear after adding applications.

### 9.9 Settings

#### Sections

**Appearance**

- Theme: System, Light, Dark.

**Preferences**

- Language: Indonesian; English entry may remain disabled with “Coming later” only if it is visually non-interactive. Prefer omitting it until localization is implemented.
- Default currency: IDR by default.
- Start of week: Monday or Sunday.

**Data**

- Export JSON.
- Export CSV.
- Import JSON — P1 only.
- Load sample data, if not loaded.
- Remove sample data.
- Delete all data.

**Privacy and About**

- “Your data stays on this device.”
- App version.
- Open-source licenses.
- Link to portfolio/source repository, if available.

#### Destructive action rules

- “Delete all data” requires a destructive confirmation that names the consequence.
- Do not rely on color alone.
- After deletion, cancel all notifications and return to the empty Home state.

---

## 10. Design Direction

### 10.1 Design statement

The visual language is **quiet editorial utility**: modern structure, classic restraint, warm neutral surfaces, confident typography, and very little decoration. It should feel crafted rather than generated.

The app should communicate seriousness without resembling a bank, enterprise CRM, or generic purple-gradient startup dashboard.

### 10.2 Design principles

1. **Content before chrome** — opportunity information is always more prominent than containers.
2. **One clear action per area** — do not scatter several equally loud buttons across a screen.
3. **Progressive disclosure** — show the essentials first; reveal deeper details when requested.
4. **Native familiarity** — use standard navigation, inputs, sheets, dates, haptics, and back behavior.
5. **Calm urgency** — overdue actions are clear, but never use aggressive full-screen warnings.
6. **Honest data** — display what the user recorded; never generate implied insights.
7. **Visual restraint** — premium quality comes from spacing, alignment, type, and states, not effects.

### 10.3 Anti-“AI slop” guardrails

Do not use:

- Purple/blue neon gradients.
- Decorative floating blobs, sparkles, magic-wand icons, or fake AI labels.
- Glassmorphism on every card.
- Oversized pills for every control.
- Excessive corner rounding or shadows.
- Emoji as interface icons.
- Random illustrations that add no functional meaning.
- Generic copy such as “Unlock your potential,” “Supercharge your journey,” or “Let AI transform your career.”
- Huge dashboard numbers without labels and context.
- Several unrelated accent colors competing on one screen.
- Remote company logos that create inconsistency, privacy concerns, or loading failure.

### 10.4 Color system

Use semantic tokens, never raw color literals inside screen components.

#### Light theme

| Token | Value | Usage |
| --- | --- | --- |
| `canvas` | `#F4F1EA` | Warm ivory app background |
| `surface` | `#FBFAF7` | Main cards and sheets |
| `surfaceRaised` | `#FFFFFF` | Elevated interactive surfaces |
| `ink` | `#20221F` | Primary text |
| `inkMuted` | `#686B65` | Secondary text |
| `line` | `#DED9CF` | Dividers and outlines |
| `primary` | `#214E45` | Deep evergreen primary action |
| `primaryPressed` | `#173A33` | Pressed state |
| `primarySoft` | `#DCE8E3` | Selected background |
| `danger` | `#9B3D3D` | Destructive actions and errors |
| `warning` | `#8A6428` | Overdue/attention state |

#### Dark theme

| Token | Value | Usage |
| --- | --- | --- |
| `canvas` | `#151714` | Main background |
| `surface` | `#1D201C` | Cards and sheets |
| `surfaceRaised` | `#262A25` | Elevated surfaces |
| `ink` | `#F2F0E9` | Primary text |
| `inkMuted` | `#B5B7B0` | Secondary text |
| `line` | `#353A34` | Dividers and outlines |
| `primary` | `#8FC0B1` | Primary action/content accent |
| `primaryPressed` | `#ADD3C7` | Pressed state |
| `primarySoft` | `#273D36` | Selected background |
| `danger` | `#E09292` | Destructive actions and errors |
| `warning` | `#D7AF6A` | Overdue/attention state |

#### Status colors

Use desaturated semantic pairs with text/icon plus color:

- Saved: stone.
- Applied: muted blue.
- Assessment: amber.
- Interview: plum.
- Offer: evergreen.
- Rejected: muted red.
- Withdrawn: neutral gray.

Each pair must meet WCAG AA contrast for its actual text/background usage. Final values may be adjusted after contrast testing; the status label must never depend on color alone.

### 10.5 Typography

- Functional UI: system font — San Francisco on Apple platforms and Roboto/system sans on Android.
- Editorial accent: **Newsreader SemiBold**, an open-source serif, used only for the first-run headline, large dashboard heading, and selected key numerals.
- Never use serif for form labels, body copy, tab labels, or dense list content.
- Support dynamic text scaling without clipped labels.
- Use a compact type scale rather than many arbitrary sizes:
  - Display: 32/36.
  - Screen title: 28/34.
  - Section title: 20/25.
  - Body: 16/22.
  - Secondary: 14/19.
  - Caption: 12/16.

### 10.6 Spacing, shape, and elevation

- Base spacing unit: 4.
- Standard screen gutter: 20 on phones; 24 on wider devices.
- Common vertical spacing: 8, 12, 16, 24, 32.
- Card radius: 16.
- Input/control radius: 12.
- Small status badge radius: fully rounded only where the compact shape is meaningful.
- Use 1px borders and tonal separation before shadows.
- Use at most one subtle shadow level. Avoid stacking shadowed cards.

### 10.7 Icons and imagery

- Use one consistent open-source icon family, preferably Lucide React Native.
- Default icon stroke should feel light but remain legible.
- Do not mix Lucide, emoji, and unrelated filled icon families.
- Company identity uses locally generated initials; no third-party logo API.
- Empty states should rely on excellent composition and copy. A custom illustration is optional and not required for MVP.

### 10.8 Motion and haptics

- Motion duration: approximately 180–240ms.
- Prefer fades, subtle position transitions, and native sheet motion.
- No bouncy overshoot for serious actions.
- Respect Reduce Motion.
- Use light selection haptics for status changes and success haptics for completed reminders on iOS; avoid haptics on every tap.

### 10.9 Platform adaptation

| Behavior | iOS priority | Android adaptation |
| --- | --- | --- |
| Navigation | Native stack, large-title behavior where appropriate | Standard top app bar and reliable system back |
| Forms | Sheet presentation with navigation actions | Full-screen modal/screen when more natural |
| Date/time | Native iOS picker presentation | Native Android date/time dialogs |
| Touch target | Minimum 44×44pt | Minimum 48×48dp |
| Feedback | Selective haptics | Ripple/press feedback; haptics only if appropriate |
| Destructive action | Action sheet/dialog | Material-style confirmation dialog |

The app must feel related across platforms, not pixel-identical.

---

## 11. Content Design

### Voice

- Direct, calm, professional, and human.
- Use concise Indonesian appropriate for a personal productivity tool.
- Avoid corporate jargon, motivational clichés, and unnecessary English.
- Prefer verbs that describe the exact result: “Tambah lamaran,” “Tandai selesai,” “Buka lowongan,” and “Hapus data.”

### Recommended Indonesian labels

| Concept | UI label |
| --- | --- |
| Application | Lamaran |
| Saved | Tersimpan |
| Applied | Dilamar |
| Assessment | Tes/Seleksi |
| Interview | Wawancara |
| Offer | Penawaran |
| Rejected | Ditolak |
| Withdrawn | Dibatalkan |
| Follow-up | Tindak lanjut |
| Deadline | Tenggat |

### Error copy examples

- Required company: “Masukkan nama perusahaan.”
- Invalid URL: “Gunakan tautan lengkap, misalnya https://…”
- Invalid salary range: “Batas maksimum tidak boleh lebih kecil dari batas minimum.”
- Database save failure: “Perubahan belum tersimpan. Coba lagi.”
- Notification denied: “Pengingat tersimpan, tetapi notifikasi perangkat belum diizinkan.”

---

## 12. Technical Architecture

### 12.1 Recommended stack

| Layer | Choice | Why | Cost |
| --- | --- | --- | --- |
| Framework | Expo + React Native + TypeScript | One codebase, native components, fast device testing, iOS/Android support | Free/open source |
| Navigation | Expo Router | File-based routing with native navigation support | Free/open source |
| Local database | `expo-sqlite` | Persistent, offline, relational, included in Expo Go | Free/open source |
| Forms | React Hook Form + Zod | Predictable forms and reusable schema validation | Free/open source |
| UI styling | React Native `StyleSheet` + centralized design tokens | Minimal configuration, stable, easy to audit | Free/open source |
| Icons | `lucide-react-native` | Consistent and restrained icon language | Free/open source |
| Dates | `date-fns` | Small, explicit date calculations and formatting | Free/open source |
| Notifications | `expo-notifications` | Local scheduling and device permission handling | Free/open source |
| Sharing/export | Expo FileSystem + Sharing | Local file creation and native share sheet | Free/open source |
| Tests | Jest + React Native Testing Library | Unit and component behavior testing | Free/open source |
| Code quality | TypeScript strict, ESLint, Prettier | Reliable agent output and consistent code | Free/open source |

Use the latest stable Expo SDK available when implementation starts. Install Expo-managed packages with `npx expo install` so native versions remain compatible; do not copy version numbers blindly from this PRD.

### 12.2 Why no backend

- The app is personal and single-device in v1.
- No account or collaboration is required.
- SQLite satisfies the core product needs and persists across launches.
- Removing authentication, network state, API security, and sync conflict handling dramatically reduces build time and bug surface.
- Export gives the user a manual path to backup data.

### 12.3 Suggested project structure

```text
app/
├── _layout.tsx
├── index.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── home.tsx
│   ├── applications.tsx
│   ├── insights.tsx
│   └── settings.tsx
├── application/
│   ├── [id].tsx
│   └── form.tsx
├── reminder/
│   └── form.tsx
└── note/
    └── form.tsx

src/
├── components/
│   ├── ui/
│   ├── applications/
│   ├── reminders/
│   └── insights/
├── db/
│   ├── client.ts
│   ├── migrations.ts
│   ├── schema.ts
│   └── repositories/
├── domain/
│   ├── application.ts
│   ├── activity.ts
│   ├── reminder.ts
│   └── insights.ts
├── hooks/
├── services/
│   ├── notifications.ts
│   ├── export.ts
│   └── demo-data.ts
├── theme/
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── ThemeProvider.tsx
├── utils/
└── validation/

assets/
├── fonts/
└── images/
```

### 12.4 State management

- SQLite is authoritative for domain data.
- Use focused hooks/services to load and mutate records.
- React Context may hold theme and simple app preferences.
- Do not add Redux, a remote-cache library, or another global state dependency unless a real implementation problem proves it necessary.
- After mutations, refresh only affected queries/views through a small repository invalidation/event mechanism.

### 12.5 Error handling

- Repository methods return explicit success/error results or throw typed errors handled at the screen boundary.
- Log technical details only in development.
- User messages must explain whether data was saved and what they can do next.
- Never catch errors silently.
- Add an error boundary around the application shell with a safe retry action.

---

## 13. Cost Boundary

### Rp0 during design, development, and portfolio demonstration

- VS Code/Codex-compatible editor: existing/free tooling.
- Expo, React Native, TypeScript, SQLite, packages, fonts, and icons: free/open source.
- Development database: stored on device, no hosting.
- Authentication/API usage: none.
- Testing on personal devices: Expo Go, Android emulator, or iOS Simulator when a Mac is available.
- Source control and portfolio repository: a free GitHub repository is sufficient.

### Important distribution caveat

“Rp0 until the app is finished” is achievable for development and demonstration, but public store publication is a separate cost boundary:

- Apple permits free registration and limited personal-device testing, but App Store distribution requires Apple Developer Program membership. Apple currently lists it at USD 99 per membership year ([Apple account overview](https://developer.apple.com/help/account/basics/about-your-developer-account), [Apple enrollment terms](https://developer.apple.com/programs/enroll/)).
- Google Play publication also requires a developer account fee under Google's current policies; verify the current regional price only when publication is planned.

Therefore, App Store and Play Store publication are **not included** in the Rp0 MVP definition. A working Expo project, device demo, screenshots, source repository, and Android local build are sufficient portfolio deliverables.

---

## 14. Privacy and Security

- Default to no network requests from application features.
- Store only information entered by the user.
- Do not request Contacts, Location, Photos, Email, or Calendar permission.
- Request notification permission contextually, not during onboarding.
- Use parameterized SQLite queries.
- Validate external URLs and allow only `http`/`https` schemes.
- Do not render job descriptions as HTML.
- Exports may contain personal notes and recruiter details; show this warning before sharing.
- Explain that deleting the app may delete local data unless the user exported a backup.
- Do not add analytics, advertising SDKs, crash-reporting SDKs, or trackers to the MVP.

---

## 15. Accessibility Requirements

React Native provides accessibility APIs for both VoiceOver and TalkBack ([React Native Accessibility](https://reactnative.dev/docs/accessibility)). The build must include:

- Accessibility label and role for every icon-only action.
- Status announced in text, never through color alone.
- Minimum touch targets of 44pt on iOS and 48dp on Android.
- Dynamic text support without clipped titles or inaccessible horizontal layouts.
- Logical screen-reader order.
- Clear focus behavior when forms display validation errors.
- Sufficient contrast in both themes.
- Reduced-motion behavior.
- Keyboard dismissal and keyboard avoidance that do not trap focus.
- Destructive actions described clearly before confirmation.

Target WCAG 2.2 AA principles where applicable to mobile UI.

---

## 16. Performance and Reliability

- Cold start should feel immediate on a typical mid-range device; target under 2 seconds in a production build where reasonably measurable.
- Common taps should respond visually within 100ms.
- Application list should remain smooth with 500 records.
- Use indexed fields for frequently queried timestamps/statuses where profiling shows value.
- Avoid unbounded database reads; cap recent activity and upcoming reminder queries.
- All saves must be atomic where several related records are written.
- Prevent repeated Save taps from creating duplicates.
- Cancel notifications before deleting their reminder/application records.
- Dates must remain correct across app restarts and timezone changes.

---

## 17. Testing Strategy

### 17.1 Unit tests — required

- Status ordering and active/terminal classification.
- Duplicate normalization.
- Salary validation.
- URL and email validation.
- Insight formulas, including zero denominators.
- Date-range boundaries.
- Reminder overdue/upcoming classification.
- Export serialization.

### 17.2 Repository/integration tests — required where practical

- Database initialization and repeatable migration.
- Create/read/update/delete application.
- Cascade deletion of activities and reminders.
- Status change creates exactly one activity.
- Reminder complete state persists.
- Demo data can be loaded once and removed selectively.

### 17.3 Manual end-to-end checklist — required

1. Fresh install opens welcome state.
2. Add first application with only required fields.
3. Add full application with every optional field.
4. Edit, close a dirty form, and verify discard confirmation.
5. Search, filter, sort, open detail, and return without losing list state.
6. Change every status and verify timeline entries.
7. Create, edit, complete, and delete reminders.
8. Deny notification permission and verify reminder still saves.
9. Test overdue and future reminders.
10. Export JSON and CSV and inspect their contents.
11. Switch light/dark/system themes.
12. Increase device text size and verify core screens.
13. Run VoiceOver/TalkBack through add, status change, and reminder completion.
14. Delete an application and verify related notification cancellation.
15. Delete all data and verify a clean empty state.

### 17.4 Target devices/viewports

- Compact iPhone viewport.
- Modern standard-size iPhone viewport.
- Common 360×800 Android viewport.
- One larger Android viewport.

Physical devices are preferred for notifications, keyboard behavior, haptics, and perceived performance.

---

## 18. Demo Data

Sample data helps the portfolio reviewer understand the product immediately.

Create 6–8 fictional applications distributed across stages. Requirements:

- Use clearly fictional or neutral company names; do not imply real employment activity.
- Include different sources, work modes, dates, notes, and reminders.
- Include at least one overdue follow-up, one future interview, one rejection, and one offer.
- Mark every seeded record with an internal demo flag or stable ID prefix so sample data can be removed without deleting user-created records.
- Do not silently load demo data on first launch.

---

## 19. Implementation Plan

This sequence is a scope guide, not a promise that every day has equal effort.

| Day | Deliverable |
| --- | --- |
| 1 | Project setup, routing, strict TypeScript, theme tokens, database schema, migrations |
| 2 | Application repository, validation, add/edit form, basic list |
| 3 | Application detail, status changes, notes, activity timeline |
| 4 | Reminders, local notifications, Home upcoming/focus sections |
| 5 | Search, filters, sort, all list/detail states |
| 6 | Insights calculations and visualizations, Settings, demo data |
| 7 | Export, theme completion, accessibility pass, copy refinement |
| 8 | Automated tests, manual cross-platform QA, bug fixes |
| 9 | Visual polish, app icon/launch screen, screenshots, README |
| 10 | Buffer for device-specific bugs and final release candidate |

### Cut order if time becomes limited

Cut only in this order:

1. Import JSON (already P1).
2. Biometrics, swipe actions, and quick actions (P1).
3. Source breakdown insight.
4. Serif accent font; fall back to system typography.

Do not cut persistence, add/edit/detail, search/filter, timeline, reminders, core insights, empty/error states, or accessibility basics.

---

## 20. Portfolio Deliverables

The finished project should contain:

- Working Expo React Native source code.
- `README.md` with product problem, solution, feature list, architecture, setup, decisions, known limitations, and screenshots.
- This `prd.md`.
- A short `DECISIONS.md` recording why the app is local-first and why major features were excluded.
- At least six polished screenshots: onboarding/empty, Home, Applications, filters, application detail, and Insights.
- A 30–60 second screen recording showing add → status change → reminder → insight update.
- Clear setup commands that work from a fresh clone.
- No secrets, local database files, or generated build folders committed to Git.

Recommended portfolio story:

> Designed and built a cross-platform, local-first job application tracker with an iOS-first interaction model, offline SQLite persistence, local reminders, data export, accessible themes, and testable analytics—without paid infrastructure.

---

## 21. Definition of Done

The MVP is done only when all conditions below are true:

- All P0 flows work on iOS and Android.
- Data persists across app restarts.
- No TypeScript errors, lint errors, or failing required tests.
- No runtime warnings during normal flows.
- No dead buttons, placeholder screens, misleading metrics, or incomplete P0 actions.
- Loading, empty, error, and destructive states are implemented.
- Notification denial and unavailable-notification cases do not break reminders.
- Exported JSON and CSV contain correct, readable data.
- Light and dark themes have verified contrast and no unreadable status colors.
- Large text does not block core actions.
- Destructive actions are confirmed and notifications are cleaned up.
- The README setup has been tested from a clean install.
- Final screenshots use intentional demo data and consistent device frames.

---

## 22. Instructions for the AI Coding Agent

Copy this section into the implementation prompt together with the full PRD.

### Operating rules

1. Treat this PRD as the source of truth. Do not expand the scope without explicit approval.
2. Implement P0 completely before touching P1.
3. Use the latest stable Expo SDK and compatible package versions from official documentation.
4. Use TypeScript strict mode. Avoid `any`; justify any unavoidable exception in code comments.
5. Keep SQLite behind typed repositories. Never query the database directly from screen components.
6. Add a migration system before creating feature data.
7. Use centralized semantic design tokens; never scatter raw color, spacing, or radius literals across screens.
8. Build reusable primitives only when at least two real uses exist. Avoid an over-engineered component framework.
9. Implement real loading, empty, error, permission-denied, and destructive states as each feature is built.
10. Do not add APIs, authentication, cloud services, analytics SDKs, AI features, or paid dependencies.
11. Do not fabricate company logos, user activity, success rates, or backend responses.
12. Use parameterized SQL, validated URL schemes, and schema-validated forms.
13. Keep commits or work checkpoints small and feature-focused.
14. After each feature, run typecheck, lint, and relevant tests before continuing.
15. Verify visually on both an iOS and Android viewport; fix clipping, keyboard obstruction, safe-area, and back-navigation issues.
16. Do not call the app complete until the Definition of Done passes.

### Required implementation order

```text
Foundation
→ Database and repositories
→ Application CRUD
→ Detail/status/activity
→ Reminders and notifications
→ Home
→ Search/filter/sort
→ Insights
→ Settings/export/demo data
→ Themes/accessibility
→ Tests and visual QA
→ Portfolio documentation
```

### Agent verification commands

Use the actual scripts defined in `package.json`; ensure equivalents exist for:

```bash
npm run typecheck
npm run lint
npm test
npx expo-doctor
```

The agent must report:

- What was implemented.
- What was tested and on which platform/viewports.
- Any remaining limitation tied to a P1/P2 item.
- Exact commands required to run the app.

---

## 23. Final Product Decision Summary

| Decision | Chosen direction |
| --- | --- |
| Product scope | Focused personal application tracker |
| Primary platform | iOS-first interaction and polish |
| Android | Fully supported with platform-appropriate behavior |
| Architecture | Local-first, offline-first |
| Backend/auth | None in v1 |
| Persistence | SQLite |
| Monetized/paid services | None |
| Core navigation | Four bottom tabs |
| Pipeline | Seven fixed statuses |
| Main differentiator | Calm, premium mobile UX with honest local insights |
| Visual tone | Quiet editorial utility; modern structure with classic restraint |
| Delivery target | 7–10 focused working days |
| Public app-store release | Outside the Rp0 MVP boundary |

---

## 24. Source Notes

The product requirements and scope decisions were informed by:

- [Huntr Job Application Tracker](https://huntr.co/product/job-tracker)
- [Huntr iOS App Store listing](https://apps.apple.com/us/app/huntr-job-search-browser/id1372389812)
- [Teal Job Application Tracker](https://www.tealhq.com/tools/job-tracker)
- [Simplify Job Application Tracker](https://simplify.jobs/job-application-tracker)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [Apple Design Resources](https://developer.apple.com/design/)
- [Material Design 3 navigation guidance](https://m3.material.io/components/navigation-bar/guidelines)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [React Native platform-specific code](https://reactnative.dev/docs/platform-specific-code)
- [Expo Router](https://docs.expo.dev/versions/latest/sdk/router/)
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [Expo local-first guide](https://docs.expo.dev/guides/local-first/)
- [Apple Developer account overview](https://developer.apple.com/help/account/basics/about-your-developer-account)
- [Apple Developer Program enrollment](https://developer.apple.com/programs/enroll/)
