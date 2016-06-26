import express from 'express';
import hbs from 'express-handlebars';
import serveStatic from 'serve-static';
import React from 'react';
import request from 'request';
import routes from './routes';
import SHARED from './js/sharedConstants';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

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
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      // res.status(200).send(renderToString(<RouterContext {...renderProps} />))
      // console.log(renderProps);
      request(`${APIURL}/api/players`, function (error, response, body) {
        res.render('layout', {
          reactHtml: renderToString(<RouterContext {...renderProps} />),
          players: body
        });
      });
    } else {
      res.status(404).send('Not found')
    }
  })
  // let context = {
  //   routes: routes,
  //   location: req.url
  // };
  // // Router.create(context).run(function (Handler, state) {
  // // 	request(`${APIURL}/api/players`, function (error, response, body) {
	 // //    res.render('layout', {
	 // //      reactHtml: React.renderToString(<Handler />),
	 // //      players: body
	 // //    });
	 // //  });
  // // });
}); // Use router

app.listen(port);
console.log(`FE Server listening on port ${port}`);