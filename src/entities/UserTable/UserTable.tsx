import { useState } from 'react';
import './UserTable.css';

interface User {
  name: { first: string; last: string };
  picture: { thumbnail: string; large: string };
  location: { state: string; city: string };
  email: string;
  phone: string;
  registered: { date: string };
}

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  const [tooltip, setTooltip] = useState<{
    visible: Boolean;
    x: number;
    y: number;
    imageUrl: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    imageUrl: '',
  });

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    imageUrl: string,
  ) => {
    const x = event.clientX + 10;
    const y = event.clientY + 10;
    setTooltip({ visible: true, x, y, imageUrl });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, imageUrl: '' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фото</th>
            <th>Город</th>
            <th>Почта</th>
            <th>Телефон</th>
            <th>Дата регистрации</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>
                {user.name.first} {user.name.last}
              </td>
              <td>
                <img
                  src={user.picture.thumbnail}
                  alt={user.name.first}
                  onMouseEnter={(e) => handleMouseEnter(e, user.picture.large)}
                  onMouseLeave={handleMouseLeave}
                />
              </td>
              <td>
                {user.location.city}, {user.location.state}
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{formatDate(user.registered.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {tooltip.visible && (
        <div
          className="tooltip"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
          }}
        >
          <img src={tooltip.imageUrl} alt="Large" />
        </div>
      )}
    </div>
  );
};

export default UserTable;
