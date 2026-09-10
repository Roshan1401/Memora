import type { Metadata } from "next";
import ProfilePage from "../../../components/profile/ProfilePage";

export const metadata: Metadata = {
  title: "Profile | MEMORA",
  description: "Your MEMORA profile.",
};

export default function ProfileRoute() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <ProfilePage />
    </div>
  );
}
