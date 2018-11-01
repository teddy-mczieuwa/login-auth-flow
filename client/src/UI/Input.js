import React from 'react'
import './Input.css'


const input = props => {
    let inputElement = null;
    let inputClass = 'InputElement';
    let validationError = null;
    if (props.invalid && props.shouldBeValidated && props.touched && props.isBlurredOut){
        inputClass = 'InputElement Invalid';
        switch(props.valueType){
            case 'email':
                validationError = <p className="InputError">Please enter a valid
                    <span> {props.valueType}</span>
                                </p>;
                    break;
            case 'password':
                validationError = <p className="InputError">
                    <span> {props.valueType} </span>
                     must contain capital letters and special characters at least 8 characters long
                </p>;
                    break;
            case 'confirmPassword':
                validationError = <p id="ConfirmPasswordError" className="InputError">Passwords do not match</p>;
                break;
            default:
                validationError =  null
        }


    }
    if (!props.invalid && props.shouldBeValidated && props.touched){
        inputClass = 'InputElement Valid'
    }
    switch(props.elementType) {
        case ('input'):
            inputElement = <input  className= {inputClass}
                                   {...props.elementConfig}
                                   value={props.value} onChange={props.changed}
                                   onBlur={props.blurred}
                                   disabled={props.disabled}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea  className={inputClass}
                                      {...props.elementConfig}
                                      value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = <select
                className={inputClass}
                value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option=> (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>;
            break;
        default:
            inputElement = <input className={inputClass}
                                  {...props.elementConfig}
                                  value={props.value} onChange={props.changed}/>;
    }
    return(
        <div className="Input">
            <label className='Label' htmlFor="">{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};

export default input
