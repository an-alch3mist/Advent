function _A()
{
	console.log("somthng");
	//
	let log_IN = "";
	IN.split('\n').forEach(line => {
		line.split('').forEach(char => {
			//
			if("SE".includes(char)) log_IN += "<l>";
			log_IN += char;
			if("SE".includes(char)) log_IN += "</l>";
		});
		log_IN += '\n';
	});
	//
	U.save_code(log_IN, /[ES]/);

	Gather();
	// console.log(B, start , end);

	console.log("pathfind: " , pathfind(B , start , end));
}



/* 
	(10 + 2)(pathfind + check) + 
   	(5min(path + B)) 
*/
function pathfind(B , start , end)
{
	let w = B[0].length;
	let h = B.length;

	let RED = [];
	let BLUE = [];

	let start_node = { pos: start , dist : 0 , ansc : null };
	start_node.ansc = start_node;
	RED.push(start_node); 

	while(true)
	{
		// console.log(U.clone(RED) , U.clone(BLUE));
		if(RED.length == 0) { console.log("all explored"); break; }

		// equate if cmp_fn < 0
		let node = RED.minMax((a, b) =>  a.dist - b.dist , true);

		// wall
		if(B.GT(node.pos) == 1) continue;

		// blue: node.pos is already explored
		if(BLUE.find(_node => v2.eql(_node.pos , node.pos)) != null)
			continue;
		BLUE.push(node);


		// end
		if(v2.eql(node.pos , end))
		{
			let end_node = BLUE.find(node => v2.eql(node.pos , end));
			console.log(path_from_BLUE(BLUE , start , end));
			return end_node.dist;
		}

		// neighbours
		for(let i0 = 0 ; i0 < v2.DIRS.length; i0 += 1)
		{
			let [X, Y] = v2.add(node.pos , v2.DIRS[i0]);

			if( X >= 0 && X < w && Y >= 0 && Y < h )
				RED.push({pos: [X, Y] , dist: node.dist + 1, ansc: node});
		}
	}

	return -1;
}




function path_from_BLUE(BLUE, start , end)
{
	let path = [];

	let curr = BLUE.find(node => v2.eql(node.pos , end));
	if(curr == null)
	{
		console.log("no path found yet");
		return null;
	}

	//
	while(true)
	{
		if(v2.eql(curr.pos , start))
		{
			path.splice(0, 0, curr); 
			break;
		} 
		//
		path.splice(0, 0 , curr);
		curr = curr.ansc;
	};
	//
	return path;
}




let B = [];
let start = [];
let end = [];

function Gather()
{
	start = [];
	end = [];


	B = IN.split('\n').map( (line, y) => {
		return line.split('').map((char, x) => {
			if(char == 'S') start = [x, y];
			if(char == 'E') end = [x, y];

			if(char == '#') return 1;
			else  			return 0;
		})
	});
}


U.title("pathfind");
_A();