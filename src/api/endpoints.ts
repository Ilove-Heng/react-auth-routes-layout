export const ENDPOINTS = {
    USERS: {
      LIST: '/users',
      DETAIL: (id: number) => `/users/${id}`,
      CREATE: '/users',
      UPDATE: (id: number) => `/users/${id}`,
      DELETE: (id: number) => `/users/${id}`,
    }
} as const;