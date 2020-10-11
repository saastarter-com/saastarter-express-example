# SaaStarter Node.js example



This repository provides an example on how to use [SaaStarter.com](https://saastarter.com) with a custom Node.js backend.
It supports

- FireStore access
- User authentication
- Load subscriptions / one-time payments for user
- Firebase emulator


A Firebase Service account is required for this project. See this [Stackoverflow question](https://stackoverflow.com/a/40799378) on how to obtain a `service-account.json`.

## Run it

1. Get a Firebase service account. Place `service-account.json` in the root of this project.

2. Install dependencies.

```bash
npm install
```

3. Run server.

```bash
npm run dev
```

4. Open [localhost:8000](http://localhost:8000).

## Example API

[src/index.js](src/index.js) contains three examples which illustrate how to use the server in connection to SaaStarter.


Route **/** checks if express can read from FireStore.

Route **/auth-required** checks if request is authenticated by providing a Bearer token. See below.

Route **/subscriptions** reads the subscriptions of the authenticated user.

## Call API from Nuxt

> This example uses the [@nuxtjs/axios](https://axios.nuxtjs.org/) module.

Send an authenticated request to the node server.

```js
const userToken = await this.$fireAuth.currentUser.getIdToken(true);
const response = await this.$axios.get(
  "http://localhost:8000/auth-required",
  {
    headers: {
      authorization: "Bearer " + userToken,
    },
  }
);
console.log("response", response.data);
```

## Notes

For more information checkout

- [saastaarter.com](https://saastareter.com)
- [SaaStarter documentation](https://docs.saastarter.com)
