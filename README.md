# api

Repository for the backend API of the website

## Port 8855

The port 8855 is used because it's free on the server. However, the API still lives at port 80 to the outer world, by using Nginx as reverse proxy.

## Setting it up

Create the database (*Tutorial to be done*).

Create config.json:

* "mysql" containing data to pass to mysql constructor.
* "path" with path to the bot directory

Then just install the deps with npm and run it:
`npm i && node .`
