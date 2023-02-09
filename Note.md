## Source code:

https://github.com/gitdagray/mern_stack_course

# Test case

## Chapter 6 - MERN Redux & RTK Query

## Chapter 7 - MERN Forms with Redux & RTK Query

- CRUD operations with Redux & RTK Query

## Chapter 8 - MERN Authentication & Authorization

- Authentication is the process of verifying who a user is, while authorization is the process of verifying what they have access to.

- JSON Web Token

* JWT is a standard for representing claims securely between two parties.
* JWT is a string that contains three parts: header, payload, and signature.
* JWT is a stateless authentication mechanism.
* JWT is a self-contained way of securely transmitting information between parties as a JSON object.

Uses Authorization header to send the token.
Sent with every HTTP request to the server.
Allows assess to API endpoints.
Endpoints provide data resources.

- Rate limiting middleware
  npm i express-rate-limit jsonwebtoken

\*\* JWT: Access token(short time) and Refresh token(long time)

- Access token

  - Short-lived
  - Used to access protected resources
  - Sent in the Authorization header
  - Expires in 15 minutes

  - Issued after Authentication
  - Client uses for API Access until expires
  - Verify with Middleware
  - New token issued at Refresh request

  * Sent as Json client store in memory DO NOT STORE IN LOCAL STORAGE or COOKIES

- Refresh token

  - Long-lived
  - Used to get a new access token
  - Sent in the request body
  - Expires in 7 days

  - Issued after Authentication
  - Verify with endpoint
  - Used to request new Access token
  - Must be allowed to expire or logout

  * Sent as HttpOnly cookie, Not accessible via JavaScript, Must have expiry at some point

ACCESS_TOKEN_SECRET: require('crypto').randomBytes(64).toString('hex'),

- Create middleware to verify token

  - Verify token
  - Get user from token
  - Attach user to request object
  - Call next middleware
    => apply to all routes

## Chapter 9 - MERN Login Authentication in React with Redux

1. Create authSlice and add to redux store
2. Create authApiSlice
3. Create Login form component
4. Add Logout Button on header
5. Test
6. Refactor NewNote.js
7. Unauthenticated users can't access protected routes[problem]

## Chapter 10 - MERN JWT Authorization & Persisting Login State on Refresh

1. pi folder [Send access token with a baseQuery]
2. Test the baseQuery requests
3. baseQueryWithReauth wrapper function
4. Test the baseQueryWithReauth requests
5. Fix for useQuery when it doesn't unsubscribe
6. usePersist custom hook , Add Persist toggle to Login form
7. Persist Login component
8. Set credentials with onQueryStarted
9. Add PersistLogin to App.js
10. Test the Persistent Login State
