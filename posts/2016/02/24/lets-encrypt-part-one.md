---
title: Let's Encrypt – Failure
slug: lets-encrypt-part-one
date: "2016-02-24T13:09:31.000Z"
---

Over the weekend I tried to setup [Let's Encrypt](https://letsencrypt.org).

Let's Encrypt works by providing short term SSL certificates (currently 90 days) along with a client that allows you to renew them with one simple command. With a renewal script you have a pretty nice - free - solution to enabling https.

The initial setup of the certificate went fine, but when setting up the auto-renewal script I decided to change to only allow the non-www domain. This caused the Let's Encrypt renew script to not use the previous settings. So rather than using reesemclean.com as the certificate name it used reesemclean.com-0001.

I wiped out both of these files and tried to restart. Turns out there are some other files that Let's Encrypt uses for renewal information. So this time I see reesemclean.com-0002.

This goes on a couple more times as I try to find all the files to delete. Finally, I removed them all and tried it one more time. Oops! I got rate limited! You can only request a certificate for a domain five times in a week.

Little did I know, there is a sandbox environment you can use to avoid the rate limit. No way around it at this point so I will try again next weekend.
