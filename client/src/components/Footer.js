import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        marginTop: 6,
        paddingY: 3,
        color: "#f0f0f0",
        fontSize: "0.875rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        Chris Yan © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
