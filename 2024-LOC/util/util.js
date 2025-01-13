/*
	.find( node => v2.equals(node.pos , end)) 
		return node
		return null(undefined) if not found;

	.findIndex( node => v2.equals(node.pos , end))
		return index: if found
		return -1: if not found

	// a: next , b: curr , return a - b;
	.sort((a , b) => { return a.pos[0] - b.pos[0]; })

	.map(val => { return // (done somthng with the val); })
	.forEach(val => { // do somthng with the val })

*/


/*
// await usage //
const delay = ms => new Promise(res => setTimeout(res, ms));

async function async_function()
{
	await delay(50);console.log("Waited 5s");
	await delay(500); console.log("Waited an additional 5s");
};

async_function();

// await usage //
*/



/*
function pathfind(B , start , end)
{
	// return BLUE[BLUE.findIndex(node => v2.equals(node.pos, end))].dist
	// return BLUE.find(node => v2.equals(node.pos, end)).dist

	let RED = [];
	let BLUE = [];

	let start_node = { pos: start , dist: 0 }; 

	while(true)
	{
		if(RED.length == 0)
			break;

		let node = remove_min_node(RED);

		// end
		if(v2.equal(node.pos , end)) 
			return node.dist;
		
		// wall
		if(U.GT(B , node.pos) == 1) 
			continue;

		// blue
		if(index_of_node(node , BLUE) != -1) 
			continue;
		BLUE.push(node);

		// neighbour
		v2.DIRS.forEach( dir => {
			let [X, Y] = v2.add(node.pos , dir);
			if( X >= 0 && X < w && Y >= 0 && Y < h)
				RED.push({ pos: [X, Y], dist: node.dist + 1 });
		});
	}
	//
	return -1;
}



function remove_min_node(RED)
{
	let min_i = 0;
	for(let i0 = 1 ; i0 < RED.length; i0 += 1)
		if(RED[i0].dist <= RED[min_i].dist )
			min_i = i0;

	let node = RED[min_i];
	RED.splice(min_i , 1);
}



function index_of_node(node , LIST)
{
	return LIST.findIndex( l_node => v2.equal(l_node.pos , node.pos));
}



function index_of_node(node , LIST)
{
	return LIST.findIndex( lnode => { return v2.equal(node.pos, lnode.pos)});
}
*/



/*
.map()
.forEach()
.sort()

.find()
.findIndex()
.includes()



Test name	  	| Executions per second
----------------|----------------------
Array.some		|   49823.3 Ops/sec
Array.filter	|   24459.8 Ops/sec
Array.indexOf	|  418351.2 Ops/sec
Array.includes	|  574191.4 Ops/sec
Array.find		|   65631.2 Ops/sec

source: https://www.measurethat.net/Benchmarks/Show/9045/0/some-vs-filter-vs-indexof-vs-includes-vs-find
*/



// .length: 1 000 000 , in 8ms //
Array.prototype.minMax = function( cmp_fn , splice = false)
{
	if(this.length == 0) 
	{
		console.log("count: 0, minMax could'nt apply");
		return;
	}
	// fn => a function that fetch the value from class or array //
	let index = 0;
	let min = this[0];

	for(let i0 = 0 ; i0 < this.length; i0 += 1)
	{
		let curr = this[i0];
		if(cmp_fn(curr , min) < 0)
		{
			min = curr
			index = i0;
		}
	}

	if(splice)
		this.splice(index , 1);

	return min;
};


// checked .... dimesion x, y, z .... checked again //
// if error : wither out of range coords or incorrect [int , int] format
Array.prototype.GT = function( depth_level_indexes )
{
	try
	{
		let curr = this;
		for(let i0 = depth_level_indexes.length - 1; i0 >= 0; i0 -= 1)
		{
			if(curr[0] == null)
			{
				console.log(`null @depth-level: ${i0}`);
				return null;
			}
			curr = curr[depth_level_indexes[i0]];
		}
		//
		return curr;
	}
	catch
	{

		console.error("B.GT() error: either depth-level-indexes are out of bounds | format of [int, int] is incorrect" ,
		 "also given depth-levels: ", depth_level_indexes,
		 `, btw max 2D dimension:` , [B[0].length, B.length]);
	}
};


Array.prototype.ST = function( depth_level_indexes, val )
{
	try
	{
		let curr = this;
		for(let i0 = depth_level_indexes.length - 1; i0 >= 1; i0 -= 1)
		{
			if(curr[0] == null)
			{
				console.log(`null @depth-level: ${i0}`);
				return null;
			}
			curr = curr[depth_level_indexes[i0]];
		}
		//
		curr[depth_level_indexes[0]] = val;
	}
	catch
	{

		console.error("B.GT() error: either depth-level-indexes are out of bounds | format of [int, int] is incorrect" ,
		 "also given depth-levels: ", depth_level_indexes,
		 `, btw max 2D dimension:` , [B[0].length, B.length]);
	}
};

let v2 = 
{
	add 	: function(a, b) { return [ a[0] + b[0] , a[1] + b[1] ]; },
	diff   	: function(a, b) { return [ a[0] - b[0] , a[1] - b[1] ]; },
	eql 	: function(a, b) { return (a[0] == b[0]) && (a[1] == b[1]); },
	DIRS: [[+1, 0], [0, +1], [-1, 0], [0, -1]],
	DIR_CHARS: ">v<^",
	none: [-1000000, -1000000],
}


let U =
{
	clone: function(obj) { return structuredClone(obj); },
	floor: (x) => { return Math.floor(x); },
	// use .prototype instead //
	GT: function(B , coord) { return B[coord[1]][coord[0]]; },

	delay : (ms) => new Promise(res => setTimeout(res, ms)),
	query : (str) => document.querySelector(str),
	title : (str) => document.title = str,
	save_code : (str, char_pattern = /[\@]/) => 
	{ 
		str = "";
		IN.split('').forEach(char => {
			if(char_pattern.test(char))
				str += `<l>${char}</l>`;
			else
				str += char;
		});
		U.query(".code").innerHTML = str; 
	},
	save_return: (str_a , str_b) => 
	{ 
		U.query(".return").setAttribute("style" , "display:block; cursor: copy;");
		U.query(".return").innerHTML = `&gt; ${str_a}: <l>${str_b}</l>`; 
		U.query(".return").onclick = function() { navigator.clipboard.writeText(str_b); }
	},
	css:
	{ 
		h: (str = "#888") => `font-size: 13px ;background-color:${str}; font-weight: bold; padding: 3px`,
	},

	// initialize seed
	seed: 1n,
	// get next pseudo random //
	gnpr: function()
	{
		let num = U.seed;
		// max => pow(2, 24) 
		num = ((num << 6n) ^ num) % 16777216n; 
		num = ((num >> 5n) ^ num) % 16777216n; 
		num = ((num <<11n) ^ num) % 16777216n; 

		U.seed = num;
		return num;
	},
	gnpr_minMax: function(min, Max)
	{
		// inclusive min, inclusive Max
		// both min, Max >= 0
		let rand = parseInt(U.gnpr());
		return (rand % (Max - min + 1)) + min;
	},
}


/*

recursive types:
	check()
	recursive()
	example: flood-fill , DFS:
	
	recursive()
	acc()
	example: linen-layout , plutonian-pebbles
*/
