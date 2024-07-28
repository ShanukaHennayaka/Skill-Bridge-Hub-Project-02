import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GetAllQuestions } from "../../service/questionService";
import { formatDate } from "date-fns";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const fetchAllQuestions = async()=>{
    await GetAllQuestions().then(({data})=>{
        setQuestions(data);
    }).catch((err)=>{
        console.log(err)
    })
  }
  useEffect(()=>{
    fetchAllQuestions();
  }, [])
  return (
    <div>
      <div>
        <Typography variant="h4" fontWeight={'bold'} >
            Users Questions
        </Typography>
      </div>
      <div style={{height:'80vh', overflowY:'auto'}}>
        {questions.reverse().map((question, i) => (
          <Paper key={i} style={{ padding: "0.5rem", margin: '0.5rem', marginBottom: "1rem", marginTop:'2rem', }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontWeight={"bold"}>{question.name}</Typography>
              <Typography variant="body2">
                {formatDate(question.sendAt, "LLL dd yyyy HH:mm")}
              </Typography>
            </div>
            <Typography>{question.email}</Typography>
            <Typography sx={{ marginTop: "0.5rem" }}>
              {question.message}
            </Typography>
          </Paper>
        ))}
      </div>
    </div>
  );
}
