/*
	start: 21:15
	part-1, dist(start--node + node--end): 22:28 .... pause

	get_dist: 22:45 .... resume
	found: 01:30
*/

function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[SEO]/);

	Gather();
	console.log("%cB:", U.css.h() , B, start, end);

	Logic();
	console.log(`part-1 sum(dist cost to the end node through one of BEST-PATH): ${DOC_se.node.dist}`);

	// sum>>
	let UNQ_POS = [];
	for(let path of BEST_PATH)
	for(let pos of path)
		if(UNQ_POS.findIndex(unq_pos => v2.eql(unq_pos, pos)) == -1)
			UNQ_POS.push(pos);

	let sum = UNQ_POS.length;
	U.save_code(log_B(B, start, end, POS = UNQ_POS), /[SEO]/);
	console.log(`part-2 sum(unique tile pos on one of BEST-PATH) among ${BEST_PATH.length} best_paths: ${sum}`);
	U.save_return("Day-12 part-2", sum); 
	// << sum
}

// multiple ancestor when came across a blue node approach


let DOC_se; // BLUE, node as end_node, fn: get_dist(pos)
function Logic()
{
	DOC_se = pathfind(B, start, end, START_DIR = [0,]);
	console.log("%cDOC_se", U.css.h() , DOC_se);
	
	// whether the tile is on one of the best paths through the maze
	get_BEST_PATH(DOC_se.node, []);
	console.log("%cBEST_PATH", U.css.h() , BEST_PATH);
}


/*
	They can move forward one tile at a time 
		(increasing their score by 1 point), 
	but never into a wall (#). 
	They can also rotate clockwise or counterclockwise 90 degrees at a time 
		(increasing their score by 1000 points).
*/
/*
compute
	RED, BLUE DFS approach: over B(141 x 141)
		4.5sec, end exit
		10sec , all-explored with iter: 121,334 */
function pathfind(B, start, end, START_DIR)
{
	let RED = [];
	let BLUE = [];

	for(let dir of START_DIR)
		RED.push({pos: start, dir: dir,  dist: 0, ansc: [] });

	let end_node = null

	while(true)
	{
		// console.log(U.clone(RED), U.clone(BLUE));
		if(U.iter_inc(10**6))
			break;

		// all-explored
		if(RED.length == 0)
		{
			console.log("all explored @", U.iter , "iters");
			break;
		}

		// a > b, return a - b
		let node = RED.minMax((a, b) => a.dist - b.dist, splice = true);

		// wall
		if(B.GT(node.pos) == 1)
			continue;


		// BLUE >> 
		let blue_index = BLUE.findIndex(blue => {
			return v2.eql(blue.pos, node.pos) && 
				   blue.dir == node.dir; 
		});

		// is blue
		if(blue_index != -1)
		{
			let blue = BLUE[blue_index];
			if(blue.dist == node.dist)
				for(let ansc of node.ansc)
					blue.ansc.push(ansc);
			continue;
		}
		BLUE.push(node);
		// << BLUE 


		// end
		if(v2.eql(node.pos , end) && (end_node == null))
			end_node = node;
		

		// neighbours >>
		
		// forward
		let dir = v2.DIRS[node.dir];
		RED.push({pos: v2.add(node.pos, dir), dir: node.dir, dist: node.dist + 1, ansc: [node]});
		// dir + 1
		RED.push({pos: node.pos, dir: (node.dir + 1) % 4, dist: node.dist + 1000, ansc: [node]});
		// dir + 3
		RED.push({pos: node.pos, dir: (node.dir + 3) % 4, dist: node.dist + 1000, ansc: [node]});
		
		// << neighbours
	}

	// all-explored blue
	// a: next, b: curr, return a - b
	BLUE.sort((a, b) => a.dist - b.dist);

	let RETURN = 
	{
		BLUE : BLUE,
		node: end_node,
		se: `s:${start} e:${end}`,

		// 
		get_dist: function(pos, dir = 100)
		{
			// BLUE is sorted so that least dist from start is returned
			let index = BLUE.findIndex(blue => {
				if(dir == 100)
					return v2.eql(blue.pos, pos);
				else
					return v2.eql(blue.pos, pos) && (blue.dir == dir);			
			});

			if(index == -1) return { dist: -1, final_dir: -1 };
			else		 	return { dist: BLUE[index].dist, final_dir: BLUE[index].dir};
		},
	};

	return RETURN;
}

// with single ansc, typeof(.ansc) = node
function get_best_path(BLUE) { }

// with single ansc, typeof(.ansc) = L<node>
let BEST_PATH = [];
function get_BEST_PATH(end_node)
{
	BEST_PATH = [];

	let recursive = function(node, seq_path)
	{
		/*
		when node.pos == start: 
			BEST_PATH.push(path)
		*/

		// success
		// if(node.pos == start && no ansc for node)
		if(v2.eql(node.pos, start) && node.ansc.length == 0)
		{
			let new_seq_path = U.clone(seq_path);
			new_seq_path.push(node.pos);

			BEST_PATH.push(new_seq_path);
			return;
		}
		//
		else
		{
			let new_seq_path = U.clone(seq_path);
			new_seq_path.push(node.pos);

			// ansc
			for(let ansc of node.ansc)
				// recursive
				recursive(ansc, new_seq_path);

			return;
		}
	}

	recursive(end_node, []);
}

function log_B(B, start, end, POS)
{
	let STR =  B.map((row, y) => {
		return row.map((val, x) => {
			if(val == 1) 
			 	return '#';
			else
				return '.';
		})
	})

	for(let pos of POS)
		STR.ST(pos, '<l>O</l>');
	STR.ST(start, 'S');
	STR.ST(end, 'E');

	let str = "";
	for(let row of STR)
		str += row.join('') + '\n';
	return str;
}

let B = []
let w; let h;
let start; let end;

let start_dir;

function Gather()
{
	//// parse IN to STORE >> ////
	B = IN.split('\n').map((line, y) => {
		return line.split('').map((char, x) => {

			if(char == 'S') start = [x, y];
			if(char == 'E') end = [x, y];

			if(char == '#') 
				return 1;
			else 
				return 0;
		});
	});

	start_dir = v2.DIR_CHARS.indexOf('>');
	w = B[0].length; h = B.length;
	//// << parse IN to STORE ////
}

U.title("reindeer-maze"); U.zoom("65%");
_A();