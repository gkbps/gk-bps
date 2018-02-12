import { Injectable } from '@angular/core';

import * as Tinycolor from 'tinycolor2';

@Injectable()
export class ColorService {

  _seed: any;

  chartColors = {
    red: 'rgb(255, 99, 132)',
  	orange: 'rgb(255, 159, 64)',
  	yellow: 'rgb(255, 205, 86)',
  	green: 'rgb(75, 192, 192)',
  	blue: 'rgb(54, 162, 235)',
  	purple: 'rgb(153, 102, 255)',
  	grey: 'rgb(201, 203, 207)'
  };

  Months = [
    'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
  ];

  COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

  constructor() {
  }

	stringToColour(str) {
	  let hash = 0;
		for (let i = 0; i < str.length; i++) {
	  	hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
	  let colour = '#';
	  for (let i = 0; i < 3; i++) {
	    let value = (hash >> (i * 8)) & 0xFF;
	    colour += ('00' + value.toString(16)).substr(-2);
	  }
	  return colour;
	}

  srand(seed) {
		this._seed = seed;
	}

	rand(min?, max?) {
		let seed = this._seed;
		min = min === undefined ? 0 : min;
		max = max === undefined ? 1 : max;
		this._seed = (seed * 9301 + 49297) % 233280;
		return min + (this._seed / 233280) * (max - min);
	}

  numbers(config) {
		let cfg = config || {};
		let min = cfg.min || 0;
		let max = cfg.max || 1;
		let from = cfg.from || [];
		let count = cfg.count || 8;
		let decimals = cfg.decimals || 8;
		let continuity = cfg.continuity || 1;
		let dfactor = Math.pow(10, decimals) || 0;
		let data = [];
		let i, value;

		for (i = 0; i < count; ++i) {
			value = (from[i] || 0) + this.rand(min, max);
			if (this.rand() <= continuity) {
				data.push(Math.round(dfactor * value) / dfactor);
			} else {
				data.push(null);
			}
		}

		return data;
	}

  labels(config) {
		let cfg = config || {};
		let min = cfg.min || 0;
		let max = cfg.max || 100;
		let count = cfg.count || 8;
		let step = (max - min) / count;
		let decimals = cfg.decimals || 8;
		let dfactor = Math.pow(10, decimals) || 0;
		let prefix = cfg.prefix || '';
		let values = [];
		let i;

		for (i = min; i < max; i += step) {
			values.push(prefix + Math.round(dfactor * i) / dfactor);
		}

		return values;
	}

  months(config) {
		let cfg = config || {};
		let count = cfg.count || 12;
		let section = cfg.section;
		let values = [];
		let i, value;

		for (i = 0; i < count; ++i) {
			value = this.Months[Math.ceil(i) % 12];
			values.push(value.substring(0, section));
		}

		return values;
	}

  color(index) {
		return this.COLORS[index % this.COLORS.length];
	}

	transparentize(color, opacity) {

		let alpha = opacity === undefined ? 0.5 : 1 - opacity;

		let tmp = Tinycolor(color);
		tmp.setAlpha(alpha);
		// console.log(color);
		// console.log(tmp);
		return tmp.toRgbString();
		// return Color(color).alpha(alpha).rgbString();
	}

}
