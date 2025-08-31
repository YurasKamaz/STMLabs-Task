import { useState, useEffect } from 'react';
import useDebounce from '@shared/hooks/useDebounce';
import UserTable from '@entities/UserTable/UserTable';
import Filter from '@entities/Filter/Filter';
import './App.css';

interface User {
  name: { first: string; last: string };
  picture: { thumbnail: string; large: string };
  location: { state: string; city: string };
  email: string;
  phone: string;
  registered: { date: string };
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [immediateFilter, setImmediateFilter] = useState<string>('');
  const [debouncedFilter, setDebouncedFilter] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const debouncedSetFilter = useDebounce(setDebouncedFilter, 300);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://randomuser.me/api/?results=15');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.results);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleFilterChange = (value: string) => {
    setImmediateFilter(value);
    debouncedSetFilter(value);
  };

  const resetFilter = () => {
    setImmediateFilter('');
    setDebouncedFilter('');
  };

  const filteredUsers = users.filter(user => {
    const searchTerm = debouncedFilter.toLowerCase();

    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const location = `${user.location.city}, ${user.location.state}`.toLowerCase();
    const email = user.email.toLowerCase();
    const phone = user.phone.toLowerCase();

    return (
      fullName.includes(searchTerm) ||
      location.includes(searchTerm) ||
      email.includes(searchTerm) ||
      phone.includes(searchTerm)
    );
  });

  return (
    <div className="container">
      <h1>Пользователи</h1>
      <Filter
        onFilterChange={handleFilterChange}
        onReset={resetFilter}
        filterValue={immediateFilter}
      />
      {loading && <p>Загрузка...</p>}
      {error && <p className="error">Произошла ошибка: {error}</p>}
      {!loading &&
        !error &&
        (filteredUsers.length > 0 ? (
          <UserTable users={filteredUsers} />
        ) : (
          <p>Ничего не найдено.</p>
        ))}
    </div>
  );
};

export default App;
