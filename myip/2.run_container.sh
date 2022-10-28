#!/bin/bash
containerName="ip.jinhui.dev"
imageName="myip:latest"
docker container inspect ${containerName} &>/dev/null && docker container rm -f ${containerName} &>/dev/null
docker container run --name ${containerName} -p 7777:7777 --restart always --cpus 1.0 --memory 200m -d ${imageName}
