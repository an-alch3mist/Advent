function _A()
{
	console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cPGRM:", U.css.h() , PGRM);

	Logic();

	// sum>>

	// << sum
}


function Logic()
{
	// a, b are in range 0 to 99
	for(let i0 = 0; i0 <= 99; i0 += 1)
	for(let i1 = 0; i1 <= 99; i1 += 1)
	{
		Gather();
		let output = exec(REG = { a: i0, b: i1 }, PGRM);
		if(output == 19690720)
		{
			console.log(i0 * 100 + i1);
			U.save_return("Day-2 part-2", i0 * 1 + i1);
			break;
		}
	}
}

function exec(REG , PGRM)
{
	PGRM[1] = REG.a;
	PGRM[2] = REG.b;

	for(let i0 = 0; i0 <= PGRM.length - 1; i0 += 4)
	{
		let opcode = PGRM[i0];
		if(opcode == 99)
			break;

		let a = PGRM[PGRM[i0 + 1]];
		let b = PGRM[PGRM[i0 + 2]];

		if(opcode == 1)
			PGRM[PGRM[i0 + 3]] = a + b;

		if(opcode == 2)
			PGRM[PGRM[i0 + 3]] = a * b;

	}

	return PGRM[0];
}


let PGRM;

function Gather()
{
	//// parse IN to STORE >> ////
	PGRM = IN.split(',').map(char => parseInt(char));
	//// << parse IN to STORE ////
}

// U.title("somthng");
_A();