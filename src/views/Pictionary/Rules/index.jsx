import { useTranslation } from "react-i18next";
import GameRules from "views/Common/GameRules";

export default function Rules() {
  const { t } = useTranslation();
  return <GameRules gameName="Pictionary" rules={[{ title: "How To Play", rules: [
      t("Play in two teams of two, with a separate host. Enter both players on each team."),
      t("Team A draws first, then Team B. After both teams have played, swap the artist and guesser within each team."),
      t("Only the active drawing player sees the phrase. Everyone else looks away."),
      t("Hide the phrase before drawing. No letters, numbers, or spoken hints."),
      t("Only the active team can earn a point. A correct guess or passing the turn moves play to the other team."),
      t("The highest score at the end of the break wins."),
      t("Agree on a stopping time before you start, so everyone is back when the break ends.")
    ] }]} />;
}
