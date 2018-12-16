---
title: Code Blocks
slug: code-blocks
date: "2016-02-09T11:30:53.000Z"
---

This will be the first of many posts about the setup behind this blog. Today's post is on code blocks; since I want to talk about code quite a bit this seems like a good place to start.

Again, I'm coming to HTML/CSS/JS as pretty much a complete beginner. As I went into researching this I had just a couple of goals (ordered by importance):

- Fast/Small download
- Easy to use
- Good looking
- Syntax highlighting

After doing some research it looks like syntax highlighting requires either Javascript (e.g. [Prism](http://prismjs.com)) or the ability to process files through a HTML generator (e.g. [Pygments](http://pygments.org) or [Rouge](http://rouge.jneen.net)).

### Javascript

I want to stay with vanilla HTML and CSS/SASS as long as possible. Plus some of the Javascript includes would increase the current page size by **four times**. At some point this might be revisited but for now this is out.

### HTML Generator

Currently I am using [Ghost](https://ghost.org) as my blogging engine. At some point I would like to look into creating a static blogging engine using Swift, but for now using HTML generation seems to be out.

### Compromise

For now I will sacrifice syntax highlighting and go with a simple styled code block. Here's the SASS it's styled with shown using a code block (how meta!):

```
pre {
	border: thin solid $code-block-border-color;
}

code {
	background-color: $code-block-background-color;
	border-left: thick solid $code-block-left-line-color;
	display: block;
	overflow: auto;
	padding: 8px 16px 8px 16px;
}
```

At some point I'll look to revisit this, but for now I think this works.
