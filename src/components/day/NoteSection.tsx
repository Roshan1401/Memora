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
    <section
      className={`relative flex h-full flex-col gap-4 rounded-2xl border-2 border-black bg-[#f1efe7] p-5`}
    >
      <div className="flex items-start gap-3 border-b-2 border-dashed border-black pb-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-black bg-yellow-300 text-black shadow-[2px_2px_0_0_#000]">
          <NotebookPen className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-black uppercase text-black">
            Note of the Day{" "}
          </h2>
          <p className="mt-1 text-sm font-bold text-[#4d4b46]">
            Write your thoughts, reflections, learnings or anything else.
          </p>
        </div>
      </div>

      {showEditor ? (
        <div className="flex relative flex-1 flex-col gap-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, MAX_NOTE_LENGTH))}
            placeholder="Write something for you..."
            rows={6}
            className="w-full flex-1 font-caveat rounded-xl resize-none border-2 border-black bg-white px-3 py-2  text-2xl font-bold text-black outline-none placeholder:font-caveat placeholder:text-2xl placeholder:text-[#4d4b46] focus:bg-yellow-50 shadow-[2px_2px_0_0_#000] "
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#4d4b46]">
              {draft.length}/{MAX_NOTE_LENGTH}
            </span>
            <div className="flex items-center gap-2">
              {isEditing && hasNote && (
                <button
                  onClick={() => {
                    setDraft(note);
                    setIsEditing(false);
                  }}
                  className="border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={saveNote}
                disabled={!draft.trim()}
                className="inline-flex items-center gap-2 border-2 border-sky-600 bg-sky-400 px-5 py-2 text-sm font-black uppercase text-blue-800 cursor-pointer shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Pencil className="h-4 w-4" />
                {hasNote ? "Update Note" : "Add"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex  flex-1 flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-black">
              <NotebookPen className="h-4 w-4 text-[#4d4b46]" />
              Note of the Day
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setDraft(note);
                  setIsEditing(true);
                }}
                aria-label="Edit note"
                className="grid h-9 w-9 place-items-center border-2 border-black bg-white text-black shadow-[2px_2px_0_0_#000] transition-transform hover:-translate-y-0.5"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="flex-1 break-words rounded-2xl whitespace-pre-wrap border-2 border-black bg-white p-4 font-caveat text-2xl font-bold text-black shadow-[2px_2px_0_0_#000]">
            {note}
          </p>
        </div>
      )}
      <div className="absolute right-2 top-6">
        <Image src={CatImg} alt="CatFoot" className="h-18 w-30" />
      </div>
    </section>
  );
}
