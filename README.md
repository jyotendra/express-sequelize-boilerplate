# express-sequelize-boilerplate
Boilerplate for express sequelize with local user auth usng jwt

Will need to add a .env or .env.dev file depending on  your needs. A sample .env would be like:

```
DB_USERNAME="express-sequelize"
DB_PASSWORD="12345"
DB_NAME="express-sequelize"
DB_HOST="127.0.0.1"
DB_DIALECT="postgres"
DB_PORT="5432"

APP_KEY="1frefjn348998989"
APP_URL="http://localhost:3000/api"

EMAIL_SENDER="express-admin@gmail.com"
EMAIL_HOST="smtp.mailtrap.io"
EMAIL_PORT="2525"
EMAIL_USERNAME="fvdfvdfv"
EMAIL_PASSWORD="tyhy565656"

```


## Running Application

In one terminal run the build command: ```npm run build``` and in another terminal run serve command: ```npm run serve```. In Ubuntu system nodemon might give error of "watch file limit reached". To increase this limit use this command: ```sudo sysctl -w fs.inotify.max_user_watches=100000 ```.
