import React, { Component } from 'react'
import axios from 'axios'
import ipfs from '../ipfsapi';
import SmartContract from '../Smart_Contract/SmartContract'
import web3 from '../web3'

class UploadInsuranceDetails extends Component {
	constructor(props) {
		super(props)

		this.state = {
			AadharNo: '',
			issueDate: '',
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


	handleissueDateChange = event => {
		this.setState({
			issueDate: event.target.value
		})
	}

	handleAadharNoChange = event => {
        this.setState({
            AadharNo: event.target.value
        })
    }


	
	handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await ipfs.add(this.state.buffer, (err, ipfsHash) => {
				console.log(ipfsHash);
				//setState by setting ipfsHash to ipfsHash[0].hash
				this.setState({ ipfshash:ipfsHash[0].hash });

				this.Upload();

			});

		} catch (err) {
			alert("Please select all the fields")
		}



	}



    Upload = async(event) => {

		const accounts = await web3.eth.getAccounts();

		console.log('Sending from Metamask account: ' + accounts[0]);


		this.setState({message :'please wait transaction is being processed'});

		SmartContract.methods.sendHash(this.state.ipfshash,this.state.AadharNo).send({
			from:accounts[0]
		}) ;

	  this.setState({message : 'transaction successful'});

	};



	render() {
		const { AadharNo, issueDate } = this.state

		return (
			<div className='InsuranceClaimPage'>
				<form onSubmit={this.handleSubmit}>
				<fieldset>
				<legend className="titlePage">Upload Insurance Details</legend><br /><br />
				<input  type='number' className="formStyling" class="fancyInput" value={this.state.AadharNo} onChange={this.handleAadharNoChange}  placeholder=" Aadhar Number" /><br /><br />
				<input  placeholder="Type Date" type="text" onfocus="(this.type = 'date')"  id="date" className="formStyling" class="fancyInput" value={this.state.issueDate} onChange={this.handleissueDateChange} placeholder="Date of Claim" /><br /><br /><br /><br />
			</fieldset>
					<input type="file" className="InsuranceButtonsInForm" onChange={this.fileSelectedHandler}/>
					<button type="submit" className="InsuranceButtonsInForm">Submit</button>
					<h4> {this.state.message}</h4><br /><br />
					<p className='BlockHash'>Block hash {this.state.ipfshash}</p><br/><br/><br/><br/><br/><br/><br/><br/>
				</form>
			</div>
		)

	}

}


 export default UploadInsuranceDetails
