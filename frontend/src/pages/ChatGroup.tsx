const ChatGroup = () => {
  return (
    <>
      <div className="flex gap-2">
        <img
          src="https://plus.unsplash.com/premium_photo-1749846961895-464c17182d86?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="space-y-1">
          <p className="max-w-md w-max p-2 border border-gray-300 rounded-t-lg rounded-r-lg">
            What are you doing?
          </p>
          <p className="max-w-md w-max p-2 border border-gray-300 rounded-b-lg rounded-r-lg">
            What are you doing? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Fugiat provident ratione eligendi magni, neque
            quaerat consectetur quisquam, nemo inventore quibusdam impedit,
            facere qui nam dolorum voluptas illo reprehenderit. Omnis, nemo?
          </p>
        </div>
      </div>

      <div className="self-end flex flex-col group max-w-[80%]">
        <div className="flex gap-2">
          {/* Menu */}
          <button className="self-center p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded-full">
            <EllipsisVertical size={16} className="text-gray-400" />
          </button>

          {/* Profile Pic */}
          <img
            src="https://plus.unsplash.com/premium_photo-1749846961895-464c17182d86?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={32}
            height={32}
            className="order-1 w-8 h-8 rounded-full object-cover"
          />

          {/* Message + Seen */}
          <div className="flex flex-col group">
            {/* Message */}
            <div className="flex gap-2 max-w-md w-max p-3 bg-green-500 text-white shadow-sm rounded-lg">
              <p>Nothing much. What about you?</p>
              <span className="self-end text-xs text-gray-300">2:33 PM</span>
            </div>

            {/* Seen */}
            <div className="self-end mt-1">
              <img
                src="https://plus.unsplash.com/premium_photo-1749846961895-464c17182d86?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                width={12}
                height={12}
                className="w-3 h-3 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatGroup;
