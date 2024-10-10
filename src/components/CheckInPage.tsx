"use client";
// pages/index.tsx
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import ChekIns from "@/components/ChekIns";
import UploadModal from "@/components/UploadModal";
import { CheckInData } from "@/types/CheckInsTypes";
import useFirebaseData from "@/hooks/useFirebaseData";
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';

const CheckInPage: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { checkIns, uploadData, updateData, loading } = useFirebaseData("yourCollection")

    useEffect(() => {
        AOS.init(); // Initialize AOS
    }, []);

    const handleUpdate = async (id: string, updatedData: Partial<CheckInData>) => {
        if (id) {
            await updateData(id, updatedData); // Update the selected item
            handleCloseModal(); // Close the modal after update
        }
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleUploadSubmit = async (metadata: Partial<CheckInData>, file: File) => {
        try {
            await uploadData(metadata, file);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                bgcolor: "#f0f0f0",
            }}
        >
            <Navbar />
            <Banner handleOpenModal={handleOpenModal} />
            <UploadModal open={modalOpen} handleClose={handleCloseModal} onSubmit={handleUploadSubmit} loading={loading} />
            <ChekIns checkIns={checkIns} onUpload={handleUpdate} loading={loading} />
        </Box>
    );
};

export default CheckInPage;
