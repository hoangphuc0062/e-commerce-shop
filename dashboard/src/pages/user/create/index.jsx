import {
  Switch,
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
export default function CreatePageUser() {
  const [publicProfile, setPublicProfile] = useState(true);
  const [banned, setBanned] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);

  const handleToggle = (setFunction, value) => {
    setFunction(!value);
  };
  return (
    <>
      <Box p={3}>
        <Grid container spacing={3}>
          {/* Profile Upload Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6">Profile Picture</Typography>
                <Box
                  sx={{
                    height: 150,
                    width: 150,
                    borderRadius: "50%",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="https://placehold.co/100x100"
                    alt="Profile"
                    style={{ borderRadius: "50%" }}
                  />
                </Box>
                <Typography variant="body2" mt={2}>
                  Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
                </Typography>
              </Box>

              {/* Switch Toggles */}
              <FormControlLabel
                control={
                  <Switch
                    checked={publicProfile}
                    onChange={() =>
                      handleToggle(setPublicProfile, publicProfile)
                    }
                  />
                }
                label="Public Profile"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={banned}
                    onChange={() => handleToggle(setBanned, banned)}
                  />
                }
                label="Banned"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={emailVerified}
                    onChange={() =>
                      handleToggle(setEmailVerified, emailVerified)
                    }
                  />
                }
                label="Email Verified"
              />
            </Paper>
          </Grid>

          {/* User Information Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Full Name" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Email Address" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Phone Number" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Country" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="State/Region" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="City" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Address" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Zip/Code" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={4} label="About" />
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Box mt={3} textAlign="right">
                <Button variant="contained" color="primary">
                  Create User
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
