export const MessageSkeleton = ({ isOwnMessage = false }) => (
  <div className={isOwnMessage ? "self-end flex gap-2" : "flex gap-2"}>
    {!isOwnMessage && (
      <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
    )}

    <div className="flex flex-col gap-1">
      <div
        className={`${
          isOwnMessage ? "bg-green-300" : "bg-gray-300"
        } p-3 rounded-lg max-w-[200px] sm:max-w-md w-40 h-5 animate-pulse`}
      />
      <div className="w-12 h-3 bg-gray-200 rounded self-end animate-pulse" />
    </div>

    {isOwnMessage && (
      <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
    )}
  </div>
);
