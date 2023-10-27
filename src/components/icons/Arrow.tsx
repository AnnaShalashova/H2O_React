export const ArrowIcon = ({ stroke = '#000000', rotate = 0 }) => (
  <svg
    className="arrowIcon"
    width="20px"
    height="20px"
    transform={`rotate(${rotate})`}
    viewBox="0 0 24 24"
    stroke={stroke}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19M12 5L6 11M12 5L18 11"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
