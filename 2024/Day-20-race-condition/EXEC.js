/*
	start: 14:11
	found: 16:53 
	( part-2 taking a while even after DIST_DOC for COORD, LUT for circle )
*/
function _A()
{
	console.log("somthng");
	U.save_code(IN, /[SE]/);

	Gather();
	console.log("%cB", U.css.h(), B, start, end, w, h);

	Logic();

	// check >>
	// let CC = NW_CON_CCB(B, [1, 1], 3, w, h); console.log(CC);
	// << check

	// sum >>

	// << sum
}

/*
	pathfind
	DC_pathfind
	1.1sec 
*/
function Logic()
{
	let DIST_DOC = pathfind(B, start, end);
	console.log("%cDIST_DOC" , U.css.h() , DIST_DOC);
	let dist_start_to_end = DIST_DOC.end_node.dist;


	let min_save  = 100;	// minimum distance to be saved
	let dc_radius = 2 - 1;  // atmost 1 from node_wall.pos

	let DC_NODE = DC_pathfind(B, start, end, DIST_DOC, dc_radius);
	console.log("%cDC_NODE" , U.css.h() , DC_NODE);

	// UNQ >>
		let UNQ = [];
		for(let _node of DC_NODE)
		{
			let unq_index = UNQ.findIndex(unq => unq.dist == _node.dist);

			if(unq_index == -1)
				UNQ.push({ node: _node, dist: _node.dist, saved: dist_start_to_end - _node.dist, count: 1 });
			else
				UNQ[unq_index].count += 1
		}
		// [sort] a: next, b: curr, return a - b
		UNQ.sort((a, b) => { return -(a.dist - b.dist); });
		console.log("%cUNQ: " , U.css.h() , UNQ);

	// << UNQ
	
	// sum >>
		let sum = 0;
		for(let unq of UNQ)
		{
			let saved = dist_start_to_end - unq.dist;
			if(saved >= min_save )
				sum += unq.count;
		}
		console.log(`sum of (unique saved dist).count: ${sum}`);
		U.save_return("Day-20 part-1", sum);
	// << sum
}


// explore all and return => DIST_DOC
function pathfind(B, start, end)
{
	let RED = [];
	let BLUE = [];

	RED.push({pos: start, dist: 0, ansc: []});

	while(true)
	{
		// console.log(U.clone(RED), U.clone(BLUE));
		// all explored
		if(RED.length == 0)
		{
			console.log("all_explored");
			break;
		}

		// min: a > b, return a - b;
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
			// ANSC
			let blue = BLUE[blue_index];
			if(blue.dist == node.dist)
				for(let ansc of node.ansc)
					blue.ansc.push(ansc);
			continue;
		}

		// explore >>
		BLUE.push(node);
		// << BLUE

		// NEIGHBOUR
		for(let dir of v2.DIRS)
		{
			let [X, Y] = v2.add(node.pos, dir);
			if(X >= 0 && X < w && Y >= 0 && Y < h)
				RED.push({ pos: [X, Y], dist: node.dist + 1, ansc: [node] });
		}
		// << explore
	}

	// DIST_DOC
	return {
		end_node: BLUE.find(blue => v2.eql(blue.pos, end)),
		BLUE: BLUE,
	};
}


// explore all and return => DC_NODE, 
// require: non wall concentric circle COORD in bound(NW_CON_CCB)
// for 400 iter of while, 8.5sec when dc_rad = 20,
function DC_pathfind(B, start, end, DIST_DOC, dc_radius = 0)
{
	/*
		not a wall
		not a blue
		does not exist in DC NODE
	*/

	// optimize to GRID (reason: there are no (2 or more) blue at same pos)
	// DIST_DOC_2D contain distance to end from each non-wall pos
	let DIST_DOC_2D = B.map(row => row.map(val => -1));

	for(let blue of DIST_DOC.BLUE)
		// distance to end_node
		DIST_DOC_2D.ST(blue.pos, DIST_DOC.end_node.dist - blue.dist);
	// console.log("%cDIST_DOC_2D: " , U.css.h() , DIST_DOC_2D);

	// TO ADD
	let DC_NODE = [];

	let RED = [];
	let BLUE = [];
	let BLUE_2D_E = B.map(row => row.map(val => 0)); // 0: not in BLUE, 1: in BLUE

	RED.push({pos: start, dist: 0, ansc: []});

	while(true)
	{
		// console.log(U.clone(RED), U.clone(BLUE));
		// all explored
		if(RED.length == 0)
		{
			console.log("all_explored");
			break;
		}

		// min: a > b, return a - b;
		let node = RED.minMax((a, b) => a.dist - b.dist, splice = true);

		// wall
		if(B.GT(node.pos) == 1)
		{
			// Disable Collision or DC >>
			// let COORD = NWCCB(B, node.pos, dc_radius, w, h); // non wall circle coord in bound
			let ansc = node.ansc[0];
			let CC = NW_CON_CCB(B, node.pos, max_radius = dc_radius, w, h); // non wall concentric circle coord in bound
			// circle center at node.pos, r: dc_radius

			for(let cc of CC)
				
				if(BLUE_2D_E.GT(cc.coord) == 0) // not in blue
				{
					// DC_NODE >>
					let dc_node = 
					{ 
						wall_ansc: ansc.pos,
						empty: cc.coord,
						dist: DIST_DOC_2D.GT(cc.coord) + node.dist + cc.r,
					};

					let dc_index = DC_NODE.findIndex(_node => {
						return  v2.eql(_node.wall_ansc, dc_node.wall_ansc) &&
								v2.eql(_node.empty, dc_node.empty);
					});

					if(dc_index == -1) // not exist in DC_NODE
						DC_NODE.push(dc_node)
					// << DC_NODE
				}
			// << Disable COllision or DC

			continue;
		}

		// BLUE >>
		let blue_index = BLUE.findIndex(blue => {
			return v2.eql(blue.pos, node.pos);
		});

		if(blue_index != -1)
		{
			// ANSC
			let blue = BLUE[blue_index];
			if(blue.dist == node.dist)
				for(let ansc of node.ansc)
					blue.ansc.push(ansc);
			continue;
		}

		// explore >>
		BLUE.push(node);
		BLUE_2D_E.ST(node.pos, 1);
		// << BLUE

		// NEIGHBOUR
		for(let dir of v2.DIRS)
		{
			let [X, Y] = v2.add(node.pos, dir);
			if(X >= 0 && X < w && Y >= 0 && Y < h)
				RED.push({ pos: [X, Y], dist: node.dist + 1, ansc: [node] });
		}
		// << explore
	}

	return DC_NODE;
}


// non wall circle COORD in bound
function NWCCB(B, pos, r, w, h)
{
	let COORD = [];

	for(let y = -r; y <= +r; y += 1)
	for(let x = -r; x <= +r; x += 1)
	{
		if(x * x + y * y <= r * r)
		{
			let [X, Y] = v2.add(pos, [x, y]);
			if(X >= 0 && X < w && Y >= 0 && Y < h)
			if(B.GT([X, Y]) != 1)
				COORD.push([X, Y]);
		}
	}

	return COORD;
}

// non wall concentric circle COORD in bound
let LUT = []; // { coord: , r:  }
function NW_CON_CCB(B, pos, max_radius, w, h)
{
	// only at begining INITIALIZE LUT, concentric circle coord with r
	if(LUT.length == 0)
	{
		for(let r = max_radius; r >= 0; r -= 1)
		for(let y = -r; y <= +r; y += 1)
		for(let x = -r; x <= +r; x += 1)
			if(x * x + y * y <= r * r)
			{
				let cc_index = LUT.findIndex(cc => v2.eql(cc.coord, [x, y]));
				// set coord.r to min(prev_coord.r, r)
				if(cc_index != -1)
				{
					let coord = LUT[cc_index];
					if(r < coord.r)
						coord.r = r;
				}
				else
					LUT.push({ coord: [x, y], r: r});
			}
	}

	// coord , radius
	let CC = [];
	for(let cc of LUT)
	{
		let [X, Y] = v2.add(pos, cc.coord);
		// in bounds
		if(X >= 0 && X < w && Y >= 0 && Y < h)
		// not a wall
		if(B.GT([X, Y]) != 1)
		{
			CC.push({ coord: [X, Y], r: cc.r })
		}

	}
	return CC;
}



let B = [];
let start; let end;
let w; let h;
function Gather()
{
	// parse IN here >>
	B = IN.split('\n').map((line , y) => {
		return line.split('').map((char, x) => {
			if(char == 'S') start = [x, y];
			if(char == 'E') end = [x, y];

			if(char == '#')
				return 1;
			else
				return 0;
		})
	})

	w = B[0].length;
	h = B.length;
	// << parse IN here
}


U.title("race-condition"); U.zoom("50%");
_A();