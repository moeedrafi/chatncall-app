export const BASE_URL = import.meta.env.VITE_API_URL;

export const getAPI = async (url: string) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("API error: ", error);
  }
};

export const getConversation = async (id: string) => {
  try {
    const data = await getAPI(`/conversations/${id}`);
    return data.data;
  } catch (error) {
    console.log("Friend Convo error:", error);
  }
};

export const getMessages = async (conversationId: string) => {
  try {
    const data = await getAPI(`/messages/${conversationId}`);
    return data.data;
  } catch (error) {
    console.log("Fetching Messages error:", error);
  }
};
