import React from "react";

import cn from "classnames";

import css from "./BlackAndWhite.module.css"


export interface BaseTemplateProps {
  className?: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  message: string;
  experience: string;
  image: string;
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({
  name,
  className,
  phone,
  email,
  profession,
  message,
  experience,
  image,
}) => {
  return (
    <div className={cn(css.root, className)}>
      <div className={css.secondTamplate}>
        <aside className={css.aside}>
          <div className={css.photoSecondTamplate}>
            <img className={css.avatarPosition} src={image} alt={`${name} avatar`} />
          </div>
          <div className={css.paddingLeft}>
            <div className={css.contacts}>
              <div className={css.whiteLine}>
                Контакти
              </div>
              <div className={css.customEmail}>{email}</div>
              <div className={css.customPhone}>{phone}</div>
            </div>
          </div>
        </aside>
        <main className={css.main}>
          <div className={css.mainStage}>
            <div className={css.nameCustom}>{name.toUpperCase()}</div>
            <div className={css.professionCustom}>{profession}</div>
            <div className={css.messageCustom}>{message}</div>
          </div>
          <div className={css.otherInfo}>
            <div className={css.experience}>Досвід</div>
            <div className={css.experienceCustom}>{experience}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BaseTemplate;
