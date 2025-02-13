/*
	start: 17:28
	found: 17:59
*/

function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cREPORT:", U.css.h() , REPORT);

	Logic();

	// sum>>
	let sum = 0;
	for(let report of REPORT)
		if(report.safe)
			sum += 1;
	console.log(`sum(safe report): `, sum);
	U.save_return("Day-2 part-2", sum);
	// << sum

}

// >> 80ms
function Logic()
{
	let validate_report = function(report, exclude_index = 0)
	{
		let VAL = [];
		// exclude
		report.VAL.forEach((val, i) => {
			if(i != exclude_index)
				VAL.push(val);
		});

		let incr_count = 0;
		let decr_count = 0;
		let safe = true;

		for(let i0 = 0 ; i0 <= VAL.length - 2; i0 += 1)
		{
			let step = VAL[i0 + 1] - VAL[i0];
			// step range
			safe = (Math.abs(step) >= 1 && Math.abs(step) <= 3);
			if(safe == false)
				break;

			if(step > 0) incr_count += 1;
			if(step < 0) decr_count += 1;
		}

		// either all decreasing or all increasing
		if(incr_count > 0 && decr_count > 0)
			safe = false;

		return safe;
	}

	for(let report of REPORT)
		for(let i0 = 0; i0 <= report.VAL.length - 1; i0 += 1)
		{
			report.safe = validate_report(report, exclude_index = i0);
			if(report.safe)
				break; 
		}
}

let REPORT = []; // { VAL: [], safe: }
function Gather()
{
	//// parse IN to STORE >> ////
	REPORT = IN.split('\n').map(line => {
		return  {
			VAL: line.split(' ').map(char => parseInt(char)),
			safe: true,
		};
	});
	//// << parse IN to STORE ////
}

U.title("red-nosed-reports");
_A();