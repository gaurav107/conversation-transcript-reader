# Conversation Intelligence

My submission for the `Converation Intelligence` assignment. It lets the users to play a phone call recording and see the transcript of that recording.

Demo: [https://conversation-intelligence.web.app](https://conversation-intelligence.web.app)

## Build Instructions

1. From the root project directory, run `npm install`
2. If you want to generate a build, run `npm run build`, else move to `Step 3`. This commange bundles React in production mode and optimizes the build for the best performance. You can see the final bundle in the `build` directory
3. Run `npm start`. This runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Few things to note

#### `Usage of redux`

Given that this is a small project, a simple top-down data flow with state managed in the root container component would've sufficed. I integrated `redux` just for the sake of it to get those bonus points :P

#### `Usage of styled-components library`

Coming from a `react-native` background, I usually prefer co-location of styling and components. It makes it easier to make code changes without having to navigate between multiple files. And I no longer have to worry about giving descriptive classNames for CSS. `styled-components` autogenerates them.

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
