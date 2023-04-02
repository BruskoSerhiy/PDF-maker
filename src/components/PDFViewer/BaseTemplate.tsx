import React from "react";

import cn from "classnames";

import css from "./PDFViewer.module.css";

export interface BaseTemplateProps {
  className?: string;
  name: string;
  email: string;
  phone: string;
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ name, className, phone, email }) => {
  return (
    <div className={cn(css.root, className)}>
      <div>Імя: {name}</div>
      <div>Email: {email}</div>
      <div>Тклкфон: {phone}</div>
    </div>
  );
};

export default BaseTemplate;
