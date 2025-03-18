import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper, Container, AppBar, Toolbar, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function Login() {
  const [userInput, setUserInput] = useState(""); // Can be email or phone
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const isEmail = (input) => /\S+@\S+\.\S+/.test(input);
  const isPhoneNumber = (input) => /^\d{10,15}$/.test(input); // Accepts numbers (10-15 digits)

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!isEmail(userInput) && !isPhoneNumber(userInput)) {
      alert("Please enter a valid email or phone number");
      return;
    }

    console.log("Logging in with:", userInput, password);
    
    // Here, you can add authentication logic

    navigate("/detection-options"); // Redirect after login
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(to bottom, #1034A6, #f8f4ed)" }}>
      {/* Taskbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1034A6" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer", fontFamily: "Montserrat, sans-serif", fontWeight: "bold", textDecoration: "none", color: "inherit" }}
            component={Link}
            to="/"
          >
            CARENTIX
          </Typography>
          <IconButton color="inherit" component={Link} to="/help">
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Login Box */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Container maxWidth="xs">
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              textAlign: "center",
              borderRadius: 3,
              backgroundColor: "white",
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, fontFamily: "Montserrat, sans-serif" }}>
              Login
            </Typography>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email or Phone Number"
                variant="outlined"
                margin="normal"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                sx={{ mt: 2, backgroundColor: "#1034A6", fontFamily: "Montserrat, sans-serif" }}
              >
                Login
              </Button>
            </form>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#1034A6", fontWeight: "bold" }}>
                Register
              </Link>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
