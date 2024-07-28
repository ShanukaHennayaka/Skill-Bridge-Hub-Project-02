// Footer.js
import { Link } from "react-router-dom";
import colors from "../assets/colors.js";
import { Typography, Grid, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: colors.primary,
        padding: "2rem 1rem",
      }}
    >
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={12} sm={6} md={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              SkillBridge
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Box
            sx={{
              marginTop: { xs: "1rem", sm: "3rem" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography color={"white"} variant="h6">
              Site Map
            </Typography>
            <Link to={""} style={{ textDecoration: "none" }}>
              <Typography color={"white"} sx={{ marginBottom: "0.5rem" }}>
                Home
              </Typography>
            </Link>
            <Link to={"/about-us"} style={{ textDecoration: "none" }}>
              <Typography color={"white"} sx={{ marginBottom: "0.5rem" }}>
                About Us
              </Typography>
            </Link>
            <Link to={"/contact-us"} style={{ textDecoration: "none" }}>
              <Typography color={"white"} sx={{ marginBottom: "0.5rem" }}>
                Contact Us
              </Typography>
            </Link>
            <Link to={"/faq"} style={{ textDecoration: "none" }}>
              <Typography color={"white"} sx={{ marginBottom: "0.5rem" }}>
                FAQ
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Box
            sx={{
              marginTop: { xs: "1rem", sm: "3rem" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography color={"white"} variant="h6">
              Contact
            </Typography>
            <br />
            <Typography color={"white"} sx={{ marginBottom: "0.5rem" }}>
              <CallIcon /> 0338846852
            </Typography>
            <Typography color={"white"} sx={{ marginBottom: "0.5rem" }}>
              <EmailIcon /> info@skillbridge.lk
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Box
            sx={{
              marginTop: { xs: "1rem", sm: "3rem" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography color={"white"} variant="h6">
              Payment Methods
            </Typography>
            <br />
            <a href="https://www.payhere.lk" target="_blank">
              <Box
                component="img"
                src="https://www.payhere.lk/downloads/images/payhere_short_banner_dark.png"
                alt="PayHere"
                sx={{
                  width: { xs: "100%", sm: "90%", md: "90%" },
                  maxWidth: "250px",
                  height: "auto",
                }}
              />
            </a>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Box
            sx={{
              marginTop: { xs: "1rem", sm: "3rem" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography color={"white"} variant="h6">
              Follow Us
            </Typography>
            <br />
            <br />
            <Box sx={{ display: "flex" }}>
              <FontAwesomeIcon
                icon={faFacebook}
                color="white"
                style={{ fontSize: "1.5rem", marginRight: "2rem" }}
              />
              <FontAwesomeIcon
                icon={faInstagram}
                color="white"
                style={{ fontSize: "1.5rem", marginRight: "2rem" }}
              />
              <FontAwesomeIcon
                icon={faXTwitter}
                color="white"
                style={{ fontSize: "1.5rem", marginRight: "2rem" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Typography color={"white"}>&copy; 2024 Skill Bridge Hub</Typography>
      </Box>
    </Box>
  );
}
