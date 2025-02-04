/*
	start: 14:33
	found: 14:56

*/
function _A()
{
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cCARD:", U.css.h(), CARD);
	console.log("%cHAND_AMT:", U.css.h(), U.clone(HAND_AMT));

	Logic();

	// check >>
		// let hand_type_0 = get_hand_type("TJJTT");
		// console.log(hand_type_0);
		// let hand_type_1 = get_hand_type("1221555225");
	// << check
}

// >> 30ms
function Logic()
{
	// [sort] a: next, b: curr, return a - b
	HAND_AMT.sort((a, b) => 
	{
		// .hand, .amt
		let hand_type_a = get_hand_type(a.hand);
		let hand_type_b = get_hand_type(b.hand);

		if(hand_type_a != hand_type_b)
			return hand_type_a - hand_type_b; // max based on hand_type val
		else
			for(let i0 = 0; i0 < a.hand.length; i0 += 1)
				if(a.hand[i0] != b.hand[i0])
					return -(CARD.indexOf(a.hand[i0]) - CARD.indexOf(b.hand[i0])); // max based on index appear early in CARD
		// none
		return 0;
	});
	console.log("%cHAND_AMT sorted:", U.css.h(), HAND_AMT);

	// sum >>	
	let sum = 0n;
	for(let i0 = 0; i0 < HAND_AMT.length; i0 += 1)
		sum += BigInt(HAND_AMT[i0].amt * (i0 + 1)); // rank = i0 + 1
	// << sum

	console.log(`sum of .amt * rank of each hand_amt: %c${sum}`, U.css.h2g()); 
	U.save_return(`Day-7 part-2`, `${sum/10n**6n}M`);
}

function get_hand_type(str)
{
	let UNQ = str.split('').UNQ(char => char);

	// [sort] a: next, b:curr, return a - b
	UNQ.sort((a, b) => { return -(a.LIST.length - b.LIST.length); });

	// joker behaviour >>
		// case: where every card is joker
		if(UNQ[0].key == 'J' && UNQ[0].LIST.length == 5)
			return 50;

		for(let unq of UNQ)
			if(unq.key == 'J')
			{
				let joker_count = unq.LIST.length;	// take joker count
				UNQ.splice(UNQ.indexOf(unq), 1); // remove

				for(let i0 = 0; i0 < joker_count; i0 += 1)
					UNQ[0].LIST.push('J');			// append 'J' upto joker count to the max key card that is not joker
			}
	// << joker behaviour

	// console.log(UNQ);

	if(UNQ[0].LIST.length == 5 )
		return 50;
	if(UNQ[0].LIST.length == 4)
		return 40
	if(UNQ[0].LIST.length == 3)
	{
		if(UNQ[1].LIST.length == 2)
			return 32;
		else
			return 30;
	}
	if(UNQ[0].LIST.length == 2)
	{
		if(UNQ[1].LIST.length == 2)
			return 22;
		else
			return 20;
	}
	if(UNQ[0].LIST.length == 1)
		return 10;
}

let CARD;
let HAND_AMT;

function Gather()
{
	// parse IN here >>
	// CARD = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']; // part-1
	CARD = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']; // part-2

	HAND_AMT = IN.split('\n').map(line => {
		return { hand: line.split(' ')[0], amt: parseInt(line.split(' ')[1]) };
	});
	// << parse IN here
}

U.title("camel cards");
_A();