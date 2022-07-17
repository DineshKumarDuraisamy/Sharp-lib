const sharp = require('sharp');

function example1(img) {
	return sharp(img)
		.resize(500, 500, {
			fit: 'inside', // With the max size of either dimension being 1000px
			withoutEnlargement: true // Don't change dimensions if already smaller
		}) // Resize to 1000x1000
		.trim() // Trim the white border
		.jpeg({ quality: 90 }) // Format as a JPEG with quality 90
		.toBuffer(); // Return as a Buffer
}

function example2(img) {
	return sharp(img)
		.resize(2000, 2000) // Resize to 2000x2000
		.extract({
			top: 500,
			left: 500,
			width: 1000,
			height: 1000
		}) // Crop the image to 1000px with an offset of 500px
		.png({ progressive: true }) // Format as progressive png
		.toBuffer(); // Return as a Buffer
}

function example3(img) {
	return sharp(img)
		.flop() // Flip horizontally
		.grayscale() // Grayscale
		.blur(5) // Blur
		.jpeg({ quality: 95 }) // Format as a JPEG with quality 95
		.toBuffer(); // Return as a Buffer
}

module.exports = {
	example1,
	example2,
	example3
};
