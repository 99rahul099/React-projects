// Registration.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import registrationImage from "./assets/registration1.jpg";

function Registration() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (!data.fullname || !data.email || !data.password) {
      alert("Please fill in all fields");
      return;
    }
    localStorage.setItem("mydata", JSON.stringify(data));
    navigate("/Expense");
  };

  return (
    <Box
      sx={{
        p: 2,
        mt: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 900,
          width: "100%",
          borderRadius: "10px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          overflow: "hidden",
        }}
      >
        {/* Left Side - Form */}
        <Box
          sx={{
            p: isMobile ? 2 : 4,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
            Create Account
          </Typography>
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullname"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Email ID"
                name="email"
                type="email"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleRegister}
                size="large"
                sx={{
                  mt: 2,
                  py: 1.5,
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Register Now
              </Button>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography align="center" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Button
                  variant="text"
                  onClick={() => navigate("/")}
                  sx={{
                    textTransform: "none",
                    color: "#1976d2",
                    fontWeight: "bold",
                  }}
                >
                  Log In
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Right Side - Image */}
        {!isMobile && (
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url(${registrationImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "flex-end",
              p: 4,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(25, 118, 210, 0.8) 0%, rgba(33, 150, 243, 0.6) 100%)",
                zIndex: 1,
              },
            }}
          >
            <Box sx={{ position: "relative", zIndex: 2, color: "white" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                Welcome to Our Platform
              </Typography>
              <Typography variant="body1">
                Join thousands of users managing their expenses efficiently with
                our tools.
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Registration;
