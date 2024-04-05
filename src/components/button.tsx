import React from "react";
import { Button } from "@mui/material";

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  text: string;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  disabled,
  text,
}) => {
  return (
    <Button onClick={onClick} disabled={disabled} variant="contained">
      {text}
    </Button>
  );
};

export default PaginationButton;
