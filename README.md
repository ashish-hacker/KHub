[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ashish-hacker/KHub?logo=github&style=for-the-badge)](https://github.com/ashish-hacker/KHub) 
[![GitHub last commit](https://img.shields.io/github/last-commit/ashish-hacker/KHub?style=for-the-badge&logo=git)](https://github.com/ashish-hacker/) 
[![GitHub stars](https://img.shields.io/github/stars/ashish-hacker/KHub?style=for-the-badge)](https://github.com/ashish-hacker/KHub/stargazers) 
[![My stars](https://img.shields.io/github/stars/ashish-hacker?affiliations=OWNER%2CCOLLABORATOR&style=for-the-badge&label=My%20stars)](https://github.com/Apurva-tech/unite/stargazers) 
[![GitHub forks](https://img.shields.io/github/forks/ashish-hacker/KHub?style=for-the-badge&logo=git)](https://github.com/ashish-hacker/KHub/network)
[![Code size](https://img.shields.io/github/languages/code-size/ashish-hacker/KHub?style=for-the-badge)](https://github.com/ashish-hacker/KHub)
[![Languages](https://img.shields.io/github/languages/count/ashish-hacker/KHub?style=for-the-badge)](https://github.com/ashish-hacker/KHub)
[![Top](https://img.shields.io/github/languages/top/ashish-hacker/KHub?style=for-the-badge&label=Top%20Languages)](https://github.com/ashish-hacker/KHub)
[![Issues](https://img.shields.io/github/issues/ashish-hacker/KHub?style=for-the-badge&label=Issues)](https://github.com/ashish-hacker/KHub/issues)
[![Watchers](https://img.shields.io/github/watchers/ashish-hacker/KHub?label=Watch&style=for-the-badge)](https://github.com/ashish-hacker/KHub/) 

# KHub

Knowledge-Hub is your all in one destination for resources for your studies. Be it the book or the assignment questions. You don't have to worry about them. We have all of them organized in a single place.

## Table Of Contents

- [Motivation]()
- [Tech Stack]()
- [Installation](https://github.com/ashish-hacker/KHub#installation)
- [Run locally]()
- [Environment Variables]()
- [Features](https://github.com/ashish-hacker/KHub#features)
- [Documentation](https://github.com/ashish-hacker/KHub#documentation)
- [Demo]()
- [Deployment]()
- [Lessons Learnt]()
- [Future Scopes]()
- [Roadmap]()
- [Author]()

## Motivation
In this era of information there is no shortage of informations and resources. Especially student communities are always in need of correct information and resources whenever they need. So that they can learn new things in a hassle-free manner. 
But often Students get overwhelmed with so
many options and fail to choose the correct resource. Choosing the correct resource takes a lot of time. Where **KHub** comes into play. 

## Tech Stack

**Client:** React

**Server:** Node, Express

**Database:** MongoDB, Azure Blob Storage

## Installation

Get Started with cloning the repo

```bash
  git init
  git clone https://github.com/ashish-hacker/KHub.git
  cd KHub
```

Install backend dependencies with npm

```bash
  cd backend
  npm install
```
Install frontend dependencies with npm

```bash
  cd frontend
  npm install
```

Now You are good to go.
## Run Locally

Go to the project directory

```bash
  cd KHub
```

Start the app

```bash
  cd frontend
  npm run start
```

Now your app is running on the deployed backend server.

## Environment Variables

To run the backend also locally, you will need to add the following environment variables to your .env file with your own values.

`MONGO_URI` : MongoDB connection string

`API_PORT`: Port where the Backend server will run

`TOKEN_KEY`: A key for creating jwt tokens

`CONTAINER_NAME`: Azure Container Name

`AZURE_STORAGE_CONNECTION_STRING`: Storage Connection String

`ACC_NAME`: Azure Account 

`TEMP_CONTAINER_NAME`: To be reviewed Container name where the to be reviewed files go

`SEARCH_API_KEY`: Azure Search API key

`SEARCH_API_ENDPOINT`: Azure Search Endpoint

`SEARCH_SERVICE_NAME`: Azure Search Service Name

`SEARCH_INDEX_NAME`: Azure Search Index Name

`SEARCH_FACETS`: Facets

`IN_REVIEW_CONTAINER`: To be reviewed Container name where the to be reviewed files go

After you have defined your .env variables you can start your backend by :
```bash
cd backend
npm run server
```
    
## Features

- Searches through the content of the file for the given query
- Files uploaded by students will only show up if approved by Teachers
- Can easily search and download files
- Can find files of certain topic, author or content of the file
- Can Post Questions on Forum and get answered from peers and Teachers
- Add Likes to Posts and Files uploaded by peers and Teachers
- Only Teachers can delete uploaded Posts and Files
- Register and SignIn

## Documentation
[API reference](https://github.com/ashish-hacker/KHub/blob/main/backend/README.md)

In KHub , we bring students and teachers together. Teachers ensure that the right resources and information reach the students.
- Whenever a student uploads a file, before reaching to other students, It have to be approved by any of the teacher. 
- In KHub, students can search whatever they need in the search bar, the search results will show the most relevant resources related to the query by searching through the contents of the files , authors and topics of the files. For example, if someone needs resources on *Dijkstra Algorithm*, they can search *Dijkstra* on the search bar, then all files which are most relevant to *Dijkstra* or contain the term in them will show up.
- After the search results have come up, One can choose the file with maximum votes or any particular uploader or topic.
- Also in Forum section, One can post their learnings and ask questions.
- Teachers or any fellow students can answer or comment on the posts. Which maximizes the interaction. Also, Students can get their queries resolved as fast as possible with the help of the community.
- Teachers can put assignment notice or anything they want to convey on the Post.
- Teachers can delete irrelevant posts in the Forum.
- Students can also search over Forum to get relevant posts on the basis of *Year*, *Branch* & *Subject*. Which makes it easier for students to find posts related to a particular subject or topic.

## Demo

## Deployment

Both Client side and Server side are deployed separately, so that changes in Client side won't affect the Server and vice versa.
Both are deployed on *heroku* platform.
