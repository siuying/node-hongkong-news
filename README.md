# node-hongkong-news

Hong Kong news scraping as a service.

## Usage

```
npm install
npm start
```

then head to ``http://localhost:5000/`` for the AppleDaily

## API

- GET /lists/{newsSource} - List today news from newsSource
- GET /news/{newsSource} - Get a news from newsSource, require a query parameter "url"
