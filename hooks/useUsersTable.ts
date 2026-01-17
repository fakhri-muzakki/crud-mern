import { useState } from "react";
import { APIResponse, Person } from "@/types/person";
import { createUser, deleteUser, getData, updateUser } from "@/libs/api";
import toast from "react-hot-toast";

type Open = "Form" | "Confirm";

export function useUsersTable(initial: Person[], totalPagesParam: number) {
  const [data, setData] = useState<Person[]>(initial);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(totalPagesParam);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<Person | null>(null);
  const [isOpen, setIsOpen] = useState<Open | null>(null);
  const [operatingUserId, setOperatingUserId] = useState("");

  const fetchPage = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await getData<APIResponse>(
        `/api/users?page=${pageNumber + 1}`
      );
      setData(res.data);
      setTotalPages(res.meta.totalPages);
      setPage(pageNumber);
    } catch (error) {
      toast.success(String(error));
    } finally {
      setLoading(false);
    }
  };

  const reFetchData = async (page?: number) => {
    try {
      const currentPage = (page || 0) + 1;
      const res = await getData<APIResponse>(`/api/users?page=${currentPage}`);
      setTotalPages(res.meta.totalPages);
      setData([...res.data]);
    } catch (error) {
      throw error;
    }
  };

  type RefreshType = "Add" | "Edit" | "Delete";

  // Optimistic update
  const refreshData = (p: Person, refreshType: RefreshType) => {
    switch (refreshType) {
      case "Add":
        setData((prev) => [p, ...prev.slice(0, -1)]);
        break;
      case "Edit":
        setData((prev) => prev.map((d) => (d.id === p.id ? p : d)));
        break;
      case "Delete":
        setData((prev) => [...prev.filter((u) => u.id !== operatingUserId), p]);
        break;
    }

    setIsOpen(null);
  };

  const handleConfirmDelete = async () => {
    if (!operatingUserId) return;
    setIsOpen(null);

    const user = data.find((d) => d.id === operatingUserId);
    if (!user) return;

    const PLACEHOLDER_USER: Person = {
      id: "PLACEHOLDER",
      email: "",
      name: "",
      gender: "MALE",
      isDeleting: true,
    };

    refreshData(PLACEHOLDER_USER, "Delete");

    try {
      await deleteUser(operatingUserId);
      toast.success("User deleted");
      await reFetchData(page);
    } catch (error) {
      toast.success(String(error));
      setData((prev) => prev.filter((p) => (p.isDeleting ? user : p)));
    }
  };

  const handleAddData = async (person: Person) => {
    const previousData = data;
    refreshData(person, "Add");

    try {
      const data = await createUser(person);
      await reFetchData();
      setPage(0);
      setData((prev) => prev.filter((p) => (p.id === "" ? data : p)));
    } catch (error) {
      setData(previousData);
      throw error;
    }
  };

  const handleEditData = async (person: Person) => {
    const previousData = data;
    refreshData(person, "Edit");
    setOperatingUserId(person.id);

    try {
      await updateUser(person);
    } catch (error) {
      setData(previousData);
      throw error;
    } finally {
      setEditingUser(null);
      setOperatingUserId("");
    }
  };

  return {
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
  };
}
