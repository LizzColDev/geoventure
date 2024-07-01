// ModalMessage.tsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomButton from '../CustomButton/CustomButton';
import './ModalMessage.css'

interface ModalMessageProps {
  show: boolean;
  message: string;
  onHide: () => void;
  onContinue?: () => void; 
  onExit: () => void; 
  showContinueButton?: boolean; 
}

const ModalMessage: React.FC<ModalMessageProps> = ({ show, message, onHide, onContinue, onExit, showContinueButton }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="modal-header-container">
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
      <Modal.Footer className="modal-footer-container">
        {showContinueButton && onContinue && (
          <CustomButton variant="success" onClick={onContinue}>
            Continue Playing
          </CustomButton>
        )}
        <CustomButton variant="secondary" onClick={onExit}>
          Exit
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMessage;
