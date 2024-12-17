import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

const ImageCarousel = ({ images, interval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Box
      className="carousel"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Main Image Section */}
      <Box
        className="carousel-main"
        sx={{
          width: "100%",
          maxWidth: 400,
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`Product Image ${index}`}
            sx={{
              display: index === activeIndex ? "block" : "none",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        ))}
      </Box>
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          width: 40,
          height: 40,
          borderRadius: "50%",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        }}
      >
        ❮
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          width: 40,
          height: 40,
          borderRadius: "50%",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        }}
      >
        ❯
      </IconButton>

      {/* Thumbnails Section */}
      <Box
        className="carousel-thumbnails"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          overflowX: "auto",
        }}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`Thumbnail ${index}`}
            onClick={() => handleThumbnailClick(index)}
            sx={{
              width: 64,
              height: 64,
              objectFit: "contain",
              cursor: "pointer",
              border: `2px solid ${
                index === activeIndex ? "#007bff" : "transparent"
              }`,
              transition: "border-color 0.3s ease",
              "&:hover": { borderColor: "#007bff" },
              spaceX: 4,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageCarousel;
