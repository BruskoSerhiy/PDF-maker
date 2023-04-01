import { atom } from "recoil";

export const nameState = atom({
  key: "nameState",
  default: "",
});

export const emailState = atom({
  key: "emailState",
  default: "",
});

export const numberState = atom({
  key: "numberState",
  default: "",
});

export const messageState = atom({
  key: "messageState",
  default: "",
});

export const birthdayState = atom<Date | null>({
  key: "birthdayState",
  default: null,
});

export const professionState = atom({
  key: "professionState",
  default: "",
});

export const skillState = atom<string[]>({
  key: "skillState",
  default: [],
});

export const experienceState = atom({
  key: "experienceState",
  default: "",
});

export const educationState = atom({
  key: "educationState",
  default: "",
});

export const additionalState = atom({
  key: "additionalState",
  default: "",
});
