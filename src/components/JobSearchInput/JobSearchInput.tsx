import { Box, TextField } from "@mui/material";
import React from "react";

interface Childprops {
  onSearchQueryChange :(input :string)=>void;
}

export default function JobSearchInput(props :Childprops) {
  const {onSearchQueryChange} = props
  const onInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onSearchQueryChange(event.target.value)
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField sx={{ width: "100%" }}
        size="small"
        id="standard-basic"
        label="Search for Job"
        variant="outlined"
        onChange={onInputChange}
      />
    </Box>
  );
}
