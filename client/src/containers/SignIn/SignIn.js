import React,{Component} from 'react';
//import axios from 'axios'
import Input from '../../UI/Input'
import Button from '../../UI/Button/Button'
import {checkValidity} from '../../shared/utility'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import * as Action from '../../store/actions/auth'
import Spinner from '../../UI/Spinner/Spinner'

import './SignIn.css'


class SignIn extends Component{
    state = {
        controls: {
            email: {
                elementType: 'input',

                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },

                value: '',

                validation: {
                    required: true,
                    isEmail: true
                },

                valid: false,
                touched: false,
                blurred: false,
                disabled: false
            },

            password: {
                elementType: 'input',

                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },

                value: '',

                validation: {
                    required: true,
                    special: true
                },

                valid: false,
                touched: false,
                blurred: false,
                disabled: false,
            }
        },
        isSignUp: false,
        formValidity: false,
        mounted: false
    };
    componentDidMount() {
        this.onSlideIn()
    }
    onSlideIn = ()=> {
        if(!this.props.isAuthenticated){
            setTimeout(()=> {
                this.setState({mounted: true})
            }, 50);
        }


    };
    onChangeHandler= (event, inputIdentifier)=> {
        //console.log(event.target.value);
        let controls = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation ),
            }
        };

        let isValid = true;
        for (let inputIdentifier in controls){
            isValid = isValid && controls[inputIdentifier].valid;
            console.log(isValid)
        }
        this.setState({controls: controls, formValidity: isValid})
    };
    onBlurHandler = (event, inputIdentifier)=> {
        let controlsForBlur = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                blurred: this.state.controls[inputIdentifier].value !== ''
            }

        };
        this.setState({controls: controlsForBlur})
    }

    onSubmitHandler= (event)=> {
        event.preventDefault();
        const userDetails = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onSubmit(userDetails, this.state.isSignUp)


    };
    onToggleHandler = () => {
            this.props.history.push('/auth')
    };

    render(){
        let inputArray = [];

        for (let inputIdentifier in this.state.controls){

            inputArray.push({
                id: inputIdentifier,
                config: this.state.controls[inputIdentifier]
            });
        }
        if(!this.state.isSignUp){
            console.log(inputArray)
        }
        let signInClass = 'Sign In';
        if (this.state.mounted){
            signInClass = 'SignIn SlideIn'
        } else{
            signInClass = 'SignIn SlideOut'
        }
        let redirect = null;
        if (this.props.isAuthenticated){
            redirect= <Redirect to="/"/>
        }
        let myForm = (
            <React.Fragment>
            <form onSubmit={this.onSubmitHandler}>
            {inputArray.map(input=> {
                return <Input
                    key={input.id}
                    elementType={input.config.elementType}
                    value={input.config.value}
                    elementConfig={input.config.elementConfig}
                    changed={(event)=>this.onChangeHandler(event,input.id)}
                    touched={input.config.touched}
                    invalid={!input.config.valid}
                    shouldBeValidated = {true}
                    valueType={input.id}
                    disabled={input.config.disabled}
                    isBlurredOut={input.config.blurred}
                    blurred={(event)=>this.onBlurHandler(event, input.id)}

                />
            })}
            { this.state.isSignUp?
                <Button classType="Success" disabled={!this.state.formValidity}>Sign Up</Button>:
                <Button classType="Success" disabled={!this.state.formValidity}>Sign In</Button>
            }

        </form>
                {this.state.isSignUp ?
                    <p className="Switcher">Already have an Account? <Link className="Toggler" to="/signin" >Sign In</Link></p>
                    : <p className="Switcher">Don't have an Account? <span className="Toggler" onClick={this.onToggleHandler}>Sign Up</span></p>}
            </React.Fragment>
                );
        if(this.props.loading){
            myForm = <Spinner/>
        }

        return(
            <div className={signInClass}>
                {redirect}

                <h1>Sign In</h1>
                {myForm}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading: state.loading,
        isAuthenticated: state.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onSubmit: (userDetails, isSignUp)=> dispatch(Action.authInit(userDetails, isSignUp))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignIn)