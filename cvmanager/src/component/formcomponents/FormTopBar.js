import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FormTopBar = ({ header }) => {
  return (
    <Row>
      <Col md={1} style={{ width: "2rem" }}>
        <div>
          <Link
            to=".."
            style={{
              textDecoration: "none",
              fontSize: "1.5rem",
              color: "#d9353e",
            }}
            className="d-flex flex-row"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Link>
        </div>
      </Col>
      <Col>
        <h4>{header}</h4>
      </Col>
    </Row>
  );
};

export default FormTopBar;
