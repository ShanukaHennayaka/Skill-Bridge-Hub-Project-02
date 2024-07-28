import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { GetAllUsers } from "../../service/userService";
import { Chart } from "primereact/chart";
import { GetAllTasks } from "../../service/taskService";
import { Rating, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AdminDashboard() {
  const [userChartData, setUserChartData] = useState({});
  const [userChartOptions, setUserChartOptions] = useState({});
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [users, setUsers] = useState([]);
  const [tasks, setTask] = useState([]);

  const fetchAllUsers = async () => {
    await GetAllUsers()
      .then(({ data: users }) => {
        setUsers(users);
        let employerCount = 0;
        let professionalCount = 0;
        [...users].forEach((user) => {
          if (user.userRole === "Employer") {
            employerCount++;
          }
          if (user.userRole === "Professional") {
            professionalCount++;
          }
        });
        const data = {
          labels: ["Employers", "Professionals"],
          datasets: [
            {
              label: "Users",
              data: [employerCount, professionalCount],
              backgroundColor: [
                "rgb(153, 102, 255, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(54, 162, 235, 0.5)",
              ],
              borderColor: [
                "rgb(153, 102, 255)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
              ],
              borderWidth: 1,
            },
          ],
        };
        const options = {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };

        setUserChartData(data);
        setUserChartOptions(options);
      })
      .catch((err) => console.log(err));
  };

  function getTopUsers(users) {
    return users
      .filter((u) => u.userRole === "Professional")
      .filter((u) => u.feedback !== 0)
      .sort((a, b) => {
        if (b.feedback === a.feedback) {
          return b.noOfJobsDone - a.noOfJobsDone;
        }
        return b.feedback - a.feedback;
      })
      .slice(0, 3);
  }

  const fetchAllTasks = async () => {
    await GetAllTasks()
      .then(({ data: tasks }) => {
        setTask(tasks);
        let psCount = 0;
        let dsCount = 0;
        let hlsCount = 0;

        [...tasks].forEach((task) => {
          if (task.mainCategory === "Professional Services") {
            psCount++;
          }
          if (task.mainCategory === "Domestic Services") {
            dsCount++;
          }
          if (task.mainCategory === "Hospitality and Lifestyle Services") {
            hlsCount++;
          }
        });

        const data = {
          labels: [
            "Professional Services",
            "Domestic Services",
            "Hospitality and Lifestyle Services",
          ],
          datasets: [
            {
              data: [psCount, dsCount, hlsCount],
              backgroundColor: [
                "rgb(153, 102, 255)",
                "rgba(75, 192, 192)",

                "rgba(54, 162, 235)",
              ],
              hoverBackgroundColor: [
                "rgb(153, 102, 255)",
                "rgba(75, 192, 192)",

                "rgba(54, 162, 235)",
              ],
            },
          ],
        };
        const options = {
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
              },
            },
          },
        };

        setChartData(data);
        setChartOptions(options);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllTasks();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} style={{ marginTop: "1rem" }}>
          <Grid item xs={6} md={3.5}>
            <Item style={{ height: "195px" }}>
              <Typography variant="h5" fontWeight={"bold"}>
                All Users Count
              </Typography>
              <br />
              <br />
              <Typography variant="h4" fontWeight={"bold"}>
                {users.length}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6} md={3.5}>
            <Item style={{ height: "195px" }}>
              <Typography variant="h5" fontWeight={"bold"}>
                All Task Count
              </Typography>
              <br />
              <br />
              <Typography variant="h4" fontWeight={"bold"}>
                {tasks.length}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6} md={5}>
            <Item>
              <Typography variant="h5" fontWeight={"bold"}>
                Top Rated Professionals
              </Typography>
              <br />
              <div style={{ display: "flex", flexDirection: "column" }}>
                {users.length !== 0 &&
                  [...getTopUsers(users)].map((user, i) => (
                    <>
                      <tr key={i}>
                        <td>{i + 1}.</td>
                        <td style={{ width: "0.7rem" }}></td>
                        <td>{user.name}</td>
                        <td style={{ width: "1rem" }}></td>
                        <td>({user.uid})</td>
                        <td style={{ width: "1rem" }}></td>
                        <td></td>
                        <td>
                          <Rating
                            value={user.feedback}
                            readOnly
                            precision={0.5}
                          />
                        </td>
                      </tr>
                      <div style={{ height: "1rem" }} />
                    </>
                  ))}
              </div>
            </Item>
          </Grid>

          <Grid item xs={6} md={8} style={{ marginTop: "1rem" }}>
            <Item>
              <Typography variant="h5" fontWeight={"bold"}>
                User Details
              </Typography>
              <br />
              <Chart
                type="bar"
                data={userChartData}
                options={userChartOptions}
              />
            </Item>
          </Grid>
          <Grid item xs={6} md={4} style={{ marginTop: "1rem" }}>
            <Item>
              <Typography variant="h5" fontWeight={"bold"}>
                Task Details
              </Typography>
              <br />
              <Chart
                type="pie"
                data={chartData}
                options={chartOptions}
                className="w-full md:w-30rem"
              />
              <br />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
