import { Col, Row, Button } from "antd";

const ShapeContent = ({ shapes, onRandom, Position }: any) => {
  return (
    <div className="containerShapeContent">
      <Row justify={Position ? "end" : "center"}>
        {shapes.slice(0, 3).map((shape: any, index: any) => (
          <Col span={6} key={index}>
            <Button onClick={onRandom} className="shape-buttons">
              <div className={` ${shape}`}></div>
            </Button>
          </Col>
        ))}
      </Row>

      <Row justify={Position ? "center" : "end"}>
        {shapes.slice(3).map((shape: any, index: any) => (
          <Col span={6} key={index}>
            <Button onClick={onRandom} className="shape-buttons">
              <div className={`${shape}`}></div>
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShapeContent;
