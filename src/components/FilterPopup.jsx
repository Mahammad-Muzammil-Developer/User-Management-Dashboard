import { useState } from "react";

export const FilterPopup = ({ isOpen, onClose, onApply, users }) => {
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const departments = [...new Set(users.map((u) => u.department))];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Filter Users</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="filter-popup-container">
            <div className="filter-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={filters.firstName}
                onChange={handleChange}
                placeholder="Filter by first name..."
              />
            </div>
            <div className="filter-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={filters.lastName}
                onChange={handleChange}
                placeholder="Filter by last name..."
              />
            </div>
            <div className="filter-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                name="email"
                value={filters.email}
                onChange={handleChange}
                placeholder="Filter by email..."
              />
            </div>
            <div className="filter-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                value={filters.department}
                onChange={handleChange}
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={handleReset}>
            Reset
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
