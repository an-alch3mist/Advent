function _A()
{
	U.save_code(IN, /[SE]/);
	Gather();

	console.log("%cB:", U.css.h(), B, start, end, w, h);

	Logic();

}

function Logic()
{
	let DOC = pathfind(B, start, end);
	console.log("%cDOC:", U.css.h(), DOC);

	console.log(max_recursive_store);
	// recursive(0n, 1n);

	// let BEST_PATH = get_BEST_PATH_0(DOC.end_node);
	let BEST_PATH = get_BEST_PATH_1(DOC.end_node);
	console.log("%cBEST_PATH:", U.css.h(), BEST_PATH);
}


/* max recursive width, depth test

	console.log(max_recursive_store);
	recursive(0n, 1n);

	result => 
		depth: 8960n
		width: 0n
	*/
	let max_recursive_store = { depth: 0n, width: 0n }
	function recursive(depth, max_width)
	{
		max_recursive_store.depth = depth;

		for(let i0 = 0n;  i0 < max_width; i0 += 1n)
		{
			// console.log(typeof i0, typeof max_recursive_store.width, typeof depth);
			max_recursive_store.width = i0;
			recursive(depth + 1n, max_width);
		}
	}






/* 5:12, pathfind with get_NW_NEIGHBOUR */
function pathfind(B, start, end)
{
	let get_NW_NEIGHBOUR = (node, B) => 
	{
		let w = B[0].length; let h = B.length;
		let NEIGHBOUR = [];
		for(let dir of v2.DIR)
		{
			let [X, Y] = v2.add(node.pos, dir);
			if(X >= 0 && X < w && Y >= 0 && Y < h)	// in range
				if(B.GT([X, Y]) != 1)	// not a wall
					NEIGHBOUR.push({ pos: [X, Y], dist: node.dist + 1, ANSC: [node] })
		}
		return NEIGHBOUR;
	}

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
		for(let neighbour of get_NW_NEIGHBOUR(node, B)) // get non wall neighbours
			RED.push(neighbour);
		// << explore node
	}

	let DOC = { BLUE: BLUE, end_node: BLUE.find(blue => v2.eql(blue.pos, end)) };
	return DOC;
}

// get best path with just recursive SEQ approach
function get_BEST_PATH_0(end_node)
{
	let BEST_PATH = [];
	let recursive = function(curr, seq_path)
	{
		if(curr.ANSC.length == 0)
		{
			let new_seq_path = U.clone(seq_path);
			new_seq_path.push(curr);
			BEST_PATH.push(new_seq_path);
			return;
		}

		for(let ansc of curr.ANSC)
		{
			seq_path.push(curr);
			recursive(ansc, seq_path);
			seq_path.splice(seq_path.length - 1, 1);
		}
	}
	recursive(curr = end_node, seq_path = []);
	return BEST_PATH;
}

// get best path with comination of (recursive and linear) SEQ approach
function get_BEST_PATH_1(end_node)
{
	let BEST_PATH = [];
	// let max_recursive_store = { depth: 0, width: 0 };

	function recursive(curr, seq_path, depth = 0)
	{
		// max_recursive_store.depth = BigInt(depth);
		// ANSC.count == 0
		if(curr.ANSC.length == 0)
		{
			let new_seq_path = U.clone(seq_path);
			new_seq_path.push(curr.pos);
			BEST_PATH.push(new_seq_path);
			return;
		}

		// ANSC.count == 1
		if(curr.ANSC.length == 1)
		{
			let curr_node = curr;
			while(true)
			{
				// at any iteration if curr-node.ANSC.count > 1
				// TODO backtrack seq_path instead of new_seq_path
				if(curr_node.ANSC.length > 1)
				{
					for(let ansc of curr_node.ANSC)
					{
						/*
						let new_seq_path = U.clone(seq_path);
						new_seq_path.push(curr_node.pos);
						recursive(ansc, new_seq_path, depth + 1);
						*/
						// back track >>
						let curr_node_index = seq_path.length;
						seq_path.push(curr_node.pos);
						recursive(ansc, seq_path, depth + 1);
						seq_path.splice(curr_node_index, seq_path.length - curr_node_index);
						// << back track
					}
					// exit
					return;
				}

				// at any iteration if curr-node.ANSC.count == 0
				if(curr_node.ANSC.length == 0)
				{
					let new_seq_path = U.clone(seq_path);
					new_seq_path.push(curr_node.pos);
					BEST_PATH.push(new_seq_path);
					// exit
					return;
				}

				// .ANSC.count == 1
				seq_path.push(curr_node.pos)
				curr_node = curr_node.ANSC[0];
			}
		}

		// ANSC.count > 1
		// TODO backtrack seq_path instead of new_seq_path
		for(let ansc of curr.ANSC)
		{
			// back track >>
			seq_path.push(curr.pos);
			recursive(ansc, seq_path, depth + 1);
			seq_path.splice(seq_path.length - 1, 1);
			// << back track
			// exit
			return;
		}

	}
	recursive(end_node, seq_path = []);
	return BEST_PATH;
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

			if(char == '#')
				return 1;
			else
				return 0;
		});
	})

	w = B[0].length; h = B.length;
	// << parse IN here
}

_A();