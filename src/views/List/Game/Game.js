import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Card, CardBody, Col, Row } from "reactstrap";

import { addScores } from "../../../redux/list";

const Game = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.list.members);
  const history = useSelector((state) => state.list.history);
  const { t } = useTranslation();

  const wordCategories = [
    "Animals",
    "Colors",
    "Names",
    "Places",
    "Cities",
    "Countries",
  ];

  const [currentCategory, setCurrentCategory] = useState(null);

  const [teamClocks, setTeamClocks] = useState([20000, 20000]);
  const [startTurn, setStartTurn] = useState(members[0]);
  const [listingTurn, setListingTurn] = useState(members[0]);
  const [challenger, setChallenger] = useState(null);
  const [rotate, setRotate] = useState(false);
  const [flipButtons, setFlipButtons] = useState([false, false]);

  const changeStartTurn = () =>
    setStartTurn((current) =>
      current === members[0] ? members[1] : members[0]
    );

  const changeListingTurn = () =>
    setListingTurn((current) =>
      current === members[0] ? members[1] : members[0]
    );

  const YourTurn = () => (
    <h2 className="bg-danger text-white py-2 my-3">It's Your Turn</h2>
  );

  const CategoryChoose = () => (
    <Fragment>
      <h6>Choose Category Plz</h6>

      <Row>
        {wordCategories.map((cat, i) => {
          const playedCat = !history.findIndex(({ category }) => category == i);

          return (
            <Col className="my-2" key={i}>
              <Button
                disabled={playedCat}
                color={
                  playedCat ? "secondary" : i % 2 === 0 ? "warning" : "info"
                }
                onClick={() => setCurrentCategory(i)}
                className="w-100"
              >
                {cat}
              </Button>
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );

  const startNewCategory = (gotIt) => {
    dispatch(
      addScores(
        (challenger === members[0] && gotIt) ||
          (challenger === members[1] && !gotIt)
          ? {
              team: members[0],
              point: 1,
              category: currentCategory,
            }
          : {
              team: members[1],
              point: 1,
              category: currentCategory,
            }
      )
    );

    setChallenger(null);
    changeStartTurn();
    setCurrentCategory(null);
  };

  const doButtonsFlip = (player) => {
    let tempFlipButtons = [...flipButtons];
    if (player == 0) {
      tempFlipButtons = [!tempFlipButtons[0], tempFlipButtons[1]];
    } else {
      tempFlipButtons = [tempFlipButtons[0], !tempFlipButtons[1]];
    }
    setFlipButtons(tempFlipButtons);
  };

  return (
    <Fragment>
      <Card>
        <CardBody className="text-right p-1">
          <Button
            color="warning"
            className="p-1"
            onClick={() => setRotate((current) => !current)}
          >
            Rotate
          </Button>
        </CardBody>

        {challenger ? (
          <CardBody className="text-primary">
            <h6>{challenger}</h6>

            <ButtonGroup>
              <Button onClick={() => startNewCategory(true)} color="success">
                {t("Challenger is Right")}
              </Button>

              <Button onClick={() => startNewCategory(false)} color="danger">
                {t("Challenger is Wrong")}
              </Button>
            </ButtonGroup>
          </CardBody>
        ) : (
          members.map((member, i) => (
            <Fragment key={i}>
              <CardBody
                className="text-primary"
                style={i == 0 && rotate ? { rotate: "180deg" } : {}}
              >
                <h6>{member}</h6>

                {listingTurn === member && <YourTurn />}

                {currentCategory === null ? (
                  startTurn === member && <CategoryChoose />
                ) : (
                  <Fragment>
                    <h1>
                      {teamClocks[i] > 10000
                        ? teamClocks[i] / 1000
                        : teamClocks[i]}
                    </h1>

                    <h4>
                      {t("Category is")} "{wordCategories[currentCategory]}"
                    </h4>

                    <ButtonGroup>
                      <Button
                        color="success"
                        onClick={() => changeListingTurn()}
                        disabled={listingTurn != member}
                        className={flipButtons[i] ? "order-2" : "order-1"}
                      >
                        {t("Stop Clock")}
                      </Button>

                      <Button
                        color="danger"
                        onClick={() => setChallenger(member)}
                        disabled={listingTurn != member}
                        className={flipButtons[i] ? "order-1" : "order-2"}
                      >
                        {t("Challenge Pervious Answer")}
                      </Button>
                    </ButtonGroup>

                    <Button
                      color="warning"
                      className="p-1 mt-2"
                      onClick={() => doButtonsFlip(i)}
                    >
                      Flip Buttons
                    </Button>
                  </Fragment>
                )}
              </CardBody>

              {i == 0 && <hr className="bg-dark w-100" />}
            </Fragment>
          ))
        )}
      </Card>
    </Fragment>
  );
};

export default Game;
