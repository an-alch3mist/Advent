function _A()
{
	console.log("Advent", LOC);
	for(let year of LOC.YEAR)
		for(let file of year.FILES)
		{
	    	// a
			let a = document.createElement("a");
		    a.classList.add("link");

		    a.setAttribute(
				"href", 
				`./${year.val}/Day-${(file.day == '#')?"%23" : file.day}-${file.desc}/index-${file.desc}.html`
			);
			a.setAttribute("target", "_blank");

	    	// time
		    let timeSpan = document.createElement("span");
		    timeSpan.classList.add("time");
		    timeSpan.innerHTML = file.time;

	    	// desc
		    let descSpan = document.createElement("span");
		    descSpan.classList.add("desc");
		    descSpan.innerHTML = `<l>${file.desc}</l> ${file.day}`;

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

		    a.appendChild(timeSpan);
		    a.appendChild(descSpan);
		    query(".link-holder").appendChild(a);
		}
}


function query(str)
{
	return document.querySelector(str);
}

document.title = "Advent";
_A();