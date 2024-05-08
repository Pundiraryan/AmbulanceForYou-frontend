import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminComponent() {
	const [cruds, setCruds] = useState([]);
	const [fcruds,setFcruds]=useState([]);
	const [fs,setFs]=useState("");
	const setfv=(event)=>{
		setFs(event.target.value);
	}
	const filteramb=()=>{
		console.log(fs);
		const ambs=cruds.filter((x)=>x.location.address.includes(fs));
		console.log(ambs);
		setFcruds(ambs);
		// setCruds(ambs);
	}
	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get("http://localhost:5000/api/ambulance/all");
                console.log('yaha');
                console.log(response.data);
				setCruds(response.data);
				setFcruds(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []);

	return (
		<div className="container" style={{
            display:'flex',
            flexDirection:'column',
			alignContent:'center',
			justifyContent:'center'
        }}>
			<div>
				<h2 style={{
					textAlign:'center'
				}}>
					All Ambulances
				</h2>
				<div style={{
					display:'flex',
					width:'500px',
					justifyContent:'space-between'
				}}>
					
					<div>Select State:</div>
					<div>
					<select name="state" id="state" class="form-control" value={fs} onChange={setfv}>
<option value="Andhra Pradesh">Andhra Pradesh</option>
<option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
<option value="Arunachal Pradesh">Arunachal Pradesh</option>
<option value="Assam">Assam</option>
<option value="Bihar">Bihar</option>
<option value="Chandigarh">Chandigarh</option>
<option value="Chhattisgarh">Chhattisgarh</option>
<option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
<option value="Daman and Diu">Daman and Diu</option>
<option value="Delhi">Delhi</option>
<option value="Lakshadweep">Lakshadweep</option>
<option value="Puducherry">Puducherry</option>
<option value="Goa">Goa</option>
<option value="Gujarat">Gujarat</option>
<option value="Haryana">Haryana</option>
<option value="Himachal Pradesh">Himachal Pradesh</option>
<option value="Jammu and Kashmir">Jammu and Kashmir</option>
<option value="Jharkhand">Jharkhand</option>
<option value="Karnataka">Karnataka</option>
<option value="Kerala">Kerala</option>
<option value="Madhya Pradesh">Madhya Pradesh</option>
<option value="Maharashtra">Maharashtra</option>
<option value="Manipur">Manipur</option>
<option value="Meghalaya">Meghalaya</option>
<option value="Mizoram">Mizoram</option>
<option value="Nagaland">Nagaland</option>
<option value="Odisha">Odisha</option>
<option value="Punjab">Punjab</option>
<option value="Rajasthan">Rajasthan</option>
<option value="Sikkim">Sikkim</option>
<option value="Tamil Nadu">Tamil Nadu</option>
<option value="Telangana">Telangana</option>
<option value="Tripura">Tripura</option>
<option value="Uttar Pradesh">Uttar Pradesh</option>
<option value="Uttarakhand">Uttarakhand</option>
<option value="West Bengal">West Bengal</option>
</select>
					</div>
					<div>
					<button className="px-4 py-1 text-white bg-red-700" onClick={filteramb}>Filter</button>
					</div>
					</div>
				<hr />
			</div>
		
                        <div className="table-responsive" style={{
                            display:'flex',
                            flexDirection:'column'
                        }}>
			<table className="table riped  table-hover table-bordered container">
				{/* <thead>
					<tr>
						<th>Name</th>
						<th>Phone</th>
						<th>Email</th>
						<th>Location</th>
						<th>View</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead> */}
				<tbody>
					{fcruds &&
						fcruds.map((crud) => {
							return (
								<tr key={crud._id}>
									<td>
										<Link to={`/cruds/${crud._id}`} className="link-line">
											{crud.displayName}
										</Link>
									</td>
									<td>{crud.ambulanceid}</td>
									<td>{crud.email}</td>
									<td>{crud.location.address}</td>
									<td>
										<Link to={`/emergency/${crud.ambulanceid}`} className="btn btn-danger">
											View Patient Requests
										</Link>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			</div>
		</div>
	);
}

export default AdminComponent;
