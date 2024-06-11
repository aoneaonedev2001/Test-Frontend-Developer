import { useTranslation } from "react-i18next";
import { Button, Row, Col } from "antd";

const ShapeButtons = ({ onMoveLeft, onMoveRight, onMovePosition }: any) => {
  const { t } = useTranslation();

  return (
    <Row className="containerShapeButtons">
      <Col span={6}>
        <Button onClick={onMoveLeft} className="shape-buttons">
          <div className="triangle-left"></div>
          <div className="banner">{t("test1.content2")}</div>
        </Button>
      </Col>

      <Col span={12}>
        <Button onClick={onMovePosition} className="shape-buttons big">
          <div className="triangle-up"></div>
          <div className="triangle-down"></div>
          <div className="banner">{t("test1.content3")}</div>
        </Button>
      </Col>

      <Col span={6}>
        <Button onClick={onMoveRight} className="shape-buttons">
          <div className="triangle-right"></div>
          <div className="banner">{t("test1.content4")}</div>
        </Button>
      </Col>
    </Row>
  );
};

export default ShapeButtons;
