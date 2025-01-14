function _A()
{
	let href = (elem, val) => elem.setAttribute("href", val);
	let main_holder = query(".holder");

	console.log("Advent", LOC);
	for(let year of LOC.YEAR)
	{
		if(year.FILES.length == 0)
			continue;

		// year-holder
		let year_holder = elem("div", "year-holder", '');
		year_holder.appendChild(
			elem("div", "year", year.val)
		);

		// links
		for(let file of year.FILES)
		{
	    	// a
			let a = elem('a', "link", "");

		    if(file.day == '#')
		    	href(a, `./${year.val}/Day-%23-/index-somthng.html`)
		    else
		    	href(a, `./${year.val}/Day-${file.day}-${file.desc}/index-${file.desc}.html`)
			
			// time
			let timeSpan = elem("span", "time", file.time);

	    	// desc
			let descSpan = elem("span", "desc", `<l>${file.desc}</l> ${file.day}` );

			// inactive
		    if(file.time == '.')
		    {
		    	// a
				a.setAttribute("target", "_self");
			    a.classList.add("link-inactive");
			    a.setAttribute("href", `#`);
		    	
		    	// desc
		    	descSpan.innerHTML = `${file.day}`;
			   	descSpan.classList.add("desc-inactive");
		    }
		    else
		    {
		    	a.setAttribute("target", "_blank");
		    }

		    a.appendChild(timeSpan);
		    a.appendChild(descSpan);
		    year_holder.appendChild(a);

		}
	    main_holder.appendChild(year_holder);
	}
}


function elem(tag, _class, str)
{
	let elem = document.createElement(tag);
	elem.innerHTML = str;
	elem.setAttribute("class", _class)
	return elem;
}



function query(str)
{
	return document.querySelector(str);
}

document.title = "Advent";
_A();