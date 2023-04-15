import React, { Component } from 'react'
import web3 from '../web3'
import ipfs from '../ipfsapi';
import SmartContract from '../Smart_Contract/SmartContract'
class ViewInsuranceDetails extends Component{
  constructor(props){
    super(props)

    this.state ={
      AadharNo : '',
      result : [],


    }
  }


  showClaimDetails = async(event) =>{
    const accounts = await web3.eth.getAccounts()
    this.state.result = await SmartContract.methods.showClaim(this.state.AadharNo).call()
    alert("Date of claim is" +this.state.result[1] + "   damage Discription is " +this.state.result[2])
  }

  render(){
    return (
    <div class = "InsuranceClaimPage">
    	<input className="formStyling" class="fancyInput" value={this.state.AadharNo} onChange = {event => this.setState({AadharNo : event.target.value}) }  placeholder=" Enter Your AdharNumber" /><br />
      <button type="submit" className="InsuranceButtons" onClick = {this.showClaimDetails}> Show Details</button>
    </div>
  )

  }

}

export default ViewInsuranceDetails;
