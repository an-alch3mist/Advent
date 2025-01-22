/*
	start: 20:54
	found: 21:18
*/
function _A()
{
	U.save_code(IN, /[\,]/);
	Gather();
	console.log("%cTOWEL", U.css.h(), TOWEL);
	console.log("%cDESIGN", U.css.h(), DESIGN);

	Logic();
	// sum >>

	// << sum
}

// >> 230ms
function Logic()
{
	// TODO: recursive(design) >> DOC_COUNT Approach
	let sum = 0n;
	let str = "";

	for(let design of DESIGN)
	{
		DOC_COUNT = [];
		let count = recursive(design);
		sum += count;

		// str
		DOC_COUNT.forEach(doc => str += `"${doc.design}" ${doc.count}\n`);
	}
	console.log(DOC_COUNT);
	console.log(`sum(terminal leaf count): ${sum}`);

	U.save_return("Day-19 part-2", `${sum/(10n**12n)}T`);
	U.save_code(str, /[0-9]/);
	U.query(".code").style.textAlign = "center";
}


let DOC_COUNT = [];
function recursive(design, design_index)
{
	// success
	if(design == '')
		return 1n;

	// DOC_COUNT >>
	let doc_index = DOC_COUNT.findIndex(doc => doc.design == design);
	if(doc_index != -1)
	{
		if(DOC_COUNT[doc_index].design_index != design_index)
			console.log("reference from different design");
		return DOC_COUNT[doc_index].count;
	}
	// << DOC_COUNT

	// Accumulate >>
	let count = 0n;
	for(let towel of TOWEL)
	{
		if(design.startsWith(towel))
			count += recursive(design.substring(towel.length, design.length));
	}
	// << Accumulate 

	// DOC_COUNT >>
	DOC_COUNT.push({ design: design, count: count, di: design_index });
	// << DOC_COUNT
	return count; // return accumulated
}

let TOWEL;
let DESIGN;
function Gather()
{
	// parse IN here >>
	TOWEL = IN.split("\n\n")[0].split(', ');

	DESIGN = IN.split("\n\n")[1].split('\n');
	// << parse IN here
}

U.title("linen-layout");
_A();