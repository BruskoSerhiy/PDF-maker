import React from 'react';

import {useRecoilState } from 'recoil';

import { nameState } from '../../atoms/nameAtom';

import css from './PDFViewer.module.css';

function PDFViewer() {
    const [text] = useRecoilState(nameState);
    

    return (
      <div className={css.root}>
        <div className={css.page} id="page">
            <div className={css.header}/>
            <h3>{text}</h3>
        </div>
      </div>
    );
  }

export default PDFViewer;