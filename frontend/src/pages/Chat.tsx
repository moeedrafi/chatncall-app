import { useParams } from "react-router";

const Chat = () => {
  const { id } = useParams();
  console.log(id);

  return <section className="bg-gray-100 h-full w-full order-3">CHATS</section>;
};

export default Chat;
