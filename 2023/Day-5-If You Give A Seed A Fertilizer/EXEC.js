/*
	start: 20:05
	found: 02:00
*/

function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[a-z\:\-]/);

	Gather();
	console.log("%cSEED:", U.css.h() , SEED);
	console.log("%cSEED_RANGE:", U.css.h() , SEED_RANGE);
	console.log("%cMAP:", U.css.h() , MAP);

	Logic();
	// sum>>

	// << sum
}

// 7ms >> 
function Logic()
{
	let SEED_LOC = [];
	for(let seed_range of SEED_RANGE)
	{
		FINAL_MAP = [];
		recursive(source = seed_range, map_level = 0, MAP);

		// [min] a < b, return a[1] - b[0]
		let min_range = FINAL_MAP.minMax((a, b) => a[0] - b[0]);
		SEED_LOC.push({ seed_range: seed_range, min_range_loc: min_range });
	}

	// [min] a < b, return a.min_range_loc[0] - b.min_range_loc[0]
	let min_loc = SEED_LOC.minMax((a, b) => Number(a.min_range_loc[0] - b.min_range_loc[0]));
	
	// log
		U.save_return("Day-5 part-2", min_loc.min_range_loc[0]);
		console.log(`min loc val obtained from min of loc_range among seed range: %c${min_loc.min_range_loc[0]}`, U.css.h2g());
	// log
}


// recursive tree growth until level MAP.length - 1, and append terminals
let FINAL_MAP = [];
// source: [min, max]
function recursive(source, map_level, MAP)
{
	if(map_level >= MAP.length)
	{
		FINAL_MAP.push(source);
		return;
	}


	let map = MAP[map_level];
	let new_RANGE = get_RANGE(source, map.RANGE);

	for(let range of new_RANGE)
		recursive(range.dest, map_level + 1, MAP);

}

// check
function get_RANGE(source, RANGE)
{
	let new_RANGE = [];
	
	for(let range of RANGE)
	{
		let rsrc = range.source;
		if(rsrc[0] >= source[0] && rsrc[0] <= source[1])
		{
			// checked
			// left: inside, right: inside
			if(rsrc[1] <= source[1])
			{
				// console.log("case: 0 0");
				new_RANGE.push(
					{
						source_utilized: range.source,		
						dest: U.clone(range.dest),
					}
				);
			}

			// checked
			// left: inside, right: outside
			else if(rsrc[1] > source[1])
			{
				// console.log("case: 0 1");
				let delta = source[1] - rsrc[0];
				new_RANGE.push(
					{
						source_utilized: range.source,
						dest:[range.dest[0], range.dest[0] + delta]
					}
				);
			}
		}

		else if(rsrc[0] < source[0])
		{
			// checked
			// left: outside, right: inside
			if(rsrc[1] <= source[1] && rsrc[1] >= source[0])
			{
				// console.log("case: 1 0");
				let delta = source[0] - rsrc[0];
				new_RANGE.push(
					{
						source_utilized: range.source,
						dest:[range.dest[0] + delta, range.dest[1]],
					}
				);
			}

			// 
			// left: outside, right: outside
			else if(rsrc[1] > source[1])
			{
				// console.log("case: 1 1");
				let delta_0 = source[0] - rsrc[0];
				let delta_1 = source[1] - source[0];

				new_RANGE.push(
					{
						source_utilized: range.source,
						dest:[range.dest[0] + delta_0, range.dest[0] + delta_0 + delta_1],
					}
				);
			}
		}
	}

	return new_RANGE;
}


let MAP;
let SEED;
let SEED_RANGE;

function Gather()
{
	//// parse IN to STORE >> ////
	// SEED
	SEED = IN.split('\n')[0].split(": ")[1].split(' ').map(str => BigInt(str));

	// SEED_RANGE
	SEED_RANGE = [];
	for(let i0 = 0; i0 < SEED.length; i0 += 2)
		SEED_RANGE.push([SEED[i0], SEED[i0] + SEED[i0 + 1] - 1n]);


	// MAP >>
	MAP = [];

	IN.split("\n\n").forEach((section, sid) => {
		if(sid == 0)
			return;

		let RANGE = [];

		section.split('\n').forEach((line, y) => {
			if(y == 0)
				return;

			let VAL = line.split(' ').map(str => BigInt(str));

			let range = 
			{
				source: [VAL[1], VAL[1] + VAL[2] - 1n],
				dest:   [VAL[0], VAL[0] + VAL[2] - 1n],
			};

			RANGE.push(range)

			// console.log(line);
		});

		MAP.push({ name: section.split('\n')[0], RANGE: RANGE });
	});

	// [sort] a: next, b: curr, return a - b;
	for(let map of MAP)
		map.RANGE.sort((a, b) => { return Number(a.source[0] - b.source[0]) });

	// add extreme range [0 to min_source - 1], [max_source + 1, 10**12]
	for(let map of MAP)
	{
		let min_source = map.RANGE[0].source[0];
		let max_source = map.RANGE.gl(0).source[1];
		// console.log(max_source);

		if(min_source > 0n)
			map.RANGE.insert( index = 0, 
				{
					source: [0n, min_source - 1n],
					dest:   [0n, min_source - 1n]
				}
			);
		//
		if(max_source < 10n**12n)
			map.RANGE.push( 
				{
					source: [max_source + 1n, 10n ** 12n],
					dest:   [max_source + 1n, 10n ** 12n]
				}
			);
	}

	// fill the gaps
	for(let map of MAP)
	for(let i0 = map.RANGE.length - 1; i0 >= 1; i0 -= 1)
	{
		let range_1 = map.RANGE[i0];
		let range_0 = map.RANGE[i0 - 1];

		if(range_1.source[0] - range_0.source[1] > 1)
		{
			// console.log(map, range_0, range_1);
			let range = 
			{
				source: [range_0.source[1] + 1n , range_1.source[0] - 1n],
				dest: [range_0.source[1] + 1n , range_1.source[0] - 1n],
			};
			map.RANGE.insert(i0, range);
		}
	}

	// << MAP
	//// << parse IN to STORE ////
}


U.title("If You Give A Seed A Fertilizer");
_A();