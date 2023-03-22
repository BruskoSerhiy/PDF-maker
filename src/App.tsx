import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  RecoilRoot
} from 'recoil';

import RootRouter from './router/RootRouter';


function App () {
  return (
    <RecoilRoot>
      <BrowserRouter>
      <RootRouter/>
    </BrowserRouter>
    </RecoilRoot>
    
  );
};

export default App