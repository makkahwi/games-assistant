const firebaseDatabaseUrl = process.env.REACT_APP_FIREBASE_DATABASE_URL;

const normalizeDatabaseUrl = (url) => url?.replace(/\/$/, "");

const getHistoryUrl = () => {
  const databaseUrl = normalizeDatabaseUrl(firebaseDatabaseUrl);

  if (!databaseUrl) {
    return "";
  }

  return `${databaseUrl}/password-history.json`;
};

export const isPasswordHistorySyncEnabled = Boolean(
  normalizeDatabaseUrl(firebaseDatabaseUrl),
);

export const loadPasswordHistory = async () => {
  const url = getHistoryUrl();

  if (!url) {
    return null;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to load password history");
  }

  const history = await response.json();

  return Array.isArray(history) ? history : [];
};

export const savePasswordHistory = async (history) => {
  const url = getHistoryUrl();

  if (!url) {
    return null;
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(history),
  });

  if (!response.ok) {
    throw new Error("Unable to save password history");
  }

  return response.json();
};
