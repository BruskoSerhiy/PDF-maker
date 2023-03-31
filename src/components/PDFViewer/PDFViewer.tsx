import React from "react";

import { useRecoilState } from "recoil";

import {
  emailState,
  nameState,
  numberState,
  messageState,
  birthdayState,
  professionState,
  skillState,
  experienceState,
  educationState,
  additionalState,
} from "../../atoms/nameAtom";

import css from "./PDFViewer.module.css";

function PDFViewer() {
  const [text] = useRecoilState(nameState);
  const [email] = useRecoilState(emailState);
  const [number] = useRecoilState(numberState);
  const [message] = useRecoilState(messageState);
  const [birthday] = useRecoilState(birthdayState);
  const [profession] = useRecoilState(professionState);
  const [skills] = useRecoilState(skillState);
  const [experience] = useRecoilState(experienceState);
  const [education] = useRecoilState(educationState);
  const [additional] = useRecoilState(additionalState);

  return (
    <div className={css.root}>
      <div className={css.page} id="page">
        <div className={css.hLine} />
        <div className={css.headerBlock}>
          <div className={css.mainInformation}>
            <h3 className={css.name}>{text}</h3>
            <div className={css.personalInfo}>
              <div className={css.email}>{email}</div>
              <div className={css.phone}>{number}</div>
              <div className={css.birthday}>{birthday}</div>
            </div>
          </div>
          <div className={css.foto}></div>
        </div>
        <div className={css.hLine} />
        <div className={css.profession}>{profession}</div>
        <div className={css.hTwoLine}>
          <div className={css.blockOne}>
            <p className={css.about}>Про себе</p>
            <div className={css.message}>{message}</div>
          </div>
          <div className={css.hTwoLine} />
          <div className={css.blockOne}>
            <p className={css.about}>Мої навички</p>
            <div className={css.message}>{skills}</div>
          </div>
          <div className={css.hTwoLine} />
          <div className={css.blockOne}>
            <p className={css.about}>Досвід</p>
            <div className={css.message}>{experience}</div>
          </div>
          <div className={css.hTwoLine} />
          <div className={css.blockOne}>
            <p className={css.about}>Освіта</p>
            <div className={css.message}>{education}</div>
          </div>
          <div className={css.hTwoLine} />
          <div className={css.blockOne}>
            <p className={css.about}>Додаткова інформація</p>
            <div className={css.message}>{additional}</div>
          </div>
          <div className={css.hTwoLine} />
        </div>
      </div>
    </div>
  );
}

export default PDFViewer;
