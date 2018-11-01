import React, { Component } from 'react';
import Auth from './containers/Auth/Auth'
import SignIn from './containers/SignIn/SignIn'

import Dashboard from './containers/Dashboard/Dashboard'
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import * as Action from './store/actions/auth'
import './App.css';
import Layout from './hoc/Layout'
import Logout from './containers/Logout/Logout'

class App extends Component {
componentWillMount(){
this.props.verifyLoginOnLoad()
}

  render() {
      const routes = (
          <Switch>
              <Route path="/logout" component={Logout}/>
              {!this.props.isAuthenticated? <Route exact path="/auth" component={Auth}/>: null}
             <Route exact path="/signin" component={SignIn}/>
              <Route path="/" exact component={Dashboard}/>

          </Switch>


      );
    return (
      <div className="App">
        <Layout>

            {routes}

        </Layout>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch=> {
    return {
        verifyLoginOnLoad: ()=> dispatch(Action.verifyLogin())
    }
};

const mapStateToProps = state=> {
    return{
        loading: state.loading,
        isAuthenticated: state.token !== null
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
