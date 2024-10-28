import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
        }}
      >
        404 - Not Found
      </Typography>
    </Box>
  );
}
