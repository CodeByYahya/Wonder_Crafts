"use client";
import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import UploadModal from "./UploadModal"; // Adjust the import path as needed

const Banner: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          padding: 2,
          borderRadius: "12px",
          overflow: "hidden",
          width: "95%",
          height: 300,
          boxSizing: "border-box",
        }}
      >
        <Image
          src="/assets/Banner.png"
          alt="Scenic view"
          layout="fill"
          objectFit="cover"
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            zIndex: 2,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "start",
            left: "0%",
            width: "50%",
            padding: 2,
            height: "100%",
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            Hi! 👋 James Doe
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Lorem ipsum dolor sit amet, something important to say here
          </Typography>
          <Button
            sx={{
              backgroundColor: "#7B5AFF",
              color: "#fff",
              alignSelf: "start",
              paddingX: "15px",
              fontSize: "12px",
            }}
            onClick={handleOpenModal}
          >
            Add Check In
          </Button>
        </Box>
      </Box>
      <UploadModal open={modalOpen} handleClose={handleCloseModal} />
    </>
  );
};

export default Banner;
