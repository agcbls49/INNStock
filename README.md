# INNStock
An inventory management system for electronic products. 

> [!NOTE]
> **Admin only login and not mobile responsive.** <br>
> Search button will not work unless the user chooses from the drop down menus or inputs text in the search field. To reset the view, simply choose the **"All"** option in the drop down menus. <br>
> To delete the account, the account password must be entered first.

> [!IMPORTANT]
> Docker doesn't work due to TanStack dependency but the **project works locally.**

## Login Credentials
Email: admin@example.com
<br>
Password: Admin123!

## Features
1. Authentication (Login, Sign Up, and Log Out)
2. Change Password
3. Delete Account
4. Show the Top 5 Products Low in Stock or Out of Stock
5. Download Product List as CSV
6. Filter search by Computer Parts
7. Filter search by Computer Accessories
8. Filter search by Product Stock Status
7. Add, Edit, and Delete a Product
8. Pagination

## Screenshots
### Login
<img width="1887" height="327" alt="Image" src="https://github.com/user-attachments/assets/8b6511a0-9505-4bf0-9ed5-d4a85f0272b5" />

### Sign Up
<img width="1886" height="403" alt="Image" src="https://github.com/user-attachments/assets/3cbf506c-00e8-4e80-a4bb-7e71c2cadbaf" />

### Dashboard
<img width="1877" height="892" alt="Image" src="https://github.com/user-attachments/assets/6303c7d6-b6ba-46aa-8a49-7778cc35da1e" />

### Products Table
<img width="1887" height="760" alt="Image" src="https://github.com/user-attachments/assets/3b1449d4-0ace-4a09-8892-70109d2bd3cd" />

### Search with Filter
<img width="1886" height="652" alt="Image" src="https://github.com/user-attachments/assets/b2b592eb-401a-4eb1-a0d2-1edc0935bcf8" />

### Add a Product
<img width="1885" height="766" alt="Image" src="https://github.com/user-attachments/assets/9a1e3125-cdd6-43f7-b132-86d9c6b132e5" />

### Edit a Product
<img width="1882" height="751" alt="Image" src="https://github.com/user-attachments/assets/5890958e-7256-40a7-b499-714be0582c2c" />

### Delete a Product
<img width="1882" height="332" alt="Image" src="https://github.com/user-attachments/assets/824cc335-b4f3-4f40-9600-5fbee6d7db47" />

### Update Password/Delete Account
<img width="888" height="560" alt="Image" src="https://github.com/user-attachments/assets/e80d79b5-946e-41c3-afb5-dc3334b8a304" />

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
Docker*
