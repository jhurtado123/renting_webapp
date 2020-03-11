# README Modulo2



<h1>Alquiler APP</h1>



## Description

<p>Useful rent web app that allows users to promote flats to rent and to rent a flat. It allows the user to chat the owner and to make an appointment to visit the flat.   </p>

## User Stories

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Homepage** - As a user will see all the ads of the flats  ordered by nearby. 

**Sign up** - As a user I want to sign up on the webpage so that I can see all the ads that I could attend

**Login** - As a user I want to be able to log in on the webpage so that I can get back to the Homepage

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Ad's ** - As a user I want to be able to create, edit, visit and delete a flat ad so that I can rent it others users

**Star a Chat** - As a user I want to be able to start a chat to make a appointment to attend to visit the flat

**Reviews** - As a user I will able to review the owner of the flat I rented or the person who rented my flat.

## Backlog

List of other features outside of the MVPs scope

Geo Location: - add geolocation to events when creating - show event in a map in event detail page - show all events in a map in the event list page

Homepage: - …

Reviews: add a review to another user. - each user will have a page of reviews - Response a review

Chat: Send message between owner and person who is interested in rent your flat

## ROUTES:

<table>
    <thead>
        <tr>
            <th>Route</th>
            <th>Method</th>
            <th>Private</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>/</td>
            <td>GET</td>
            <td>false</td>
            <td>Render login page</td>
        </tr>
        <tr>
            <td>/</td>
            <td>POST</td>
            <td>false</td>
            <td>Send login data</td>
        </tr>
        <tr>
            <td>/register</td>
            <td>GET</td>
            <td>false</td>
            <td>Render register page</td>
        </tr>
        <tr>
            <td>/register</td>
            <td>POST</td>
            <td>false</td>
            <td>Send register data</td>
        </tr>
        <tr>
            <td>/home</td>
            <td>GET</td>
            <td>true</td>
            <td>Render home page that contains ads sortered by nearby</td>
        </tr>
        <tr>
            <td>/map</td>
            <td>GET</td>
            <td>true</td>
            <td>Render map page that contains a map with nearest ads</td>
        </tr>
        <tr>
            <td>/home?search=X</td>
            <td>GET</td>
            <td>true</td>
            <td>Render home page that contains searched ads</td>
        </tr>
        <tr>
            <td>/ad/create</td>
            <td>GET</td>
            <td>true</td>
            <td>Render create ad form page.</td>
        </tr>
        <tr>
            <td>/ad/create</td>
            <td>POST</td>
            <td>true</td>
            <td>Send data to create and ad.</td>
        </tr>
        <tr>
            <td>/ad/edit/:addId</td>
            <td>GET</td>
            <td>true</td>
            <td>Render edit ad form page.</td>
        </tr>
        <tr>
            <td>/ad/edit/:addId</td>
            <td>POST</td>
            <td>true</td>
            <td>Send data to edit an ad.</td>
        </tr>
        <tr>
            <td>/ad/:addId</td>
            <td>GET</td>
            <td>true</td>
            <td>Show ad details page.</td>
        </tr>
        <tr>
            <td>/ad/delete/:addId</td>
            <td>POST</td>
            <td>true</td>
            <td>Deletes the ad.</td>
        </tr>
        <tr>
            <td>/user/:userId</td>
            <td>GET</td>
            <td>true</td>
            <td>Show user profile details.</td>
        </tr>
        <tr>
            <td>/user/edit/:userId</td>
            <td>GET</td>
            <td>true</td>
            <td>Renders edit profile's page.</td>
        </tr>
        <tr>
            <td>/user/edit/:userId</td>
            <td>POST</td>
            <td>true</td>
            <td>Send change of profiles to server.</td>
        </tr>
        <tr>
            <td>/user/remove/:userId</td>
            <td>POST</td>
            <td>true</td>
            <td>Deletes user.</td>
        </tr>
        <tr>
            <td>/chats</td>
            <td>GET</td>
            <td>true</td>
            <td>Render chat list page.</td>
        </tr>
        <tr>
            <td>/chats/create</td>
            <td>POST</td>
            <td>true</td>
            <td>Creates a chat on server.</td>
        </tr>
        <tr>
            <td>/chats/:chatId</td>
            <td>GET</td>
            <td>true</td>
            <td>Render chat page with last messages.</td>
        </tr>
        <tr>
            <td>/chats/remove/:chatId</td>
            <td>POST</td>
            <td>true</td>
            <td>Removes a chat.</td>
        </tr>
        <tr>
            <td>/appointments</td>
            <td>GET</td>
            <td>true</td>
            <td>Render active appointments list.</td>
        </tr>
        <tr>
            <td>/appointment/create</td>
            <td>POST</td>
            <td>true</td>
            <td>Creates an appointment.</td>
        </tr>
        <tr>
            <td>/appointments/cancel</td>
            <td>POST</td>
            <td>true</td>
            <td>Cancels an appointment</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
     </tbody>
</table>



## Models

User model

    {
    	username: String
    	password: String
    	name: String
    	rol: Array
    	dni: String
    	profile_image: String
    	description: String
    	dni_image: String
    }

Ad     

    {
        address: String
        city: String
        postal_code: String
        coords: { 
                lat: Number
                lng: Number
                }
        price: String
        parameters: Array
    }
   
Review 
      
     {
        content: String
        valoration: Number (1-10)
        user: Relation
        owner: Relation
     }
  
Appointment
    
    {
        date: DateTime
        lessor: Relation user
        lesser: Relation user
        ad: Relation ad
        status: String
    }

Chat

    {
       lessor: Relation user
       lesser: Relation user
       ad: Relation ad 
    }

Message 
    
    {
        content: String
        sender: Relation user
        chat: Relation chat
    }

## Links

### Trello

<a href="https://trello.com/b/pY0JoV81/app">LINK</a>

### Git

The url to your repository and to your deployed project

<a href="https://github.com/jhurtado123/renting_webapp">[Repository Link]</a>(http://github.com/)

[Deploy Link](http://heroku.com/)

### Slides

[Slides Link](http://slides.com/)