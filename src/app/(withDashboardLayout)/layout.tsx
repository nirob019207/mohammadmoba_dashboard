import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Navbar/Topbar";

export default function RootLayout({ children }: {  children: React.ReactNode }) {
  return (
    <main className="flex h-screen">
      <Navbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </main>
  );
}
