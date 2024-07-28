# Skill Bridge Hub Project 02
Skill Bridge Hub is an advanced task bidding platform designed to address the gap for service professionals outside the software industry. Targeting urban areas, this platform connects diverse professionals with job opportunities, offering an inclusive and efficient service marketplace.

## Instructions

1. To run the frontend - First, go to the frontend directory and install the node modules using the following code.
```
npm install
```

2. Then run the frontend using the following code.
```
npm run dev
```

3. To run the backend - Go to the backend directory and install the node modules using the following code.
```
npm install
```
4. Then run the backend using the following code.
```
npm start
```
##### Note
- If you are using different database name and password update them in the `.env` file
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=itp <-- Replace this with your database name
DB_USERNAME=root <-- Replace this with your username
DB_PASSWORD= <-- Add your database password(if there's any)
```
- If you don't have a MySQL Database in your computer make one by visting `http://localhost/phpmyadmin`

4. Generate a new key by running the following command
```
php artisan key:generate
```

5. Migrate the databases
```
php artisan migrate
```

6. To run the app, run the following command and goto the link given(CTRL + click the link)
```
php artisan serve
```
