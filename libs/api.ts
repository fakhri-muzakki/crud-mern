import { Person } from "@/types/person";

export async function getData<T>(apiUrl: string): Promise<T> {
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error(`API Error : ${res.status}`);
  }

  return res.json();
}

export async function createUser(
  userData: Omit<Person, "id" | "createdAt" | "updatedAt">
) {
  const apiUrl = "/api/users";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create user");
  }

  return data;
}

export async function deleteUser(id: string) {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error(`API Error : ${res.status}`);

  return true;
}

export async function updateUser(userData: Person) {
  const res = await fetch(`/api/users/${userData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`API Error : ${res.status}`);
  }

  return data;
}
