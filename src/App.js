import React, { Component } from 'react';
import RouterList from './page/router/RouterList';
import './index.scss';
import '../src/asets/css/index.scss'

class App extends Component {
  render() {
    return (
      <div className="App">      
        <div className="app-con">
            {this.props.children}
        </div>
        <RouterList/>
    </div>
    );
  }
}

export default App;
