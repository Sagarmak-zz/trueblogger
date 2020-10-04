<h1 align="center">
  <br>
  <a href="/"><img src="public/img/trueblogger%20github%20logo.png" alt="ArminC AutoExec"></a>
</h1>

<h4 align="center">Get all your truecaller blogs at one place.</h4>

> Trueblogger provides a neat, user-friendly and performant web interface that categorizes the blogs as per interest of the reader.

#### Live Link: [trueblogger.netlify.app](https://trueblogger.netlify.app)

## Key Features
- Easy navigation & adaptable usage
- Shows related blogs on the basis of views
- A separate menu for blog catergories & tags
- Responsive on all devices
- Google Pagespeed insights score of 96

## App Screenshots

Home Page      |  Home Page with Menu | Blog Post Page       |  Related Blog Posts
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://github.com/Sagarmak/trueblogger/blob/master/src/assets/home.png" title="Home Page " width="100%"> |<img src="https://github.com/Sagarmak/trueblogger/blob/master/src/assets/menu.png" title="Home page with Menu" width="100%">|<img src="https://github.com/Sagarmak/trueblogger/blob/master/src/assets/blog.png" title="Blog Post Page" width="100%"> |<img src="https://github.com/Sagarmak/trueblogger/blob/master/src/assets/related.png" title="Related Blog Posts" width="100%">

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


## My Approach
#### Step 1: Installation and Initialization
- Trueblogger was created using `vue-ui` which was released with `vue-cli` v3, and it lets one create projects with GUI, which gives an advantage over terminal(cli) based process.
- During the installation, I enabled some of **Vue.js** ecosystem's libraries such as `vue-router` for routing and `vuex` for state management.
- Also trueblogger uses `scss` as the CSS preprocessor, and the main reason was Vuetify uses `scss` to style the components of their framework. Adding to that, `scss` also lets you use features that don't exists in CSS.
- Next on, I added Vuetify as the UI library, `date-fns` as Javascript date library and `axios` as promise based http library and it was more than enough to achieve tasks.
- It is important to note that installing Vuetify using `vue-cli-plugin` have tree-shaking enabled by default, and `date-fns` too is tree-shakable as well.
#### Step 2: Figuring out the solution
- After reciving the work, I generally go through my task's, take some time to understand it, break down the tasks in smaller such tasks and use work management tools like Trello to define the tasks in it and start working on it.
- After receiving the brief of the project, I follow a systematic flow. I go through all the tasks involved and understand them thoroughly. After creating the main tasks, I further divide them into sub tasks which help me in not missing out on any. For better conduct , I use work management tools like Trello to define my tasks in it and then proceed working by taking up one task at a time.
- This includes, what pages will be needed, what api's to integrate, what components to include, how the data/content should look, etc on each of the page.
- Next up is to configure some files before starting on the development. 
	- config's: base configuration for axios and Vuetify.
	- Utils: contains a set of utility functions used across the app in many files
	- CSS Reset: reset default browser's own styling on each HTML element. css reset is defined in styles's `base.scss`
	- Font: used Google **Inter** font in styles's `varialbe.scss` to override Vuetify's **Roboto** font
	- Branding: **Figma**, cloud-based design tool, was used to create logo for trueblogger
	- **Postman**: tool for API testing, add each API requests, make each API request and explore around what data to use from the same.
- As it was a small app, the folder structure was kept as it was.
	- The `pages` directory with app views
	- The  `components`  directory with app's reusable Components.
	- The `router` and `store` data in its own files.
	- The installed packages config files in `packages` directory and app's plugins' config in `plugins` directory
- Started off with the first page, the home page **Dashboard**('/'), which fetches the `/posts` api with query params, no. of posts: 25, and page: 1. It also fetches all categories and tags as well. All the posts, categories and tags are stored in Vuex store. 
- The tags, though, are sorted in descending order, keeping tags with highest count at the top, and then top 10 tags are sliced out of the array to store top 10 array of tags in tags store data.
- The **Dashboard** page also displays **DashboardNavbar** component at the top of the app, on all the pages, with trueblogger branding on the left and hamburger menu on the right, showing all the categories and top 10 tags based on post count.
- The second page, which is by default redirected to is **DashboardContent**("/") which shows all the posts. The first post will always be displayed from **DashboardFeatureCard** component, and rest other posts from **DashboardMediumCard**.
- The **DashboardFeatureCard** is a feature card to show the first blog post in wide view as per the design, and is responsive on all devices.
- The **DashboardMediumCard** shows posts in a normal format of thumbnail image being on the top, title in the middle and excerpt at the bottom.
- There is a button, `Load More..` button at the end of the posts, which will fetch 4 older entries hitting the `/posts` api, with params, number: 4, offset: postsLength(fetched posts), showing old entries at the end. The `Load More...` button will only be visible when the fetched posts count is lower than the total number of posts for the posts api.
- The third and final page of the app is **Blog** page, showing the selected blog, from **DashboardContent** page. It fetch the blog post from `/posts/:id` api, gets the data and displays it in the page.
- Alongside the blog, it also shows related posts at the end of the blog, fetching `/posts/:id/related` api, which only works with server side app, in this case, **Node.js** app. After the related api, it goes through top 3 postId's, fetch the data out of all the 3 posts, and shows it in card at the end of the Blog post.
- The api calls are made from `axios` and the date is formatted with the help of `date-fns` library.
- The title, excerpt, content were string values, and html was by default was embeded in them. `v-html` comes to the rescue as it is used to render raw HTML to the screen.
#### Step 3: Deployment
- Deployment too was straight-forward with **Netlify** for **Vue.js** as the site itself says, 
> **Netlify** is the most comprehensive platform for **Vue** sites.
- Backend with **Node.js** was hosted on **Heroku** as it was most popular among community for free **Node.js** apps hosting and it was an easy task to achieve.
