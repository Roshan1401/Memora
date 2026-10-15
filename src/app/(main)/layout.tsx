import Navbar from "../../components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-3 p-2.5 sm:gap-4 sm:p-4 md:p-6">
      <Navbar />
      <main className="flex min-w-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
