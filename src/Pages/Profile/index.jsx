import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Typography, TextField } from "@mui/material";
import { DefaultContext } from "../Dashboard";

export default function Profile() {
  const ContextConsumer = useContext(DefaultContext);

  const defaultHalfInputProps = {
    variant: "standard",
    className: "modal-input-half px-14 disabled-modal-input",
    spellCheck: false,
    disabled: true,
  };

  const profile = ContextConsumer.Profile;
  console.log(profile);
  return (
    <div className="home-page">
      <div className="flex-row align-center">
        <Typography className="poppins fw-500" variant="h5">
          My Profile
        </Typography>
        &nbsp; &nbsp;
        <Link to="/dashboard/edit-profile">Edit</Link>
      </div>
      <div className="width-100 flex-column">
        <div className="modal-input-row space-between flex-row">
          <TextField
            {...defaultHalfInputProps}
            label="First Name"
            value={profile.firstname}
          />
          <TextField
            {...defaultHalfInputProps}
            label="Last Name"
            value={profile.lastname}
          />
        </div>
        <div className="modal-input-row space-between flex-row">
          <TextField
            {...defaultHalfInputProps}
            label="Email Address"
            value={profile.email}
          />
          <TextField
            {...defaultHalfInputProps}
            label="Phone"
            value={profile.phone}
          />
        </div>
        <div className="modal-input-row space-between flex-row">
          <TextField
            {...defaultHalfInputProps}
            label="Spouse Name"
            value={`${profile.details.spouse.firstname} ${profile.details.spouse.lastname}`}
          />
          <TextField
            {...defaultHalfInputProps}
            label="Spouse Email"
            value={profile.details.spouse.email}
          />
        </div>
      </div>
    </div>
  );
}
