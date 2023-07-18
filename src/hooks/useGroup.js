import { useState } from "react";
import {
  getGroupToIdApi,
  getGroupApi,
  addGroupApi,
  updateGroupApi,
  deleteGroupApi,
} from "../api/group";
import { useAuth } from "./";

export function useGroup() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState(null);
  const data = [];

  const getGroupToId = async (idGroup) => {
    try {
      setLoading(true);
      const response = await getGroupToIdApi(idGroup);
      setLoading(false);

      data.push(response);
      setGroups(data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getGroup = async () => {
    try {
      setLoading(true);
      const response = await getGroupApi();
      setLoading(false);
      setGroups(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addGroup = async (data) => {
    try {
      setLoading(true);
      const response = await addGroupApi(data, auth.token);
      setLoading(false);
      setGroups(response);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updateGroup = async (id, data) => {
    try {
      setLoading(true);
      await updateGroupApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteGroup = async (id) => {
    try {
      setLoading(true);
      await deleteGroupApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    error,
    loading,
    groups,
    getGroup,
    getGroupToId,
    addGroup,
    updateGroup,
    deleteGroup,
  };
}
