import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

let timeoutId: NodeJS.Timeout;

type User = {
  _id: string;
  username: string;
  avatar: string;
};

const FriendRequest = () => {
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/users/search-users?username=${e.target.value.trim()}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setSearchedUsers(data.data);
      } catch (error) {
        console.log("Search Friends error:", error);
      }
    }, 500);
  };

  const add = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/friends/${id}/add`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Add Friends error:", error);
    }
  };

  return (
    <section className="hidden w-full order-3 md:block mx-5">
      <div className="my-5">
        <div className="px-4 py-2 flex items-center gap-3 rounded-full border border-gray-300 focus-within:border-gray-700 transition-colors duration-200 bg-white shadow-sm">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search for friends"
            className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {searchedUsers.map((user) => (
          <div
            key={user._id}
            className="col-span-2 bg-white p-4 border border-gray-200 rounded-xl shadow-md flex items-center justify-between w-full max-w-md"
          >
            <div className="flex items-center gap-3">
              <img
                loading="lazy"
                src={user.avatar || "/noAvatar.png"}
                alt={`${user.username} Profile picture`}
                className="w-12 h-12 rounded-full object-cover"
              />

              <h3 className="font-semibold text-gray-800 text-base">
                {user.username}
              </h3>
            </div>

            <Button
              onClick={() => add(user._id)}
              variant="destructive"
              className="cursor-pointer"
            >
              Add
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FriendRequest;
