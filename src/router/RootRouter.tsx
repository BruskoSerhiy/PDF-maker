import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../layouts/Layout';

import Home from '../pages/Home';
import NoMatch from '../pages/NoMatch';


function App () {

  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
  );
};



export default App