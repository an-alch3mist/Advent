function INIT(year)
{
	let FILE = LOC.find(loc => loc.val == year).FILE;
	if(FILE == null)
		return;

	console.log(FILE);
	/* 
	<div> .main-holder
		<div> .year heading

		<a> .link
			<span> .compute-time
			<span> .description of puzzle
	*/

	let main_holder_div = query(".main-holder");

	create("div", "year").str(year).parent(main_holder_div);

	for(let file of FILE)
	{
		// link
		let href = `./Day-${file.day}-${file.desc}/index-${file.desc}.html`;
		if(file.day == '#')
			href = `./Day-%23-/index-somthng.html`;

		let link_a = create("a", "link")
						.set("href", href)
						.parent(main_holder_div);

		// compute-time
		let time_span = create("span", "time")
							.str(file.time)
							.parent(link_a);

		// description
		let desc_span = create("span", "desc")
							.str(`<l>${file.desc.replace(/\-/g, ' ')}</l> ${file.day}`)
							.parent(link_a);

		// inactive
	    if(/\s*\./.test(file.time) == true)
	    {
	    	// link a
			link_a
				.set("target", "_self")
				.set("href", `#`)
				.set("class-l", "link-inactive");
	    	
	    	// desc
	    	desc_span
		    	.str(`${file.day}`)
		    	.set("class-l", "desc-inactive");
	    }
	    else
	    	link_a.set("target", "_blank");

	}
	// main_holder_div.set("data", 0);
}


let create = (_tag, _class) => 
{
	let element = document.createElement(_tag);
	element.setAttribute("class", _class);
	return element;
}


// any attribute, for classList.add(str) => attr: "class-l", class: str
HTMLElement.prototype.set = function(attr, str)
{
	if(attr == "class-l")
		this.classList.add(str);
	else
		this.setAttribute(attr, str);
	return this;
}

HTMLElement.prototype.parent = function(parent)
{
	parent.appendChild(this);
	return this;
}

HTMLElement.prototype.str = function(str)
{
	this.innerHTML = str;
	return this;
}

function query(str)
{
	return document.querySelector(str);
}


// call INIT(year = 2024)
