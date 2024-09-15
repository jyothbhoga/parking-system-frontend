import { atom } from "jotai";

export const toastStateAtom = atom({
  key: "", // unique ID
  show: false,
  message: "",
});
