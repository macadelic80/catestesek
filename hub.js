const Argv = process.argv.slice(2),
		Fs = require("fs"),
		Url = require('url'),
		Path = require('path'),
		Express = require("express");


let server = Express().use((req, res) => {
	const parsedUrl = Url.parse(req.url);
	let pathname = `./${parsedUrl.pathname}`;
	console.log(pathname);
	const mimeType = {
		'.ico': 'image/x-icon',
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.json': 'application/json',
		'.css': 'text/css',
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.wav': 'audio/wav',
		'.mp3': 'audio/mpeg',
		'.pdf': 'application/pdf',
	};
	Fs.exists(pathname, function (exist) {
		if(!exist) {
			res.statusCode = 404;
			res.end(`File ${pathname} not found!`);
			return;
		}
		if (Fs.statSync(pathname).isDirectory()) {
			pathname += 'index.html';
		}
		Fs.readFile(pathname, function(err, data){
			if(err){
				res.statusCode = 500;
				res.end(`Error getting the file: ${err}.`);
			} else {
				const ext = Path.parse(pathname).ext;
				res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
				res.end(data);
			}
		});
	});
}).listen(process.env.PORT || 8080);

setInterval(()=>{
	console.log("Ca marche ienb")
}, 25 * 1000)