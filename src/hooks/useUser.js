import { useState } from "react";
import {
  addUserApi,
  getMeAPi,
  getUsersApi,
  getUserByIdApi,
  updateUserApi,
  deleteUserApi,
} from "../api/user";
import { useAuth } from ".";

export function useUser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState([]);

  const { auth } = useAuth();

  const getMe = async (token) => {
    try {
      const response = await getMeAPi(token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsersApi(auth.token);
      setLoading(false);
      setUsers(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getUserById = async (id) => {
    try {
      setLoading(true);
      const response = await getUserByIdApi(id, auth.token);
      setLoading(false);
      setUser(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addUser = async (data) => {
    try {
      setLoading(true);
      const response = await addUserApi(data, auth.token);
      setLoading(false);
      setUsers(response);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updateUser = async (id, data) => {
    try {
      setLoading(true);
      await updateUserApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await deleteUserApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    users,
    user,
    getUsers,
    getUserById,
    error,
    getMe,
    addUser,
    updateUser,
    deleteUser,
  };
}
