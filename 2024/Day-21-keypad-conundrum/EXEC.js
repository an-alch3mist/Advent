/*
	start: 23:40
	found: 00:45
*/
function _A()
{
	U.save_code(IN_PAD_ref, /[>v<^A]/);

	Gather();

	console.log("%cCODE: ", U.css.h(), CODE);
	console.log("%cNUM_PAD:", U.css.h(), NUM_PAD);
	console.log("%cDIR_PAD:", U.css.h(), DIR_PAD);

	Logic();

	// check
	/*
		let WAY = NE_WAY('0', '7',  NUM_PAD);
		console.log("check: ", WAY);
	*/

	// sum >>

	// << sum
}

let max_bot_level = 25;
/*
	- One directional keypad that you are using.
	- 25 directional keypads that robots are using.
	- One numeric keypad (on a door) that a robot is using.
*/
function Logic()
{
	DOC_COUNT.push(new Map()); // for dir_pad to num_pad, [bot]
	for(let i0 = 0; i0 <= max_bot_level; i0 += 1)
		DOC_COUNT.push(new Map());
	// (DOC_COUNT.length - 1) => human level

	let sum = 0n;
	for(let code of CODE)
	{
		// let code = "<A^A>^^AvvvA";
		// let code = "029A";

		// += count recived from accumulate approach >>
		let count = 0n;
		let prev = 'A';
		for(let char of code)
		{
			// recursive
			count += recursive(prev + char, level = 0, NUM_PAD);
			prev = char;
		}
		// << += count recived from accumulate approach

		sum += count * BigInt(parseInt(code.substring(0, code.length - 1)));
		console.log(`${code} min instr at bot-level ${max_bot_level} = %c${count}`, U.css.h2r(false));
	}

	console.log("%cDOC_COUNT:", U.css.h() , DOC_COUNT);
	console.log(`sum(min instr at bot-level ${max_bot_level}): %c${sum}`, U.css.h2g());
	U.save_return("Day-21 part-2", `${sum/(10n**12n)}T`);
	
}

/*
ANALYSIS: 
	<A^A>^^AvvvA
	(A<) (<A) (A^) (^A) (A>) (>^) (^^) (^A) (Av) (vv) (vv) (vA)
	 4 	  4 	2 	2 	 2 	  3 	1 	2 	 3 	  1 	1 	3
	
	= 28

*/

// DOC_COUNT, accumulate for each level approach
let DOC_COUNT = [];
function recursive(from_to, level, PAD)
{
	// human
	if(level == DOC_COUNT.length - 1)
	{
		DOC_COUNT[level].set(from_to, 1);
		return 1n; // just press the key
	}

	// exist
	let doc_count = DOC_COUNT[level];
	if(doc_count.has(from_to))
		return doc_count.get(from_to);


	// non empty possible ways
	let WAY = NE_WAY(from_to[0] , from_to[1] , PAD);

	// accumulate appraoch >>
	let COUNT = [];

	for(let way of WAY)
	{
		let prev = 'A';

		let count = 0n;
		for(let char of way)
		{
			// recursive
			count += recursive(prev + char, level + 1, DIR_PAD);
			prev = char;
		}
		COUNT.push(count);
	}

	// a < b, return a - b
	let min_count = COUNT.minMax((a, b) => { return a - b });
	doc_count.set(from_to, min_count);
	// console.log(U.clone(DOC_COUNT), COUNT , from_to, level);

	return min_count;
	// << accumulate approach
}


// non empty possible ways
function NE_WAY(from, to, PAD)
{
	// delta
	let delta = v2.diff(PAD.get(to), PAD.get(from));

	let [dx, dy] = delta;

	let char_x = (dx < 0)? '<' : '>';
	let char_y = (dy < 0)? '^' : 'v';

	// repeated chars permutations
	let possible_ways = ITER.permutations(
		char_x.repeat(Math.abs(dx)) + 
		char_y.repeat(Math.abs(dy))
	);


	// get pos of a char in a PAD
	let get_char = (pos, PAD) => 
	{
		for(let [char, char_pos] of PAD)
			if(v2.eql(pos, char_pos))
				return char;
	}

	// convert dir_char to v2
	let get_v2 = (char) => 
	{
		if(char == '>') return [+1,  0];
		if(char == 'v') return [ 0, +1];
		if(char == '<') return [-1,  0];
		if(char == '^') return [ 0, -1];
	}

	// WAY, # also include 'A' at terminal for each way to press the button of ansc
	let WAY = [];
	for(let way of possible_ways)
	{
		let curr = from;
		for(let char of way)
		{
			let next = get_char( v2.add(PAD.get(curr), get_v2(char)), PAD);
			curr = next;

			if(curr == ' ')
				break;
		}

		if(curr != ' ')
			WAY.push(way + 'A'); // added 'A' at the end to press the button of ansc
	}

	// console.log(possible_ways);
	// console.log(WAY);
	return WAY;
}


let CODE;
let NUM_PAD; let DIR_PAD;

function Gather()
{
	// parse IN here >>
	CODE = IN.split("\n");

	NUM_PAD = new Map();
	IN_PAD.split("\n\n")[0].split('\n').forEach((line, y) => {
		line.split('').forEach((char, x) => {
			NUM_PAD.set(char, [x, y]);
		});
	});

	DIR_PAD = new Map();
	IN_PAD.split("\n\n")[1].split('\n').forEach((line, y) => {
		line.split('').forEach((char, x) => {
			DIR_PAD.set(char, [x, y]);
		});
	});
	// << parse IN here
}

U.title("keypad-conundrum");
_A();