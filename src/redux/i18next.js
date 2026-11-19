import en from "../assets/locales/en.json";
import ar from "../assets/locales/ar.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const languageStorageKey = "app-language";
const normalizeLanguage = (language) => language?.split("-")[0] === "ar" ? "ar" : "en";
const readLanguage = () => {
  try { return normalizeLanguage(localStorage.getItem(languageStorageKey) || localStorage.getItem("i18nextLng") || "en"); }
  catch { return "en"; }
};
const applyLanguage = (language) => {
  const selected = normalizeLanguage(language);
  document.documentElement.lang = selected;
  document.documentElement.dir = selected === "ar" ? "rtl" : "ltr";
  try { localStorage.setItem(languageStorageKey, selected); } catch { /* Storage may be unavailable. */ }
};
i18n.on("languageChanged", applyLanguage);
window.addEventListener("storage", (event) => {
  if (event.key === languageStorageKey) i18n.changeLanguage(normalizeLanguage(event.newValue));
});

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: readLanguage(),
    supportedLngs: ["en", "ar"],
    resources: {
      en: {
        translations: en,
      },
      ar: {
        translations: ar,
      },
    },
    fallbackLng: "en",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
      keySeparator: false,
    },
  });

export default i18n;
