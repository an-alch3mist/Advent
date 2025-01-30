function _A()
{
	console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cB:", U.css.h() , B, start, end, w, h);

	Logic();

	// sum>>

	// << sum
}


function Logic()
{
	
}

// DOC_COUNT accumulate approach
function recursive(level)
{
	// success return
	if(level == max)
		return 1;

	// loop thorugh all and call recursive or accumulate to count
	let count = 0;
	for(;;)
		count += recursive();

	return count;
}


let B = [];
let start; let end;
let w; let h;

function Gather()
{
	//// parse IN to STORE >> ////
	// 2D board
	B = IN.split('\n').map((line, y) => {
		return line.split('').map((char, x) => {
			if(char == 'S') start = 'S';
			if(char == 'E') end = 'E';

			if(char == '#')
				return 1;
			else
				return 0;
		});
	})

	w = B[0].length;
	h = B.length;
	//// << parse IN to STORE ////
}

// U.title("somthng");
_A();