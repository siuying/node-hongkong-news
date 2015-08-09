# node-hongkong-news

Hong Kong news scraping as a service.

## Usage

```
npm install
npm start
```

Then open ``http://localhost:5000/`` for the API

## API

- GET /lists/{newsSource} - List today news from newsSource
- GET /news/{newsSource} - Get a news from newsSource, require a query parameter "url"
