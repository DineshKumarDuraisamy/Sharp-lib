const { createCanvas, loadImage, registerFont } = require('canvas');
// Fonts must be loaded from the filesystem
registerFont(__dirname + '/Roboto.ttf', { family: 'Roboto', weight: 'normal' });

async function example1(img) {
	img = await loadImage(img); // Load the image first to get its dimensions
	const canvas = createCanvas(img.width, img.height);
	const ctx = canvas.getContext('2d');

	ctx.drawImage(img, 0, 0); // Draw the image onto the canvas

	// Writing text
	ctx.font = '122px Roboto';
	ctx.fillStyle = '#FFF';
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 10;
	const text = 'Mirai Kuriyama';
	const textDimen = ctx.measureText(text);
	// Stroke text, then fill
	ctx.strokeText(text, img.width / 2 - textDimen.width / 2, img.height - 48);
	ctx.fillText(text, img.width / 2 - textDimen.width / 2, img.height - 48);

	return canvas.toBuffer();
}

async function example2(img) {
	img = await loadImage(img);
	const canvas = createCanvas(200, 150);
	const ctx = canvas.getContext('2d');

	// Write "Awesome!"
	ctx.font = '30px Roboto';
	ctx.rotate(0.1); // Rotates all operations done after this, not the current canvas
	ctx.fillText('Awesome!', 50, 100);

	// Draw line under text
	var text = ctx.measureText('Awesome!'); // Text measurement!
	ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
	ctx.lineWidth = 3;
	ctx.beginPath(); // Start drawing a path for the line
	ctx.lineTo(50, 105);
	ctx.lineTo(50 + text.width, 105);
	ctx.stroke(); // Create stroke on the current path

	// Draw image
	ctx.drawImage(img, 50, 0, 140, 70);

	return canvas.toBuffer();
}

module.exports = {
	example1,
	example2
};
