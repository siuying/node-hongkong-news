FROM iojs:1.6
MAINTAINER Francis Chong <francis@ignition.hk>

RUN apt-get update && \
  apt-get install -y zip && \
  rm -rf /var/lib/apt/lists/*

ENV APP_HOME /home/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Install app
ADD ./ $APP_HOME
VOLUME $APP_HOME/node_modules
RUN npm install && npm run build

CMD ["npm", "start"]
