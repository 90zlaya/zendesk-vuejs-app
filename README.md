# Zendesk-Vue.js app
> Simple [Zendesk](https://www.zendesk.com/) ticket sidebar app implemented using [Vue.js](https://vuejs.org/) framework

## Table of Contents

* [Description](#description)
* [Look and Feel](#look-and-feel)
* [Build Setup](#build-setup)

***

### Description

Idea is to create simple Vue.js app for Zendesk ecosystem. Functionality given to the app is opening modal box from ticket sidebar and returning user's input from modal box back to to the ticket sidebar. 

[⬆ back to top](#table-of-contents)

### Look and Feel

Currently app looks like this in ticket sidebar:

<img src=".extras/screenshots/home-blank.png?clear_cache=2" alt="Home" width="350"/>

When we click to open modal box we get input field and a button. For demonstration purposes text is added to the input field:

<img src=".extras/screenshots/modal-text.png?clear_cache=2" alt="Modal Text" width="350"/>

On a button click we should have input field value copied to the sidebar and welcome message updated.

<img src=".extras/screenshots/home-text.png?clear_cache=2" alt="Home Text" width="350"/>


Notice: Have in mind that these images might stay few commits behind.

[⬆ back to top](#table-of-contents)

### Build Setup

You'll need [Zendesk Apps Tools](https://develop.zendesk.com/hc/en-us/articles/360001075048-Installing-and-using-the-Zendesk-apps-tools) installed on your machine before being able to run app or create package. 

``` bash
# To run app locally
zat server

# To validate and create package
zat validate && zat package

# To bump version
zat bump
```

After running app locally you should append `?zat=true` at the end of the [URL of your Zendesk](https://www.zendesk.com/support/) instance.

[⬆ back to top](#table-of-contents)
