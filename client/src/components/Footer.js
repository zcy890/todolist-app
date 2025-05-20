import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        marginTop: 4,
        paddingY: 2,
        color: "#666",
        fontSize: "0.875rem",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Chris Yan
      </Typography>
    </Box>
  );
};

export default Footer;
