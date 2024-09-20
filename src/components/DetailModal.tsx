import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface DetailModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  loading:boolean;
  imageUrl: string;
  date: string;
  bookingID: string;
  avatarUrl: string;
  username: string;
  rooms: number; // New prop for rooms
  noOfGuests: number; // New prop for number of guests
  onUpdate: (
    data: Partial<{
      title: string;
      bookDate: string;
      rooms: number;
      noOfGuests: number;
    }>
  ) => void; // Update prop
}

const DetailModal: React.FC<DetailModalProps> = ({
  bookingID,
  open,
  loading,
  handleClose,
  title,
  imageUrl,
  date,
  avatarUrl,
  username,
  rooms,
  noOfGuests,
  onUpdate,
}) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editDate, setEditDate] = useState(date.split("T")[0]); // Format date for input
  const [editRooms, setEditRooms] = useState(rooms);
  const [editNoOfGuests, setEditNoOfGuests] = useState(noOfGuests);
  const handleSave = async () => {
    await onUpdate({
      title: editTitle,
      bookDate: editDate,
      rooms: editRooms,
      noOfGuests: editNoOfGuests,
    });
    handleClose(); // Close the modal immediately after saving
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%", // Adjust width as needed
          maxWidth: 600,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#F8F8F8",
            width: "100%",
            padding: "5px 10px",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            component="div"
            fontSize={14}
          >
            Detail Modal
          </Typography>
          <IconButton onClick={handleClose} sx={{}}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "15px 20px",
          }}
        >
          <Box sx={{ flex: 1, paddingRight: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <InputLabel
                sx={{
                  fontSize: "0.875rem",
                  color: "black",
                  marginBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Booking ID
              </InputLabel>
              <TextField
                type="number"
                value={bookingID}
                size="small"
                sx={{
                  fontSize: "0.875rem",
                  width: "60%",
                  // Remove spinner arrows and center the number
                  "& input[type=number]": {
                    MozAppearance: "textfield", // Firefox
                    textAlign: "center", // Center the text inside the input
                  },
                  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none", // Completely remove the spinner and space in WebKit browsers
                      margin: 0, // Ensures no space is taken by the spinner
                    },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <InputLabel
                sx={{
                  fontSize: "0.875rem",
                  color: "black",
                  marginBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Rooms
              </InputLabel>
              <TextField
                type="number"
                value={editRooms}
                onChange={(e) => setEditRooms(Number(e.target.value))}
                size="small"
                sx={{
                  fontSize: "0.875rem",
                  width: "15%",
                  // Remove spinner arrows and center the number
                  "& input[type=number]": {
                    MozAppearance: "textfield", // Firefox
                    textAlign: "center", // Center the text inside the input
                    paddingX: 0,
                  },
                  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none", // Completely remove the spinner and space in WebKit browsers
                      margin: 0, // Ensures no space is taken by the spinner
                    },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <InputLabel
                sx={{
                  fontSize: "0.875rem",
                  color: "black",
                  marginBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Number of Guests
              </InputLabel>
              <TextField
                type="number"
                value={editNoOfGuests}
                onChange={(e) => setEditNoOfGuests(Number(e.target.value))}
                size="small"
                sx={{
                  fontSize: "0.875rem",
                  width: "15%",
                  // Directly using sx for removing arrows
                  "& input[type=number]": {
                    MozAppearance: "textfield", // Firefox
                    textAlign: "center",
                    paddingX: 0,
                  },
                  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                    {
                      display: "none", // Chrome, Safari, Edge, Opera
                    },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <InputLabel
                sx={{
                  fontSize: "0.875rem",
                  color: "black",
                  marginBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Booked Date
              </InputLabel>
              <TextField
                type="date"
                disabled
                value={editDate}
                size="small"
                sx={{ fontSize: "0.875rem", width: "60%", textAlign: "center" }} // Smaller input
              />
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "end",
              alignItems: "start",
              maxWidth: "90%",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="contain"
              style={{}}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              alt={username}
              src={avatarUrl}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            <Typography variant="body2" color="black" sx={{ mr: 2 }}>
              Owner: {username}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFFFFF",
                color: "black",
                padding: "5px 8px",
                fontSize: "0.75rem",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#7B5AFF",
                padding: "5px 8px",
                fontSize: "0.75rem",
                marginLeft: "10px",
              }}
              onClick={handleSave}
            >
             {loading ? <CircularProgress size={24} /> : "Okay"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailModal;
