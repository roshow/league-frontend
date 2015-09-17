import express from 'express';
import hbs from 'express-handlebars';
import serveStatic from 'serve-static';
import React from 'react/addons';
import Router from 'react-router';
import routes from './routes';

var app = express();
app.engine('html', hbs({ extname: 'html' }));
app.set('view engine', 'html');
app.locals.settings['x-powered-by'] = false;

app.use(serveStatic('public')); // serve public files

app.use(function router (req, res, next) {
  var context = {
    routes: routes,
    location: req.url
  };
  Router.create(context).run(function ran (Handler, state) {
    res.render('layout', {
      reactHtml: React.renderToString(<Handler />)
    });
  });
}); // Use router

app.listen(process.env.PORT || 3000);