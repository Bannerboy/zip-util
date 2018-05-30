const walkdir = require('walkdir');
const path = require('path');
const archiver = require('archiver');
const fs = require('fs');

const projectPath = '/Users/alexanderflink/Repositories/clients/spotify/spotify_nft_may-2018/render/display';

let emitter = walkdir(projectPath);

const banners = [];
emitter.on('file', (filename, stat) => {
	if (path.extname(filename) === '.html') {
		banners.push(path.dirname(filename));
	}
});

emitter.on('end', () => {
	banners.forEach(banner => {
		let pathParts = banner.split('/');
		let bannerName = pathParts.pop();
		let outputPath = path.join(...pathParts);
		let output = fs.createWriteStream(banner + '.zip');
		let archive = archiver('zip', {
			zlib: {level: 9}
		});
		archive.pipe(output);
		archive.directory(banner, false);
		archive.finalize();
	});
});