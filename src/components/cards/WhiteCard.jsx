import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const icons = { password: "fa-comment-dots", pictionary: "fa-pencil", mafia: "fa-user-secret", listwords: "fa-list", catchphrase: "fa-comments" };
export default function WhiteCard({ title, desc, gameUrl, rulesUrl, comingSoon, format, groupOnly }) {
  const { t } = useTranslation();
  const needsGroup = groupOnly && format !== "teams";
  return <article className={`game-card game-${gameUrl.slice(1)} ${comingSoon || needsGroup ? "game-unavailable" : ""}`}>
    <div className="game-symbol" aria-hidden="true"><i className={`fas ${icons[gameUrl.slice(1)]}`} /></div>
    <div className="game-description"><div className="game-title-line"><h3>{t(title)}</h3>{comingSoon && <span className="availability">{t("Coming Soon")}</span>}</div><p>{desc}</p>{needsGroup && <p className="group-only-note">{t("Mafia needs a group. Choose Team vs team to play.")}</p>}</div>
    {!comingSoon && <div className="game-actions">{!needsGroup && <Link className="btn btn-primary" to={`${gameUrl}?format=${format}`}>{t("Start Game")}<i className="fas fa-arrow-right" aria-hidden="true" /></Link>}<Link className="rules-link" to={`${rulesUrl}?format=${format}`}>{t("Game Rules")}</Link></div>}
  </article>;
}
