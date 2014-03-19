
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.photogallery = function(req, res) {
	res.render('photogallery', {title: 'Photo Gallery'});
};

exports.simpleelement = function(req, res) {
	res.render('simpleelement', {title: 'Simple Element'});
};