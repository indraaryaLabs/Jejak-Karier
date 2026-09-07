# Product decisions

## Local-first by default

Jejak Karier stores applications, activities, reminders, and preferences in SQLite on the device. The MVP has no account, backend, analytics, or network-dependent product feature. This reduces operational cost, protects private job-search notes, and keeps the app useful offline.

## Fixed pipeline

Seven fixed statuses cover the intended MVP while keeping insights comparable and forms fast. Custom pipelines are intentionally deferred.

## Native mobile interaction

The supplied HTML prototype is a visual reference, not an implementation dependency. Expo Router, native inputs, platform date/time pickers, notification APIs, safe areas, and device share sheets preserve expected iOS and Android behavior.

## Honest insights

Metrics are calculated only from locally stored records. Empty and low-data states avoid fabricated recommendations or misleading success predictions.

## Explicitly excluded

Cloud sync, authentication, AI features, calendar/email integration, JSON import, biometrics, drag-and-drop Kanban, and automatic job capture remain outside P0.
