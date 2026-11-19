import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

const storageKey = "app-theme";
const snapshot = () => document.documentElement.dataset.theme || "light";
const savedTheme = () => {
  try { return localStorage.getItem(storageKey); } catch { return null; }
};
const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#15224b" : "#163fcc");
};
const subscribe = (notify) => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const sync = () => {
    const saved = savedTheme();
    applyTheme(saved === "dark" || saved === "light" ? saved : media.matches ? "dark" : "light");
    notify();
  };
  const storage = (event) => { if (event.key === storageKey || event.key === null) sync(); };
  window.addEventListener("app-theme-change", notify);
  window.addEventListener("storage", storage);
  media.addEventListener("change", sync);
  return () => {
    window.removeEventListener("app-theme-change", notify);
    window.removeEventListener("storage", storage);
    media.removeEventListener("change", sync);
  };
};

export default function ThemeToggle() {
  const { t } = useTranslation();
  const theme = useSyncExternalStore(subscribe, snapshot, () => "light");
  const dark = theme === "dark";
  return <button type="button" className="theme-button" aria-label={t("Dark mode")} aria-pressed={dark} title={t(dark ? "Switch to light mode" : "Switch to dark mode")} onClick={() => {
    const next = dark ? "light" : "dark";
    try { localStorage.setItem(storageKey, next); } catch { /* The switch still works for this page. */ }
    applyTheme(next);
    window.dispatchEvent(new Event("app-theme-change"));
  }}><i className={`fas ${dark ? "fa-sun" : "fa-moon"}`} aria-hidden="true" /><span className="visually-hidden">{t(dark ? "Switch to light mode" : "Switch to dark mode")}</span></button>;
}
