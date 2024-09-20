// pages/index.tsx
import React from "react";
import { Box } from "@mui/material";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import ChekIns from "@/components/ChekIns";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        padding: 2, // Optional padding
        bgcolor: "#f0f0f0", // Optional background color
      }}
    >
      <Navbar />
      <Banner />
      <ChekIns />
    </Box>
  );
};

export default Home;
