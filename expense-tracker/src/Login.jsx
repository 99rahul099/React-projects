import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
  Link,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  PersonOutline,
  Google,
  Facebook,
  Twitter,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    navigate("/Expense");
  };

  const goToRegister = () => navigate("/Ragistration");

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          p: 2,
        }}
      >
        <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 450, borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <LockOutlined
              sx={{
                fontSize: 50,
                color: "primary.main",
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                borderRadius: "50%",
                padding: 1,
              }}
            />
            <Typography variant="h4" component="h1" sx={{ mt: 1, fontWeight: 600 }}>
              Log In
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your credentials to continue
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              name="username"
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline color="action" />
                  </InputAdornment>
                ),
              }}
              required
            />

            <FormControl fullWidth margin="normal" variant="outlined" required>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Box sx={{ textAlign: "right", mb: 2 }}>
              <Link href="#" variant="body2" underline="hover">
                Forgot password?
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              sx={{ mt: 1, mb: 2, py: 1.5 }}
            >
              Log In
            </Button>

            <Divider sx={{ my: 3 }}>OR</Divider>

            <Grid container justifyContent="center" spacing={2} sx={{ mb: 2 }}>
              <Grid item>
                <IconButton color="primary">
                  <Google />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton color="primary">
                  <Facebook />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton color="primary">
                  <Twitter />
                </IconButton>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link underline="hover" sx={{ fontWeight: 600, cursor: "pointer" }} onClick={goToRegister}>
                  Register
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
