"use client";

import { useState } from "react";
import { dayKey, useDayStore } from "../../store/dayStore";
import type { Moment } from "../../store/dayStore";
import { toDateSlug } from "../../utils/dateUtils";
import { useMoments } from "../hooks/useMoments";
import DayHeader from "./DayHeader";
import MomentSection from "./MomentSection";
import NoteSection from "./NoteSection";
import AddMomentModal from "./AddMomentModal";
import type { MomentDraft } from "./AddMomentModal";
import { toast } from "sonner";

export default function DayDetail({ date }: { date: Date }) {
  const key = dayKey(date);
  const dateSlug = toDateSlug(date);
  const { loading } = useMoments(date);
  const day = useDayStore((s) => s.days[key]);
  const addMoment = useDayStore((s) => s.addMoment);
  const updateMoment = useDayStore((s) => s.updateMoment);
  const removeMoment = useDayStore((s) => s.removeMoment);
  const setNotes = useDayStore((s) => s.setNotes);

  const moments = day?.moments ?? [];
  const notes = day?.notes ?? "";

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMoment, setEditingMoment] = useState<Moment | null>(null);

  const openAddMoment = () => {
    setEditingMoment(null);
    setModalOpen(true);
  };

  const openEditMoment = (moment: Moment) => {
    setEditingMoment(moment);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingMoment(null);
  };

  const handleSaveMoment = async (draft: MomentDraft) => {
    if (editingMoment) {
      try {
        const res = await fetch(
          `/api/moment/${dateSlug}?momentId=${editingMoment.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(draft),
          },
        );

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Failed to update moment");
          console.error(data.message || "Failed to update moment");
          return;
        }

        updateMoment(date, editingMoment.id, {
          title: data.moment.title,
          description: data.moment.description,
          time: data.moment.time,
          emoji: data.moment.emoji,
        });
        toast.success("Moment updated successfully!");
        closeModal();
      } catch (error) {
        toast.error("Error updating moment");
        console.error("Error updating moment:", error);
      }
      return;
    }
    try {
      const res = await fetch(`/api/moment/${dateSlug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draft),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to save moment");
        console.error(data.message || "Failed to save moment");
        return;
      }

      toast.success("Moment saved successfully!");
      addMoment(date, data.moment);

      closeModal();
    } catch (error) {
      toast.error("Error saving moment");
      console.error("Error saving moment:", error);
    }
  };

  const handleDeleteMoment = async (momentId: string) => {
    try {
      const res = await fetch(`/api/moment/${dateSlug}?momentId=${momentId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete moment");
        console.error(data.message || "Failed to delete moment");
        return;
      }

      toast.success("Moment deleted successfully!");
      removeMoment(date, momentId);
    } catch (error) {
      toast.error("Error deleting moment");
      console.error("Error deleting moment:", error);
    }
  };

  const handleSaveNote = async (note: string) => {
    try {
      const res = await fetch(`/api/note/${dateSlug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to save note");
        console.error(data.message || "Failed to save note");
        return;
      }

      toast.success("Note saved successfully!");
      setNotes(date, note);
    } catch (error) {
      toast.error("Error saving note");
      console.error("Error saving note:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <DayHeader date={date} />

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="h-72 animate-pulse border-2 border-black bg-[#f1efe7] shadow-[4px_4px_0_0_#000]" />
          <div className="h-72 animate-pulse border-2 border-black bg-[#f1efe7] shadow-[4px_4px_0_0_#000]" />
        </div>
      ) : (
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="min-w-0 flex-1">
            <MomentSection
              moments={moments}
              onAddMoment={openAddMoment}
              onEditMoment={openEditMoment}
              onDeleteMoment={handleDeleteMoment}
            />
          </div>
          <div className="w-full min-w-0 md:w-[50%] md:shrink-0">
            <NoteSection note={notes} onSave={handleSaveNote} />
          </div>
        </div>
      )}

      {modalOpen && (
        <AddMomentModal
          initial={editingMoment}
          onClose={closeModal}
          onSave={handleSaveMoment}
        />
      )}
    </div>
  );
}
