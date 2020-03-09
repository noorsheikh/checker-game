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

In order to setup local docker environment make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop) installed locally. Use Docker ToolBox if there are restrictions related to Windows license.[Docker ToolBox]https://docs.docker.com/toolbox/toolbox_install_windows/

Note: all below commands need to be execute from the source code root directory.

### Build Docker Images
```docker-compose build```

### Launch Docker Containers
```docker-compose up``` if need to launch in deteched mode append `-d` to the end of the command

### Troubleshoot Info
If you are using Windows Docker Toolbox, make sure that the VirtualBox has write permissions for the specific drive where you want to clone the repository. If you use C drive, it won't have any problems. 

### Stop Running Containers
```docker-compose down```

### Bonus
If you want to build image and launch containers in with terminal command
```docker-compose up --build```

### Local Browser URL
After spinning the containers use this url [http://localhost:3000/](http://localhost:3000/) to access UI dashboard in browser.

