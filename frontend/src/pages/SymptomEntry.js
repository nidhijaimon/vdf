import { useState } from "react";
import { Box, Button, Container, Paper, TextField, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

export default function SymptomEntry() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #cce7ff, #e6ccff)", // Light Blue to Lavender
       // background: "linear-gradient(to right, #e3f2fd, #fce4ec)", // Light Blue to Pink
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
              Enter Your Symptoms
            </Typography>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <TextField
                label="Describe your symptoms..."
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />

              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  sx={{
                    padding: "10px",
                    fontWeight: "bold",
                    backgroundColor: loading ? "gray" : "green",
                    "&:hover": { backgroundColor: "darkgreen" },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                </Button>
              </motion.div>
            </form>

            {/* Display the results if available */}
            {result && (
              <Paper sx={{ marginTop: 3, padding: 3, textAlign: "left", backgroundColor: "#f9f9f9" }}>
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
              </Paper>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}


