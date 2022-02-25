
#! /bin/sh

ROOT_DIR=$(git rev-parse --show-toplevel)
CONTAINER_NAME="website-next"
CONTAINER_ID=$(docker ps | grep $CONTAINER_NAME | awk '{print $1}')

if [ -n "$CONTAINER_ID" ]
then
    # use httpd
    echo "reload"
    # use nginx
    docker exec -it $CONTAINER_NAME nginx -s reload
else
    # use httpd
    # docker run -dit --name $CONTAINER_NAME -p 80:80 -v $ROOT_DIR/site2/website-next/build:/usr/local/apache2/htdocs/ -v $ROOT_DIR/site2/website-next/scripts/httpd.conf:/usr/local/apache2/conf/httpd.conf httpd:2.4-alpine
    # use nginx
    docker run --name $CONTAINER_NAME -d -p 80:80 -v $ROOT_DIR/site2/website-next/build:/usr/share/nginx/html nginx:1.18.0-alpine
    # test old website
    # docker run --name $CONTAINER_NAME -d -p 80:80 -v $ROOT_DIR/../pulsar/site2/website/build/pulsar:/usr/share/nginx/html nginx:1.18.0-alpine
fi


echo "Website is running: http://localhost"
