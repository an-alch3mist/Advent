/*
	start: 20:34
	found: 21:34
*/
function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[\,0-9]/);

	Gather();
	console.log("%cROW:", U.css.h() , ROW);

	Logic();

	// sum>>

	// << sum
}

// >> part-1: 5300ms ,for 1000 row
function Logic()
{
	// current approach: ( all possible permutations for repeated elements )
	// TODO: recursive seq approach with ( all permutations for repeated elements )
	/*
		?###???????? 3,2,1
		.###.##.#...
		.###.##..#..
		.###.##...#.
		.###.##....#
		.###..##.#..
		.###..##..#.
		.###..##...#
		.###...##.#.
		.###...##..#
		.###....##.#

		once config val 3 is exavluted at(?# intersection) move on to the next,
		get all possible permutations for next  (???????? ) since no # for last segment
	*/

	let sum = 0;
	for(let row of ROW)
	{
		let UNKOWN_POS = [];
		for(let i0 = 0; i0 < row.UA.length; i0 += 1)
		{
			let char = row.UA[i0];
			if(char == '?')
				UNKOWN_POS.push({ pos: i0 });
		}

		// ad >>
			let total_damaged = 0; for(let val of row.config) total_damaged += val;
			let damaged_count = 0; for(let char of row.UA) if(char == '#') damaged_count += 1;
			let unknown_count = 0; for(let char of row.UA) if(char == '?') unknown_count += 1;
		// << ad

		// permutations >>
		let one_arragement = '#'.repeat(total_damaged - damaged_count) + 
							 '.'.repeat(unknown_count - (total_damaged - damaged_count));
		let all_possible_arrangement = ITER.permutations(one_arragement);

		let count_valid_arrangement = 0;
		for(let arrangement of all_possible_arrangement)
		{
			let OD_A = U.clone(row.UA);
			// console.log(OD_A, UNKOWN_POS);
			for(let i0 = 0; i0 < UNKOWN_POS.length; i0 += 1)
			{
				let pos = UNKOWN_POS[i0].pos;
				let char = arrangement[i0];
				OD_A[pos] = char;
			}

			if(valid_A(OD_A.join(''), row.config))
				count_valid_arrangement += 1;
		}
		// << permutations
		
		console.log("count:", count_valid_arrangement, row);
		sum += count_valid_arrangement;
	}	
	console.log(`sum(all possible arrangement that make UA valid): %c${sum}`, U.css.h2g());
}

// parameter: ("..#.#.###.#.", [1, 1, 3, 1,]) => true
// OD_A: arragement with just operational or damaged.
function valid_A(OD_A, config)
{
	let D_A = OD_A.split(/[\.]+/);

	// remove terminals
	if(D_A[0] == '') D_A.splice(0, 1); 
	if(D_A.gl(0) == '') D_A.splice(D_A.length - 1, 1);
	// console.log(D_A); 

	if(D_A.length != config.length)
		return false;

	for(let i0 = 0; i0 < config.length; i0 += 1)
		if(D_A[i0].length != config[i0])
			return false;

	return true;
}


let ROW;
function Gather()
{
	//// parse IN to STORE >> ////
	ROW = IN.split('\n').map(line => {
		let row = 
		{
			// unkown arrangement
			UA: line.split(' ')[0].split(''),
			config: line.split(' ')[1].split(',').map(str => parseInt(str)),
		}
		return row;
	});

	// part-2 >>
	/*
	// extend x5
	for(let row of ROW)
	{
		let new_UA = [];
		let new_config = [];

		for(let i0 = 0 ; i0 < 5; i0 += 1)
		{
			for(let char of row.UA)
				new_UA.push(char);
			new_UA.push('?')

			for(let val of row.config)
				new_config.push(val);
		}

		row.UA = new_UA;
		row.config = new_config;
	}
	*/
	// << part-2

	//// << parse IN to STORE ////
}

// U.title("somthng");
_A();