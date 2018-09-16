---
title: "Installing Ubuntu codecs (restricted formats)"
date: "2008-04-29T15:27:25.000Z"
aliases: ["2008/04/29/installing-ubuntu-codecs-restricted-formats"]
tags: []
---

Every time I install ubuntu on a new machine for my parents, friends, cousins, etc. I stumble against the same problem after a couple of days.... They couldn't play an mp3, or watch a movie, or enjoy a video on youtube.

Today I found a short answer on the http://help.ubuntu.com page:

<code> $ sudo apt-get install ubuntu-restricted-extras </code>

This command will install several codecs that could be installed separately. The description from ubuntu reads:

<cite>This package depends on some commonly used packages in the Ubuntu multiverse repository.

Installing this package will pull in support for MP3 playback and decoding, support for various other audio formats (gstreamer plugins), Microsoft fonts, Java runtime environment, Flash plugin, LAME (to create compressed audio files), and DVD playback.

Please note that packages from multiverse are restricted by copyright or legal issues in some countries. See http://www.ubuntu.com/ubuntu/licensing for more information </cite>

This solution is for ubuntu 8.04, 7.10, and maybe also 7.04. The page where I got this is: https://help.ubuntu.com/community/RestrictedFormats.

Cheers!