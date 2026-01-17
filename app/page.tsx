import { getData } from "@/libs/api";
import { APIResponse } from "@/types/person";
import PeopleTable from "./_components/PeopleTable";

export const revalidate = 60;

export default async function Home() {
  try {
    const apiUrl = process.env.API_URL || "http://localhost:3000/api";
    const response = await getData<APIResponse>(`${apiUrl}/users`);
    const data = response.data;

    return (
      <div className="w-full max-w-5xl mx-auto mt-10 px-4 md:px-6 xl:px-0">
        <PeopleTable
          initialData={data}
          totalPagesParams={response.meta.totalPages}
        />
      </div>
    );
  } catch {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>Failed to load users. Please try again later.</p>
      </div>
    );
  }
}
