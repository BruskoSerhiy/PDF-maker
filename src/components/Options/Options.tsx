import React from "react";
import { useRecoilState } from "recoil";

import { Input, Button } from "antd";
import { nameState } from "../../atoms/nameAtom";

import css from "./Options.module.css";

function Options() {
  const [text, setText] = useRecoilState(nameState);

  const handleSaveBtnClick = () => {
    const opt = {
      margin: 0,
      filename: `${text}.pdf`,
      image: { type: "png" }
    };
    const element = document.getElementById("page");
    console.log(element);
    window
      .html2pdf()
      .set(opt)
      .from(element)
      .save();
  };

  return (
    <div className={css.root}>
      <Input
        value={text}
        onChange={event => setText(event.currentTarget.value)}
      />
      <Button onClick={handleSaveBtnClick} type="primary" htmlType="button">
        Save PDF
      </Button>
    </div>
  );
}

export default Options;
