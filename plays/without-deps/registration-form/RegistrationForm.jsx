import PlayHeader from 'common/playlists/PlayHeader';
import './Registration-form.css';
import { useState } from 'react';

function RegistrationForm(props) {
  // Your Code Start below.

  // for input values
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // input values after submit
  const [storedValues, setStoredValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // self explanatory
  const validateEmail = (emailvalue) => {
    if (emailvalue[0] === 'email') {
      const regx = /\S+@\S+\.\S+/;
      if (!regx.test(emailvalue[1])) {
        // set error and return false
        setValues((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            email: `your email is not correct`
          }
        }));

        return false;
      } else {
        // if email is correct clear error msg and return true
        setValues((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            email: ``
          }
        }));

        return true;
      }
    }

    // if other than email just return true
    return true;
  };

  // self explanatory
  const conmparePassword = (pass, confirmPass) => {
    // (pass and confirmPass) arrays containing name, value pair eg. ["password","xyz"] and ["confirmpassword","xyz"]
    if (pass[0] === 'password') {
      if (values.confirmPassword !== '') {
        if (pass[1] !== confirmPass[1]) {
          // values don't match set error, return false
          setValues((prevState) => ({
            ...prevState,
            errors: {
              ...prevState.errors,
              password: "Password doesn't match",
              confirmPassword: "Password doesn't match"
            }
          }));

          return false;
        } else {
          // if matches remove error msgs, return true
          setValues((prevState) => ({
            ...prevState,
            errors: {
              ...prevState.errors,
              password: '',
              confirmPassword: ''
            }
          }));

          return true;
        }
      }

      // return true in any other condition
      return true;
    }

    // return true in any other condition
    return true;
  };

  // final validation
  const validate = (value) => {
    // value is an array ex. ["name","deepak"]
    if (value[1] === '') {
      // if empty set error msg return false
      setValues((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [value[0]]: `Please fill the ${value[0]}`
        }
      }));

      return false;
    } else {
      // if not empty remove message return (validate email && compare password)
      setValues((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [value[0]]: ``
        }
      }));

      return validateEmail(value) && conmparePassword(value, Object.entries(values)[3]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let counter = 0;
    Object.entries(values).forEach((value) => {
      // validate each field, increase counter if validation passed.
      if (validate(value)) {
        counter = counter + 1;
      }
    });

    // if all fields are validated succsfully store the values in new object and clear the input values
    if (counter === 5) {
      setStoredValues({
        ...storedValues,
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword
      });
      setValues({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: { name: '', email: '', password: '', confirmPassword: '' }
      });
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <div className="play-details">
        <PlayHeader play={props} />
        <div className="play-details-body">
          {/* Your Code Starts Here */}
          <h3 className="registration-form-heading">
            A Registration form validation without any library
          </h3>
          <div className="registration-form container ">
            <form className="form-inside " onSubmit={submitHandler}>
              {Object.entries(values).map((value, index) => {
                return (
                  <div className="user-input" key={index}>
                    <label
                      className={`user-label  ${value[0] === 'errors' ? 'hidden' : ''}`}
                      htmlFor="email"
                    >
                      {value[0]}*
                    </label>
                    <input
                      className={`registration-input ${value[0] === 'errors' ? 'hidden' : ''}`}
                      key={index}
                      name={value[0]}
                      placeholder={`Enter ${value[0]}`}
                      type={
                        value[0] === 'name' ? 'text' : value[0] === 'email' ? 'email' : 'password'
                      }
                      value={value[1]}
                      onChange={onChangeHandler}
                    />
                    <label className="error">{values.errors[value[0]]}</label>
                  </div>
                );
              })}
              <div className="user-btn">
                <button className="btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
            <div className={` ${storedValues.name === '' ? 'hidden' : 'entered-value-container'}`}>
              <span className="success">Form Submitted !</span>
              <div className="entered-value-inner">
                {Object.entries(storedValues).map((storedValue, index) => {
                  return (
                    <div className="entered-value-row" key={index}>
                      <div className="heading">{storedValue[0]}</div>
                      <div>{storedValue[1]}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Your Code Ends Here */}
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
