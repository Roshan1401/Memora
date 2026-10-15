import Image from "next/image";
import LoginBg from "../../assets/LoginBg.png";
import Cat from "../../assets/cat4.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-full w-full flex-1 items-center justify-center overflow-hidden">
      <Image
        src={LoginBg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-4 py-6 sm:py-10">
        <div className="relative -mb-5 z-20 w-40 sm:w-52 pointer-events-none select-none">
          <Image
            src={Cat}
            alt="Memora cat"
            priority
            className="h-auto w-full object-contain"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
