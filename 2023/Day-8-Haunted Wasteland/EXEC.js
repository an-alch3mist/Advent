/*
	start: 15:10
	part-1: found: 15:20
	part-2: found: 16:20
*/
function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cINSTR:", U.css.h() ,INSTR);
	console.log("%cNODE:", U.css.h() , NODE);

	Logic();
	// study
		// console.log("11Z".endsWith('Z') == false)

	// check >>
		// let lcm = get_lcm([2, 3, 15])
		// console.log(lcm);
}

// >> 21ms
function Logic()
{

	let CURR = [];
	for(let node of NODE)
		if(node.id.endsWith("A"))
		{
			CURR.push(node);
		}
	console.log("%cCURR:", U.css.h(), U.clone(CURR));


	let REACH = CURR.map(() => { return { id: "XXXA", iter: -1 }; });
	let iter = 0n;
	while(true)
	{
		let all_REACH = true;
		for(let dir of INSTR)
		{
			iter += 1n;
			for(let i0 = 0; i0 < CURR.length; i0 += 1)
			{
				let node = CURR[i0];
				if(dir == 'R') CURR[i0] = node.right;
				if(dir == 'L') CURR[i0] = node.left;
			}

			// TODO: exist when all node have reached "XXXZ" at some point(got iter)

			all_REACH = true;
			for(let node of CURR)
			{
				if(node.id.endsWith('Z') == false)
					all_REACH = false;
				else
					if(REACH[CURR.indexOf(node)].iter == -1)
						REACH[CURR.indexOf(node)] = { id: node.id, iter: iter};
			}
			if(all_REACH == true)
				break;
			// console.log(U.clone(CURR), all_REACH);
		}

		if(ITER.iter_inc(10**2))
			break;

		if(all_REACH)
			break;
	}
	console.log("%cREACH Z @:", U.css.h(), U.clone(REACH));
	console.log(`total num of INSTR iter took: ${iter}`);

	let VAL = REACH.map(reach => reach.iter);
	console.log(`lcm of all first reach to Z: %c${get_lcm(VAL)}`, U.css.h2g());
	U.save_return("Day-8 part-2", `${get_lcm(VAL)/(10n**12n)}T`);
}


function get_lcm(VAL)
{
	// gcd
	let gcd = (a, b) => 
	{
		a = BigInt(a);
		b = BigInt(b);

		while(true)
		{
			let reminder = a % b;
			a = b;
			b = reminder;
			if(reminder == 0n)
				break;
		}
		return a; // return BigInt
	}

	// lcm(a, b) * gcd(a, b) = a * b
	let lcm = (a, b) => (BigInt(a) * BigInt(b))/ gcd(a, b); // return BigInt

	let curr_lcm = lcm(VAL[0], VAL[1]);
	for(let i0 = 1; i0 <= VAL.length - 1; i0 += 1)
		curr_lcm = lcm(curr_lcm, VAL[i0])

	return curr_lcm;
}

let NODE;
let INSTR;

function Gather()
{
	//// parse IN to STORE >> ////
	INSTR = IN.split("\n\n")[0].split('');

	NODE = [];

	IN.split("\n\n")[1].split('\n').forEach(line => {
		let node_a_id = line.split(" = ")[0];
		let node_b_id = line.split(" = (")[1].split(', ')[0];
		let node_c_id = line.split(" = (")[1].split(', ')[1].split(')')[0];

		if(NODE.find(node => node.id == node_a_id) == null)
			NODE.push({ id: node_a_id, right: {}, left: {} });
		if(NODE.find(node => node.id == node_b_id) == null)
			NODE.push({ id: node_b_id, right: {}, left: {} });
		if(NODE.find(node => node.id == node_c_id) == null)
			NODE.push({ id: node_c_id, right: {}, left: {} });
	});

	// neighbour
	IN.split("\n\n")[1].split('\n').forEach(line => {
		let node_a_id = line.split(" = ")[0];
		let node_b_id = line.split(" = (")[1].split(', ')[0];
		let node_c_id = line.split(" = (")[1].split(', ')[1].split(')')[0];

		let node_a = NODE.find(node => node.id == node_a_id);
		let node_b = NODE.find(node => node.id == node_b_id);
		let node_c = NODE.find(node => node.id == node_c_id);

		node_a.left = node_b;
		node_a.right = node_c;
	});
	//// << parse IN to STORE ////
}

U.title("Haunted WasteLand");
_A();