
function _A()
{
	console.log("somthng");
	U.save_code("code");

	U.save_code(
`#....
#.##.
#.##.
#<l>O</l>##.
###..`
);

	let pattern = /don\'t|do|(v2\(\-?\d{1,3}[ ,]+\-?\d{1,3}\))/gi;
	// let pattern = /v2\([a-z][\, ][a-z]\)/g;

	pattern_matching( pattern , "do do Don't#somev2(1,2)..a.V2(1 124)" );


	console.log(v2.DIRS);
	console.log(v2);
	console.log(U);


	let W = [];
	for(let i0 = 0 ; i0 < 100; i0 += 1)
	{
		let w = { val: Math.floor(Math.random() * 1000000), h: Math.random()};
		W.push(w);
	}
	console.log(W);


	let findIndex = W.findIndex(el => el.val % 10 <= 2 );

	// a: next , b: minMax
	let min = W.minMax((a, b) => (a.val - b.val));

	console.log(findIndex , min);

	// min , max //



	let B = 
	[
		[0, 1, 2, 3],
		[4, 5, 6, [0, 1, 2, 3]],
		[8, 9, 10, 11],
		[12, 13, 14, 15],
	];

	console.log(B.GT([1, 3, 2]));
}



function pattern_matching(pattern , str)
{
	/*
	re flags:
		g: global
		i: ignore case

	// re syntax => 
		/re-goes-here/re-flags

		| : or groups
		(): a group
		\- \( \, \. \' \" \@ etc : special characters
		? : optional
		.: any char
		\d or [0-9] : a single digit number
		[a-z] : alphabets
	// <= re syntax 

	pattern: /v2\([a-z][\,][a-z]\)/gi
	str: "#somev2(a,b)....v2(a b)"

	output
		 0: ['v2(a,b)', index: 5 , input: '#somev2(a,b)....v2(a b)', groups: undefined]
		 1: ['v2(a b)', index: 16, input: '#somev2(a,b)....v2(a b)', groups: undefined]
	*/
	console.log(Array.from(pattern[Symbol.matchAll](str)));
}


async function async_function()
{
	await U.delay(500);
	console.log("somthng after 500ms");
	await U.delay(2000);
	console.log("somthng after 2sec");
}


U.title("util-check");
_A();
// async_function();
