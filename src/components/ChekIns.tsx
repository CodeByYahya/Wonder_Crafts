"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
import DataCard from "./CheckInCard";
import DetailModal from "./DetailModal";
import { CheckInData, CheckInsProps } from "@/types/CheckInsTypes";




const CheckIns: React.FC<CheckInsProps> = ({ checkIns, onUpload, loading }) => {
  const [selectedItem, setSelectedItem] = useState<CheckInData | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCardClick = (item: CheckInData) => {
    setSelectedItem(item);
    setOpenModal(true);
  };



  const handleUpdate = async (updatedData: Partial<CheckInData>) => {
    if (selectedItem) {
      onUpload(selectedItem.id, updatedData);
    }
  };



  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  return (
    <Box sx={{ width: "95%", marginTop: "20px", display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "space-between" }}>
      {checkIns.map((item, index) => (
        <Box key={item.id} onClick={() => handleCardClick(item)} data-aos="fade-down"
          data-aos-delay={index * 100}>
          <DataCard
            title={item.title}
            imageUrl={item.imageUrl!}
            date={item.bookDate}
            avatarUrl={item.avatarUrl!}
            username={item.name!}
          />
        </Box>
      ))}

      {selectedItem && (
        <DetailModal
          bookingID={selectedItem.bookingId!}
          loading={loading}
          open={openModal}
          handleClose={handleCloseModal}
          title={selectedItem.title}
          imageUrl={selectedItem.imageUrl!}
          date={selectedItem.bookDate}
          avatarUrl={selectedItem.avatarUrl!}
          username={selectedItem.name!}
          rooms={selectedItem.rooms}
          noOfGuests={selectedItem.noOfGuests}
          onUpdate={handleUpdate} // Pass the update handler correctly
        />
      )}
    </Box>
  );
};

export default CheckIns;
