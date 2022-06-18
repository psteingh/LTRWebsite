import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../home/Forms";
import FooterSmall from "../home/footersmall";

const Forgot = () => {

  const [email, setEmail] = useState('');
  const [validate, setValidate] = useState({});

  const validateforgotPassword = () => {
      let isValid = true;

      let validator = Form.validator({
          email: {
              value: email,
              isRequired: true,
              isEmail: true
          }
      });

      if (validator !== null) {
          setValidate({
              validate: validator.errors
          })

          isValid = false
      }
      return isValid;
  }

  const forgotPassword = (e) => {
      e.preventDefault();

      const validate = validateforgotPassword();

      if (validate) {
          alert('Reset password link is sent to '+email);
          setValidate({});
          setEmail('');
      }
  }

  return (
      <div className="col-md-12">
        <div className="card card-container">

          <div className="already-need">
            Forgot Password</div>
      
                <div className="auth-form-container text-start">
                  <form className="auth-form" method="POST" onSubmit={forgotPassword} autoComplete={'off'}>
                    <div className="email mb-3">
                      <input type="email"
                      className={`form-control ${validate.validate && validate.validate.email ? 'is-invalid ' : ''}`}
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      />

                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                    {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
                    </div>
                    </div>
                                
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Forgot Password</button>
                    </div>
                  </form>

            <div className="already-need">
              <Link className="action-signlog" to="/login" >
                Login
              </Link>
            </div>
                
                
              </div>
            </div>
      
        <FooterSmall />

      </div>
    );
}

export default Forgot;