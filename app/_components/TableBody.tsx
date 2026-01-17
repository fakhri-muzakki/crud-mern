import { Person } from "@/types/person";
import { ActionMenu } from "./ActionMenu";
import RecordSkeleton from "./RecordSkeleton";

interface TableBodyProps {
  data: Person[];
  operatingUserId: string;
  handleEdit: (data: Person) => void;
  handleDelete: (id: string) => void;
  handleView: (data: Person) => void;
}

const TableBody = ({
  data,
  handleDelete,
  operatingUserId,
  handleEdit,
  handleView,
}: TableBodyProps) => {
  return (
    <tbody>
      {data.map((person, index) =>
        person.isDeleting ? (
          <RecordSkeleton key={index} />
        ) : (
          <tr
            key={person.id}
            className="border-t border-neutral-800 hover:bg-neutral-900/50 transition"
          >
            <td className="px-6 py-3 text-neutral-300 truncate w-[5.45rem]">
              {index + 1}
            </td>
            <td className="px-6 py-3 text-neutral-200  truncate">
              {person.name}
            </td>
            <td className="hidden sm:table-cell px-6 py-3 text-neutral-400 truncate">
              {person.email}
            </td>
            <td className="hidden md:table-cell px-6 py-3 truncate">
              <span className="capitalize inline-block rounded-xl px-3 py-1 text-xs bg-neutral-800 text-neutral-300 border border-neutral-700">
                {person.gender}
              </span>
            </td>

            <td className="px-6 py-3 flex items-center gap-3 justify-center">
              <button
                className="hidden md:block text-xs px-3 py-1 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-300 disabled:border-neutral-900 disabled:cursor-not-allowed"
                disabled={operatingUserId === person.id}
                onClick={() => handleEdit(person)}
              >
                Edit
              </button>
              <button
                className="hidden md:block text-xs px-3 py-1 rounded-lg border border-red-700 text-red-300 hover:bg-red-900/30 disabled:border-neutral-900 disabled:cursor-not-allowed"
                disabled={operatingUserId === person.id}
                onClick={() => handleDelete(person.id)}
              >
                Delete
              </button>

              <ActionMenu
                onDelete={() => handleDelete(person.id)}
                onEdit={() => handleEdit(person)}
                onView={() => handleView(person)}
              />
            </td>
          </tr>
        )
      )}
    </tbody>
  );
};

export default TableBody;
