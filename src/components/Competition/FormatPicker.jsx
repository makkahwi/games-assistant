import { useTranslation } from "react-i18next";
import { gameGroups } from "../../utils/competition";

export default function FormatPicker({ onSelect, selected, choices = gameGroups }) {
  const { t } = useTranslation();
  return <section id="formats" className="format-section" aria-labelledby="format-heading">
    <div className="section-heading"><div><h2 id="format-heading">{t("Who’s taking a break?")}</h2><p>{t("Pick your format. Then find your game.")}</p></div></div>
    <div className="format-grid">{choices.map((format) => <button key={format.id} type="button" className={`format-card ${selected === format.id ? "is-selected" : ""}`} aria-pressed={selected === format.id} onClick={() => onSelect(format.id)}>
      <span className="format-card-top"><i className={`fas ${format.icon}`} aria-hidden="true" /><i className={`fas ${selected === format.id ? "fa-circle-check" : "fa-circle"} selection-check`} aria-hidden="true" /></span>
      <strong>{t(format.label)}</strong><span className="format-description">{t(format.description)}</span><span className="format-detail">{t(format.detail)} <i className="fas fa-arrow-right" aria-hidden="true" /></span>
    </button>)}</div>
  </section>;
}
