# Jejak Karier

Jejak Karier is a polished, local-first mobile job application tracker built with Expo, React Native, TypeScript, and SQLite. It turns scattered notes and spreadsheets into a private pipeline with reminders and factual insights.

## Features

- One-screen onboarding with optional fictional sample data
- Application CRUD with duplicate warnings and seven fixed statuses
- Search, status filters, five sorting modes, and preserved tab state
- Notes and automatic chronological status history
- Local follow-up, interview, deadline, and custom reminders
- Home focus card, upcoming actions, pipeline counts, and recent activity
- 30-day, 90-day, and all-time insights calculated locally
- System, light, and dark themes
- JSON and CSV export through the native share sheet
- Selective demo-data removal and confirmed full data deletion
- Indonesian interface, scalable text, accessible labels, and minimum touch targets

## Architecture

SQLite is authoritative. Versioned migrations create the schema and indexes; typed repository functions own queries and transactional writes. `AppDataProvider` exposes focused mutations and refreshes affected data. Screens use Expo Router and shared semantic design tokens without querying SQL directly.

See [DECISIONS.md](./DECISIONS.md), [prd.md](./prd.md), and [the implementation design](./docs/plans/2026-09-08-job-tracker-design.md).

## Run locally

Requirements: Node.js 22.13 or newer and Expo Go / an Android emulator / an iOS simulator.

```bash
npm install
npm start
```

Then scan the Expo QR code, press `a` for Android, or press `i` on macOS for iOS.

Android Expo Go can review the full UI, SQLite data, and reminder flows, but Expo SDK 53+ does not expose native push-notification APIs inside Expo Go. To test actual device notifications, create a development build instead:

```bash
npx expo install expo-dev-client
npx expo run:android
npx expo start --dev-client
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npx expo-doctor
```

## Privacy

No account, analytics SDK, advertising SDK, or cloud database is included. Data remains on the device unless the user explicitly exports and shares it. Uninstalling the app can remove unexported data.

## Current limitations

P1/P2 items from the PRD are intentionally excluded: JSON import, biometrics, quick actions, cloud sync, calendar integration, and custom pipeline statuses. iOS builds require macOS; notification behavior should be confirmed on a physical device before distribution.
