import RecordSkeleton from "./RecordSkeleton";

const SkeletonTable = () => {
  return (
    <tbody>
      {Array.from({ length: 5 }).map((_, i) => (
        <RecordSkeleton key={i} />
      ))}
    </tbody>
  );
};

export default SkeletonTable;
