FROM node:14.16.0-alpine3.10
RUN apk add git
RUN git config --system user.name foo
RUN git config --system user.email bar@example.com
RUN npm i -g npm@7
WORKDIR /home/workdir
