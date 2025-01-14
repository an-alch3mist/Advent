function _A()
{
	console.log("somthng");
	U.save_code(IN, /[A-Za-z0-9]/);

	Gather();
	console.log("%cANTENNA:", U.css.h() , ANTENNA, `w: ${w}, h: ${h}`);


	let in_range = function(pos)
	{ 
		let [x, y] = pos;
		return x >= 0 && x < w && y >= 0 && y < h; 
	}

	let B = IN.split('\n').map(line => line.split('').map(() => {return {val: -1}}));
	console.log("%cB-antinodes:", U.css.h() , B);


	for(let i0 = 0 ; i0 <= ANTENNA.length - 2; i0 += 1)
		for(let i1 = i0 + 1; i1 <= ANTENNA.length - 1; i1 += 1)
		{
			let antenna_a = ANTENNA[i0];
			let antenna_b = ANTENNA[i1];
			if(antenna_a.freq == antenna_b.freq)
			{
				// n = a - b
				let n = v2.diff(antenna_a.pos, antenna_b.pos);
				let antinode_a = antenna_a.pos;
			
				// a + n
				while(in_range(antinode_a))
				{
					if(B.GT(antinode_a).val == -1)
						B.ST(antinode_a, {val: 0, data: [i0, i1]});
					antinode_a = v2.add(antinode_a, n);
				}

				n = [-n[0], -n[1]];
				let antinode_b = antenna_b.pos;
				//
				// b - n
				while(in_range(antinode_b))
				{
					if(B.GT(antinode_b).val == -1)
						B.ST(antinode_b, {val: 0, data: [i0, i1]});
					antinode_b = v2.add(antinode_b, n);
				}
			}
		}


	let sum = 0;
	B.forEach((row, y) => {
		row.forEach((val, x) => {
			if(val.val != -1) 
				sum += 1;
		})
	})


	console.log(`sum: ${sum}`);
	U.save_return("Day-8 part-2", sum);

	/*
		dx, dy: between two antenna of same freq
		do not have common factor integer.

		if that were'nt the case => reduce dx / dy until no common factor
	*/
}


let ANTENNA = []
let w = 0; let h = 0;

function Gather()
{
	w = IN.split('\n')[0].length;
	h = IN.split('\n').length;

	//// parse IN to STORE >> ////
	IN.split('\n').forEach((line , y) => {
		line.split('').forEach((char, x) => {
			if(char != '.')
			{
				let antenna = { freq : char,  pos: [x, y] }
				ANTENNA.push(antenna);
			}
		});
	})

	//// << parse IN to STORE ////
}

U.title("Antenna");
_A();