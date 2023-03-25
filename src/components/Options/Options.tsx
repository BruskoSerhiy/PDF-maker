import React from 'react';
import { useRecoilState } from 'recoil';

import { Input, Button, Form } from 'antd';
import { emailState, nameState } from '../../atoms/nameAtom';

import css from './Options.module.css';

function Options() {
  const [text, setText] = useRecoilState(nameState);
  const [email, setEmail] = useRecoilState(emailState);

  const handleSaveBtnClick = () => {
    const opt = {
      margin: 0,
      filename: `${text}.pdf`,
      image: { type: 'png' },
    };
    const element = document.getElementById('page');
    console.log(element);
    window
      .html2pdf()
      .set(opt)
      .from(element)
      .save();
  };

  return (
    <div className={css.root}>
      <Form.Item name="name" label="Ваше ім'я">
        <Input value={text} onChange={event => setText(event.currentTarget.value)} />
      </Form.Item>
      <Form.Item name="email" label="Ваше email">
        <Input value={email} onChange={event => setEmail(event.currentTarget.value)} />
      </Form.Item>

      <Button onClick={handleSaveBtnClick} type="primary" htmlType="button">
        Save PDF
      </Button>
    </div>
  );
}

export default Options;
