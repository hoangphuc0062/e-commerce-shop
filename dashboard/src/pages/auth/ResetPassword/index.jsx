import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { handleToast } from "../../../utils/toast";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const token = searchParams.get("token");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // dispatch(resetpassword({ token, password })).then((result) => {
    //   if (result.type === "staff/resetpassword/fulfilled") {
    //     handleToast("success", "Password reset successful", "top-right");
    //     navigate("/login");
    //   } else {
    //     handleToast("error", "Password reset failed", "top-right");
    //   }
    // });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Typography variant="h5">Reset Password</Typography>
      <Typography>Please enter your new password below.</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <OutlinedInput
        required
        id="password"
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <OutlinedInput
        required
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button variant="contained" type="submit">
        Reset Password
      </Button>
    </Box>
  );
};

export default ResetPassword;
