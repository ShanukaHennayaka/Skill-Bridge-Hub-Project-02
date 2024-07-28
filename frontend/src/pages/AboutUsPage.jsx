import { Box } from '@mui/material';
import './AboutUs.css'
const AboutUsPage = () => {
  return (
    <Box
      className="about-container"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(/aboutus.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        zIndex: 0,
      }}
    >
      <h1>About Us</h1>
      <div style={{ margin: "7rem", marginBottom: "7.6rem" }}>
        <p>
          Welcome to Skillbridge, the platform where employers and professionals
          connect for project collaboration. Our mission is to facilitate
          seamless interaction and efficient task management, ensuring that both
          employers and professionals find the perfect match for their needs. We
          strive to provide a secure, user-friendly, and efficient platform for
          all your project needs.
        </p>
        <br />
        <br />

        <p>
          Skillbridge offers a range of features including user account
          management, task posting and bidding, secure communication, and robust
          payment processing. We also emphasize security and trust, with a
          verification process for professionals and a comprehensive feedback
          and rating system.
        </p>
        <p>
          Join Skillbridge today and experience the future of project
          collaboration.
        </p>
      </div>
    </Box>
  );
};

export default AboutUsPage;
