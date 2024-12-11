import React from "react";
import { Grid, Card, CardActionArea, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Import images directly
import taipei from "./Citypic/taipei.jpeg";
import newtaipei from "./Citypic/newtaipei.jpeg";
import taichung from "./Citypic/taichung.jpeg";
import tainan from "./Citypic/tainan.jpeg";
import taitung from "./Citypic/taitung.jpeg";
import changhua from "./Citypic/changhua.jpeg";
import chiayi from "./Citypic/chiayi.jpeg";
import hsinchu from "./Citypic/hsinchu.jpeg";
import hualien from "./Citypic/hualien.jpeg";
import kaohsiung from "./Citypic/kaohsiung.jpeg";
import keelung from "./Citypic/keelung.jpeg";
import kinmen from "./Citypic/kinmen.jpeg";
import miaoli from "./Citypic/miaoli.jpeg";
import nantou from "./Citypic/nantou.jpeg";
import penghu from "./Citypic/penghu.jpeg";
import pingtung from "./Citypic/pingtung.jpeg";
import taoyuan from "./Citypic/taoyuan.jpeg";
import yilan from "./Citypic/yilan.jpeg";
import yunlin from "./Citypic/yunlin.jpeg";
import CitySearch from "./CitySearch";

// Define the cities with imported images
const cities = [
  { name: "台北市", image: taipei },
  { name: "新北市", image: newtaipei },
  { name: "台中市", image: taichung },
  { name: "台南市", image: tainan },
  { name: "台東市", image: taitung },
  { name: "彰化市", image: changhua },
  { name: "嘉義市", image: chiayi },
  { name: "新竹市", image: hsinchu },
  { name: "花蓮市", image: hualien },
  { name: "高雄市", image: kaohsiung },
  { name: "基隆市", image: keelung },
  { name: "金門縣", image: kinmen },
  { name: "苗栗市", image: miaoli },
  { name: "南投市", image: nantou },
  { name: "澎湖縣", image: penghu },
  { name: "屏東縣", image: pingtung },
  { name: "桃園市", image: taoyuan },
  { name: "宜蘭縣", image: yilan },
  { name: "雲林縣", image: yunlin },
];

const CityGrid = () => {
  const navigate = useNavigate();

  const handleCityClick = (cityName) => {
    navigate(`/restaurants/${cityName}`);
  };

  return (
    <Grid 
    container spacing={3} 
    columnSpacing={1}
    rowSpacing={4}
    justifyItems="center"
    sx={{
      padding:"0 5% 0 7%",
    }}
    >

      {cities.map((city, index) => (
        <Grid
          item
          key={index}
          xs={6} // 1 card per row on extra-small screens (<600px)
          md={3}  // 3 cards per row on medium screens (960px ≤ width < 1280px)
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          
          <Card sx={{ 
            maxWidth: 300 ,
            borderRadius:"15px",
            display:"flex",
            backgroundColor: "transparent",
            }}>
            <CardActionArea onClick={() => handleCityClick(city.name)}>
              <img
                src={city.image}
                //alt={city.name}
                style={{ width: "100%", 
                        height: "240px", 
                        objectFit: "cover",
                      }}
              />
            </CardActionArea>
            <Box 
              variant="contained"
              sx={{
                margin:"195px 8px 8px 8px",     
                position:"absolute",
                width:"auto",
                padding:"10px",
                backgroundColor: "#ffffff",
                borderRadius:"10px"
              }}
              >
                <Typography variant="h7" component="div" fontWeight= "bold">
                  {city.name}
                </Typography>
              </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CityGrid;
