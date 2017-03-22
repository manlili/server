var express = require('express');
var app = express();
var fs = require('fs');
app.use(express.static('../', {
  index: false
}));
app.use(function(req, res, next) {
	var urlPath = req.url.match(/\/([^\/]+)/); //比如req.url = 192.168.0.78:8888/jiayou/index，那么urlPath = [ '/jiayou', 'jiayou', index: 0, input: '/jiayou/index' ]
	var moduleName = urlPath[1];
	//防止把favicon.ico当做url
	if (moduleName === 'favicon.ico') {
	  res.send('');
	  return;
	}
	
	//找不到文件夹名字返回提示
	if (!urlPath) {
	 res.send(req.url + '找不到');
	 return;
	}
	//当找不到index.html，自动读取文件夹下的d.html
	var indexHtml = fs.readFileSync('../' + moduleName + '/d.html', 'utf-8');
	res.send(indexHtml);
});
app.listen(8888, function () {
  console.log('Example app listening on port 8888!');
});