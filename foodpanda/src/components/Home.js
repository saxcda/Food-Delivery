import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Location from "./Location";
import Join_foodpanda from "./Join_foodpanda";
import CityGrid from "./CityGrid";
import Download from "./Download";
import Know_more from "./Know_more";
import Note_foodpanda from "./Note_foodpanda";
import { useRef , useEffect } from "react";


const Home = ({ setlogin, setlogout }) => {
  const [location, setLocation] = React.useState("");
  const [loadingLocation, setLoadingLocation] = React.useState(false);

  const handleFindMyLocation = () => {
    setLoadingLocation(true);
    setTimeout(() => {
      setLocation("33301 桃園市, 文化一路259號");
      setLoadingLocation(false);
    }, 2000);
  };

  return (
    <>
      <Header setlogin={setlogin} setlogout={setlogout}/>
      <Location
        location={location}
        loadingLocation={loadingLocation}
        handleFindMyLocation={handleFindMyLocation}
      />
      <Join_foodpanda />
      <CityGrid />
      <Download />
      <Know_more />
      <Note_foodpanda />
      <Footer />
    </>
  );
};

export default Home;
