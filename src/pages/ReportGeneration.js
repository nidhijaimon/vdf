import { useState } from "react";
import { Box, Button, Container, Typography, TextField, AppBar, Toolbar, IconButton, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export default function ReportGeneration() {
  const [searchQuery, setSearchQuery] = useState("");
  const [report, setReport] = useState(null); // Assume report will be fetched based on the search query
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Simulating a report fetching process
  const handleSearch = () => {
    if (!searchQuery) {
      setError("Please enter a phone number or email to search.");
      return;
    }

    setError(""); // Clear previous errors
    setLoading(true); // Set loading state

    setTimeout(() => {
      if (searchQuery === "example@example.com" || searchQuery === "1234567890") {
        // Dummy report for demonstration
        setReport({
          name: "John Doe",
          email: "example@example.com",
          phone: "1234567890",
          deficiencies: [
            {
              name: "Vitamin D",
              solution: "Vitamin D supplements, increased sunlight exposure.",
              foods: ["Salmon", "Mushrooms", "Fortified Milk", "Eggs"],
            },
            {
              name: "Iron",
              solution: "Iron supplements, increased iron-rich foods.",
              foods: ["Spinach", "Liver", "Red Meat", "Lentils"],
            },
            {
              name: "Vitamin C",
              solution: "Vitamin C supplements, eating citrus fruits.",
              foods: ["Oranges", "Strawberries", "Kiwi", "Bell Peppers"],
            },
          ],
        });
      } else {
        setReport(null);
        setError("No report found for the provided search query.");
      }

      setLoading(false); // Turn off loading once the report is "fetched"
    }, 1500); // Simulating a delay for fetching data
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
            <SearchIcon />
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
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#2554C7" }}>
          Generate Report
        </Typography>

        <TextField
          label="Enter Phone Number or Email"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            marginBottom: 2,
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "#fff",
          }}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%", maxWidth: "500px" }}
          onClick={handleSearch}
          disabled={loading} // Disable button while loading
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white", marginRight: 1 }} /> : <SearchIcon sx={{ marginRight: 1 }} />}
          {loading ? "Searching..." : "Search Report"}
        </Button>

        {error && <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>{error}</Typography>}

        {report && (
          <Box sx={{ marginTop: 4, textAlign: "left", backgroundColor: "#fff", padding: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight="bold">Report for {report.name}</Typography>
            <Typography variant="body1">Email: {report.email}</Typography>
            <Typography variant="body1">Phone: {report.phone}</Typography>

            {report.deficiencies.map((deficiency, index) => (
              <Box key={index} sx={{ marginTop: 3 }}>
                <Typography variant="h6" fontWeight="bold">{deficiency.name}</Typography>
                <Typography variant="body1"><strong>Suggested Solution:</strong> {deficiency.solution}</Typography>
                <Typography variant="body1"><strong>Foods to Consume:</strong> {deficiency.foods.join(", ")}</Typography>
              </Box>
            ))}

            <Box sx={{ marginTop: 4 }}>
              <Typography variant="body1" color="textSecondary">
                <strong>Note:</strong> Always consult with a healthcare provider before making any changes to your diet or supplementation.
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
