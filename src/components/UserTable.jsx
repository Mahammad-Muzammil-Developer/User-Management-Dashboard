import { UserRow } from "./UserRow";

export const UserTable = ({
  users,
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}) => {

  if (!users.length) {

    return (
      <div className="empty-message">
        <h2>No Users Found</h2>
        <p>
          Try changing your search or filters.
        </p>
      </div>
    );

  }

  const sort = (field) => {

    if (sortField === field) {

      onSort(
        field,
        sortOrder === "asc"
          ? "desc"
          : "asc"
      );

    } else {

      onSort(field, "asc");

    }

  };

  const indicator = (field) => {

    if (sortField !== field) return "";

    return sortOrder === "asc"
      ? " ▲"
      : " ▼";

  };

  return (

    <div className="table-container">

      <table className="users-table">

        <thead>

          <tr>

            <th>ID</th>

            <th onClick={() => sort("firstName")}>
              User {indicator("firstName")}
            </th>

            <th onClick={() => sort("email")}>
              Email {indicator("email")}
            </th>

            <th onClick={() => sort("department")}>
              Department {indicator("department")}
            </th>

            <th>Phone</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <UserRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />

          ))}

        </tbody>

      </table>

    </div>

  );

};