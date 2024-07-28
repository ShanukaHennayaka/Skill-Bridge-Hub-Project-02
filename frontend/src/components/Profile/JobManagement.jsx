import React from "react";
import EmployerJobs from "../Job/EmployerJobs";
import ProfessionalJobs from "../Job/ProfessionalJobs";

export default function JobManagement({ user }) {
  if (user.userRole === "Employer") {
    return <EmployerJobs user={user}/>;
  }
  if (user.userRole === "Professional") {
    return <ProfessionalJobs user={user} />;
  }
}
