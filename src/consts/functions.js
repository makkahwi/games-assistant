export const randomSort = (arr) => arr.sort(() => Math.random() - 0.5);


// Never substitute another language when a word has no matching translation.
export const collectLocalizedWords = (value, language = "en") => {
  const selected = language.split("-")[0] === "ar" ? "ar" : "en";
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap((item) => collectLocalizedWords(item, selected));
  if (!value || typeof value !== "object") return [];
  if ("ar" in value || "en" in value) return collectLocalizedWords(value[selected], selected);
  if (Array.isArray(value.words)) return collectLocalizedWords(value.words, selected);
  return Object.entries(value).filter(([key]) => key !== "category")
    .flatMap(([, item]) => collectLocalizedWords(item, selected));
};

export const getLocalizedWords = (bank, language = "en") => {
  const selected = language.split("-")[0] === "ar" ? "ar" : "en";
  return [...new Set(collectLocalizedWords(bank, selected)
    .map((word) => word.trim())
    .filter((word) => selected === "en"
      ? /^[a-z][a-z ,.!?'’\-]*$/i.test(word)
      : /[\u0600-\u06ff]/.test(word)))];
};
