import { useTranslation } from "react-i18next";
import GameRules from "views/Common/GameRules";

export default function Rules() {
  const { t } = useTranslation();
  return <GameRules gameName="Pictionary" rules={[{ title: "How To Play", rules: [
      t("Choose 1 vs 1, 2 vs 2, or team vs team. A separate host runs each game."),
      t("In 1 vs 1, the host draws for both players. In team formats, one player from each team draws for their teammates."),
      t("Only the artists see the phrase. Hide it before drawing. No letters, numbers, or spoken hints."),
      t("The first correct player or team earns one point. Move to the next phrase and rotate artists."),
      t("The highest score at the end of the break wins."),
      t("Agree on a stopping time before you start, so everyone is back when the break ends.")
    ] }]} />;
}
