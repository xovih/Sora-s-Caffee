import { useDebouncedCallback } from "use-debounce";
import { environemnt } from "../../../constants/environment";
import useAutocompleteStore from "../../stores/AutocompleteStore";
import { IMenu } from "../../../types/menu";
import { ChangeEvent, useState } from "react";

const AutoCompleteInput = () => {
  const value = useAutocompleteStore((state) => state.value);
  const setValue = useAutocompleteStore((state) => state.setValue);
  const text = useAutocompleteStore((state) => state.text);
  const setText = useAutocompleteStore((state) => state.setText);

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk fetch ke API
  const fetchSuggestions = async (input: string) => {
    if (!input) return setSuggestions([]);
    setLoading(true);
    try {
      const res = await fetch(`${environemnt.API_URL}/menu?search=${input}`);
      const data = await res.json();
      setSuggestions(data.data || []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce: supaya gak ngehit API tiap ketik
  const debouncedFetch = useDebouncedCallback((val) => {
    fetchSuggestions(val);
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setText(val);
    debouncedFetch(val);
  };

  const handleSelect = (text: string, val: string) => {
    setText(text);
    setValue(val);
    setSuggestions([]); // Tutup suggestion

    console.log(value);
  };

  return (
    <div className="relative w-full">
      <label htmlFor="auto-input" className="mb-1 block">
        Choose Menu
      </label>
      <input
        type="text"
        name="auto-input"
        id="auto-input"
        value={text}
        onChange={handleChange}
        placeholder="Cari sesuatu..."
        className="w-full rounded-lg bg-warning-100 p-3 text-warning-600 placeholder-warning-600 focus:bg-warning-50 focus:outline-none focus:ring-0"
      />
      {value && (
        <button
          onClick={() => {
            setValue("");
            setText("");
          }}
          className="-translate-y-1/6 absolute right-4 top-1/2 text-gray-500 hover:text-gray-700"
          type="button"
        >
          &times;
        </button>
      )}

      {loading && <div className="mt-1 text-sm text-gray-500">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-lg border bg-white shadow-md">
          {suggestions.map((item: IMenu, idx: number) => (
            <li
              key={idx}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => handleSelect(item.name, item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;
