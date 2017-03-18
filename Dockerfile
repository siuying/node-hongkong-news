FROM node:7
MAINTAINER Francis Chong <francis@ignition.hk>

ENV APP_HOME /home/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN apt-get update &&\
    apt-get install -y libgtk2.0-0 libgconf-2-4 \
    libasound2 libxtst6 libxss1 libnss3 xvfb

# Install app
ADD ./ $APP_HOME
RUN npm install && npm run build

EXPOSE 5000
CMD ["npm", "start"]
