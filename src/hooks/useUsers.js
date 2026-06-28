import { useEffect, useState } from "react";
import * as userService from "../api/userService";
import { mapUserData } from "../utils/helpers";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await userService.getUsers();

      const mappedUsers = response.data.map(mapUserData);

      setUsers(mappedUsers);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (user) => {
    try {
      const response = await userService.createUser(user);

      const newUser = mapUserData(response.data);

      setUsers((prev) => [...prev, newUser]);

      return newUser;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateUser = async (id, user) => {
    try {
      const response = await userService.updateUser(id, user);

      const updated = mapUserData(response.data);

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? updated : u))
      );

      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      await userService.deleteUser(id);

      setUsers((prev) =>
        prev.filter((u) => u.id !== id)
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    users,
    setUsers,
    loading,
    error,
    setError,
    refetch: fetchUsers,
    addUser,
    updateUser,
    deleteUser,
  };
};