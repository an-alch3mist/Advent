/*
	start: 1:30
	found: 3:32

	spent most on 
		U.save(code) rechecked
		final iter before (sum vs log_str)
*/
function _A()
{
	// console.log("somthng");
	U.save_code('#', /[#]/);

	Gather();
	console.log("%cBOTS:", U.css.h() , BOTS);
	console.log("%cB:", U.css.h() , B);

	Logic();


	let SUM = [0, 0, 0, 0,];
	/*
		0 1
		2 3
	*/
	for(let bot of BOTS)
	{
		let [x, y] = bot.p;
		let x_half = U.floor(w / 2);
		let y_half = U.floor(h / 2);

		if(x < x_half)
		{
				 if( y < y_half) SUM[0] += 1;
			else if( y > y_half) SUM[2] += 1;
		}
		if(x > x_half)
		{
				 if( y < y_half) SUM[1] += 1;
			else if( y > y_half) SUM[3] += 1;
		}
	}
	
	let prod = 1; SUM.forEach(val => prod = prod * val);
	console.log(`prod: ${prod}`);
}

function Logic()
{
	let str = "";
	//
	for(let bot of BOTS)
		B[bot.p[1]][bot.p[0]] += 1;
	str += `<l>@:${0}</l>\n${log_B(B, BOTS)}\n\n\n`;

	for(let iter = 0 ; iter < 10000; iter += 1)
	{
		for(let bot of BOTS)
		{
			// B
			B[bot.p[1]][bot.p[0]] -= 1;
			// move
			let next_p = v2.add(v2.add(bot.p, bot.v), [w, h]);
			bot.p = [ next_p[0] % w, next_p[1] % h ];
			// B
			B[bot.p[1]][bot.p[0]] += 1;
		}


		// ad >> 
		let found_line;
		let line_length = 7;
		for(let y = 0; y < h && !found_line; y += 1)
		for(let x = 0; x < w && !found_line; x += 1)
		{
			found_line = true;
			for(let i0 = 0; i0 < line_length; i0 += 1)
				found_line = (found_line && (B[y][x + i0] > 0));
		}
		// << ad

		if(found_line == true)
			str += `<l>@:${iter + 1}</l>\n${log_B(B, BOTS)}\n\n\n`;
	}

	U.save_code(str, /[]/);
	U.clipboard(str);
}

// ad >>
function log_B(B, BOTS)
{
	let str = "";
	B.forEach((row, y) => {
		str += row.map((val, x) => (val >= 1)? '#' : ' ') .join('');

		if( y != h - 1) str += '\n';
	});

	return str;
}
// << ad

let BOTS = [];
let w; let h;
let B = [];

function Gather()
{
	//// parse IN to STORE >> ////
	w = 0; h = 0;

	BOTS = IN.split('\n').map( line => {
		[p, v] = line.split(' ').map( word => word.split('=')[1].split(',')
								.map(char => parseInt(char)) );

		if(p[0] > w) w = p[0];
		if(p[1] > h) h = p[1];

		return { p: p, v: v,};
	});

	w += 1; h += 1;

	// B
	for(let y = 0; y < h; y += 1)
	{
		B.push([]);
		for(let x = 0; x < w; x += 1)
			B[y][x] = 0;
	}

	//// << parse IN to STORE ////
}

U.title("restroom-redoubt");
U.zoom("50%");
_A();