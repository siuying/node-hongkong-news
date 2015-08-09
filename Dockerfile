FROM iojs:2.5
MAINTAINER Francis Chong <francis@ignition.hk>

ENV APP_HOME /home/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Install app
ADD ./ $APP_HOME
RUN npm install && npm run build

# Install phantomjs
ADD "https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64.tar.bz2" /phantomjs.tar.bz2
RUN tar vxfj /phantomjs.tar.bz2 && \
  mv phantomjs-1.9.8-linux-x86_64/bin/phantomjs /bin/phantomjs && \
  rm -rf phantomjs*

EXPOSE 5000
CMD ["npm", "start"]
