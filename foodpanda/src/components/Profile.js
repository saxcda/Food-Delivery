import React , { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { BsPerson } from "react-icons/bs";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios"; // Axios for API requests
import { useEffect } from "react";
//import "./Join_foodpanda.css";

const Profile = ({ setlogin, setlogout, loginState,  user, setUser}) => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/user-details?user_id=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phoneNumber: data.phone || "",
            email: data.email || "",
            address: data.address || "",
            currentPassword: "",
            newPassword: "",
          });
        } else {
          console.error("Failed to fetch user details:", response.statusText);
          setError("Failed to load user data.");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Saved Data:", data);
        alert("Profile updated successfully!");
      } else {
        console.error("Failed to save profile:", response.statusText);
        alert("Failed to save profile.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;


  



  return (
    <div>
      <Header setlogin={setlogin} setlogout={setlogout} loginState={loginState}  user={user} setUser={setUser}/>
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
            label="全名"
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
        {/*
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
        */}
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
                backgroundColor: "#D70F64",
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
            name="email"
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
                backgroundColor: "#D70F64",
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
            name="currentPassword"
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
            name="newPassword"
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
                backgroundColor: "#D70F64",
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
             地址
            </Typography>
          </Box>

          <TextField
            label="地址"
            name="地址"
            value={formData.address}
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
                backgroundColor: "#D70F64",
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
