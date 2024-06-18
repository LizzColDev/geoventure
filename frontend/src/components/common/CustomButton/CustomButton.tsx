import React from 'react';
import { Button } from 'react-bootstrap';
import './CustomButton.css'

interface ButtonProps {
  onClick?: () => void;
  variant: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}
const CustomButton: React.FC<ButtonProps> = ({ onClick, variant, children, type = "button" }) => {
  return (
    <Button className={`custom-button custom-button-${variant}`} variant={variant} onClick={onClick} type={type}>
      {children}
    </Button>
  );
}

export default CustomButton;
