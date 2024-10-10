import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { CheckInData  } from "@/types/CheckInsTypes";

// Define types for props
interface UploadModalProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  overflow: "hidden",
  border: "none",
  borderRadius: "12px",
  boxShadow: 24,
  p: 0,
};
interface UploadModalProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (metadata: Partial<CheckInData >, file: File) => Promise<void>;
  loading:boolean
}

const UploadModal: React.FC<UploadModalProps> = ({ open, handleClose,onSubmit,loading}) => {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<Partial<CheckInData>>({
    title: "",
    rooms: 0,
    noOfGuests: 0,
  });
 
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle drag-and-drop or file select
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
    },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const handleMetadataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetadata((prev) => ({
      ...prev,
      [name]:
        name === "rooms" || name === "noOfGuests" ? parseInt(value, 10) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!metadata.title) newErrors.title = "Title is required";
    if (metadata?.rooms! <= 0) newErrors.rooms = "Rooms must be greater than 0";
    if (metadata?.noOfGuests! <= 0)
      newErrors.noOfGuests = "Number of guests must be greater than 0";
    if (!file) newErrors.file = "An image file is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await onSubmit(metadata, file as File); 

      // Close the modal and reset form
      handleClose();
      setFile(null);
      setMetadata({ title: "", rooms: 0, noOfGuests: 0 });
      setPreview(null);
    } catch (error) {
      console.error("Error during upload: ", error);
    } 
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="upload-modal-title"
      aria-describedby="upload-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#F8F8F8",
            padding: "5px 15px",
          }}
        >
          <Typography
            id="upload-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "600", fontSize: "14px" }}
          >
            Add Check In
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: "black" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "5px 15px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <InputLabel
              sx={{
                fontSize: "0.875rem",
                color: "black",
                marginBottom: 1,
                fontWeight: "bold",
              }}
            >
              Title
            </InputLabel>
            <TextField
              name="title"
              value={metadata.title}
              onChange={handleMetadataChange}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.title}
              helperText={errors.title}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
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
              name="rooms"
              type="number"
              value={metadata.rooms}
              onChange={handleMetadataChange}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.rooms}
              helperText={errors.rooms}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
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
              name="noOfGuests"
              type="number"
              value={metadata.noOfGuests}
              onChange={handleMetadataChange}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.noOfGuests}
              helperText={errors.noOfGuests}
            />
          </Box>
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
            }}
          >
            <input {...getInputProps()} />
            {file ? (
              <>
                <Typography variant="body2">
                  Selected file: {file.name}
                </Typography>
                {preview && (
                  <Box
                    sx={{
                      position: "relative", // Make the Box relative to position the Image
                      height: "150px", // Set a height for the Box
                      maxWidth: "100%",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={preview}
                      alt="Preview"
                      layout="fill" // Fill the Box
                      objectFit="contain" // Adjust the image fit
                    />
                  </Box>
                )}
              </>
            ) : (
              <Typography variant="body2">
                Drag & drop an image here, or click to select one
              </Typography>
            )}
            {errors.file && (
              <Typography color="error">{errors.file}</Typography>
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ marginBottom: "10px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Upload"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UploadModal;
