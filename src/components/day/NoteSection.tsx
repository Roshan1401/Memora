"use client";

import { useState } from "react";
import { NotebookPen, Pencil } from "lucide-react";
import Image from "next/image";
import CatImg from "../../assets/cat2.png";

const MAX_NOTE_LENGTH = 5000;

interface NoteSectionProps {
  note: string;
  onSave: (note: string) => void;
}

export default function NoteSection({ note, onSave }: NoteSectionProps) {
  const [draft, setDraft] = useState(note);
  const [isEditing, setIsEditing] = useState(note.length > 0 ? false : true);

  const hasNote = note.trim().length > 0;
  const showEditor = isEditing || !hasNote;

  const saveNote = () => {
    const value = draft.trim();
    onSave(value);
    setDraft(value);
    setIsEditing(false);
  };

  return (
    <section className="relative flex h-full flex-col gap-4 border-2 border-black bg-[#f1efe7] p-3.5 sm:p-5 shadow-[4px_4px_0_0_#000]">
      {/* Decorative cat mascot tucked safely at the top corner */}
      <div className="pointer-events-none select-none absolute -top-5 right-4 hidden sm:block">
        <Image src={CatImg} alt="" className="h-14 w-24 object-contain" />
      </div>

      <div className="relative z-10 flex items-start gap-2.5 sm:gap-3 border-b-2 border-dashed border-black pb-3 sm:pb-4">
        <span className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center border-2 border-black bg-yellow-300 text-black shadow-[2px_2px_0_0_#000]">
          <NotebookPen className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        <div className="min-w-0 pr-2">
          <h2 className="text-base sm:text-lg font-black uppercase text-black">
            Note of the Day
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#4d4b46]">
            Write your thoughts, reflections, learnings or anything else.
          </p>
        </div>
      </div>

      {showEditor ? (
        <div className="relative z-10 flex flex-1 flex-col gap-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, MAX_NOTE_LENGTH))}
            placeholder="Write something for you..."
            rows={6}
            className="w-full flex-1 font-caveat resize-none border-2 border-black bg-white p-3 text-xl sm:text-2xl font-bold text-black outline-none placeholder:font-caveat placeholder:text-xl placeholder:text-[#4d4b46] focus:bg-yellow-50/60 shadow-[2px_2px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black"
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#4d4b46]">
              {draft.length}/{MAX_NOTE_LENGTH}
            </span>
            <div className="flex items-center gap-2">
              {isEditing && hasNote && (
                <button
                  type="button"
                  onClick={() => {
                    setDraft(note);
                    setIsEditing(false);
                  }}
                  className="border-2 border-black bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-black uppercase text-black shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={saveNote}
                disabled={!draft.trim()}
                className="inline-flex items-center gap-2 border-2 border-black bg-yellow-300 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-black uppercase text-black cursor-pointer shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_0_#000] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-black"
              >
                <Pencil className="h-4 w-4" />
                <span>{hasNote ? "Update Note" : "Save Note"}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-1 flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-black">
              <NotebookPen className="h-4 w-4 text-[#4d4b46]" />
              Saved Note
            </p>
            <button
              type="button"
              onClick={() => {
                setDraft(note);
                setIsEditing(true);
              }}
              aria-label="Edit note"
              className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center border-2 border-black bg-white text-black shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 hover:bg-yellow-100 active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black"
            >
              <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
          <p className="flex-1 break-words whitespace-pre-wrap border-2 border-black bg-white p-3.5 sm:p-5 font-caveat text-xl sm:text-2xl font-bold text-black shadow-[2px_2px_0_0_#000]">
            {note}
          </p>
        </div>
      )}
    </section>
  );
}
