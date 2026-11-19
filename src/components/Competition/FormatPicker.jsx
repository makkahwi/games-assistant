import { useTranslation } from "react-i18next";
import { formats } from "../../utils/competition";

export default function FormatPicker({ onSelect, selected, groupOnly = false }) {
  const { t } = useTranslation();
  return <section id="formats" className="format-section" aria-labelledby="format-heading">
    <div className="section-heading"><div><span className="eyebrow">{t("STEP 01 · YOUR PEOPLE")}</span><h2 id="format-heading">{t("Who’s taking a break?")}</h2><p>{t("Pick your format. Then find your game.")}</p></div><span className="step-note">{t("A little friendly competition.")}</span></div>
    <div className="format-grid">{formats.map((format, index) => <button key={format.id} type="button" className={`format-card ${selected === format.id ? "is-selected" : ""}`} aria-pressed={selected === format.id} disabled={groupOnly && format.id !== "teams"} onClick={() => onSelect(format.id)}>
      <span className="format-card-top"><i className={`fas ${format.icon}`} aria-hidden="true" /><span>0{index + 1}</span></span>
      <strong>{t(format.label)}</strong><span className="format-description">{t(format.description)}</span><span className="format-detail">{t(format.detail)} <span aria-hidden="true">↗</span></span>
    </button>)}</div>
  </section>;
}
