import { useState } from "react";
import axios from "axios";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function Upload() {
  const [images, setImages] = useState([]); // Store multiple images
  const [error, setError] = useState(null);
  const [result, setResult] = useState(""); // Store the API response
  const [previews, setPreviews] = useState([]); // Store multiple image previews

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    
    // Validate images
    const validImages = selectedFiles.filter((file) => file.type.startsWith("image/"));
    
    if (validImages.length === 0) {
      setError("Please upload valid image files.");
      setPreviews([]);
      setImages([]);
    } else {
      setError(null);
      setImages(validImages);
      setPreviews(validImages.map((file) => URL.createObjectURL(file))); // Generate previews
    }
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      setError("Please select at least one image before uploading.");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("file", image);
    });

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data.result); // Store the aggregated prediction
    } catch (error) {
      console.error("Error uploading files:", error);
      setError("Failed to upload images. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('imageuploadbackground.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              textAlign: "center",
              borderRadius: 3,
              backgroundColor: "white",
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              📸 Upload Images
            </Typography>

            <input
              type="file"
              multiple // Allow multiple images
              onChange={handleFileChange}
              style={{
                marginBottom: "20px",
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
                border: "1px solid #ccc",
              }}
            />

            {/* Display previews */}
            {previews.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
                {previews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index + 1}`}
                    style={{ width: "80px", height: "80px", borderRadius: "5px" }}
                  />
                ))}
              </Box>
            )}

            {images.length > 0 && (
              <Typography variant="body2" sx={{ color: "gray", marginBottom: 2 }}>
                Selected: {images.length} images
              </Typography>
            )}

            {error && <Typography color="error" variant="body2">{error}</Typography>}

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={images.length === 0}
                onClick={handleUpload}
                sx={{
                  padding: "10px",
                  fontWeight: "bold",
                  backgroundColor: images.length > 0 ? "green" : "gray",
                  "&:hover": { backgroundColor: images.length > 0 ? "darkgreen" : "gray" },
                }}
              >
                Analyze
              </Button>
            </motion.div>

            {result && (
              <Typography variant="h6" sx={{ marginTop: 2, color: "blue" }}>
                Final Prediction: {result}
              </Typography>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
