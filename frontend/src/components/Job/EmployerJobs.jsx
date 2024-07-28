/* eslint-disable react/prop-types */
import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
} from "@mui/material";
import { useState } from "react";
import colors from "../../assets/colors";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useParams } from "react-router-dom";
import { GetUniqueId } from "../../service/commonServices";
import { GetAllEmployerJobs } from "../../service/jobService";
import { formatDate } from "date-fns";
import ChatIcon from "@mui/icons-material/Chat";
import Draggable from "react-draggable";
import CloseIcon from "@mui/icons-material/Close";
import Chat from "../Chat/Chat";
import JobStatus from "../StatusTracking/JobStatus";
import MoreDetails from "./MoreDetails";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} style={{ left: `${34}%` }} />
    </Draggable>
  );
}

export default function EmployerJobs({ user }) {
  const [rows, setRows] = React.useState([]);
  const [openChat, setOpenChat] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleCloseChat = () => {
    setOpenChat(false);
    fetchAllJobs();
  };

  const handleCloseStatus = () => {
    setOpenStatus(false);
    fetchAllJobs();
  };

  const handleCloseMore = () => {
    setOpenMore(false);
    fetchAllJobs();
  };

  const fetchAllJobs = async () => {
    await GetAllEmployerJobs(user._id)
      .then(({ data }) => {
        setRows(data);
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchAllJobs();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "Job_ID",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => `JOB-${GetUniqueId(row._id)}`,
    },
    {
      field: "taskId",
      headerName: "Task ID",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => `TSK-${GetUniqueId(row.taskId)}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      minWidth: 100,
      valueGetter: (value, row) =>
        parseInt(row.price).toLocaleString("en-US", {
          style: "currency",
          currency: "LKR",
        }),
    },
    {
      field: "acceptedAt",
      headerName: "Accepted Date",
      flex: 1,
      minWidth: 100,
      valueGetter: (value, row) => formatDate(row.acceptedAt, "yyyy-MM-dd"),
    },
    {
      field: "deadline",
      headerName: "Deadline",
      flex: 1,
      minWidth: 100,
      valueGetter: (value, row) => formatDate(row.deadline, "yyyy-MM-dd"),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          {params.row.status[params.row.status.length - 1].status}
          <div
            onClick={() => {
              setOpenStatus(true);
              setSelectedJob(params.row);
            }}
          >
            <RemoveRedEyeIcon
              style={{ marginLeft: "1rem", cursor: "pointer" }}
            />
          </div>
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      minWidth: 250,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          key={params.row._id}
          disableTouchRipple
          icon={
            <>
              {params.row.isJobDelivered && (
                <Button
                  onClick={() => {
                    setSelectedJob(params.row);
                    setOpenMore(true);
                    console.log(params.row.chat);
                  }}
                  variant="contained"
                  size="small"
                  color="primary"
                  sx={{ marginRight: "1rem", backgroundColor: colors.primary }}
                >
                  More details
                </Button>
              )}
              <Button
                onClick={() => {
                  setSelectedJob(params.row);
                  setOpenChat(true);
                  console.log(params.row.chat);
                }}
                variant="contained"
                size="small"
                color="primary"
                sx={{ marginRight: "1rem", backgroundColor: colors.primary }}
              >
                <ChatIcon />
              </Button>
            </>
          }
        />,
      ],
    },
  ];

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        columnBuffer={20}
        disableRowSelectionOnClick
      />

      <Dialog
        open={openChat}
        onClose={handleCloseChat}
        fullWidth
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth={"xs"}
        disableEscapeKeyDown
        hideBackdrop
        PaperProps={{
          style: {
            pointerEvents: "auto",
          },
        }}
      >
        <DialogTitle
          fontWeight={"bold"}
          id="draggable-dialog-title"
          sx={{ borderBottom: "1px solid", cursor: "move" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "25px" }}>Chat</span>
            <IconButton onClick={handleCloseChat}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Chat user={user} chat={selectedJob && selectedJob.chat} />
      </Dialog>

      <Dialog open={openStatus} onClose={handleCloseStatus} fullWidth>
        <DialogTitle fontWeight={"bold"}> Job Status</DialogTitle>
        <DialogContent>
          <JobStatus job={selectedJob} fetchAllJob={fetchAllJobs} user={user} />
        </DialogContent>
      </Dialog>

      <Dialog open={openMore} onClose={handleCloseMore} fullWidth>
        <DialogTitle fontWeight={"bold"}> Job Details</DialogTitle>
        <DialogContent>
          <MoreDetails job={selectedJob} fetchAllJob={fetchAllJobs} user={user} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
