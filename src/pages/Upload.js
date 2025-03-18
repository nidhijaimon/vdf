import { useState } from "react";
import { Box, Button, Container, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setError(null);
    } else {
      setError("Please upload a valid image file.");
    }
  };

  const handleGoToReports = () => {
    navigate("/reports");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #F8F3E1, #E1D8B0)", // Cream background with gradient effect
        paddingTop: "64px", // To ensure content is not hidden behind the fixed AppBar
      }}
    >
      {/* Taskbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1034A6", boxShadow: "none" }}> {/* Egyptian Blue */}
        <Toolbar>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              flexGrow: 1,
              letterSpacing: 1.5,
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            CARENTIX
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/help")}>
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: "#2554C7" }}>
            Upload an Image
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
              border: "1px solid #ccc",
            }}
          />
        </motion.div>

        {image && (
          <Typography variant="body2" sx={{ color: "gray", marginBottom: 2 }}>
            Selected: {image.name}
          </Typography>
        )}
        {error && <Typography color="error" variant="body2">{error}</Typography>}

        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            variant="contained"
            fullWidth
            disabled={!image}
            sx={{
              padding: "16px", // Increased padding to make the button taller
              fontWeight: "bold",
              backgroundColor: image ? "#1034A6" : "gray", // Set Egyptian Blue when enabled
              color: "white", // Ensure text is white
              "&:hover": { backgroundColor: image ? "#2554C7" : "gray" }, // Darker blue on hover
              width: "100%", // Ensure button takes up full width
              maxWidth: "500px", // Optional: limits button width for a more consistent appearance
            }}
          >
            Analyze
          </Button>
        </motion.div>
      </Container>

      {/* Link to the Reports Page at the Bottom */}
      <Box sx={{ position: "absolute", bottom: 20, width: "100%", textAlign: "center" }}>
        <Typography variant="body1">
          Click here for reports:{" "}
          <Button
            component="button"
            onClick={handleGoToReports}
            sx={{ color: "#2554C7", fontWeight: "bold", textTransform: "none", padding: 0 }}
          >
            Go to Reports
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}
