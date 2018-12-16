---
title: Introducing Blueprint
slug: blueprint
date: "2017-04-12T12:12:49.000Z"
tags: Projects, Blueprint
---

> TLDR: Check out [Blueprint](https://marketplace.visualstudio.com/items?itemName=teamchilla.blueprint), a Visual Studio Code extension that lets you create files from templates.

After almost 9 years of iOS development, my full-time job is now as a web developer; an Angular (2) developer to be specific.

A year ago I wouldn't have believed that I'd be working in a text editor made by Microsoft everyday, yet Visual Studio Code has turned into one of my favorite developer tools ever. I'm not an Xcode hater, but it is a bit strange that I get more consistent code completion from TypeScript/JavaScript than I do from a compiled language like Swift.

One thing that I do miss from Xcode is its new file templates. Creating a view controller and xib with everything hooked up is just a few clicks. In Angular, when dealing with components, there are actually 4 separate files to create—doing this manually is a pity.

Visual Studio Code extensions to the rescue! Along with [Duy Nguyen](https://github.com/nguyenduyh33), we have built [Blueprint](https://marketplace.visualstudio.com/items?itemName=teamchilla.blueprint) which lets you build out files and a folder of files quickly from templates in your project. Simply install Blueprint, put your templates in a folder named "blueprint-templates" at the root of your project, and then right-click where you would like your file created.

Templates are simply folders of files using a Handlebars syntax and an optional file named "manifest.json" (lets you add additonal options like whether a folder should be created). There are helpers for different casing-types (kebab, snake, Pascal, and camel) for transforming your input within the template. Check out some [examples](https://github.com/reesemclean/blueprint-examples).

If you ever find yourself creating the same set of files over and over again in a project try out [Blueprint](https://marketplace.visualstudio.com/items?itemName=teamchilla.blueprint) and see if it makes things easier for you.
