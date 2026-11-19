import { useTranslation } from "react-i18next";
import GameRules from "views/Common/GameRules";

export default function Rules() {
  const { t } = useTranslation();
  return <GameRules gameName="PassWord" rules={[{ title: "How To Play", rules: [
      t("Play in two teams of two, with a separate host. Enter both players on each team."),
      t("Team A starts, then Team B. After both teams have started a round, swap clue givers and guessers."),
      t("Only clue givers may see the word. Hide it before the guessing starts."),
      t("One word per clue. Do not use the answer or any part of it."),
      t("A correct guess earns the displayed points. A wrong guess passes the turn and lowers the points."),
      t("Agree on a stopping time before you start, so everyone is back when the break ends.")
    ] }]} />;
}
