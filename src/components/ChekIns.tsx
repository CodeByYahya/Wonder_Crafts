"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataCard from "./Card"; // Adjust the import path as necessary
import DetailModal from "./DetailModal"; // Import the DetailModal
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";

// Define the type for the uploaded data
interface UploadedData {
  id: string;
  title: string;
  bookDate: string;
  imageUrl?: string;
  bookingId?: string;
  avatarUrl?: string;
  name: string;
  rooms: number; // Add rooms
  noOfGuests: number; // Add number of guests
}

const ChekIns: React.FC = () => {
  const [data, setData] = useState<UploadedData[]>([]);
  const [loading,setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<UploadedData | null>(
    null
  ); // State for selected item
  const [openModal, setOpenModal] = useState<boolean>(false); // State for modal

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "yourCollection")
      );
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UploadedData[]; // Type assertion
      setData(dataArray);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (item: UploadedData) => {
    setSelectedItem(item);
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null); // Reset selected item
  };

  const handleUpdate = async (updatedData: Partial<UploadedData>) => {
    if (selectedItem) {
      try {
        setLoading(true);
        const itemRef = doc(firestore, "yourCollection", selectedItem.id);
        await updateDoc(itemRef, updatedData);
        setData((prevData) =>
          prevData.map((item) =>
            item.id === selectedItem.id ? { ...item, ...updatedData } : item
          )
        );
        setLoading(false);
        handleCloseModal(); // Close the modal after update
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "95%",
        marginTop: "20px",
        display: "flex",
        gap: "5px",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {data.map((item) => (
        <Box key={item.id} onClick={() => handleCardClick(item)}>
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

export default ChekIns;
