import { collectLocalizedWords, getLocalizedWords } from "consts/functions";
import { wordsBank } from "consts/WordBank";

const firebaseDatabaseUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL;

const normalizeDatabaseUrl = (url) => url?.replace(/\/$/, "");

const getWordBankUrl = () => {
  const databaseUrl = normalizeDatabaseUrl(firebaseDatabaseUrl);

  if (!databaseUrl) {
    return "";
  }

  return `${databaseUrl}/wordsBank.json`;
};

export const isPasswordWordBankEnabled = Boolean(
  normalizeDatabaseUrl(firebaseDatabaseUrl),
);

export const loadPasswordWordBank = async (language = "en") => {
  const selectedLanguage = language.split("-")[0] === "ar" ? "ar" : "en";
  const fallback = getLocalizedWords(wordsBank, selectedLanguage);
  const url = getWordBankUrl();

  if (!url) return fallback;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Unable to load password word bank");
    const remoteBank = await response.json();
    return getLocalizedWords([
      ...fallback,
      ...collectLocalizedWords(remoteBank, selectedLanguage),
    ], selectedLanguage);
  } catch {
    return fallback;
  }
};
