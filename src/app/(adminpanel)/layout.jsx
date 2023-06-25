import Sidebar from "@/components/sidebar/Sidebar";

export const metadata = {
  title: "Inventory | Admin Panel",
  description: "MASIH DI PIKIRIN",
};

export default function AdminPanelLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
