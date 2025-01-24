/*
	start: 00:53
	found: 
*/

function _A()
{
	U.save_code(IN, /[SE]/);
	Gather();

	console.log("%cB", U.css.h(), B, start, end, w, h);

	Logic();

	// check get_NW_CON_CCOORD >> checked
	// let CC = get_NW_CON_CCOORD(B, pos = [1, 3], max_radius = 2);
	// console.log(CC);
}

// 2.17sec
function Logic()
{
	let DOC = pathfind(B, start, end);
	console.log("DOC: ", DOC);

	let DC_NODE = Disable_Collision(DOC, dc_radius = 20);
	console.log("DC_NODE: ", DC_NODE);
	let min_save = 100;

	// just to log >>
	/*
		let UNQ = DC_NODE.UNQ(dc_node => dc_node.saved_dist);
		// [sort] a: next, b: curr, return a - b
		UNQ.sort((a, b) => { return a.key - b.key; });

		for(let unq of UNQ)
			if(unq.key >= min_save)
				console.log(unq);
	*/
	// << just to log

	let sum = 0;
	for(let dc_node of DC_NODE)
		if(dc_node.saved_dist >= min_save)
			sum += 1;

	//
	console.log(`sum(dc_node with .saved_dist >= min_save): ${sum}`);
	U.save_return("Day-12 part-2", sum);
}


function pathfind(B, start, end)
{
	let w = B[0].length; let h = B.length;

	let RED = [];
	let BLUE = [];

	RED.push({ pos: start, dist: 0, ANSC: [] });

	while(true)
	{
		// all explored
		if(RED.length == 0)
		{
			console.log("all-explored");
			break;
		}

		// a < b, return a - b;
		let node = RED.minMax((a, b) => a.dist - b.dist, splice = true);

		// wall
		if(B.GT(node.pos) == 1)
			continue;

		// BLUE >>
		let blue_index = BLUE.findIndex(blue => {
			return v2.eql(blue.pos, node.pos);
		});

		if(blue_index != -1)
		{
			let blue = BLUE[blue_index];
			if(blue.dist == node.dist)
				for(let ansc of node.ANSC)
					blue.ANSC.push(ansc);
			continue;
		}
		
		// explore node >>
		BLUE.push(node);
		// << BLUE

		// NEIGHBOUR
		for(let dir of v2.DIRS)
		{
			let [X, Y] = v2.add(node.pos, dir);
			if(X >= 0 && X < w && Y >= 0 && Y < h)
				RED.push({ pos: [X, Y], dist: node.dist + 1, ANSC: [node] });
		}
		// << explore node
	}

	let DOC = 
	{ 
		BLUE: BLUE, 
		end_node: BLUE.find(blue => v2.eql(blue.pos, end)),
	};
	return DOC;
}

function Disable_Collision(DOC, dc_radius = 0)
{
	let RED = [];
	let BLUE = [];
	let BLUE_explored = B.map(row => row.map(val => -1));
	RED.push({ pos: start, dist: 0, ANSC: [] });

	/* { 
		start_dc: [x, y], 
		end_dc: [x, y], 
		total_dist: dist(start_to_start_dc) + radius + dist(end_dc_to_end)  
	}*/
	let DC_NODE = [];

	let main_dist = DOC.end_node.dist;

	let DIST_from_start = B.map(row => row.map(val => -1));
	for(let blue of DOC.BLUE)
		DIST_from_start.ST(blue.pos, blue.dist);


	while(true)
	{
		// all explored
		if(RED.length == 0)
		{
			console.log("all-explored");
			break;
		}

		// a < b, return a - b;
		let node = RED.minMax((a, b) => a.dist - b.dist, splice = true);

		// wall
		if(B.GT(node.pos) == 1)
			continue;

		// BLUE >>
		let blue_index = BLUE.findIndex(blue => {
			return v2.eql(blue.pos, node.pos);
		});

		if(blue_index != -1)
		{
			let blue = BLUE[blue_index];
			if(blue.dist == node.dist)
				for(let ansc of node.ANSC)
					blue.ANSC.push(ansc);
			continue;
		}
		
		// explore node >>
		let CC = get_NW_CON_CCOORD(B, pos = node.pos, max_radius = dc_radius);
		// console.log(CC, node.pos);
		for(let cc of CC)
		{
			if(BLUE_explored.GT(cc.coord) == 1)
				continue;

			let dc_node = 
			{
				start_dc: node.pos,
				end_dc: cc.coord,
				r: cc.r,
				// dist(start_to_start_dc) + 
				// radius + 
				// dist(end_dc_to_end)  
				total_dist: node.dist + 
							cc.r +
							main_dist - DIST_from_start.GT(cc.coord),
				saved_dist: main_dist - 
							(node.dist + 
							cc.r +
							main_dist - DIST_from_start.GT(cc.coord)),
			}
			DC_NODE.push(dc_node);
		}

		BLUE.push(node);
		BLUE_explored.ST(node.pos, 1);
		// << BLUE

		// NEIGHBOUR
		for(let dir of v2.DIRS)
		{
			let [X, Y] = v2.add(node.pos, dir);
			if(X >= 0 && X < w && Y >= 0 && Y < h)
				RED.push({ pos: [X, Y], dist: node.dist + 1, ANSC: [node] });
		}
		// << explore node
	}

	return DC_NODE;
}


// get non wall concentric circular coordinates

let CC_LUT = [];
let get_NW_CON_CCOORD = function(B, pos, max_radius)
{
	// cc = { coord: [x, y], r: radius };

	let w = B[0].length; h = B.length;
	let get_dist = ([x, y]) => Math.abs(x) + Math.abs(y);

	if(CC_LUT.length == 0)	// 2sec to 200ms for 15x15 B
	{
		for(let r = max_radius; r >= 0; r -= 1)
		for(let y = -r; y <= +r; y += 1) 
		for(let x = -r; x <= +r; x += 1) 
			if(get_dist([x, y]) <= r)
			{
				let cc_index = CC_LUT.findIndex(_cc => v2.eql(_cc.coord, [x, y]));
				if(cc_index != -1)
					CC_LUT[cc_index].r = r;
				else
					CC_LUT.push({ coord: [x, y], r: r });
			}
		// console.log(CC_LUT);
	}

	let CC = [];
	for(let cc of CC_LUT)
	{
		let [X, Y] = v2.add(pos, cc.coord);
		if(X >= 0 && X < w && Y >= 0 && Y < h)
		if(B.GT([X, Y]) == 0)
			CC.push({ coord: [X, Y], r: cc.r });
	}
	return CC;
}



let B;
let start; let end;
let w; let h;

function Gather()
{
	// parse IN here >>
	B = IN.split('\n').map( (line , y) => {
		return line.split('').map((char , x) => {
			if(char == 'S') start = [x, y];
			if(char == 'E') end = [x, y];

			if(char == '#')
				return 1;
			else
				return 0;
		});
	});

	w = B[0].length;
	h = B.length;
	// << parse IN here
}

U.title("race-condition"); U.zoom("50%");
_A();