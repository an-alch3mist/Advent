/*
	start: 00:08
	found: pause 03:47

	restart : 13:47
	found	: 16:46
*/

function _A()
{
	console.log("somthng");
	U.save_code(IN , /[#]/);
	// U.save_code(IN_PAD_ref , /[<>^vA]/);

	Gather();
	console.log("%cCODE:", U.css.h() , CODE);
	console.log("%cNUM_PAD:", U.css.h() , NUM_PAD);
	console.log("%cDIR_PAD:", U.css.h() , DIR_PAD);

	Logic();

	// sum>>
	let sum = 0n;
	for(let i0 = 0; i0 < CODE.length; i0 += 1)
	{
		let min_count = MIN_COUNT[i0];
		let code = CODE[i0];

		sum += min_count * BigInt(parseInt(code.substring(0, code.length - 1)));
	}

	console.log(`sum(min count of each code after levels${max_bot_level}): ${sum}`);
	U.save_return("Day-21 part-2", `${sum/(10n**12n)}T`);
	// << sum
}


let max_bot_level = 25;
let MIN_COUNT; // for sum

function Logic()
{
	// DOC_COUNT >>
	for(let i0 = 0; i0 <= max_bot_level; i0 += 1)
	{
		DOC_COUNT.push(new Map());
		DOC_LOG.push(new Map());
	}
	// << DOC_COUNT
	console.log("%cDOC_COUNT:", U.css.h(), DOC_COUNT);

	// TODO => count = get_min_count(from_to of NUMPAD, 0, NUM_PAD )

	let INSTR_LIST = [];
	/* INSTR_LIST => 
	[
		[ 
			['^^^A'], 										NE_WAY from from 'A' to 1st char of code 964A
			['vA'],											NE_WAY from from 'A' to 2nd char of code 964A
			['<<A'],										NE_WAY from from 'A' to 2rd char of code 964A
			['>>vvA', '>v>vA', '>vv>A', 'v>>vA', 'v>v>A'],  NE_WAY from from 'A' to 4th char of code 964A
		],
		[
			....
		],
	]
	*/
	for(let code of CODE)
	{
		let INSTR = [];
		let prev = 'A';
		for(let char of code)
		{
			let delta = v2.diff(NUM_PAD.get(char), NUM_PAD.get(prev));
			INSTR.push(NE_WAY(prev, delta, NUM_PAD));
			prev = char;
		}
		// console.log(INSTR, code);
		INSTR_LIST.push(INSTR);
	}
	console.log("%cINSTR_LIST:", U.css.h(), INSTR_LIST);


	MIN_COUNT = CODE.map(() => 10n**24n);

	for(let i0 = 0; i0 < CODE.length; i0 += 1)
	{
		SEQ_INSTR = [];
		recursive_NUM_PAD("", 0, INSTR_LIST[i0]);
		// console.log(SEQ_INSTR);

		let COUNT = [];
		for(let instr of SEQ_INSTR)
		{
			let prev = 'A';
			let sum = 0n;
			for(let char of instr)
			{
				let count = recursive(prev + char, 0, DIR_PAD);
				sum += count;
				prev = char;
				// console.log(count);
			}
			// console.log(sum);

			if(sum < MIN_COUNT[i0])
				MIN_COUNT[i0] = sum
		}
	}
	console.log(MIN_COUNT);


	return;
	// recursive

	/*
	// DOC_COUNT approach for each level >>
	let instr = "<A^A>^^AvvvA";
	let prev = 'A';
	let sum = 0;
	for(let char of instr)
	{
		let count = recursive(prev + char, 0, DIR_PAD);
		sum += count;
		prev = char;
		// console.log(count);
	}

	console.log(sum);
	// << DOC_COUNT approach for each level

	*/
}

let DOC_COUNT = [];
let DOC_LOG = [];
let _LOG_ = false;

function recursive(from_to , level, PAD)
{
	let doc_count = DOC_COUNT[level];

	//// human >>
	if(level == max_bot_level) 
	{
		doc_count.set(from_to, 1n);
		return 1n;
	}
	//// << human

	//// bot >>
	if(doc_count.has(from_to))
		return doc_count.get(from_to);

	// delta
	let delta = v2.diff
	(
		PAD.get(from_to[1]), //   to
		PAD.get(from_to[0])  // from
	);

	// WAY
	let WAY = NE_WAY(from_to[0], delta, PAD);

	// accumulate approach >>
	let COUNT = [];
	for(let way of WAY)
	{
		let count = 0n;
		let prev = 'A';
		for(let char of way)
		{
			// recursive
			count += recursive(
				prev + char, // from_to
				level + 1, 	 // level
				DIR_PAD		 // PAD
			);
			prev = char;
		}
		COUNT.push(count);
	}

	// a < b, return a - b;
	let min_count = COUNT.minMax((a, b) => { return a - b; });
	doc_count.set(from_to, min_count);
	// << accumulate approach

	return min_count;
	//// << bot
}



// ad >>
	function get_one_way(delta)
	{
		let [dx, dy] = delta;
		let char_x = (dx < 0)? '<' : '>';
		let char_y = (dy < 0)? '^' : 'v';
		let one_way = char_x.repeat(Math.abs(dx)) + char_y.repeat(Math.abs(dy));
		return one_way;
	}

	function get_curr_plus_dir(curr_char, dir_char, PAD)
	{
		if(!PAD.has(curr_char) || !v2.CHAR_to_DIR.has(dir_char))
			console.error(`error in either curr_char: ${curr_char} or dir_char: ${dir_char}`);

		let curr_pos = PAD.get(curr_char);
		let dir = v2.CHAR_to_DIR.get(dir_char);

		let next_pos = v2.add(curr_pos, dir);
		for(let [key, val] of PAD)
			if(v2.eql(val, next_pos))
				return key;

		console.error(`nex_pos: ${next_pos} is out of bounds`);
	}

	// non empty WAY
	function NE_WAY(start_char, delta, PAD)
	{
		let one_way = get_one_way(delta);
		let possible_ways = ITER.permutations(one_way);
		let new_possible_ways = [];

		for(let i0 = 0; i0 < possible_ways.length; i0 += 1)
		{
			let curr = start_char;
			for(let char of possible_ways[i0])
			{
				if(curr == ' ')
					break;
				let next = get_curr_plus_dir(curr, char, PAD);
				curr = next;
			}

			if(curr != ' ')
				// added 'A' at the end => to press the key
				new_possible_ways.push(possible_ways[i0] + 'A');
		}

		return new_possible_ways;
	}

	let SEQ_INSTR = [];
	function recursive_NUM_PAD(seq_instr, level ,INSTR)
	{
		if(level == INSTR.length - 1)
		{
			for(let instr of INSTR[level])
			{
				let new_seq_instr = seq_instr + instr;
				SEQ_INSTR.push(new_seq_instr);
			}
			return;
		}

		for(let instr of INSTR[level])
		{
			let new_seq_instr = seq_instr + instr;
			recursive_NUM_PAD(new_seq_instr, level + 1, INSTR);
		}
	}
// << ad

// Analysis
/*
	DOC_COUNT approach storing for each level
		<v<A => 4 2 2 4 = 12
		v<<A => 3 2 1 4 = 10
*/

let CODE;

let NUM_PAD; let DIR_PAD; // num pad, dir pad
function Gather()
{
	// parse IN here >>
	CODE = IN.split('\n').map(line => line);

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