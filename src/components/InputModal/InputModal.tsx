import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "firebase/auth";
import { createUserDocumentFromAuth } from "../../utils/Firebase.utils";
import { UserContext } from "../../contexts/user.context";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface inputProps {
  open: boolean;
  onClose: any;
  onMobileSubmited: any;
  user: User |undefined;
}

export default function InputModal({
  open,
  onClose,
  onMobileSubmited,
  user,
}: inputProps) {
  const phoneRegExp =/^[0]?[6789]\d{9}$/;
    // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const { currentUser,setCurrentUser } = React.useContext(UserContext);
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().matches(
      phoneRegExp,
      "Mobile number is not valid"
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const addMobileNumber = async (data: any) => {
    console.log("onFormSubmit invoked");
    console.log(data.phoneNumber);
    onMobileSubmited(data);
    console.log(user);
    if (data.phoneNumber != undefined && user != undefined) {
      let userDocRef = await createUserDocumentFromAuth(user, data.phoneNumber);
      setCurrentUser({...user,phoneNumber :data.phoneNumber});
    }
    console.log("current user  now : " ,currentUser);

  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb:1}}>
            Please provide your mobile number.
          </Typography>

          <TextField
            id="outlined-basic"
            label="Mobile Number"
            variant="outlined"
            required
            {...register("phoneNumber")}
            error={errors.phoneNumber ? true : false}
            helperText="Enter valid phone number"
            size="small"
            sx={{mr:1}}
          />
          <Button variant="contained" onClick={handleSubmit(addMobileNumber)}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
