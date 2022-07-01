import { Box, TextField } from "@mui/material";
import React from "react";

export default function JobSearchInput() {
  const onInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(event.target.value);
    console.log("input changed");
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
