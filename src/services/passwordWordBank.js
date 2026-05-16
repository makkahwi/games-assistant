const firebaseDatabaseUrl = process.env.REACT_APP_FIREBASE_DATABASE_URL;

const normalizeDatabaseUrl = (url) => url?.replace(/\/$/, "");

const getWordBankUrl = () => {
  const databaseUrl = normalizeDatabaseUrl(firebaseDatabaseUrl);

  if (!databaseUrl) {
    return "";
  }

  return `${databaseUrl}/wordsBank.json`;
};

const collectWords = (value) => {
  if (Array.isArray(value)) {
    return value.flatMap((item) => {
      if (typeof item === "string") {
        return item;
      }

      if (Array.isArray(item?.words)) {
        return item.words.filter((word) => typeof word === "string");
      }

      return collectWords(item);
    });
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectWords);
  }

  return [];
};

export const isPasswordWordBankEnabled = Boolean(
  normalizeDatabaseUrl(firebaseDatabaseUrl),
);

export const loadPasswordWordBank = async () => {
  const url = getWordBankUrl();

  if (!url) {
    return [];
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to load password word bank");
  }

  const wordBank = await response.json();

  return [...new Set(collectWords(wordBank).filter(Boolean))];
};
