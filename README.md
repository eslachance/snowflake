# Snowflake (because you're special)

> ✨ A ReactJS Blog Platform, Bootstrapped with Create Snowpack App (CSA).

Every snowflake is different, every blog is unique, every person on this planet is special (so no one is. get that reference? I hope you did).

Snowflake, named because I'm an unoriginal fuck and I was exploring Snowpack as a build tool, strives to give you the power to create your own blog as a designer, without weighing you down with the intricacies of the back-end.

Its continuing mission: to take care of the complexity of the server and API, and give you the cleanest, meanest, most useable react-based front-end you could dream of. I hope.

## Installing

The react-snowpack is based on a two-part system including both the back-end server and front-end application. As such, there are two installation procedures for now.

> I will simplify this at one point, this is still _heavily_ in the early days of development, so excuse the mess and clutter.

### Pre-Requisites

The back-end service depends on my own module called [Enmap](https://enmap.evie.dev/), which is a synchronous wrapper around the SQLite database. As such, it requires to be _built_ for your system. This is, unfortunately, sometimes a bit finicky. But in all probability this will be the _hardest_ part of this entire operation, so stick with me for a monment.

The `better-sqlite3` module, as with all sqlite modules in nodejs, requires the `node-gyp` system to build, which requires the `c++ build tools` and `python 2 or 3`. But, thankfully, they're easy to install even on Windows (thanks, Microsoft, for making this easier!).

> For **Windows**, open an **ADMINISTRATOR** (very important) command prompt (or powershell), and run the following commands:
>
> ```
> npm i -g --add-python-to-path --vs2015 --production windows-build-tools
>
> npm i -g node-gyp@latest
> ```
>
> **CLOSE THIS PROMPT OR SHELL**, and then open a **new**, normal prompt or shell, for the next step (this one should be in your project folder).

> For **Linux** (Debian-Based), run `sudo apt install build-essential` and make sure you have python install, which should already be the case. If it's not, well, you're a linux user, you know how to figure that one out, right? Then once that's done, open the project folder for the next step.

> For **Mac** open `Terminal` (located in `~/Applications/Utilities/Terminal.app`) and run the command `sudo xcode-select --install`. You will be prompted for your login password, enter it and then go through the steps in the popup to install the Command Line Developer Tools.

### The Installation

So, the two-step installation, finally. If all went well you have an open terminal, command prompt, powershell, or bash, or whatever your special flavor, with the code's root folder. Something like `C:/devel/snowflake` or `/home/evie/Documents/snowflake` or whatever.

First, run `yarn` (or `npm install` if you prefer npm). Once that's completed, CD into the `/server` folder and run `yarn` or `npm install` here also. This installs the dependencies for both parts of the system.

Once both installs are done, the next step is to run the thing. Which is unfortunately at the moment still separate. So you need 2 different terminal windows or tabs to run this.

In one window, run `cd server` and then `node .` to start the back-end. If it worked, a new `server/data` folder is created.

In the other window, run `yarn dev` in the root, which should output some `snowpack` messages, ended with `Server started in XXms`

## Testing if it worked

If I haven't failed in my instructions you should now be able to open [http://localhost:8080/](http://localhost:8080/) and see the blog platform.

Reel back in horror as you realise I haven't finished doing this yet and you just downloaded what amounts to a pre-release early alpha that's not even playable yet. But you can't refund your $30 because this is free. Sorry!

## The Stucture

Some basic things to look at:

- `public/` holds the core html, css, and static images for the site.
- `server/` contains the express API back-end I made specifically for this.
- `src/components` is some react components used throughout the app
- `src/pages` is... the pages. duh.
- `src/store` is the [zustand](https://github.com/pmndrs/zustand) global state management configuration
- `src/App.js` and `src/index.jsx` are the base of literally every single react app on the planet. Basically.

## Technologies Used

Front-end:

- [React.js](https://reactjs.org/) as a base web development framework.
- [Snowpack](https://www.snowpack.dev/) for the dev environment.
- [Tailwind CSS](https://tailwindcss.com/) as a CSS UI Framework.
- [zustand](https://github.com/pmndrs/zustand) for global state management.

Back-end:

- [Express](https://expressjs.com/) as a web server.
- [Enmap](https://enmap.evie.dev/) as a database management tool.
