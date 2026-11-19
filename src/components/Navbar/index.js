import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const english = i18n.resolvedLanguage === "en";
  return <nav className="navbar app-nav"><div className="container">
    <Link className="navbar-brand" to="/"><span className="brand-mark"><i className="fas fa-dice" /></span>{t("Games Assistant")}<span className="brand-dot">.</span></Link>
    <div className="nav-actions"><Link className="library-link" to="/">{t("Game library")}</Link>
    <button className="language-button" onClick={() => i18n.changeLanguage(english ? "ar" : "en")} aria-label={english ? "Switch to Arabic" : "Switch to English"}><i className="fas fa-globe" /> {english ? "العربية" : "English"}</button></div>
  </div></nav>;
}
