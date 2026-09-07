# Jejak Karier — implementation design

Jejak Karier is an offline-first Expo application that follows the approved PRD and supplied prototype. The visual direction is quiet editorial utility: warm paper-like surfaces, deep forest green actions, restrained status colors, Newsreader headings, and compact native controls.

The application uses Expo Router for four tabs plus modal/detail routes. SQLite is the only source of domain truth. Typed repository functions own SQL, migrations, cascades, status-history creation, and demo-data boundaries. A focused React context exposes data and mutations; screens never execute SQL. Device settings hold theme and onboarding state through the same database.

P0 includes onboarding, CRUD, duplicate warnings, status history, notes, reminders and local notifications, dashboard, search/filter/sort, local insights, system/light/dark themes, JSON/CSV export, demo-data management, accessibility states, and destructive confirmations. P1/P2 features—import, biometrics, cloud sync, calendar integration, and custom pipelines—are deliberately excluded.

Failures surface at screen boundaries with actionable Indonesian copy. Notification denial does not block reminder persistence. Multi-record writes use database transactions. Tests cover status rules, validation, date/reminder classification, insights, duplicate normalization, and export serialization. Completion gates are TypeScript, ESLint, Jest, Expo Doctor, and responsive visual inspection.
