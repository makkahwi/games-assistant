import { useTranslation } from "react-i18next";
import GameRules from "views/Common/GameRules";

export default function Rules() {
  const { t } = useTranslation();
  return <GameRules gameName="PassWord" rules={[{ title: "How To Play", rules: [
      t("Choose 1 vs 1, 2 vs 2, or team vs team. A separate host runs each game."),
      t("In 1 vs 1, the host gives both players one-word clues. Players alternate guesses."),
      t("In team formats, one player per team gives clues while their teammates guess. Rotate clue givers each round."),
      t("Only clue givers may see the word. Hide it before the guessing starts."),
      t("One word per clue. Do not use the answer or any part of it."),
      t("A correct guess earns the displayed points. A wrong guess passes the turn and lowers the points."),
      t("Agree on a stopping time before you start, so everyone is back when the break ends.")
    ] }]} />;
}
