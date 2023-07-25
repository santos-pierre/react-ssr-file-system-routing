import express from 'express';
import React from 'react';
import { readdirSync } from 'node:fs';
import { join } from 'node:path'
import { renderToString } from 'react-dom/server';

const app = express();

app.use(express.static('dist'));

const pages = readdirSync(join(process.cwd(),'pages')).map(file => file.split('.')[0]);

pages.forEach((page) => {
	app.get(`/${page === 'index' ? '' : page}`, async (req, res) => {
		const module = await import(`./pages/${page}`);
		const Component = module.default;

		let props = {};

		if(module.getSSP) {
			props = await module.getSSP(req);
		}

		let seo = {} as any;

		if (module.getSEO) {
			seo = await module.getSEO();
		}

		res.send(`
			<!DOCTYPE html>
			<html>
				<head>
					<title>${seo.title ? seo.title : 'SSR- React APP'}</title>
				</head>
				<body>
					<div id="root">${renderToString(<Component {...props} />)}</div>
				</body>
			</html>
		`)
	})
});


app.listen(3000, () => {
	console.log('Server listenning');
});
