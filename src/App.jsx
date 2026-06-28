import { useMemo, useState } from "react";
import {
  FiFilter,
  FiUserPlus,
} from "react-icons/fi";
import "./styles/App.css";
import { StatsCards } from "./components/StatsCards";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { UserTable } from "./components/UserTable";
import { Pagination } from "./components/Pagination";
import { FilterPopup } from "./components/FilterPopup";
import { UserForm } from "./components/UserForm";
import { ConfirmDelete } from "./components/ConfirmDelete";

import { useUsers } from "./hooks/useUsers";
import { DEFAULT_PAGE_SIZE } from "./utils/constants";

function App() {
  const {
    users,
    loading,
    error,
    setUsers,
  } = useUsers();

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [sortField, setSortField] = useState("firstName");

  const [sortOrder, setSortOrder] = useState("asc");

  const [showFilter, setShowFilter] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const filteredUsers = useMemo(() => {
    let data = [...users];

    // SEARCH

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      data = data.filter(
        (user) =>
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    // FILTERS

    if (filters.firstName.trim()) {
      data = data.filter((user) =>
        user.firstName
          .toLowerCase()
          .includes(filters.firstName.toLowerCase())
      );
    }

    if (filters.lastName.trim()) {
      data = data.filter((user) =>
        user.lastName
          .toLowerCase()
          .includes(filters.lastName.toLowerCase())
      );
    }

    if (filters.email.trim()) {
      data = data.filter((user) =>
        user.email
          .toLowerCase()
          .includes(filters.email.toLowerCase())
      );
    }

    if (filters.department.trim()) {
      data = data.filter(
        (user) => user.department === filters.department
      );
    }

    // SORT

    data.sort((a, b) => {
      const first = a[sortField];
      const second = b[sortField];

      if (first < second)
        return sortOrder === "asc" ? -1 : 1;

      if (first > second)
        return sortOrder === "asc" ? 1 : -1;

      return 0;
    });

    return data;
  }, [
    users,
    searchQuery,
    filters,
    sortField,
    sortOrder,
  ]);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  const handleSort = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setSelectedUser(id);
    setShowDelete(true);
  };

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setShowFilter(false);
  };

  const handleUserSubmit = (user) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
              ...u,
              ...user,
              id: editingUser.id,
            }
            : u
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          ...user,
          id: Date.now(),
          phone: user.phone || "",
        },
      ]);
    }

    setShowForm(false);
    setEditingUser(null);
  };

  const handleDeleteConfirm = () => {
    setUsers((prev) =>
      prev.filter((u) => u.id !== selectedUser)
    );

    setShowDelete(false);
    setSelectedUser(null);
  };

  const selectedUserData = users.find(
    (u) => u.id === selectedUser
  );

  if (loading) {
    return (
      <h2 style={{ padding: 40 }}>
        Loading users...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 style={{ padding: 40 }}>
        {error}
      </h2>
    );
  }
  console.log(users.length);
  return (
    <div className="app">
      <Header />
      <StatsCards users={users} />
      <div className="toolbar">

        <div className="toolbar-left">

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={(value) => {
              setSearchQuery(value);
              setCurrentPage(1);
            }}
          />

        </div>

        <div className="toolbar-right">

          <button
            className="btn-secondary"
            onClick={() => setShowFilter(true)}
          >
            <FiFilter size={18} />
            <span>Filter</span>
          </button>

          <button
            className="btn-primary"
            onClick={() => {
              setEditingUser(null);
              setShowForm(true);
            }}
          >
            <FiUserPlus size={18} />
            <span>Add User</span>
          </button>

        </div>

      </div>

      <UserTable
        users={paginatedUsers}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={filteredUsers.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      <FilterPopup
        isOpen={showFilter}
        users={users}
        onClose={() => setShowFilter(false)}
        onApply={handleFilterApply}
      />

      <UserForm
        isOpen={showForm}
        editingUser={editingUser}
        isLoading={false}
        onClose={() => {
          setShowForm(false);
          setEditingUser(null);
        }}
        onSubmit={handleUserSubmit}
      />

      <ConfirmDelete
        isOpen={showDelete}
        userName={
          selectedUserData
            ? `${selectedUserData.firstName} ${selectedUserData.lastName}`
            : ""
        }
        isLoading={false}
        onCancel={() => {
          setShowDelete(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );

}

export default App;