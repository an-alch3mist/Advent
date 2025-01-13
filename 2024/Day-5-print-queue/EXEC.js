function _A()
{
	console.log("somthng");
	U.save_code(IN);

	Gather_CIRCULAR();
	console.log("%cPAGES: " , U.css.h() , PAGES);
	console.log("%cBOOKS: " , U.css.h() , BOOKS);

	let sum_a = 0;
	let sum_b = 0;
	BOOKS.forEach(book => {
		let validate = true;
		for(let i0 = 0 ; i0 <= book.length - 2; i0 += 1)
			if(book[i0].before.includes(book[i0 + 1]))
			{
				validate = false;
				break;
			}

		if(validate)
			sum_a += parseInt(book[U.floor(book.length / 2)].name);
		else
		{
			// fix it >> //
			// a: next, b:curr , return a - b;
			book.sort((page_a, page_b) => { return page_cmp(page_a, page_b) });
			// << fix it //
			sum_b += parseInt(book[U.floor(book.length / 2)].name);
		}
	});	

	console.log(sum_a , sum_b);
	U.save_return(`Day: 5 print-circular-queue`, sum_b);
}



function page_cmp(page_a , page_b)
{
	if(page_b.after.includes(page_a)) 	return +1; // page-b comes after a ~ (a > b) acceptable
	else 								return -1;
}


let PAGES = [];
let BOOKS = [];

function Gather_CIRCULAR()
{
	//// parse IN to STORE >> ////
	/*
	page : { name: , before: [] , after: [] }
	*/
	// unique pages 
	IN.split("\n\n")[0].split('\n').forEach(line => {
		let [a, b] = line.split('|');

		if(PAGES.findIndex(page => page.name == a) == -1)
			PAGES.push({ name: a, before: [], after: [] });

		if(PAGES.findIndex(page => page.name == b) == -1)
			PAGES.push({ name: b, before: [], after: []});
	});

	// link: before, after
	IN.split("\n\n")[0].split('\n').forEach(line => {
		let [a, b] = line.split('|');

		let page_a = PAGES.find(page => page.name == a);
		let page_b = PAGES.find(page => page.name == b);

		page_a.after.push(page_b);
		page_b.before.push(page_a);
	});

	// sort circular after , before >> just for reference//
	PAGES.forEach(page => {
		// a: next, b: curr, return a - b
		page.after .sort((a, b) => { return PAGES.findIndex(page => page == a) - PAGES.findIndex(page => page == b); });
		page.before.sort((a, b) => { return PAGES.findIndex(page => page == a) - PAGES.findIndex(page => page == b); });
	});
	// << sort circular after , before just for reference//

	// books ordered/unordered page collection
	BOOKS = IN.split("\n\n")[1].split('\n').map( line => {
		return line.split(',').map(name => {
			return PAGES.find(page => page.name == name);
		});
	});

	//// << parse IN to STORE ////
}

U.title("print-circular-queue");
_A();