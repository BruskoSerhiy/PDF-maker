import React, { useState } from "react";

import { useRecoilState } from "recoil";

import { Tag, QRCode, Upload, message as antMessage, Select, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";

import BaseTemplate from "./BaseTemplate";
import { makePDF } from "../../utils/pdf/api";

const monthList = ["січ", "лт", "бер"];

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
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

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

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      antMessage.error("Можна завантажувати тільки  JPG/PNG файли!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      antMessage.error("Максимальний розмір файлу 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handlePdfBtnClick = () => {
    const pdf = makePDF({
      content: [
        { qr: "text in QR", foreground: "red", background: "yellow", fit: 100 },
        {
          table: {
            widths: ["50%", "50%"],
            body: [
              [
                { text: `Імя : ${text}`, style: "text" },
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
          console.log(value);
          setTemplate(value);
        }}
      />
      <Button onClick={handlePdfBtnClick}>Згенерувати ПДФ</Button>
      {template === "custom" && <BaseTemplate name={text} email={email} phone={number} />}
      {template === "base" && (
        <div className={css.page} id="page">
          <div className={css.hLine} />
          <div className={css.headerBlock}>
            <div className={css.mainInformation}>
              <h3 className={css.name}>{text.toUpperCase()}</h3>
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
              {imageUrl ? (
                <>
                  <span
                    onClick={() => {
                      setImageUrl("");
                    }}
                    className={css.clearPhotoBtn}
                  >
                    X
                  </span>
                  <img src={imageUrl} alt={text} className={css.img} />
                </>
              ) : (
                <Upload
                  name="avatar"
                  customRequest={({ onSuccess }) => {
                    setTimeout(() => {
                      onSuccess?.("ok");
                    }, 500);
                  }}
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {loading ? <LoadingOutlined /> : null}
                  <span>Завантажити</span>
                </Upload>
              )}
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
