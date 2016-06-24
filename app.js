import express from 'express';
import hbs from 'express-handlebars';
import serveStatic from 'serve-static';
import React from 'react/addons';
import Router from 'react-router';
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

app.use(function router (req, res, next) {
  let context = {
    routes: routes,
    location: req.url
  };
  Router.create(context).run(function ran (Handler, state) {
  	request(`${APIURL}/api/players`, function (error, response, body) {
		    res.render('layout', {
		      reactHtml: React.renderToString(<Handler data={body} />),
		      players: body
		    });
		  });
  });
}); // Use router

app.listen(port);
console.log(`FE Server listening on port ${port}`);