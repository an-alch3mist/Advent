/*
	start: 01:08
	found: 2:10
*/

function _A()
{
	U.save_code(IN.split("\n\n")[0], /[@]/);

	Generate();
	console.log("%cB", U.css.h(), B, start);
	console.log("%cBOX", U.css.h(), U.clone(BOX));
	console.log("%cMOVE", U.css.h(), MOVE);

	Logic();

	// sum >> 
	let sum = 0;
	for(let box of BOX)
		sum += box.pos[0] * 1 + box.pos[1] * 100;

	console.log(`sum(foreach box x*1 + y*100): ${sum}`);
	U.save_return(`Day-15 part-2`, sum);
	// << sum
}


// LIST approach >> 400ms
// TODO: GRID approach >> 160ms(regardless of BOX.count)
function Logic()
{
	let curr = U.clone(start);

	for(let move of MOVE)
	{
		let next = v2.add(curr, move);

		// wall-ahead in future?
		user_BOX = [];
		wall_ahead = false;
		recursive(pos = next, dir = move);
		
		// no wall ahead
		if(wall_ahead == false)
		{
			// move user
			curr = next;
			// move BOX
			for(let box of user_BOX)
				box.pos = v2.add(box.pos, move);
		}
	}
}

// recursive[accumulate to storage approach] >>
let wall_ahead;
let user_BOX = [];
function recursive(pos, dir)
{
	// LIST
	let box_index = BOX.findIndex(box => {
		for(let offset of box.OFFSET)
			if(v2.eql(v2.add(box.pos, offset), pos))
				return true;
		return false;
	});
	
	// return wall?, no box found
	if(box_index == -1)
	{
		wall_ahead = wall_ahead || (B.GT(pos).wall);
		return;
	}

	// box_index != -1
	let box = BOX[box_index];

	// do nothing
	if(user_BOX.includes(box))
		return;

	// came across this box for the first time
	else
	{
		user_BOX.push(box);
		for(let offset of box.OFFSET)
		{
			let next_pos = v2.add(v2.add(box.pos, offset), dir);
			recursive(next_pos, dir)
		}
	}
}
// << recursive[accumulate to storage approach]


function log_B(B, curr, BOX)
{
	let w = B[0].length;
	let h = B.length;

	let STR = [];
	// B
	for(let y = 0; y < h; y += 1)
	{
		STR.push([]);
		for(let x = 0; x < w; x += 1)
		{
			if(B[y][x].wall)
				STR[y].push('#')
			else
				STR[y].push('.')
		}
	}

	// curr
	STR.ST(curr, '@');

	// BOX
	let NAME = "01234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for(let box of BOX)
		for(let offset of box.OFFSET)
			STR.ST(v2.add(box.pos, offset), NAME[BOX.indexOf(box) % NAME.length]);

	let str = "";
	STR.forEach(row => str += row.join('') + '\n' );
	return str;
}


let B = [];
let w; let h;
let start = [];

let BOX = [];
let MOVE = [];

function Generate()
{
	// parse IN here >>
	// B
	B = IN.split("\n\n")[0].split('\n').map((line, y) => {
		return line.split('').map((char, x) => {
			// start
			if(char == '@')
				start = [x, y];

			// BOX
			if(char == 'O')
				BOX.push({ pos: [x, y], OFFSET: [[0, 0]]});

			if(char == '#')
				return {wall: true, box: null};
			else
				return {wall: false, box: null};
		});
	});

	// B ---- BOX only for GRID approach
	for(let box of BOX)
		for(let offset of box.OFFSET)
			B.GT(v2.add(box.pos, offset)).box = box;


	// MOVE
	IN.split("\n\n")[1].split('\n').forEach(line => {
		line.split('').forEach( char => {
			MOVE.push(v2.DIRS[v2.DIR_CHARS.indexOf(char)]);
		});
	});

	// part-2 >>
		w = B[0].length; h = B.length;

		let new_B = []
		for(let y = 0; y < h; y += 1)
		{
			new_B.push([]);
			for(let x = 0; x < w; x += 1)
			for(let i0 = 0; i0 < 2; i0 += 1)
				new_B[y].push(B[y][x]);
		}
		B = new_B;

		start[0] *= 2;

		for(let box of BOX)
		{
			box.pos[0] *= 2;
			box.OFFSET = [[0, 0], [1, 0]];

			// B ---- BOX only for GRID approach
			for(let offset of box.OFFSET)
				B.GT(v2.add(box.pos, offset)).box = box;
		}
	// << part-2

	w = B[0].length; h = B.length;
	// << parse IN here
}

U.title("warehouse-woes"); U.zoom("80%");
_A();