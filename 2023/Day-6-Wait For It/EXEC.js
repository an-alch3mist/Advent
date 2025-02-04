/*
	start: 02:20
	found: 02:48

*/
function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[a-zA-Z\:]/);

	Gather();
	console.log("%cmax_time:", U.css.h() , max_time);
	console.log("%cmax_dist:", U.css.h() , max_dist);

	Logic();
	// sum>>

	// << sum
}


// >> 470ms
// >> 0.24ms
function Logic()
{
	// quadratic roots approach >>
	// y = max_dist
	// y = (max_max_time - x) * x;

	// x**2 - max_max_time * x + max_dist = 0
	// a = 1, b = -max_max_time, c = max_dist;

	console.max_time("quadratic");
	let roots = quadratic(1, -Number(max_time), Number(max_dist));
	console.log(`quadratic roots: ${roots}`);

	let start_int_val = Math.ceil(roots[0]);
	let end_int_val = Math.floor(roots[1]);
	console.max_timeEnd("quadratic");

	console.log(`int vals between start_int, end_int: %c${end_int_val - start_int_val + 1}`, U.css.h2g());
	U.save_return("Day-6 part-2", end_int_val - start_int_val + 1)
	// << quadratic root approach

	return;
}



// a*x**2 + b*x + c
function quadratic(a, b, c)
{
	let descriminant = Math.sqrt( b**2 - 4 * a * c); 
	descriminant = descriminant;

	return [ 
		(-b - descriminant) / (2 * a), 
		(-b + descriminant) / (2 * a) 
	];
}



let max_time;
let max_dist;

function Gather()
{
	//// parse IN to STORE >> ////
	max_time = "";
	IN.split('\n')[0].split(':')[1].split('').forEach(char => {
		if(/[0-9]/.test(char))
			max_time += char;
	});
	max_time = BigInt(max_time);


	max_dist= "";
	IN.split('\n')[1].split(':')[1].split('').forEach(char => {
		if(/[0-9]/.test(char))
			max_dist += char;
	});
	max_dist = BigInt(max_dist)
	//// << parse IN to STORE ////
}

// U.title("somthng");
_A();