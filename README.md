# Hey there!

**K Groups** is an app for class-based Slack teams. K Groups puts your students into small groups of a few students based on their course progress. This helps facilitate natural conversations between peers, reducing isolation, and improving learning outcomes.

Visit [http://kgroups.org](http://kgroups.org) to get started.

## How it works

**Educators** log into K Groups and set up your course structure. A course structure is just a list of tasks that students will check off as they begin and complete each task. Once the course structure is set up, an instructor can add K Groups to their Slack team. This will import all of the members of the Slack team into the K Groups course.

**Students** will simply check off their progress in their task list as they progress through the class. They can be
enrolled in as many courses (and as many Slack teams) as needed.

**Clusters** of students are computed using [k-means clustering](https://en.wikipedia.org/wiki/K-means_clustering), a simple unsupervised machine learning algorithm to group students into groups with similar progress. These clusters are used to generate Slack channels for the students. K Groups handles the creation and invitations. Set it up and let K Groups do the rest.

## Set up and installation

K Groups is both a server and client application. The server is a simple REST api, served up via [express-js](https://expressjs.com/). The client application is [angular-js](https://angularjs.org/) and can also be served via the express application.

### Slack Application
K Groups uses the Slack API for a variety of features, so if you want to host your own instance of kgroups, you will have to create a Slack Application for your team. The Slack Application needs the following permissions:

- Bots - enabled
- Permission Scopes - enabled select
  - channels:write
  - team:read
  - users:read

You will also have to specify OAuth redirect URL's for your application. The REST API OAuth callback route provided by kgroups is /auth/slack/callback (e.g. localhost:4390/auth/slack/callback). Keep in mind that Slack does not allow callbacks URI's that are not public so you will need to either host your instance on the web or do something like in [this article about using ngrok to develop locally for Slack OAuth](https://api.slack.com/tutorials/tunneling-with-ngrok).

### Database
K Groups requires a [MongoDB database](https://www.mongodb.com/).

### Installing K Groups
To install the application, copy this repo and run the following command:

```
npm install
```

The server requires some environment variables. Create a file in the root directory named 'server.env' with the following variables:

```
SLACK_CLIENT_ID=EXAMPLE
SLACK_CLIENT_SECRET=EXAMPLE
JWT_SECRET=EXAMPLE
DB_DONFIG=EXAMPLE
PORT=4390
```

- SLACK_CLIENT_ID : this is provided by Slack when you create the associated slack application.
- SLACK_CLIENT_SECRET : this is also provided by Slack when you create your app.
- JWT_SECRET : secret key for generating json web tokens (for authentication). See https://jwt.io/introduction/
- DB_CONFIG : this is used for connecting to your database. Currently this only support mongoose connection strings.
- PORT : the port on which you would like the server to run.

After configuring these variables run the following command:

```
node app/app.js
```
The server will begin listening on the configured port. To access the application, open it up in a browser. Accessing /client will provide you with an unoptimized client application. Navigating to the root will provide you with the built client. You can build a new client from source by issuing the following command.

```
grunt build
```
