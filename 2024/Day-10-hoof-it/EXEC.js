function _A()
{
	console.log("somthng");
	U.save_code(IN, /[0]/);

	Gather();
	console.log("%cB:", U.css.h() , B, w, h);
	console.log("%cHEADS:", U.css.h() , HEADS);


	for(let head of HEADS)
	{
		recursive(head.pos, B, head);
	}

	let sum = 0;
	let sum_str = "";
	for(let head of HEADS) 
	{
		sum_str += `${head.TAILS.length}, `;
		sum += head.TAILS.length;
	}
	// console.log(`sum(reachable unique tails count from each head): ${sum}`);
	console.log(`sum(reachable tails count from each head): ${sum}`);
	U.save_return("Day-10 part-2", sum);
}


function recursive(curr, B, head)
{
	/*
	(curr), shall be head(h = 0) pos at the begining
		propagate further if found any +1 h across neighbours

	if B.GT(curr) == 9 // success
		if tail doesnt already exist in head.TAIL
			head.TAIL.push(tail);
			stop
	*/
	// success
	if(B.GT(curr) == 9)
		// if(head.TAILS.findIndex(tail => v2.eql(tail, curr)) == -1) // >> part - 1
		if(true) // >> part - 2
		{
			head.TAILS.push(curr);
			return;
		}

	// dir
	for(let dir of v2.DIR)
	{
		let [x, y] = v2.add(curr, dir);
		// in-range
		if(x >= 0 && x < w && y >= 0 && y < h)
			if(B.GT([x, y]) - B.GT(curr) == +1)
				// recursive
				recursive([x, y], B, head);
	}
}


let B = [];
let w; let h;
let HEADS = [];

function Gather()
{
	//// parse IN to STORE >> ////
	
	B = IN.split('\n').map((line, y) => {
		return line.split('').map( (char, x) => {

			if(char == '0')
				HEADS.push({ pos: [x, y], TAILS: []});

			if(/[0-9]/.test(char))  return parseInt(char);
			else  					return -1;
		});
	})

	w = B[0].length;
	h = B.length;

	//// << parse IN to STORE ////
}

U.title("hoof-it");
_A();