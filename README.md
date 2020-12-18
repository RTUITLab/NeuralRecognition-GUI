# NeuralRecognition GUI

Run `npm i` to install required dependencies after cloning.

### Development mode

Run `npm start` in the project directory to run the app in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### Producion mode

Run `npm build` to build the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Adding custom controllers

Every custom controller have to implement `IController` interface. \
In `IController` defined an Object that contains only one function `enable` which is called Field's `componentDidMount` hook.\
Your controller should look like:
```js
const YourController: IController = {
    enable: () => {
        // Your controlling
    }
}
```

Inside custom controller use events emiters that are defined in `ControlEvents.ts`.

That events are:
+ `redUp()`
+ `greenRight()`
+ `blueDown()`
+ `yellowRight()`

Finally, to connect your controller to the Field change default connection string in `Field.tsx`
```js
// Controller connection
const controller: IController = KeyboardController;
```
to
```js
// Controller connection
const controller: IController = CustomController;
```

If every step is correct, the app will be launched with new controller. 
