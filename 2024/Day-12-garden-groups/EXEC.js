/*
	start: 00:41
	found, flood-fill over 2d, node based: 03:00 
*/

function _A()
{
	console.log("somthng");
	U.save_code(IN, /[X]/);

	/*
	RED BLUE Approach

	Gather();
	console.log("%cB:", U.css.h() , B, w, h);

	// each b: { char: , explored?: }
	// each region: { char: , POS: , EDGE: {a: , b: }  }
	let REGION = flood_fill__red_blue(B);
	console.log(REGION);
	*/

	Gather();
	console.log("%cB:", U.css.h() , B, w, h);
	// each b: { char: , explored?: }
	// each region: { char: , POS: , EDGE: {a: , b: }  }
	let REGION = flood_fill(B); // evaluate POS .... evaluate EDGE approach
	console.log("%cREGION:", U.css.h() , REGION);
	

	// a: next, b: curr, return a - b
	// REGION.sort((a, b) => { return -(a.POS.length - b.POS.length); });

	let sum = 0;
	for(let region of REGION)
	{
		let area = region.POS.length;
		let perimeter = region.EDGE.length;

		sum += area * perimeter;
	}
	console.log(`sum (area * perimeter-individual-edge): ${sum}`);


	// let SIDE = linked_edges_in_same_dir(REGION[0].EDGE);
	for(let region of REGION)
	{
		region.SIDE = linked_edges_in_same_dir(region.EDGE);
		// console.log(region.char , region.SIDE.length);
	}


	sum = 0;
	for(let region of REGION)
	{
		let area = region.POS.length;
		let perimeter = region.SIDE.length;

		sum += area * perimeter;
	}
	console.log(`sum (area * perimeter-individual-side): ${sum}`);
	U.save_return(`Day-12 part-2`, sum);

}



/*
	if .explored is assigned once came accross neighbour, edge shall be return twice(while in progress of fining all-explored)
	if .explored is assigned for every pos in POS that are not assigned, => this will fix the twice edge issue, but duplicates pos shall arise.	

	to resolve this
		either 
			RED BLUE Approach
			Evaluate just POS each region, later Evaluate EDGE for each region.
*/
// for 140 x 400: 320ms
// red blue approach

// flood fill for give (char[,]) or (L<char> , connection)

function flood_fill__red_blue(B)
{
	let get_x10_edge = (pos, dir) => 
	{ 
		let nX = [dir[0] * 0.5, dir[1] * 0.5];
		let nY = [-nX[1], +nX[0]];

		return  { 
			a: [(U.floor(pos[0] + nX[0] + nY[0]) * 10), U.floor((pos[1] + nX[1] + nY[1]) * 10)], 
			b: [(U.floor(pos[0] + nX[0] - nY[0]) * 10), U.floor((pos[1] + nX[1] - nY[1]) * 10)], 
		} 
	}

	let REGION = [];

	for(let y = 0; y < h; y += 1)
	for(let x = 0; x < w; x += 1)
	{
		if(B[y][x].explored == true)
			continue;

		let char = B[y][x].char;

		let BLUE = [];
		let RED = [];
		RED.push([x, y]);

		let EDGE = [];

		while(true)
		{
			// console.log(U.clone(RED), U.clone(BLUE));

			// all explored
			if(RED.length == 0)
				break;

			// red
			let red = RED[0];
			RED.splice(0, 1);

			// already explored
			if( BLUE.findIndex(blue => v2.eql(blue, red)) != -1)
				continue;

			// came across for the first time
			BLUE.push( red );
			B.GT(red).explored = true;

			// neighbours
			for(let dir of v2.DIRS)
			{
				let [X, Y] = v2.add(red, dir);

				// in bounds
				if(X >= 0 && X < w && Y >= 0 && Y < h)
				{
					// same region
					if(B[Y][X].char == char)
						RED.push([X, Y]);
					// different region
					else
						EDGE.push(get_x10_edge(red, dir));
				}

				// out of bounds
				else
					EDGE.push(get_x10_edge(red, dir));
			}

		}

		//
		REGION.push({ char: char, POS: BLUE, EDGE: EDGE });
	}


	return REGION;
}



// for 140 x 400: 220ms
// evaluate POS .... evaluate EDGE approach

// flood fill for give (char[,]) or (L<char> , connection)
function flood_fill(B)
{
	let REGION = [];

	// POS >>
	for(let y = 0; y < h; y += 1)
	for(let x = 0; x < w; x += 1)
	{
		if(B[y][x].explored == true)
			continue;

		let char = B[y][x].char;

		let POS = [];
		POS.push([x, y]);
		B[y][x].explored = true;

		while(true)
		{
			let all_explored = true

			for(let pos of POS)
			for(let dir of v2.DIRS)
			{
				let [X, Y] = v2.add(pos, dir);

				// in bounds
				if(X >= 0 && X < w && Y >= 0 && Y < h)
					if(B[Y][X].char == char && B[Y][X].explored == false)
					{
						POS.push([X, Y]);
						all_explored = false;
						// assinging explore for neighbours restricts creation of duplicates
						B[Y][X].explored = true;
					}
			}

			if(all_explored == true)
				break;
		}

		REGION.push({ char: char, POS: POS, EDGE: [], SIDE: []});
	}
	// << POS


	// EDGE >>
	for(let region of REGION)
	for(let pos of region.POS)
	for(let dir of v2.DIRS)
	{
		let [X, Y] = v2.add(pos, dir);

		// out of bounds
		if(X < 0 || X > w - 1 || Y < 0 || Y > h - 1)
			region.EDGE.push(get_x10_edge(pos, dir));

		// different region
		else if(B[Y][X].char != B.GT(pos).char)
			region.EDGE.push(get_x10_edge(pos, dir));
	}
	// << EDGE


	return REGION;
}


// to make EDGE to node based  //
let get_x10_edge = (pos, dir) => 
{ 
	let nX = [dir[0] * 0.5, dir[1] * 0.5];
	let nY = [-nX[1], +nX[0]];

	return  { 
		a: [((pos[0] + nX[0] + nY[0]) * 10), ((pos[1] + nX[1] + nY[1]) * 10)], 
		b: [((pos[0] + nX[0] - nY[0]) * 10), ((pos[1] + nX[1] - nY[1]) * 10)], 
		normal: dir, 
		index: -1,
	} 
}



// is this edge linked to chain(neighbour-edge) of [side] with same normal dir ?
// Node(id: a(v2), b(v2), normal(v2)) Based flood_fill_EDGE
function linked_edges_in_same_dir(EDGE) // or flood_fill_EDGE( char => edge.normal )
{
	// here char => edge.normal

	let get_neighbours = (edge, EDGE) =>
	{
		let NEIGHBOUR_EDGE = [];

		for(let _edge of EDGE)
		{
			if(edge == _edge) continue;

			// edge with random direction
			if(
				v2.eql(_edge.a , edge.a) || v2.eql(_edge.b , edge.a) ||
				v2.eql(_edge.a , edge.b) || v2.eql(_edge.b , edge.b)	
			)
				NEIGHBOUR_EDGE.push(_edge);
		}

		return NEIGHBOUR_EDGE;
	}
	
	for(let edge of EDGE)
		edge.index = EDGE.indexOf(edge);
	// console.log(EDGE);


	let SIDE = [];

	let EXPLORE = EDGE.map( (edge, i) => {
		return { edge: edge, explored: false }
	});	
	// console.log(U.clone(EXPLORE));

	// console.log(v2.area([+10, 1], [-10, -1]));

	// flood-fill node based //
	for(let i0 = 0; i0 < EDGE.length; i0 += 1)
	{
		if(EXPLORE[i0].explored == true)
			continue;

		let side = [];
		side.push(EDGE[i0]);
		EXPLORE[i0].explored = true;

		//
		while(true)
		{
			let all_explored = true;
			for(let edge of side)
			{
				let NEIGHBOUR_EDGE = get_neighbours(edge, EDGE);
				// console.log("neighbour: ", edge, NEIGHBOUR_EDGE);

				for(let neighbour_edge of NEIGHBOUR_EDGE)
				{
					// (v2.area(edge.normal, neighbour_edge.normal) == 0) // (mobius or intersection) issue
					/*
						use of .area instead of ,eql => mobius issue at case:

						AAAAAA
						AAABBA
						AAABBA
						ABBAAA
						ABBAAA
						AAAAAA

						side A: 10, // instead of 12
						side B: 4,	// top-right B region
						side B: 4,	// bottom-left B region
					*/
					if( v2.eql(edge.normal, neighbour_edge.normal)  && 
						EXPLORE[neighbour_edge.index].explored == false
					)
					{
						all_explored = false;
						//
						side.push(neighbour_edge);
						EXPLORE[neighbour_edge.index].explored = true;
					}
				}
				//
			}

			if(all_explored)
				break;
		}
		//

		SIDE.push(side);
	}

	// console.log(SIDE);
	return SIDE;
}

//


let B = [];
let w; let h;

function Gather()
{
	//// parse IN to STORE >> ////
	B = IN.split('\n').map(line => {
		return line.split('').map(char => {
			return { char: char, explored: false};
		})
	})

	w = B[0].length;
	h = B.length;
	//// << parse IN to STORE ////
}

// U.title("somthng");
_A();