import { create } from "zustand";
import { api } from "@/src/services/api";
import { produce } from "immer";

interface User {
  id?: number;
  name: string;
  email: string;
}

interface UsersStore {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  createUser: (user: Omit<User, "id">) => Promise<void>;
  updateUser: (id: number, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/users");
      set({ users: data });
    } catch (error) {
      set({ error: "Error al obtener usuarios" });
      console.error("Error al obtener usuarios:", error);
    } finally {
      set({ loading: false });
    }
  },

  createUser: async (user) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/users", user);
      set((state) =>
        produce(state, (draft) => {
          draft.users.push(data);
        })
      );
    } catch (error) {
      set({ error: "Error al crear usuario" });
      console.error("Error al crear usuario:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (
    id: number,
    userData: Partial<User> & { password?: string }
  ) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.put(`/users/${id}`, userData);
      set((state) => ({
        users: state.users.map((user) => (user.id === id ? data : user)),
      }));
    } catch (error) {
      set({ error: "Error al actualizar usuario" });
      console.error("Error al actualizar usuario", error);
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      set({ error: "Error al eliminar usuario" });
      console.error("Error al eliminar usuario", error);
    } finally {
      set({ loading: false });
    }
  },
}));
