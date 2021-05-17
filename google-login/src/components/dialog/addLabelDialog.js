import React, { useState } from "react";
import DialogBox from "../UI/dialogbox";
import InputField from "../UI/inputfield";
import CustomIconDropdown from "../dropdown/icondropdown";
import Card from "../UI/card";
import { Switch } from "@material-ui/core";
import Label from "../UI/label";
import { trackPromise } from "react-promise-tracker";
import LabelService from "../../services/labelService";

const labelsMasterData = [
  { name: "Green", color: "#83e292" },
  { name: "Blue", color: "#8baae4" },
  { name: "Grey", color: "#dfdedd" },
  { name: "Red", color: "#ff726f" },
  { name: "Yellow", color: "#e5a86c" },
];

const AddLabelDialog = (props) => {
  const labelAttribute = {
    id: NaN,
    name: "",
    colorName: "Grey",
    validation: "",
    error: false,
    color: "#dfdedd",
    default: false,
    primary_user: true,
  };

  const [label, setLabel] = useState(labelAttribute);

  const handleClose = () => {
    setLabel(labelAttribute);
    props.closeDialog();
  };

  const labelNameChangeHandler = (event) => {
    const inputLabel = event.target.value;

    if (props.existingLabels.includes(inputLabel.trim())) {
      label.error = true;
      label.validation = "Label name already exists";
      label.name = inputLabel;
      setLabel((prevLabel) => ({
        ...prevLabel,
        error: true,
        validation: "Label name already exists",
        name: inputLabel,
      }));
      return;
    }

    setLabel((prevLabel) => ({
      ...prevLabel,
      name: inputLabel,
      error: false,
      validation: "",
    }));
  };

  const labelColorChangeHandler = (labelColor) => {
    setLabel({
      name: label.name,
      colorName: labelColor.name,
      validation: "",
      error: false,
      color: labelColor.color,
      default: label.default,
    });
  };

  const defaultChangehandler = () => {
    setLabel({
      name: label.name,
      colorName: label.colorName,
      validation: "",
      error: false,
      color: label.color,
      default: !label.default,
    });
  };

  const labelNameSubmit = () => {
    console.log("[label form submit]", label);
    label.primary_user = true;

    const requestBody = {
      access_token: localStorage.getItem("access_token"),
      label: label,
    };

    const response = trackPromise(
      LabelService.createLabel(requestBody, "/resource/label")
    );

    response.then((res) => {
      if (res.status === 401) {
        localStorage.clear();
        return;
      } else if (res.status === 200) {
        label.id = res.data.id;
        setLabel(label);
      }
    });

    props.updateLabelsOnSuccess(label);
  };

  return (
    <div>
      <DialogBox
        open={props.open}
        closeDialog={handleClose}
        title="Add New Label"
        saveCancelDialog={true}
        submit={labelNameSubmit}
      >
        <Card width="90%" padding="6.5%">
          <InputField
            label="Label Name"
            type="text"
            value={label.name}
            onchange={labelNameChangeHandler}
            error={label.error}
            validationText={label.validation}
            required={true}
          />
          <CustomIconDropdown
            color={label.color}
            name={label.colorName}
            dropdownIcon="labelColor"
            masterData={labelsMasterData}
            onChange={labelColorChangeHandler}
          />

          <div>
            <Switch
              checked={label.default}
              onChange={defaultChangehandler}
              size="small"
              name="checkedA"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            <Label color="#dfdedd"> Add to Favourites</Label>
          </div>
        </Card>
      </DialogBox>
    </div>
  );
};

export default AddLabelDialog;
