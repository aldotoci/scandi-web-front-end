
import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';

class App extends Component {  
  
  render() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />}>
              {/* <Route index element={<Home />} />
              <Route path="*" element={<Home />} /> */}
              {/* <Route path="blogs" element={<Blogs />} />
              <Route path="contact" element={<Contact />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
    );
  }
}


export default App;
