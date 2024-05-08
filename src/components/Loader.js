import React from "react";
import { useState } from "react";
import RingLoader from "react-spinners/RingLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'500px'
    }}>
      <RingLoader loading={loading} color="#fd001c" />
    </div>
  );
}

export default Loader;