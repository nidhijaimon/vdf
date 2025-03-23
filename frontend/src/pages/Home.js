import { Link } from "react-router-dom";
import { Button, Box, Typography, Paper, Container } from "@mui/material";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('meds.jpg')", // ✅ Background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* 🔲 Rounded Box */}
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              textAlign: "center",
              borderRadius: 15, // ✅ Rounded corners for Home page
              backgroundColor: "white",
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              🩺 Vitamin Deficit Finder
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Upload an image or enter symptoms to check for deficiencies.
            </Typography>

            <motion.div whileHover={{ scale: 1.05 }} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Button variant="contained" color="primary" component={Link} to="/upload">
                Upload Image
              </Button>
              <Button variant="contained" color="secondary" component={Link} to="/symptoms">
                Enter Symptoms
              </Button>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
