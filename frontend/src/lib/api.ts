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
