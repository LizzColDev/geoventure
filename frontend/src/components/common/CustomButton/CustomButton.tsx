import React from 'react';
import { Button } from 'react-bootstrap';
import './CustomButton.css'

interface ButtonProps {
  onClick: () => void;
  variant: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, variant, children }) => {
  return (
    <Button className={`custom-button custom-button-${variant}`} variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
}

export default CustomButton;
