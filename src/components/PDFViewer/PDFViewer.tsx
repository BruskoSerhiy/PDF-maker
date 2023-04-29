import React, { useState } from "react";

import { useRecoilState } from "recoil";

import { Tag, QRCode, Select, Button } from "antd";

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
  selectedImageState,
} from "../../atoms/nameAtom";

import css from "./PDFViewer.module.css";

import BaseTemplate from "../BlackAndWhite";
import { makePDF } from "../../utils/pdf/api";


const monthList = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];

type TemplateType = "base" | "custom";

const options = [
  {
    value: "base",
    label: "Базовий",
  },
  {
    value: "custom",
    label: "Кастомний",
  },
];

function PDFViewer() {
  const [template, setTemplate] = useState<TemplateType>("base");

  const [name] = useRecoilState(nameState);
  const [email] = useRecoilState(emailState);
  const [number] = useRecoilState(numberState);
  const [message] = useRecoilState(messageState);
  const [birthday] = useRecoilState(birthdayState);
  const [profession] = useRecoilState(professionState);
  const [skills] = useRecoilState(skillState);
  const [experience] = useRecoilState(experienceState);
  const [education] = useRecoilState(educationState);
  const [additional] = useRecoilState(additionalState);
  const [image] = useRecoilState(selectedImageState);

  const handlePdfBtnClick = () => {
    const pdf = makePDF({
      content: [
        { qr: "text in QR", foreground: "red", background: "yellow", fit: 100 },
        {
          table: {
            widths: ["50%", "50%"],
            body: [
              [
                { text: `Імя : ${name}`, style: "text" },
                { text: `email : ${email}`, style: "text" },
              ],
              [{ text: `Тел : ${number}`, style: "text" }, { text: "" }],
            ],
          },
          layout: "noBorders",
        },
      ],
      styles: {
        text: {
          fontSize: 14,
          color: "#333",
        },
      },
    });
    pdf.open();
  };

  return (
    <div className={css.root}>
      <Select
        options={options}
        value={template}
        onChange={(value) => {
          setTemplate(value);
        }}
      />
      <Button onClick={handlePdfBtnClick}>Згенерувати ПДФ</Button>
      {template === "custom" && (
        <BaseTemplate
          name={name}
          email={email}
          phone={number}
          profession={profession}
          message={message}
          experience={experience}
          image={image}
        />
      )}
      {template === "base" && (
        <div className={css.page} id="page">
          <div className={css.hLine} />
          <div className={css.headerBlock}>
            <div className={css.mainInformation}>
              <h3 className={css.name}>{name.toUpperCase()}</h3>
              <div className={css.personalInfo}>
                <div className={css.email}>{email}</div>
                <div className={css.phone}>{number}</div>
                {birthday ? (
                  <div className={css.birthday}>
                    {String(birthday.getDate()).padStart(2, "0")} {monthList[birthday.getMonth()]}{" "}
                    {birthday.getFullYear()} року
                  </div>
                ) : null}
              </div>
            </div>
            <div className={css.photo}>
              <img className={css.avatarPosition} src={image} alt={`${name} avatar`} />
            </div>
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
              <div className={css.message}>
                {skills.map((item) => {
                  return (
                    <Tag key={item} color="success">
                      {item}
                    </Tag>
                  );
                })}
              </div>
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
            <QRCode value="https://google.com" />
          </div>
        </div>
      )}
    </div>
  );
}

export default PDFViewer;
