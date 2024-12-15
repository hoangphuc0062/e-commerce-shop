import { Icon } from "@iconify/react";

export const renderStarFromNumber = (number, size) => {
  const stars = [];
  number = Math.round(number);
  const color = Number.isFinite(number) && number > 0 ? "#FFD700" : "#000000";
  const filledStars = Math.floor(number) || 0;

  for (let i = 0; i < filledStars; i++) {
    stars.push(
      <Icon
        icon="material-symbols:star"
        color={color}
        size={size || 16}
        key={`filled-${i}`}
      />
    );
  }
  for (let i = filledStars; i < 5; i++) {
    stars.push(
      <Icon
        icon="material-symbols:star-outline"
        color={color}
        size={size || 16}
        key={`empty-${i}`}
      />
    );
  }

  return stars;
};
