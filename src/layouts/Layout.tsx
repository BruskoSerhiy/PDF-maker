import React from 'react';
import { Outlet } from 'react-router-dom';

import css from './Layout.module.css';

function Layout() {
    return ( 
      <div className={css.root}>
        <header className={css.header}>
            <h1>PDF Maker</h1>
        </header>
        <Outlet />
      </div>
    );
  }

  export default Layout;