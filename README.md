# Multi-Game Assistant

- PassWord Game
- Pictionary Game
- ListWords Game
- CatchPhrase Game

## Firebase history

PassWord history sync uses one shared Firebase Realtime Database history through
`REACT_APP_FIREBASE_DATABASE_URL`. Played words are stored globally, so a word
used in any PassWord game is excluded from future games.

Example:

```env
REACT_APP_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
```

Remote path:

```txt
/password-history
```
