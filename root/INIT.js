function _A()
{
	for(let year of LOC.YEAR)
		for(let file of year.FILES)
		{
			let a = document.createElement("a");
			a.setAttribute("class", "link");
			a.setAttribute("target", "blank");

			let span_desc = document.createElement("span");
			span_desc.setAttribute("class", "desc");

			span_desc.innerHTML = `${file.time} .... <l>${file.desc}</l> ${file.day}`;

			// ./2024-1/Day-4-xmas/index-xmas.html
			a.setAttribute(
				"href", 
				`./${year.val}/Day-${file.day}-${file.desc}/index-${file.desc}.html`
			);

			a.appendChild(span_desc);
			query(".link-holder").appendChild(a);
		}
}



function query(str)
{
	return document.querySelector(str);
}

document.title = "Advent";
_A();