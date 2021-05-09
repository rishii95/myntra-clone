import React from 'react';

import { Provider } from 'react-redux';
import Store from './Redux/store';

import Main from './Pages/Main';
import 'antd/dist/antd.css';
import './App.module.scss';

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
