import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { DeleteUser, GetAllUsers, UpdateUserStatus } from "../../service/userService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { toast } from 'react-hot-toast';

export default function UserManagement() {
  const [rows, setRows] = React.useState([]);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCloseDelete = () => {
    setSelectedUser(null);
    setOpenDelete(false);
    fetchAllUsers();
  };

  const handleCloseDeactivate = () => {
    setOpenDeactivate(false);
    fetchAllUsers();
  };

  const handleDeleteUser = async () => {
    await DeleteUser(selectedUser).then(({data})=>{
      toast.success(data)
      handleCloseDelete()
    }).catch((err)=>{
      if(err.response){
        toast.error(err.response.data)
      }
      console.log(err)
      handleCloseDelete();
    })
  };

  const handleUpdateStatus=async()=>{
    await UpdateUserStatus(selectedUser)
      .then(({ data }) => {
        toast.success(data);
       handleCloseDeactivate();
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data);
        }
        console.log(err);
       handleCloseDeactivate();
      });
  }

  const fetchAllUsers = async () => {
    await GetAllUsers()
      .then(({ data }) => {
        setRows(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchAllUsers();
  }, []);

  const columns = [
    {
      field: "uid",
      headerName: "User_ID",
      flex: 1,
      minWidth: 150,
    },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email Address", flex: 1, minWidth: 250 },
    { field: "nic", headerName: "NIC Number", flex: 1, minWidth: 150 },
    {
      field: "userRole",
      headerName: "Usr Role",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) =>
        row.isActive === true ? "Active User" : "Deactivated",
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
            <div>
              <Button
                onClick={() => {
                  setSelectedUser(params.row._id);
                  setOpenDeactivate(true);
                }}
                variant="contained"
                size="small"
                sx={{ marginRight: "1rem" }}
              >
                {params.row.isActive === true ? "Deactivate" : "Activate"}
              </Button>
              <Button
                onClick={() => {
                  setSelectedUser(params.row._id);
                  setOpenDelete(true);
                }}
                variant="contained"
                size="small"
                sx={{ marginRight: "1rem" }}
                color="error"
                startIcon={<DeleteIcon />}
              >
                Remove
              </Button>
            </div>
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
      <Dialog open={openDelete} onClose={handleCloseDelete} fullWidth>
        <DialogTitle>Remove User</DialogTitle>
        <DialogContent>
          <div style={{ fontSize: "18px" }}>
            Are you sure you want to remove this user?
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button onClick={handleDeleteUser}>Remove</Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeactivate} onClose={handleCloseDeactivate} fullWidth>
        <DialogTitle>
          {selectedUser !== null
            ? [...rows].filter((u) => u._id === selectedUser)[0].isActive ===
              true
              ? "Deactivate User Account"
              : "Activate User Account"
            : ""}
        </DialogTitle>
        <DialogContent>
          <div style={{ fontSize: "18px" }}>
            {selectedUser !== null
              ? [...rows].filter((u) => u._id === selectedUser)[0].isActive ===
                true
                ? "Are you sure you want to Deactivate?"
                : "Are you sure you want to Activate?"
              : ""}
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleCloseDeactivate}>Cancel</Button>
            <Button onClick={handleUpdateStatus}>
              {selectedUser !== null
                ? [...rows].filter((u) => u._id === selectedUser)[0]
                    .isActive === true
                  ? "Deactivate"
                  : "Activate"
                : ""}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
