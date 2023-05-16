"use client";

import { encrypt } from "@/utils/crypto";
import React, { useState } from "react";
import type { dataKV } from "@/utils/type";

export default function InfoSendArea() {
  const [content, setContent] = useState<string>("");
  const [hasSend, setHasSend] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const sendHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await fetch("/api/send", { method: "POST" });
    if (!res.ok) {
      // todo: show error
      return;
    }
    setHasSend(true);
    const data: dataKV = await res.json();
    const encryptedContent: string = encrypt(content, data.value);
    const currentUrl: string = window.location.href;
    setUrl(`${currentUrl}?token=${data.token}#${encryptedContent}`);
  };

  return (
    <>
      {!hasSend && (
        <fieldset>
          <div>
            <textarea
              autoFocus={true}
              itemType="password"
              onChange={changeHandler}
              className="border bg-slate-200 rounded-sm p-2 w-full text-sm min-h-[20vh]"
              placeholder="type"
            />
            <button onClick={sendHandler}>Send</button>
          </div>
        </fieldset>
      )}
      {hasSend && <div>{url}</div>}
    </>
  );
}
