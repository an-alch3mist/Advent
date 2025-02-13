/*
	start: 01:26
	found: // TODO for 10**9 iter pos of each block = ?

	sokoban
*/
function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[O]/);

	Gather();
	console.log("%cBLOCK:", U.css.h() , BLOCK);
	console.log("%cB:", U.css.h() , B);

	Logic();

	// sum>>

	// << sum
}


function Logic()
{
	let str_STORE = "";

	// TODO: after 1 000 000 000 iter >>
	for(let iter = 0; iter < 1; iter += 1)
	{
		ROLL([ 0, -1]); // up
		// ROLL([-1,  0]); // west
		// ROLL([ 0, +1]); // south
		// ROLL([+1,  0]); // east

		let STR = B.map(row => row.map(val => ".#"[val]));

		for(let block of BLOCK)
			STR.ST(block.pos, 'O');

		let str = "";
		STR.forEach(row => str += row.join('') + '\n');
		str_STORE += `iter: ${iter}\n${str}\n\n`;
		// U.save_code(str, /[O]/);
		// await U.delay(20);
	}
	// << TODO: after 1 000 000 000 iter
	// there might be a repeating pattern after certain iter ?
	// at what iter pattern repeat occur? what is the time period of this cycle

	let sum = 0;
	let w = B[0].length; h = B.length;
	for(let block of BLOCK)
		sum += (h - block.pos[1]);

	U.save_code(str_STORE, /[O]/ );
	console.log(`sum of block distance after sokoban: %c${sum}`, U.css.h2g());
}

function ROLL(dir)
{
	for(let block of BLOCK)
		while(true)
		{
			let SOKOBAN = get_SOKOBAN(block, BLOCK, dir);
			if(SOKOBAN.collision == true)
				break;

			for(let next_block of SOKOBAN.NEXT_BLOCK)
				next_block.pos = v2.add(next_block.pos, dir);
		}	
}

// for a certain block in a given direction
function get_SOKOBAN(block, BLOCK, dir)
{
	let NEXT_BLOCK = [];

	// get collision in a certain direction and return all the BLOCK
	// using OR collision recursive, Accumulate approach
	function recursive(block, BLOCK, dir)
	{
		let w = B[0].length; let h = B.length;

		// NEXT_BLOCK
		NEXT_BLOCK.push(block);

		let collision = false;
		for(let y = block.pos[1]; y < block.pos[1] + block.size[1]; y += 1)
		for(let x = block.pos[0]; x < block.pos[0] + block.size[0]; x += 1)
		{
			let next_pos = v2.add([x, y], dir);
			let [X, Y] = next_pos;
			// out of bounds
			if(X < 0 || X > w - 1 || Y < 0 || Y > h - 1) 
			{
				// console.log("out of bounds", X, Y);
				collision = collision || true;
				return true;
			}

			// console.log(block , [x, y], [X, Y]);
			// wall
			if(B.GT([X, Y]) == 1)
			{
				// console.log("wall collision occured", X, Y);
				collision = collision || true;
				return true;
			}

			// each block approach >>
			for(let next_block of BLOCK)
				if(next_block != block)
					// [X, Y] inside next_block ?
					if( X >= next_block.pos[0] && X < next_block.pos[0] + next_block.size[0] &&
						Y >= next_block.pos[1] && Y < next_block.pos[1] + next_block.size[1] )
						// recursive
						collision = collision || recursive(next_block, BLOCK, dir);
			// << each block approach

		}
		return collision;
	}

	let collision = recursive(block, BLOCK, dir);
	return { NEXT_BLOCK: NEXT_BLOCK, collision:  collision}
}


let BLOCK;
let B;
function Gather()
{
	//// parse IN to STORE >> ////
	BLOCK = [];

	B = IN.split('\n').map((line, y) => {
		return line.split('').map((char, x) => {
			if(char == 'O')
				BLOCK.push({ pos: [x, y], size: [1, 1] });

			if(char == '#')
				return 1;
			else
				return 0;
		});
	});

	//// << parse IN to STORE ////
}

// U.title("somthng");
_A();