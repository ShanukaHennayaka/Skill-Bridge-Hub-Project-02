/* eslint-disable react/prop-types */
import { Button, Typography } from "@mui/material";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import colors from "../../assets/colors";
import { AddNewVerification } from "../../service/verificationService";
import toast from "react-hot-toast";
export default function ProfessionalVerification({ user, onClose }) {
  const [postData, setPostData] = useState({
    nicFrontImage: null,
    nicBackImage: null,
  });

  const handleFrontPhotoUpload = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      setPostData({ ...postData, nicFrontImage: result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleBackPhotoUpload = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      setPostData({ ...postData, nicBackImage: result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleVerificationSubmit = async () => {
    const verification = {
      userId: user._id,
      frontImage: postData.nicFrontImage,
      backImage: postData.nicBackImage,
    };

    await AddNewVerification(verification)
      .then(({ data }) => {
        toast.success(data);
        onClose();
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data);
        }
        console.log(err);
      });
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Typography>
          Please upload both sides of your NIC for the verification
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            backgroundColor: "#E9EAEC",
            width: "40vh",
            height: "25vh",
            textAlign: "center",
            verticalAlign: "middle",
            lineHeight: "25vh",
            border: "1px solid #C7C9CE",
            cursor: "pointer",
            marginRight: "2rem",
            marginBottom: "2rem",
          }}
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFrontPhotoUpload}
            id="FrontPhotoInput"
          />
          {postData.nicFrontImage ? (
            <>
              <img
                src={postData.nicFrontImage}
                alt="Uploaded"
                style={{
                  minWidth: "100%",
                  minHeight: "25vh",
                  maxHeight: "25vh",

                  border: "1px solid ",
                }}
              ></img>
              <Button
                variant="contained"
                size="small"
                startIcon={<DeleteIcon />}
                fullWidth
                style={{ backgroundColor: colors.secondary, marginTop: "-52%" }}
                onClick={() => {
                  setPostData({ ...postData, nicFrontImage: null });
                }}
              >
                Remove
              </Button>
            </>
          ) : (
            <label
              htmlFor="FrontPhotoInput"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                cursor: "pointer",
              }}
            >
              <CameraEnhanceIcon size={20} />
              <span style={{ marginLeft: "10px" }}>Front Side</span>
            </label>
          )}
        </div>
        <div
          style={{
            backgroundColor: "#E9EAEC",
            width: "40vh",
            height: "25vh",
            textAlign: "center",
            verticalAlign: "middle",
            lineHeight: "25vh",
            border: "1px solid #C7C9CE",
            cursor: "pointer",
            marginBottom: "2rem",
          }}
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleBackPhotoUpload}
            id="BackPhotoInput"
          />
          {postData.nicBackImage ? (
            <>
              <img
                src={postData.nicBackImage}
                alt="Uploaded"
                style={{
                  minWidth: "100%",
                  minHeight: "25vh",
                  maxHeight: "25vh",
                  border: "1px solid ",
                }}
              ></img>
              <Button
                color="error"
                variant="contained"
                size="small"
                startIcon={<DeleteIcon />}
                fullWidth
                style={{ backgroundColor: colors.secondary, marginTop: "-52%" }}
                onClick={() => {
                  setPostData({ ...postData, nicBackImage: null });
                }}
              >
                Remove
              </Button>
            </>
          ) : (
            <label
              htmlFor="BackPhotoInput"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                cursor: "pointer",
              }}
            >
              <CameraEnhanceIcon size={20} />
              <span style={{ marginLeft: "10px" }}>Back Side</span>
            </label>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "3rem",
        }}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: colors.secondary, marginRight: "1rem" }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: colors.primary }}
          onClick={handleVerificationSubmit}
        >
          Send for Verification
        </Button>
      </div>
    </div>
  );
}
