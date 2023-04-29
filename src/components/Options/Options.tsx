import React from "react";
import { useRecoilState } from "recoil";

import { Input, Button, Form, Select, DatePicker } from "antd";
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

import css from "./Options.module.css";
import AvatarUploader from "../LoadingPhoto";
import { url } from "inspector";

function Options() {
  const [text, setText] = useRecoilState(nameState);
  const [email, setEmail] = useRecoilState(emailState);
  const [number, setNumber] = useRecoilState(numberState);
  const [message, setMessage] = useRecoilState(messageState);
  const [, setBirthday] = useRecoilState(birthdayState);
  const [profession, setProfession] = useRecoilState(professionState);
  const [, setSkills] = useRecoilState(skillState);
  const [experience, setExperience] = useRecoilState(experienceState);
  const [education, setEducation] = useRecoilState(educationState);
  const [additional, setAdditional] = useRecoilState(additionalState);
    const [, setSelectedImage] = useRecoilState(selectedImageState);
  



  const handleSaveBtnClick = () => {
    const opt = {
      margin: 0,
      filename: `${text}.pdf`,
      image: { type: "png" },
    };
    const element = document.getElementById("page");
    console.log(element);
    window.html2pdf().set(opt).from(element).save();
  };

  return (
    <div className={css.root}>
      <Form.Item name="name" label="Ваше ім'я">
        <Input
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          placeholder="Введіть ваше ім'я"
        />
      </Form.Item>
      <Form.Item name="email" label="Ваш email">
        <Input
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          placeholder="Введіть ваш email"
        />
      </Form.Item>
      <Form.Item name="phone" label="Номер телефону">
        <Input
          value={number}
          onChange={(event) => setNumber(event.currentTarget.value)}
          placeholder="Введіть номер телефону"
        />
      </Form.Item>
      <Form.Item name="birthday" label="Дата народження">
        <DatePicker
          onChange={(date) => {
            setBirthday(new Date(date as any));
          }}
        />
      </Form.Item>
      <Form.Item name="profession" label="Ваша професія">
        <Input
          value={profession}
          onChange={(event) => setProfession(event.currentTarget.value)}
          placeholder="Введіть вашу професію"
        />
      </Form.Item>
      <Form.Item name="message" label="Розкажіть про вас">
        <Input.TextArea
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          maxLength={500}
          placeholder="Розкажіть детальніше про себе"
        />
      </Form.Item>
      <Form.Item name="skills" label="Ваші професійні навички">
        <Select
          mode="tags"
          style={{ width: "100%" }}
          onChange={(values) => {
            setSkills(values);
          }}
          tokenSeparators={[","]}
          options={[]}
        />
      </Form.Item>
      <Form.Item name="experience" label="Ваш досвід">
        <Input.TextArea
          value={experience}
          onChange={(event) => setExperience(event.currentTarget.value)}
          maxLength={500}
          placeholder="Розкажіть детальніше про свій досвід"
        />
      </Form.Item>
      <Form.Item name="education" label="Ваша освіта">
        <Input.TextArea
          value={education}
          onChange={(event) => setEducation(event.currentTarget.value)}
          maxLength={500}
          placeholder="Ваша освіта"
        />
      </Form.Item>
      <Form.Item name="additional" label="Додаткова інформація">
        <Input.TextArea
          value={additional}
          onChange={(event) => setAdditional(event.currentTarget.value)}
          maxLength={500}
          placeholder="Ваші хоббі, мови якими володієте, тощо..."
        />
      </Form.Item>
      <div className={css.imageBlock}>
        <AvatarUploader
          onSelected={function (url) {
            setSelectedImage(url);
          }}
        />
      </div>
      <Button onClick={handleSaveBtnClick} type="primary" htmlType="button">
        Save PDF
      </Button>
    </div>
  );
}

export default Options;
