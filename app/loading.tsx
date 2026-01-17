import RecordSkeleton from "./_components/RecordSkeleton";

export default function HomeSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4 md:px-6 xl:px-0">
      <div className="rounded-2xl border border-neutral-800 shadow-lg overflow-hidden bg-[#0a0a0a] ">
        {/* Header */}
        <header className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="">
            <h2 className="text-lg font-semibold text-neutral-200">
              People List
            </h2>
            <p className="text-sm text-neutral-500">
              Manage and review user information
            </p>
          </div>

          <button className="px-4 py-2 text-sm rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 transition">
            + Add User
          </button>
        </header>

        {/* Table */}
        <div className="overflow-x-auto ">
          <table className="w-full text-sm table-fixed">
            <thead className="bg-neutral-900/60">
              <tr className="text-left text-neutral-400">
                <th className="px-6 py-3 w-[5.45rem]">No</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3 hidden sm:table-cell">Email</th>
                <th className="px-6 py-3 hidden md:table-cell">Gender</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="">
              {Array.from({ length: 5 }).map((_, i) => (
                <RecordSkeleton key={i} />
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="border-t border-neutral-800 bg-neutral-900/40 px-6 pt-4 pb-4.5 flex justify-end gap-2.5 text-transparent">
            <div className="px-3 py-1.5 block text-sm  bg-neutral-800 rounded-lg ">
              Prev
            </div>

            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="px-3 py-1.5 block text-sm  bg-neutral-800 rounded-lg"
              >
                {i}
              </div>
            ))}
            <div className="px-3 py-1.5 block text-sm  bg-neutral-800 rounded-lg">
              Prev
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
