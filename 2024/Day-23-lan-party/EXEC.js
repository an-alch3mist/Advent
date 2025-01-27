/*
	start: 21:38
	found: 22:24
*/
function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cNODE:", U.css.h() , NODE);
	console.log("%cEDGE:", U.css.h() , EDGE);

	Logic();
	// sum>>

	// << sum
}

// part-1: 2.5sec
// part-2: 2sec for 3380 EDGE.length
function Logic()
{
	let TRI = []; // { id: , a: , b: , c:  }

	for(let edge of EDGE)
	{
		let TRI_from_edge = get_common_TRI(edge);

		for(let tri of TRI_from_edge)
		{
			let tri_index = TRI.findIndex(_tri => _tri.id == tri.id);
			// not exist
			if(tri_index == -1)
				TRI.push(tri);
		}
	}

	// tri => a.TRI, b.TRI, c.TRI
	for(let tri of TRI)
	{
		tri.a.TRI.push(tri);
		tri.b.TRI.push(tri);
		tri.c.TRI.push(tri);
	}

	// [sort] (a, b), return a.id.localeCompare(b.id);
	TRI.sort((a, b) => a.id.localeCompare(b.id));
	console.log("%cTRI:", U.css.h(), TRI);

	/*	
	// just for part-1:
		let t_TRI = [];
		for(let tri of TRI)
		{
			if(tri.a.id[0] == 't') 
				t_TRI.push(tri);
			else if(tri.b.id[0] == 't')
				t_TRI.push(tri);
			else if(tri.c.id[0] == 't')
				t_TRI.push(tri);
		}
		console.log(t_TRI);
	*/

	// part-2: largest set of computers that are all connected to each other ?

	// 0. sort node based on thier TRI.length
	// [sort] a: next, b: curr, return a - b
	NODE.sort((a, b) => { return -(a.TRI.length - b.TRI.length) });
	let largest_network_interconnected_TRI = NODE[0].TRI;

	let LARGEST_NETWORK_NODE = [];
	// 1. LARGEST_NETWORK_NODE
		for(let tri of largest_network_interconnected_TRI)
		{
			if(!LARGEST_NETWORK_NODE.includes(tri.a))
				LARGEST_NETWORK_NODE.push(tri.a);
			if(!LARGEST_NETWORK_NODE.includes(tri.b))
				LARGEST_NETWORK_NODE.push(tri.b);
			if(!LARGEST_NETWORK_NODE.includes(tri.c))
				LARGEST_NETWORK_NODE.push(tri.c);
		}

		// [sort] a: next, b: curr, return a.localeCompare(b);
		LARGEST_NETWORK_NODE.sort((a, b) => a.id.localeCompare(b.id));
		console.log("%cLARGEST_NETWORK_NODE: ", U.css.h() , LARGEST_NETWORK_NODE);

		let ID = LARGEST_NETWORK_NODE.map(node => node.id);
		console.log(`password of LARGEST_NETWORK_NODE: %c${ID.join(',')}`, U.css.h2g());
	U.save_return("Day-23 part-2", ID.join(','));
}


function get_common_TRI(edge)
{
	let a = edge.a;
	let b = edge.b;

	let TRI = [];
	for(let edge_a of a.EDGE)
	{
		if(edge_a == edge)
			continue;
		for(let edge_b of b.EDGE)
		{
			if(edge_b == edge)
				continue;

			let node_c_from_a = (edge_a.a == a)? edge_a.b: edge_a.a;
			let node_c_from_b = (edge_b.a == b)? edge_b.b: edge_b.a;

			if(node_c_from_a.id == node_c_from_b.id)
			{
				let NODE_ID = [a.id, b.id, node_c_from_a.id];
				// [sort] (a, b) a < b , return a.localeCompare(b)
				NODE_ID.sort((a, b) => a.localeCompare(b));
				TRI.push({ id: NODE_ID.join('_'), a: a, b: b, c: node_c_from_a });
			}
		}
	}
	return TRI;
}


let NODE = [];	// { id: "", EDGE: [], TRI: [] }
let EDGE = [];	// { id: "", a: node, b: node  }

function Gather()
{
	//// parse IN to STORE >> ////
	NODE = [];
	IN.split('\n').forEach(line => {
		let NODE_ID = line.split('-');

		if(NODE.findIndex(node => node.id == NODE_ID[0]) == -1)
			NODE.push({ id: NODE_ID[0], EDGE: [], TRI: [] });

		if(NODE.findIndex(node => node.id == NODE_ID[1]) == -1)
			NODE.push({ id: NODE_ID[1], EDGE: [], TRI: [] });
	});

	EDGE = [];
	IN.split('\n').forEach(line => {
		let a = NODE.find(node => node.id == line.split('-')[0]);
		let b = NODE.find(node => node.id == line.split('-')[1]);

		let NODE_ID = [a.id, b.id];
		// a.localeCompare(b) > 1, if a is alphabatically greatr than b
		NODE_ID.sort((a, b) => (a).localeCompare(b))

		let edge = { id: NODE_ID.join('-'), a: a, b: b };
		EDGE.push(edge);

		a.EDGE.push(edge);
		b.EDGE.push(edge);
	});

	//// << parse IN to STORE ////
}

U.title("LAN-party");
_A();