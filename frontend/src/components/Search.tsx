import { SearchIcon } from "lucide-react";

export const Search = () => {
  return (
    <div className="flex bg-slate-800 text-slate-100 p-2 items-center gap-2 rounded-full border border-transparent focus-within:border focus-within:border-green-500">
      <SearchIcon size={20} className="text-slate-400" />
      <input
        type="text"
        placeholder="Search a chat..."
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
};
