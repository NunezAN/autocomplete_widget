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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        fruits.filter((fruit) =>
          fruit.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, Math.random() * 1000);
  });
}

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      const fetchedData = await getAutocompleteResults(search);
      setResults(fetchedData);
    };
    fetchResults();
  }, [search]);
  console.log(results);
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
        {results.map((result) => (
          <div>{result}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
