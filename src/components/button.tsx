import React from "react";

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  disabled,
  text,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default PaginationButton;
