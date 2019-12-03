import React, { Component } from 'react';
import Aux from '../ReactAux';
import classes from './Layout.module.css';

class Layout extends Component {

    render() {
        return (
            <Aux>
                <div className={classes.Content}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Layout;
