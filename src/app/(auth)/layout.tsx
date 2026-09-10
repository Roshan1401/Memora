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
      <Image src={Cat} alt="Cat" className="absolute w-85 z-999 h-45 top-42" />
      <div className="relative z-10 w-full max-w-md px-4 py-10">{children}</div>
    </div>
  );
}
