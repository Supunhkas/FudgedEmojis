import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomTheme from "../components/CustomTheme";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { FormControl, InputLabel, Select } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Fudged Emojis
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "", 
    role: "user",
  });
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${baseUrl}/auth/login`, formData)
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);

          const decodedToken = jwt_decode(response.data.token);
          const username = decodedToken.name;
          const email = decodedToken.email;
          const userId = decodedToken._id;
          localStorage.setItem("name", username);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userId", userId);


          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log("Error:", error);
      });
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginX: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            padding: "30px",
          }}
        >
          <Box
            sx={{
              width: "100px",
            }}
          >
            <img
              src={logo}
              alt=""
              srcSet=""
              className="w-full h-full object-contain"
            />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="role">User Role</InputLabel>
              <Select
                required
                native
                value={formData.role}
                onChange={handleChange}
                inputProps={{
                  name: "role",
                  id: "role",
                }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"New User? Create Account"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
