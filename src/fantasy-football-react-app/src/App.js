import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import FantasyManager from './containers/FantasyManager';

class App extends Component {
  render() {
    return (

        <Layout>
          <FantasyManager/>
        </Layout>
    );
  }


}



export default App;
