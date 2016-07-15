import express from 'express';
import hbs from 'express-handlebars';
import serveStatic from 'serve-static';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import request from 'request';
import routes from './routes';
import SHARED from './js/sharedConstants';

const APIURL = SHARED.APIURL;

let port = process.env.PORT || 3000;

let app = express();
app.engine('html', hbs({ extname: 'html' }));
app.set('view engine', 'html');
app.locals.settings['x-powered-by'] = false;

app.use(serveStatic('public')); // serve public files

app.use(function (req, res, next) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    else if (renderProps) {
      res.render('layout', {
        reactHtml: renderToString(<RouterContext {...renderProps} />),
      });
    } else {
      res.status(404).send('Not found')
    }
  })
});

app.listen(port);
console.log(`FE Server listening on port ${port}`);