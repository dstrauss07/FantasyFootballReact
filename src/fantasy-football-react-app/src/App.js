import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import FantasyManager from './containers/FantasyManager';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <FantasyManager />
        </Layout>
      </div>
    );
  }


}



export default App;
