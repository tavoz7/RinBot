# LucasBot
Some dumb bot I made because my friend wouldn't stop making puns out of my username

## To set up the bot
### Ubuntu
First, clone the repo:


`$ git clone https://github.com/CominAtYou/LucasBot`


Then, install [node.js](https://nodejs.org).


Now, we need to tell Discord you're making a bot.


 - Go to the [Discord Developer Portal](https://discordapp.com/developers) and click 'New Application', and name it.


 - Click "Bot" in the side menu, and then click 'Add Bot', and confirm.


 - Change your bot's name and picture (if you want), and copy its token.


After that, navigate to the repo you cloned earlier:


`$ cd <PATH/TO/REPO>`


Then, run this:


`$ rm package.json`


Then, initalize node:


`$ npm init`


Fill out the fields that are presented to you, or press enter for each one to skip this step.


Import the discord.js library to the project:


`$ npm install discord.js --save`


Then, open up index.js and fill in your bot token in the nessecary fields, and make changes to what the bot says and does. A helpful resource for things the bot can do is the [discord.js documentation](https://discord.js.org/#/docs/main/stable/general/welcome).


To add the bot to your server, get your Client ID from the 'Home' tab in the side menu of the Discord Developer Portal, and paste this URL into your web browser. https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=67496976


Finally, to run the bot:


`$ node .`


### Credit and other stuff
This project is free to be modified in any way, as long as I recieve credit if it is publicly published.
