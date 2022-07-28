import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useContext } from "react";
import "./SeeMore.css";
import { UserContext } from "./../../contexts/user.context";
import SignIn from "../SignIn/SignIn";

export default function SeeMore() {

    const { currentUser } = useContext(UserContext);
  return (
    !currentUser && <Paper elevation={24} className="seeMore">
      <Typography variant="h4" component="h2">
        Sign in to See More...
      </Typography>
      <SignIn toggleSignInButton={false} />
    </Paper>
  );
}
