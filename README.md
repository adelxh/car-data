# Car Data React Native App

## Description

* Retrieve data from a car API and display it on the main page
* implement a search function where a user can type in the car model name and will receive an output according to the search (output changes on text)
* implement a filter option where the user can set filters however they would like (can filter based on car mode, year and color of the car as well as price range slider)
* implemented a clear function, when pressed all filters are cleared and the user is taken back to the original screen.

## Technology used

* for this project I have used react native to develop the app, expo and xcode to run the app locally and snack expo to upload the app.

## How to run the app locally

* in order to run the app locally ensure you have node installed, if not please visit the link (https://nodejs.org/en/download/) to install nodeJS.
* next you would want to install react-native-app on your machine run:
    ```
    npm install -g create-react-native-app
    ```
if that doesnt work due to administration issues: run
    ```
    sudo npm install -g create-react-native-app
    ```
    that will allow your terminal to install packages as an administrator all you have to do is type in your password.
* after you have succesfully installed node and react-native you need to install expo so that you can run the app. In order to do that run the following command in your terminal
    ```
    sudo npm install -g expo-cli
    ```
* after this is done, you need to clone the git repository, in this case its (https://github.com/adelxh/car-data.git)
    ```
    git clone https://github.com/adelxh/car-data.git
    ```
* install the dependencies assosicated with the project
    ```
    npm install
    ```
* then you should be able to run
    ```
    yarn start
    ```
    to start the project
* download expo go on the app store or google play

## Running app on iphone

* to run the app on your phone, go to the camera after you have succesfully installed expo go, and scan the QR code that was given to you after running the app in your terminal

## Running app on android

* to run the app on your phone, go to the 'expo go' app and scan the QR code that was given to you after running the app in your terminal.
