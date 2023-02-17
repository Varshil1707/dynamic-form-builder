import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Footer = () => {
  return (
    <Paper
      sx={{background:"teal", marginTop: "calc(15% + 240px)", bottom: 0 }}
      component="footer"
      square
      variant="outlined"
      
    >
      <Container sx={{ }} maxWidth="lg">
        <Box
          sx={{
           
            flexGrow: 1,
            // justifyContent: "stretch",
            display: "flex",
            my: 1,
          }}
        ></Box>

        <Box
          sx={{
            
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="initial" sx={{color:"white   "}} >
            Shyam Solanki's Copyright ©2022. [] Ecosmob Technologies Pvt.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;