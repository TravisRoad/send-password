"use client";

import ContentBox from "@/components/ContentBox";
import InfoSendArea from "@/components/InfoSendArea";
import Readme from "@/components/Readme";
import { decrypt } from "@/utils/crypto";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // token !== null 表示应该提供输入界面
  // token 有值时提供解密
  const token: string | null = useSearchParams().get("token");
  const [loading, setLoading] = useState(true);
  let hashRef = useRef<string | null>(null);

  useEffect(() => {
    var hash: string | null = window ? window.location.hash.substring(1) : null;
    if (hash?.length === 0) hash = null;
    hashRef.current = hash;
    setInterval(() => {
      setLoading(false);
    }, 200);
  }, []);

  return (
    <main className="flex flex-col items-center mt-20 w-full">
      <h1 className="text-3xl font-bold mb-2">阅后即焚🔥</h1>
      {loading ? (
        <p>Loading...</p>
      ) : token !== null && hashRef.current !== null ? (
        <ContentBox token={token} hash={hashRef.current} />
      ) : (
        <InfoSendArea />
      )}
      <Readme />
    </main>
  );
}
