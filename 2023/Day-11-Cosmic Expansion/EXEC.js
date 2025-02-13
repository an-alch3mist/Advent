/*
	start: 19:21
	found: 20:10
*/
function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cB:", U.css.h() , B);
	console.log("%cP:", U.css.h() , P);
	console.log("%cLINE:", U.css.h() , X_LINE, Y_LINE);

	Logic();
	// sum>>

	// << sum
}

// >> 10ms
function Logic()
{
	// offset >>
	for(let p of P)
	{
		let count = [0, 0];
		for(let line of X_LINE)
			if(line.coord[1] < p[1])
				count[1] += 1;
	
		for(let line of Y_LINE)
			if(line.coord[0] < p[0])
				count[0] += 1;

		// console.log(count, p);
		let m = 10**6;
		// offset by m times the count_X, _Y
		P[P.indexOf(p)] = v2.add(p, [ count[0] * (m - 1), count[1] * (m - 1)]);
	}
	// << offset

	// bound >>
	let w = 0;let h = 0;
	for(let p of P)
	{
		if(p[0] > w) w = p[0];
		if(p[1] > h) h = p[1];
	}
	w += 1; h += 1;
	// << bound


	let get_dist = (a, b) => 
	{
		let delta = v2.diff(a, b);
		return Math.abs(delta[0]) + Math.abs(delta[1]);
	}
	
	let sum = 0n;
	for(let i0 = 0; i0 <= P.length - 2; i0 += 1)
		for(let i1 = i0 + 1; i1 <= P.length - 1; i1 += 1)
		{
			ITER.iter_inc(10**6);
			// console.log(i0 + 1, i1 + 1, "dist:" , get_dist(P[i0], P[i1]));
			sum += BigInt(get_dist(P[i0], P[i1]));
		}
	console.log(`total iter: ${ITER.iter}`);
	console.log(`sum(dist between pair after expanding: %c${sum}`, U.css.h2g());

	// just to log >>
		/*
		let STR = [];
		for(let y = 0; y < h ; y += 1)
		{
			STR.push([]);
			for(let x = 0; x < w; x += 1)
				STR[y].push('.');
		}

		for(let p of P)
			STR.ST(p, (P.indexOf(p) + 1) % 10);
		let str = "";
		STR.forEach(row => str += row.join('') + '\n');

		U.save_code(str, /[0-9]/);
		*/
	// << just to log
}


let B;
let P;
let X_LINE; let Y_LINE;

function Gather()
{
	//// parse IN to STORE >> ////
	P = [];
	B = IN.split('\n').map((line, y) => {
		return line.split('').map((char, x) => {
			if(char == '#') P.push([x, y]);

			if(char == '#')
				return '#';
			else
				return '.';
		});
	});

	let w = B[0].length; let h = B.length;

	// LINE
	X_LINE = [];
	for(let y = 0; y < h; y += 1)
	{
		let is_empty = true;
		for(let x = 0; x < w; x += 1)
			if(B.GT([x, y]) == '#')
			{
				is_empty = false
				break;
			}
		if(is_empty == true)
			X_LINE.push({ coord: [0, y], length: w });
	}


	Y_LINE = [];
	for(let x = 0; x < w; x += 1)
	{
		let is_empty = true;
		for(let y = 0; y < h; y += 1)
			if(B.GT([x, y]) == '#')
			{
				is_empty = false
				break;
			}
		if(is_empty == true)
			Y_LINE.push({ coord: [x, 0], length: h });
	}


	//// << parse IN to STORE ////
}

// U.title("somthng");
U.zoom("50%");
_A();