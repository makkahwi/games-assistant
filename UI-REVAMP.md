# UI revamp tracker

## Confirmed scope
Employees in Jordan, Arabic/English, mobile and PC. Full visual redesign; preserve game logic, routes, API contracts, stored sessions, and permissions.

## Baseline audit
- React 19, Vite 8, Redux Toolkit, React Router, Bootstrap 5, i18next.
- Routes: `/`, `/password`, `/pictionary`, `/mafia`, `/listwords`, `/catchphrase`, and each game’s `-rules` route. Unknown routes redirect home.
- Shared setup, format picker, forms, game view, rules, score table, navigation, footer, and game cards.
- One light theme; no existing dark theme or switcher.
- Keyboard gaps: clickable div/li tabs in GameView and GameRules.
- Forms have accessible names but visible labels are not programmatically associated.
- Global Bootstrap overrides and repeated hard-coded colors hinder consistent styling.
- PassWord preserves opposing mobile table halves and desktop shared-screen presentation; retain this behavior.
- PassWord loading and sync errors exist; score empty states and other feedback need improvement.
- Existing staged Impeccable files and user changes in `src/consts/WordBank.js` are outside redesign edits.
- Baseline: 9 tests pass; production build passes.
- The interactive browser connector failed; isolated local Chrome production checks and captures succeeded.

## Direction candidates
1. Social table: cafe-signage warmth, plum/peach, spacious game list.
2. Community noticeboard: ink/bright paper, compact listings, clear availability.
3. Amman cultural program: typographic bilingual composition, olive/coral, rhythm across game entries.
4. Modern playing-card deck: white/navy/vermilion, compact type, role markers.
5. Midday courtyard: blue/white/green, open spacing, strong selected-format field.
6. Break club: cobalt/pale blue/yellow, readable club lettering, roster colors carried into play.
7. Office stationery: blue/white/orange, clear labels, precise aligned forms.

The Impeccable direction board presents candidate 6, candidate 1 as a pick, a competitive transit-color alternative, and assessed challengers. User instructed execution of the recommended Break Club direction.

## Batches
- [x] Repository and source audit
- [x] Confirm audience and brand freedom
- [x] Record PRODUCT.md
- [x] Select direction
- [x] Stage 1: tokens, typography, shell, controls, forms, accessible tabs
- [x] Stage 2: home and format/game selection
- [x] Stage 3: PassWord setup, table mode, teams, scores, rules
- [x] Stage 3: Pictionary setup, play, teams, scores, rules
- [x] Stage 3: Mafia setup, role reveal, rules
- [x] Stage 3: ListWords existing setup, play, teams, scores, rules
- [x] Stage 3: CatchPhrase existing setup, play, teams, scores, rules
- [x] Arabic/RTL, phone, tablet, desktop, keyboard, state verification
- [x] Independent finish review and design-system documentation

## Final validation
- 11 regression tests pass, including initial rules-section visibility and visible form-label associations.
- Production build passes. Routes, services, Redux reducers, permissions, and storage contracts retained.
- 84 browser matrix checks pass across all 11 routes, English/Arabic, 320/390/768/1440px widths. No page errors or page-level horizontal overflow.
- Browser interactions cover setup submission, word reveal, scoring, saved-format recovery, and arrow/Home/End tab navigation.
- Additional Arabic 320x600 PassWord round persisted exactly one six-point round; reduced-motion disables the game-list entrance animation.
- 66 final screenshots inspected by independent Impeccable finish reviewer. Disposition: **ship**, no material fixes.
- Detector returned no findings on changed UI targets; git diff whitespace check passes.
- No physical-device, screen-reader, or live Firebase end-to-end certification is claimed. Network loading/error handling retained and restyled; native browser validation retained.
- Existing single light theme supported. ListWords and CatchPhrase remain coming soon in the library while their existing routes remain available.
- Evidence: `.impeccable/review/browser-results.json` and named screenshots under `.impeccable/review/` (local working material).

## Deliverables
- `DESIGN.md`: normative tokens and shared component guidance.
- `.impeccable/design.json`: component previews and design metadata.
- `PRODUCT.md`: confirmed product constraints.
- Preview: http://127.0.0.1:5189/ (`npm run preview -- --host 127.0.0.1 --port 5189`).

All planned pages complete. No remaining implementation work from the review.

## Game-grouping correction
- [x] Landing defaults to 2 vs 2: PassWord and Pictionary only.
- [x] Separate multiplayer group: Mafia, no configured upper player limit; direct role-count setup.
- [x] New pair games always collect two names per team plus a host; normalize incoming legacy setup URLs to 2v2 on submission.
- [x] Turn order A1 → B1 → A2 → B2. PassWord alternates starting teams and rotates roles after both starts; Pictionary restricts scoring to the active team and supports passing. Legacy saved formats remain resumable.
- [x] Updated bilingual labels, rules, product brief, and README.
- [x] 12 tests and production build pass. Local Chrome exercised both complete four-turn cycles, new setup from old URLs, group switching, Arabic mobile, and Mafia with 1003 players.

## Appearance switch
- [x] Shared accessible moon/sun toggle plus full-screen PassWord control.
- [x] Light/dark palettes across shared screens, forms, tables, role reveal, game symbols and feedback states.
- [x] Saved `app-theme`, OS preference fallback/live updates, cross-tab sync and pre-render initialization.
- [x] Arabic/English labels and 320px mobile navigation.
- [x] 12 tests and build pass. Local Chrome verified keyboard toggle, reload persistence, OS changes, cross-tab synchronization, setup/rules pages, PassWord control and Arabic mobile without overflow.

## Restart and reset
- [x] Shared Game options disclosure on every game view/tab and directly in full-screen PassWord.
- [x] Restart preserves players/host (Mafia: role counts), clears scores, and reloads local round/timer/reveal state.
- [x] Reset clears only the chosen game's setup and returns to entry. Both actions require confirmation; cancel retains state.
- [x] Fixed ineffective legacy reset reducers and cleared ListWords/CatchPhrase scores on fresh setup/restart.
- [x] Removed Mafia's duplicate unconfirmed restart button.
- [x] 13 tests and production build pass. Isolated Chrome checks all5 games: restart, reset, cancellation, hidden reveal state, Escape/focus, and preservation of unrelated storage.
