import { useEffect, useState, useContext } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { validateEmail } from "../../App";
import { AgeRanges, CountriesList, EducationLevels } from "../../Assets/Data";
import { validatePhone } from "../../Lib/Validate";
import { useToasts } from "react-toast-notifications";
import AccountManagement from "../AccountManagement";

import CustomSelect from "../CustomSelect";
import { PerformRequest } from "../../API/PerformRequests";
import { DefaultContext } from "../Dashboard";

export default function Application() {
  const ContextConsumer = useContext(DefaultContext);
  const { removeAllToasts, addToast } = useToasts();
  const [applicationFormData, setApplicationFormData] = useState({
    tribe: "",
    educationLevel: "",
    ageRange: "",
    religion: "",
  });

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const [formErrors, setFormErrors] = useState({
    tribe: false,
    educationLevel: false,
    ageRange: false,
    religion: false,
  });

  const UpdateFormErrors = () => {
    setFormErrors({
      ...formErrors,
      tribe: applicationFormData.tribe.length === 0,
      educationLevel: applicationFormData.educationLevel.length === 0,
      ageRange: applicationFormData.ageRange.length === 0,
      religion: applicationFormData.religion.length === 0,
    });
  };
  useEffect(() => {
    SubmitApplication();
  }, [formErrors]);

  const SubmitApplication = async () => {
    if (isFormSubmitting) {
      const errors = Object.values(formErrors).filter((e) => e === true);
      if (errors.length > 0) {
        setFormSubmitting(false);

        addToast("Please fill the form correctly", { appearance: "error" });
      } else {
        const data = {
          skinColor: applicationFormData.skinColour,
          ageRange: applicationFormData.ageRange,
          educationLevel: applicationFormData.educationLevel,
          hairColor: applicationFormData.hairColour,
        };
        const r = await PerformRequest.RequestSurrogate(data);
        console.log(r);
        const { message: responseMessage } = r.data;
        if (r.data.status === "failed") {
          addToast(responseMessage, { appearance: "error" });
        } else {
          addToast(responseMessage, { appearance: "success" });
          // window.location.reload();
        }
      }
    }
  };
  const defaultFullInputProps = {
    variant: "standard",
    spellCheck: false,
    className: "modal-input-full px-14",
  };
  const defaultHalfInputProps = {
    variant: "standard",
    className: "modal-input-half px-14",
    spellCheck: false,
  };
  return (
    <div className="flex-column application-container">
      <Typography className="poppins fw-500" variant="h5">
        PARENT DASHBOARD
      </Typography>
      <br />
      <span className="px-24 fw-600 poppins">Request A Surrogate</span>
      <small className="px-14 fw-300 poppins">
        Fill in the data for your preferred fit for a surrogate. It will take a
        couple of minutes
      </small>

      <div className="flex-column surrogate-form-container">
        <div className="surrogate-form-left flex-column">
          <span className="fw-600 px-19 poppins">Data Bank</span>
          <span className="px-14 poppins fw-300 surrogate-form-about">
            Kindly be as specific as possible with your request. Our admin will
            be in touch as soon as possible
          </span>

          <br />
          <br />
          <div className="flex-row space-between modal-input-row form-select-row">
            <FormControl
              variant="standard"
              {...defaultFullInputProps}
              error={formErrors.nationality}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Preferred Nationality
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={applicationFormData.nationality}
                onChange={(e) => {
                  setApplicationFormData({
                    ...applicationFormData,
                    nationality: e.target.value,
                  });
                }}
                label="Select a Country"
              >
                {CountriesList.map((country, index) => {
                  return (
                    <MenuItem value={country.name} key={country.name}>
                      {country.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="flex-row space-between modal-input-row form-select-row">
            <FormControl
              variant="standard"
              {...defaultFullInputProps}
              error={formErrors.educationLevel}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Preferred Education Level
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={applicationFormData.educationLevel}
                onChange={(e) => {
                  setApplicationFormData({
                    ...applicationFormData,
                    educationLevel: e.target.value,
                  });
                }}
                label="Select Education Level"
              >
                {EducationLevels.map((education, index) => {
                  return (
                    <MenuItem value={education.level} key={education.level}>
                      {education.level}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="flex-row space-between modal-input-row form-select-row">
            <FormControl
              variant="standard"
              {...defaultFullInputProps}
              error={formErrors.ageRange}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Preferred Age Range
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={applicationFormData.ageRange}
                onChange={(e) => {
                  setApplicationFormData({
                    ...applicationFormData,
                    ageRange: e.target.value,
                  });
                }}
                label="Preferred Age Range"
              >
                {AgeRanges.map((age, index) => {
                  return (
                    <MenuItem value={age.age} key={age.age}>
                      {age.age}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div className="flex-row space-between modal-input-row form-select-row">
            <FormControl
              variant="standard"
              {...defaultFullInputProps}
              error={formErrors.religion}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Preferred Religion
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={applicationFormData.religion}
                onChange={(e) => {
                  setApplicationFormData({
                    ...applicationFormData,
                    religion: e.target.value,
                  });
                }}
                label="Preferred Religion"
              >
                {ContextConsumer.Religions.map((religion, index) => {
                  return (
                    <MenuItem value={religion.tribe} key={religion.tribe}>
                      {religion.tribe}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="flex-row space-between modal-input-row form-select-row">
            <FormControl
              variant="standard"
              {...defaultFullInputProps}
              error={formErrors.tribe}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Preferred Tribe
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={applicationFormData.tribe}
                onChange={(e) => {
                  setApplicationFormData({
                    ...applicationFormData,
                    tribe: e.target.value,
                  });
                }}
                label="Preferred Tribe"
              >
                {ContextConsumer.Tribes.map((tribe, index) => {
                  return (
                    <MenuItem value={tribe.tribe} key={tribe.tribe}>
                      {tribe.tribe}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <br />
        <Button
          variant="contained"
          style={{ width: "200px" }}
          onClick={() => {
            UpdateFormErrors();
            setFormSubmitting(true);
          }}
        >
          Submit &nbsp;
          {isFormSubmitting && <i className="far fa-spinner-third fa-spin" />}
        </Button>
      </div>
      <AccountManagement />
    </div>
  );
}
