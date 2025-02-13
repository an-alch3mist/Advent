function _A()
{
	U.save_code(IN, /[\^\#]/);
	Gather();
	console.log("%cB", U.css.h(), B);

	// part-1 //
	let PL = exec_gaurd_walk(B, start, up);
	console.log("%cPATROLS", U.css.h(), PL.PATROLS);

	let sum = 0;
	for(let y = 0 ; y < h; y += 1)
	for(let x = 0 ; x < w; x += 1)
		if(PL.PATROLS.GT([x, y]) != -1)
			sum += 1;

	console.log(`Day-6--part-1 patrols with a dir: ${sum}`);
	// part-1 //
	

	let OBS = [];
	// 7.8sec if patrol = { dir: int }, 1.3sec if patrol = int //
	for(let y = 0 ; y < h; y += 1)
	for(let x = 0 ; x < w; x += 1)
		if(PL.PATROLS.GT([x, y]) != -1)
		{
			let obs = [x, y];
			let PL_for_obs = exec_gaurd_walk(B, start , up, obs = obs);
			if(PL_for_obs.loop == true)
				OBS.push(obs);
		}

	console.log("%cOBS", U.css.h(), OBS);
	console.log(`Day-6--part-2 obstacles causing loop: ${OBS.length}`);
	U.save_return("Day-6 part-2", OBS.length);	
}

function exec_gaurd_walk(B, start, start_dir, obs = [])
{
	let curr = U.clone(start);
	let dir = U.clone(start_dir);

	let PATROLS = B.map(row => row.map(() => { return -1; }));
	PATROLS.ST(curr , val = dir);

	while(true)
	{
		let next = v2.add(curr , v2.DIR[dir]);
		let [x, y] = next;

		// out of bounds
		if( x < 0 || x > w - 1 || y < 0 || y > h - 1)
			break;

		// wall
		if(B.GT(next) == 1 || v2.eql(next, obs))
			dir = (dir + 1) % 4;

		// not-wall
		else
		{
			// loop-check //
			if(PATROLS.GT(next) == dir)
				return {
					PATROLS: PATROLS,
					loop: true,
				};

			// move
			PATROLS.ST(next , val = dir);
			curr = next;
		}
	} 

	return {
		PATROLS: PATROLS,
		loop: false,
	};
}

let B = []
let w; let h;

let start = [];
let up = 3;

function Gather()
{
	//// parse IN >> ////
	B = IN.split('\n').map((line, y) => {
		return line.split('').map((char, x) => {
			if(char == '^') start = [x, y];

			if(char == '#') return 1;
			else 			return 0;
		});
	})

	w = B[0].length; h = B.length;
	//// << parse IN ////
}

U.zoom("70%");
U.title("guard-gallivant");
_A();