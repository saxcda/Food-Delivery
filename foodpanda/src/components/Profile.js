import React , { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { BsPerson } from "react-icons/bs";
import Header from "./Header";
import Footer from "./Footer";
//import "./Join_foodpanda.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email:"",
    currentPassword:"",
    newPassword:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Form data saved!");
  };


  return (
    <div>
      <Header />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start", 
            padding: 3,
            maxWidth: 500,
            margin: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: 2,
borderRadius: "15px",
            }}
          >
            <Typography variant="h6" >
              我的帳戶
            </Typography>
            <Tooltip title="This is your account details" arrow>
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <TextField
            label="名"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 ,
              "& .MuiOutlinedInput-root": {
            borderRadius: "16px", // Change border radius here
          },
            }}
          />

          <TextField
            label="姓"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 ,
              "& .MuiOutlinedInput-root": {
            borderRadius: "16px", // Change border radius here
          },
            }}
          />

          <TextField
            label="手機號碼"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 ,
              "& .MuiOutlinedInput-root": {
            borderRadius: "16px", // Change border radius here
          },
            }}
          />
          
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E0E0E0",
              color: "#ffffff",
              borderRadius: 2,
              paddingX: 5,
              boxShadow:"none",
              fontWeight:"bold",
              "&:hover": {
                backgroundColor: "#D6D6D6",
                boxShadow:"none",
              },
            }}
            onClick={handleSave}
          >
            儲存
          </Button>
          
          <Box
            sx={{
              height: "1px",        // Thickness of the line
              backgroundColor: "#E0E0E0", // Color of the line
              width: "100%",        // Full width
              margin: "20px 0",     // Space around the line
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6" >
              電子郵件
            </Typography>
          </Box>

          <TextField
            label="電子郵件"
            name="電子郵件"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 ,
              "& .MuiOutlinedInput-root": {
            borderRadius: "16px", // Change border radius here
          },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E0E0E0",
              color: "#ffffff",
              borderRadius: 2,
              paddingX: 5,
              boxShadow:"none",
              fontWeight:"bold",
              "&:hover": {
                backgroundColor: "#D6D6D6",
                boxShadow:"none",
              },
            }}
            onClick={handleSave}
          >
            儲存
          </Button>

          <Box
            sx={{
              height: "1px",        // Thickness of the line
              backgroundColor: "#E0E0E0", // Color of the line
              width: "100%",        // Full width
              margin: "20px 0",     // Space around the line
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6" >
               密碼
            </Typography>
          </Box>
            
          <TextField
            label="現在密碼"
            name="現在密碼"
            value={formData.currentPassword}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 ,
              "& .MuiOutlinedInput-root": {
            borderRadius: "16px", // Change border radius here
          },
            }}
          />

          <TextField
            label="新密碼"
            name="新密碼"
            value={formData.newPassword}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 ,
              "& .MuiOutlinedInput-root": {
            borderRadius: "16px", // Change border radius here
          },
            }}
          />

<Button
            variant="contained"
            sx={{
              backgroundColor: "#E0E0E0",
              color: "#ffffff",
              borderRadius: 2,
              paddingX: 5,
              boxShadow:"none",
              fontWeight:"bold",
              "&:hover": {
                backgroundColor: "#D6D6D6",
                boxShadow:"none",
              },
            }}
            onClick={handleSave}
          >
            儲存
          </Button>

          <Box
            sx={{
              height: "1px",        // Thickness of the line
              backgroundColor: "#E0E0E0", // Color of the line
              width: "100%",        // Full width
              margin: "20px 0",     // Space around the line
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6" >
             付款方式
            </Typography>
          </Box>
          
          <Box
            sx={{
              height: "1px",        // Thickness of the line
              backgroundColor: "#E0E0E0", // Color of the line
              width: "100%",        // Full width
              margin: "20px 0",     // Space around the line
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6" >
              帳號管理
            </Typography>
          </Box>

          
          
          <Box
            sx={{
              height: "1px",        // Thickness of the line
              backgroundColor: "#E0E0E0", // Color of the line
              width: "100%",        // Full width
              margin: "20px 0",     // Space around the line
            }}
          />
          
        </Box>

      <Footer />
    </div>
  );
};

export default Profile;
