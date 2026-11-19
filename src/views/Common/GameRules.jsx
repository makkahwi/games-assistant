import { useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "components/Buttons/BackButton";
import Tabs from "../../components/Tabs";

export default function GameRules({ gameName, rules }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(rules[0]?.title);
  return <div className="rules-workspace">
    <BackButton />
    <h1>{t("X Game Rules", { gameName })}</h1>
    <Tabs active={active} onChange={setActive} label={t("Game Rules")} tabs={rules.map(({ title, rules: items }) => ({ id: title, label: t(title), content: <ol className="rules-list">{items.map((text, index) => <li key={index}>{text}</li>)}</ol> }))} />
  </div>;
}
