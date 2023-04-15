import React, { Component } from 'react'
import web3 from '../web3'
import ipfs from '../ipfsapi';
import SmartContract from '../Smart_Contract/SmartContract'

class InsuranceClaim extends Component {
	constructor(props) {
		super(props)

		this.state = {
			AadharNo: '',
			DateOfClaim: '',
			DamageDescription: '',
			message: '',
			transactionHash:'',
			buffer : '',
			ipfshash : null,
			selectedFile: null,
		}
	}

	fileSelectedHandler = event => {
		event.stopPropagation()
		event.preventDefault()
		const file = event.target.files[0]
		let reader = new window.FileReader()
		reader.readAsArrayBuffer(file)
		reader.onloadend = () => this.convertToBuffer(reader)
	  }

	  convertToBuffer = async(reader) => {
		//file is converted to a buffer to prepare for uploading to IPFS
		  const buffer = await Buffer.from(reader.result);
		//set this buffer -using es6 syntax
		  this.setState({buffer});
	  };

		


	handleDateOfClaimChange = event => {
		this.setState({
			DateOfClaim: event.target.value
		})
	}

	handleDamageDescriptionChange = event => {
		this.setState({
			DamageDescription: event.target.value
		})
	}

	handleAadharNoChange = event => {
        this.setState({
            AadharNo: event.target.value
        })
    }




	handleSubmit = async(event) => {
		event.preventDefault();

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
		alert("please select File")

	}

}
Upload = async(event) =>{
	//event.preventDefault();
	const accounts = await web3.eth.getAccounts();
	this.setState({message :'please wait transaction is being processed'});
	await  SmartContract.methods.InsuranceClaim(this.state.AadharNo, this.state.DateOfClaim, this.state.DamageDescription).send({
		 from:accounts[0]
	 });
	this.setState({message : 'transaction successful'});

}


	render() {
		const { AadharNo, DateOfClaim, DamageDescription } = this.state

		return (
			<div className="InsuranceClaimPage">
			<form onSubmit={this.handleSubmit}>
			<fieldset>
				<legend className="titlePage">Insurance Claim</legend><br /><br />
				<input  type='number' size = '12' className="formStyling" class="fancyInput" value={this.state.AadharNo} onChange={this.handleAadharNoChange}  placeholder=" Aadhar Number" /><br /><br />
				<input  placeholder="Type Date" type="Date" onfocus="(this.type = 'date')"  id="date" className="formStyling" class="fancyInput" value={this.state.DateOfClaim} onChange={this.handleDateOfClaimChange} placeholder="Date of Claim" /><br /><br />
				<input className="formStyling" class="fancyInput" value={this.state.DamageDescription} onChange={this.handleDamageDescriptionChange} placeholder="Damage Description" /><br /><br />
			</fieldset>
			    <br/>
				<input type="file" className="InsuranceButtonsInForm" onChange={this.fileSelectedHandler}/>
                <button type="submit" className="InsuranceButtonsInForm">Submit</button><br /><br />
				<h5> {this.state.message}</h5> <br/> <br/>
				<p className="BlockHash">Block hash : {this.state.ipfshash}</p><br/><br/><br/><br/><br/><br/>
			</form>
			</div>
		)

	}

}


 export default InsuranceClaim
