import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { validateEmail } from "../../App";
import {
  AgeRanges,
  CountriesList,
  EducationLevels,
  HairColours,
  Locations,
  SkinColours,
} from "../../Assets/Data";
import { validatePhone } from "../../Lib/Validate";
import { useToasts } from "react-toast-notifications";
import AccountManagement from "../AccountManagement";

import CustomSelect from "../CustomSelect";
import { PerformRequest } from "../../API/PerformRequests";

export default function Application() {
  const { removeAllToasts, addToast } = useToasts();
  const [applicationFormData, setApplicationFormData] = useState({
    nationality: "",
    educationLevel: "",
    ageRange: "",
    hairColour: "",
    skinColour: "",
  });

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const [formErrors, setFormErrors] = useState({
    nationality: false,
    educationLevel: false,
    ageRange: false,
    hairColour: false,
    skinColour: false,
  });

  const UpdateFormErrors = () => {
    setFormErrors({
      ...formErrors,
      nationality: applicationFormData.nationality.length === 0,
      educationLevel: applicationFormData.educationLevel.length === 0,
      ageRange: applicationFormData.ageRange.length === 0,
      hairColour: applicationFormData.hairColour.length === 0,
      skinColour: applicationFormData.skinColour.length === 0,
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

      <div className="flex-row surrogate-form-container">
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
              error={formErrors.skinColour}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Preferred Skin Color
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={applicationFormData.skinColour}
                onChange={(e) => {
                  setApplicationFormData({
                    ...applicationFormData,
                    skinColour: e.target.value,
                  });
                }}
                label="Preferred Skin Color"
              >
                {SkinColours.map((color, index) => {
                  return (
                    <MenuItem value={color.color} key={color.color}>
                      {color.color}
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
              error={formErrors.hairColour}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Preferred Hair Color
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={applicationFormData.hairColour}
                onChange={(e) => {
                  setApplicationFormData({
                    ...applicationFormData,
                    hairColour: e.target.value,
                  });
                }}
                label="Preferred Hair Color"
              >
                {HairColours.map((color, index) => {
                  return (
                    <MenuItem value={color.color} key={color.color}>
                      {color.color}
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
