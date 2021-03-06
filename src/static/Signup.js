import React, { useState } from 'react';
import {withRouter} from 'react-router';

import firebase from '../components/Firebase';
import 'bootstrap/dist/css/bootstrap.css';
import RegistrationsModal from '../components/RegistrationsSuccess'
    
function Signup(props) {
      const [name, setName] = useState('');
      const [displayName, setDisplayName] = useState('');
      const [email, setEmail] = useState('');
      const [passOne, setPassOne] = useState('');
      const [passTwo, setPassTwo] = useState('');
      const [phoneNumber, setPhoneNumber] = useState('');
      const [errorMessage, setErrorMessage] = useState(null);
      const [requestSucessMessage, setRequestSucessMessage] = useState(null);
      const [show, setShow] = useState(false);
      const handleClose = () => {
        this.props.history.push("/");
        setShow(false);
      }
      const handleShow = () => setShow(true);
    
      React.useEffect(() => {
        if (passOne !== passTwo){
          passTwo ? setErrorMessage("Password do not match") : setErrorMessage(null)
        } else {
          setErrorMessage(null)
        }
      }, [passTwo, passOne]);
    
      const handleSubmit = (e) => {
        const userName = email.split('@')[0] + '' + phoneNumber.substr(phoneNumber.length - 4);
        var registrationInfo = {
          userName: userName,
          displayName : displayName,
          email : email,
          phoneNumber : phoneNumber
        }
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(
          registrationInfo.email,
          passTwo
          ).then( () => {
            props.registerUser(userName);
            setName(displayName);
            handleShow();
            const ref = firebase.database().ref(`userinformation/${userName}`);
            ref.push(registrationInfo);
            setRequestSucessMessage("Profile Created Successfully");
            setDisplayName('');
            setPhoneNumber('');
            setEmail('');
            setErrorMessage(null)
            setRequestSucessMessage(null)
          })
        .catch( error => {
          if (error.message !== null){
            setErrorMessage(error.message)
          } else {
            setErrorMessage(null)
          }
        });
      }

      const getFormErrorMessage = () => {
        return (
            <div className="col-12 alert alert-danger px-3 ">
                {errorMessage}
            </div>
        )
      }

      const getFormSuccessMessage = () => {
        return (
            <div className="col-12 alert alert-primary px-3 ">
                {requestSucessMessage}
            </div>
        )
      }

      return (
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h3 className="text-center font-weight-light mb-3">Register</h3>
                      <div className="form-row">
                      { errorMessage !== null && getFormErrorMessage() }
                      { requestSucessMessage !== null && getFormSuccessMessage() }
                        <section className="form-group">
                          <label
                            className="form-control-label sr-only"
                            htmlFor="displayName"
                          >
                          Display Name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="displayName"
                            placeholder="Display Name"
                            name="displayName"
                            required
                            value={displayName}
                            onChange={e => setDisplayName(e.target.value)}
                          />
                        </section>
                      </div>
                      <section className="form-group">
                        <label
                          className="form-control-label sr-only"
                          htmlFor="email"
                        >
                        Email
                        </label>
                        <input
                          className="form-control"
                          type="email"
                          id="email"
                          placeholder="Email Address"
                          required
                          name="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </section>
                      <div className="form-row">
                        <section className="form-group">
                          <input
                            className="form-control"
                            type="password"
                            name="passOne"
                            placeholder="Password"
                            value={passOne}
                            onChange={e => setPassOne(e.target.value)}
                          />
                        </section>
                        <section className="form-group">
                          <input
                            className="form-control"
                            type="password"
                            required
                            name="passTwo"
                            placeholder="Repeat Password"
                            value={passTwo}
                            onChange={e => setPassTwo(e.target.value)}
                          />
                        </section>
                      </div>
                      <section className="form-group">
                        <label
                          className="form-control-label sr-only"
                          htmlFor="phoneNumber"
                        >
                        Phone Number
                        </label>
                        <input
                          className="form-control"
                          type="phoneNumber"
                          id="phoneNumber"
                          placeholder="Phone Number"
                          required
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}
                        />
                      </section>
                      <br />
                      <div className="text-center mb-6">
                        <button className="btn btn-success" type="submit" style={{textAlign: 'center'}}>
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {show  && (
                      <RegistrationsModal
                        show={show}
                        handleClose={handleClose}
                        displayName={name}/>
                      )}
                </div>
              </div>
            </div>
          </form>
        );
    }
    
export default withRouter(Signup)