function _A()
{
	Gather();
	U.save_code(IN, /[X]/);

				//   E 			NE 			N 			NW 		  W 		 SW 		S 		 	SE
	v2.DIRS = [ [+1 ,  0], [+1 , +1], [ 0 , +1], [-1 , +1], [-1 ,  0], [-1 , -1], [ 0 , -1], [+1 , -1], ];
	
	for(let y = 0 ; y < h; y += 1)
	for(let x = 0 ; x < w; x += 1)
		if(B.GT([x, y]) == word[0])
			v2.DIRS.forEach(dir => {
				recursive(U.clone(word[0]) , pos= [x, y] , dir= dir)
			});

	console.log(DOC , `part-1 count: ${DOC.length}`);
	U.save_return("Day-4 part-1", DOC.length);

}


let DOC = [];
function recursive(seq , pos , dir)
{
	if(seq.length == word.length)
		if(seq == word)
		{
			DOC.push({seq: seq, pos: pos , dir: dir});
			return;
		}

	let [X, Y] = v2.add(pos , dir);
	if(X >= 0 && X < w && Y >= 0 && Y < h)
		recursive(U.clone(seq) + B.GT([X, Y]) , [X, Y] , dir);
}


function _B()
{
	Gather();
	U.save_code(IN, /[A]/);

	let DOC = [];
	for(let y = 1; y <= h - 2; y += 1)
	for(let x = 1; x <= w - 2; x += 1)
		if(B.GT([x, y]) == 'A')
		{
			let diag_0 = B.GT([x - 1, y - 1]) + B.GT([x + 1, y + 1]);	
			let diag_1 = B.GT([x + 1, y - 1]) + B.GT([x - 1, y + 1]);

			if( (diag_0 == "MS" || diag_0 == "SM")	&&
				(diag_1 == "MS" || diag_1 == "SM") )
				DOC.push([x, y]);
		}
	//
	console.log(DOC , `part-2 count: ${DOC.length}`);
	U.save_return("Day-4 part-2", DOC.length);
}


let B = [];
let word = "XMAS";
let w; let h;

function Gather()
{
	B = IN.split('\n');
	w = B[0].length;
	h = B.length;
}

U.title("xmas");
_A();
_B();