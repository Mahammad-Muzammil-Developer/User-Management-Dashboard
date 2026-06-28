import { FiSearch } from "react-icons/fi";

export const SearchBar = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="search-box">

      <FiSearch
        className="search-icon"
        size={20}
      />

      <input
        type="text"
        placeholder="Search users by name or email..."
        value={searchQuery}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
      />

    </div>
  );
};