# My-2026-Stack-Template
This template uses the following technologies: 
1. Next.js (Frontend)
2. Shadcn UI (Frontend - Nova Template)
3. Express.js (Backend)
4. PostgreSQL (Database)
5. Drizzle (ORM)
6. Better Auth (Authentication)

## Use this Template
Click `Use this template` button and select `Create a new repository` then modify needed details. Install GitHub Desktop and create a folder to put this cloned project. In GitHub make sure that `C:\Users\YourUsername\Documents\YourFolder\` is selected as a directory and copy the url of this project. Once cloned, the folder will now have the following inside:
```
frontend
backend
README.md
```

Install dependencies:
```
cd frontend/
npm install
cd ..
```

Inside backend, if the `package.json` is missing then do `npm init -y` and install dependencies:

```
cd backend/
npm install
cd ..
```

## Run the Template
Make sure PostgreSQL is running in pgAdmin.

Open two terminals. Do this for the frontend:
```
cd frontend/
npm run dev
```

Do this for the backend:
```
cd backend/
npm run db:migrate
npm run db:seed
npm run dev
```

**NOTE: Make sure both the two localhost are opened by doing the commands above.**

Check API json object by pasting this in the browser tab: `http://localhost:4000/api`
