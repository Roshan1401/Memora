"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { ProfileData } from "../../store/profileStore";

const MAX_NAME_LENGTH = 50;
const MAX_USERNAME_LENGTH = 30;
const MAX_BIO_LENGTH = 200;

interface EditProfileModalProps {
  profile: ProfileData;
  onClose: () => void;
  onSave: (patch: Partial<ProfileData>) => void;
}

export default function EditProfileModal({
  profile,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [name, setName] = useState(profile.name);
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const save = () => {
    onSave({
      name: name.trim() || "Your Name",
      username: username.trim().replace(/^@/, "") || "your_username",
      bio: bio.trim(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col gap-4 overflow-y-auto border-2 border-black bg-[#e6e3d9] p-6 shadow-[8px_8px_0_0_#000]">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-black uppercase text-black">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid cursor-pointer h-10 w-10 place-items-center border-2 border-black bg-white text-black shadow-[2px_2px_0_0_#000] transition-transform hover:-translate-y-0.5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="profile-name"
              className="text-sm font-black uppercase text-black"
            >
              Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value.slice(0, MAX_NAME_LENGTH))
              }
              placeholder="Your name"
              className="w-full border-2 border-black bg-white px-3 py-2 text-sm font-bold text-black outline-none placeholder:text-[#4d4b46] focus:bg-yellow-50"
            />
            <span className="self-end text-xs font-bold text-[#4d4b46]">
              {name.length}/{MAX_NAME_LENGTH}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="profile-username"
              className="text-sm font-black uppercase text-black"
            >
              Username
            </label>
            <div className="flex items-center border-2 border-black bg-white focus-within:bg-yellow-50">
              <span className="pl-3 text-sm font-black text-[#4d4b46]">@</span>
              <input
                id="profile-username"
                type="text"
                value={username.replace(/^@/, "")}
                onChange={(e) =>
                  setUsername(e.target.value.slice(0, MAX_USERNAME_LENGTH))
                }
                placeholder="username"
                className="w-full bg-transparent px-2 py-2 text-sm font-bold text-black outline-none placeholder:text-[#4d4b46]"
              />
            </div>
            <span className="self-end text-xs font-bold text-[#4d4b46]">
              {username.length}/{MAX_USERNAME_LENGTH}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="profile-bio"
              className="text-sm font-black uppercase text-black"
            >
              Bio
            </label>
            <textarea
              id="profile-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, MAX_BIO_LENGTH))}
              placeholder="Tell your story..."
              rows={4}
              className="w-full resize-none border-2 border-black bg-white px-3 py-2 text-sm font-bold text-black outline-none placeholder:text-[#4d4b46] focus:bg-yellow-50"
            />
            <span className="self-end text-xs font-bold text-[#4d4b46]">
              {bio.length}/{MAX_BIO_LENGTH}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-end gap-3 border-t-2 border-dashed border-black pt-4">
          <button
            onClick={onClose}
            className="border-2 cursor-pointer border-black bg-white px-6 py-2 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="border-2 cursor-pointer border-black bg-yellow-300 px-6 py-2 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
