# Paginetta

Easy to use pagination component

This is still a work in progress and I don't know how to publish is correctly so please stand by

## How to use

Include the component in your file like so

`<paginetta :meta="meta" v-on:page:changed="YourEvent">`

It expects a meta object, like one from an API, and emits a simple `page:changed` event with the page number as payload
