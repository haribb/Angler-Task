import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Access the client
// const queryClient = useQueryClient();

// Queries

export const customUseQuery = (key: any, endPoint: any) => {
  return useQuery({ queryKey: key, queryFn: endPoint });
};


