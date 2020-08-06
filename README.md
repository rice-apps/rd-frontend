# RiceDiscuss Frontend

This is the frontend for RiceDiscuss. It interfaces with the [backend](https://github.com/rice-apps/RiceDiscuss-backend) to provide a wonderful user experience.

## Tech to be familiar with

-   [Apollo GraphQL](https://www.apollographql.com/docs/react/)
-   [React](https://reactjs.org/)
    -   In particular, be familiar with the particuliarities of [Create React App](https://create-react-app.dev/)
    -   Also, learn a little bit about [React Hooks](https://reactjs.org/docs/hooks-intro.html), especially if you're more used to traditional React classes.
-   [Styled Components](https://styled-components.com/)
-   [Material UI](https://material-ui.com/)

Furthermore, the RiceApps leadership team has a list of tutorials you can ask them for.

## Getting started

Before starting, ask a RiceApps team lead for edit access to this repository.

First, clone this repository. Open your terminal and run

```bash
$ git clone https://github.com/rice-apps/rd-frontend.git
```

Create a new branch, preferably naming it after yourself or the feature you're working on.

```bash
$ git checkout -b <your branch name>
```

To install dependencies into a local `node_modules` folder, run

```bash
$ npm install
```

If you do not have node and npm installed, install them from [the NodeJS website](https://nodejs.org/en/).

Finally, create a remote for your branch on github by running

```
$ git push -u origin <your branch name>
```

## Setting up the backend

Checkout the backend from [here](https://github.com/rice-apps/RiceDiscuss-backend). Follow the instructions for setting up the `.env` file. Then, run `npm install` and `npm start` to make the backend ready for testing.

## Submitting changes

Once you're done with your feature, create a pull request on GitHub with an informative title and description.

After a team lead merges your branch, delete both your remote and local copy.
