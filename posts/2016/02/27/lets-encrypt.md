---
title: Let's Encrypt – Success
slug: lets-encrypt
date: "2016-02-28T05:21:28.000Z"
---

Continuing after [last week's failure](https://reesemclean.com/2016/02/24/lets-encrypt-part-one/) due to rate limiting of the Let's Encrypt API, this site is now being served using https.

Using this [guide](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04), a cron job runs a script to check if the certificate will expire in less than 30 days. If it will, the script uses the Let's Encrypt client to renew it.

Pretty neat.
