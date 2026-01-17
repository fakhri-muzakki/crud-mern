const RecordSkeleton = () => {
  return (
    <tr className="border-t border-neutral-800">
      <td className="px-6 py-3">
        <div className="h-4 w-2 bg-neutral-800 animate-pulse rounded" />
      </td>

      <td className="px-6 py-3">
        <div className="h-4 w-36 bg-neutral-800 animate-pulse rounded" />
      </td>

      <td className="px-6 py-3 hidden sm:table-cell">
        <div className="h-4 w-36 lg:w-40 bg-neutral-800 animate-pulse rounded" />
      </td>

      <td className="px-6 py-3 hidden md:table-cell">
        <div className="h-6.5 w-16 bg-neutral-800 animate-pulse rounded-xl" />
      </td>

      <td className="px-6 py-3 ">
        <div className="hidden gap-3 justify-center  md:flex">
          <div className="h-4 w-12 bg-neutral-800 animate-pulse rounded-lg" />
          <div className="h-4 w-14 bg-neutral-800 animate-pulse rounded-lg" />
        </div>

        <div className="h-[1.44rem] w-2 bg-neutral-800 rounded md:hidden mx-auto" />
      </td>
    </tr>
  );
};

export default RecordSkeleton;
