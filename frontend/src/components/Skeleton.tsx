export const Skeleton = () => {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="size-10 rounded-full bg-gray-400"></div>
      <div className="flex-1 space-y-3">
        <div className="h-2 rounded bg-gray-400"></div>
        <div className="h-2 rounded bg-gray-400"></div>
      </div>
    </div>
  );
};
