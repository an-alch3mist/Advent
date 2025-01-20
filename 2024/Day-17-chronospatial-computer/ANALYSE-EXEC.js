function _A()
{
	console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cREG:", U.css.h() , REG , `ptr: ${ptr}`);
	console.log("%cINT_CODE:", U.css.h(), INT_CODE);

	Logic();

	// sum>>
	console.log(OUTPUT.join(','));
	// << sum
}


/*
	the program 0,1,2,3 would 
		run the instruction whose opcode is 0 and 
		pass it the operand 1, 
		then run the instruction having opcode 2 and 
		pass it the operand 3, then halt.
*/
let OUTPUT = [];
function Logic(initial_REG)
{
	OUTPUT = [];
	REG = initial_REG;

	let combo = function(literal)
	{
		if(literal == 4n) return REG.a;
		if(literal == 5n) return REG.b;
		if(literal == 6n) return REG.c;

		return literal;
	}

	REG = { a: BigInt(initial_REG.a), b: BigInt(initial_REG.b), c: BigInt(initial_REG.c) };
	INT_CODE = INT_CODE.map(int => BigInt(int));

	for(ptr = 0n; ptr < INT_CODE.length; ptr += 2n)
	{
		let opcode  = INT_CODE[ptr];
		let operand = INT_CODE[ptr + 1n];

		if(opcode == 0n) // (adv).... REG.a = REG.a >> combo(operand)
			REG.a = REG.a >> combo(operand);
		if(opcode == 1n) // (bxl).... REG.b = REG.b ^ operand
			REG.b = REG.b ^ operand;
		if(opcode == 2n) // (bst).... REG.b = combo(operand) % 8
			REG.b = combo(operand) & 7n;
		if(opcode == 3n) // (jnz).... if(REG.a != 0) ptr = operand; ptr -= 2
			if(REG.a != 0n) 
			{
				ptr = operand;
				ptr -= 2n;
			}
		if(opcode == 4n) // (bxc).... REG.b = REG.b ^ REG.c
			REG.b = REG.b ^ REG.c;
		if(opcode == 5n) // (out).... OUTPUT.push(combo(operand) % 8)
			OUTPUT.push(combo(operand) & 7n);
		if(opcode == 6n) // (bdv).... REG.b = REG.a >> combo(operand)
			REG.b = REG.a >> combo(operand);
		if(opcode == 7n) // (cdv).... REG.c = REG.a >> combo(operand)
			REG.c = REG.a >> combo(operand);
	}
}


/*
	start: 15:58
	restart: 23:20
	found: 01:12

	PICK_OCT approach
*/
/*
	You'll need to find a new value to which you can initialize register A,
	so that the program's OUTPUT is an exact copy of the program itself.
*/

// PICK_OCT approach : 257ms
function _B()
{
	U.save_code(IN, /[ABC\:\,]/);
	Gather();
	console.log("%cREG", U.css.h(), REG);

	/*
		analysis => 
		an INT_CODE program must have:
			0. decrement REG.a
			( 
				determines length of a program, think of it as an iter index,
				more the decr of RED.a by <<
				in each run, more the decrement rate
			)
			1. out, ( somewhere before jnz )
			2. jnz, ( usually at the end )
	*/
	/* Approach => 
		to get 16 outputs: 
			REG.a should be 16 * 3 bits or 16bytes 
	*/

	// checked >>
	for(let i0 = 0o370; i0 <= 0o377; i0 += 1)
	{
		// S_Logic({ a: i0, b:0, c:0 });
		// console.log((i0 & 7).toString(8).padStart(1, '0'), OUTPUT);
	}
	// _000_ 			to get 0:  3 or 011
	// _000_ prev 		to get 3:  0, 		  1, 	 5,  7
	// _000_ prev prev	to get 5: [0,4,6,7], [0],	[], [1]	

	S_Logic({ a: 0o371, b:0, c:0 });
	console.log(OUTPUT);
	// << checked

	recursive(1, 0o3n);
	// a > b
	console.log("REG_a_answer", REG_a_answer);
	let min = U.clone(REG_a_answer).minMax((a, b) => a - b);
	console.log(`min: ${min}`);

	// U.save_return("Day-17 part-2", REG_a_answer);

	console.log("-----------------------------");
	S_Logic({a: 136902148099849n, b: 0, c: 0});
	console.log(OUTPUT.join(','));
}


// simplified logic
let S_Logic = function(initial_REG)
{
	OUTPUT = [];
	REG = { a: BigInt(initial_REG.a), b: BigInt(initial_REG.b), c: BigInt(initial_REG.c) };
	
	let iter = 0;
	while(true)
	{
		iter += 1;
		if(iter > 20)
		{
			console.log(initial_REG, "iter > 20");
			break;
		}

									// INT_CODE
		REG.b = REG.a & 7n;			// 2,4
		REG.b = REG.b ^ 5n;			// 1,5
		REG.c = REG.a >> REG.b;		// 7,5
		REG.a = REG.a >> 3n;		// 0,3 		// A decr >> 3
		REG.b = REG.b ^ REG.c;		// 4,0
		REG.b = REG.b ^ 6n;			// 1,6
		
		try
		{
			OUTPUT.push(REG.b & 7n)		// 5,5 		// out
		}
		catch(e)
		{
			console.warn(OUTPUT, REG, initial_REG);
			return;
		}
		if(REG.a == 0n)				// 3,0 		// jnz
			break;
	}
};

// PICK_OCT => OCT formed from picking one from each of output, that reult in output
// refer line: 111

let REG_a_answer = [];
let best_iter = 0;
function recursive( output_index_gl , PICK_OCT )
{
	if(U.iter_inc(10**8))
		return;
	/*
	for oct from 0 to 7
		let OCT = (oct << 3*(output_index)) +  PICK_OCT
		REG.a = OCT

		S_Logic({a: REG.a, b: 0, c: 0})

		if(OUTPUT[0] == output)
			OCT.push( oct )	
			recursive(output_index - 1, OCT);
	*/
	if(output_index_gl > INT_CODE.length - 1)
	{
		console.log("REG_a found");
		if(best_iter == 0)
			best_iter = U.iter;
		REG_a_answer.push([PICK_OCT, "0o" + PICK_OCT.toString(8) , best_iter]);
		return;
	}

	for(let oct  = 0b000n ; oct <= 0b111n; oct += 1n)
	{
		let OCT = (PICK_OCT << 3n) + oct;
		let REG_a = OCT;

		Logic({a: REG_a, b: 0, c: 0});

		if(OUTPUT[0] == INT_CODE.gl(output_index_gl))
		{
			if(output_index_gl > 1)
				console.log(
					OUTPUT[0], INT_CODE.gl(output_index_gl),
					`OCT:0o${OCT.toString(8)}, oigl:${output_index_gl}`,
					"prev_OCT:0o" + PICK_OCT.toString(8),
					OUTPUT.join(',')
				);
			recursive(output_index_gl + 1, OCT);
		}
	}

}




let REG;
let INT_CODE;
let ptr;

function Gather()
{
	//// parse IN to STORE >> ////
	let registers = IN.split("\n\n")[0].split('\n').map(line => {
		return parseInt(line.split(": ")[1])
	});

	REG = { a: registers[0], b: registers[1], c: registers[2]};

	INT_CODE = IN.split("\n\n")[1].split(": ")[1].split(',')
			 .map(char => parseInt(char));

	ptr = 0;
	//// << parse IN to STORE ////
}

U.title("chronospatial-computer");
// _A();
_B();