"use client";

import { useEffect, useState } from "react";
import { Clock, X } from "lucide-react";
import type { Moment } from "../../store/dayStore";
import { getEmojiForText } from "../calendar/activityIcons";

const MAX_TITLE_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 500;

const EMOJI_OPTIONS = [
  "✨",
  "💼",
  "💻",
  "📚",
  "🏋️",
  "🏃",
  "🍜",
  "☕",
  "📖",
  "🎵",
  "🎬",
  "🎮",
  "🏖️",
  "✈️",
  "❤️",
  "🎉",
  "😄",
  "😴",
  "🏆",
  "🌱",
];

export interface MomentDraft {
  title: string;
  description: string;
  time?: string;
  emoji?: string;
}

interface AddMomentModalProps {
  initial?: Moment | null;
  onClose: () => void;
  onSave: (draft: MomentDraft) => void;
}

export default function AddMomentModal({
  initial,
  onClose,
  onSave,
}: AddMomentModalProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [time, setTime] = useState(initial?.time ?? "");
  const [manualEmoji, setManualEmoji] = useState(Boolean(initial?.emoji));
  const [selectedEmoji, setSelectedEmoji] = useState(
    initial?.emoji ?? getEmojiForText(initial?.title ?? ""),
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const autoEmoji = getEmojiForText(title);
  const displayEmoji = manualEmoji ? selectedEmoji : autoEmoji;

  const options = Array.from(new Set([autoEmoji, ...EMOJI_OPTIONS]));

  const save = () => {
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      time: time || undefined,
      emoji: displayEmoji,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="moment-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-xs"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col gap-3.5 sm:gap-4 overflow-y-auto border-2 border-black bg-[#e6e3d9] p-4 sm:p-6 shadow-[5px_5px_0_0_#000] sm:shadow-[8px_8px_0_0_#000]">
        <div className="flex items-center justify-between gap-2 border-b-2 border-dashed border-black/40 pb-3">
          <h2
            id="moment-modal-title"
            className="text-lg sm:text-xl font-black uppercase text-black tracking-tight"
          >
            {initial ? "Edit Moment" : "Add New Moment"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center border-2 border-black bg-white text-black shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-black uppercase text-black">
            What happened?
          </label>
          <div className="flex items-start gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center border-2 border-black bg-white text-3xl shadow-[2px_2px_0_0_#000]">
              {displayEmoji}
            </span>
            <div className="flex flex-1 flex-col gap-1">
              <textarea
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH))
                }
                placeholder="e.g. Studied for 5 hours"
                rows={2}
                className="w-full resize-none border-2 border-black bg-white px-3 py-2 text-sm font-bold text-black outline-none placeholder:text-[#4d4b46] focus:bg-yellow-50"
              />
              <span className="self-end text-xs font-bold text-[#4d4b46]">
                {title.length}/{MAX_TITLE_LENGTH}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-black uppercase text-black">
            Add a little description
          </label>
          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))
            }
            placeholder="e.g. Focused on DSA and solved 15 problems"
            rows={2}
            className="w-full resize-none border-2 border-black bg-white px-3 py-2 text-sm font-bold text-black outline-none placeholder:text-[#4d4b46] focus:bg-yellow-50"
          />
          <span className="self-end text-xs font-bold text-[#4d4b46]">
            {description.length}/{MAX_DESCRIPTION_LENGTH}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs sm:text-sm font-black uppercase text-black">Icon</span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {options.map((emoji) => {
              const isAuto = emoji === autoEmoji;
              const isSelected = emoji === displayEmoji;
              return (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    setManualEmoji(true);
                    setSelectedEmoji(emoji);
                  }}
                  aria-label={`Choose icon ${emoji}`}
                  title={isAuto ? `${emoji} (auto-suggested)` : emoji}
                  className={`grid h-9 w-9 sm:h-10 sm:w-10 place-items-center border-2 text-lg sm:text-xl transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-black ${
                    isSelected
                      ? "border-black bg-yellow-300 shadow-[2px_2px_0_0_#000]"
                      : "border-black bg-white hover:bg-yellow-50"
                  }`}
                >
                  {emoji}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] sm:text-xs font-bold text-[#4d4b46]">
            Icon is suggested automatically from your text — tap any to override.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs sm:text-sm font-black uppercase text-black">
            Time (Optional)
          </span>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-black bg-white text-black shadow-[2px_2px_0_0_#000]">
              <Clock className="h-5 w-5" />
            </span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex-1 border-2 border-black bg-white px-3 py-2 text-sm font-bold text-black outline-none focus:bg-yellow-50 focus-visible:outline-2 focus-visible:outline-black"
            />
            {time && (
              <button
                type="button"
                onClick={() => setTime("")}
                aria-label="Clear time"
                className="grid h-10 w-10 shrink-0 place-items-center border-2 border-black bg-red-500 text-white shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-black"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-end gap-2.5 sm:gap-3 border-t-2 border-dashed border-black/40 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="border-2 border-black bg-white px-4 sm:px-6 py-2 text-xs sm:text-sm font-black uppercase text-black shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!title.trim()}
            className="border-2 border-black bg-yellow-300 px-5 sm:px-6 py-2 text-xs sm:text-sm font-black uppercase text-black shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_0_#000] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-black"
          >
            {initial ? "Update Moment" : "Save Moment"}
          </button>
        </div>
      </div>
    </div>
  );
}
