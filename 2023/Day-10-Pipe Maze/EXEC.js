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
function _A()
{
	U.save_code(IN , /[SE]/);
	Gather();
	console.log("%cB:", U.css.h() , B, start, end, w, h);

	Logic();
	// check >>
	console.log(U.get_gcd(VAL = [4, 6, 24]));
	// << check
	// sum>>

	// << sum
}


function Logic()
{
	let NEIGHBOUR = get_NW_NEIGHBOUR([1, 4], B);
	let DOC = pathfind(B, start, end);

	console.log("%cDOC:", U.css.h(), DOC );
	console.log(`end_node with max_dist: %c${DOC.END_NODE[0].dist}`, U.css.h2g());
	

	log_B(B, DOC.BLUE);
	let REGION = flood_fill(B, DOC.BLUE);
	console.log("%cREGION:", U.css.h(), REGION);

	let sum = 0;
	for(let region of REGION)
		if(region.out_bounds == false && region.id != 'O')
			sum += region.POS.length;

	console.log(`sum of enclosed region.POS: %c${sum}`, U.css.h2g());
}


function pathfind(B, start, end)
{
	let w = B[0].length;
	let h = B[1].length;

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

		let node = RED.minMax((a, b) => a.dist - b.dist, splice = true);

		// block
		if(B.GT(node.pos) == '.')
			continue;

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

		let NEIGHBOUR = get_NW_NEIGHBOUR(node.pos, B);
		for(let neighbour of NEIGHBOUR)
			RED.push({ pos: neighbour, dist: node.dist + 1, ANSC: [node] });
		// << explore node
	}

	let DOC = 
	{ 
		BLUE: BLUE,
		END_NODE: [],
	};

	for(let blue of BLUE)
		if(blue.ANSC.length > 1)
			DOC.END_NODE.push(blue);

	// [sort], a: next, b: curr, return a - b
	DOC.END_NODE.sort((a, b) => { return -(a.dist - b.dist) });

	return DOC;
}

// exactly 2 neighbour
function get_NW_NEIGHBOUR(pos, B)
{
	// . is no flow => wall
	let char = B.GT(pos);
	let w = B[0].length;
	let h = B.length;

	let NEIGHBOUR = [];

	for(let dir_i = 0; dir_i < v2.DIR.length; dir_i += 1)
	{
		let dir = v2.DIR[dir_i];
		let [X, Y] = v2.add(pos, dir)
		if(X >= 0 && X < w && Y >= 0 && Y < h)
		{
			let next = B.GT([X, Y]);
			if(char == 'S')
			{
				if(dir_i == 0) if(next == 'J' || next == '-' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
				if(dir_i == 1) if(next == 'J' || next == '|' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				if(dir_i == 2) if(next == 'F' || next == '-' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				if(dir_i == 3) if(next == 'F' || next == '|' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
			}
			if(char == '-')
			{
				if(dir_i == 0) if(next == 'J' || next == '-' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
				// if(dir_i == 1) if(next == 'J' || next == '|' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				if(dir_i == 2) if(next == 'F' || next == '-' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				// if(dir_i == 3) if(next == 'F' || next == '|' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
			}
			if(char == '|')
			{
				// if(dir_i == 0) if(next == 'J' || next == '-' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
				if(dir_i == 1) if(next == 'J' || next == '|' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				// if(dir_i == 2) if(next == 'F' || next == '-' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				if(dir_i == 3) if(next == 'F' || next == '|' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
			}
			if(char == 'L')
			{
				if(dir_i == 0) if(next == 'J' || next == '-' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
				// if(dir_i == 1) if(next == 'J' || next == '|' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				// if(dir_i == 2) if(next == 'F' || next == '-' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				if(dir_i == 3) if(next == 'F' || next == '|' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
			}
			if(char == 'J')
			{
				// if(dir_i == 0) if(next == 'J' || next == '-' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
				// if(dir_i == 1) if(next == 'J' || next == '|' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				if(dir_i == 2) if(next == 'F' || next == '-' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				if(dir_i == 3) if(next == 'F' || next == '|' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
			}
			if(char == 'F')
			{
				if(dir_i == 0) if(next == 'J' || next == '-' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
				if(dir_i == 1) if(next == 'J' || next == '|' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				// if(dir_i == 2) if(next == 'F' || next == '-' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				// if(dir_i == 3) if(next == 'F' || next == '|' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
			}
			if(char == '7')
			{
				// if(dir_i == 0) if(next == 'J' || next == '-' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
				if(dir_i == 1) if(next == 'J' || next == '|' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				if(dir_i == 2) if(next == 'F' || next == '-' || next == 'L' || next == 'S') NEIGHBOUR.push([X, Y]);
				// if(dir_i == 3) if(next == 'F' || next == '|' || next == '7' || next == 'S') NEIGHBOUR.push([X, Y]);
			}
		}
	}

	// console.log(NEIGHBOUR.map(_pos => _pos.join(',' || next == 'S')));
	return NEIGHBOUR;
}

// not working for path size of 6800 even with back track
function get_BEST_PATH(end_node)
{
	let BEST_PATH = [];

	let seq_path = [];
	function recursive(curr)
	{
		if(ITER.iter_inc(10**4))
			return;

		// 'S' node
		if(curr.ANSC.length == 0)
		{
			let new_seq_path = U.clone(seq_path);
			new_seq_path.push(curr.pos);
			BEST_PATH.push(new_seq_path);
		}

		for(let ansc of curr.ANSC)
		{
			// backtrack approach >>
			seq_path.push(curr.pos);
			recursive(ansc)
			seq_path.splice(seq_path.length - 1, 1);
			// << backtrack approach
		}
	}

	recursive(end_node);
	return BEST_PATH;
}




// part-2 >>
function flood_fill(old_B , BLUE)
{
	// B => . O >>
	let B = old_B.map(row => {
		return row.map(char => {
			return '.';
		});
	});
	for(let blue of BLUE)
		B.ST(blue.pos, 'O'); // .: not part of main loop, O: part of main loop
	// log_B(B, []);
	// << B => . O

	let w = B[0].length; h = B.length;
	let EXPLORE = B.map(row => row.map(() => 0));

	// REGION
	let REGION = [];
	//
	for(let y = 0; y < h; y += 1)
	for(let x = 0; x < w; x += 1)
	{
		if(EXPLORE.GT([x, y]) == 1)
			continue;
		// found a not explored tile

		// region >>
		let region = { id: B.GT([x, y]), POS: [], out_bounds: false };
		region.POS.push([x, y]);
		EXPLORE.ST([x, y], 1);

		while(true)
		{
			// all explored
			let all_explored = true;

			// each pos
			for(let pos of region.POS)
				for(let dir of v2.DIR)
				{
					let [X, Y] = v2.add(pos, dir);
					if(X >= 0 && X < w && Y >= 0 && Y < h)
					{
						// same type
						if(B.GT([X, Y]) == region.id )
							// not explored yet
							if(EXPLORE.GT([X, Y]) == 0)
							{
								// explore and add to POS
								region.POS.push([X, Y]);
								EXPLORE.ST([X, Y], 1);
								all_explored = false;
							}
					}
					else
						region.out_bounds = true;

				}

			if(all_explored == true)
				break;
		}

		REGION.push(region);
		// << region
	}

	// REGION
	return REGION;
}




// << part-2




function log_B(B, BLUE)
{
	let STR = B.map(row => row.map(char => char));

	for(let blue of BLUE)
		STR.ST(blue.pos, 'O');

	STR.ST(start, 'S');

	let str = "";
	STR.forEach(row => str += row.join('') + '\n');
	// console.log(str);
	U.save_code(str, /[SEO]/);
}


let B = [];
let start; let end;
let w; let height;
function Gather()
{
	//// parse IN to STORE >> ////
	B = IN.split('\n' || next == 'S').map((line, y) => {
		return line.split('').map((char, x) => {
			if(char == 'S') start = [x, y];

			return char;
		});
	});

	w = B[0].length;
	h = B.length;

	//// << parse IN to STORE ////
}

// U.title("somthng");
_A();