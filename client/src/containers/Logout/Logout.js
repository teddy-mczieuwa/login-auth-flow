import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import * as Action from '../../store/actions/auth'

class Logout extends Component{
    componentWillMount() {
        this.props.onLogout()
    }
    render(){
        return <Redirect to="/auth"/>
    }
}
const mapDispatchToProps = dispatch=> {
    return{
        onLogout: ()=> dispatch(Action.authLogoutInit())
    }
}
export default connect(null, mapDispatchToProps)(Logout)