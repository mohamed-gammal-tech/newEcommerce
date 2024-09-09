import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

const RegisterPage = () => {
  const [error, setError] = useState<string>("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const onSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log({ firstName, lastName, email, password });
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //very important to add this line to send data in json format to the server to make the middle ware work properly
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    if (!response.ok) {
      setError("User already exists");
      console.log("Failed to register");
      return;
    }

    const data = await response.json();
    console.log(data);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h5">Register New Account </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            border: 1,
            padding: 2,
            borderRadius: 2,
            borderColor: "grey.300",
          }}
        >
          <TextField
            inputRef={firstNameRef}
            label="firstName"
            name="firstName"
          />
          <TextField inputRef={lastNameRef} label="lastName" name="lastName" />
          <TextField inputRef={emailRef} label="email" name="email" />
          <TextField
            inputRef={passwordRef}
            label="password"
            name="password"
            type="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Register
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
