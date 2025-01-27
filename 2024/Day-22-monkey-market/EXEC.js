/*
	start: 14:50
	found: 
*/
function _A()
{
	console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cSEED:", U.css.h() , SEED);

	Logic();

	// sum>>

	// << sum
}

// >> 5500ms
function Logic()
{
	let max_iter = 2000;
	let sum = 0n;

	let BUYER = [];

	for(let seed of SEED)
	{
		let buyer = { seed: seed, banana_COUNT: [seed % 10n], CHANGE: [] };

		curr = seed;
		for(let iter = 0; iter < max_iter; iter += 1)
		{
			curr = gpr(curr);
			buyer.banana_COUNT.push(curr % 10n);
		}

		// console.log(`gpr @seed: ${seed} after ${max_iter} iter = %c${curr}`, U.css.h2r());
		sum += curr;

		BUYER.push(buyer);
	}
	console.log(`sum(gnpr after ${max_iter} iter for each seed): %c${sum}`, U.css.h2g());

	console.log("%cBUYER: ", U.css.h() , BUYER);
	Logic_part_B(BUYER);
}

// generate pseudo random
function gpr(seed)
{
	/*
	Calculate the result of multiplying the secret number by 64. then mix with secret number, prune the secret number
	Calculate the result of dividing the secret number by 32. then mix with secret number, prune the secret number
	Calculate the result of multiplying the secret number by 2048. then mix with secret number, prune the secret number

	To mix a value into the secret number, calculate the bitwise XOR of 
	To prune the secret number, calculate the value of the secret number 
		modulo 16777216 = & 16777215 = & 0o77777777
	*/

	// BigInt
	let new_0 = seed << 6n;
	seed = (new_0 ^ seed) & 0o77777777n;

	let new_1 = seed >> 5n
	seed = (new_1 ^ seed) & 0o77777777n;

	let new_2 = seed << 11n
	seed = (new_2 ^ seed) & 0o77777777n;

	return seed;
}

// first occurance of a certain 4-seq, for each buyer
function Logic_part_B(BUYER)
{
	// buyer.CHANGE
	for(let buyer of BUYER)
		for(let i0 = 1; i0 < buyer.banana_COUNT.length; i0 += 1)
			buyer.CHANGE.push(buyer.banana_COUNT[i0] - buyer.banana_COUNT[i0 - 1]);

	let SEQ = new Map();
	for(let buyer_i = 0; buyer_i < BUYER.length; buyer_i += 1)
	{
		let buyer = BUYER[buyer_i];
		for(let i0 = 0; i0 <= buyer.CHANGE.length - 4; i0 += 1)
		{
			let seq = 
			[
				buyer.CHANGE[i0 + 0],
				buyer.CHANGE[i0 + 1],
				buyer.CHANGE[i0 + 2],
				buyer.CHANGE[i0 + 3],
			];

			// let key = seq.join('_');
			let key =  (Number(seq[0]) + 9) * 19**0 + 
					   (Number(seq[1]) + 9) * 19**1 + 
					   (Number(seq[2]) + 9) * 19**2 + 
					   (Number(seq[3]) + 9) * 19**3; 

			let get_val = SEQ.get(key);
			if(SEQ.has(key) == false)
			{
				let FIRST_COUNT = BUYER.map(() => 0n); // make least banana count
				FIRST_COUNT[buyer_i] = buyer.banana_COUNT[i0 + 4];
				SEQ.set(key, { FIRST_COUNT: FIRST_COUNT, seq_i: SEQ.size });				
			}
			else
			{
				if(SEQ.get(key).FIRST_COUNT[buyer_i] == 0) // unoccupied
					SEQ.get(key).FIRST_COUNT[buyer_i] = buyer.banana_COUNT[i0 + 4];
			}
		}
	}
	console.log("%cSEQ", U.css.h(), SEQ);

	let SUM = [];
	for(let [key, VAL] of SEQ)
	{
		let sum = 0n;
		for(let val of VAL.FIRST_COUNT) // VAL.MAX_COUNT
			sum += val;
		SUM.push({ sum: sum, key: key, seq_i: VAL.seq_i });
	}

	// [sort] a: next, b: curr, return a - b;
	SUM.sort((a, b) => { return -Number(a.sum - b.sum); });
	console.log("%cSUM", U.css.h(), SUM);

	console.log(`max sum(first banana_count occurance with a certain 4-seq for a buyer) = %c${SUM[0].sum}`, U.css.h2g());
	U.save_return("Day-22 part-2", SUM[0].sum);
}


let SEED ;
function Gather()
{
	//// parse IN to STORE >> ////
	SEED = IN.split('\n').map(line => BigInt(parseInt(line)));

	//// << parse IN to STORE ////
}

U.title("monkey-market"); 
_A();