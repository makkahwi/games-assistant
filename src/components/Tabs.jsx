import { useId, useRef } from "react";
import { useTranslation } from "react-i18next";

// Keep panels mounted so switching tabs never resets an in-progress game.
export default function Tabs({ tabs, active, onChange, label }) {
  const id = useId();
  const buttons = useRef([]);
  const { i18n } = useTranslation();
  const move = (event, index) => {
    const rtl = i18n.dir() === "rtl";
    let next;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else if (event.key === "ArrowRight") next = (index + (rtl ? -1 : 1) + tabs.length) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index + (rtl ? 1 : -1) + tabs.length) % tabs.length;
    else return;
    event.preventDefault();
    onChange(tabs[next].id);
    buttons.current[next]?.focus();
  };
  return <>
    <div className="club-tabs" role="tablist" aria-label={label}>
      {tabs.map((tab, index) => <button type="button" key={tab.id} ref={(node) => { buttons.current[index] = node; }} id={`${id}-tab-${index}`} role="tab" aria-selected={active === tab.id} aria-controls={`${id}-panel-${index}`} tabIndex={active === tab.id ? 0 : -1} onClick={() => onChange(tab.id)} onKeyDown={(event) => move(event, index)}>{tab.label}</button>)}
    </div>
    {tabs.map((tab, index) => <section key={tab.id} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} tabIndex={0} hidden={active !== tab.id} className="club-panel">{tab.content}</section>)}
  </>;
}
