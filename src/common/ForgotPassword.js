import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import moment from 'moment';
import axios from 'axios';

export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [remainingTime, setRemainingTime] = useState(100); // 5 minutes in seconds
  const [intervalId, setIntervalId] = useState(null);
  const [timerExpired, setTimerExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate()

  // -------------------------------- Stage 1 Logic -------------------------------------------------------------------------
  const handleFirstStepSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await axios.post('https://nightlife-2710.herokuapp.com/forgot-password', values);
      setIsLoading(false);
      setUserEmail(values.email_id);
      setStep(1);
    } catch (error) {
      setIsLoading(false);
      if (error?.response) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage('An error occurred');
      }
    }
  };

  const validateStep1 = (values) => {
    const errors = {};
    if (!values.email_id) {
        errors.email_id = 'Email is Required';
    } else if (!/\S+@\S+\.\S+/.test(values.email_id)) {
        errors.email_id = 'Invalid email address';
    }
      return errors;
  }

  const inputStyle = {
    display: 'flex',
    padding: '8px 20px',
    gap: '12px',
    width: '100%',
  };

//----------------------------------- Stage 2 Logic ----------------------------------------------------------------------------------
const [otp] = useState({
  digit1: '',
  digit2: '',
  digit3: '',
  digit4: '',
  digit5: '',
  digit6: '',
});

const handleSecondStepSubmit = async (values) => {
  setIsLoading(true);
  setErrorMessage(null);

  const otpValue = `${values.digit1}${values.digit2}${values.digit3}${values.digit4}${values.digit5}${values.digit6}`;

  try {
    setErrorMessage(null)
    const response = await axios.post('https://nightlife-2710.herokuapp.com/verify-otp', {email_id: userEmail, otp: otpValue });
    setIsLoading(false);
    setStep(2);
  } catch (error) {
    setIsLoading(false);
    if (error?.response) {
      setErrorMessage(error.response.data.detail);
    } else {
      setErrorMessage('An error occurred');
    }
  }
};

const validateStep2 = (values) => {
  const errors = {};

  for (let i = 1; i <= 6; i++) {
    const field = `digit${i}`;
    if (!values[field]) {
      errors[field] = 'Required';
    } else if (!/^[0-9]$/.test(values[field])) {
      errors[field] = 'Invalid digit';
    }
  }
  return errors;
};

useEffect(() => {
  const startTime = moment();
  const endTime = moment().add(5, 'minutes');

  const initialRemainingTime = endTime.diff(startTime, 'seconds');

  setRemainingTime(initialRemainingTime);

  const id = setInterval(() => {
    setRemainingTime((prevRemainingTime) => {
      // Check if the timer has expired
      if (prevRemainingTime <= 1) {
        setTimerExpired(true);
      }
      
      return prevRemainingTime - 1;
    });
  }, 1000);

  // Store the interval ID
  setIntervalId(id);

  // Clean up the interval when the component unmounts
  return () => {
    clearInterval(id);
  };
}, []);

useEffect(() => {
  if (remainingTime === 0) {
    setTimerExpired(true);
  }
}, [remainingTime]);

// Handle step change when the timer expires
useEffect(() => {
  if (timerExpired) {
    setStep(0);
  }
}, [timerExpired]);

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


//----------------------------------- Stage 3 Logic -----------------------------------------------------------------------------
function validateThirdStep(values) {
  const errors = {};
  if (!values.newPassword) {
    errors.newPassword = 'Required';
  } else if (values.newPassword.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters long';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

async function handleThirdStepSubmit(values, { setSubmitting }) {
  setIsLoading(true);
  setErrorMessage(null);

  const finalPassObj = {
    email_id: userEmail,
    new_password: values.newPassword
  };

  try {
    const response = await axios.put('https://nightlife-2710.herokuapp.com/update-password', finalPassObj);
    sessionStorage.setItem("token", response?.data?.access_token);
    sessionStorage.setItem("username", response?.data?.User_name);
    setStep(3);
  } catch (error) {
    if (error?.response) {
      setErrorMessage(error.response.data.detail);
    } else {
      setErrorMessage('An error occurred');
    }
  }
  setIsLoading(false);
  setSubmitting(false);
}
  return (
    <div className="vh-100" style={{ background: '#0B0B0B', height: 'auto' }}>
      <div className="d-flex justify-content-center" style={{height: "100%"}}>
        <div className="col-lg-8 position-relative my-auto" style={{borderRadius: '20px', height: 'max-content' }}>
          {/* Stage 1 */}
          {step === 0 && (
            <>
              <div className="d-flex mx-auto rounded-circle mb-4" style={{border: '1px solid rgba(255, 255, 255, 0.1)', width: 'fit-content', background: 'rgba(255, 255, 255, 0.07)'}}>
                <img src={process.env.PUBLIC_URL + "./images/forgot-password 1.png"} alt="logo" style={{ width: '120px' }}/>
              </div>
              <div className="d-flex justify-content-center flex-column text-center">
                <h4 className="text-white" style={{ fontWeight: '700' }}>Forgot Password?</h4>
                <h6 className="text-white my-2" style={{ fontWeight: '700' }}>No Worries! 😎</h6>
                <p className="my-2" style={{ fontWeight: '400', color: 'rgba(255, 255, 255, 0.7)' }}>We'll send an otp to this email</p>
              </div>
              <Formik initialValues={{ email_id: '' }} onSubmit={handleFirstStepSubmit} validate={validateStep1} validateOnChange={false} validateOnBlur={false}>
              {formik => (<><div className="col-lg-6 mx-auto my-3">
                  <Input icon="fa-regular fa-envelope" style={inputStyle} placeholder="Email Address" type="email" name="email_id" value={formik.values.email_id} id="email_id" handleChange={formik.handleChange} />
                  {formik.errors.email_id && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{formik.errors.email_id}</div>}
                  {errorMessage && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errorMessage}</div>}
                </div>
                <button type="submit" className="btn mt-5 py-3 col-lg-6 d-flex mx-auto justify-content-center align-items-center" onClick={formik.handleSubmit} style={{ borderRadius: '100px', background: 'white', color: 'black', fontWeight: '600', fontSize: '17px' }}>
                {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
                {isLoading && (<span id="login-loading-text-span">Loading</span>)}
                {!isLoading && <span id="login-text-span">Send</span>}
                </button>
                </>
                )}
              </Formik>

              <div className="text-white mt-4 text-center">
                <span>
                  Go back to{' '}
                  <Link to="/login" className="text-white" style={{ textDecoration: 'underline' }}>
                    Sign In
                  </Link>
                </span>
              </div>
            </>
          )}
          {/* Stage 2 */}
          {step === 1 && (
            <>
             <div
                className="d-flex mx-auto rounded-circle mb-4"
                style={{ border: "1px solid rgba(255, 255, 255, 0.1)", width: "120px", height: "120px", background: "rgba(255, 255, 255, 0.07)"}}>
                <span className='d-flex justify-content-center align-self-center w-100 text-white' style={{fontSize: "30px", fontWeight: "700"}}>{formatTime(Math.max(remainingTime, 0))}</span> 
              </div>
              <div className="d-flex justify-content-center flex-column text-center">
                <h4 className="text-white" style={{ fontWeight: "700" }}>Enter the OTP</h4>
                <h6 className="text-white my-2" style={{ fontWeight: "700" }}>No Worries! 😎</h6>
                <p className="my-2" style={{ fontWeight: "400", color: "rgba(255, 255, 255, 0.7)"}}>A 6-digit OTP has been sent to this email</p>
              </div>
              <Formik initialValues={otp} onSubmit={handleSecondStepSubmit} validate={validateStep2} validateOnChange={false} validateOnBlur={false}>
                {(formik) => (
                  <>
                    <div className="col-lg-6 mx-auto my-3 d-flex flex-column p-1">
                      <div className="d-flex justify-content-space-between">
                        {Array.from({ length: 6 }, (_, i) => (
                          <div className="mx-2" key={i}>
                            <Input
                              id={`digit${i + 1}`}
                              maxLength={"1"}
                              placeholder=""
                              style={{ textAlign: "center" }}
                              name={`digit${i + 1}`}
                              value={formik.values[`digit${i + 1}`]}
                              handleChange={(e) => {
                                formik.handleChange(e);
                                if (e.target.value !== "") {
                                  const nextInput = document.getElementById(`digit${i + 2}`);
                                  if (nextInput) {
                                    nextInput.focus();
                                  }
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Backspace') {
                                  if (formik.values[`digit${i + 1}`] === '') {
                                    const prevInput = document.getElementById(`digit${i}`);
                                    if (prevInput) {
                                      formik.setFieldValue(`digit${i}`, '');
                                      prevInput.focus();
                                    }
                                  } else {
                                    formik.setFieldValue(`digit${i + 1}`, '');
                                  }
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Error Message */}
                    {formik.errors.digit1 || formik.errors.digit2 || formik.errors.digit3 || formik.errors.digit4 || formik.errors.digit5 || formik.errors.digit6 ?
                    <div  className="text-center mt-4" style={{ color: 'crimson', fontSize: '14px', marginTop: '5px' }}>All digits must be filled and valid.</div> : null}
                    {errorMessage && <div className="text-center mt-4" style={{ color: 'crimson', fontSize: '14px', marginTop: '5px' }}>{errorMessage}</div>}
                    <button type="submit" className="btn mt-4 py-3 col-lg-6 d-flex mx-auto justify-content-center align-items-center" onClick={formik.handleSubmit} style={{ borderRadius: "100px", background: "white", color: "black", fontWeight: "600", fontSize: "17px"}}>
                    {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
                    {isLoading && (<span id="login-loading-text-span">Loading</span>)}
                    {!isLoading && <span id="login-text-span">Verify</span>}
                    </button>
                  </>
                )}
              </Formik>
              <div className="text-white mt-4 text-center">
                <span>
                  Go back to{" "}
                  <Link to="/login" className="text-white" style={{ textDecoration: "underline" }}>
                    Sign In
                  </Link>
                </span>
              </div>
            </>
          )}

          {/* Stage 3 */}
          {step === 2 && (
              <>
                <div
                  className="d-flex mx-auto rounded-circle mb-4"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.1)", width: "120px", height: "120px", background: "rgba(255, 255, 255, 0.07)"}}>
                  <img src={ process.env.PUBLIC_URL + "./images/forgot-password-2.svg"} alt="logo" style={{ width: "76px", margin: "0 auto" }}/>
                </div>
                <div className="d-flex justify-content-center flex-column text-center">
                  <h4 className="text-white" style={{ fontWeight: "700" }}>
                  Create New Password
                  </h4>
                  <p className="my-2 col-lg-6 mx-auto" style={{ fontWeight: "400", color: "rgba(255, 255, 255, 0.7)",}}>
                  Password must include at least combination of 8 characters, numbers and special character
                  </p>
                </div>
                <Formik initialValues={{newPassword: "", confirmPassword: ""}} validate={validateThirdStep} onSubmit={handleThirdStepSubmit} validateOnBlur={false} validateOnChange={false}>
                  {(formik) => (<>
                    <div className="col-lg-6 mx-auto my-3 d-flex p-1">
                      <div className="d-flex flex-column col">
                        <div className="mx-2 mt-4">
                          <Input type="password" icon="fa-solid fa-lock" style={inputStyle} placeholder="New Password" icon2="fa-regular fa-eye" icon3="fa-regular fa-eye-slash" bi bi-lock-fill id="newPassword" name="newPassword" value={formik.values.newPassword} handleChange={formik.handleChange}/>
                          {formik.errors.newPassword && <div className='' style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{formik.errors.newPassword}</div>}
                        </div>
                        <div className="mx-2 my-4">
                          <Input type="password" icon="fa-solid fa-lock" style={inputStyle} placeholder="Confirm Password" icon2="fa-regular fa-eye" icon3="fa-regular fa-eye-slash" bi bi-lock-fill id="confirmPassword" name="confirmPassword" value={formik.values.confirmPassword} handleChange={formik.handleChange}/>
                          {formik.errors.confirmPassword && <div className='' style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{formik.errors.confirmPassword}</div>}
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn mt-2 py-3 col-lg-6 d-flex mx-auto justify-content-center align-items-center" style={{ borderRadius: "100px", background: "white", color: "black", fontWeight: "600", fontSize: "17px"}} onClick={formik.handleSubmit}>
                    {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
                    {isLoading && (<span id="login-loading-text-span">Loading</span>)}
                    {!isLoading && <span id="login-text-span">Continue</span>}
                    </button>
                    </>
                  )
                  }
                </Formik>
              </>
          )}
          {/* Stage 4 */}
          {step === 3 && (
            <>
            <div className='my-md-5'>
                <div className="d-flex mx-auto rounded-circle flex-column my-4" style={{width: "120px", height: "120px"}}>
                  <img src={ process.env.PUBLIC_URL + "./images/success.png"} alt="logo" style={{ width: "100%", margin: "0 auto" }}/>
                </div>
                <div className='px-md-5 mx-md-5'>
                  <h4 className="text-center text-white px-md-5 mx-md-5 mb-md-2 mb-3" style={{fontWeight: "800"}}>Password has been Changed Successfully!</h4>
                  <p className='mx-lg-5 text-center px-md-5 col-lg-10 col-md-11 mx-auto' style={{color: "rgba(255, 255, 255, 0.7)", fontSize: "15px", opacity: "70%"}}>Lorem ipsum dolor sit amet consectetur. Sagittis pellentesque aliquet venenatis vitae. Vulputate ligula ut.</p>
                </div>
                <button onClick={()=>navigate("/")} className="btn mt-4 py-3 col-md-3 d-flex mx-auto justify-content-center align-items-center" style={{ borderRadius: "100px", background: "white", color: "black", fontWeight: "600", fontSize: "17px"}}>
                  {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
                  {isLoading && (<span id="login-loading-text-span">Loading</span>)}
                  {!isLoading && <span id="login-text-span">Done</span>}
                </button>
              </div>
            </>
          )}
          {/* <img src="./images/LOGO.svg" alt="logo" className="col-lg-2 position-absolute" style={{ top: '30px' }} /> */}
        </div>
      </div>
    </div>
  );
}