import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setNames as passwordNames, reset as passwordReset } from "../redux/password";
import { setNames as pictionaryNames, reset as pictionaryReset } from "../redux/pictionary";
import { setRoles, reset as mafiaReset } from "../redux/mafia";
import { setNames as listwordsNames, reset as listwordsReset } from "../redux/listwords";
import { setNames as catchphraseNames, reset as catchphraseReset } from "../redux/catchphrase";

const games = {
  password: { restart: passwordNames, reset: passwordReset },
  pictionary: { restart: pictionaryNames, reset: pictionaryReset },
  mafia: { restart: setRoles, reset: mafiaReset },
  listwords: { restart: listwordsNames, reset: listwordsReset },
  catchphrase: { restart: catchphraseNames, reset: catchphraseReset },
};

export default function GameActions() {
  const { pathname } = useLocation();
  const name = pathname.slice(1);
  const session = useSelector((state) => state[name]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const details = useRef(null);
  const close = () => {
    if (details.current) {
      details.current.open = false;
      details.current.querySelector("summary")?.focus();
    }
  };
  if (!games[name] || !session?.master) return null;
  const restart = () => {
    close();
    const message = name === "mafia" ? "Restart with the same roles? Roles will be shuffled and hidden again." : "Restart with the same players? Scores and round progress will be cleared.";
    if (!window.confirm(t(message))) return;
    const payload = name === "mafia" ? { master: session.master, ...session.roles }
      : ["listwords", "catchphrase"].includes(name) ? { master: session.master, member1: session.members[0], member2: session.members[1] }
      : { master: session.master, members: session.members, format: session.format };
    dispatch(games[name].restart(payload));
    // Reload clears local round/timer/reveal state as well as persisted scores.
    navigate(0);
  };
  return <details className="game-options" ref={details} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); close(); } }}>
    <summary><i className="fas fa-rotate-right" aria-hidden="true" />{t("Game options")}</summary>
    <div className="game-options-menu">
      <button className="btn btn-light" type="button" onClick={restart}>{t("Restart game")}</button>
      <p>{t(name === "mafia" ? "Keep the host and role counts." : "Keep players. Start scores and rounds over.")}</p>
      <button className="btn btn-outline-danger" type="button" onClick={() => {
        close();
        if (!window.confirm(t("Reset game? Players, scores, and setup will be cleared."))) return;
        dispatch(games[name].reset());
        navigate(0);
      }}>{t("Reset game")}</button>
      <p>{t("Return to setup with a fresh game.")}</p>
    </div>
  </details>;
}
