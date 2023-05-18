import "./globals.css";

export const metadata = {
  title: "send",
  description: "trustless pastebin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <script
        async
        defer
        data-website-id="40370044-ae13-43fb-bde2-bf8071cecf5d"
        src="https://umami.lxythan2lxy.cn/index.js"
      ></script>
      <body className="">{children}</body>
    </html>
  );
}
