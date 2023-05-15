import { useState, useContext } from "react";

import { Button, Chip, FormControl, Modal, TextField } from "@mui/material";
import { DefaultContext } from "../Dashboard";

export default function SurrogateProfileView({ showSurrogateProfile }) {
  const ConsumerContext = useContext(DefaultContext);
  const surrogate = ConsumerContext.Profile.details.pair;
  const defaultHalfInputProps = {
    variant: "standard",
    className: "modal-input-half px-14 disabled-modal-input",
    spellCheck: false,
    disabled: true,
  };
  return (
    <Modal
      open={true}
      onClose={(e, reason) => {
        if (reason === "backdropClick") {
          showSurrogateProfile(false);
        }
      }}
      className="default-modal-container flex-row"
    >
      <div className="default-modal-content profile-modal-container modal-scrollbar surrogate-report-modal flex-column">
        <span className="poppins px-20 fw-500">My Surrogate</span>
        <br />
        <div className="modal-form-create-pairing-container flex-column align-center width-100">
          <img
            src={surrogate.details.surrogate.image}
            alt=""
            className="home-avatar"
          />
          <br />
          <Chip
            style={{
              fontSize: 17,
              height: "35px",
              borderRadius: "50px",
              width: "120px",
            }}
            label={
              surrogate.details.status === "active" ? "Active" : "Inactive"
            }
            color={surrogate.details.status === "active" ? "success" : "error"}
          />

          <br />
          <br />
          <div className="flex-row space-between modal-input-row width-100">
            <TextField
              {...defaultHalfInputProps}
              label="First Name"
              value={surrogate.details.surrogate.firstname}
            />
            <TextField
              {...defaultHalfInputProps}
              label="Last Name"
              value={surrogate.details.surrogate.lastname}
            />
          </div>

          <div className="flex-row space-between modal-input-row width-100">
            <TextField
              {...defaultHalfInputProps}
              label="Email Address"
              value={surrogate.details.surrogate.email}
            />
            <TextField
              {...defaultHalfInputProps}
              label="Phone"
              value={surrogate.details.surrogate.phone}
            />
          </div>
          <br />
          <Button
            variant="outlined"
            onClick={() => {
              showSurrogateProfile(false);
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
