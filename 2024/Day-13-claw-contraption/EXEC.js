/*
	start: 20:30
	found: 20:51
*/
function _A()
{
	U.save_code(IN, /[+=]/);

	Gather();
	console.log("%cbutton-behaviour, prize location:", U.css.h() , CONFIG, "COST: ", COST);
	//
	let PRESS = Logic();

	let sum = 0n;
	for(let press of PRESS)
		sum += BigInt(press.a * COST.a + press.b * COST.b);

	console.log(`sum (La * 3 + Lb * 1): ${sum}`);
	U.save_return("Day-13 part-2", `${sum / 10n**12n}T`);
}

/*
	p = a * L0 + b * L1
	
	p.x = a.x * L0 + b.x * L1
	p.y = a.y * L0 + b.y * L1

	re-arranging this: 

	L0 = area(p, b) / area(a, b)
	L1 = area(a, p) / area(a, b)
*/
function Logic()										
{
	let PRESS = [];
	// 
	for(let config of CONFIG)
	{
		let La = v2.area(config.p, config.b) / v2.area(config.a , config.b);
		let Lb = v2.area(config.a, config.p) / v2.area(config.a , config.b);

		// console.log(`L0: ${L0}, L1: ${L1}`);
		if( (La - U.floor(La)) == 0 && (Lb - U.floor(Lb)) == 0 )
			PRESS.push({a: La, b: Lb});
	}
	// console.log(PRESS);
	return PRESS;										
}										
										

/* button behaviour, prize location*/
let CONFIG;
let COST;

function Gather()
{
	//// parse IN to STORE >> ////
	CONFIG = IN.split("\n\n").map( lines => {
		let POS_str = lines.split('\n').map(line => line.split(", "));
  
		return {
			a: POS_str[0].map( str => parseInt(str.split('+')[1])),
			b: POS_str[1].map( str => parseInt(str.split('+')[1])),
			p: POS_str[2].map( str => parseInt(str.split('=')[1])),
		}
	});

	for(let config of CONFIG)
		config.p = config.p.map( val => val + 10**13 );

	COST = { a: 3, b: 1 };
	//// << parse IN to STORE ////
}

U.title("claw-contraption");
_A();