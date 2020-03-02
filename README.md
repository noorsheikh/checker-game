# Checker Game
## Server Side
Symfony RESTful APIs

### Technologies Used
* PHP 7.4
* Symfony
* MySQL

## Client Side
React/Redux with Typescript Frontend

### Technologies Used
* React
* Redux
* Typescript
* Bootstrap

## Local Development Environment Setup (both Server and Client Side)

In order to setup local docker environment make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop) installed locally.

Note: all below commands need to be execute from the source code root directory.

### Build Docker Images
```docker-compose build```

### Launch Docker Containers
```docker-compose up``` if need to launch in deteched mode append `-d` to the end of the command

### Stop Running Containers
```docker-compose down```

### Bonus
If you want to build image and launch containers in with terminal command
```docker-compose up --build```

### Local Browser URL
After spinning the containers use this url [http://localhost:3000/](http://localhost:3000/) to access UI dashboard in browser.

### Windows Local Browser URL
After contains are up, use the command below to get the IP address to use with the exposed port (192.168.99.100:3000).
```docker-machine ip```

