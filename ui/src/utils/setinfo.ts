import { useState } from "react";

export function useInfo(time: number = 1000) {
  const [{ success, error }, setInfo] = useState({ success: "", error: "" });

  function setSuccess(msg: string) {
    setInfo((info) => ({ ...info, success: msg }));
    setTimeout(() => setInfo((info) => ({ ...info, success: "" })), time);
  }
  function setError(msg: string) {
    setInfo((info) => ({ ...info, error: msg }));
    setTimeout(() => setInfo((info) => ({ ...info, error: "" })), time);
  }

  return { success, error, setSuccess, setError };
}
