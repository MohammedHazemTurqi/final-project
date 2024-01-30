import { useState } from "react";
import { useAppStore } from "../../store";
import "./searchBox.css";
import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
  const [value, setValue] = useState();
  const { setSearchKey } = useAppStore();

  return (
    <div className="search-box">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearchKey(value);
          }
        }}
      />
      <button onClick={() => setSearchKey(value)}>
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchBox;
