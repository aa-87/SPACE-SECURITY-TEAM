# Field Log 002 — Breath observation log

**Status:** Implemented at `/public/space-security/breath-log/index.html`.

## Purpose and framing

This standalone tool records individual breath-hold durations entered after the fact, with date/time and optional context/notes. It is a record-keeping utility, not a training plan, medical device, diagnostic tool, or cardiovascular-fitness program.

The founder reports that breath-hold practice felt personally useful during recovery from a leg injury, when typical cardio activity was difficult. That first-person experience is part of the project's origin story; the app does not claim breath-holding improves cardiovascular fitness, replaces aerobic exercise, or is safe or appropriate for other people.

## Implemented scope

- Retrospective duration entry in minutes and seconds.
- Date/time and optional context and notes.
- Observation history and individual deletion.
- JSON export/import and delete-all control.
- Browser `localStorage` only; no account, analytics, telemetry, network calls, or cloud synchronization.
- Standalone HTML/CSS/SVG/JavaScript with dark/light theme support and responsive layout.

## Safety design

There is deliberately **no live hold timer, countdown, coaching, duration target, personal-best prompt, streak, leaderboard, or performance score**. The user enters a duration after an observation has ended.

A prominent safety notice explains that breath-holding can cause dizziness, fainting, blackout, or drowning. It warns against practice in or near water, while driving or standing, alone, after hyperventilation, or anywhere a loss of consciousness could cause injury. It advises stopping if unwell and consulting a qualified clinician about individual suitability. The app is not medical guidance and cannot make the activity safe.

## Data and privacy

Records contain a locally generated ID, ISO timestamp, duration in seconds, and optional user-authored context/notes. Data stays in the current browser profile unless exported. Browser storage is not encrypted by this app and may be visible to anyone with access to that profile; clearing browser storage may erase it.

## Verification

Test duration validation, add/delete, JSON export/import, delete-all, theme persistence, mobile layout, keyboard use, and offline operation after the page has loaded.
