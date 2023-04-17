import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import UploadDetails from './UploadDetails'

function handleUploadDetails() {
    return(
        window.location='/Owner/UploadDetails'
    )
}

// function handleViewData() {
//     return(
//         window.location='/Insurance/UploadInsuranceDetails'
//     )
// }

function Owner() {
    return(
        <Router>
        
        <Route exact={true} path="/Owner" render = {() => (
        <div class="OwnerButtonPage"> 
            
            


            <div class="OwnerButtonPackage">
                <button class="OwnerButtons"  type="button" onClick={handleUploadDetails}> Upload Details </button><br/><br/><br/>
                <button class="OwnerButtons"  type="button" > View Data from Blockchain </button><br/><br/><br/><br/><br/><br/><br/>
                
            </div>
            
                    
        </div>
        
        )}/>
        <Route path="/Owner/UploadDetails" component={UploadDetails} />
        {/* <Route path="/Insurance/UploadInsuranceDetails" component={UploadInsuranceDetails} /> */}

        </Router>
          )
        }
        

export default Owner