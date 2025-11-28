import React from "react";

export const SearchBar: React.FC<{
  value: string;
  onChange: (v: string) => void;
  filter: string;
  onFilterChange: (v: string) => void;
}> = ({ value, onChange, filter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-3 items-center bg-white p-3 rounded-xl shadow">
      <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-gray-50 w-full md:w-1/2">
        {/* <svg className="w-1 h-1 text-gray-400" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
        </svg> */}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search projects..."
          className="bg-transparent outline-none w-full"
        />
      </div>

      <select
        className="px-3 py-2 rounded-md border"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="survey">Survey</option>
        <option value="mapping">Mapping</option>
        <option value="inspection">Inspection</option>
      </select>
    </div>
  );
};
export default SearchBar;
