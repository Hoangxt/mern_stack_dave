import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// createEntityAdapter creates selectors and action creators for the normalized state
const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState(); // {ids: [], entities: {}}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        // transform the response data to match the normalized state
        const loadedUsers = responseData.map((user) => {
          // [{_id: 1, name: "John"}, {_id: 2, name: "Jane"}]
          user.id = user._id;
          return user;
        });
        // {ids: [1, 2], entities: {1: {_id: 1, name: "John"}, 2: {_id: 2, name: "Jane"}}}
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      // tags are used to invalidate the cache
      providesTags: (result, error, arg) => {
        // arg is the query arg
        if (result?.ids) {
          // if the query result is not empty
          return [
            // return an array of tags
            { type: "User", id: "LIST" }, // tag for the list of users
            ...result.ids.map((id) => ({ type: "User", id })), // tags for each user
          ];
        } else return [{ type: "User", id: "LIST" }]; // if the query result is empty
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState // if the query result is empty, return the initial state
);
