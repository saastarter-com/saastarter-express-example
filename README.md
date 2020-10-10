# SaaStarter ExpressJs example

This repository provides an example on how to use SaaStarter with a custom NodeJs backend.
It supports

- FireStore access
- User authentication
- Load subscriptions / one-time payments for user
- Firebase emulator


A Firebase Service account is required for this project. See this [Stackoverflow question](https://stackoverflow.com/a/40799378) on how to obtain a `service-account.json`.

### Run it

1. Get a Firebase service account and place it in the root of this project with the name `service-account.json`.

2. Install dependencies.
```bash
npm install
```

3. Run server.
```bash
# Run the server
npm run dev
```

4. Open [localhost:8000](http://localhost:8000).

