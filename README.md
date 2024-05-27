# personal-finance-tracker

This app has a set of APIs meant to manage basic customer account information.

How to run the app

After cloning the repo create .env file, the is a .env.sample to guide you. Make sure all values are populated

Run below commands to in stall dependencies and run the application

`npm install`

`npm start` or `npm run dev`

The app will run on port 3500 for dev or 3000

There is are post install scripts that take care of building the source code and optimize it for deployment.

Frontend is served as static files by nodejs so this applocation can be deployed as one instance on a single server.

The app is built using Nodejs on the backend paired with a React frontend. Sqlite3 has been used for the database for this prototype.
Decision to use a file based data has been advised by the need to siplify the setup process for the reviewer and any other persom who would like to play with the application. If the application was to be deployed to a live environment I would swapped the database with mysql or postges.

Code is purely written in typescript on the backend and a mix of jsx and js on the frontend.

Testing

Visit http://localhost:3000 or http://localhost:3500 this advised by the port you run the application on.

Click signup and register as a user after which you will be redirected to login page.

Login and start recording transations.

To track goals click on Goals tracker and create a goal.

From goals view screen you top up a goal or remove it by deleting it.

All transactions for goals are tracked as nomal transactions behind the scenes updating user balance accordingly.

To view detailed insights click on insights link.

Once done using the app feel free to log out.
