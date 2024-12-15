import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { useSelector } from "react-redux";

export default function Welcome() {
  const data = useSelector((state) => state.staff.dataMe);

  // State for current date and time
  const [currentDateTime, setCurrentDateTime] = useState("");

  // Function to determine greeting based on the current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Buổi tối vui vẻ";
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setCurrentDateTime(now.toLocaleDateString("vi-VN", options));
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        minHeight: "50vh",
        textAlign: "center",
      }}
    >
      {/* Profile Avatar */}
      <Avatar
        src={data?.avatar || "/default-avatar.png"}
        alt="User Avatar"
        sx={{
          width: 100,
          height: 100,
          marginBottom: 2,
          backgroundColor: "#66adff",
        }}
      />

      {/* Greeting Message */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
        {getGreeting()}, {data?.name || "Guest"}!
      </Typography>

      {/* Real-Time Clock */}
      <Typography
        variant="body2"
        sx={{ color: "#555", marginBottom: 3, fontStyle: "italic" }}
      >
        {currentDateTime}
      </Typography>

      {/* Description Text */}
      <Typography variant="body2" sx={{ marginBottom: 3, maxWidth: 400 }}>
        Use this screen to add daily notes to your team members. Select a team
        member from the blue column and start typing your notes.
      </Typography>
    </Box>
  );
}
