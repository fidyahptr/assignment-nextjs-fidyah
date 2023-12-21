import { useState } from "react";

const ShareButton = ({ handleShare }: { handleShare: () => void }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={handleShare}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <i
        className={`fa-share-from-square ${
          hovered ? "fa-solid" : "fa-regular"
        } fa-lg`}
        style={{ color: "#0f264d" }}
      ></i>
    </button>
  );
};

export default ShareButton;
