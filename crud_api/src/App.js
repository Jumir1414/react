import { Header } from "./component/Header";
import { Container, Row, Col } from "react-bootstrap";
function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
