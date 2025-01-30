/*
	start: 00:40
	found: 02:40
*/
function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[\,]/);

	Gather();
	console.log("%cWIRE:", U.css.h() , WIRE);

	Logic();

	// sum>>
	let get_dist_part_1 = (inter) => Math.abs(inter.p[0]) + Math.abs(inter.p[1]); // manhattan dist
	let get_dist_part_2 = (inter) => // dist along the wire
	{
		let sum_a = 0;
		for(let i0 = 0; i0 < inter.seg_a_i; i0 += 1)
			sum_a += WIRE[0][i0].dist;
		sum_a += Math.round(inter.La * WIRE[0][inter.seg_a_i].dist);

		let sum_b = 0;
		for(let i0 = 0; i0 < inter.seg_b_i; i0 += 1)
			sum_b += WIRE[1][i0].dist;
		sum_b += Math.round(inter.Lb * WIRE[1][inter.seg_b_i].dist);

		return sum_a + sum_b;
	};

	// [min] a < b, return a - b;
	let min_intersect = INTERSECT.minMax((a, b) => { return get_dist_part_2(a) - get_dist_part_1(b); });
	console.log(`min intersection dist: %c${get_dist_part_2(min_intersect)}`, U.css.h2g());

	U.save_return("Day-3 part-2", get_dist_part_2(min_intersect));
	// << sum
}


let INTERSECT = [];
function Logic()
{
	let origin =  [0, 0];
	let POS = WIRE.map(() => U.clone(origin));

	INTERSECT = [];
	// segment a
	for(let i0 = 0; i0 < WIRE[0].length; i0 += 1)
	{	
		let seg_a = WIRE[0][i0];
		let a = POS[0];
		let na = v2.mul(v2.DIR[seg_a.dir], seg_a.dist);

		// reset
		POS[1] = U.clone(origin);
		// segment b >>
		for(let i1 = 0; i1 < WIRE[1].length; i1 += 1)
		{
			let seg_b = WIRE[1][i1];
			let b = POS[1];
			let nb = v2.mul(v2.DIR[seg_b.dir], seg_b.dist);
			let intersect = get_intersect_2D(
				a = a,
				na = na,
				b = b,
				nb = nb,
			);

			// check for intersection
			if(intersect.occur == true)
				INTERSECT.push({ 
					p : intersect.p,
					La: intersect.La, seg_a_i: i0, 
					Lb: intersect.Lb, seg_b_i: i1 });

			POS[1] = v2.add(POS[1], nb);
		}
		// << segment b

		POS[0] = v2.add(POS[0], na);
	}
	console.log("%cINTERSECT:", U.css.h() , INTERSECT);

	// check >> checked
	// console.log(get_intersect_2D([0, 0], [0, 1], [1, 0], [-2, 2]));
}


// vector approach @(L > 0 && L < 1) //
function get_intersect_2D(a, na, b, nb)
{
	// intertsection just calculated over any 2D plane, apply for 3D too
	if(v2.area(na, nb) == 0)
		return v2.none;

	let numer_a = v2.area(b, nb)- v2.area(a, nb);
	let denom_a = v2.area(na, nb);
	let La =  numer_a / denom_a;

	let numer_b = v2.area(a, na)- v2.area(b, na);
	let denom_b = v2.area(nb, na);
	let Lb =  numer_b / denom_b;

	// to intersect La >= 0 && La <= 1f
	let p = v2.add(a , v2.mul(na, La));
	return { 
		p: p, 
		occur: La > 0 && La < 1 && Lb > 0 && Lb < 1,
		La: La,
		Lb: Lb,
	}; 
}


let WIRE;
function Gather()
{
	//// parse IN to STORE >> ////
	// 2D board
	let dir = "RDLU";

	WIRE = IN.split('\n').map(line => {
		return line.split(',').map(word => {
			return { dir: dir.indexOf(word[0]), dist: parseInt(word.substring(1)) }
		});
	});
	//// << parse IN to STORE ////
}

U.title("Crossed-Wires");
_A();