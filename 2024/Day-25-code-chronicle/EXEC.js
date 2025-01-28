/*
	start: 14:52
	found: 15:11
*/
function _A()
{
	// console.log("somthng");
	U.save_code(IN, /[#]/);

	Gather();
	console.log("%cLOCK:", U.css.h() , LOCK);
	console.log("%cKEY:", U.css.h() , KEY);

	Logic();

	// sum>>

	// << sum
}


function Logic()
{

	for(let lock of LOCK)
	for(let key of KEY)
	{
		let key_fits = true;
		for(let x = 0; x < key.w; x += 1)
			if(lock.H[x] + key.H[x] > lock.h)
			{
				key_fits = false
				break;
			}

		if(key_fits == true)
			lock.KEY.push(key);
	}

	let sum = 0;
	for(let lock of LOCK)
		sum += lock.KEY.length;
	console.log(`sum(KEY.length that fits a certain lock): %c${sum}`, U.css.h2g());

	U.save_return("Day-25 part-1", sum);
}


let LOCK = [];
let KEY = [];

function Gather()
{
	//// parse IN to STORE >> ////
	IN.split("\n\n").forEach(sector => {

		let B = sector.split('\n').map((line, y) => {
			return line.split('').map((char, x) => {
				if(char =='#')
					return 1;
				else
					return 0;
			});
		});

		w = B[0].length; h = B.length;
		let H = [];
		for(let x = 0; x < w; x += 1)
		{
			let sum = 0;
			for(let y = 0; y < h; y += 1)
				if(B[y][x] == 1)
					sum += 1;
			H.push(sum);
		}

		if(B[0][0] == 0) // key
			KEY.push({ B: B, H: H , w: w, h: h });
			
		else if(B[0][0] == 1) // lock
			LOCK.push({ B: B, H: H , w: w, h: h, KEY: []});
	});

	//// << parse IN to STORE ////
}

U.title("code-chronicle");
_A();
