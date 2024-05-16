import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center justify-center">
      <input
        type="text"
        placeholder="Khilaf apa hari ini?"
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none text-black"
      />
      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded-r-md hover:bg-pink-600 focus:outline-none focus:ring focus:border-blue-300"
        aria-label="Cari"
      >
        <AiOutlineSearch className="w-6 h-6" />
      </button>
    </form>
  );
};

export default SearchBar;
