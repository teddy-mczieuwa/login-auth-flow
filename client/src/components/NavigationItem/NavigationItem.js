import React from 'react';
import {NavLink} from 'react-router-dom'
import './NavigationItem.css'
const NavigationItem = props=> {
    let type;
    switch(props.type){
        case 'Nav':
            type = <NavLink to = {props.link} exact={props.exact} activeClassName="Active">{props.children}</NavLink>;
            break;
        case 'Avatar':
            type = <React.Fragment>
                <h3 style={{display:'inline-flex', color: 'white', font: 'inherit', marginRight: "40px", textAlign:'center', padding: '20px auto'}}>Logged in as {props.user}</h3>
                <img src={props.url} className="Avatar" alt="Please work"/>
                </React.Fragment>

            break;
        default:
            type= null;
    }
    return(
        <div className="NavigationItem DesktopOnly">
            {type}
        </div>
    )
}

export default NavigationItem