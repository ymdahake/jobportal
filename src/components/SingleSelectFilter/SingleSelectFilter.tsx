import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Option } from "../../models/Option";
import { FilterContext } from "./../../contexts/filter.context";
import { useContext } from "react";

interface childProps {
  options: Option[];
  label: string;
  // onItemChange: (label: string, value: string) => void;
  name: string;
}

export default function SingleSelectFilter(props: childProps) {
  const { options, label, name } = props;
  const [selectedValue, setselectedValue] = React.useState("");
  const { selectedfilters, setselectedfilters } = useContext(FilterContext);

  const handleChange = (event: SelectChangeEvent) => {
    setselectedValue(event.target.value);
    
    if (event.target.name === "filterByDate")
      selectedfilters.filterByDate = event.target.value;
    if (event.target.name === "filterByLocation")
      selectedfilters.filterByLocation = event.target.value;
    if (event.target.name === "filterByLevel")
      selectedfilters.filterByLevel = event.target.value;

    setselectedfilters({ ...selectedfilters });
    console.log("fromfilter context : ", selectedfilters);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        label={props.label}
        name={props.name}
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
