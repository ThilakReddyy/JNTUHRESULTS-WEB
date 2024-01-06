import axios from "axios";

export async function fetchNotifications() {
  try {
    const response = await axios.get("/api/redisdata", {
      params: {
        htno: "notifications",
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        `Failed to fetch notifications. Status: ${response.status}`,
      );
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching notifications:", error);
    return null;
  }
}
