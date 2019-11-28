import React, { Component } from 'react';
import Aux from '../ReactAux';
import classes from './Layout.module.css';

class Layout extends Component {

    render() {
        return (
            <Aux>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
