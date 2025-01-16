
import Flatpickr from "react-flatpickr";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";

export const FormikTextField = ({ field, form, ...props }:any) => {
  const { name } = field; // Access field name
  const { errors, touched } = form; // Access Formik's errors and touched
  const isError = Boolean(touched[name] && errors[name]); // Check if there's an error and the field is touched

  return (
    <TextField
      {...field} // Include Formik's field props (name, value, onChange, onBlur)
      {...props} // Include additional props passed to the component
      label={props.label}
      error={isError} // Set error to true if validation fails
      helperText={""} // Show the error message or empty string
      className="w-full"
    />
  );
};

export const FormikFlatpickr = ({ field, form, ...props }:any) => {
  const { name } = field;
  const { errors, touched, setFieldValue } = form;

  const isError = Boolean(touched[name] && errors[name]); // Check if field has been touched and has an error

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
    <Flatpickr
      {...props}
      value={field.value ? new Date(field.value) : null} // Bind Formik's value
      onChange={(selectedDates: Date[]) => {
        const formattedDate = selectedDates.length > 0 ? new Date(selectedDates[0].getTime() + 1000 * 60 * 60 * 24).toISOString().split("T")[0] : null; // Format to yyyy-MM-dd and add one day
        setFieldValue(name, formattedDate); // Update Formik value
      }}
      options={{
        dateFormat: "F j, Y", // Enforce January 12 2024 format in the input
        altFormat: "Y-m-d", // Store the value in 2024-12-10 format
        ...props.options, // Allow additional Flatpickr options
      }}
      style={{
        border: isError ? "1px solid red" : "1px solid #ccc",
        padding: "8px",
        borderRadius: "4px",
      }}
    />
    {isError && <span style={{ color: "red", fontSize: "0.8rem" }}>{errors[name]}</span>}
  </div>
  );
};

export const FormikSelectField = ({ field, form, ...props }: any) => {
  const { children } = props;
  const { name } = field;
  const { errors, touched, setFieldValue } = form;
  const isError = Boolean(touched[name] && errors[name]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue(name, (event.target.value as string));
  };
  return (
    <>
      <FormControl fullWidth error={isError}>
        <InputLabel id="select-label">Status</InputLabel>
        <Select
          labelId="select-label"
          value={field.value === "shipped" ? "shipped" : field.value}
          onChange={handleChange}
          input={<OutlinedInput label="Status" />}
          MenuProps={MenuProps}
        >
          <MenuItem value="" disabled>
            <em>{props.placeholder || "Select an option"}</em>
          </MenuItem>
          {children.map((child: any) => (
            <MenuItem value={child.props.value === "delivered" && field.value === "shipped" ? "shipped" : child.props.value}>
              {child.props.children}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};