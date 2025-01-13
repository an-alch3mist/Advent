function _A()
{
	console.log("somthng");

	let pattern = /(don\'t\(\))|(do\(\))|(mul\((-)?[\d]{1,3}\,(-)?[\d]{1,3}\))/g;
	let str = "mul(2,3) mul(-1,3)";

	console.log(`pattern[Symbol.matchAll]:`, pattern_matching_all(pattern , IN));

	let sum = 0;
	let _do = true;

	pattern_matching_all(pattern , IN).forEach( exp => {
		let statement = exp[0].split('(')[0];
		if(statement == "do") _do = true;
		if(statement == "don't") _do = false;

		if(statement == "mul" && _do)
		{
			let vals = 
			[
				parseInt(exp[0].split(',')[0].split('(')[1]),
				parseInt(exp[0].split(',')[1].split(')')[0]),
			];		
			sum += vals[0] * vals[1];
		}
	});

	console.log(`sum: ${sum}`);
	U.save_code(`sum = ${sum}`, /[mul0-9]/)
}

function pattern_matching_all(pattern , str)
{
	return Array.from(pattern[Symbol.matchAll](str));
}


U.title("mul-it-over");
U.query("textarea").select();


// IN got ${ series within it, got to fetch IN external(either req or inp)//
U.query(".btn").onclick = function()
{
	IN = U.query("textarea").value;
	_A();
}
