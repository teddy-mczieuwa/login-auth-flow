import React, {Component} from 'react';
import './Dashboard.css';
import {connect} from 'react-redux'
import {clearSignUpToken} from "../../store/actions/auth";


class Dashboard extends Component {
    componentWillMount(){
            this.props.onLoad()
    }
    render() {
        return( <div className="Dashboard">
            <h1>Welcome {this.props.user.email} to your Home page</h1>
        </div>)
    }
}

const mapStateToProps = state=> {
    return{
        user: state.user,
        isAuthenticated: state.token !== null
    }
};

const mapDispatchToProps = dispatch=> {
    return{
        onLoad: ()=> dispatch(clearSignUpToken())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)