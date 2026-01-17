import { PersonSchema } from "@/schemas/person.schema";
import { Person } from "@/types/person";
import { useState } from "react";
import { safeParse } from "valibot";

interface ModalFormProps {
  onClose: () => void;
  onSubmit: (form: Person) => Promise<void>;
  formData?: Person;
  isView: boolean;
}

export default function ModalForm({
  onClose,
  formData,
  onSubmit,
  isView,
}: ModalFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Person>({
    id: formData?.id || "",
    name: formData?.name || "",
    email: formData?.email || "",
    gender: formData?.gender || "MALE",
  });
  const typeForm = form.id === "" ? "create" : "update";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = safeParse(PersonSchema, form);
    if (!result.success) {
      const newErrors: Record<string, string> = {};

      result.issues.forEach((issue) => {
        if (issue.path) {
          const fieldName = issue.path[0].key as string;
          newErrors[fieldName] = issue.message;
        }
      });

      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    await onSubmit(form);
    setForm({ id: "", name: "", email: "", gender: "" });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 md:px-0"
      onClick={onClose}
    >
      <div
        className="bg-[#121212] text-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {typeForm === "create" && !isView ? "Add New User" : "Update User"}
            {isView && "Detail User"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400"
              placeholder="Abangkuh"
              readOnly={isView}
              required
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              readOnly={isView}
              className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400"
              placeholder="abangkuh@gmail.com"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Gender</label>

            {isView ? (
              <input
                name="gender"
                type="text"
                value={form.gender}
                readOnly
                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400"
              />
            ) : (
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400"
              >
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
            )}

            {errors.gender && (
              <p className="text-sm text-red-500">{errors.gender}</p>
            )}
          </div>

          {!isView && (
            <button
              type="submit"
              className="w-full bg-gray-200 text-black font-medium py-2 rounded-lg hover:bg-white transition"
            >
              Save
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
