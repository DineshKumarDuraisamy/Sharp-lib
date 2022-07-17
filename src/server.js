const axios = require('axios');
const http = require('http');
const url = require('url');
const sharp = require('./sharp/examples.js');
const canvas = require('./canvas/examples.js');

async function getImageFromUrl(url) {
	return await axios
		.get(url, { responseType: 'arraybuffer' })
		.then(res => new Buffer(res.data, 'binary'));
}

let jpgOne;
let jpgTwo;
let pngOne;

async function init() {
	jpgOne = await getImageFromUrl('https://i.imgur.com/C1ZK1h5.jpg'); // 1.10 MB 1240x1753
	jpgTwo = await getImageFromUrl('https://picsum.photos/4000'); // 4000px
	pngOne = await getImageFromUrl('https://my.mixtape.moe/uwrzpz.png'); // 872.29 KB 800x1280
}

init();

http.createServer(async (req, res) => {
	const request = url.parse(req.url, true);
	const action = request.pathname;

	if (action === '/sharp/one') {
		const img = await sharp.example1(jpgOne);

		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		res.end(img, 'binary');
	} else if (action === '/sharp/two') {
		const img = await sharp.example2(jpgTwo);

		res.writeHead(200, { 'Content-Type': 'image/png' });
		res.end(img, 'binary');
	} else if (action === '/sharp/three') {
		const img = await sharp.example3(pngOne);

		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		res.end(img, 'binary');
	} else if (action === '/canvas/one') {
		const img = await canvas.example1(jpgOne);

		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		res.end(img, 'binary');
	} else if (action === '/canvas/two') {
		const img = await canvas.example2(jpgTwo);

		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		res.end(img, 'binary');
	} else {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(`<!DOCTYPE html><html><body>
			<p>Sharp example #1</p><img src="/sharp/one" />
        	<p>Sharp example #2</p><img src="/sharp/two" />
        	<p>Sharp example #3</p><img src="/sharp/three" />
			<p>Canvas example #1</p><img src="/canvas/one" height="500" />
        	<p>Canvas example #2</p><img src="/canvas/two" />
			</body></html>`);
	}
}).listen(8080, '127.0.0.1');
