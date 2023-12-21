import React, { useState } from "react";

interface ILikeButton {
  initialLiked: boolean;
  handleLike: () => void;
}

const LikeButton = ({ initialLiked = false, handleLike }: ILikeButton) => {
  const [liked, setLiked] = useState(initialLiked);
  const [hovered, setHovered] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <button
      onClick={() => {
        handleLikeClick();
        handleLike();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className=" bg-transparent border-none cursor-pointer outline-none"
    >
      <i
        className={`fa-thumbs-up ${
          liked || hovered ? "fa-solid" : "fa-regular"
        } fa-xl`}
        style={{ color: "#0f264d" }}
      ></i>
    </button>
  );
};

export default LikeButton;
