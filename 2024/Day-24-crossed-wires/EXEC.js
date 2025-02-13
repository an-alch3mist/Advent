/*
	start: 23:32
	found: (00:13), ?
*/
function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cWIRE:", U.css.h() , WIRE, Z_WIRE);
	console.log("%cLOGIC_GATE:", U.css.h() , LOGIC_GATE);

	// study
	// console.log('z' + ((1).toString().padStart(2, '0')));


	Logic();
	// sum>>

	// << sum
}


function Logic()
{

	let x_sum = 0n;
	let x_bits = "";
	for(let i0 = 0; i0 < WIRE.length; i0 += 1)
		if(WIRE[i0].id[0] == 'x')
		{
			x_sum += (1n << BigInt(WIRE[i0].id.substring(1))) * BigInt(WIRE[i0].state);
			x_bits = BigInt(WIRE[i0].state).toString() + x_bits;
		}
	console.log(x_sum);

	let y_sum = 0n;
	let y_bits = "";
	for(let i0 = 0; i0 < WIRE.length; i0 += 1)
		if(WIRE[i0].id[0] == 'y')
		{
			y_sum += (1n << BigInt(WIRE[i0].id.substring(1))) * BigInt(WIRE[i0].state);
			y_bits = BigInt(WIRE[i0].state).toString() + y_bits;
		}
	console.log(y_sum);

	console.log(x_sum + y_sum);


	//part-1
		propagate(LOGIC_GATE);

		let sum = 0n;
		let z_bits  = "";
		for(let i0 = 0; i0 < Z_WIRE.length; i0 += 1)
		{
			sum += (1n << BigInt(i0)) * BigInt(Z_WIRE[i0].state);
			z_bits = BigInt(Z_WIRE[i0].state).toString() + z_bits;
		}
		console.log(`sum(from z wire): %c${sum}`, U.css.h2g());

	console.log(x_bits);
	console.log(y_bits);
	console.log(z_bits);

	for(let i0 = 1; i0 <= Z_WIRE.length - 2; i0 += 1)
	{
		let x_n = 'x' + Z_WIRE[i0].id.substring(1);
		let y_n = 'y' + Z_WIRE[i0].id.substring(1);
		let z_n = 'z' + Z_WIRE[i0].id.substring(1);
		// console.log(i0);
		console.log(`%c${x_n}, ${y_n}, ${z_n}: `, U.css.h2r());
		a_complete_ADDER(x_n, y_n, z_n, LOGIC_GATE)
	}


	let crossed_wires = 
	[
		"z09", "hnd", // @z09
		"z23", "bks",  // @z23
		"nrn", "tjp",  // @z37
		"z16", "tdv"	// @z16
	];
	/*
	before tried: (without output -> analysis)
	[
		"hnd", "z09", // with // @z09
		"bks", "z23", // with // @z23
		"ghr", "z37", // with // @z37
		"nrn", "kpb", // with // @z37
	];

	*/

	// [sort] a: next, b: curr, return a.localeCompare(b);
	crossed_wires.sort((a, b) => a.localeCompare(b));
	console.log(`crossed_wires: %c${crossed_wires.join(',')}`, U.css.h2g());
	U.save_return("Day-24 part-2", crossed_wires.join(','));
}
/*
	Because gates wait for input, some wires need to 
	start with a value (as inputs to the entire system)
*/
function propagate(LOGIC_GATE)
{
	let get_logic = (gate) => 
	{
		if(gate.oper == "XOR") return gate.a.state ^ gate.b.state;
		if(gate.oper == "AND") return gate.a.state & gate.b.state;
		if(gate.oper == "OR")  return gate.a.state | gate.b.state;

		return -1;
	}

	while(true)
	{
		if(U.iter_inc(10000))
			break;

		let all_explored = true;

		for(let gate of LOGIC_GATE)
		{
			if(gate.a.state != -1 && gate.b.state != -1)
				gate.c.state = get_logic(gate)
			else
				all_explored = false;
		}

		if(all_explored == true)
			break;
	}
}



// TODO in future
// get all gate equations(2_XOR, 2_AND, 1_OR) involved at level (n)




// is added complete? approach
// the output wires are swapped from equaltions => 
// left end of wire is pulled out and swapped to another 
// left end wire gate output
function a_complete_ADDER(x_id, y_id, z_id, LOGIC_GATE)
{

	let get_rhs = (a, b, oper) =>
	{
		for(let gate of LOGIC_GATE)
			if(gate.oper == oper)
			if((gate.a.id == a && gate.b.id == b)||(gate.b.id == a && gate.a.id == b))
				return gate.c.id;

		return "none";
	}

	let get_rhs_1 = (a, oper) =>
	{
		for(let gate of LOGIC_GATE)
			if(gate.oper == oper)
			if(gate.a.id == a || gate.b.id == a)
				return gate.c.id;

		return "none";
	}

	let get_lhs = (a, oper) =>
	{
		for(let gate of LOGIC_GATE)
			if(gate.oper == oper)
			{
				if(gate.a.id == a) return gate.b.id;
				if(gate.b.id == a) return gate.a.id;
			}

		return "none";
	}

	// checked >>
	// console.log(get_rhs("x40", "y40", "AND"));
	// console.log(get_lhs("y40", "AND"));
	let id = parseInt(x_id.substring(1, x_id.length));
	let id_prev = (id - 1).toString().padStart(2, '0');

	// forward
	let xn = x_id;
	let yn = y_id;
	
	let xn_xor_yn = get_rhs(x_id, y_id, "XOR");
	let xn_and_yn = get_rhs(x_id, y_id, "AND");

	// back
	let carry_n_prev = get_lhs(xn_xor_yn, "XOR");
	let zn = get_rhs(xn_xor_yn, carry_n_prev, "XOR");

	let carry_n_prev_and_xn_xor_yn = get_rhs(carry_n_prev, xn_xor_yn, "AND"); 
	let carry_n = get_rhs(carry_n_prev_and_xn_xor_yn, xn_and_yn, "OR");


	// backward
	let xn_xor_yn_back = get_lhs(carry_n_prev , "AND");
	let xn_and_yn_back = get_lhs(carry_n_prev_and_xn_xor_yn , "OR");
	let carry_n_prev_and_xn_xor_yn_back = get_lhs(xn_and_yn, "OR"); 
	
	let xn_and_yn_prev_id = get_rhs('x' + id_prev, 'y' + id_prev, "AND");
	let carry_n_prev_front = get_rhs_1(xn_and_yn_prev_id, "OR");
	let zn_back = z_id;


	let FORWRAD = 
	[
		x_id,	// terminal a
		y_id,   // terminal a
		xn_xor_yn,
		xn_and_yn,
		carry_n_prev_front,
		zn,		// terminal b
		carry_n_prev_and_xn_xor_yn,
		carry_n,
	];

	let BACKWARD = 
	[
		x_id,	// terminal a
		y_id,	// terminal a
		xn_xor_yn_back,
		xn_and_yn_back,
		carry_n_prev,
		zn_back,	// terminal b
		carry_n_prev_and_xn_xor_yn_back,
		carry_n,
	];

	let STR = 
	[
		["xn", "xn"],
		["yn", "yn"],
		["xn_xor_yn_front", "_back"],
		["xn_and_yn_front", "_back"],
		["carry_n_prev_front", "_back"],
		["zn_front", "zn_back"],
		["carry_n_prev_and_xn_xor_yn_front", "_back"],
		["carry_n", "carry_n"],
	];


	for(let i0 = 0; i0 < FORWRAD.length; i0 += 1)
		if(FORWRAD[i0] != BACKWARD[i0] || FORWRAD[i0] == "none" || BACKWARD[i0] == "none")
		{
			let str = "";
			for(let i0 = 0; i0 < FORWRAD.length; i0 += 1)
			{
				str += `${FORWRAD[i0]}, ${BACKWARD[i0]}\t\t....${STR[i0][0] + "---" + STR[i0][1]}\n`;
			}
			console.log(str);
			break;
		}

	// # After this swap the output to resolve gates
	// # keep doing that one by one until no more gates are logged

}







let WIRE = [];
let LOGIC_GATE = [];
let Z_WIRE = [];

function Gather()
{
	//// parse IN to STORE >> ////

	// WIRE { id: , state:  } // state can be -1(not evaluated), 0, +1
	IN.split("\n\n")[1].split('\n').map(line => {
		let [ wire_a_id, logic_str , wire_b_id , ad, wire_id_out] = line.split(' ');
		if(WIRE.findIndex(wire => wire.id == wire_a_id) == -1)
			WIRE.push({ id: wire_a_id, state: -1 });

		if(WIRE.findIndex(wire => wire.id == wire_b_id) == -1)
			WIRE.push({ id: wire_b_id, state: -1 });

		if(WIRE.findIndex(wire => wire.id == wire_id_out) == -1)
			WIRE.push({ id: wire_id_out, state: -1 });
	});

	// [sort] a: next, b: curr, return a.id.localeCompare(b.id);
	WIRE.sort((a, b) => a.id.localeCompare(b.id));
	IN.split("\n\n")[0].split('\n').map(line => {
		let [wire_id, state] = line.split(": ");
		WIRE.find(wire => wire.id == wire_id).state = parseInt(state);
	});


	// LOGIC_GATE { a: , b: , c: , oper: }
	IN.split("\n\n")[1].split('\n').map(line => {
		let [ wire_a_id, logic_str , wire_b_id , ad, wire_c_id] = line.split(' ');
		
		// logic_gate
		let lg = 
		{ 
			oper: logic_str,  
			a: WIRE.find(wire => wire.id == wire_a_id),
			b: WIRE.find(wire => wire.id == wire_b_id),
			c: WIRE.find(wire => wire.id == wire_c_id),
		};
		LOGIC_GATE.push(lg);
	});

	// Z_WIRE
	for(let wire of WIRE)
		if(wire.id[0] == 'z')
			Z_WIRE.push(wire);
	//// << parse IN to STORE ////
}

U.title("crossed-wires");
_A();