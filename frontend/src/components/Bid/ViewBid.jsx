/* eslint-disable react/prop-types */
import { GetUniqueId } from "../../service/commonServices";
import { format } from "date-fns";
import { Button, Paper, Typography } from "@mui/material";
import colors from "../../assets/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { UpdateBidStatus } from "../../service/bidService";
import toast from "react-hot-toast";
export default function ViewBid({ bid ,user, onClose }) {

    const handleStatusUpdate = async(state)=>{
        const newBid = {
            id:bid._id, 
            status: state
        }
        await UpdateBidStatus(newBid).then(({data})=>{
            toast.success(data);
            onClose()
        }).catch((err)=>{
            toast.error(err.response.data);
            onClose();
        })
    }

  return (
    <div>
      <div>
        <tr>
          <td>
            <b>Bid ID</b>
          </td>
          <td>{`BID-${GetUniqueId(bid._id)}`}</td>
        </tr>
        <tr>
          <td>
            <b>Task ID</b>
          </td>
          <td>{`TSK-${GetUniqueId(bid.taskId)}`}</td>
        </tr>
        {user.userRole === "Professional" && (
          <tr>
            <td style={{ width: "8rem" }}>
              <b>Task Owner ID</b>
            </td>
            <td>{`E-${GetUniqueId(bid.ownerId)}`}</td>
          </tr>
        )}
        {user.userRole === "Employer" && (
          <tr>
            <td style={{ width: "8rem" }}>
              <b>Bidder ID</b>
            </td>
            <td>{`E-${GetUniqueId(bid.bidderId)}`}</td>
          </tr>
        )}
        <tr>
          <td>
            <b>Offer</b>
          </td>
          <td>
            {parseInt(bid.offer).toLocaleString("en-US", {
              style: "currency",
              currency: "LKR",
            })}
          </td>
        </tr>

        <tr>
          <td>
            <b>Status</b>
          </td>
          <td>{bid.status}</td>
        </tr>
        <tr>
          <td>
            <b>Created on</b>
          </td>
          <td>{format(bid.createdAt, "yyyy-MM-dd")}</td>
        </tr>
        <tr>
          <td>
            <b>Note</b>
          </td>
          <td>{bid.note}</td>
        </tr>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Typography
          style={{ marginRight: "1rem" }}
          fontWeight={"bold"}
          fontSize="22px"
        >
          Attachments
        </Typography>
        <Paper
          sx={{
            display: "flex",

            p: 1,
            m: 0,
          }}
        >
          {bid.attachments.length !== 0 ? (
            bid.attachments.map((item, i) => {
              let itemIcon;
              if (item.type === "image") {
                itemIcon = (
                  <FontAwesomeIcon
                    icon={faFileImage}
                    style={{ fontSize: "3rem" }}
                  />
                );
              }
              return (
                <a
                  key={i}
                  href={item.url}
                  style={{
                    textDecoration: "none",
                    color: colors.secondary,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "2rem",
                      cursor: "pointer",
                    }}
                  >
                    {itemIcon}
                    <span style={{ color: colors.primary }}>{item.name}</span>
                  </div>
                </a>
              );
            })
          ) : (
            <div>No attachments available</div>
          )}
        </Paper>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        {user.userRole === "Professional" && (
          <>
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: colors.secondary, marginRight: "1rem" }}
              onClick={onClose}
            >
              Close
            </Button>
            {bid.status === "Pending" && (
              <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: colors.primary }}
                onClick={() => {
                  handleStatusUpdate("Withdrawn");
                }}
              >
                Withdraw
              </Button>
            )}
          </>
        )}
        {user.userRole === "Employer" && bid.status === "Pending" && (
          <>
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: colors.secondary, marginRight: "1rem" }}
              onClick={() => {
                handleStatusUpdate("Rejected");
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: colors.primary }}
              onClick={() => {
                handleStatusUpdate("Accepted");
              }}
            >
              Accept
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
