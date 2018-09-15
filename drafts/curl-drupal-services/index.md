---
title: "Curl, Drupal, Services"
date: "2012-09-26T02:11:19.000Z"
aliases: []
tags: []
---

    curl -X POST -i -H "Content-type: application/json" -b cookies.txt -X POST http://jack.noesisenergy.com:8888/service/userprofile/login -d '
                                       {
                                         "username":"admin",
                                         "password":"brazos78759"
                                       }
                                       '

    curl -i -H "Content-type: application/json" -b cookies.txt -X POST http://jack.noesisenergy.com:8888/service/comment -d '
                                       {
                                         "nid":"579",
                                         "subject":"Test Subject",
                                         "comment_body": { "und": [ { "value": "Test Comment" } ] }
                                       }
                                       '


    curl -i -H "Content-Type: application/json" -b cookies.txt -X POST http://jack.noesisenergy.com:8888/service/userprofile/logout