import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQs = () => {
  const faqs = [
    {
      question: "What is the main purpose of this platform?",
      answer:
        "The platform aims to bridge the gap for service professionals outside the software industry, providing them with a dedicated space to showcase their skills, bid for jobs, and connect with clients in urban areas.",
    },
    {
      question: "How do professionals and employers register on the platform?",
      answer:
        "Users can register by providing necessary information like name, email address, password, and professional details for professionals, or company details for employers. After registration, users can log in to their accounts.",
    },
    {
      question: "What types of services can be found on the platform?",
      answer:
        "The platform covers a range of services, including IT specialists, home services, child care, pet care, event planning, education services, food and beverage, health and fitness, and security services.",
    },
    {
      question: "How do employers post tasks?",
      answer:
        "Employers can create tasks by specifying details such as description, required skills, budget, deadline, and any attachments. They can also edit or delete tasks as needed.",
    },
    {
      question: "How do professionals bid on tasks?",
      answer:
        "Professionals can submit bids on tasks, including their offer, cover letter, and relevant attachments. They can also view the status of their bids and withdraw them before acceptance.",
    },
    {
      question: "Is there a communication system within the platform?",
      answer:
        "Yes, once a bid is accepted, both parties can communicate through a secure messaging system to discuss task details, clarifications, or negotiations.",
    },
    {
      question: "How are payments handled?",
      answer:
        "The platform integrates a secure payment gateway for processing transactions, ensuring safe and reliable payments between employers and professionals.",
    },
    {
      question: "What kind of feedback and rating system is in place?",
      answer:
        "After completing a task, clients can provide feedback and rate professionals based on their performance, timeliness, and overall satisfaction, using a star rating system.",
    },
    {
      question: "How are user accounts verified?",
      answer:
        "Professionals are required to upload a photo of their National Identity Card (NIC) for verification. Admins review the NIC photos, and verified professionals receive a badge on their profile indicating their authenticity.",
    },
    {
      question: "What measures are in place to ensure platform security?",
      answer:
        "The platform implements secure user authentication, data encryption, and protection against common web vulnerabilities to ensure a safe and secure environment for all users.",
    },
  ];

  return (
    <Container>
      <Typography variant="h4" style={{marginTop:'2rem', marginBottom:'3rem'}}>
        Frequently Asked Questions by Users
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQs;
