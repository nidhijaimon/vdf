import { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress, Link, AppBar, Toolbar, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { motion } from "framer-motion";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // For navigating to the Reports page

export default function SymptomEntry() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!symptoms.trim()) {
      alert("Please enter some symptoms!");
      return;
    }

    setLoading(true);

    // Mock API response (simulating backend)
    setTimeout(() => {
      setResult({
        analysis: "Possible Vitamin B12 and Iron deficiency detected.",
        recommendations: [
          "Eat more leafy greens and red meat.",
          "Consider taking Vitamin B12 supplements.",
          "Consult a doctor for further testing.",
        ],
      });
      setLoading(false);
    }, 2000); // Simulate 2-second API delay
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #F8F3E1, #E1D8B0)", // Gradient cream background
        padding: 2,
        fontFamily: "Montserrat, sans-serif", // Ensuring Montserrat font
      }}
    >
      {/* Taskbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1034A6", zIndex: 1201 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ cursor: "pointer", letterSpacing: 1.5, fontSize: "1.2rem" }}
            onClick={() => navigate("/")} // Navigate to Home
          >
            CARENTIX
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/help")}>
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: "#1034A6",
            marginBottom: 3,
          }}
        >
          Enter Your Symptoms
        </Typography>
      </motion.div>

      {/* Symptom Entry Form */}
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600 }}>
        <TextField
          label="Describe your symptoms..."
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginBottom: 2,
            "& .MuiInputLabel-root": {
              backgroundColor: "white",
              padding: "0 4px",
            },
          }}
        />

        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading || !symptoms.trim()} // Disable if loading or no symptoms entered
            sx={{
              padding: "15px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              backgroundColor: symptoms.trim() ? "#1034A6" : "gray", // Active when symptoms are entered
              "&:hover": {
                backgroundColor: symptoms.trim() ? "#2554C7" : "gray", // Hover effect with light blue
              },
              borderRadius: "10px",
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Symptoms"}
          </Button>
        </motion.div>
      </form>

      {/* Display Results */}
      {result && (
        <Box
          sx={{
            marginTop: 3,
            padding: 3,
            textAlign: "left",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            width: "100%",
            maxWidth: 600,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Results:
          </Typography>
          <Typography>{result.analysis}</Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
            Recommendations:
          </Typography>
          <ul>
            {result.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Box>
      )}

      {/* Link to Reports Page */}
      <Link
        component={RouterLink}
        to="/reports"
        sx={{
          marginTop: 3,
          color: "#2554C7",
          textDecoration: "underline",
        }}
      >
        Go to Reports
      </Link>
    </Box>
  );
}
