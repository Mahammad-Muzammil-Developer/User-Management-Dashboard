import {
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiTrendingUp,
} from "react-icons/fi";

export const StatsCards = ({ users }) => {

  const totalUsers = users.length;

  const departments = [
    ...new Set(users.map(user => user.department))
  ].length;

  const activeUsers = users.filter(
    user => user.email
  ).length;

  const newUsers = Math.min(8, totalUsers);

  return (

    <div className="stats">

      <div className="card">

        <div className="card-top">

          <div>

            <p className="card-title">
              Total Users
            </p>

            <h2 className="card-value">
              {totalUsers}
            </h2>

            <p className="card-sub">
              Registered Users
            </p>

          </div>

          <div className="card-icon users">
            <FiUsers />
          </div>

        </div>

      </div>

      <div className="card">

        <div className="card-top">

          <div>

            <p className="card-title">
              Active Users
            </p>

            <h2 className="card-value">
              {activeUsers}
            </h2>

            <p className="card-sub">
              Active Accounts
            </p>

          </div>

          <div className="card-icon active">
            <FiUserCheck />
          </div>

        </div>

      </div>

      <div className="card">

        <div className="card-top">

          <div>

            <p className="card-title">
              Departments
            </p>

            <h2 className="card-value">
              {departments}
            </h2>

            <p className="card-sub">
              Total Departments
            </p>

          </div>

          <div className="card-icon department">
            <FiBriefcase />
          </div>

        </div>

      </div>

      <div className="card">

        <div className="card-top">

          <div>

            <p className="card-title">
              New Users
            </p>

            <h2 className="card-value">
              {newUsers}
            </h2>

            <p className="card-sub">
              This Month
            </p>

          </div>

          <div className="card-icon new">
            <FiTrendingUp />
          </div>

        </div>

      </div>

    </div>

  );
};