# zendesk-vuejs-app
> Zendesk-Vue.js app

## Description

Idea is to create simple Vue.js app for Zendesk ecosystem.

## Look and feel

Currently project looks like this:

![][screenshot_home-blank]

When we click to open modal box we get input field and a button. For demonstration purposes text is added to the input field:

![][screenshot_modal-text]

On a button click we should have input field value copied to the sidebar and welcome message updated.

![][screenshot_home-text]

Notice: Have in mind that these images might stay few commits behind.

## Build setup

``` bash
# To run app locally
npm run start

# To create package
npm run validate
npm run package
```

After running app locally you should append `?zat=true` at the end of the URL of your Zendesk instance.

[screenshot_home-blank]: _extras/screenshots/home-blank.png
[screenshot_modal-text]: _extras/screenshots/modal-text.png
[screenshot_home-text]: _extras/screenshots/home-text.png
