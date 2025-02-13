function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[]/);

	Gather();
	console.log("%cMIRROR:", U.css.h() , MIRROR);

	Logic();

	// sum>>

	// << sum
}


function Logic()
{
	let sum = 0;
	for(let B of MIRROR)
	{
		let vertical_axis = get_vertical_axis(B);
		let horizontal_axis = get_horizontal_axis(B);
		console.log(B , vertical_axis, horizontal_axis);

		sum += vertical_axis + 100 * horizontal_axis;
	}
	console.log(`sum (vertical_axis pos + 100 * horizontal_axis pos) for each mirror: %c${sum}`, U.css.h2g())
	U.save_return("Day-13 part-2", sum)
}



function get_vertical_axis(B) // checked
{
	let w = B[0].length; let h = B.length;
	let v_axis_count = 0;

	for(let x = 0; x <= w - 2; x += 1)
	{
		let left_start = x;
		let right_start = x + 1;

		let limit = left_start + 1;
		if((w - (left_start + 1)) < limit)
			limit = w - (left_start + 1);

		let non_match_count = 0;
		for(let i0 = 0; i0 < limit; i0 += 1)
			for(let y = 0; y < h; y += 1)
				if(B.GT([left_start - i0, y]) != B.GT([right_start + i0, y]))
					non_match_count += 1;

		if(non_match_count == 1) 
			v_axis_count += (x + 1);
	}

	return v_axis_count;
}

function get_horizontal_axis(B) // checked
{
	let w = B[0].length; let h = B.length;
	let h_axis_count = 0;

	for(let y = 0; y <= h - 2; y += 1)
	{
		let top_start = y;
		let bottom_start = y + 1;

		let limit = top_start + 1;
		if((h - (top_start + 1)) < limit)
			limit = h - (top_start + 1);

		let non_match_count = 0;
		for(let i0 = 0; i0 < limit; i0 += 1)
			for(let x = 0; x < w; x += 1)
				if(B.GT([x, top_start - i0]) != B.GT([x, bottom_start + i0]))
					non_match_count += 1;

		if(non_match_count == 1)
			h_axis_count += (y + 1);
	}

	return h_axis_count;
}



let MIRROR;
function Gather()
{
	//// parse IN to STORE >> ////
	MIRROR = IN.split("\n\n").map(section => {
		return section.split('\n').map(line => {
			return line.split('').map(char => char);
		})
	});

	//// << parse IN to STORE ////
}

// U.title("somthng");
_A();