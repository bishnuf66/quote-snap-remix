import axios from "axios"; // Fetch Random Image

export const fetchRandomImage = async () => {
  try {
    const res = await axios.get("https://picsum.photos/600/400");
    return (res.request.responseURL); // Get final image URL
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};