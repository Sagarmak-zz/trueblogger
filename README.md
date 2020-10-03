<h1 align="center">
  <br>
  <a href="/"><img src="https://arminc.ga/resources/autoexec/arminc_autoexec.png" alt="ArminC AutoExec"></a>
</h1>

<h4 align="center">Get all your truecaller blogs at one place.</h4>

> Trueblogger provides a neat web interface that shows the [truecaller.blog](https://truecaller.blog/) blog posts with categories and top 10 tags. It uses Wordpress public API to get the posts and other important details.

#### Live Link: [trueblogger.netlify.app](https://trueblogger.netlify.app)

## Key Features
- list most recent posts upfront and navigate to older posts
- a menu that lets you navigate through posts of a particular `Category` or a `Tag`
- view a post
- show related blogs

## App Screenshots

Desktop App  Login         |  Desktop App Open | Web App  computer  hard drives       |  Web App computer hard drives Open
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://github.com/Sagarmak/trueblogger/blob/master/public/img/trueblogger.png" title="Desktop App  Login " width="100%"> |<img src="https://raw.githubusercontent.com/supunlakmal/thismypc/master/thisMyPCWeb/src/assets/images/screen/app-home.PNG" title="Desktop App Open" width="100%">|<img src="https://raw.githubusercontent.com/supunlakmal/thismypc/master/thisMyPCWeb/src/assets/images/screen/web-system.PNG" title="Web App  PC  Drivers" width="100%"> |<img src="https://raw.githubusercontent.com/supunlakmal/thismypc/master/thisMyPCWeb/src/assets/images/screen/web-system.PNG" title="Web App  PC  Drivers" width="100%">

## Folder Structure

    ├── public
    ├── src
	     ├── /components    # reusable .vue files
	     ├── /packages      # nom packages config files
	     ├── /plugins       # vue plugins' config files here
	     ├── /router        # vue ecosystem's routing lib
	     ├── /store         # vue ecosystem's state mgmt lib
	     ├── /utils         # utility fns, used across multiple components
	     ├── /views         # components, that router uses as pages
	     ├── App.vue
	     └── main.js
	├── .env
    ├── .gitignore
    ├── package.json
    └── README.md

### Tech Stack
- Vue.js
- Node.js
