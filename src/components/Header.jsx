import { FiBell } from "react-icons/fi";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>User Management Dashboard</h1>
        <p>
          Manage users, departments and account information efficiently.
        </p>
      </div>

      <div className="header-right">

        <div className="notification">
          <FiBell size={20} />
        </div>

        <div className="profile">

          <div className="avatar">
            A
          </div>

          <div>
            <h4>Administrator</h4>
            <p>admin@company.com</p>
          </div>

        </div>

      </div>
    </header>
  );
};