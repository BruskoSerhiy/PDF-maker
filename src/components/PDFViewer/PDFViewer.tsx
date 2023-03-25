import React from "react";

import { useRecoilState } from "recoil";

import { emailState, nameState } from "../../atoms/nameAtom";

import css from "./PDFViewer.module.css";

function PDFViewer() {
  const [text] = useRecoilState(nameState);
  const [email] = useRecoilState(emailState);

  return (
    <div className={css.root}>
      <div className={css.page} id="page">
        <div className={css.hLine} />
        <h3 className={css.name}>{text}</h3>
        <div className={css.personalInfo}>
          <div>{email}</div>
        </div>
        <div className={css.hLine} />
      </div>
    </div>
  );
}

export default PDFViewer;
