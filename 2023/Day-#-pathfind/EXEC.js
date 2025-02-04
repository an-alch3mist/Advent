function _A()
{
	U.save_code(IN, /[SE]/);

	Gather();
	console.log("%cB:", U.css.h() , B, start, end, w, h);

	Logic();

	// sum>>

	// << sum
}


function Logic()
{
	let DOC = pathfind(B, start, end);
	console.log("%cDOC:", U.css.h(), DOC);

	let BEST_PATH = get_BEST_PATH(DOC.end_node);
	console.log("%cBEST_PATH:", U.css.h() ,BEST_PATH);
}


// 7:37 min with Gather() + pathfind()
function pathfind(B, start, end)
{
	let w = B[0].length;
	let h = B.length;

	let RED = [];
	let BLUE = [];

	RED.push({ pos: start, dist: 0, ANSC: [] });

	while(true)
	{
		// all-explored
		if(RED.length == 0)
		{
			console.log("all-explored");
			break;
		}

		let node = RED.minMax((a, b) => a.dist - b.dist, splice = true);

		// wall
		if(B.GT(node.pos) == 1)
			continue;

		let blue_index = BLUE.findIndex(blue => {
			return v2.eql(blue.pos, node.pos);
		});

		// is blue
		if(blue_index != -1)
		{
			let blue = BLUE [blue_index];
			if(blue.dist == node.dist)
				for(let ansc of node.ANSC)
					blue.ANSC.push(ansc);

			continue;
		}

		// explore node >>
		BLUE.push(node);


		// end node
		if(v2.eql(node.pos, end))
		{
			// console.log("found end");
			// return node;
		}

		for(let dir of v2.DIR)
		{
			let [X, Y] = v2.add(node.pos, dir);
			if(X >= 0 && X < w && Y >= 0 && Y < h)
				RED.push({ pos: [X, Y], dist: node.dist + 1, ANSC: [node] });
		}
		// << explore node
	}

	// return {};

	return { BLUE: BLUE, end_node: BLUE.find(blue => v2.eql(blue.pos, end)) };
}

function get_BEST_PATH(end_node)
{
	let BEST_PATH = [];
	function recursive(curr, seq)
	{
		/*
		if(curr.ansc.length == 0) 
			SEQ.push(seq)

		for ansc of curr.ANSC
			new_seq = U.clone(seq).push(curr);
			recursive(ansc, new_seq)

		TODO: backtrack >> saves 5sec on an 10sec run .... done
		*/
		if(curr.ANSC.length == 0)
		{
			let new_seq = U.clone(seq);
			new_seq.push(curr);
			BEST_PATH.push(new_seq);
			return
		}


		for(let ansc of curr.ANSC)
		{
			let new_seq = U.clone(seq);
			new_seq.push(curr);
			recursive(ansc, new_seq);

			// backtrack seq, since U.clone(seq which is list) takes time 
			/*
			seq.push(curr);
			recursive(ansc, seq);
			seq.splice(seq.length - 1, 1);*/
		}
	}

	recursive(end_node, seq = []);

	return BEST_PATH;
}



let B = [];
let w; let h;
let start; let end;

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

	w = B[0].length; h = B.length;

	//// << parse IN to STORE ////
}

U.title("pathfind"); U.zoom("200%");
_A();