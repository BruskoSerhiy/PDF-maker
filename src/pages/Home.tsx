import React from 'react';

import PDFViewer from '../components/PDFViewer/PDFViewer';
import Options from '../components/Options/Options';

import css from './Home.module.css';

function Home() {
    return (
      <div className={css.root}>
        <main className={css.main}>
            <PDFViewer/>
        </main>
        <aside className={css.sidebar}>
            <Options/>
            
        </aside>
      </div>
    );
  }

export default Home;