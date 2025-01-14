/*
	permutate => n!
	with empty space padding => n! / (n - r)! 
	where (n - r) => empty spaces (all empty elements are same)
		      (r) => count of elements
	npr = n! / (n - r)!

	combination is subset of permutation
	of a: 1's, b: 2's => n! / ((n - r)! * a! * b!)
	so for combination all r elements are considered same => npr / r!



	permutation with distinct elements 
	=> where anything is possible in each blocks

	possibility of 

	d: count of distincts , 
	n: count of blocks  
		=> pow(d, n)
*/

function _A()
{
	Generate_IN(seed = 2n, lines_count = 10000);
	U.save_code(IN);

	
	Gather();
	console.log("%cSTR:", U.css.h() , STR);
	console.log(`%cnCr:`, U.css.h() , nCr("qqqqqq"));
	// console.log(`%cnPr:`, U.css.h() , nPr("121111111"));
	// console.log(`%cnPr_UNQ:`, U.css.h() , nPr_UNQ("121111111"));


	let sum = 0;
	for(let str of STR)
	{
		let ncr = nCr(str, STR.findIndex(_str => _str == str));
		sum += ncr.length;
	}
	console.log(`sum: ${sum}`);
	
}


// fastest: only for 2 unique chars //
function nCr(str)
{
	let UNIQUE = [];
	for(let char of str.split(''))
	{
		let start = UNIQUE.findIndex(unq => unq.char == char);
		if(start == -1) UNIQUE.push({char: char, count: 1});
		else			UNIQUE[start].count += 1;
	}

	// a: next, b:curr, return a - b
	UNIQUE.sort((a, b) => { return (a.count - b.count)});

	// nC0 or nCn case //
	if(UNIQUE.length == 1) 
		return [str];


	// n r
	let r = UNIQUE[0].count;
	let n = 0;
	for(let uq of UNIQUE)
		n += uq.count;

	let seq = []; for(let i0 = 0; i0 < n; i0 += 1) seq.push(0);

	// recursive 
	let SEQ = [];
	function recursive(seq, start, end)
	{
		// end hits last of seq
		if(end == seq.length - 1)
			for(let i0 = start; i0 <= end; i0 += 1)
			{
				let new_seq = U.clone(seq);
				new_seq[i0] = 0;
				SEQ.push(new_seq)
			}
		else
			for(let i0 = start; i0 <= end; i0 += 1)
			{
				let new_seq = U.clone(seq);
				new_seq[i0] = 0;
				recursive(new_seq, i0 + 1, end + 1);
			}
	}
	recursive(seq, start = 0, end = n - r);
	
	// POSSIBLES
	// TODO: resolve ambiguity of UNIQUE index , seq val
	let POSSIBLES = SEQ.map(seq => {
		let str = "";
		for(let val of seq)
			str += UNIQUE[val].char;

		return str;
	});

	return POSSIBLES;
}


//  slowest n factorial with every chars are unique:, do not use more then 8 chars //
function nPr(str)
{
	let seq = str.split('');

	let SEQ = [];
	function recursive(ansc_seq, seq)
	{
		if(ansc_seq.length == 0)
			SEQ.push(seq); // success return
		else
			for(let i0 = 0 ; i0 < ansc_seq.length; i0 += 1)
			{
				let new_ansc_seq = U.clone(ansc_seq);
				let char = new_ansc_seq[i0];
				new_ansc_seq.splice(i0, 1);

				let new_seq = U.clone(seq);
				new_seq.push(char);

				recursive(new_ansc_seq, new_seq); // recursive
			}
	}
	recursive(seq, []);

	let POSSIBLES = SEQ.map(seq => seq.join(''));
	return POSSIBLES;
}


// slowest n factorial //
function nPr_UNQ(str)
{
	let seq = str.split('');

	let SEQ = [];
	function recursive(ansc_seq, seq)
	{
		if(ansc_seq.length == 0) // success return
		{
			if( SEQ.findIndex(_seq => _seq.join('') == seq.join('')) == -1 )
				SEQ.push(seq); 
		}
		else
			for(let i0 = 0 ; i0 < ansc_seq.length; i0 += 1)
			{
				let new_ansc_seq = U.clone(ansc_seq);
				let char = new_ansc_seq[i0];
				new_ansc_seq.splice(i0, 1);

				let new_seq = U.clone(seq);
				new_seq.push(char);

				recursive(new_ansc_seq, new_seq); // recursive
			}
	}
	recursive(seq, []);

	let POSSIBLES = SEQ.map(seq => seq.join(''));
	return POSSIBLES;
}


let STR = [];
function Gather()
{
	//// parse IN to STORE >> ////
	STR = IN.split('\n');
	//// << parse IN to STORE ////
}


function Generate_IN(seed, lines_count = 1000)
{
	let AVAIL = "abcdefghijklmnopq.#@";

	U.seed = seed;
	IN = "";

	for(let i0 = 0; i0 < lines_count; i0 += 1)
	{
		let CHARS =
		[
			AVAIL[U.gnpr_minMax(0, AVAIL.length - 1)],
			'',
		];	

		CHARS[1] = CHARS[0];
		while(CHARS[1] == CHARS[0])
			CHARS[1] = AVAIL[U.gnpr_minMax(0, AVAIL.length - 1)];

		// keep n C r complexity in mind //
		let seq = [];
		let count = U.gnpr_minMax(5, 10);
		for(let i0 = 0; i0 < count; i0 += 1) seq.push(0);

		seq[0] = 1;
		for(let i0 = 1; i0 < count; i0 += 1)
			if(U.gnpr_minMax(0, 100) < 50)
				seq[i0] = 1;

		let str = "";
		for(let val of seq)
			str += CHARS[val].toLowerCase();

		IN += `${str}`;
		if(i0 != lines_count - 1)
			IN += '\n';
	}
}


U.title("nPr");
_A();