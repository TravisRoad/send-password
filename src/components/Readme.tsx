import React from "react";

export default function Readme() {
  return (
    <div className="w-full sm:max-w-lg max-w-xs bg-slate-100 rounded-lg mt-2 ">
      <details>
        <summary className="text-md font-bold p-2">README</summary>
        <ol className="list-decimal list-outside pl-6 pb-2">
          <li>消息阅后即焚</li>
          <li>服务器不保存密文本身，只保存解密的钥匙</li>
          <li>10 分钟后删除钥匙，服务器不会持久化任何信息</li>
        </ol>
      </details>
    </div>
  );
}
