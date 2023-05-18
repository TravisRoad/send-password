import { generateKey } from "@/utils/crypto";
import type { dataKV } from "@/utils/type";
import { NextRequest, NextResponse } from "next/server";

// let kvStore: { [key: string]: string } = {};
let kvStore: { [key: string]: string } = {};

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

  if (token !== null && token?.length !== 0 && kvStore[token]) {
    const key = kvStore[token];
    delete kvStore[token];
    return NextResponse.json({ key: key });
  }
  return new NextResponse(null, { status: 400 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  console.log(token);
  console.log(kvStore);

  if (token !== null && token?.length !== 0 && kvStore[token]) {
    delete kvStore[token];
    return new NextResponse(null, { status: 200 });
  }
  return new NextResponse(null, { status: 400 });
}
