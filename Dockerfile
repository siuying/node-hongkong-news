FROM hypriot/rpi-iojs:latest
MAINTAINER Francis Chong <francis@ignition.hk>

ENV APP_HOME /home/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Install app
ADD ./ $APP_HOME
RUN npm install && npm run build

# Install phantomjs
RUN apt-get update && \
  apt-get install -y libfontconfig1-dev libicu-dev libfreetype6 libpng-dev libjpeg-dev && \
  rm -rf /var/lib/apt/lists/*
ADD "https://github.com/siuying/phantomjs-linux-armv7l/blob/master/phantomjs-2.0.0.tar.gz?raw=true" /bin/phantomjs

EXPOSE 5000
CMD ["npm", "start"]
