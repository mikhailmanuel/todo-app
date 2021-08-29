import { useState, useEffect } from "react";

function useRandomQuotes(props) {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchQuotes = async () =>
      await fetch(`https://type.fit/api/quotes`)
        .then((res) => res.json())
        .then((data) => {
          const listQuotes = Math.floor(Math.random() * data.length);
          const randomQuote = data[listQuotes];
          setText(randomQuote.text);
          setAuthor(randomQuote.author);
        });

    fetchQuotes();
  }, []);

  return [text, author];
}

export default useRandomQuotes;
