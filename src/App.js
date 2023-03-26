import React , {Component} from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import AutomobileCompany from './AutomobileCompany'
import RTO from './RTO/RTO'

import Insurance from './Insurance/Insurance'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Owner from './Owner/Owner'
import web3 from './web3'

class App extends Component {
  constructor(props) {
		super(props)

		this.state = {

			topic: 'RTO'
		}
	}

  handleTopicChange = event => {
		this.setState({
			topic: event.target.value
		})
	}
  render() {
    web3.eth.getAccounts().then(console.log)

		return (
      <Router>
        <Route path="/Insurance" component={Insurance} />
        <Route path="/RTO" component={RTO} />
        <Route path="/AutomobileCompany" component={AutomobileCompany} />
        <Route path="/Owner" component={Owner} />

        <Route exact={true} path="/" render = {() => (

        <Router>
          <header class="heading">
                  <p>Vehichain</p>
          </header>
          <div class="container">
            <div class="row">
              <div class="card">
                <div class="card-header1">
                  <h1>RTO</h1>
                </div>
                <div class="card-body1">
                  <p>Block first gets created by government.</p>
                  <a href='/RTO' class="btn">OPEN</a>
                </div>
              </div>
              <div class="card">
                <div class="card-header2">
                  <h1>Owner</h1>
                </div>
                <div class="card-body2">
                  <p>Owner gets the ability to view everything.that is on Blockchain.</p>
                  <a href='/Owner' class="btn">OPEN</a>
                </div>
              </div>
              <div class="card">
                <div class="card-header3">
                  <h1>Automobile</h1>
                </div>
                <div class="card-body3">
                  <p>Vehicle company gets to upload all the vehicle realted data.</p>
                  <a href= '/AutomobileCompany' class="btn">OPEN</a>
                </div>
              </div>
              <div class="card">
                <div class="card-header4">
                  <h1>Insurance</h1>
                </div>
                <div class="card-body4">
                  <p>Insurance company of that vehicle will also get linked and can upload the data to Blockchain.</p>
                  <a href='/Insurance' class="btn">OPEN</a>
                </div>
              </div>
            </div>
          </div>
          </Router>

        )}/>
      </Router>
    )
  }
};

export default App
