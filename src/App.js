import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import withRouterParams from './components/withRouterParams';

const HomeWithRouterParams = withRouterParams(Home);

class App extends Component {  
  render() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/:category" element={<HomeWithRouterParams />} />
            <Route path="/*" element={<HomeWithRouterParams />} />
          </Routes>
        </BrowserRouter>
    );
  }
}

export default App;