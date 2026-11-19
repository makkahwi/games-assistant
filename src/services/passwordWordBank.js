import { wordsBank } from "consts/WordBank";

const firebaseDatabaseUrl = process.env.REACT_APP_FIREBASE_DATABASE_URL;

const normalizeDatabaseUrl = (url) => url?.replace(/\/$/, "");

const getWordBankUrl = () => {
  const databaseUrl = normalizeDatabaseUrl(firebaseDatabaseUrl);

  if (!databaseUrl) {
    return "";
  }

  return `${databaseUrl}/wordsBank.json`;
};

// Translations are optional: never substitute the other language.
// Also accept language-keyed banks and legacy remote string arrays.
const collectWords = (value, language) => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap((item) => collectWords(item, language));
  if (!value || typeof value !== "object") return [];
  if ("ar" in value || "en" in value) {
    const translation = value[language];
    if (translation == null) return [];
    return collectWords(translation, language);
  }
  if (Array.isArray(value.words)) return collectWords(value.words, language);
  return Object.entries(value)
    .filter(([key]) => key !== "category")
    .flatMap(([, item]) => collectWords(item, language));
};

const normalizeWords = (words, language) => [...new Set(words
  .filter((word) => typeof word === "string" && word.trim().length > 0)
  .map((word) => word.trim())
  .filter((word) => language === "en"
    ? /^[a-z][a-z '’\-]*$/i.test(word)
    : /[\u0600-\u06ff]/.test(word)))];

export const isPasswordWordBankEnabled = Boolean(
  normalizeDatabaseUrl(firebaseDatabaseUrl),
);

export const loadPasswordWordBank = async (language = "en") => {
  const selectedLanguage = language.split("-")[0] === "ar" ? "ar" : "en";
  const fallback = normalizeWords(collectWords(wordsBank, selectedLanguage), selectedLanguage);
  const url = getWordBankUrl();

  if (!url) return fallback;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Unable to load password word bank");
    const remoteBank = await response.json();
    return normalizeWords([
      ...fallback,
      ...collectWords(remoteBank, selectedLanguage),
    ], selectedLanguage);
  } catch {
    return fallback;
  }
};
