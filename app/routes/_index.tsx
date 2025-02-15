import { useState, useEffect } from "react";
import axios from "axios";

export default function Index() {
  const [imageUrl, setImageUrl] = useState("");
  const [quote, setQuote] = useState("");

  // Fetch Random Image
  const fetchRandomImage = async () => {
    try {
      const res = await axios.get("https://picsum.photos/600/400");
      setImageUrl(res.request.responseURL); // Get final image URL
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  // Fetch Random Quote
  const fetchRandomQuote = async () => {
    try {
      const res = await axios.get("https://api.quotable.io/random");
      setQuote(res.data.content);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  // Fetch image and quote on mount
  useEffect(() => {
    fetchRandomImage();
    fetchRandomQuote();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Random Image with Quote</h1>

      {imageUrl && (
        <div className="relative">
          <img
            src={imageUrl}
            alt="Random"
            className="w-[600px] h-[400px] rounded-lg shadow-md"
          />
          <p className="absolute bottom-5 left-5 text-white bg-black bg-opacity-50 px-3 py-2 rounded-md text-lg">
            {quote}
          </p>
        </div>
      )}

      <button
        onClick={() => {
          fetchRandomImage();
          fetchRandomQuote();
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Generate New
      </button>
    </div>
  );
}
