import {  Row, Col } from 'react-bootstrap';
import { Container } from "react-bootstrap";
import "../assets/styles/footer.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>

      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Jack &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
