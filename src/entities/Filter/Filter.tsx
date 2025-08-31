import type { ChangeEvent } from 'react';
import './Filter.css';

interface FilterProps {
  onFilterChange: (value: string) => void;
  onReset: () => void;
  filterValue: string;
}

const Filter = ({ onFilterChange, onReset, filterValue }: FilterProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Фильтр"
        value={filterValue}
        onChange={handleChange}
        className="filter-input"
      />
      <button onClick={onReset} className="reset-button">
        Сброс
      </button>
    </div>
  );
};

export default Filter;
