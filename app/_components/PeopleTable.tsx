"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import TableBody from "./TableBody";
import { Person } from "@/types/person";
import ReactPaginate from "react-paginate";
import SkeletonTable from "./SkeletonTable";
import ConfirmDialog from "./ConfirmDialog";
import ModalForm from "@/components/ModalForm";
import { useUsersTable } from "@/hooks/useUsersTable";

const PeopleTable = ({
  initialData,
  totalPagesParams,
}: {
  initialData: Person[];
  totalPagesParams: number;
}) => {
  const {
    data,
    page,
    totalPages,
    loading,
    editingUser,
    isOpen,
    operatingUserId,

    setIsOpen,
    setEditingUser,
    setOperatingUserId,

    fetchPage,
    handleConfirmDelete,
    handleAddData,
    handleEditData,
  } = useUsersTable(initialData, totalPagesParams);

  console.log(page);

  const [isView, setIsView] = useState(false);

  const handleView = (person: Person) => {
    setEditingUser(person);
    setIsOpen("Form");
    setIsView(true);
  };

  const handleEdit = (person: Person) => {
    setEditingUser(person);
    setIsOpen("Form");
  };

  const handleSubmit = async (form: Person): Promise<void> => {
    setIsOpen(null);

    try {
      if (form.id === "") {
        await handleAddData(form);
        toast.success("User created successfully!");
      } else {
        await handleEditData(form);
        toast.success("User updated successfully!");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create user");
      }
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-800 shadow-lg overflow-hidden bg-[#0a0a0a]">
      <header className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
        <div className="">
          <h1 className="text-lg font-semibold text-neutral-200">
            People List
          </h1>
          <p className="text-sm text-neutral-500">
            Manage and review user information
          </p>
        </div>

        <button
          className="px-4 py-2 text-sm rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 transition"
          onClick={() => setIsOpen("Form")}
        >
          + Add User
        </button>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-neutral-900/60">
            <tr className="text-left text-neutral-400">
              <th className="px-6 py-3 truncate w-[5.45rem]">No</th>
              <th className="px-6 py-3 truncate">Name</th>
              <th className="px-6 py-3 truncate hidden sm:table-cell">Email</th>
              <th className="px-6 py-3 truncate hidden md:table-cell">
                Gender
              </th>
              <th className="px-6 py-3 text-center truncate">Actions</th>
            </tr>
          </thead>

          {/* Table body (tbody) */}
          {loading ? (
            <SkeletonTable />
          ) : (
            <TableBody
              data={data}
              handleView={handleView}
              handleEdit={handleEdit}
              operatingUserId={operatingUserId}
              handleDelete={(id: string) => {
                setIsOpen("Confirm");
                setOperatingUserId(id);
              }}
            />
          )}
        </table>

        {/* Pagination */}
        <div className="border-t border-neutral-800 bg-neutral-900/40 px-6 py-4">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            previousLabel="Prev"
            onPageChange={(selected) => fetchPage(selected.selected)}
            forcePage={page}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={totalPages}
            containerClassName="flex items-center gap-2 justify-end"
            pageClassName="border border-neutral-700 rounded-lg"
            pageLinkClassName="px-3 py-1.5 block text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg"
            activeLinkClassName="bg-neutral-800 text-neutral-100"
            previousClassName="border border-neutral-700 rounded-lg"
            previousLinkClassName="px-3 py-1.5 block text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg"
            nextClassName="border border-neutral-700 rounded-lg"
            nextLinkClassName="px-3 py-1.5 block text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg"
            disabledClassName="opacity-40 cursor-not-allowed"
          />
        </div>

        {isOpen === "Confirm" && (
          <ConfirmDialog
            title="Delete User"
            message={`Are you sure you want to delete?`}
            onConfirm={handleConfirmDelete}
            onCancel={() => {
              setIsOpen(null);
              setOperatingUserId("");
            }}
          />
        )}

        {isOpen === "Form" && (
          <ModalForm
            isView={isView}
            onSubmit={handleSubmit}
            formData={editingUser || undefined}
            onClose={() => {
              setIsOpen(null);
              setEditingUser(null);
              setIsView(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PeopleTable;
