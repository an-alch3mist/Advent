/*
	start: 14:42
	Gather: 14:48
	part-1: 15:13
	part-2: 15:24
*/

function _A()
{
	console.log("somthng");
	// U.save_code(IN, /[#]/);

	Gather();
	console.log("%cCOORD:", U.css.h() , COORD);
	console.log("%cB:", U.css.h() , B);
	console.log(`start: ${start} end: ${end}, w,h: ${w}, ${h}`);

	Logic();

	// sum>>
	U.save_return("Day-18 part-2", gate_coord.join(','));
	// << sum
}

// 150ms >>
let gate_coord = [];
function Logic()
{
	for(let coord of COORD)
		B.ST(coord, 1);

	for(let i0 = COORD.length - 1; i0 >= 0; i0 -= 1)
	{
		let coord = COORD[i0];
		B.ST(coord, 0);
		let dist = pathfind(B, start, end);

		if(dist != -1)
		{
			gate_coord = coord;
			break;
		}
	}

	// exclude for the compute without U.save_code()
	U.save_code(log_B(B, start, end), /[SE#]/);
}


function pathfind(B, start, end)
{
	let w = B[0].length;
	let h = B.length;

	let RED = [];
	let BLUE = [];

	RED.push({ pos: start, dist: 0, ansc: [] });

	while(true)
	{
		// console.log(U.clone(RED), U.clone(BLUE));
		// await U.delay(100);
		// all explored
		if(RED.length == 0)
		{
			console.log("all explored");
			break;
		}

		// min: a > b, return a - b;
		let node = RED.minMax( (a, b) => a.dist - b.dist , splice = true);

		// wall
		if(B.GT(node.pos) == 1)
			continue;

		// BLUE >>
		let blue_index = BLUE.findIndex( blue => {
			return v2.eql(blue.pos, node.pos);
		});

		if(blue_index != -1)
		{
			let blue = BLUE[blue_index];
			if(node.dist == blue.dist)
				for(let ansc of node.ansc)
					blue.ansc.push(node.ansc);
			continue;
		}
		BLUE.push(node);
		// << BLUE

		// end
		if(v2.eql(node.pos, end) == true)
		{
			console.log("found end");
			return node.dist;
		}

		// neighbour >> 
		for(let dir of v2.DIRS)
		{
			let [X, Y] = v2.add(node.pos, dir);
			if(X >= 0 && X < w && Y >= 0 && Y < h)
				RED.push({pos: [X, Y], dist: node.dist + 1, ansc: [node]});
		}
		// << neighbour
	}

	return -1;
}



function log_B(B, start, end)
{
	let w = B[0].length;
	let h = B.length;

	let STR = [];
	for(let y = 0; y < h; y += 1)
	{
		STR.push([]);
		for(let x = 0; x < w; x += 1)
		{
			if(B[y][x] == 1) STR[y].push('#');
			else			 STR[y].push('.');
		}
	}

	STR.ST(start, 'S');
	STR.ST(end, 'E');
	// console.log(STR);

	let str = "";
	STR.forEach(row => str += row.join('') + '\n')

	return str;
}



let COORD = [];

let B = []
let w; let h;
let start; let end;

function Gather()
{
	//// parse IN to STORE >> ////
	COORD = IN.split('\n').map((line, y) => {
		return line.split(',').map((char, x) => parseInt(char))
	});

	start = [0, 0];
	end = [-1, -1];
	for(let coord of COORD)
	{
		if(coord[0] > end[0]) end[0] = coord[0];
		if(coord[1] > end[1]) end[1] = coord[1];
	}

	w = end[0] + 1;
	h = end[1] + 1;

	// B
	B = [];
	for(let y = 0; y < h; y += 1)
	{
		B.push([]);
		for(let x = 0; x < w; x += 1)
			B[y].push(0);
	}
	//// << parse IN to STORE ////
}

U.title("ram-run"); U.zoom("50%");
_A();