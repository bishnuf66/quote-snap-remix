import axios from "axios";
  // Fetch Random Quote
 export const fetchRandomQuote = async () => {
    try {
      const res = await axios.get("http://api.quotable.io/random");
     return (res.data.content);
      console.log(res);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };