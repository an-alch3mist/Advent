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

		// let node = remove_min_node(RED); // before
		let node = RED.minMax((a, b) => a.dist - b.dist);

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
		v2.DIR.forEach( dir => {
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
// if error : either out of range coords or incorrect [int , int] format
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


// get last: ...... 2, 1, 0
Array.prototype.gl = function(index)
{
	if(index > this.length - 1)
		console.log(`${index} > ${this.length} length of list`);
	// index: 0 to .length - 1
	return this[this.length - 1 - index];
}

// key_fn => get the key from given LIST element
Array.prototype.UNQ = function(key_fn, as_map = false)
{
	let UNQ = new Map();

	// has(key) set( key, {} ) get(key)
	for(let val of this)
	{
		let key = key_fn(val);
		if(!UNQ.has(key))
			UNQ.set(key, { LIST: [val]});
		else
			UNQ.get(key).LIST.push(val);
	}

	/*
		// Iterate and print each key and value
		for (const [key, value] of map.entries())
		    console.log(`Key: ${key}, Value: ${value}`);
		// or
		map.forEach((value, key) => console.log(`${key},${value}`))
	*/
	if(as_map == false)
	{
		let new_UNQ = [];
		UNQ.forEach((val, key) => {
			let new_unq = { };
			new_unq["key"] = key;
			new_unq["LIST"] = val.LIST;
			new_UNQ.push(new_unq);
		});
		return new_UNQ;
	}
	else
		return UNQ;
}



globalThis.v2 = 
{
	add 	: function(a, b) { return [ a[0] + b[0] , a[1] + b[1] ]; },
	diff   	: function(a, b) { return [ a[0] - b[0] , a[1] - b[1] ]; },
	eql 	: function(a, b) { return (a[0] == b[0]) && (a[1] == b[1]); },
	none: [-(10**6), -(10**6)],

	DIR: [[+1, 0], [0, +1], [-1, 0], [0, -1]],

	dot 	: function(a, b) { return a[0] * b[0] + a[1] * b[1]; },
	area	: function(a, b) { return a[0] * b[1] - a[1] * b[0]; },
}


globalThis.U =
{
	clone: function(obj) { return structuredClone(obj); },
	floor: (x) => { return Math.floor(x); },
	// use .prototype instead //
	GT: function(B , coord) { return B[coord[1]][coord[0]]; },

	iter: 0,
	iter_inc: (max = 10**2) => 
	{ 
		U.iter += 1; 
		if(U.iter > max) 
			console.log(`iter > ${max}`);
		return (U.iter > max); 
	},

	delay : (ms) => new Promise(res => setTimeout(res, ms)),
	
	clipboard : (str) => navigator.clipboard.writeText(str),
	query : (str) => document.querySelector(str),
	title : (str) => document.title = str,
	zoom : (str) => U.query(".code").style.zoom = str, // 50%

	save_code : (code, char_pattern = /[\@]/) => 
	{ 
		str = "";
		code.split('').forEach(char => {
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
		U.query(".return").onclick = function() { U.clipboard(str_b); }
	},
	css:
	{ 
		// same as html inline style value
		h: (bg = "#777") => 
			`font-size: 14px; 
			 background-color:${bg}; 
			 font-weight: bold; 
			 padding: 3px;`,

		h2g: (shadow = false , color = "#aff5b4", bg = "#033a16") => 
			`font-size: 12px; 
			 background-color:${bg}; 
			 ${(shadow)? `text-shadow: 0 0 3px #f1f1f1`: ' '};
			 color: ${color};
			 padding: 1px;`,

		h2r: (shadow = false, color = "#f5afaf", bg = "#3a0303") => 
			`font-size: 12px; 
			 background-color:${bg}; 
			 ${(shadow)? `text-shadow: 0 0 3px #f1f1f1`: ' '};
			 color: ${color};
			 padding: 1px;`,
	},

	// initialize seed
	seed: 1n,
	// get next pseudo random //
	gnpr: function()
	{
		let num = U.seed;
		// max => pow(2, 24) 
		num = ( (num << 0x6n) ^ num) & 0o77777777n;
		num = ( (num >> 0x5n) ^ num) & 0o77777777n;
		num = ( (num << 0xBn) ^ num) & 0o77777777n;

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

	// gcd, lcm
	get_gcd: function(VAL)
	{
		// gcd
		let gcd = function(a, b) 
		{
			a = BigInt(a);
			b = BigInt(b);

			while(true)
			{
				let reminder = a % b;
				a = b;
				b = reminder;
				if(reminder == 0n)
					break;
			}
			return a; // return BigInt
		};

		let curr_gcd = gcd(VAL[0], VAL[1]);
		for(let i0 = 1; i0 <= VAL.length - 1; i0 += 1)
			curr_gcd = gcd(curr_gcd, VAL[i0])

		return curr_gcd;
	},

	get_lcm: function(VAL)
	{
		// gcd
		let gcd = function(a, b) 
		{
			a = BigInt(a);
			b = BigInt(b);

			while(true)
			{
				let reminder = a % b;
				a = b;
				b = reminder;
				if(reminder == 0n)
					break;
			}
			return a; // return BigInt
		};

		// lcm(a, b) * gcd(a, b) = a * b
		let lcm = (a, b) => (BigInt(a) * BigInt(b))/ gcd(a, b); // return BigInt

		let curr_lcm = lcm(VAL[0], VAL[1]);
		for(let i0 = 1; i0 <= VAL.length - 1; i0 += 1)
			curr_lcm = lcm(curr_lcm, VAL[i0])

		return curr_lcm;
	},
}


globalThis.ITER =
{
	// permutations with repeated elements.
	// 1 000 0000 combinations in 800ms
	permutations: (str) =>
	{
		let UNQ = new Map();
		for(let char of str)
		{
			if(UNQ.has(char))
				UNQ.get(char).count += 1;
			else
				UNQ.set(char, { count: 1 });
		}

		let STR = [];

		// undo recursive approach or (backtrack)
		// >> 145ms
		function recursive(seq, remaining, UNQ)
		{
			// success
			if(remaining == 0)
			{
				STR.push(seq);
				return;
			}

			for(let char of UNQ.keys())
				if(UNQ.get(char).count > 0)
				{
					UNQ.get(char).count -= 1; // remove char
					recursive(seq + char, remaining - 1, UNQ);			
					UNQ.get(char).count += 1;	// undo changes and go to 1 level above
				}
		}
		recursive("", str.length, UNQ);


		/*
		SEQ Approach
		// >> 1.4sec
		function recursive(seq, level, UNQ)
		{
			// console.log(seq, level, UNQ);
			// success
			if(level == 0)
			{
				STR.push(seq);
				return;
			}

			for(let [key, value] of UNQ)
				if(value.count > 0)
				{
					let new_seq = seq + key;

					let new_UNQ = U.clone(UNQ);
					new_UNQ.get(key).count -= 1;
					recursive(new_seq, level - 1, new_UNQ);
				}
			
		}
		recursive("", str.length, UNQ);
		*/
		return STR;
	},

	iter: 0,
	iter_inc : (max = 10**2) => 
	{ 
		ITER.iter += 1; 
		if(ITER.iter > max) 
			console.log(`iter > ${max}`);
		return (ITER.iter > max); 
	},
}



/*
recursive types:
	sequence recursive

	accumulate recursive
	example: linen-layout , plutonian-pebbles
*/