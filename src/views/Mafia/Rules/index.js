import { useTranslation } from "react-i18next";

import GameRules from "views/Common/GameRules";

const MafiaRules = () => {
  const { t } = useTranslation();

  const contents = [
    {
      title: t("MafiaIntroductionTitle"),
      rules: [
        t("MafiaIntroductionMin_players"),
        t("MafiaIntroductionRoles_start"),
        t("MafiaIntroductionRole_killer"),
        t("MafiaIntroductionRole_citizens"),
        t("MafiaIntroductionRole_judges"),
        t("MafiaIntroductionRole_nurses"),
        t("MafiaIntroductionRole_drowner"),
        t("MafiaIntroductionRole_game_master"),
      ],
    },
    {
      title: t("MafiaHowToPlayTitle"),
      rules: [
        t("MafiaHowToPlayStart_roles"),
        t("MafiaHowToPlayKiller_phase"),
        t("MafiaHowToPlayNurse_phase"),
        t("MafiaHowToPlayJudge_phase"),
        t("MafiaHowToPlayAll_open_eyes"),
        t("MafiaHowToPlayInitial_vote"),
        t("MafiaHowToPlaySecond_vote"),
        t("MafiaHowToPlayWin_conditions"),
      ],
    },
  ];

  return <GameRules gameName="Mafia" rules={contents} />;
};

export default MafiaRules;
