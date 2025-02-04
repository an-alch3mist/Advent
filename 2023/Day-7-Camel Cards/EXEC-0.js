/*
	start: 11:34
	found: 12:32
*/
function _A()
{
	console.log("somthng");
	U.save_code(IN, /[J]/);

	Gather();
	console.log("%cCARD:", U.css.h() , U.clone(CARD));
	console.log("%cHAND_AMT:", U.css.h() , U.clone(HAND_AMT));

	Logic();

	// checked >>
	/*
		let hand_type = get_hand_type("KQJKQ");
		console.log(hand_type);
		get_hand_type("22113");
	*/
	// << checked
	// sum>>

	// << sum
}

// >> 30ms
function Logic()
{
	// [sort] based on against, a: next, b: curr, return a - b >>
	HAND_AMT.sort((a, b) => {

		let hand_type_a = get_hand_type(a.hand);
		let hand_type_b = get_hand_type(b.hand);
		// console.log(a.hand, b.hand, hand_type_a, hand_type_b);

		if(hand_type_a != hand_type_b) 
			return hand_type_a - hand_type_b;

		// same hand type	
		else if(hand_type_a == hand_type_b) 
			for(let i0 = 0; i0 < a.hand.length; i0 += 1)
				if(b.hand[i0] != a.hand[i0])
					// since higher index is valued less
					return -(CARD.indexOf(a.hand[i0]) - CARD.indexOf(b.hand[i0]));

		return 0;
	});
	// << [sort] based on against, a: next, b: curr, return a - b
	console.log("%cHAND_AMT after sort:", U.css.h() , U.clone(HAND_AMT));

	// 249483956
	let sum = 0n;
	for(let i0 = 0; i0 < HAND_AMT.length; i0 += 1)
	{
		let amt = HAND_AMT[i0].amt;
		sum += BigInt(amt * (i0 + 1)); // rank = i0 + 1
	}

	console.log(`sum of amt * rank for each hand_amt: %c${sum}`, U.css.h2g());
	U.save_return("Day-7 part-2", `${sum/(10n**6n)}M`);

}

function get_hand_type(five_cards)
{
	let UNQ = five_cards.split('').UNQ(char => char); // sort works only on a list
	UNQ.sort((a, b) => { return -(a.LIST.length - b.LIST.length); })

	for(let unq of UNQ)
		if(unq.key == 'J')
		{
			let j_count = unq.LIST.length;

			// case .LIST.length == 5
			if(j_count == 5) return 50;

			UNQ.splice(UNQ.indexOf(unq), 1);

			for(let i0 = 0; i0 < j_count; i0 += 1)
				UNQ[0].LIST.push(UNQ[0].key);
				
				/* // case: JJ7K7
					
					try
					{
						UNQ[0].LIST.push(UNQ[0].key);
					}
					catch(e)
					{
						console.log(UNQ, five_cards);
						throw(e);
					}
				*/
			break;
		}
	// console.log(UNQ);


	// higher type wins
	if(UNQ[0].LIST.length == 5)
		return 50;

	if(UNQ[0].LIST.length == 4)
		return 40;

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


let HAND_AMT;
let CARD;
function Gather()
{
	//// parse IN to STORE >> ////
	//part-1: >>  CARD = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
	CARD = ['A', 'K', 'Q','T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']

	HAND_AMT = IN.split('\n').map(line => {

		let [hand, amt] = line.split(' ');
		return { hand: hand, amt: parseInt(amt) }
	});
	//// << parse IN to STORE ////
}

U.title("camel cards");
_A();