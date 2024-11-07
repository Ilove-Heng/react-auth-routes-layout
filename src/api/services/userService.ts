import { API_BASE_URL, apiConfig } from '../config';
import { ENDPOINTS } from '../endpoints';


export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: {
      name: string;
    };
    address: {
      street: string;
      city: string;
    };
  }

  export interface CreateUserInput {
    name: string;
    email: string;
    phone: string;
  }
  
export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.USERS.LIST}`, 
      apiConfig
    );
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.USERS.DETAIL(id)}`, 
      apiConfig
    );
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  },

  createUser: async (user: CreateUserInput): Promise<User> => {
    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.USERS.CREATE}`,
      {
        ...apiConfig,
        method: 'POST',
        body: JSON.stringify(user),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },

  updateUser: async (id: number, user: Partial<CreateUserInput>): Promise<User> => {
    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.USERS.UPDATE(id)}`,
      {
        ...apiConfig,
        method: 'PUT',
        body: JSON.stringify(user),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  },

  deleteUser: async (id: number): Promise<void> => {
    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.USERS.DELETE(id)}`,
      {
        ...apiConfig,
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  },
};