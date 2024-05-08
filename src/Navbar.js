import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Login from './Login';
import Logout from './Logout';
import Auth0Profile from './Auth0Profile';
import {NavLink} from "react-router-dom";
import { useHistory } from 'react-router-dom';
// import { useEffect } from 'react';
// import {useHistory} from 'react-router-dom';
// const handleClick = () => history.push('/emergency');
const Navbar = () => {
  // const {  isAuthenticated } = useAuth0();
  const history=useHistory();
  var curruser=JSON.parse(localStorage.getItem('details'));
  console.log(localStorage.getItem('details'));
  // var curruser;
  console.log(curruser);
  const handleLogout=()=>{
    localStorage.removeItem("details");
    history.push('/');
  }
  return (
    <div>
    <nav className="flex items-center justify-between flex-wrap bg-red-900 p-6">
  
  <div className="block lg:hidden">
    <button className="flex items-center px-3 py-2 border rounded text-orange-200 border-teal-400 hover:text-white hover:border-white">
      <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto h-[18px]">
    <div className="text-sm lg:flex-grow">
      <NavLink  to="/" className="block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4 px-6 font-bold text-lg">
        Home
      </NavLink>
      
      <NavLink activeStyle={{
        color:'white',
        border:'1px solid white'
        
      }} to="/emergency" className="block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4 px-6 font-bold text-lg">
        Emergency
      </NavLink>
      <NavLink activeStyle={{
        color:'white',
        border:'1px solid white'
      }} to="/services" className="block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4 px-6 font-bold text-lg">
        Services
      </NavLink>  
      {curruser==undefined && <NavLink activeStyle={{
        color:'white',
        border:'1px solid white'
      }} to="/about" className=" px-4 block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4 px-6 font-bold text-lg">
        About
      </NavLink> }
      
      <NavLink activeStyle={{
        color:'white',
        border:'1px solid white'
      }} to="/contact" className=" px-4 block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4 px-6 font-bold text-lg">
        Contact Us
      </NavLink>
      {curruser==undefined && 
        <NavLink activeStyle={{
          color:'white',
          border:'1px solid white'
        }} to="/login" className=" px-4 block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4 px-6 font-bold text-lg">
          Hospital login
        </NavLink>
       } 
       {curruser && <NavLink activeStyle={{
          color:'white',
          border:'1px solid white'
        }} to="/addamb" className=" px-4 block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4 px-6 font-bold text-lg">
          Add New Ambulance
        </NavLink> }
        {curruser && <NavLink activeStyle={{
          color:'white',
          border:'1px solid white'
        }} to="/admin" className=" px-4 block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4 px-6 font-bold text-lg">
          View All Ambulances
        </NavLink> }
       {curruser && <>
       <button style={{
        color:'white',
        border:'1px solid white',
        paddingTop:'5px',
        paddingBottom:'5px',
        paddingLeft:'10px',
        paddingRight:'10px'
       }} onClick={handleLogout}>Logout</button>
       </>}
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar
