# Yalla Break | يلا بريك

Arabic and English games for workday breaks with colleagues in Jordan, built with React and Vite.

PassWord and Pictionary are 2 vs 2 games with two named players per team and a
separate host. Turns alternate A1 → B1 → A2 → B2, swapping clue-giver/artist
and guesser roles within each team after both teams have played. PassWord wrong
answers pass the current word to the other team and reduce available points.
Pictionary allows only the active team to score; a correct guess or Pass turn
advances the round.

Mafia is a separate multiplayer group game with no configured upper player limit.
The host selects role counts directly; it does not use fixed teams. ListWords
and CatchPhrase remain coming soon. Older saved game formats remain resumable.
Each game keeps its own players and scores locally.

## Development

Use Node.js 24 (`nvm use`) and Yarn 1.22.22. Node.js 22.12+ is also supported.

```sh
yarn install --frozen-lockfile
cp .env.example .env.local
yarn dev
```

Vite prints the local development URL. `yarn start` is an alias for `yarn dev`.

```sh
yarn build       # Production assets in build/
yarn preview     # Serve the production build locally
yarn extract-translation
yarn test        # Roster, rotation, and saved-session regression checks
```

Commit `yarn.lock` with dependency changes. Deploy the contents of `build/` to a
static host configured to serve `index.html` for client-side routes such as
`/password` and `/pictionary`.

## Firebase history

PassWord history and word bank sync use Firebase Realtime Database through
`VITE_FIREBASE_DATABASE_URL`. Played words are stored globally, so a word used
in any PassWord game is excluded from future games.

```env
VITE_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
```

History is stored at `/password-history`.

When migrating an existing environment, rename `REACT_APP_FIREBASE_DATABASE_URL`
to `VITE_FIREBASE_DATABASE_URL` in local files and hosting settings, then rebuild.
Vite exposes `VITE_` variables to the browser; use them only for public configuration.
