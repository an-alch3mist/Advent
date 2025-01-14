/*
	start: 19:34
	found: 20:40
*/

// 700ms
function _A()
{
	console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cDATA:", U.css.h() , DATA);

	// part-1
	let iter = 0;
	while(true)
	{
		// str
		/*		
			let str = DATA.map(val => {
				if(val == -1)
					return '.';
				else
					return val.toString();
			}).join('');
			// console.log(`${iter}:\t ${str}`);
			iter += 1;
		*/

		// move-from
		let move_from = -1;
		for(move_from = DATA.length -1 ; move_from >= 0 ; move_from -= 1)
			if(DATA[move_from] != -1)
				break;

		// move-to
		let move_to = -1;
		for(move_to = 0; move_to < DATA.length; move_to += 1)
			if(DATA[move_to] == -1)
				break;

		// found none
		if(move_to > move_from)
			break;

		// make move
		DATA[move_to] = DATA[move_from];
		DATA[move_from] = -1;
	}
	console.log("DATA: ", DATA);


	// check-sum
	let sum = 0;
	for(let i0 = 0 ; i0 < DATA.length; i0 += 1)
		if(DATA[i0] != -1)
			sum += DATA[i0] * i0;

	console.log(`sum: ${sum}`);
	// part-1 6.3T
}

// 400ms //
function _B()
{
	console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather(part = 2);
	console.log("%cDATA:", U.css.h() , DATA);

	for(let move_from = DATA.length - 1; move_from >= 1; move_from -= 1)
	{
		// move_to: move between move_to index , move_to + 1 index
		// => .splice(move_to + 1)
		let move_to = -1;
		for(move_to = 0; move_to < move_from; move_to += 1)
		{
			let gap = DATA[move_to + 1].pos - (DATA[move_to].pos + DATA[move_to].size - 1) - 1;
			//
			if(gap >= DATA[move_from].size)
				break;
		}

		if(move_to == move_from)
			continue;
		else
		{
			// data 
			let data = DATA[move_from];
			data.pos = DATA[move_to].pos + DATA[move_to].size;

			// remove
			DATA.splice(move_from, 1);

			// insert
			DATA.splice(move_to + 1, 0, data);

			// manage the void created by movement of move_from
			move_from += 1;
		}
	}

	// check-sum
	let sum = 0n;
	for(let i0 = 0 ; i0 < DATA.length; i0 += 1)
	{
		// pos_i
		let pos_i = DATA[i0].pos;
		for(let i1 = DATA[i0].pos; i1 < DATA[i0].pos + DATA[i0].size; i1 += 1 )
		{
			if(DATA[i0] != -1)
				// sum
				sum += BigInt(DATA[i0].id * pos_i);

			// pos_i inc
			pos_i += 1;
		}
	}
	//
	console.log(`sum: ${sum}`);

	// part-2: 6 376 648 986 651
	U.save_return("Day-9 part-2", `${sum}`);
}




let DATA = [];

function Gather(part = 1)
{
	DATA = [];
	//// parse IN to STORE >> ////

	if(part == 1)
		IN.split('').forEach((char, index) => {
			if(index % 2 == 0)
			{
				for(let i0 = 0 ; i0 < parseInt(char); i0 += 1)
					DATA.push(index / 2);
			}
			else
			{
				for(let i0 = 0 ; i0 < parseInt(char); i0 += 1)
					DATA.push(-1);	
			}
		});


	let start_i = 0;
	if(part == 2)
		IN.split('').forEach((char, index) => {
			if(index % 2 == 0)
			{
				DATA.push({id: index / 2, pos: start_i, size: parseInt(char) });
				start_i += parseInt(char);
			}
			else
			{
				start_i += parseInt(char);	
			}
		});

	//// << parse IN to STORE ////
}

U.title("disk-frag");
// _A();
_B();