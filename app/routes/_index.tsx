import { useState, useEffect, useRef } from "react";
import { fetchRandomImage } from "~/services/imageSercices";
import { fetchRandomQuote } from "~/services/quoteServices";
import html2canvas from "html2canvas";
export default function Index() {
  const [imageUrl, setImageUrl] = useState("");
  const [quote, setQuote] = useState("");
  const imageRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    try {
      const image = await fetchRandomImage();
      setImageUrl(image);
      const quote = await fetchRandomQuote();
      setQuote(quote);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 📥 Download the image with the quote
  const handleDownload = async () => {
    if (!imageRef.current) return;

    const canvas = await html2canvas(imageRef.current, {
      useCORS: true, // Enable cross-origin images
      allowTaint: true,
    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "quote-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 📤 Share image with quote
  const handleShare = () => {
    const shareUrl = `${window.location.origin}?image=${encodeURIComponent(
      imageUrl
    )}&quote=${encodeURIComponent(quote)}`;

    if (navigator.share) {
      navigator.share({
        title: "Check out this quote!",
        text: quote,
        url: shareUrl,
      });
    } else {
      alert(`Share this link: ${shareUrl}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Random Image with Quote</h1>

      {imageUrl && (
        <div className="relative" ref={imageRef}>
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

      <div className="flex gap-4 mt-4">
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Generate New
        </button>

        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Download
        </button>

        <button
          onClick={handleShare}
          className="px-4 py-2 bg-purple-500 text-white rounded-md"
        >
          Share
        </button>
      </div>
    </div>
  );
}
