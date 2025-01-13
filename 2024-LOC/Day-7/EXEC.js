function _A()
{
	console.log("somthng");
	U.save_code(IN);

	Gather();
	console.log("%cGATHER-DATA:", U.css.h() , EXP);


	let sum = 0n;
	

	// 0.5sec	for 850 exp, with 2 combination //
	// 28sec 	for 850 exp, with 3 combination  //

	let OPERS = "+*c";
	for(let exp of EXP)
	{
		// let BLOCKS_PERMUTE = nPr(OPERS, exp.vals.length - 1);
		//
		// await U.delay(20);
		// let nPr_ = nPr(OPERS.length, exp.vals.length - 1);
		let possibles = Math.pow(OPERS.length, exp.vals.length - 1);
		for(let iter = 0; iter < possibles; iter += 1)
		{	
			let str = iter.toString(OPERS.length);
			while(str.length < (exp.vals.length - 1))
				str = "0" + str;

			// let permute = str.split('').map(char => OPERS[parseInt(char)]).join('');
			let permute = str;

			// console.log(str, permute, exp);
			let result = exp.vals[0];
			for(let i0 = 0; i0 < permute.length; i0 += 1)
			{
				if(permute[i0] == '0') result += exp.vals[i0 + 1];
				if(permute[i0] == '1') result *= exp.vals[i0 + 1];
				if(permute[i0] == '2') result = parseInt(
					result.toString() + 
					exp.vals[i0 + 1].toString()
				);
			}
			//
			if (result == exp.result)
			{ sum += BigInt(exp.result); break; }
		}
	}

	console.log(`sum: ${sum}`);
	// nPr(possibles, blocks-count)
	console.log(`%cnPr("+*c", 4):`, U.css.h(), nPr("+*c", 4));

	U.save_return("Day 7: part-2", `${sum / 1000000000000n}T`);
}

// nPr with anything possible @ each block //
// function as: nPr("+*", 4) 

// 0.5sec	for 850 exp, with 2 combination //
// 28sec 	for 850 exp, with 3 combination  //
function nPr(possibles , blocks_count)
{
	let BLOCKS = [];
	for(let val = 0; val < Math.pow(possibles.length, blocks_count); val += 1)
	{
		let str = val.toString(possibles.length);
		while(str.length < blocks_count) str = '0' + str;

		str = str.split('') .map( char => possibles[parseInt(char)])
						   	.join('');
		BLOCKS.push(str);
	}
	//
	return BLOCKS;
}


function _A_recursive()
{
	Gather();
	console.log("%cGATHER-DATA:", U.css.h() , EXP);
	U.save_code(IN, char_pattern = /\:/);


	console.log(nPr("+*c", 11), (10n ** 12n)/10n , (10 ** 12)/10);

	let sum = 0n;
	for(let exp of EXP)
	{
		iter_per_exp = 0;
		let valid = recursive(exp.result, exp.vals);
		// console.log(exp, `iter_per_exp: ${iter_per_exp}`, valid);
		if(valid)
			sum += BigInt(exp.result);
	}

	console.log(`sum: ${sum}(recursive approach)`);
	U.save_return("Day 7: part-2", `${sum / (10n ** 12n)}T`);
}

/*
	7.5sec with recursive
	9.5sec with linear nPr
*/
let iter_per_exp = 0;
function recursive(target , nums)
{	
	// success >>
	iter_per_exp += 1;
	if(nums.length == 1)
	{
		if(nums[0] == target)
		{
			// await U.delay(10);
			// console.log(target, nums, nums[0] == target , seq_from);
			return true;
		}
		else
		{
			// console.log(target, nums, nums[0] == target , seq_from);
			return false;
		}
	}
	// << success

	// [oper(nums[0] , nums[1] , '+')] + nums[2:]
	// new_way
	return  recursive(target, [...[nums[0] + nums[1]], ...nums.slice(2)])  ||
			recursive(target, [...[nums[0] * nums[1]], ...nums.slice(2)]) || 
			recursive(target, [...[parseInt(nums[0].toString() + nums[1].toString())], ...nums.slice(2)]); 
	/*
	// old_way
	return  recursive(target, [(nums[0] + nums[1])].concat(nums.slice(2)) ) ||
			recursive(target, [(nums[0] * nums[1])].concat(nums.slice(2))) || 
			recursive(target, [parseInt(nums[0].toString() + nums[1].toString())].concat(nums.slice(2)) );
	*/
}

let EXP = [];
//
function Gather()
{
	//// parse IN to STORE >> ////
	EXP = IN.split('\n').map(line => {
		let [result, vals] = line.split(": ");

		return {
			result: parseInt(result),
			vals: vals.split(' ').map(val => parseInt(val)),
		}
	});
	//// << parse IN to STORE ////
}

U.title("bridge-repair");


// _A();
_A_recursive();