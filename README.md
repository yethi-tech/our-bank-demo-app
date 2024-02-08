This is a mock Application to be used for demonstrating the capabilities of Tenjin Enterprise / TenjinOnline. It acts as a Core Banking platform with simple transactions.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and is a full stack application. The main components are:

- The core application server (full-stack on Next.js)
- Postgres Database
- Uses next-auth for authentication

## Getting Started

Follow these steps to get your dev environment up and running. Firstly, you need to create an `.env` file at the root of your project. We will populate this file in a short while.

### Setting up the database

First, you need to have a Postgresql DB. You can run it on docker, using the following command

```bash
docker run --name=my_pg_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=my_db -p 5432:5432 -d postgres
```

Once the database is installed, run the following command

```bash
npm run db-setup
```

This command populates the database with the necessary tables.

Once this is done, run the following command

```bash
npm run seed
```

This will create the initial data required in the database.

Now, go to your `.env` file and add the following line, which specifies the DB connection string.

```
DATABASE_URL="postgres://localhost:5432/my_db?pgbouncer=true&connect_timeout=15"
```

### Adding the OpenSSL Key

You must generate an OpenSSL secret that will be used to encrypt session data. In a terminal, run

```bash
openssl rand -base64 32
```

This command outputs an encrypted key. We will use this in the next step.

In the `.env` file, add the following line

```
AUTH_SECRET="{{your_generated_openssl_key}}"
```

### Running the Application

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Debugging the application in VSCode

If you wish to debug the application in VSCode, you need to create a `launch.json`, as follows

1. Create a folder called `.vscode` at the root of the project, in that folder, create a `launch.json` file.
2. Copy the following content to the `launch.json`

   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Next.js: debug server-side",
         "type": "node-terminal",
         "request": "launch",
         "command": "npm run dev"
       },
       {
         "name": "Next.js: debug client-side",
         "type": "chrome",
         "request": "launch",
         "url": "http://localhost:3000"
       },
       {
         "name": "Next.js: debug full stack",
         "type": "node-terminal",
         "request": "launch",
         "command": "npm run dev",
         "serverReadyAction": {
           "pattern": "- Local:.+(https?://.+)",
           "uriFormat": "%s",
           "action": "debugWithChrome"
         }
       }
     ]
   }
   ```

Once you've followed the above steps, click the **Run & Debug** button on the VSCode sidebar, or `Ctrl+Shift+D`. This will bring up the debug window. Click on the Play button to launch the application. You will now be able to insert breakpoints and debug the application.
