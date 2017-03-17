FROM node:7
MAINTAINER Francis Chong <francis@ignition.hk>

ENV APP_HOME /home/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Install app
ADD ./ $APP_HOME
RUN npm install && npm run build

EXPOSE 5000
CMD ["npm", "start"]
