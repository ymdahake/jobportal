import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Option } from "../../models/Option";

interface childProps {
  options: Option[];
  label: string;
  onItemChange: (label: string, value: string) => void;
}

export default function SingleSelectFilter(props: childProps) {
  const { options, label, onItemChange } = props;
  const [selectedValue, setselectedValue] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setselectedValue(event.target.value);
    onItemChange(label, event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        label={props.label}
        onChange={handleChange}
        size="small"
      >
        {options.map((item) => {
          return (
            <MenuItem value={item.key} key={item.key}>
              {item.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
