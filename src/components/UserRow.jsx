import { FiEdit2, FiTrash2 } from "react-icons/fi";

export const UserRow = ({ user, onEdit, onDelete }) => {

  const initials =
    `${user.firstName[0]}${user.lastName[0]}`;

  const getBadgeClass = (department) => {
    switch (department) {
      case "IT":
        return "badge IT";

      case "Engineering":
        return "badge Engineering";

      case "Sales":
        return "badge Sales";

      case "Marketing":
        return "badge Marketing";

      case "Finance":
        return "badge Finance";

      case "HR":
        return "badge HR";

      default:
        return "badge";
    }
  };

  return (
    <tr>

      <td>
        {user.id}
      </td>

      <td>

        <div className="user-name">

          <div className="user-avatar">
            {initials}
          </div>

          <div>

            <strong>
              {user.firstName} {user.lastName}
            </strong>

          </div>

        </div>

      </td>

      <td className="user-email">
        {user.email}
      </td>

      <td>

        <span
          className={getBadgeClass(user.department)}
        >
          {user.department}
        </span>

      </td>

      <td>
        {user.phone}
      </td>

      <td>

        <div className="actions-cell">

          <button
            className="btn-edit"
            onClick={() => onEdit(user)}
          >
            <FiEdit2 />
          </button>

          <button
            className="btn-delete"
            onClick={() => onDelete(user.id)}
          >
            <FiTrash2 />
          </button>

        </div>

      </td>

    </tr>
  );
};