/*
if REG.a = 0o3062342312204233

each of the octal in REG.a contribute to OUTPUT :
	if OUTPUT = [2,4,1,5,7,5,0,3,4,0,1,6,5,5,3,0]

	program order 
		.
		REG.b = REG.a....
		REG.c = REG.b....
		REG.b = REG.a....
		.
		REG.a >> 3
		.
		OUTPUT()
		if(REG.a == 0)
			exit

		since REG.a >> 3 is  decremented each iteration of exec
		So, the starting of REG.a contribute to value of OUTPUT.gl(0) => [....0]
		because 0o3 is left at last for the output before halt,

		and, 0 in o30  contribute to OUTPUT.gl(1) => [....3.]
		and, 6 in o306 contribute to OUTPUT.gl(2) => [...6..]
		and so on
*/

/*
From ANALYSE_EXEC: 
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
*/

/*
	start : 01:28
	part-1: 01:46
	found : 01:58
*/
function _A()
{
	Gather();
	console.log("%cREG", U.css.h(), REG);
	console.log("%cINT_CODE", U.css.h(), INT_CODE);
	U.save_code(IN, /[\:\,]/);

	Logic();

	// sum >>

	// << sum
}

// Each octal of REG.a correspond to each output of OUTPUT Approach
// >> 148ms, 
function Logic()
{
	let OUTPUT = EXEC(REG, INT_CODE);
	console.log("part-1 (output of exec seperated by ,):", OUTPUT.join(','));

	// recursive(output_index_gl = 1, 0o3n); // since, 0o3 is the only way OUTPUT.gl(0) == 0
	// or
	recursive(output_index_gl = 0, 0o0n);
	console.log("%cREG_a_VAL" , U.css.h() , REG_a_VAL);

	// a: next, b: curr => return (a - b) typeof Number
	let min_reg_a = REG_a_VAL.sort((a, b) => { return Number(a - b); })[0];

	console.log("part-2 (min REG.a where EXEC OUTPUT == INT_CODE):", min_reg_a);
	U.save_return("Day-17 part-2", `${min_reg_a/(10n**12n)}T`);
}

function EXEC(initial_REG, INT_CODE)
{
	let REG = initial_REG;

	let combo = function(operand)
	{
		if(operand == 4n) return REG.a;
		if(operand == 5n) return REG.b;
		if(operand == 6n) return REG.c;
		return operand;
	}

	let OUTPUT = [];
	for(let ptr = 0; ptr < INT_CODE.length; ptr += 2)
	{	

		let opcode = INT_CODE[ptr];
		let operand = INT_CODE[ptr + 1];

		if(opcode == 0) // adv
			REG.a = REG.a >> combo(operand);
		if(opcode == 1) // bxl
			REG.b = REG.b ^ operand;
		if(opcode == 2) // bst
			REG.b = combo(operand) & 7n;
		if(opcode == 3) // jnz
			if(REG.a != 0n)
			{
				ptr = Number(operand);
				ptr -= 2;
			}
		if(opcode == 4)// bxc
			REG.b = REG.b ^ REG.c;
		if(opcode == 5)
			OUTPUT.push(combo(operand) & 7n)
		if(opcode == 6) 
			REG.b = REG.a >> combo(operand);
		if(opcode == 7) 
			REG.c = REG.a >> combo(operand);
	}

	return OUTPUT;
}

// * depend on decr of REG.a in INT_CODE, 
//   meaning: method works only when decr of REG.a is achived by >> 3

let REG_a_VAL = [];
function recursive( output_index_gl, PREV_OCT )
{
	/*
	remember:
		each ith oct of OCT contribute to ith_from_last output of OUTPUT
		so, figure out possible octal 0b000 to 0b111 at each REG.a octal that make (OUTPUT == INT_CODE)
	*/

	// success
	if(output_index_gl > INT_CODE.length - 1)
	{
		// console.log(`found a REG.a: 0o${PREV_OCT.toString(8)}`);
		REG_a_VAL.push(PREV_OCT);
		return;
	}

	// oct
	// * 000 depend on decr of REG.a in INT_CODE
	for(let oct = 0b000n; oct <= 0b111n; oct += 1n)
	{
		// * << 3n depend on decr of REG.a in INT_CODE
		let new_OCT = (PREV_OCT << 3n) + oct;

		let OUTPUT = EXEC({a: new_OCT, b: 0n, c: 0n}, INT_CODE);
		if(OUTPUT[0] == INT_CODE.gl(output_index_gl))
			// recursive
			recursive(output_index_gl + 1, new_OCT );
	}
}


let REG;
let INT_CODE;

function Gather()
{
	// parse IN here >>
	let registers = IN.split("\n\n")[0].split('\n').map(line => parseInt(line.split(": ")[1]));
	REG = 
	{
		a: BigInt(registers[0]),
		b: BigInt(registers[1]),
		c: BigInt(registers[2])
	}

	INT_CODE = IN.split("\n\n")[1].split(": ")[1].split(',').map(char => BigInt(parseInt(char)));
	// << parse IN here
}


U.title("chronospatial-computer");
_A();