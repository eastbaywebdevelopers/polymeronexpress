
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , expressBundles = require('express-bundles')
  , stylus = require('stylus');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

app.use(require('stylus').middleware(__dirname + '/public'));

app.use(expressBundles.middleware({
  env: app.get('env'),
  src: path.join(__dirname, 'public'),
  bundles: {
    'stylesheets/coolgallery.css': [
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      'bower_components/blueimp-gallery/css/blueimp-gallery.min.css',
      'bower_components/blueimp-bootstrap-image-gallery/css/bootstrap-image-gallery.min.css'
    ],
    'stylesheets/style.css': [
      'stylesheets/style.styl'
    ],
    'javascripts/coolgallery.js': [
      'bower_components/blueimp-gallery/js/blueimp-helper.js',
      'bower_components/blueimp-gallery/js/blueimp-gallery.js',
      'bower_components/blueimp-gallery/js/blueimp-gallery-fullscreen.js',
      'bower_components/blueimp-gallery/js/blueimp-gallery-indicator.js',
      'bower_components/blueimp-gallery/js/blueimp-gallery-video.js',
      'bower_components/blueimp-gallery/js/blueimp-gallery-vimeo.js',
      'bower_components/blueimp-gallery/js/blueimp-gallery-youtube.js'
    ],
    'stylesheets/pickadate.css' : [
        'javascripts/pickadatejs/themes/default.css',
        'javascripts/pickadatejs/themes/default.date.css',
        'javascripts/pickadatejs/themes/default.time.css'
    ],
    'javascripts/pickadate.js' : [
        'javascripts/pickadatejs/picker.js',
        'javascripts/pickadatejs/picker.date.js',
        'javascripts/pickadatejs/picker.time.js',
        'javascripts/pickadatejs/legacy.js'
    ]
  },
  hooks: {
    '.styl': function(file, data, done) {
      stylus.render(data, done);
    }
  }
}));


app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.configure('development', function() {
    app.locals.pretty = true;
});


app.get('/', routes.index);
app.get('/users', user.list);
app.get('/gallery', routes.gallery);
app.get('/simpleelement', routes.simpleelement);
app.get('/exampleelement', routes.exampleelement);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
