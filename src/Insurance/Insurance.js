//import React from 'react'
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap"
import InsuranceClaim from './InsuranceClaim'
import web3 from '../web3'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import UploadInsuranceDetails from './UploadInsuranceDetails'
import SmartContract from '../Smart_Contract/SmartContract'
import ViewInsuranceDetails from './ViewInsuranceDetails'
import ViewCard from '../ViewCard'



class Insurance extends Component {


   handleUploadInsuranceDetails = event => {
          return(
              window.location='./Insurance/UploadInsuranceDetails'
          )
      }

 handelViewInsuranceDetails = event => {

    return(
      window.location = './Insurance/ViewInsuranceDetails'

    )
  }

  // handelViewInsuranceDetails = event => {
  //
  //    return(
  //      window.location = '../ViewCard'
  //
  //    )
  //  }

  // handleAadharNoChange = event => {
  //   this.setState({
  //     AadharNo: event.target.value
  //   });
  // }

  handleInsuranceClaim = event => {
      return(
          window.location='./Insurance/InsuranceClaim'
      )
  }
  render(){
    return(
        <Router>

        <Route exact={true} path="/Insurance" render = {() => (
        <div class="InsuranceButtonPage">

            <div class="InsuranceButtonPackage" >
                <button class="InsuranceButtons"  type="button" onClick={this.handleInsuranceClaim}>Insurance Claim  </button><br/><br/><br/>
                <button class="InsuranceButtons"  type="button" onClick={this.handleUploadInsuranceDetails}>Upload Insurance Details  </button><br/><br/><br/>
                <button class="InsuranceButtons"  type="button" onClick={this.handelViewInsuranceDetails}>View Insurance Details </button><br/><br/><br/><br/><br/>

            </div>
        </div>

        )}/>

        <Route path="/Insurance/InsuranceClaim" component={InsuranceClaim} />
        <Route path="/Insurance/UploadInsuranceDetails" component={UploadInsuranceDetails} />
        <Route path ="/Insurance/ViewInsuranceDetails" component = {ViewInsuranceDetails}/>
        <Route path =" /ViewCard" component = {ViewCard}/>

        </Router>
          )

  }
}

export default Insurance
