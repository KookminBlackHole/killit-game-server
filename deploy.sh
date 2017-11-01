#!/bin/sh

# Register your ssh key to our server before you use this script
# ssh-copy-id -i ~/.ssh/id_rsa.pub root@104.131.125.14

# backend
zip -r killit_server.zip game-server/
scp killit_server.zip root@104.131.125.14:~/backend
rm -rf killit_server.zip

ssh -tt root@104.131.125.14 'bash -s'  << 'DEPLOY'
cd backend
rm -rf game-server
unzip killit_server.zip
cd game-server
ps -aux | grep "node killit.js" | awk '{print $2}' | xargs kill -9
nohup node killit.js &
exit
DEPLOY