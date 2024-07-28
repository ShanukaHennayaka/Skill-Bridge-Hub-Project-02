/* eslint-disable react/prop-types */
import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import {
  DeleteBidById,
  GetAllBidsByProfessional,
} from "../../service/bidService";
import colors from "../../assets/colors";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ViewBid from "./ViewBid";
import { GetUniqueId } from "../../service/commonServices";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

export default function ProfessionalBids({ user }) {
  const [rows, setRows] = React.useState([]);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseDeactivate = () => {
    setOpenDeactivate(false);
    fetchAllBids();
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    fetchAllBids();
  };

  const fetchAllBids = async () => {
    await GetAllBidsByProfessional(user._id)
      .then(({ data }) => {
        setRows(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async () => {
    await DeleteBidById(selectedBid._id)
      .then(({ data }) => {
        toast.success(data);
        handleCloseDelete()
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data);
        }
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
      field: "taskId",
      headerName: "Task ID",
      flex: 1,
      minWidth: 200,
      valueGetter: (value, row) => `TSK-${GetUniqueId(row.taskId)}`,
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
            <>
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
              {params.row.status !== "Accepted" && (
                <IconButton
                  onClick={() => {
                    setSelectedBid(params.row);
                    setOpenDelete(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </>
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
      <Dialog open={openDelete} fullWidth maxWidth={"sm"}>
        <DialogTitle>Delete Bid</DialogTitle>
        <DialogContent>Are you sure you want to delete this bid?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
