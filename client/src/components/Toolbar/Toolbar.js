import React,{Component} from 'react';
import NavigationItems from '../NavigationItems/NavigationItems'
import './Toolbar.css'
class Toolbar extends Component{
    render(){
        return(
            <div className="Toolbar">
                <h2>The Cool Website</h2>
                <NavigationItems/>
            </div>
        )
    }
}

export default Toolbar