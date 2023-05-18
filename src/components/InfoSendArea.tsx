"use client";

import { encrypt } from "@/utils/crypto";
import React, { useState } from "react";
import type { dataKV } from "@/utils/type";
import toast, { Toaster } from "react-hot-toast";

export default function InfoSendArea() {
  const [content, setContent] = useState<string>("");
  const [hasSend, setHasSend] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const copyHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("success copied to clipboard");
    });
  };

  const sendHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (content.length === 0) throw new Error("content is empty");
      const res = await fetch("/api/send", { method: "POST" });
      setHasSend(true);
      const data: dataKV = await res.json();
      const encryptedContent: string = encrypt(content, data.value);
      const newUrl = `${window.location.host}${window.location.pathname}?token=${data.token}#${encryptedContent}`;
      setUrl(newUrl);
      navigator.clipboard.writeText(newUrl).then(() => {
        toast.success("success copied to clipboard");
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      {!hasSend && (
        <fieldset className="flex flex-col w-full sm:max-w-lg max-w-xs rounded-lg border pt-4 px-4 pb-2">
          <h1 className="font-sans text-xl font-bold"> 消息 </h1>
          <textarea
            autoFocus={true}
            itemType="password"
            onChange={changeHandler}
            className="border bg-slate-200 rounded-md p-2 text-sm sm:min-h-[40vh] min-h-[50vh]"
            placeholder="我能吞下玻璃而不伤身体"
          />
          <div className="items-start mt-2 ">
            <button
              onClick={sendHandler}
              className="rounded-lg border-2 bg-nord-10/50 hover:bg-nord-10/20 transition-colors border-nord-10 py-1 px-2 "
            >
              分享
            </button>
          </div>
        </fieldset>
      )}
      {hasSend && (
        <div className="flex flex-col border-2 rounded-lg p-2 border-nord-9/50 w-full sm:max-w-2xl max-w-xs">
          <h1 className="pl-2 font-bold font-sans text-xl">分享这个链接</h1>
          <div className="relative group border-2 border-nord-9 bg-nord-5 rounded-lg p-2 ring-0">
            <input
              readOnly
              value={url}
              className=" text-nord-0 w-full bg-transparent "
            />
          </div>
          <div className="mt-4">
            <button
              className="border-2 border-nord-10 py-1 px-2 rounded-lg bg-nord-10/50 hover:bg-nord-10/20 transition-colors duration-100"
              onClick={copyHandler}
            >
              拷贝到剪贴板
            </button>
          </div>
        </div>
      )}
    </>
  );
}
