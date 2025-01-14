/*
	start: 20:06
	found: 21:20 (both linear, recursive approach)
*/

// linear approach
// >> 124ms for 25 blinks
// >> 500ms for 75 blinks
// >> 880ms for 100 blinks
// >> 15sec for 1000 blinks
// >> 30sec for 2000 blinks

function _A()
{
	console.log("somthng");
	U.save_code(IN, /[0-9]/);

	Gather();
	console.log("%cSTONES:", U.css.h() , UNQ_STONES);

	/*
	0 => 1
	1122 => 11 22
	else => else * 2024 
	*/

	let DOC = function(UNQ_STONES, id, count)
	{
		let index = UNQ_STONES.findIndex(unq_stone => unq_stone.id == id );
		if(index == -1)
			UNQ_STONES.push({ id: id, count: count});
		else
			UNQ_STONES[index].count += count;
	}

	for(let iter = 0 ; iter < 75; iter += 1)
	{
		// console.log(`after ${iter} blink: UNQ_STONES`, UNQ_STONES);

		let new_UNQ_STONES = [];
		for(let unq_stone of UNQ_STONES)
		{
			let id = unq_stone.id;
			let count = unq_stone.count;

			// 0 => 1
			if(id == 0) 
				DOC(new_UNQ_STONES, 1, BigInt(count));

			// even str length => a, b
			else if(id.toString().length % 2 == 0)
			{
				let str = id.toString();
				let id_a = str.substring(0, str.length / 2);
				let id_b = str.substring(str.length / 2, str.length);

				DOC(new_UNQ_STONES, parseInt(id_a), BigInt(count));
				DOC(new_UNQ_STONES, parseInt(id_b), BigInt(count));
			}

			// else => x2024
			else
				DOC(new_UNQ_STONES, id * 2024, BigInt(count));
		}

		UNQ_STONES = new_UNQ_STONES;

		console.log(`unq_stones count @${iter} blink: ${UNQ_STONES.length}`);
	}

	console.log("UNQ_STONES", UNQ_STONES);

	let sum = 0n;
	for(let unq_stone of UNQ_STONES)
		sum += BigInt(unq_stone.count);
	console.log(`sum(unique stones count): ${sum}`);

	U.save_return("Day-11 part-2", `${sum / 10n ** 12n}T`);
}


// recursive_approach
// >> 150ms for 25 blinks
// >> 26sec for 75 blinks

function _A_recursive()
{
	let UNQ_STONES = IN.split(' ').map(char => {
		return { id: parseInt(char), blink: 0, count: 1 };
	});
	U.save_code(IN, /[0-9]/);

	console.log(UNQ_STONES);

	let sum = 0n;
	for(let us of UNQ_STONES)
		sum += BigInt(recursive(us.id, us.blink + 1));

	console.log(`sum: ${sum}`);
}

function recursive(id, blink)
{
	/*
	// success
	if there is stone with certain id, at blink already exist
		return unq_stone.count
	
	if blink has reached blink-limit
		return 1;

	let count = 0;
	if( id == 0)
		count += recusive(1, blink + 1);
	else if( id.str.length % 2 == 0)
		count += recursive(id.substring(0, id.str.length/2), blink + 1);
		count += recursive(id.substring(id.str.length/2, id.str.length), blink + 1);
	else
		count += recusive(id * 2024, blink + 1);
		
	
	UNQ_STONES.push({id: , blink: , count: })
	return count
	*/

	let index = UNQ_STONES.findIndex(us => (us.id == id && us.blink == blink));
	
	// exist
	if(index != -1)
		return UNQ_STONES[index].count;

	// blink-limit
	if(blink >= 25 + 1)
		return 1n;

	// count
	let count = 0n;

	// case 0:
	if( id == 0)
		count += recursive(1, blink + 1);
	
	// case even id.str length
	else if( id.toString().length % 2 == 0)
	{
		let str = id.toString();
		let id_a = parseInt(str.substring(0, str.length / 2)); 
		let id_b = parseInt(str.substring(str.length / 2, str.length)); 
		count += recursive(id_a, blink + 1);
		count += recursive(id_b, blink + 1);
	}

	// case anything else
	else
		count += recursive(id * 2024, blink + 1);
		
	UNQ_STONES.push({id: id, blink: blink, count: count});
	return count;
}



let UNQ_STONES = []

function Gather()
{
	//// parse IN to STORE >> ////
	let STONES = IN.split(' ').map(char => parseInt(char));
	
	for(let stone of STONES)
	{
		let index = UNQ_STONES.findIndex(unq_stone => unq_stone.id == stone );
		if(index == -1)
			UNQ_STONES.push({ id: stone, count: 1});
		else
			UNQ_STONES[index].count += 1;

	}
	//// << parse IN to STORE ////
}

U.title("plutonian-pebbles");
_A();
// _A_recursive();