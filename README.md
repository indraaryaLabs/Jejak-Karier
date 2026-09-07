# Jejak Karier

Jejak Karier is a local-first mobile job application tracker built with Expo, React Native, TypeScript, and SQLite. It turns scattered notes and spreadsheets into a private pipeline that runs on the device.

## Features

- Application CRUD backed by local SQLite
- Seven fixed statuses, search, status filters, notes, and status history
- Local reminders with completion tracking
- Home dashboard and status distribution insights
- Optional fictional sample data with full-data deletion
- Indonesian interface with system light/dark theme support

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

To install a standalone Android APK without keeping a development server running, use the EAS cloud build:

```bash
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

Open the completed build link on the Android phone, download the APK, and install it. The `preview` profile is configured for direct APK installation.

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

The current MVP intentionally excludes JSON import, biometrics, cloud sync, calendar integration, custom pipeline statuses, and advanced reminder notifications. iOS builds require an Apple Developer account and TestFlight or an ad hoc distribution profile.
