import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import socketIOClient from 'socket.io-client';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./App.css";
import RingLoader from "react-spinners/RingLoader";
const socket = socketIOClient("http://localhost:5000/");

function App(props) {
  const [displayName, setDisplayName] = useState("");
  const [address, setAddress] = useState("");
  const [patientId, setPatientId] = useState("");
  const [loading,setloading]=useState(false);
  const [notfulfilled,setnotfulfilled]=useState(true);
  const [residence, setResidence] = useState("");
  const [viewport, setViewport] = useState({
    width: "75vw",
    height: "75vh",
    latitude: 29.9304758,
    longitude: 78.062618,
    zoom: 10
  });
  const [userLocation, setUserLocation] = useState({});
  const [ambulanceLocation, setAmbulanceLocation] = useState({});
  const mapRef = useRef();
  useEffect(() => {
    const myfunc=async ()=>{
      const response=await Axios.get(`http://localhost:5000/api/ambulance/info/${props.match.params.ambulanceid}`);
      if(response){

        const setAmbulanceLocationvalue = {
          latitude: response.data.location.coordinates[1],
          longitude: response.data.location.coordinates[0]
        };
        // console.log(`${response.data}`);
        setDisplayName(response.data.displayName);
        setAddress(response.data.location.address);
        setAmbulanceLocation(setAmbulanceLocationvalue);
        socket.emit('join', {
          displayName: response.data.displayName
        });
      }else{
        console.log('no ambulance found');
      }
      // const fres=await Axios.get(`http://localhost:5000/api/request/find/${patientId}`);
      // if(fres){
      //   if(!fres.data.found){
      //     setPatientId("");
      //     setResidence("");
      //   }
      // }else{
      //   console.log('error in request');
      // }
    socket.on("request", (eventData) => {
        const setUserLocationvalue = {
          latitude: eventData.location.userLocation.latitude,
          longitude: eventData.location.userLocation.longitude
        };
        setPatientId(eventData.patientId);
        setResidence(eventData.location.addressPatient);
        setUserLocation(setUserLocationvalue);
      
    });

    }
    myfunc();
  }, [props.match.params.ambulanceid]);
// console.log('here\n');
  const handleViewportChange = (newViewport) => {
    setViewport({ ...viewport, ...newViewport });
  };

  const handleGeocoderViewportChange = (newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides
    });
  };

  const requestforHelp = async() => {
    // setloading(true);
    socket.emit("request-accepted-client", {
      displayName: displayName,
      address: address,
      ambulanceLocation: ambulanceLocation
    });
    try {
      const ack=await Axios.post(`http://localhost:5000/api/request/fulfill/${patientId}`);
      if(ack){
        if(ack.data.success){
          setloading(true);
        }
      }else{
        console.log('some problem occured');
      }
    } catch (error) {
      console.log(error);
    }

    // socket.emit("reques")
  };

  return (
    <div>
      {!loading && <>
        <div className="heading">
        {displayName && address ? (
          <div>
            <h3>{displayName}</h3>
            <h3>It is here - {address}</h3>
          </div>
        ) : (
          <h5>Fetching Ambulance Details..</h5>
        )}

        {patientId && residence ? (
          <div>
            <h3>{patientId} needs your help</h3>
            <h3>Location - {residence}</h3>
          </div>
        ) : (
          <h5>Fetching Patient Requests...</h5>
        )}
      </div>
      <button type="button" className="btn btn-success" onClick={requestforHelp}>Help Patient</button>


      {/* map rendering - do not touch  */}
      <div className="map">
        <ReactMapGL
          {...viewport}
          ref={mapRef}
          onViewportChange={handleViewportChange}
          mapStyle="mapbox://styles/mapbox/navigation-preview-day-v2"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOXAPI}
        >
          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOXAPI}
          />

          {Object.keys(userLocation).length !== 0 && (
            <Marker
              latitude={userLocation.latitude}
              longitude={userLocation.longitude}
            >
              <img className="marker" src="patient.png" alt="marker" />
            </Marker>
          )}
        </ReactMapGL>
      </div>
      </>}
      {loading && <div style={{
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        height:'500px'
    }}>
      <p className="logo">Ambulance currently serving another patient..</p>
      <br />
      <RingLoader  color="#fd001c" />
    </div> }
      
    </div>
  );
}

export default App;
