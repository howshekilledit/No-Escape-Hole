// JavaScript Document

//you will need to give all js files to copy + paste

//display a new work

var instr = "To preview works, hover over titles or press <u>arrow keys</u>.<br> To see a work, <u>click</u> or <u>press enter</u><br> To return home, <u>press any letter</u> or <u>hit back</u>.";	
var splashcont = '<div id="warning">This content is designed to display full screen on a personal computer or tablet.<ul><li> <b>If you are using a computer, </b>please expand the browser full screen. </li><li> <b>If you are using a tablet,</b> please turn your device sideways.</li><li><b> If you are using a phone, </b>consider another device if available.</li></ul><div id="hidewarn">HIDE ME ⊗ </div></div><div id = "splash"><h1>no escape hole</h1><br/><a id = "enter">ENTER</a><br/><br/><div id="instr">'+instr+'</div>'; 
$('body').html(splashcont);
var audioElement = document.createElement('audio');
$(document).ready(function(){
	
	//var instr = "To preview works, hover over titles or press arrow keys.<br> To see a work, click its title or cover image.<br> To return home, press any key or refresh this page.";
	var nav = "";
	works.forEach(function(work, x){
		nav += "<a class = 'artlink' id = '" + x + "'>"+work.title+"</a>"; 
	});
	//var splashcont = '<div id="warning">This content is designed to display full screen on a personal computer or tablet.<ul><li> <b>If you are using a computer, </b>please expand the browser full screen. </li><li> <b>If you are using a tablet,</b> please turn your device sideways.</li><li><b> If you are using a phone, </b>please consider another device.</li></ul><div id="hidewarn">HIDE ME ⊗ </div></div><div id = "splash"><h1>no escape hole</h1><br/><a id = "enter">ENTER</a><br/><br/><div id="instr">'+instr+'</div>'; 
	
	var bodycont = '<h1 id = "noescape">no escape hole</h1><h2 id="mmenu">menu</h2><div id="nav" style="vertical-align:top">' + nav + '</div> <div id="content"> <img id="thumb" src="https://howshekilledit.com/noescapehole/assets/loading.jpeg" class=""> <div id="artist">		</div> <div class = "homeinst" id="instr"> ' + instr + '</div> </div>';
		var url      = window.location.href;  // get current URL
	var current; //index of work currently displayed
if(url.indexOf('?') ===-1 || url.substring(url.indexOf('?')).length> 4){
	//addback(''); 
	$('body').html(splashcont); 
		$('#enter, #splash').click(function(){
			$('body').html(bodycont);
			setlinks(works); 
			current = rollworks(Math.floor(Math.random() * works.length), works, instr); 
		}); 
		$('#hidewarn').click(function(){
				$('#warning').hide(500);
			}); 
		 $("#splash #instr").animate({
			opacity:1
			}, 1000);
	}else{
		if(url.indexOf('?*') === -1){
		$('body').html(bodycont);
		setlinks(works); 
		var ap = url.substring(url.indexOf('?')+1);
		if(ap.length>0){
			current = rollworks(url.substring(url.indexOf('?')+1), works, instr);}
		else{
			current = rollworks(Math.floor(Math.random() * works.length), works, instr); 
			}
		} else {
			$('body').html(bodycont);
			current = showwork(url.substring(url.indexOf('?*')+2), works);
		}
}
	


		
//key strokes
	document.body.onkeyup = function(){
		//alert(event.which); 
		switch(event.which){
		//show work on enter
		case 13:
			current = showwork($('#thumb').attr('class').substr(1), works); 
			break;
		//return to menu + display random work, all letter keys
		case 13:
			current = showwork($('#thumb').attr('class').substr(1), works); 
			break;
		case 65: case 66: case 67: case 68: case 69: case 70: case 71: case 72: case 73: case 74: case 75: case 76: case 77: case 78: case 79: case 80: case 81: case 82: case 83: case 84: case 85: case 86: case 87: case 88: case 89: case 90: 
			current = backhome(bodycont, current, works, audioElement); 
			break;
		case 38: case 40: //up and down arrow, random work
			if(($('body').html().indexOf('"thumb"') > -1) && ($('body').html().indexOf('"instr"') > -1)){
				current = rollworks(Math.floor(Math.random() * works.length), works, instr); 
			}
			break;
		case 39:  //right arrow next work
			if(($('body').html().indexOf('"thumb"') > -1) && ($('body').html().indexOf('"instr"') > -1)){
				if(current < works.length - 1){
					current = rollworks(current + 1, works, instr); 
				}else{
					current = rollworks(0, works, instr); 
				}
			}
			break;
		case 37: //left arrow previous work
			if(($('body').html().indexOf('"thumb"') > -1) && ($('body').html().indexOf('"instr"') > -1)){
				if(current > 0){
					current = rollworks(current - 1, works, instr); 
				}else{
					current = rollworks(works.length - 1, works, instr); 
				}
			}
			break;
		}
	};
	//show header on resize

}); 



//pick a work at random to show
function randind(current, works){
	var ind = Math.floor(Math.random() * works.length);
	while(ind === current){
		ind = Math.floor(Math.random() * works.length);
	}
	//$('#work').html(works[ind].html); 
	return current;
}

//change to a specifc work
function showwork(id, works){
	addback('?'+id); 
	works[id].onclick(); 
	return id; 
}

//bakc button trick
function addback(append){
	(function(window, location) {
    history.replaceState(null, document.title, location.pathname+"#!/rehistory");
    history.pushState(null, document.title, location.pathname);

    window.addEventListener("popstate", function() {
      if(location.hash === "#!/rehistory") {
            history.replaceState(null, document.title, location.pathname);
            setTimeout(function(){
              location.replace(window.location.href + append);
            },0);
      }
    }, false);
	}(window, location));
}
//change work shown on home page
function rollworks(a, works, instr){
	var cont = '<img id="thumb" src="" class=""> <div id="artist"></div><div id="instr">'+instr +'</div>'; 
	$('#content').html(cont); 
	$('.artlink').each(function(){$(this).css('color', '#cdd0d2');});  
	$('#'+a).css('color', works[a].color); 
	if(works[a].artist != "Mana New Media Residents"){
		$('#artist').html(works[a].artist + ", <em>"+works[a].title+"</em>"); 
	}else{
		$('#artist').html("Learn more about the exhibition and the artists."); 
	}
	//$('#arttitle').text(works[a].title); 
	$('#thumb').attr('src', 'https://howshekilledit.com/noescapehole/assets/'+works[a].thumb); 
	$('#thumb').attr('class', 't'+a); 
	$('#thumb').click(function(){
			showwork(a, works); 
		}); 
	return a; 
}
//open work to fullscreen
function fullscreen(html){
	/*if ($(window).width()>= 1024){
		$('h1, #nav').hide();
	} else {*/
		$('#nav').hide();
	//}
	//$('#content').css('width', '100%'); 
	$('#content, h1').addClass('blackcube'); 
	$('#content').html(html);
}

//return to home
function backhome(bodycont, current, works, aud){
	$('h1, #nav').show(); 
	$('#content, #nav').css('display', 'inline-block'); 
	$('#content, h1').removeClass('blackcube'); 
	setlinks(works); 
	var roll = Math.floor(Math.random() * works.length);
	roll = rollworks(roll, works, instr); 
	aud.pause();  

	return roll; 
}
//set regular and mobile menus
function setlinks(works){
		var id; 
		$('.artlink').each(function(a){
		//hover
		var current; 
		$(this).hover(function(){ //hover on
			id = $(this).attr('id'); 
			current = rollworks(id, works, instr); 
			//$('#box3').text(works[a].artist); 
		}, function(){ //hover off
			//$(this).css('color', '#cdd0d2'); 
		}); 
		//click
		$(this).click(function(){
			id = $(this).attr('id'); 
			current = showwork(id, works); 
		}); 
		
	});
	
		
		
	
		$('#mmenu').click(function(){
			$('#nav').toggle(); 
		});	
		$('#thumb').mouseenter(function(){
			$('#nav').hide(); 
		});	
	}

//open new indow with specified url	
function newwindow(url){
	var win = window.open(url, '_blank'); 
	win.focus();
}



//HTML for each work
var works = [
/*0*/{artist: "Joo Young Lee", title: "The World Is Thin: Trembling Hill", year: "2018", site: "http://leejooyoung.com", bio: "is a multimedia artist based in Chicago and Seoul. Lee’s practice investigates the complex dynamics of safety and fear, simulation and survival, and fiction and documentary in contemporary urban environments, through the lens of visual-research, feminist theory, and media-technologies. Using 3D animation, sculpture, and multi-channel video installation, her works activate both physical and psychological spaces. Lee received an MFA in Sculpture from the School of the Art Institute of Chicago; a BFA Sculpture from the Pratt Institute, New York; and participated in BA at Central Saint Martins, London. Lee is the 2018 School of the Art Institute of Chicago Awardee of the Toby Devan Lewis Fellowship. She is the recipient of the 2017 - 2018 Arts, Science + Culture Initiative Collaboration Grant from the University of Chicago where she worked with microbiologists, Maggie Zhang and Mirae Lee, on a collaborative project, Invisible/Invincible: The Bacteria Survival Guide. Lee is currently an Artist-in-Residence at the 2018-2019 New Media Program Residency at the Mana Contemporary Chicago. Her works have been shown in art spaces such as Steuben Gallery (NY), Galapagos Art Space (NY), Sullivan Galleries (IL), Expo Chicago (IL) and Seoul Art Space Seogyo (Seoul). Lee has participated in screenings including Fake/Realities at Daedalus Project Multimedia Art Festival (Mykonos), BlaBlaBlind at The Book Society (Seoul), and Post/Natural: 98% Air at the Joan Flasch Artists’ Book Collection (IL).", desc: "	Please see the attached doc file.	", html: "", color: "red", onclick: function(){}, thumb: "joowater-lr.gif", ind: 0},
/*1*/{artist: "Minsun Cho", title: "Greenery Flow", year: "2019", site: "http://	minsuncho.com", bio: "Minsun Cho was born in South Korea in 1989 and currently lives and works in Chicago. She received an MFA in the Art and Technology Studies department at the School of the Art Institute of Chicago. From traditional painting to interactive processes, Cho employs diverse materials and methods to focus on the concept of psychological intimacy within human relationships. Encouraging audiences to participate directly in her work, she strives to establish symbiotic communication.", desc: "	As you can freely modify the wave-flow, you are easily affected by others.	", html: "", color: "red", onclick: function(){newwindow('http://greeneryflow.tk/wave/');}, thumb: "minsun-lr.gif", ind: 1},

/*2*/{artist: "Hayeon Hwang", title: "MagIc:", year: "2018", site: "http://hhayeon.com", bio: " is a media artist and interaction designer based in New York and Seoul. Her work explores interactive and kinetic technologies, also integrating elements of computer hardware. Hwang’s particular focus has been on types of interaction that correspond to natural phenomena, and on using digital media to expand their possibilities in new directions. 	", desc: "	MagIc: is a sound installation generated by the movement and forces of magnets. Magnets placed against the walls of the cube produce rhythmic sounds and generative beats. The sound can vary according to the different shapes, type and strength of magnetism. Each module has 4 faces, top, front, left, and right, which a magnet can be placed on. Each face of the cube has a unique magnetic field generating different patterns of movement. 	", html: "", color: "red", onclick: function(){}, thumb: "Hayeon.jpg", ind: 2},
/*3*/{artist: "Sebastian Morales", title: "Symbiosis.live", year: "2018", site: "http://	adorevolution.com", bio: "iis a Mexico-born, New York-based artist, engineer, and researcher. He develops interactive works at the intersection of robotics, digital culture, and living systems. He received a BS in mechanical engineering from the Illinois Institute of Technology and a MPS in Interactive Telecommunications from New York University. Morales’s work has been exhibited in New York, Chicago, and San Francisco. As a roboticist for the collective tatoué, he has performed in Paris, Moscow, Brussels, Copenhagen, Belfort, and Lyon. Morales’s recent work is focused on speculative symbiotic relationships between organic and inorganic forms of life. He creates estuary spaces in which single cells and primitive organisms from the internet evolve into new hybrid forms.", desc: "	Part digital, part physical, fully alive. Symbiosis.live is an estuary website where single cell organisms meet their digital equivalent, internet bots. Together, they begin to develop a symbiotic ecosystem, bots travel the world though cables to deliver food into the bioreactor. The cells in turn, modify servers to attract or repel internet bots. Humans are invited along, but only as observers. 	", html: "", color: "red", onclick: function(){newwindow('https://symbiosis.live/live');}, thumb: "sebastiancells.gif", ind: 3},
/*4*/{artist: "David Temchulla", title: "ERODE(Chairone)", year: "2018", site: "http://davidtemchulla.com", bio: "was born and raised in Denver, CO. His work combines interactive technology with organic materials that explore the spaces between the art object and lived experience. He holds degrees from The School of the Art Institute of Chicago (BFA) and the New York University Interactive Telecommunications Program (MPS).	", desc: "	ERODE(Chairone) documents a software program that compresses each video component after every playback. The seven videos are collaged together to reconstruct a part of the Cabione River in Northern Italy.  ERODE(Chairone) compounds the materiality of the moving image along with the fluidity of the river to ultimately question the permanence of virtual space. 		", html: "", color: "red", onclick: function(){}, thumb: "temchulla.png", ind: 4},
/*5*/{artist: "Tiri Kananuruk", title: "DeepTalking", year: "2018", site: "http://xxx.tiri.xxx", bio: 	"Bangkok-born, New York-based Tiri Kananuruk is a performance and sound artist. She holds a BA in exhibition design from Chulalongkorn University in Bangkok, and an MPS from the Interactive Telecommunications Program at New York University. Her work explores the manipulation of sound in the context of technological consumerism, examining human relationships through the use of  transmitted signals and machine learning, natural language processing and bodily movement.", desc: "A bot that is able to listen and respond to humans, using machine learning to generate new narrative techniques in unpredictable ways.", html: "", color: "red", onclick: function(){newwindow('http://deep.tiri.xxx/reply');}, thumb: "tiri2.png", ind:5}, 
/*6*/{artist: "Yeseul Song", title: "Rearranged", year: "2019", site: "http://yeseul.com	", bio: "is a Korean born and New York-based artist and multidisciplinary researcher who makes experiential use of hardware and software. Her work explores the future of the Object and poetic representations of data. Her projects has been exhibited at the IAC Building in New York, the IFP Center in Brooklyn, and the Fort Mason Center for Arts & Culture in San Francisco, among others. She is a contributor to the Re-coded Project exhibited at Sonar+D in Barcelona, the Day for Night festival, and Google I/O.<p>She is currently an artist in residence at Mana Contemporary\'s New Media Program and a research fellow at New York University\'s Interactive Telecommunications Program (ITP). She is an alum of NYU ITP and and School for Poetic Computation (SFPC).", desc: "Rearrangement (2019) is an image processing web app exploring poetic representations of pixel data. The user is able to upload an image and have the pixels rearranged based upon a pixel sorting algorithm and then save the resulting image.</p>", html: "", color: "red", onclick: function(){newwindow('https://rearranged.yeseul.art/', '_blank');}, thumb: "yeseul_rearrnaged_img.png", ind:6},
/*7*/{artist: "Michael Simpson", title: "Museum of Generated Artwork", year: "2019", site: "https://mgs.nyc", bio: "	is a New York City based media artist and researcher that uses real-time sensing and data analysis as a fundamental aspect of his work. He is particularly focused on the combination of audio analysis and machine learning.  Michael has a Master’s degrees from New York University’s Interactive Telecommunications Program (ITP) and is also an alumni of the School for Poetic Computation (SFPC). Michael\'s work has been exhibited at the IAC Building in New York, the IFP Center in Brooklyn, the Fort Mason Center for Arts & Culture in San Francisco.	", desc: "The Museum of Generated Spaces is a love letter to text-based adventures of days gone by. The project creates a text-based virtual reality where users are able to peruse a museum of generative artworks.	", html: "", color: "red", onclick: function(){newwindow('https://moga.mgs.nyc/');}, thumb: "michael.png", ind:7},

/*8*/ {artist: "Morgan Green", title: "hold you/mold you", year: "2019", site: "http://howshekilledit.com", bio: "is a writer and artist who works to illuminate patterns in our reading of words and bodies. Green’s recent works use computing to blur and scramble language, disrupting its inherent violence by rendering it abstract. Green holds an MFA from the Low-Residency program at the School of the Art Institute of Chicago, and a BA from University of Southern California’s School of Cinematic Arts. She has exhibited and performed at film festivals, galleries, and performance spaces across the United States, including at DOC NYC film festival and the Neutra VDL Research House, Los Angeles. She is also a contributor to Art21 Magazine.", desc: "obliquely interactive text", html: "", color: "red", onclick: function(){fullscreen(this.html);}, thumb: "ellipse.gif", ind:8},
/*9*/{artist: "Jenna Boyles", title: "text", year: "2019", site: "http://jennaboyles.com	", bio: "(b. 1989 Pittsburgh, PA) works with textiles, circuitry, and found objects using craft based techniques and DIY approaches to address the subject of waste as it pertains to political and environmental issues. Inspired by public trash and obsolete machines she is driven by a desire to collect and sort through both digital and physical refuse. Responding intuitively to shape, form, and color, Boyles employs spontaneous play and meticulous organization to articulate the ubiquity and resonance of unwanted things. Boyles holds a BFA in Painting from the Maryland Institute College of Art and an MFA in Art & Technology Studies from the School of the Art Institute of Chicago. 	", desc: "		", html: "", color: "red", onclick: function(){}, thumb: "jennacol.png", ind:9},
/*10*/{artist: "CHiKA", title: "untitle", year: "2019", site: "http://imagima.com", bio: "is currently at MANA Contemporary: BSMT New Media Residency and Visable Future Lab.<p>CHiKA searches a Japanese homophone with a unique combination of meanings to conceptualize her artwork. The word that is pronounced the same as another word but differs in meaning. This concept expands her ideas; revealing the hidden meanings.<p>The main elements of her installation are deeply inspired by minimalistic, simple geometric beauty, Japanese philosophy, Zen, sound and complicated mechanisms that interact with the public.</p><p>Her experience working with experimental sound composers, 8-bit musicians, and club DJs, experimenting with improvisational communication with an audience in real time highly influences her artwork. Her desire to allow the audience to experience a shift in the traditional viewing experience: from one-way communication to the audience, into a fully interactive experience that uses technology to establish a moment of creation with the public in real time.</p>"	, desc: "Audio Visual Experimentation", html: "", color: "red", onclick: function(){}, thumb: "chika.gif", ind:10},
/*11*/ {artist: "Cat Bleumke", title: "Stream Subjectivities", year: "2019", site: "		", bio: "Cat Bluemke works through video games, performance, and expanded reality to explore the control and conflicts of labour and its relationship with technology. Graduating in 2018 with her MFA in Design for Emerging Technologies from the School of the Art Institute of Chicago, her practice uses technology to reimagine existing social relations and the future of work. Her work has been exhibited internationally at venues such as the the 2018 Venice Architecture Biennale, Kunsternes Hus (Norway), and the Museum of Contemporary Art (Chicago). She lives and works between Chicago, IL and Toronto, Canada.", desc: "		", html: "", color: "red", onclick: function(){fullscreen(this.html);}, thumb: "examplestream.png", ind:11},
/*12*/{artist: "Morgan Green", title: "Cyborg X-ing", year: "2019", site: "		", bio: "		", desc: "essay series", html: "", color: "red", onclick: function(){fullscreen(this.html);}, thumb: "todrag.png", ind:12},
/*13*/ {artist: "Mana New Media Residents", title: "<div id = 'about' style = 'line-height:3'>about</div>", year: "		", site: "		", bio: "		", desc: "		", html: "", color: "red", onclick: function(){}, thumb: "bldgs.png", ind:13}];
works[12].onclick = function(){
	fullscreen(this.html);
	var intro = $('#xing').html(); 
	$('#uncannyx').click(function(){
		$('#xing').html(works[12].part2);
		window.scrollTo(0, 0);
	}); 
	$('#xing').click(function(){
		$('#uncannyx').click(function(){
				$('#xing').html(works[12].part2);
				window.scrollTo(0, 0);
		}); 
		$('#intro').click(function(){
				$('#xing').html(intro);
				window.scrollTo(0, 0);
		});
	}); 
}; //cyborg x-ing click
//alert(names);
works[12].html = '<div class = "essay" id = "xing"><h2 id = "noescape">Cyborg X-ing</h2><p>Cassil’s 2018 work Aline’s Orchard (Between Scandal and Oblivion) uses darkness to create space for pleasure. The installation, which I visited at its spring opening in the gallery at Barnsdall Art Park in Los Angeles, “uses sound and sensory suggestion to re-create the Barnsdall olive groves in total darkness as a once and future site of political radicalism and queer cruising.”<sup>1</sup> Sensory suggestion here meant air made almost-tropical by a wet dirt floor and the heat of bodies. It meant a gentle crescendo of grunts — whether these came from performers or other visitors, I wasn’t sure. The installation\'s particular darkness created privacy in a packed municipal gallery on a Sunday afternoon. Darkness protects from the various threats associated with the visual: certain kinds of surveillance, the imposition of gaze. I attended the show with a group of friends, and some of us found each other anew in the moist black.  </p><p>Cassils created Aline’s Orchard as a response to the FOSTA (Fight Online Sex Trafficking) bill enacted in April 2018, just a few weeks before the opening. The bill, signed into law along with SESTA (Stop Enabling Sex Traffickers), purportedly exists to prevent sex trafficking, and has resulted in the removal of craigslist personal ads and similar online services. Many LGBTQ and sex worker advocates oppose the the bill, which is “predicated on protecting women and children from trafficking but is written too broadly, as a strategy of clamping down on sexual freedom and expression.”<sup>2</sup> Some activists cite SESTA-FOSTA as potentially life-threatening to sex workers, as websites like craigslist and Backpage “allow[ed] them to do their work both safely and independently.”<sup>3</sup>  Cassils frames Aline’s Orchard in response to FOSTA, comparing the deforestation and surveillance of Barnsdall Park with the condemnation of personal ads. Both spaces once allowed queer adults to find each other in the safety of darkness. Cassils draws a parallel between the cover of night and certain private corners of the internet, of cyberspace. </p><p>This past fall, I saw a series of performances that also engaged cybernetics under the cover of night, and I will go on to describe these performances as cyborg drag. Here, I am thinking about cybernetics as a constellation of automated systems of control; cyborgs as the cybernetic organisms that constitute and are constituted by those systems. The performers I will discuss took advantage of the latitude the night can create for sensation and expression, at the same time taking on histories of darkness. The parallel Cassils makes between the cover of night and the cover of craigslist goes some way to explain the need for darkness when cyborgs perform drag in the flesh. In the translation from URL to IRL, a shielding cloak, imperfect but substantial, remains. </p><p>I am working within an expanded notion of drag that encompasses the performance of multiple crossings — not just the crossing of gender lines, but also those lines dividing humans from machines. All of these lines are less straight and solid than they might appear. Scientific American asserts that “determination of biological sex is staggeringly complex, involving not only anatomy but an intricate choreography of genetic and chemical factors that unfolds over time,” concluding that “the more we learn about sex and gender, the more these attributes appear to exist on a spectrum.”<sup>4</sup> This scientific statement intersects with Judith Butler’s theory-based argument, that the biological and material basis for sex and gender is the product of entrenched cultural formulations — stories that repeat and “congeal” again and again. These formulations are re-performed constantly, and even though each re-performance is limited as “the repetition of what cannot be recollected,” the power of this repetition over time makes it difficult to cast off gender’s imposition.<sup>5</sup> These entrenched stories about sex and gender have always excluded some people.<sup>6</sup> </p><p>Although it operates differently, the ostensible line between human and machine is also an illusion, as we have long survived as coextensive with the machines we create. A “hybrid of machine and organism” provides the basic definition of a cyborg, as described by Donna Haraway.<sup>7</sup> Invasive and material examples of the technologies that merge with humans include the pacemaker and the <a href = "https://qz.com/889395/planned-parenthood-has-seen-a-900-increase-in-women-seeking-iuds/" target = "_blank">IUD</a>, but these examples don’t indicate how closely human and machine are really bound. Manfred Clynes, one of the men who originally coined the term “cyborg” at a 1960 NASA conference notes that “Homo sapiens, when he puts on a pair of glasses, has already changed. When he rides a bicycle he virtually has become a cyborg.”<sup>8</sup> By these metrics, we already live in a society of cyborgs. Clynes also references vaccinations as cyborg technologies, suggesting an expansive pervasion of “posthuman” crossing, where posthumanism is “the embodiment and embeddedness of the human being in not just its biological but also its technical world.”<sup>9</sup> </p><p>Contemporary computing has troubled this boundary between the biological and the technical from its outset. In his seminal 1950 essay "Computing Machinery and Intelligence," Alan Turing sets up an analogy of dualisms: woman-man to machine-human.<sup>10</sup>  Turing\'s essay is the source of the “Turing Test,” dogma to many who work in the field of artificial intelligence. The Turing Test has come to mean essentially what the protagonist of the film <em>Ex Machina</em> describes: “It’s when a human interacts with a computer. And if the human doesn’t know they’re interacting with a computer, the test is passed.”<sup>11</sup> Machines that pass the test have achieved “Strong AI.”<sup>12</sup> This understanding of the test seems oblivious to certain formative constructions around gender. The test that Turing actually describes analogizes the ability to discern a man from a woman with discerning a human from a machine. If an “interrogator,” passing type-written questions and receiving type-written answers from behind a closed door, correctly distinguishes machine from human at the same rate as man from woman, the machine has passed the Turing Test. The anonymity of the exchange, which protects the interrogator from the influence of a subject’s appearance, is usually preserved in contemporary understandings of the test. For this reason, a chat bot makes an excellent test subject. I can understand the pragmatic reasons why the gender analogy has disappeared from discourse around the test,  but the original test shows us that both the institution and the troubling of gender dualism has been embedded in modern computing from its outset. These dualisms exist within a matrix of others: animal-human, mind-body, idea-matter, public-private, to draw loosely from Haraway.<sup>13</sup>  Jack Halberstam writes that “Turing does not stress the obvious connection between gender and computer intelligence: both are in fact imitative systems, and the boundaries between female and male, I argue, are as unclear and as unstable as the boundary between human and machine intelligence.”<sup>14</sup></p><p>According to Halberstam,  “automated machines… provide new ground upon which to argue that gender and its representations are technological productions.”<sup>15</sup> Cyborg drag is a phrase I use to explain the resonances among the disparate pieces of a limited project. I am wary of taking the word “drag” too far outside of its home turf, but I am also most interested in the places where the word overpowers notions of territory, rather than retreading them.  The word’s recorded use in relation to cross-dressing carries nearly two and a half centuries of history, some of it violent.<sup>16</sup>  Part of my affection for drag comes from its unwillingness to pretend that the key to a nonviolent future is to pantomime a nonviolent past. The cyborg drag I am proposing can perform crossing within one or more sets of dualisms, which are anyway bound up in one another. We do not live in a culture that often permits crossing without pain. Crossing pains can include the side effects of synthetic testosterone, the cramping triggered by IUD implantation, and, most pervasively, the violence with which people fail to accept others. Cyborg drag, like drag in general, performs crossing for an audience. Drag is aware of itself as performance, and often aware of itself as violent — to drag a body is violent. To drag one’s own body is perhaps a way of repositioning oneself in relation to historical violence, to recognize an ingrained intimacy with violence, and thereby to see a way through it with a new kind of guiding clarity. </p><p>In advocating for a queer form of utopianism, José Esteban Muñoz writes that “the way to deal with asymmetries and violent frenzies that mark the present is not to forget the future.”<sup>17</sup> Cyborg drag acknowledges and envisions a possible future, both via its technologies and its embrace of blur, of unstable identity. Since I began my residency at Mana Contemporary, I have been fortunate to encounter a number of cyborg drag performances. Throughout the coming months, I will update this page with new texts, detailing specific examples of cyborg drag and how they operate. </p><p style = "text-align:right">Morgan Green<br/>January 24, 2019<br/><a href = "javascript:void(0)" id = "uncannyx">&dArr;NEXT&rArr;Crossing the Uncanny Valley&rArr;</a></p><h3 id = "noescape">References</h3><ol><li><a href = "http://cassils.net/exhibit/cassils-preseents-alines-orchard-between-scandal-and-oblivion/" target = "_blank"><em>cassils.net</em></a></li><li>Ibid.</li><li>Amanda Arnold, <a href = "https://www.thecut.com/2018/03/sesta-anti-sex-trafficking-bill-fosta.html">"Here’s What’s Wrong With the So-Called Anti–Sex Trafficking Bill"</a>, 2018, <em>The Cut</em></li><li>Amanda Montañez, <a href = "https://www.scientificamerican.com/article/beyond-xx-and-xy-the-extraordinary-complexity-of-sex-determination/">"Beyond XX and XY: The Extraordinary Complexity of Sex Determination"</a>,  <em>Scientific American</em>, 2017</li><li>Judith Butler, <em>Bodies That Matter: On the Discursive Limits of Sex</em>, Routeledge 2011 [1993], p. 187</li><li>Ibid., p. 3-27</li><li>Donna J. Haraway, "A Cyborg Manifesto: Science, Technology, and Socialist-Feminism in the Late Twentiety Century,"  <em>Manifestly Haraway</em>, University of Minnesota Press, 2016 [1985], p. 5</li><li>Manfred Clynes, as quoted/cited by Chris Hables Gray in "Notes on the Politics of Future Human Terminology," <em>Journal of Posthuman Studies</em>, 2017, p. 141, 143</li><li>Cary Wolfe, as quoted by Hilary Malatino in "BIOHACKING GENDER: cyborgs, coloniality, and the pharmacopornographic era," <em>Angelaki Journal of the Theoretical Humanities</em>, 2017, p. 179</li><li>Alan Turing, "Computing Machinery and Intelligence", <em>Mind</em>, 1950, p. 433-460</li><li><em>Ex Machina</em>, written and directed by Alex Garland, 2014</li><li><a href = "https://www.ocf.berkeley.edu/~arihuang/academic/research/strongai3.html" target = "_blank">"A Holistic Approach to AI"</a>, <em>Berkeley Open Computing Facility</em></li><li>Donna J. Haraway, "A Cyborg Manifesto: Science, Technology, and Socialist-Feminism in the Late Twentiety Century,"  <em>Manifestly Haraway</em>, University of Minnesota Press, 2016 [1985]. p. 14, 29</li><li>Jack Halberstam (as Judith Halberstam), "Automating Gender: Postmodern Feminism in the Age of the Intelligent Machine," <em>Feminist Studies</em>, 1991, p. 443</li><li>Ibid., p. 439</li><li><em>Oxford English Dictionary</em></li><li>José Esteban Muñoz, <em>Cruising Utopia: The Then and There of Queer Futurity</em>, NYU Press, 2009, p. 96</li></ol></div>'; //my essay
works[12].html = '<div class = "essay">No longer available. </div>'
works[12].part2 = '<h2 id = "noescape">Crossing the Uncanny Valley</h2><p>Las Rosas is a pink-tinged dive in Miami’s Allapattah neighborhood. It has two rooms, a bar in the front and a stage in the back. Each room features a giant neon rose on one wall, and a dungeonesque chandelier hangs over the bar.  In late September, on my last night in residence at Mana Contemporary Miami, I go to Las Rosas with my studiomate for a show called Gender Blender. We get there around midnight, and wait as performers drift into the bar, their costumed glory a tease of what’s to come. While we wait, I try to explain to my companion in clumsy Spanish how an event titled “gender blender” might vary from the more conventional drag shows we had attended elsewhere in Miami. I wonder if it would be accurate to say that while we were about to see drag, the performers are not really the “drag queens\” he is asking about. I have been enjoying the challenge of explaining complicated things in a second language, although I am not sure how well I’m really doing. He and I have spent a lot of time in the studio together, so I am more adept talking to him than most other Spanish-speakers. I like that my friend asks me questions about my world and my art, that he tells me about his. We have lived very different-looking lives, perhaps save for the recent months and years where we have both been traveling for our art.  I take comfort when he explains to me that for him, cultural interchange usually feels like more of a source of mutual growth than objectification, even though I can’t muster the same kind of trust or generosity. He teases me occasionally for my staunchness, my unwillingness ever to concede anything if we argue. (“Y por que eres feminista?” he asks me until eventually my answer proves sufficient, his face serious as he receives it.)</p><p>An old fashioned fortune-telling machine, like the Zoltar machine in the movie <em>Big</em>, sits next to our table. The animatronic man behind glass is surprisingly real-looking, and provides a source of intrigue as we wait, already sleepy, for the show to begin. The machine stares straight ahead, perfectly still except for the fingers that drag along the surface behind the money slot, waiting for dollar bills. The fortune-teller wears a dramatic mustache and beard, and a turban gathered at the front, accentuated with a pearl. My friend wants to buy a fortune and I roll my eyes, always reluctant to spend money on trifles. Instead I try to find a way to translate “gender blender,” without losing the essence of the rhyme. It doesn’t occur to me that actually seeing the show will illuminate more for my friend than anything I say, that he doesn’t need my words to prepare him. Someone else comes by to purchase a fortune, and my friend admonishes me for staring. I can’t get over how real this arcade game looks, the wrinkles in the plastic hands of this animatronic assemblage.  I can’t look away. After the customer receives her fortune, I relent, consenting to split the two dollars, as long as he’s the one to get his fortune told. And I am glad that we are getting a fortune, so that I can watch the machine unencumbered. The bright pierce of his glass eyes entrances me, the high resolution of his synthetic skin. “He looks <em>so real</em>” I say when it’s over.  “Es real,” my friend says. He is real. Of course. This is a person, not a machine.</p><p>I am somewhat comforted that my friend was taken in too, at first, or at least that he pretended for my sake. I wonder if my sleepiness made the illusion more powerful, and at the same time I am grateful for the moment, the feeling of awe. This wonder is the result of the gap between the expectation of artifice and the reality of the body, its luminous intricacy. It reminds me of the scene in Chris Marker’s <em>La Jetee</em>, where you finally see a segment of moving film after a saga of stills — it seems super-real, even though in any normal film, such movement would appear commonplace. <sup>1</sup> The performer’s human features, in this scenario, amaze me, even though I possess many of the same human features myself. In addition to his deft performance of stillness and mechanical movement, the design of the arcade game itself is convincing. The trappings of the machine, the carnival toy, are so powerful in their suggestion that they lead me to mis-recognize a fellow human when he is right in front of me. I think about how technologies that onces inspired awe or even terror now feel commonplace. So too with the human machine, unless we can change the backdrop. </p><p>This fortune-teller, who I later find out is the artist David Rohn, here performs a human-to-machine crossing, titled <em>The Amazing Ultran</em>.<sup>2</sup> The arcade machines that inspire this work embody stereotypes about Romani fortune tellers. Romani people are widely known as “gypsies,” although this term “conveys racial slur.”<sup>3</sup> Romani fortune tellers began working in Europe in the middle ages, and the profession is strongly associated with the group, to the point that it has become a stereotype.<sup>4</sup> Contemplating <em>The Amazing Ultran</em>, I get flustered, questioning whether I might have recognized the fortune-teller’s humanity sooner if he was not also performing a racial/ethnic crossing as this machine/character. The nature of this crossing is peculiar, as the artist is not attempting to impersonate a person of another race, but rather impersonating a machine that is already a stereotype and a fetish — in this case, a literal fetish, as in an object imbued with magic. His makeup serves, in part, to make his skin appear synthetic. His mustache and turban parrot a caricature that precedes this machine, but also make him more convincing as the machine. Considering this, I almost certainly would have recognized a human person sooner if the artist were made up differently, because I hold no cultural memory of an arcade fortune-teller that does not look like <em>The Amazing Ultran</em>, that is not decorated with the same set of symbols. Regardless of any racism I have internalized around this kind of imagery, in the case of this particular object/not-object, a misleading construction of race is part of what sells the work as mechanical. The stereotypical markings of the fortune-teller are as much a part of the illusion as the glass arcade box in which The Amazing Ultran sits. Because I have seen the movie <em>Big</em>, because arcade machines like this one are part of Los Angeles’s campy backdrop, the mustache and turban have become signs. This constellation, of symbols and expectations, leads me to anticipate the Amazing Ultra as an object, instead of as a consciousness. </p><p>A racialized history of labor is part of the impulse to manufacture these kinds of arcade machines in the first place. A collective narrative around automata began to develop before Alan Turing conceived of artificial intelligence halfway into the twentieth century, and even before the word “robot” came into use. Louis Chude-Sokei writes of this collective narrative, and about the relationship between robotics and a specifically American history. The word “robot” entered into the English language via the Czech word, robota (from the earlier orbota), which means slavery.  “Robot” entered from Czech to English out of Karl Čapek’s 1920 Czech play <em>RUR</em>, which tells the story of a factory that produces synthetic laboring people, and models its story from the history of enslavement in the United States.<sup>5</sup> Sokei describes early images of Black enslaved automata: Rastus “the mechanical negro,” an actual machine made by Westinghouse Research Laboratories in the 1930s, and Joice Heth, an enslaved woman who P.T. Barnum presented as “Aunt Joice,” the automaton who raised George Washington.<sup>6</sup> The very title of Douglas Kearney’s poetry collection <em>The Black Automaton</em> suggests the deep entrenchment of these narratives. “I move and don’t live./what made me?”<sup>7</sup> </p><p><em>The Amazing Ultran</em> strikes me as sharing some qualities with “Aunt Joice”  — both involve humans presenting as machines, both are anachronistic traveling carnival attractions of a sort. Importantly, David Rohn is the architect of his own performance, unlike Joice Heth, who was purchased by P.T. Barnum — though her own artistry may have ultiamtely sold the act.<sup>8</sup> While the coin-operated fortune-teller is not a direct product of the specifically American history Chude-Sokei describes, it is the product of related histories. In Romania, Romani people endured over five hundred years of chattel slavery, ending in the mid-nineteenth century, around the time of The Emancipation Proclamation.<sup>9</sup> Scholar Dina Iordanova notes that media have stereotyped Romani people as  having “non-existent work ethics,” a stereotype that echoes one of the many still burdening African Americans.<sup>10</sup>  Romani histories of oppression originate far away from the United States, and this distance is important to how they operate. Their specifics are little known,<sup>11</sup> and therefore perhaps more mysterious and more palatable in the United States than our own historical imaginary. At the same time, the stereotypes are powerful and widespread enough to be familiar stateside, to entice via a limited set of established symbols. One prominent example is the character of Esmeralda, who appears in Victor Hugo’s 1833 novel <em>The Hunchback of Notre Dame,</em> and in the book’s 1996 animated Disney adaptation. The animated Esmeralda is hypersexualized, and she shows exceptional kindness to the white men who desire it. She embodies Iardonava’s observation that many films portray Romani people as “superior to their dull white rivals because they supposedly possess (and are prepared to share) the secrets of ‘real’ love,” thus “(ab)us[ing] them as ‘metaphorical material’” in service of Western narratives.<sup>12</sup> The mechanical fortune-teller, too, is used service of Western narratives. He exists to do emotional labor, to exercise his insight in service of someone else’s story. </p><p>The thing that fascinates me about <em>The Amazing Ultran</em> is that his humanity seems supernatural because I do not expect him to be a human.  My brain creates a different set of expectations about his presentation in response to a totalizing set of symbols. This human-impersonating-machine provides an inversion of those machines that have been designed to look like people. Masahiro Mori, in his influential conceptualization of the uncanny valley, writes that “In climbing toward the goal of making robots appear human, our affinity for them increases until we come to a valley.”<sup>13</sup> Mori maps affinity against appearance on a two-dimensional plane. Toward its bottom, the uncanny valley dips into a negative affinity, and Mori cites zombies and prosthetic hands as examples of the uncanny. <em>The Amazing Ultran</em>, however, scrambles the chart, or perhaps it exists as a vertical line, occupying multiple registers of affinity at once. </p><p>I like the conceptualization of the <em>uncanny valley,</em> and not just for the rhyme. At the same time, the dangers of mapping affinity against appearance, as though the relationship were total, become evident in reading roboticist David Hanson’s response to Mori. Hanson argues that the issue is about bad design, rather than anthropomorphic realism. He begins his essay by suggesting that Dr. Frankenstein’s mistake was not that he experimented with powerful technologies without considering the consequences, but rather that he did not create a beautiful enough creature. “Imagine if Victor Frankenstein had provided his creature with nice skin, a warmly expressive smile, and big attractive eyes,” he writes, “we may expect that the story would have been much less tragic.” He goes on to create a new chart, in which the visages of Ingrid Bergman and Michelangelo’s <em>Pieta</em> provide the highest affinities, and Michael Jackson and Andrew Dice Clay produce negative affinities. Disney’s Jasmine also figures into the chart — according to Hanson she ranks about the same as a Pokemon in producing affinity. “Real humans may be uncanny,” Hanson writes, “such as people with cosmetically atypical physiologies.”<sup>14</sup></p><p>While its trajectory is not totally straightforward, Hanson’s plotting of affinity reaches its apex at thin, white, able-bodied images of femininity, embodied in Ingrid Bergman and Michelangelo’s Virgin Mary (though the presence of Jesus’s glistening corpse in her arms complicates the choice). Presumably, Hanson chose Michael Jackson and Andrew Dice Clay as examples of the “cosmetically atypical,” in part because both men were considered fair game for mockery when the article was published in 2005. At the same time, I am interested in this conception of the Uncanny Valley as a queer and cyborged space. Michael Jackson, in particular, with his metallic costumes and his electric way of dancing, seems to me an innovator of cyborg drag, of human-machine blur. Some of his costumes are even made of segmented metal, like the robot exoskeletons that often show up in science fiction. His dancing, which often involves coming to life in a single rush of energy, follows the electrical spiking pattern that originated the term “glitch,” which I will discuss in the next installment of this text. Michael Jackson innovates many forms of crossing. In 1992, critic Charles Burress wote in response to Jackson’s “Black or White” that baby boomers are “made uneasy by a young black man who seems to be turning white and half female.”<sup>15></sup> The lightening of Michael Jackson’s skin over the course of his life has also been frequently read as an attempt at racial crossing, although Jackson insisted otherwise.<sup>16</sup> The video for “Black and White” includes a sequence depicting people of different genders and races morphing into one another, all singing in Michael Jackson’s voice.  “Black and White” partly inspired Cornel West’s discussion of identity as <em>A Matter of Life and Death,</em> in which he explains that “in talking about identity we have to begin to look at the various ways in which human beings have constructed their desire for recognition, association, and protection over time and in space and always under circumstances not of their own choosing.”<sup>17</sup> Michael Jackson’s performance of multiple crossings is also probably what produces uncanniness for Hanson, a robot-maker obsessed with conventional beauty. </p><p>Powerful technocrats Elon Musk and Bill Gates have both espoused fears of an AI rebellion.<sup>18</sup> Chude-Sokei says that “our fear of robot revolution” comes from the same racialized history that produced Aunt Joice. “We have a long-standing set of anxieties,” Chude-Sokei says, “about the other that serves us.”<sup>19</sup> This fear might explain the appeal of confining <em>The Amazing Ultran</em> and his progenitors in a glass box.  I wonder, too, if David Hanson’s characterizing of Michael Jackson’s appearance (and to be clear, Hanson is explicitly evaluating Jackson’s appearance, not his record of abuse) as uncanny corresponds to a related set of fears, especially since his robotics company is so caught up in the production of a servile other.  Hanson Robotics’ Bina48 figures into Chude-Sokei’s thinking. Sophia, another Hanson Robot that has figured into pop-culture over the last couple years, resembles Ava, the AI who stars in <em>Ex Machina, </em>a film I cite in the introduction in order to convey a common understanding of the Turing Test. Both resemble some fantasy of a thin white woman — in Ava’s case, a humanoid robot so thin that her stomach is actually translucent. By the end of the film, it becomes clear that Oscar Isaac’s character builds these humanoids partly for his sexual use; however it is Kyoko, a Japanese-appearing humanoid who is not given the opportunity to talk, and not Ava, who Nathan explicitly uses this way. When, at the end of the film, Ava manipulates her way to freedom, she kills Nathan and also leaves Caleb, the engineer who frees her, to die. This story of indiscriminate revenge is the kind that Musk and Gates fear, and that Chude-Sokei associates with larger histories of otherness.  In <em>Ex Machina</em>, Ava’s confinement and enslavement represent the danger associated with occupying the apex of affinity that Hanson suggests. Kyoko’s fate is worse than Ava’s, as she does not survive the escape attempt. In fact, Ava cannibalizes pieces of Kyoko’s body for her own use as she completes her escape. Ava’s desire to escape is supposedly proof that she has achieved consciousness, although she does so at the expense of Kyoko’s body, which looks just like the body of a woman of color.<sup>20</sup>  </p><p>Kyoko’s darker body also houses an older model of Nathan’s technology, and for this reason she may not be conscious on the same level. <em>Ex Machina</em> endows the white-appearing robot with the highest level of consciousness, and in this way colludes with same history that produced Aunt Joice, that reckons in <em>The Amazing Ultran</em>. As the most sexualized figure in <em>Ex Machina</em>, Kyoko shares her status with Disney’s Jasmine and Esmeralda, who have also figured into this discussion. Like <em>Ex Machina</em>, Disney sexualizes its women of color more than any of the others in its pantheon. Paul Preciado might refer to this sexualization as “pornification.” In his book <em>Testo Junkie</em>, Preciado writes about the ever-present association of pornifciation and commodity as part of a cyborged economy, the same economy where new technologies such as pharmaceutical testosterone are demonstrating the “completely technoconstructed, undeniably multiple, malleable, and mutable nature of bodies and pleasures.” Preciado writes that “throughout history, the most pornified bodies have been those of non-human animals, women and children, the racialized bodies of the slave, the bodies of young workers and the homosexual body [<em>sic</em>].” This enumeration of the historically pornified meets significantly with a white supremacist vision of the uncanny valley, and with the performances that glimpse cyborg futurity. Cyborg drag does not suppress the violence of its history, but it can trouble its legacy, in part by refusing the very boundaries it crosses. The phrase “gender blender” suggests the form of one such refusal. <p style = "text-align:right">Morgan Green<br/>March 4, 2019<br/><a href = "javascript:void(0)" id = "intro" style = "color:blue">&uArr;PREVIOUS&lArr;Introduction&lArr;</a></p><h3 id = "noescape">References</h3><ol><li><em>La Jetee</em>, directed by Chris Marker, 1962</li><li><a href = “http://davidrohn.net/performances/the-amazing-ultran/“ target = “_blank”>davidrohn.net</a> </li><li>C.R. Sridhar, “Historical Amnesia: The Romani Holocaust,” <em>Economic and Political Weekly</em>, Vol. 41, No. 33, 2006, p. 3571<li>Leo Lucassen and Wim Willems, “The Weakness of Well-Ordered Societies: Gypsies in Western Europe, the Ottoman Empire, and India, 1400-1914,” <em>Review (Fernand Braudel Center)</em>, Vol. 26, No. 3, 2003, p. 290</li><li>Louis Chude-Sokei, “Prognosticating Echoes: Race, Sound, and Naturalizing Technology,” <em>Current Musicology #101</em>, 2017, p. 77-78</li><li>Louis Chude-Sokei, <a href = "https://believermag.com/george-washingtons-mammy/" target = "_blank">"George Washington\'s \'Mammy\'"</a>, <em>Believer Mag</em>, 2014</li><li>Douglas Kearney, <em>The Black Automaton</em>, 2009. p. 18</li><li>"[Barnum and Heth\'s] relationship would transform from outright slavery to sideshow collusion and artistic collaboration"<br/>See: Louis Chude-Sokei, <a href = "https://believermag.com/george-washingtons-mammy/" target = "_blank">"George Washington\'s \'Mammy\',"</a> <em>Believer Mag</em>, 2014</li><li>Sam Beck, “The Origins of Gypsy Slavery in Romania,” <em>Dialectical Anthropology</em>, Vol. 14, No. 1, 1989, p. 53</li><li>Dina Iordanova, "Images of Romanies in Cinema: A Rough Sketch?" <em>Framework: The Journal of Cinema and Media</em>, Vol. 44, No. 2, 2003. p. 6</li><li>Naomi P., <a href = "https://now.org/blog/the-g-word-isnt-for-you-how-gypsy-erases-romani-women/" target = "_blank">"The \'G\' Word Isn\'t for You: How \'Gypsy\' Erases Romani Women,"</a><em>The National Organization for Women</em>, 2017</li><li>Dina Iordanova, "Images of Romanies in Cinema: A Rough Sketch?" <em>Framework: The Journal of Cinema and Media</em>, Vol. 44, No. 2, 2003. p. 8</li><li>Masahiro Mori, <a href = "https://spectrum.ieee.org/automaton/robotics/humanoids/the-uncanny-valley">"The Uncanny Valley: The Original Essay by Masahiro Mori,"</a> translated by  Karl F. MacDorman and Norri Kageki, <em>IEEE Spectrum</em>, 2012 [1970]</li><li>David Hanson, Expanding the Aesthetic Possibilities for Humanoid Robots,” <em>Android Science</em>, 2005 </li><li>Charles Burress, <a href = "https://www.chicagotribune.com/news/ct-xpm-1992-03-17-9201240971-story.html" target = "_blank">"Michael Jackson: An Experiment in Human Identity,"</a> <em>Chicago Tribune</em>, 1992</li><li>Joseph Vogel, <a href = "https://www.theguardian.com/music/2018/mar/17/black-and-white-how-dangerous-kicked-off-michael-jacksons-race-paradox">"Black and White: how Dangerous kicked off Michael Jackson\'s race paradox,"</a> <em>The Guardian</em>, 2018 </li><li>Cornel West, "A Matter of Life and Death," <em>October</em>, Vol. 61, 1992, p. 20</li><li>Maureen Down, <a href = "https://www.vanityfair.com/news/2017/03/elon-musk-billion-dollar-crusade-to-stop-ai-space-x" target = "_blank">"Elon Musk\'s Billion-Dollar Crusade to Stop the A.I. Apocalypse,"</a> <em>Vanity Fair</em>, 2017</li><li><a href = "https://www.google.com/search?q=metaphysics+of+dub&rlz=1C5CHFA_enUS689US690&oq=metaphysics+of+dub&aqs=chrome..69i57j0.3069j0j7&sourceid=chrome&ie=UTF-8" target = "_blank">"The Metaphysics of Dub,"</a> interview with Louid Chude-Sokei, <em>The Organist</em>, 2016</li><li><em>Ex Machina</em>, written and directed by Alex Garland, 2014</li></ol>';//essay part 2




works[9].html =  '<div id = "scroll" ><div id = "jenna" width = "100%" ><!--img src = "https://howshekilledit.com/noescapehole/assets/textlong.png" width = "100%"--></div></div>';
works[9].desc = "Digitally collaged to create an infinite unknowable conversation text is a painting that plays on the formal qualities and formality of the iMessage. Whether the text contained within the bubbles has been deleted, obscured, or simply forgotten is left unsaid. Scroll to your <3's content."; 
 //Jenna

works[9].onclick = function(){ //Jenna
	fullscreen(this.html);
	$('#scroll').scroll(function () {
		//var scroll = $('#scroll').scrollTop();
		var height = parseInt($('#jenna').css('height').substring(-2)) + 500; 
	
		$('#jenna').css('height', height); 
	//	alert(height); 
		//$('#scroll').append('<img src = "https://howshekilledit.com/noescapehole/assets/textlong.png" width = "100%" style = "margin-top:-8px">'); 
	});
	$(window).scroll(function () {
		//alert('scroll'); 
		//if($('body').html().indexOf('"scroll"')>-1){
			var height = parseInt($('#jenna').css('height').substring(-2)) + 500; 
			$('#jenna').css('height', height); 
			$('#scroll').css('height', height); 
		//}
		// Do something
	});
};


works[2].html = '<div style = "text-align:center;margin:auto; margin-top:100px" align = "center"><iframe src="https://editor.p5js.org/Hayley.H/embed/H1ZJhFWf4" id = "hay" ></div></iframe> </div>'; //Hayeon
works[2].onclick = function(){ //Hayeon
	fullscreen(this.html);
};

works[0].html = '<img class ="joo" src ="https://howshekilledit.com/noescapehole/assets/Water.gif" width = "100%"/><img class = "joo" src = "https://howshekilledit.com/noescapehole/assets/jootext.gif" width = "100%" />'+"<div class='embed-container' id = 'joocont' ><iframe src='https://player.vimeo.com/video/298800899?byline=false;title=false;portrait=false;' frameborder='0'  id = 'joovid' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>";  //Joo
works[0].onclick = function() {//start joo click
	fullscreen(this.html);
		
	$(audioElement).attr('id', 'jooaud'); 
	//var audioElement = $('#jooaud'); 
    audioElement.setAttribute('src', 'https://howshekilledit.com/noescapehole/assets/joosound.mp3');
	//while(current === 0){
		audioElement.play(); 
	//}
	fullscreen(this.html);
	 var iframe = document.querySelector('iframe');
    var player = new Vimeo.Player(iframe);
	//$('.joo').click(function(){
	 
    player.on('play', function() { // start play
		//alert($('body').html());
		//alert('clicked');
		audioElement.pause();
		//aud.currentTime = 0;
		}); //end play
	
};//end joo click
works[0].desc = "<p>Single-channel video, HD 3D animation, Color, Sound<br/>06:32 mins </p><p><em>The World Is Thin: Trembling Hill</em> is a work from an ongoing series of 3D animated scenarios exploring memory, violence, and recovery. The work focuses on a pigeon as both a living body that shares the public space with humans and an invisible witness to prevalent violence in a city. Starting with a catastrophic scene of mass pigeon death, viewers are invited to walk through the pigeon’s memory. In the latter part of the animation, the dead pigeon reaches to the hill of fragmented pigeon bodies. The series The World Is Thin is initiated from one question: If the world— made of images, fragments, constructs— is indeed thin, how can we explain the thick, opaque, heavy, and wet experience — the residue of trauma? The work was originally created as a three-channel video installation with an architectural intervention. "; 
 //Joo

works[4].html = "<div class='embed-container'><iframe src='https://player.vimeo.com/video/311920609?byline=false;title=false;portrait=false;autoplay=true' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>"
works[4].onclick = function() {
	fullscreen(this.html);
}; //David

works[10].html = '<video autoplay width="100%" controls><source src="https://howshekilledit.com/noescapehole/assets/chika-720.mp4" type="video/mp4">Your browser does not support the video tag.</video>';
works[10].onclick = function() {
	fullscreen(this.html);
}; //CHiKA, update her Google form

works[8].html = '<div class = "poems"><div id = "poem0" class = "poem" ><div class = "orig sent" id = "0-0" ></div></div><div id = "poem1" class = "poem" ><div class = "orig sent" id = "1-0" ></div></div><div id = "poem2"  class = "poem"><div class = "orig sent" id = "2-0" ></div></div></div>';

works[8].onclick = function(){newwindow('http://howshekilledit.com/algoform/holdyoumoldyou.html');};
/*works[8].onclick = function() {
	$('body').css('background-image', 'linear-gradient(to right, #FBD2D7, #FFB6C1');
		$('body').css('margin', '0');
	fullscreen(this.html);
	startpoems(q, a); 
		document.body.onkeyup = function(){
		$('body').css('background-image', 'none');
	};
}; //Morgan three*/
 
//aggregate descriptions into about
works[13].html = "<div class = 'essay' id = 'aboutpage'><h2 id = 'noescape'>No Escape Hole</h2><p><strong>Chicago</strong> Cat Bluemke, Jenna Boyles, Minsun Cho, Morgan Green, and Joo Young Lee</p><p><strong>Jersey City</strong> CHiKA, Hayeon Hwang, Tiri Kananuruk, Sebastian Morales, Michael Simpson, Yeseul Song, and David Temchulla</p><p>No Escape Hole is a browser-based online exhibition. The title refers to the group’s shared explorations into the consequences of digital media, and the tendency to view such technology as a means of escape from the tumultuous reality of everyday life. The browser frames a selection of works by Mana Contemporary’s New Media Residents from their Chicago and Jersey City art programs, which range from real-world site-specific installation, to singing bots and Twitch streams. Connected by their interrogations of digital culture, the work of No Escape Hole confronts how digital technology amplifies fear, intimacy, and permanence.</p><p>The works of Joo Young Lee, David Temchulla, and Yeseul Song are built up from images, only to break down their authority. Image processing is likewise explored in Song’s Rearranged, figurative in Lee’s The World is Thin, which uses 3D scanning and photogrammetry to create the setting of her narrative. </p><p>Meanwhile, Jenna Boyles, Minsun Cho, CHiKA, and Sebastian Morales explore the properties of networked communications. For Boyles, Cho and CHiKA, this communication involves human connection. Morales’ Simbiosis.live relies on the omnipresence of internet bots to maintain the life of single-cell organisms, in turn creating a symbiotic relationship that thrives alongside network activity.</p><p>Kananuruk’s DeepTalking uses deep learning to interpret human input into new narrative techniques. In Green’s Hold You Mold You the poetics of generative text are explored. Both Simpson and Bluemke pay homage to generative gameplay; Museum of Generative Artwork is a text-based adventure celebrating the gameplay of yesteryear, while the Stream Subjectivities series explores contemporary gaming culture. </p><p>The featured projects share common points of departure: the navigation of a society of images, generative content, and consequences of networked communication are themes of the artworks. No Escape Hole suggests that such technologies do not alleviate the anxieties of reality, but amplify it.</p> <p><a id = 'listworks'>List of Works</a></p><p><a id = 'bios'>Artist Bios</a></p><p><em>Website designed & built by Morgan Green</em></div>"; 




 
works[13].onclick = function() {//about click
	fullscreen(this.html);
	$('#listworks').click(function(){ //list click
		addback('?*13'); 
		var listworks = "";
		works.sort(function(a, b){//sort
	    var nameA=a.title.toLowerCase();
		nameB=b.title.toLowerCase();
	    if (nameA < nameB){
			return -1;
		}//sort string ascending
	    if (nameA > nameB){
			return 1;
		}
	    	return 0;
		});//end sort
		works.forEach(function(work, c){//each work
			if(work.artist != 'Mana New Media Residents'){
			listworks+="<div style = 'margin-bottom:35px'><p><strong>"+work.artist+", <em>"+work.title+"</em>, "+work.year+"</strong></p><p >"+work.desc+"</p></div>";
			}
			});//end each work
		
		$('.essay').html(listworks); 
		works.sort((a, b) => (a.ind> b.ind) ? 1 : -1)
	}); //end list click
	$('#bios').click(function(){ //bios click
		addback('?*13'); 
		var listbios = "";
		works.sort(function(a, b){//sort
	    var nameA=a.artist.toLowerCase();
		nameB=b.artist.toLowerCase();
	    if (nameA < nameB){
			return -1;
		}//sort string ascending
	    if (nameA > nameB){
			return 1;
		}
	    	return 0;
		});//end sort
		works.forEach(function(work, c){//each work
			if((work.artist != 'Mana New Media Residents') && (listbios.indexOf(work.artist) === -1)){
			listbios+="<p><strong>"+work.artist+"</strong> "+work.bio+"</p><p style = 'margin-bottom:35px'><a target = '_blank' href = '" + work.site +"'>"+work.site.substring(work.site.indexOf('//')+2)+"</a></p>";
			}
			});//end each work
		
		$('.essay').html(listbios); 
		works.sort((a, b) => (a.ind> b.ind) ? 1 : -1)
	}); //end bios click
}; //end about click

works[11].html = '<div class="embed-container"><iframe  style = "margin:auto" src="https://www.youtube.com/embed/videoseries?list=PLxPtJz-lqJMGWulkKBWgTttMnd9Z8CrIb" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
works[11].onclick = function() {
	fullscreen(this.html);
}; 
works[11].desc = "Stream Subjectivities is an ongoing performance series on the website Twitch(dot)tv. The platform hosts the live streaming of videogame play and development, and has grown the genre into a massive industry of amateur entertainers and precarious workers. How do we make sense of the stream? The project examines the digital material culture produced by social phenomenon, as the artist’s avatar BeigeCathy navigates the dystopian reality by live-developing her own augmented reality. ";
works[11].bio = "works through video games, performance, and expanded reality to explore the control and conflicts of labour and its relationship with technology. Graduating in 2018 with her MFA in Design for Emerging Technologies from the School of the Art Institute of Chicago, her practice uses technology to reimagine existing social relations and the future of work. Her work has been exhibited internationally at venues such as the the 2018 Venice Architecture Biennale, Kunsternes Hus (Norway), and the Museum of Contemporary Art (Chicago). She lives and works between Chicago, IL and Toronto, Canada.";
works[11].site = "http://www.catbluemke.com";
works[11].year = "2018-"; 

//cat


