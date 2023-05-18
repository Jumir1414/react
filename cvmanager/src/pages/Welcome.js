import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const Welcome = () => {
  let data = JSON.parse(localStorage.getItem("UserInfo"));
  return (
    <Container className="welcome-container">
      <Card className="text-center welcome ">
        <Card.Header>WELCOME</Card.Header>
        <Card.Body>
          <Card.Title>CV Manager</Card.Title>
          <Card.Text>{data.name}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Welcome;
