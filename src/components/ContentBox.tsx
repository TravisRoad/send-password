import { decrypt } from "@/utils/crypto";
import React, { useState } from "react";

interface InputProp {
  token: string | null;
  hash: string | null;
}

export default function ContentBox({ token, hash }: InputProp) {
  const [message, setMessage] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  async function buttonClick() {
    const res = await fetch(`/api/send?token=${token}`);

    if (!res.ok) {
      // show error
      return;
    }

    const body: { key: string } = await res.json();
    if (!body.key) {
      // show error
      return;
    }

    console.log(token, hash, body.key);

    const text = decrypt(hash as string, body.key);
    console.log(text);

    setMessage(text);
    setShowAnswer(true);
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl ">
      {showAnswer ? (
        message !== null && (
          <div className="py-2 border-2 rounded-lg px-4 mt-4 mb-4 sm:w-[35vw] md:w-[50vw] w-[85vw] h-full">
            <div className="p-1 font-bold text-lg">info</div>
            <textarea
              className="w-full bg-nord-6 px-4 py-2 rounded-lg sm:h-[15rem] h-[15rem]"
              value={message}
            ></textarea>
          </div>
        )
      ) : (
        <button
          className="border-2 px-2 py-1 rounded-lg items-center bg-nord-5 hover:border-nord-10 hover:bg-nord-5/50 transition tracking-wide"
          onClick={buttonClick}
        >
          decrypt
        </button>
      )}
    </div>
  );
}
