/* eslint-disable react/prop-types */
import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Button, Dialog, DialogContent, DialogTitle, Rating, Typography } from "@mui/material";
import { useState } from "react";
import {
  GetAllBidsByTask,
} from "../../service/bidService";
import colors from "../../assets/colors";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ViewBid from "./ViewBid";
import { GetUniqueId } from "../../service/commonServices";
import { useParams } from "react-router-dom";

export default function EmployerBids({ user }) {
  const [rows, setRows] = React.useState([]);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const { id } = useParams();
  const handleCloseDeactivate = () => {
    setOpenDeactivate(false);
    fetchAllBids();
  };

  const fetchAllBids = async () => {
    await GetAllBidsByTask(id)
      .then(({ data }) => {
        setRows(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchAllBids();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "BID_ID",
      flex: 1,
      minWidth: 200,
      valueGetter: (value, row) => `BID-${GetUniqueId(row._id)}`,
    },
    {
      field: "userId",
      headerName: "Task ID",
      flex: 1,
      minWidth: 300,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {`P-${GetUniqueId(params.row.user._id)}`}
          <div style={{ display: "flex" , alignItems:'center'}}>
            <Rating precision={0.5} value={params.row.user.feedback} readOnly />
            <Typography variant="body">
              ({params.row.user.noOfJobsDone})
            </Typography>
          </div>
        </div>
      ),
    },
    {
      field: "offer",
      headerName: "Offer",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) =>
        parseInt(row.offer).toLocaleString("en-US", {
          style: "currency",
          currency: "LKR",
        }),
    },
    {
      field: "note",
      headerName: "Note",
      flex: 1,
      minWidth: 350,
    },
    {
      field: "status",
      headerName: "Status",
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
                setSelectedBid(params.row);
                setOpenDeactivate(true);
              }}
              startIcon={<RemoveRedEyeIcon />}
              variant="contained"
              size="small"
              color="primary"
              sx={{ marginRight: "1rem", backgroundColor: colors.primary }}
            >
              See more
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
        <DialogTitle fontWeight={"bold"}>Bid Details</DialogTitle>
        <DialogContent>
          <ViewBid
            bid={selectedBid}
            user={user}
            onClose={handleCloseDeactivate}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
