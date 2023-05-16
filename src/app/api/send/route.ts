import { generateKey } from "@/utils/crypto";
import type { dataKV } from "@/utils/type";
import { NextRequest, NextResponse } from "next/server";

// let kvStore: { [key: string]: string } = {};
let kvStore: { [key: string]: string } = {
  "1684243178654":
    "51fbf74d5e1c76f615538a5f19b8fa78e32909a208f07f0e010689ee0aa22f4d",
};

export async function POST() {
  const token: string = Date.now().toString();
  const secretKey: string = generateKey();
  const data: dataKV = { token: token, value: secretKey };
  kvStore[token] = secretKey;
  setTimeout(() => {
    delete kvStore[token];
  }, 10 * 60 * 1000); // delete after 10 min

  console.debug(kvStore);
  return NextResponse.json(data);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  console.log("token:", token);

  if (token !== null && token?.length !== 0 && kvStore[token]) {
    return NextResponse.json({ key: kvStore[token] });
  }
  return new NextResponse(null, {
    status: 400,
  });
}
