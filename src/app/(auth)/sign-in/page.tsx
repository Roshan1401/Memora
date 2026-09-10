import type { Metadata } from "next";
import AuthForm from "../../../components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Login | MEMORA",
  description: "Log in to MEMORA.",
};

export default function LoginPage() {
  return <AuthForm />;
}