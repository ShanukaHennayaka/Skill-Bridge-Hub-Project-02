/* eslint-disable react/prop-types */
import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
} from "@mui/material";
import { useState } from "react";
import colors from "../../assets/colors";
import { GetUniqueId } from "../../service/commonServices";
import { useParams } from "react-router-dom";
import { GetTaskById } from "../../service/taskService";
import { SendBidRequestEmail } from "../../service/suggestionService";
import toast from "react-hot-toast";
import { formatDate } from "date-fns";

export default function Suggestions() {
  const [rows, setRows] = React.useState([]);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [selectedBidder, setSelectedBidder] = useState(null);
  const [task, setTask] = useState({});
  const { id } = useParams();
  const handleCloseDeactivate = () => {
    setOpenDeactivate(false);
    fetchAllBids();
  };

  const fetchAllBids = async () => {
    await GetTaskById(id)
      .then(({ data }) => {
        setTask(data);
        setRows(data.suggestions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSendRequest = async () => {
    const request = {
      email: selectedBidder.email,
      taskId: `TSK-${GetUniqueId(task._id)}`,
      budget: task.budget,
      name: selectedBidder.name,
      userId: `P-${GetUniqueId(selectedBidder._id)}`,
      description: task.shortDescription,
      deadline: formatDate(task.deadline, "yyyy-MM-dd"),
    };
    console.log(request);
    await SendBidRequestEmail(request)
      .then(({ data }) => {
        toast.success(data);
        setOpenDeactivate(false);
      })
      .catch((err) => {
        console.log(err);
        setOpenDeactivate(false);
      });
  };

  React.useEffect(() => {
    fetchAllBids();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "Professional_ID",
      flex: 1,
      minWidth: 200,
      valueGetter: (value, row) => `P-${GetUniqueId(row._id)}`,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "feedback",
      headerName: "Rating",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Rating precision={0.5} value={params.row.feedback} readOnly />
            <Typography variant="body">({params.row.noOfJobsDone})</Typography>
          </div>
        </div>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "matchingScore",
      headerName: "Suggestion Score",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      minWidth: 100,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          key={params.row._id}
          disableTouchRipple
          icon={
            <Button
              onClick={() => {
                setSelectedBidder(params.row);
                setOpenDeactivate(true);
              }}
              variant="contained"
              size="small"
              color="primary"
              sx={{ marginRight: "1rem", backgroundColor: colors.primary }}
            >
              Request to bid
            </Button>
          }
        />,
      ],
    },
  ];

  return (
    <div style={{ height: "85vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        columnBuffer={20}
        disableRowSelectionOnClick
      />

      <Dialog open={openDeactivate} onClose={handleCloseDeactivate} fullWidth>
        <DialogTitle fontWeight={"bold"}>Send Bid Request</DialogTitle>
        <DialogContent>
          <div style={{ fontSize: "18px" }}>
            Are you sure you want to send bid request?
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleCloseDeactivate}>Cancel</Button>
            <Button onClick={handleSendRequest}>Send</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
