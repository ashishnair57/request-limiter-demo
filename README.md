# request-limiter-demo

Install & start Redis on MacOs:
```
brew install redis
redis-server
```

Install & start Redis on Ubuntu:
```
sudo apt-get update && sudo apt-get install redis-server -y
redis-server
```

## Description:

After git clone,do `npm start` in the root directory
this will install the dependencies and start the node server


## Api urls:

First API :

> URL : http://localhost:4000/testApi

> METHOD : GET

> DESCRIPTION: Api to test the Request limiter

Second API :

> URL : http://localhost:4000/getLog

> METHOD : GET

> DESCRIPTION: Api to get the logs of allowed and denied Ip address with date and time
