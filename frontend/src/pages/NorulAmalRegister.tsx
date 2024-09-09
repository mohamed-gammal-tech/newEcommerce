import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  SelectChangeEvent,
  Container,
} from "@mui/material";

interface FormData {
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  email: string;
  phoneNumber: string;
  subject: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "Other",
    email: "",
    phoneNumber: "",
    subject: "Subject 1",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #d16ba5, #86a8e7, #5ffbf1)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: 4,
          maxWidth: 700,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Registration Form</h2>

        {/* Responsive box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Column for xs, row for md and larger
          }}
        >
          {/* Left box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 1,
              width: { xs: "100%", md: "50%" }, // Full width for xs, 50% for md and larger
            }}
          >
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />

            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />

            <TextField
              label="Birthday"
              type="date"
              fullWidth
              margin="normal"
              slotProps={{
                input: {
                  inputProps: { max: new Date().toISOString().split("T")[0] },
                },
              }}
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
              required
            />
          </Box>

          {/* Right box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 1,
              width: { xs: "100%", md: "50%" }, // Full width for xs, 50% for md and larger
            }}
          >
            <FormControl
              component="fieldset"
              margin="normal"
              sx={{ marginTop: "7px" }}
            >
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </Box>
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel>Choose option</InputLabel>
          <Select
            name="subject"
            value={formData.subject}
            onChange={handleSelectChange}
            label="Choose option"
          >
            <MenuItem value="Subject 1">Subject 1</MenuItem>
            <MenuItem value="Subject 2">Subject 2</MenuItem>
            <MenuItem value="Subject 3">Subject 3</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
