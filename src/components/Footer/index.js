import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, Container, Row, UncontrolledTooltip } from "reactstrap";

const FooterComp = () => {
  const { t } = useTranslation();

  const socialMediaLinks = [
    {
      icon: "fas fa-globe",
      link: "https://suhaib.dev/",
      tooltip: t("Own Website"),
      key: "website",
    },
    {
      icon: "fab fa-linkedin",
      link: "https://linkedin.com/in/makkahwi/",
      tooltip: t("Makkahwi @ Linkedin"),
      key: "linkedin",
    },
    {
      icon: "fab fa-facebook",
      link: "https://facebook.com/makkahwi",
      tooltip: t("Makkahwi @ Facebook"),
      key: "facebook",
    },
    {
      icon: "fab fa-instagram",
      link: "https://instagram.com/makkahwi",
      tooltip: t("Makkahwi @ Instagram"),
      key: "instagram",
    },
    {
      icon: "fab fa-whatsapp",
      link: "https://wasap.my/962788424973",
      tooltip: t("+962788424973 @ Whatsapp"),
      key: "whatsapp",
    },
    {
      icon: "fab fa-telegram",
      link: "https://t.me/makkahwi",
      tooltip: t("+962788424973 @ Telegram"),
      key: "telegram",
    },
    {
      icon: "fas fa-envelope",
      link: "mailto:SuhaibAhmadAi@hotmail.com",
      tooltip: t("Professional Email"),
      key: "email",
    },
    {
      icon: "fas fa-phone",
      link: "tel:+962788424973",
      tooltip: t("+962788424973"),
      key: "phone",
    },
  ];

  return (
    <footer className="footer bg-transparent">
      <Container>
        <Row className="row-grid align-items-center mb-1">
          <Col lg="6">
            <h3 className="text-primary font-weight-light mb-2">
              {t("Multi-Game Assistant")}
            </h3>

            <h6 className="mb-0 font-weight-light">
              {t(
                "This app is about helping players & game masters to track their ongoing games"
              )}
            </h6>
          </Col>

          <Col className="text-lg-center btn-wrapper" lg="6">
            {socialMediaLinks.map(({ icon, link, tooltip, key }, i) => (
              <Fragment key={i}>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="mx-1"
                >
                  <Button
                    className="btn-icon-only rounded-circle"
                    color="primary"
                    id={key}
                  >
                    <span className="btn-inner--icon">
                      <i className={icon} />
                    </span>
                  </Button>
                </a>

                <UncontrolledTooltip delay={0} target={key}>
                  {tooltip}
                </UncontrolledTooltip>
              </Fragment>
            ))}
          </Col>
        </Row>

        <hr />

        <Row className="align-items-center justify-content-md-between">
          <Col md="6">
            <div className="copyright">
              Multi-Game Assistant © {new Date().getFullYear()}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComp;
