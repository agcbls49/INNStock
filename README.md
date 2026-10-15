# INNStock
An inventory management system for electronic products. 

> [!NOTE]
> Admin only login and not mobile responsive.
> Search button will not work unless the user chooses from the drop down menus or inputs text in the search field. To reset the view, simply choose the "All" option in the drop down menus.
> Docker doesn't work due to TanStack dependency but the project works locally.

## Login Credentials
Email: admin@example.com
<br>
Password: Admin123!

## Generate Better Auth Secret
Open Git Bash inside the root directory (Innstock) and run this command:
```
openssl rand -base64 32
```
Create .env files in the appropriate directories. Copy and paste the values from the .env.example to the .env files you created. Input the correct values and the Better Auth Secret.

## Tech Stack

**Frontend:**
1. Shadcn UI
2. React
3. Next.js

**Backend:**
1. Express.js
2. Better Auth
3. Drizzle ORM
4. PostgreSQL Database

**Tool:**
<br>
*Docker*