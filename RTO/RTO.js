import React, { Component } from 'react'
import axios from 'axios'
import web3 from '../web3'
import SmartContract from '../Smart_Contract/SmartContract'

class RTO extends Component {
	constructor(props) {
		super(props)

		this.state = {
			AadharNo: '',
			LicensePlateNumber: '',
            AssignedUser: '',
            RCBook:'',
            message:'',
            
			
		}
	}

	

	handleLicensePlateNumberChange = event => {
		this.setState({
			LicensePlateNumber: event.target.value
		})
	}

    handleRCBookChange = event => {
		this.setState({
			RCBook: event.target.value
		})
	}

	handleAssignedUserChange = event => {
		this.setState({
			AssignedUser: event.target.value
		})
	}

	handleAadharNoChange = event => {
        this.setState({
            AadharNo: event.target.value
        })
    }


	handleSubmit = async (event) => {
		event.preventDefault();
		const accounts  = await web3.eth.getAccounts();
		this.setState({message :'Ruko jara sabar karo'});
		await SmartContract.methods.RTO(this.state.AadharNo, this.state.LicensePlateNumber, this.state.AssignedUser,this.state.RCBook).send({
			from:accounts[0]
		});
		this.setState({message : 'transaction successful'});
	}


	
	render() {
		const { AadharNo, LicensePlateNumber, AssignedUser, RCBook } = this.state
		
		return (
			<div className="RTOClaimPage">
			<form onSubmit={this.handleSubmit}>            
			<fieldset>
				<legend className="titlePage">RTO</legend><br /><br />
				<input  type='number' className="formStyling" class="fancyInput" value={this.state.AadharNo} onChange={this.handleAadharNoChange}  placeholder=" Aadhar Number" /><br /><br />
				<input  type='number' className="formStyling" class="fancyInput" value={this.state.LicensePlateNumber} onChange={this.handleLicensePlateNumberChange}  placeholder=" License Plate Number" /><br /><br />
				<input className="formStyling" class="fancyInput" value={this.state.AssignedUser} onChange={this.handleAssignedUserChange} placeholder="Assigned User Name" /><br /><br />
				<input  className="formStyling" class="fancyInput" value={this.state.RCBook} onChange={this.handleRCBookChange}  placeholder="RC Book" /><br /><br />
		
			</fieldset>
			    <br/>
				<input type="file" className="RTOButtonsInForm" onChange={this.fileSelectedHandler}/>
                <button type="submit" className="RTOButtonsInForm">Submit</button><br /><br />
				<h5> {this.state.message}</h5> <br/> <br/>
				{/*<p className="BlockHash">Block hash : {this.state.ipfshash}</p>*/}<br/><br/><br/><br/><br/><br/>	
			</form>
			</div>
		)
	
	}
	
}


 export default RTO

