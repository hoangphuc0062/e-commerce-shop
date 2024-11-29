import { renderStarFromNumber } from "../../../utils/format-star";
import { Grid, Avatar, Typography, Box } from "@mui/material";

const Comment = ({ avatar, name = "Ẩn danh", star, comment }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ borderBottom: 1, borderColor: "grey.300", padding: 1 }}
    >
      {/* Avatar Section */}
      <Grid item>
        <Avatar src={avatar} alt="avatar" sx={{ width: 30, height: 30 }} />
      </Grid>

      {/* Content Section */}
      <Grid item xs>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="bold">
            {name}
          </Typography>
        </Box>

        <Box mt={1}>
          {/* Stars Section */}
          <Box display="flex" alignItems="center" gap={0.5}>
            {renderStarFromNumber(star)?.map((el, index) => (
              <Box key={index}>{el}</Box>
            ))}
          </Box>

          {/* Comment Section */}
          <Typography variant="body2" color="textSecondary" mt={1}>
            {comment}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Comment;
