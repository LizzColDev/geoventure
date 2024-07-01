import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CustomButton from '../../common/CustomButton/CustomButton';
import './GameComponents.css'

interface ResultPageProps {
  correctGuesses: number;
  onPlayAgain: () => void;
  onExit: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ correctGuesses, onPlayAgain, onExit }) => {
  const guessed = correctGuesses + 1;
  return (
    <Row className="justify-content-center mt-5">
      <Col xs={12} md={8} lg={6}>
        <Card className="result-page text-center shadow-lg">
          <Card.Body>
            <Card.Title as="h2" className="text-success">Congratulations!</Card.Title>
            <Card.Text className="lead">
              You guessed <strong>{guessed}</strong> out of 10 locations correctly!
            </Card.Text>
            <div className="result-page-actions d-flex justify-content-around mt-4">
              <CustomButton variant="success" onClick={onPlayAgain}>Play Again</CustomButton>
              <CustomButton variant="secondary" onClick={onExit}>Exit</CustomButton>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ResultPage;
