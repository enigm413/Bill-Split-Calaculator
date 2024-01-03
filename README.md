# Bill-Spliting-App

Bill Splitting App" is a React-based web application that allows users to manage a list of friends, add new friends, select friends, and split bills between selected friends.

### Key Features:

- $Friend List Management:$ Users can view a list of friends displaying their names, profile images, and current balances.
- $Add Friends:$ Users can add new friends by entering their names and profile image URLs.
- $Select Friends:$ By selecting a friend from the list, users can initiate bill-splitting with that particular friend.
- $Split Bills:$ The app provides a form to split bills between the selected friend and the user. Users can enter the total bill value, their own expense, and indicate who is paying the bill.
- $Dynamic Balancing:$ The app dynamically updates the balances between friends based on the bill-splitting transactions.

### Technologies Used:

- $React:$ The front-end framework used for building the user interface and managing component-based architecture.
- $useState Hook:$ Utilized to manage and update the application's state for different functionalities.
- $UI Components:$ Custom-defined reusable UI components like buttons, forms, and lists for better code organization and modularity.
- $UUID Generation:$ Imported uuid library to generate unique IDs for newly added friends.
- $Conditional Rendering:$ Implemented conditional rendering to display or hide different components based on user actions.

### Project Structure:

- $App Component:$ The main component managing the overall application state, including friend list display, adding friends, selecting friends, and bill splitting.
- $FriendList Component:$ Responsible for rendering the list of friends and handling friend selection.
- $Friend Component:$ Displays individual friend details, allows friend selection, and highlights the selected friend.
- $FriendForm Component:$ Provides a form to add new friends with their names and profile image URLs.
- $SplitBillForm Component:# A form for users to split bills with the selected friend, allowing them to enter bill details and select who pays the bill.

### Purpose

This application aims to simplify bill splitting between friends and efficiently manage their balances, facilitating easier financial transactions within a friend group or community.

### Usage

Users can utilize this application to manage their friend groups, keep track of shared expenses, and easily split bills, enhancing transparency and convenience in financial dealings among friends.

Feel free to adjust or expand this project description based on specific project requirements or additional functionalities!
