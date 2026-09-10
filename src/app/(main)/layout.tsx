import Navbar from "../../components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="p-4 flex flex-col gap-3 min-h-screen">
        <Navbar />
        {children}
      </div>
    </>
  );
}
