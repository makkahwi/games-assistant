import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  loadPasswordHistory as loadRemotePasswordHistory,
  savePasswordHistory,
} from "services/passwordHistory";

const legacyHistoryKey = "password-history";
const gameIdKey = "password-game-id";

const createGameId = () => {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `password-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const getHistoryKey = (gameId) =>
  gameId ? `password-history-${gameId}` : legacyHistoryKey;

const parseStoredJson = (key, fallback) => {
  const value = localStorage.getItem(key);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const mergeHistory = (localHistory, remoteHistory) => {
  const merged = [...remoteHistory];
  const playedWords = new Set(remoteHistory.map(({ word }) => word));

  localHistory.forEach((score) => {
    if (!playedWords.has(score.word)) {
      merged.push(score);
      playedWords.add(score.word);
    }
  });

  return merged;
};

const getStoredGameId = () => {
  const master = localStorage.getItem("password-master") || "";
  let gameId = localStorage.getItem(gameIdKey) || "";

  if (master && !gameId) {
    gameId = createGameId();
    localStorage.setItem(gameIdKey, gameId);

    const legacyHistory = localStorage.getItem(legacyHistoryKey);

    if (legacyHistory) {
      localStorage.setItem(getHistoryKey(gameId), legacyHistory);
      localStorage.removeItem(legacyHistoryKey);
    }
  }

  return gameId;
};

const storedGameId = getStoredGameId();

const initValues = {
  gameId: storedGameId,
  master: localStorage.getItem("password-master") || "",
  members: (localStorage.getItem("password-members") &&
    JSON.parse(localStorage.getItem("password-members"))) || [
    ["", ""],
    ["", ""],
  ],
  history: parseStoredJson(getHistoryKey(storedGameId), []),
  playedHistory: [],
  historyStatus: "idle",
  historyError: "",
};

export const loadHistory = createAsyncThunk(
  "password/loadHistory",
  async () => loadRemotePasswordHistory(),
);

export const syncHistory = createAsyncThunk(
  "password/syncHistory",
  async (_, { getState }) => {
    const { gameId, history, playedHistory } = getState().password;
    const linkedHistory = history.map((score) => ({
      ...score,
      gameId: score.gameId || gameId,
    }));
    const mergedHistory = mergeHistory(playedHistory, linkedHistory);

    await savePasswordHistory(mergedHistory);

    return mergedHistory;
  },
);

export const passwordSlice = createSlice({
  name: "password",
  initialState: initValues,
  reducers: {
    setNames: (state, action) => {
      const gameId = action.payload?.gameId || createGameId();

      state.gameId = gameId;
      state.master = action.payload?.master;
      state.members = [
        [action.payload?.teamAmember1, action.payload?.teamAmember2],
        [action.payload?.teamBmember1, action.payload?.teamBmember2],
      ];
      state.history = [];
      state.playedHistory = [];
      state.historyStatus = "idle";
      state.historyError = "";

      localStorage.setItem(gameIdKey, gameId);
      localStorage.setItem("password-master", state.master);
      localStorage.setItem("password-members", JSON.stringify(state.members));
      localStorage.setItem(getHistoryKey(gameId), JSON.stringify(state.history));
    },
    addScores: (state, action) => {
      const score = { ...action.payload, gameId: state.gameId };

      state.history.push(score);
      state.playedHistory = mergeHistory(state.playedHistory, [score]);

      localStorage.setItem(
        getHistoryKey(state.gameId),
        JSON.stringify(state.history),
      );
    },
    reset: (state) => {
      const gameId = state.gameId;

      localStorage.removeItem(gameIdKey);
      localStorage.removeItem("password-master");
      localStorage.removeItem("password-members");
      localStorage.removeItem(legacyHistoryKey);

      if (gameId) {
        localStorage.removeItem(getHistoryKey(gameId));
      }

      state.gameId = "";
      state.master = "";
      state.members = [
        ["", ""],
        ["", ""],
      ];
      state.history = [];
      state.playedHistory = [];
      state.historyStatus = "idle";
      state.historyError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadHistory.pending, (state) => {
        state.historyStatus = "loading";
        state.historyError = "";
      })
      .addCase(loadHistory.fulfilled, (state, action) => {
        if (!action.payload) {
          state.historyStatus = "disabled";
          return;
        }

        state.playedHistory = mergeHistory(action.payload, state.history);
        state.historyStatus = "loaded";
        localStorage.setItem(
          getHistoryKey(state.gameId),
          JSON.stringify(state.history),
        );
      })
      .addCase(loadHistory.rejected, (state, action) => {
        state.historyStatus = "error";
        state.historyError = action.error.message || "History sync failed";
      })
      .addCase(syncHistory.pending, (state) => {
        state.historyError = "";
      })
      .addCase(syncHistory.fulfilled, (state, action) => {
        state.playedHistory = action.payload;
        state.historyStatus = "synced";
      })
      .addCase(syncHistory.rejected, (state, action) => {
        state.historyStatus = "error";
        state.historyError = action.error.message || "History sync failed";
      });
  },
});

// Action creators are generated for each case reducer function
export const { setNames, addScores, reset } = passwordSlice.actions;

export default passwordSlice.reducer;
