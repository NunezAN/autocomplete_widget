import { useEffect, useState } from "react";

function getAutocompleteResults(query) {
  const fruits = [
    "Apple",
    "Banana",
    "Kiwi",
    "Orange",
    "Strawberry",
    "Watermelon",
    "Mango",
    "Grape",
    "Lemon",
    "Lime",
    "Peach",
    "Pear",
    "Raspberry",
    "Blueberry",
    "Blackberry",
    "Cherry",
    "Coconut",
    "Cranberry",
    "Cucumber",
    "Grapefruit",
    "Honeydew",
    "Jackfruit",
    "Mandarin",
    "Mango",
    "Melon",
    "Nectarine",
    "Papaya",
    "Pineapple",
    "Plum",
    "Pomegranate",
  ];
  return new Promise((resolve, reject, signal) => {
    setTimeout(() => {
      if (signal?.aborted) {
        reject(signal.reason);
      }
      resolve(
        fruits.filter((fruit) =>
          fruit.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, Math.random() * 1000);
  });
}

function useDebounceValue(value, time = 250) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);
  return debounceValue;
}

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const debounceValue = useDebounceValue(search);
  const controller = new AbortController();
  useEffect(() => {
    const signal = controller.signal;
    if (!debounceValue) {
      setResults([]);
    } else {
      const fetchResults = async () => {
        const fetchedData = await getAutocompleteResults(debounceValue, signal);
        setResults(fetchedData);
      };
      fetchResults();
    }
    return () => controller.abort("cancel request");
  }, [debounceValue]);
  // console.log(results);
  // console.log(getAutocompleteResults("mango"));
  return (
    <div className="w-full h-screen flex flex-col items-center bg-gray-900">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="mt-24 mb-4"
      />
      <div className="text-gray-200 flex flex-col gap-2 items-start">
        {results.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
