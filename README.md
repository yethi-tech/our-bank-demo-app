This is a mock Application to be used for demonstrating the capabilities of Tenjin Enterprise / TenjinOnline. It acts as a Core Banking platform with simple transactions.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and is a full stack application. The main components are:

- The core application server (full-stack on Next.js)
- Postgres Database
- Uses next-auth for authentication

## Getting Started

First, you need to have a Postgresql DB. You can run it on docker, using the following command

```bash
docker run --name=my_pg_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=my_db -p 5432:5432 -d postgres
```

Then, you need to setup a few environment variables. Create a `.env` file in the root of your project, with the following content:

```
DATABASE_URL="postgres://localhost:5432/my_db?pgbouncer=true&connect_timeout=15"
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
