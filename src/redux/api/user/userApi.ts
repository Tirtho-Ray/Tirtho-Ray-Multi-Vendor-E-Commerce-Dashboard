import { baseApi } from "../baseApi";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query<User[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response: { data: User[] }) => response.data,
    }),

    createAdmin: builder.mutation<User, Partial<User>>({
      query: (credentials) => ({
        url: "/users/create-admin",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    softDeleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/soft-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    hardDeleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/hard-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAllUsersQuery,
  useCreateAdminMutation,
  useSoftDeleteUserMutation,
  useHardDeleteUserMutation,
} = userApi;
