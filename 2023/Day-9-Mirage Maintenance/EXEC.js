/*
	start: 21:07
	found: 21:31
*/
function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cREPORT:", U.css.h() , REPORT);

	Logic();

	// sum>>

	// << sum
}


function Logic()
{
	// propagate([11, 29, 72, 164, 352, 714, 1373, 2533, 4568, 8213, 14933, 27596, 51675, 97408, 183787, 346236, 652053, 1232555, 2351257, 4548991, 8950416]);
	// return

	let sum = 0;
	for(let report of REPORT)
		sum += propagate(report).first;

	console.log(`sum of first val @REPORT[0]: ${sum}`);
	U.save_return("Day-9 part-2", sum);
}

function propagate(report)
{
	let LAST = [];
	let FIRST = [];

	let seq = report;
	while(true)
	{
		if(ITER.iter_inc(10**5))
			break;
	
		LAST.push({ prev: seq.gl(0), curr: -1});
		FIRST.push({ next: seq[0], curr: -1});

		let new_seq = [];
		for(let i0 = 1; i0 <= seq.length - 1; i0 += 1)
			new_seq.push(seq[i0] - seq[i0 - 1]);

		let all_zero = true;
		for(let val of new_seq)
			if(val != 0)
			{
				all_zero = false;
				break;
			}

		seq = new_seq;
		// console.log(U.clone(seq));

		if(all_zero == true)
		{
			LAST.push({ prev: seq.gl(0), curr: 0});
			FIRST.push({ next: seq[0], curr: 0});
			break;
		}
	}

	console.log(LAST, FIRST);
	for(let i0 = LAST.length - 2; i0 >= 0; i0 -= 1)
	{
		let delta_last = LAST[i0 + 1].curr;
		LAST[i0].curr =  LAST[i0].prev + delta_last;

		let delta_first = FIRST[i0 + 1].curr;
		FIRST[i0].curr = FIRST[i0].next  - delta_first;
	}

	return  { first: FIRST[0].curr, last: LAST[0].curr };
}

let REPORT;
function Gather()
{
	//// parse IN to STORE >> ////
	REPORT = IN.split('\n').map(line => {
		return line.split(' ').map(str => parseInt(str));
	});
	//// << parse IN to STORE ////
}

// U.title("somthng");
_A();