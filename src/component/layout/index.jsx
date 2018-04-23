import React from 'react';
import './theme.css';

class Layout extends React.Component{
    constructor(props){
        super(props)
    }
    render (){
        return (
            <div id="wrapper">
            sdfafasdfa
            {/* <Topnav/>
            <Sidenav/> */}
            {
                this.props.children
            }
            </div>
        )
    }
}

export default Layout;