import { decrypt } from "@/utils/crypto";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface InputProp {
  token: string | null;
  hash: string | null;
}

export default function ContentBox({ token, hash }: InputProp) {
  const [message, setMessage] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  async function decryptButtonClick() {
    try {
      const res = await fetch(`/api/send?token=${token}`);
      if (!res.ok) {
        throw new Error("message not exist or has been burnt");
      }

      const body: { key: string } = await res.json();
      if (!body.key) {
        // show error
        return;
      }

      const text = decrypt(hash as string, body.key);
      if (text.length === 0) {
        // show error
        return;
      }

      setMessage(text);
      setShowAnswer(true);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  async function copyButtonClick() {
    navigator.clipboard.writeText(message as string).then(() => {
      toast.success("success copied to clipboard");
    });
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center max-w-4xl ">
        {showAnswer ? (
          message !== null && (
            <div className="py-2 border-2 rounded-lg px-4 mt-4 mb-4 sm:w-[35vw] md:w-[50vw] w-[85vw] h-full">
              <div className="p-1 font-bold text-lg">info</div>
              <textarea
                className="w-full bg-nord-6 px-4 py-2 rounded-lg sm:h-[15rem] h-[15rem]"
                value={message}
                readOnly
              ></textarea>
              <button onClick={copyButtonClick}>copy</button>
            </div>
          )
        ) : (
          <button
            className="border-2 px-2 py-1 rounded-lg items-center bg-nord-5 hover:border-nord-10 hover:bg-nord-5/50 transition tracking-wide"
            onClick={decryptButtonClick}
          >
            解密
          </button>
        )}
      </div>
    </>
  );
}
