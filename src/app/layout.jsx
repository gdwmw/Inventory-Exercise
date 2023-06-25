import "@/styles/tailwind.css";
import "@/styles/style.css";

export const metadata = {
  title: "Inventory | Login",
  description: "MASIH DI PIKIRIN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=0" />
        {/* <link rel="icon" type="image/x-icon" href="/favicon.ico" /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
