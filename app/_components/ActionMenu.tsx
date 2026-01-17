"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2, Eye } from "lucide-react";

type ActionMenuProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
};

export function ActionMenu({ onEdit, onDelete, onView }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open actions menu"
        className="rounded-md text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 transition"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg
                     border border-neutral-800 bg-neutral-950 shadow-lg"
        >
          <MenuItem
            icon={<Eye size={16} />}
            label="View"
            onClick={() => {
              setOpen(false);
              onView?.();
            }}
          />

          <MenuItem
            icon={<Pencil size={16} />}
            label="Edit"
            onClick={() => {
              setOpen(false);
              onEdit?.();
            }}
          />

          <MenuItem
            icon={<Trash2 size={16} />}
            label="Delete"
            variant="danger"
            onClick={() => {
              setOpen(false);
              onDelete?.();
            }}
          />
        </div>
      )}
    </div>
  );
}

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
};

function MenuItem({
  icon,
  label,
  onClick,
  variant = "default",
}: MenuItemProps) {
  const base =
    "flex w-full items-center gap-2 px-4 py-2 text-sm transition text-left";

  const styles =
    variant === "danger"
      ? "text-red-400 hover:bg-red-500/10"
      : "text-neutral-200 hover:bg-neutral-800";

  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={`${base} ${styles}`}
    >
      {icon}
      {label}
    </button>
  );
}
