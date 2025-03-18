import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper, Container, AppBar, Toolbar, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function PatientRegistration() {
  const [name, setName] = useState("");
  const [userInput, setUserInput] = useState(""); // Either email or phone
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const isEmail = (input) => /\S+@\S+\.\S+/.test(input);
  const isPhoneNumber = (input) => /^\d{10,15}$/.test(input);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!isEmail(userInput) && !isPhoneNumber(userInput)) {
      alert("Please enter a valid email or phone number");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Registering with:", name, userInput, password);
    navigate("/login"); // Redirect after registration
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

      {/* Registration Form */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Container maxWidth="xs">
          <Paper elevation={6} sx={{ padding: 4, textAlign: "center", borderRadius: 3, backgroundColor: "white" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, fontFamily: "Montserrat, sans-serif" }}>
              Patient Registration
            </Typography>
            <form onSubmit={handleRegister}>
              <TextField fullWidth label="Full Name" variant="outlined" margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
              <TextField fullWidth label="Email or Phone Number" variant="outlined" margin="normal" value={userInput} onChange={(e) => setUserInput(e.target.value)} required />
              <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <TextField fullWidth label="Confirm Password" type="password" variant="outlined" margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#1034A6", fontFamily: "Montserrat, sans-serif" }}>
                Register
              </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Already have an account? <Link to="/login" style={{ color: "#1034A6", fontWeight: "bold" }}>Login</Link>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
