import React, { Component } from 'react';
import axios from 'axios';
import ipfs from './ipfsapi';
// import storehash from './storehash';
import web3 from './web3';
import SmartContract from './Smart_Contract/SmartContract';

class AutomobileCompany extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// AadharNo: '',
			name:'',
			AadharNo:'',
			model: '',
			vin: '',
			carColor: '',
			chassisNo: '',
			mfgDate: '',
			message : '',
			fuelType : '',
			transactionHash:'',
			buffer : '',
			ipfshash : null,
      selectedFile: null,
		}
	}

	// fileSelectedHandler = event =>
	// 	this.setState({
	// 	  selectedFile: event.target.files[0]
	// 	});
	//   }

	// fileUploadHandler = () => {
	// 	const fd = new FormData()
	// 	fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
	// 	axios.post('URL',fd).then(res => {
	// 	  console.log(res)
	// 	});
	// }

	fileSelectedHandler = event => {
			event.stopPropagation()
			event.preventDefault()
			const file = event.target.files[0]
			let reader = new window.FileReader()
			reader.readAsArrayBuffer(file)
			reader.onloadend = () => this.convertToBuffer(reader)
		};

		convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };


	handleAadharNoChange = event => {
		this.setState({
			AadharNo: event.target.value
		});
	}


	handleNameChange = event => {
		this.setState({
			name: event.target.value
		});
	}

	handleModelChange = event => {
		this.setState({
			model: event.target.value
		});
	}

  handleVinChange = event => {
		this.setState({
			vin: event.target.value
		});
	}

	handlecarColorChange = event => {
		this.setState({
			carColor: event.target.value
		});
	}

  handlechassisNoChange = event => {
		this.setState({
			chassisNo: event.target.value
		});
	}

	handlemfgDateChange = event => {
		this.setState({
			mfgDate:event.target.value
		});
	}

	handlefuelChange = event => {
		this.setState({
			fuelType: event.target.value
		});
	}



	handleSubmit = async(event) => {
		// event.stopPropagation();
		event.preventDefault();
		// this.Upload();
		// const accounts = await web3.eth.getAccounts();
	try {
		await ipfs.add(this.state.buffer, (err, ipfsHash) => {
				console.log(ipfsHash);
				//setState by setting ipfsHash to ipfsHash[0].hash
				this.setState({ ipfshash:ipfsHash[0].hash });

			// const accounts  =  await web3.eth.getAccounts();
			//console.log(accounts);
			this.Upload();



		});

	} catch (err) {
		alert("Please Fill all the Fields")

	}
}

	Upload = async(event) => {
     //event.preventDefault();
	const accounts = await web3.eth.getAccounts();
	this.setState({message :'Ruko jara sabar karo'});
	await  SmartContract.methods.AutomobileCompany(this.state.AadharNo, this.state.name, this.state.model,this.state.chassisNo,this.state.fuelType,this.state.carColor,this.state.mfgDate).send({
		 from:accounts[0]
	 });
	this.setState({message : 'transaction successful'});

}




render() {
  const {name, model, vin, carColour, chassisNo, mfgDate,fuelType,ipfshash} = this.state
  return (
	<div class="automobileBackground">
		{/* <img src="src\AutomobileCompany\texture1.jpg" ></img> */}
		<form  onSubmit={this.handleSubmit}>

			<fieldset>
				<legend className="titlePage">Automobile Details</legend>
				<input className="formStyling" class="fancyInput" value={this.state.name} onChange={this.handleNameChange}  placeholder=" Owner Name" /><br />
			  <input className="formStyling" class="fancyInput" value={this.state.AadharNo} onChange={this.handleAadharNoChange}  placeholder=" Aadhar Number" /><br />
				<input className="formStyling" class="fancyInput" value={this.state.model} onChange={this.handleModelChange} placeholder="Vehicle Model" /><br />
				{/*<input className="formStyling" class="fancyInput" value={this.state.vin} onChange={this.handleVinChange} placeholder="Vehicle Identification Number" /><br />*/}
				<input className="formStyling" class="fancyInput" value={this.state.carColour} onChange={this.handlecarColorChange} placeholder="Vehicle Color" /><br />
				<input className="formStyling" className="fancyInput" value={this.state.chassisNo} onChange={this.handlechassisNoChange} placeholder="Chassis Number" /><br />
				<input className="formStyling" placeholder="Type Date" type="Date"  onfocus="(this.type = 'date')"  id="date" className="fancyInput" value={this.state.mfgDate} onChange={this.handlemfgDateChange} placeholder="Manufacturing Date" /><br />
				<input className="formStyling" className="fancyInput" value={this.state.fuelType} onChange={this.handlefuelChange} placeholder="FuelType" /><br />
			</fieldset>
			<input type="file" className="AutomobileButtonsInForm" onChange={this.fileSelectedHandler}/>
			<button type="submit" className="AutomobileButtonsInForm">  Add Vehicle</button>
			<h5>{ this.state.message}</h5>
			<p className='BlockHash'>Block hash {this.state.ipfshash}</p><br/><br/><br/>
		</form>
	</div>
  )
}
}
// ReactDOM.render(<AutomobileCompany />, document.querySelector("#app"))
export default AutomobileCompany
