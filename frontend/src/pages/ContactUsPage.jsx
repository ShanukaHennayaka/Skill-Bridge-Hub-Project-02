import { useState } from "react";
import "./ContactUs.css"
import { Button, Typography } from "@mui/material";
import { AddNewQuestion } from "../service/questionService";
import toast from "react-hot-toast";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    await AddNewQuestion(formData).then(({data})=>{
      toast.success(data);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }).catch((err)=>{
      toast.error(err.response.data)
    })
  };

  return (
    <div className="contact-container">
      <div style={{ display: "flex", marginTop:'5%' }}>
        <div style={{ flex: 1 }}>
          <img src="/contact.jpg" alt="contact" style={{maxHeight:'400px', width:'100%'}}/>
        </div>
        <div style={{ flex: 1 }}>
          <Typography variant="h5">Any Questions?</Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div style={{display:'flex', justifyContent:'flex-end'}} >
              <Button fullWidth type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
