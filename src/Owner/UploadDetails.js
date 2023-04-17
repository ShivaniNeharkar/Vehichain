import React, { Component } from 'react'
import axios from 'axios'
import ipfs from '../ipfsapi';
import SmartContract from '../Smart_Contract/SmartContract'

class UploadDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            AadharNo: '',
            LicenseNo: '',
            InsuranceCompanyName: '',
            Address: '',
            AadharCardPhoto: null,
            LicensePhoto: null,
            OwnerPhoto: null,
            transactionHash:'',
            buffer1:'',
            buffer2:'',
			buffer : '',
			ipfshash3 : null,
      ipfshash1:null,
      ipfshash2:null,
            message: '',
            selectedFile: null,
        }
    }
    fileAadharCardNoHandler = event => {
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

    fileAadharUploadHandler = async(event) => {
        event.preventDefault();

      try {
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            console.log(ipfsHash);
            //setState by setting ipfsHash to ipfsHash[0].hash
            this.setState({ ipfshash3:ipfsHash[0].hash });

          // const accounts  =  await web3.eth.getAccounts();
          //console.log(accounts);
          // this.Upload();



        });

      } catch (err) {
        alert("please select File")

      }

    }

    // fileAadharCardPhotoHandler = event => {
    //     this.setState({
    //       AadharCardPhoto: event.target.files[0]
    //     })
    // }
    //
    // fileAadharUploadHandler = () => {
    //     const fd = new FormData()
    //     fd.append('image', this.state.AadharCardPhoto, this.state.AadharCardPhoto.name)
    //     axios.post('URL',fd).then(res => {
    //       console.log(res)
    //     })
    // }
    LicenseNoHandler = event => {
  		event.stopPropagation()
  		event.preventDefault()
  		const file = event.target.files[0]
  		let reader = new window.FileReader()
  		reader.readAsArrayBuffer(file)
  		reader.onloadend = () => this.convertToBuffer(reader)
  	  }

  	  convertToBuffer = async(reader) => {
  		//file is converted to a buffer to prepare for uploading to IPFS
  		  const buffer1 = await Buffer.from(reader.result);
  		//set this buffer -using es6 syntax
  		  this.setState({buffer1});
  	  };

      fileLicenseUploadHandler =async() => {
        try {
          await ipfs.add(this.state.buffer1, (err, ipfsHash) => {
              console.log(ipfsHash);
              //setState by setting ipfsHash to ipfsHash[0].hash
              this.setState({ ipfshash1:ipfsHash[0].hash });

            // const accounts  =  await web3.eth.getAccounts();
            //console.log(accounts);
            // this.Upload();



          });

        } catch (err) {
          alert("please select File")

        }
      }

    // fileLicenseUploadHandler = event => {
    //     this.setState({
    //     LicensePhoto: event.target.files[0]
    //     })
    // }
    //
    // fileLicenseUploadHandler = () => {
    //     const fd = new FormData()
    //     fd.append('image', this.state.LicensePhoto, this.state.LicensePhoto.name)
    //     axios.post('URL',fd).then(res => {
    //         console.log(res)
    //     })
    // }
    fileOwnerPhotoHandler = event => {
      event.stopPropagation()
      event.preventDefault()
      const file = event.target.files[0]
      let reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => this.convertToBuffer(reader)
      }

      convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer2 = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer2});
      };


    //
    // fileOwnerPhotoHandler = event => {
    //     this.setState({
    //     OwnerPhoto: event.target.files[0]
    //     })
    // }
    //
    fileOwnerPhotoUploadHandler = async(event) => {
      try {
        await ipfs.add(this.state.buffer2, (err, ipfsHash) => {
            console.log(ipfsHash);
            //setState by setting ipfsHash to ipfsHash[0].hash
            this.setState({ ipfshash2:ipfsHash[0].hash });

          // const accounts  =  await web3.eth.getAccounts();
          //console.log(accounts);
          // this.Upload();



        });

      } catch (err) {
        alert("please select File")

      }
    }


    handleAadharNoChange = event => {
        this.setState({
            AadharNo: event.target.value
        })
    }

    handleLicenseNoChange = event => {
        this.setState({
            LicenseNo: event.target.value
        })
    }

    handleInsuranceCompanyNameChange = event => {
        this.setState({
            InsuranceCompanyName: event.target.value
        })
    }

    handleAddressChange = event => {
        this.setState({
            Address: event.target.value
        })
    }



    // handleSubmit = event => {
    //     var x = document.forms["UploadDetailsForm"]["AadharNoEntry"].value;
    //     if (x == "") {
    //       alert("Name must be filled out");
    //       return false;
    //     }
    //     event.preventDefault()
    // }





    render() {
        const {AadharNo, LicenseNo, InsuranceCompanyName, Address } = this.state
        return (
            <div className='OwnerClaimPage'>
            <form onSubmit={this.handleSubmit}>

            <fieldset>
                <legend className="titlePage">Your Details</legend>
                <input name="AadharNoEntry" className="formStyling" class="fancyInput" value={AadharNo} onChange={this.handleAadharNoChange} placeholder="Your AadharNo" /><br />
                <input type="file" className="OwnerButtonsInForm" onChange={this.fileAadharCardNoHandler}/>
                <button onClick={this.fileAadharUploadHandler} className="OwnerButtonsInForm">Upload Aadhar Card</button><br/> <br/>
                <p className="BlockHash">Block hash : {this.state.ipfshash3}</p><br/><br/><br/><br/><br/><br/>
                <input className="formStyling" class="fancyInput" value={LicenseNo} onChange={this.handleLicenseNoChange} placeholder=" LicenseNo" /><br />
                <input type="file" className="OwnerButtonsInForm" onChange={this.LicenseNoHandler}/>
                <button onClick={this.fileLicenseUploadHandler} className="OwnerButtonsInForm">Upload License</button><br/><br/>
                <p className="BlockHash">Block hash : {this.state.ipfshash1}</p><br/><br/><br/><br/><br/><br/>
                <input className="formStyling" class="fancyInput" value={InsuranceCompanyName} onChange={this.handleInsuranceCompanyNameChange} placeholder="Insurance Company Name" /><br />
                <input className="formStyling" class="fancyInput" value={Address} onChange={this.handleAddressChange} placeholder="Address" /><br />
                <input type="file" className="OwnerButtonsInForm" onChange={this.fileOwnerPhotoHandler}/>
                <button onClick={this.fileOwnerPhotoUploadHandler} className="OwnerButtonsInForm">Upload Your Photo</button><br/>
                <p className="BlockHash">Block hash : {this.state.ipfshash2}</p><br/><br/><br/><br/><br/><br/>

                <button className="OwnerButtonsInForm"> Submit </button><br/><br/><br/><br/>

            </fieldset>
            </form>
            </div>
        )
    }
}
// ReactDOM.render(<AutomobileCompany />, document.querySelector("#app"))
export default UploadDetails
