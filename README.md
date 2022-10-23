# Car Data React Native App

## Description

* Retrieve data from a car API and display it on the main page
* implemented a search function where the user can type in the car make and will receive an output according to the search (output changes on text)
* implemented a filter option where the user can set filters as they prefer (can filter based on car make, year and color of the car)
* implemented a clear function, when pressed all filters are cleared and the user is taken back to the original screen.
* Implemented share feature, when clicked the user can share the car with contacts. 
* Implemented a scroll to top feature, when pressed it takes the user to the top of the page. 

## Technology used

* for this project I have used react native to develop the app, expo and xcode to run the app locally and snack expo to upload the app.

## How to run the app locally

* in order to run the app locally ensure you have node installed, if not please visit the link (https://nodejs.org/en/download/) to install nodeJS.
* next you would want to install react-native-app on your machine run:
    ```
    npm install -g create-react-native-app
    ```
if that doesnt work due to administration issues run:
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

## Snack Expo Link 

View the app on snack expo:
Snack Expo Link: https://snack.expo.dev/@adelaxmed/car-data-api?platform=ios

## Figma file

* For this project I have created a figma file where you can conveniently find the design of the app as well as the color codes used. 
Figma Link: https://www.figma.com/file/VJS2sj3ZnRr5f4z2uefvQy/car-data-api?node-id=0%3A1

## Assumptions Made 

During this project everything was clear. However, after building the UI I have decided to implement some new features for better user experience such as the 'to top' button. Since there is a lot of data to be displayed on the main screen without filters I have noticed that scrolling back up after scrolling down was taking too much time and effort, this is why I implemented the button that will take the user to the top of the screen automatically. I also decided to implement a range slider for year of the car. The reason for that was that I wanted to give the user an option to filter between years instead of picking individual year which means that the user can pick years between 2002-2012 and the app will display cars between those years. 

## Feedback 

This project was really fun to make. In total it took me a day to create the functionality of the filters and search feature. However, I took more days to improve the user interface and experience of the app so in total I took 4 days to complete everything. Playing around with it allowed me to find weak or confusing points of the app to fix. I would say that the level of difficulty in this project was 4/10. The instructions were clear for the functionality of the app. Having the freedom to design the app also helped me implement and improve my skills of UX and UI. Lastly, I prefer project based assesment over leet-code because of how close it gets to the real world industry. 

