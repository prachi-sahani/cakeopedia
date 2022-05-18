## [Cakeopedia - A Note Taking App](https://cakeopedia-react.vercel.app/)
![Cakeopedia github](https://user-images.githubusercontent.com/64582473/168880124-35d0b3d6-e8aa-491d-bed2-ab72ee1ff8ef.png)



### Table of contents ###
- [About Cakeopedia](#about)
- [Features and demo](#features)
- [Technology and libraries used](#tech)
- [Pre-requisites and project setup(in local)](#setup)
- [Highlights](#highlights)
- [Let us connect](#connect)


<a name="about"></a>
### About Cakeopedia ###
**[Cakeopedia](https://cakeopedia-react.vercel.app/)** -  a note taking app to note down wholesome, healthy and super delicious baking recipes.

<a name="features"></a>
### Features and demo ###
- **[Home](https://cakeopedia-react.vercel.app/)** - a regular landing page.

- **[Notes](https://cakeopedia-react.vercel.app/notes)** - all notes at one place(can be accessed only if the user is logged in). Users can
  - view and edit notes
  - add new notes
  - send notes to trash
  - send notes to archive
  - change note color
  - add multiple labels
  - create a duplicate note
  - sort notes based on last updated date

- **[Archive Page](https://cakeopedia-react.vercel.app/notes/archive)** - List of archived note. Users can
  - view and edit archived notes
  - send archived notes to trash
  - unarchive the archived notes
  - change note color
  - add multiple labels
  - create a duplicate note
  - sort notes based on last updated date

 - **[Trash Page](http://localhost:3000/notes/trash)** - List of notes sent to trash. User can
    - view and edit notes
    - delete note permanentatly   
    - restore the note
    - sort notes based on last updated date

 - **[Label Page](https://cakeopedia-react.vercel.app/notes/label/Recipes)** - list of notes with a particular label, for eg: `Recipes` label. User can 
    - view and edit notes
    - send notes to archive
    - send notes to trash
    - change note color
    - add multiple labels
    - create a duplicate note
    - sort notes based on last updated date

 - **[Authentication](https://cakeopedia-react.vercel.app/login)** - User can login as guest only, login with credentials, signup and logout. Once the user is logged in, they can access their notes.

- **[Add note page](https://cakeopedia-react.vercel.app/notes/note)** - add a new note. User can:
  - add note details
  - send note to trash
  - send note to archive
  - change note color
  - add multiple labels
  - create a duplicate note

**Demo**:
![cakeopedia- demo1](https://user-images.githubusercontent.com/64582473/169064090-e31f0532-4984-468d-b9cd-02c7ad1d51db.gif)
![cakeopedia- demo2](https://user-images.githubusercontent.com/64582473/169064886-0c42d831-c745-41e3-8f12-c332cea756e4.gif)
![cakeopedia- demo3](https://user-images.githubusercontent.com/64582473/169065918-0da7b703-e5d4-4b2c-8f01-94831f29c20a.gif)

<a name="tech"></a>
### Technologies and libraries used ###
- [ReactJS](https://reactjs.org/docs/getting-started.html)
- [Firebase Firestore](https://firebase.google.com/products/firestore)
- [Firebase Authentication](https://firebase.google.com/products/auth)
- [RocketUI Component Library](https://rocket-ui.vercel.app/)
- [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview)

<a name="highlights"></a>
### Highlights ###
- **Responsiveness** - This app is completely responsive and can be accessed in all kind of devices.
-  Proper messages for **error/exception handling** across the application
-  Use of **loader** to show status of tasks

<a name="setup"></a>
### Pre-requisites and project setup(in local) ###
#### Step 1 ####
Install [NodeJs](https://nodejs.org/en/)(if not already installed)

#### Step 2 ####
Clone dev branch of this repo to local using:
   
     git clone https://github.com/prachi-sahani/cakeopedia.git -b dev

#### Step 3 ####
Go into the project folder
   
     cd project-name 
     
#### Step 4 ####
Install all the npm packages

     npm install 
     
#### Step 5 ####
Run the application using:
   
     npm start 
     
The application runs on **localhost:3000**


<a name="connect"></a>
### Let us connect ###
[<img src="https://user-images.githubusercontent.com/64582473/162154693-eaf76505-59e8-4b6d-8e03-5cac4cd29d5d.png" width="30" height="30">](https://www.linkedin.com/in/prachi-sahani/) &nbsp;
[<img src="https://user-images.githubusercontent.com/64582473/162155893-3e273e1a-4a29-47e2-8e39-06b45ab6f6eb.png" width="30" height="30">](https://twitter.com/prachi_sahani07) &nbsp;
[<img src="https://user-images.githubusercontent.com/64582473/162157812-3e1d6b9b-7729-4137-99cb-8337d6396472.png" width="30" height="30">](https://github.com/prachi-sahani)


