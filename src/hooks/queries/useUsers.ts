import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, type CreateUserInput } from '../../api/services/userService';

export const QUERY_KEYS = {
    USERS: 'users',
    USER: (id: number) => ['users', id],
  } as const;


  export function useUsers() {
    return useQuery({
      queryKey: [QUERY_KEYS.USERS],
      queryFn: userService.getUsers,
    });
  }

  export function useUser(id: number) {
    return useQuery({
      queryKey: QUERY_KEYS.USER(id),
      queryFn: () => userService.getUserById(id),
    });
  }
  
  export function useCreateUser() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (user: CreateUserInput) => userService.createUser(user),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      },
    });
  }

  export function useUpdateUser(id: number) {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (user: Partial<CreateUserInput>) => userService.updateUser(id, user),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER(id) });
      },
    });
  }

  export function useDeleteUser() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: userService.deleteUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      },
    });
  }