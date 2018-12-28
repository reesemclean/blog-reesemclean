---
title: Flexbox and Alignment
slug: flex-box-and-alignment
date: '2016-02-10T10:54:44.000Z'
excerpt: 'If you are reading this you may see some older/newer or previous/next buttons at the bottom of this page. These are laid out in a Handlebars template like so...'
---

If you are reading this you may see some older/newer or previous/next buttons at the bottom of this page. These are laid out in a Handlebars template like so:

```
<footer class="pagination">
    {{#prev_post}}
        <a href="{{url}}">« Previous</a>
    {{/prev_post}}
    {{#next_post}}
        <a href="{{url}}">Next »</a>
    {{/next_post}}
</footer>
```

So for an individual post, if there is a older one it adds a link to it and if there is an newer one it adds a link for that.

Using [flexbox](http://www.w3schools.com/css/css3_flexbox.asp) to lay this out looks something like this:

```
footer {
    width: 100%;
    display: flex;
    justify-content:space-between; //Horizontal
    align-items:center; //Vertical
}
```

The footer takes up the whole width, and presses the ends to each side and spaces the items equally in the horizontal direction. This works in all but one case: when there are no previous post and only a newer post, the newer link is left aligned rather than right aligned.

To solve this I need to give the right aligned items an override. So they get a CSS class and we give them the following style:

```
footer.pagination .rightAlignedFooterLink {
    align-self: flex-end;
}
```

And with that newer/next links are now right aligned when there is no older/previous link.

---

As a note, I originally had misread the attribute name for overriding flex items and used:

```
footer.pagination .rightAlignedFooterLink {
    align-items: flex-end;
}
```

This worked... sometimes. At this point with CSS, I'm never quite sure if I'm slightly off or just completely backwards — I'm sure with experience that will change. It seems similar to when you first start with Auto Layout in iOS land — at first it was baffling but after just a little bit it became my go to way of laying views out.
