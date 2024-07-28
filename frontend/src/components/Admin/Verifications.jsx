import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { GetAllVerifications } from "../../service/verificationService";
import colors from "../../assets/colors";
import { UpdateVerification } from "../../service/userService";
import toast from "react-hot-toast";

export default function Verifications() {
  const [rows, setRows] = React.useState([]);
  const [openNIC, setOpenNIC] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState(null);

  const handleCloseNIC = () => {
    setOpenNIC(false);
    fetchAllVerifications();
  };

  const fetchAllVerifications = async () => {
    await GetAllVerifications()
      .then(({ data }) => {
        setRows(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchAllVerifications();
  }, []);

  const handleUpdateVerification = async (status) => {
    const verification = {
      userId: selectedVerification.userId,
      verifyId: selectedVerification._id,
      status: status,
    };
    await UpdateVerification(verification)
      .then(({ data }) => {
        toast.success(data);
        handleCloseNIC()
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data);
        }
        handleCloseNIC();
        console.log(err);
      });
  };

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
            <Button
              onClick={() => {
                setSelectedVerification(params.row);
                setOpenNIC(true);
              }}
              variant="contained"
              size="small"
              sx={{ marginRight: "1rem" }}
            >
              View NIC
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
      <Dialog open={openNIC} onClose={handleCloseNIC} fullWidth>
        <DialogTitle>User Verification</DialogTitle>
        <DialogContent>
          <div style={{ fontSize: "18px" }}>
            {selectedVerification !== null ? (
              <div>
                <div>
                  <Typography sx={{ my: 2 }} fontWeight={"bold"}>
                    Front Side Image
                  </Typography>
                  <center>
                    <img
                      src={selectedVerification.frontImage}
                      alt="Uploaded"
                      style={{
                        minWidth: "80%",
                        minHeight: "25vh",
                        maxHeight: "25vh",

                        border: "1px solid ",
                      }}
                    />
                  </center>
                </div>
                <div>
                  <Typography sx={{ my: 2 }} fontWeight={"bold"}>
                    Back Side Image
                  </Typography>
                  <center>
                    <img
                      src={selectedVerification.backImage}
                      alt="Uploaded"
                      style={{
                        minWidth: "80%",
                        minHeight: "25vh",
                        maxHeight: "25vh",

                        border: "1px solid ",
                      }}
                    />
                  </center>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{ marginRight: "2rem", marginBottom: "1rem" }}>
            <Button
              onClick={() => handleUpdateVerification("Rejected")}
              variant="contained"
              size="small"
              style={{ backgroundColor: colors.secondary, marginRight: "1rem" }}
            >
              Reject
            </Button>
            <Button
              onClick={() => handleUpdateVerification("Verified")}
              variant="contained"
              size="small"
              style={{ backgroundColor: colors.primary }}
            >
              Verify
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
