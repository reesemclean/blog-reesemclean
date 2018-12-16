---
title: "Static Blogging Engine: Initial High Level Thoughts"
slug: static-blogging-engine-initial-high-level-thoughts
date: "2016-02-17T09:51:03.000Z"
---

At some point I want to write a static blogging engine for a this site in Swift – dipping my toes into the non-iOS world of Swift.

What might the basic architecture of this look like?

###Data Input

First thing to think about is how to get writing into it. One thought is to have the server act as a Git repository; I create/edit/delete a post, commit it locally and then push it to the repo where a post commit hook would trigger the generator to rerun.

That's one option - the iPhone would require a Git client which doesn't seem like the best writing environment (I could copy and paste from a dedicated writing app but that adds a step to the process).

Another option would be to create an API for just myself to use which would allow me to upload/edit/read posts. More complex and would require some custom apps to write in. Maybe at some point but the first option seems best for now.

###The Generator

So I have some files and a way to trigger an update. The input to the generator is going to be something like this:

```
Input
  Posts
    Drafts
    Published
  Pages
    Drafts
    Published
  Templates
  Assets
    Images
    SASS
```

The generator takes all this and spits out a folder containing the site. Templates would written using something like Handlebars or Mustache. SASS would get compiled to CSS. Drafts would either be ignored or served at a non-public location.

###Serving the Site

The output gets moved to the location my HTTP server is serving from. Optionally, it could move it a CDN and have it hosted there. At this point it would be just a folder full of html and assets.
