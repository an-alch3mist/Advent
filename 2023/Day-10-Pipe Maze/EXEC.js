/*
	start: 21:37
	found: 
		part-1: 22:14
		part-2: 
			TODO =>
				# paint the path(with longest loop)
				=> get_BEST_PATH even with backtracking, seq.push() is going max_stack 
				   for a 6800 path size
				
				# flood fill id: (tile that is not part of main loop)
					# region which is surrounded by pipe outline are considered as enclosed region
				=> # flood-fill region will work only over tile based

				TODO:
					............
					..S------7..
					..|F----7|..
					..||OOOO||..
					..||OOOO||..
					..|L-7F-J|..
					..|II||II|..
					..L--JL--J..
					............
					
				given a pos, check weather 
					# it stays in the loop 
					or 
					# can slip to out-bound region
*/

// recursive depth limit 1 << 12

function _A()
{
	U.save_code(IN, /[SE\-\|]/);
	Gather();
	console.log("%cB:", U.css.h(), B, start, end, w, h);

	Logic();
}

// >> 1400 ms
function Logic()
{
	// pathfind >>
	// DOC => { BLUE: , end_node: blue node with >= 2 ANSC  }
	let DOC = pathfind(B, start);
	console.log("%cDOC:", U.css.h(), DOC);

	let MAIN_PIPE = B.map(row => row.map(() => 0));
	for(let blue of DOC.BLUE)
		MAIN_PIPE.ST(blue.pos, 1);
	console.log(MAIN_PIPE);
	// << pathfind






	// 0. convert to GRID
	let GRID_B = get_GRID_SPACE(B, DOC.BLUE);

	// 1. a. compare a non pipe tile on B with flood_fill(GRID_B)
	// 	  b. if it does'nt interact with out bounds.... thats the tile we looking for
	let REGION = flood_fill_CHAR_GRID(GRID_B);
	console.log("%cREGION:", U.css.h(), REGION);

	let REGION_MAP = GRID_B.map(row => row.map(() => null));
	for(let region of REGION)
		for(let pos of region.POS)
			REGION_MAP.ST(pos, region);
	console.log("%cREGION_MAP:", U.css.h() ,REGION_MAP);

	// 1. b. >>
	// [get contact with outer bounds] from converted edge-maze-coord to grid-maze coord
	let get_cwo_pipe = (pos, REGION_MAP) =>
	{
		let region = REGION_MAP.GT([ pos[0] * 3 + 1, pos[1] * 3 + 1 ]);
		return region.contact_w_outer_bound;
	};

	// just to log >>
		let STR = B.map(row => row.map(() => '_'));
		for(let y = 0; y < h; y += 1)
		for(let x = 0; x < w; x += 1)
		{
			if(MAIN_PIPE.GT([x, y]) == 1)
			{
				STR.ST([x, y], '+')
				continue;
			}	

			let cwo_pipe = get_cwo_pipe([x, y], REGION_MAP);
			STR.ST([x, y], (cwo_pipe == true)? 'o': 'I');
		}
		let str = "";
		STR.forEach(row => str += row.join('') + '\n');
		// console.log(str);
	// << just to log

	let sum = 0;
	for(let y = 0; y < h; y += 1)
	for(let x = 0; x < w; x += 1)
		if(MAIN_PIPE.GT([x, y]) == 0)	// not in main pipe
		if(get_cwo_pipe([x, y], REGION_MAP) == false) // region in contact with outer region
			sum += 1;

	console.log(`count(tile not in main-pipe that is in contact with outer bound): %c${sum}`, U.css.h2g());
	U.save_return("Day-10 part-2", sum);
	// << 1. b.
}


// TODO: Generalize flood_fill()
function flood_fill_CHAR_GRID(B)
{
	let w = B[0].length; let h = B.length;

	let EXPLORE = B.map(row => row.map(() => 0));
	// console.log(EXPLORE);

	let REGION = [];
	for(let y = 0; y < h; y += 1)
	for(let x = 0; x < w; x += 1)
	{
		if(EXPLORE.GT([x, y]) == 1)
			continue;

		// region
		let region = 
		{ 
			POS: [], id: B.GT([x, y]), 
			contact_w_outer_bound: false,
		}; 
		region.POS.push([x, y]);

		while(true)
		{
			// all explored
			let all_explored = true;

			// pick an explored pos
			for(let pos of region.POS)
				for(let dir of v2.DIR)
				{
					let [X, Y] = v2.add(pos, dir);
					if( X >= 0 && X < w && Y >= 0 && Y < h )
					{
						// not explored yet
						if(EXPLORE.GT([X, Y]) == 0)
							// same id
							if(B.GT([X, Y]) == region.id)
							{
								// explore pos >>
								EXPLORE.ST([X, Y], 1);
								region.POS.push([X, Y]);
								all_explored = false;
								// << explore pos
							}
					}
					else
						region.contact_w_outer_bound = true;
				}

			// all explored exit
			if(all_explored == true)
				break;
		}

		REGION.push(region);
	}
	return REGION;
}


function get_GRID_SPACE(B, BLUE)
{
	// WFC TILE module approach
	let TILE = new Map(
	[
	//	tile   rdlu => in txt space //
		['|', "xoxo"],
		['-', "oxox"],
		['L', "oxxo"],
		['J', "xxoo"],
		['7', "xoox"],
		['F', "ooxx"],
		['.', "xxxx"],
		['S', "oooo"],
	]);

	let w = B[0].length; let h = B.length;

	let GRID_B = [];
	let BLUE_2D = B.map(row => row.map(() => 0));
	for(let blue of BLUE)
		BLUE_2D.ST(blue.pos, 1);


	for(let y = 0 ; y < 3 * h; y += 1)
	{
		GRID_B.push([]);
		for(let x = 0; x < 3 * w; x += 1)
			GRID_B[y].push('█');
	}

	// apply pipe connection as wall breaks >>
	for(let y = 0; y < h; y += 1)
	for(let x = 0; x < w; x += 1)
	{
		let curr = B.GT([x, y]);
		if(curr == '.') // not a pipe, let that be '#'
			continue;
		if(BLUE_2D.GT([x, y]) == 0) // not in MAIN-PIPE, let that be '#'
			continue;

		// pipe char
		GRID_B.ST([ x * 3 + 1, y * 3 + 1 ], curr);
		// continue;

		let CONN = TILE.get(curr);

		for(let i0 = 0; i0 < v2.DIR.length; i0 += 1)
		{
			if(CONN[i0] == 'x')
				continue;

			let dir = v2.DIR[i0];
			let [X, Y] = v2.add([ 3 * x + 1, 3 * y + 1], dir);
			if(X >= 0 && X < 3 * w && Y >= 0 && Y < 3 * h)
				// joint char
				GRID_B.ST([ X, Y ], ' ');
		}
	}
	// << apply pipe connection as wall breaks



	let str = "";
	GRID_B.forEach(row => str += row.join('') + '\n');
	// U.save_code(str, /[SE\-\|]/);
	console.log("%cGRID_B:", U.css.h() , GRID_B);
	// console.log("%cGRID_B str:", U.css.h(), str);
	U.save_code(str);

	// return grid-coord from edge-coord
	return GRID_B;
}




// 4:23, without get_NW_NEIGHBOUR
function pathfind(B, start, end)
{
	// get_NW_NEIGHBOUR

	let RED = [];
	let BLUE = [];

	RED.push({ pos: start, dist: 0, ANSC: [] });

	while(true)
	{
		// all explored
		if(RED.length == 0)
		{
			console.log("all explored");
			break;
		}

		// node
		let node = RED.minMax((a, b) => a.dist - b.dist, splice = true);

		let blue_index = BLUE.findIndex(blue => {
			return v2.eql(blue.pos, node.pos);
		});

		// is blue
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
		for(let neighbour of get_NW_NEIGHBOUR(node, B))
			RED.push(neighbour)
		// << explore node
	}

	let DOC = { BLUE: BLUE, end_node: BLUE.find(blue => blue.ANSC.length > 1) };
	return DOC;
}

function get_NW_NEIGHBOUR(node, B)
{
	// WFC TILE module approach
	let TILE = new Map(
	[
	//	tile   rdlu => in txt space //
		['|', "xoxo"],
		['-', "oxox"],
		['L', "oxxo"],
		['J', "xxoo"],
		['7', "xoox"],
		['F', "ooxx"],
		['.', "xxxx"],
		['S', "oooo"],
	]);
	// console.log(TILE);

	let w = B[0].length; let h = B.length;

	let NEIGHBOUR = [];
	for(let i0 = 0; i0 < v2.DIR.length; i0 += 1)
	{
		let dir = v2.DIR[i0];
		let [X, Y] = v2.add(node.pos, dir);
		if( X >= 0 && X < w && Y >= 0 && Y < h)
		{
			let curr = B.GT(node.pos);	// tile char
			let next = B.GT([X, Y]);	// tile char

			// do not consider 'x' => not allowed connector type
			if(TILE.get(curr)[i0] == 'x')
				continue;

			// @dir curr <-> next, can connect ?
			if(TILE.get(curr)[i0] == TILE.get(next)[(i0 + 2) % 4])
				NEIGHBOUR.push({ pos: [X, Y], dist: node.dist + 1, ANSC: [node] , char: next}); // char => just to log
		}
	}
	return NEIGHBOUR;
}



let B;
let start; let end;
let w; let h;

function Gather()
{
	// parse IN here >>
	B = IN.split('\n').map((line, y) => {
		return line.split('').map((char, x) => {
			if(char == 'S') start = [x, y];
			if(char == 'E') end = [x, y];

			return char;
		});
	})

	w = B[0].length; h = B.length;
	// << parse IN here
}


U.title("Pipe-Maze");
U.zoom("20%");
_A();

/*










*/