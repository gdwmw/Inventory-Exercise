import "@/styles/tailwind.css";
import "@/styles/style.css";

export const metadata = {
  title: "Inventory | Login",
  description: "MASIH DI PIKIRIN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
