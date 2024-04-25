import { useTranslation } from "react-i18next";

import GameRules from "views/Common/GameRules";

const ListWordsRules = () => {
  const { t } = useTranslation();

  const contents = [
    {
      title: "Introduction",
      rules: [
        t("This is a game for two players Let's call them A & B"),
        t(
          "The game is about picking a category, then start listing words that fall below the category"
        ),
        t(
          "Each player have a countdown clock of 20 seconds, where it goes down on their turn, and stop on other player's turn"
        ),
        t("The game is made of rounds, each worth 1 point"),
        t(
          "Player with most points after certain number of rounds wins Number of rounds should be 2 or one of its multiplies"
        ),
      ],
    },
    {
      title: "How To Play",
      rules: [
        t(
          "Game start with player A selecting a category, listing first word then clicking the clock button so player B clock start counting down"
        ),
        t(
          "Player B state 1 word within the category then click clock button so player A's clock resume counting down instead of his"
        ),
        t(
          "The player that their countdown clock run out first loses the round"
        ),
        t(
          "There is a challenge feature where it's to be activated upon either of two events"
        ),
        t("First is when given word is not within selected category"),
        t(
          "Second is when a player duplicates a word that already was said within the category"
        ),
        t(
          "When a player list wrong or duplicated word, other player can challenge, and they would get the point of the round if they're right, else challenged player get it"
        ),
        t(
          "Once someone's clock run out of time, or a challenge was made and settled, the new round starts with player B picking different category"
        ),
      ],
    },
  ];

  return <GameRules gameName="ListWords" rules={contents} />;
};

export default ListWordsRules;
