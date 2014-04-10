
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.gallery = function(req, res) {
	res.render('gallery', {title: 'Gallery'});
};

exports.simpleelement = function(req, res) {
	res.render('simpleelement', {title: 'Simple Element'});
};

exports.exampleelement = function(req, res) {
	res.render('exampleelement', {title: 'Example Elements'});
};