// ----------------------------------------------
// Stand 22.10.2022 version 301 (veröffentlicht)
// script für QuickCheck Fragebogen
// Erweiterng um 5 weitere Kundendimensionen
// statische App

// ### INITIALIZATION 
// ----------------------------------------------
// ### VARIABLES
// Anzahl der Fragen i=15
//-----------------------------------------------
// User variables

// Function to download data to a file nachträglich eingeführt
function download(data, filename, type) {
    data="**** Download Quickcheck ******" +Date() + "\n\r"
    for (i=1;i<15;i++){
        datastring=document.getElementById("Q"+i).innerText
        pos=datastring.indexOf("sehr")
        datastring=datastring.substring(0,pos)
        for (j=0;j<4;j++){
            if (document.getElementsByName("F"+i)[j].checked==true) {
                antwort[j]=1
            }
            else {
                antwort[j]=0
            }
        }
        answer="Ihre Antwort : keine Angabe"
        if (antwort[0]==1) {answer="Ihre Antwort : sehr wichtig"}
        if (antwort[1]==1) {answer="Ihre Antwort : wichtig"}
        if (antwort[2]==1) {answer="Ihre Antwort : weniger wichtig"}
        if (antwort[3]==1) {answer="Ihre Antwort : unwichtig"}
        data=data+datastring + answer +"\n\r"
    }
    data=data + "****** Empfehlung QUICKCHEK ******" + "\n\r"

    for (i=0;i<18;i++){
        rang=document.getElementById("Rang"+i).value
        schnitt=document.getElementById("Schnitt"+i).value
        wert=document.getElementById("Wert"+i).value
        rat=document.getElementById("Rat"+i).value
        if (schnitt.length<7){
                data=data +"\n\r" + rang + "\t" + schnitt +"\t"+ "\t"+"\t"+ wert+ "\t" + rat
                }
        if (schnitt.length>6 & schnitt.length<16) {
                data=data +"\n\r" + rang + "\t" + schnitt + "\t" + "\t" + wert+ "\t" + rat   
            }
        if (schnitt.length>15) {
                data=data +"\n\r" + rang + "\t" + schnitt + "\t"+ wert+ "\t" + rat   
            }
    }
    
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
//********************************************* */

var antwort=[]
var sum=[]
var sum_max=[]
var ergebnis=[]
// Bewertungsmatrix
bewertung=[
	[2,0,0,3,3,0,1,1,3,3,1,0,2,2,2,3,3,0,0,3,2,1,0],
	[2,2,3,3,3,1,3,3,1,2,3,0,1,3,3,3,3,2,3,1,1,3,3],
	[1,2,3,0,0,1,3,2,1,0,2,2,2,2,2,3,1,3,0,0,1,2,3],
    [2,1,0,3,3,3,2,1,2,1,2,2,3,3,3,1,3,1,2,3,2,2,2],
    [3,1,2,2,0,1,2,1,1,0,2,2,3,2,2,2,0,2,0,1,3,3,3],
    [2,1,2,2,1,2,1,2,3,2,2,1,2,2,3,2,1,1,1,2,3,2,2],
    [1,2,1,2,2,1,1,3,1,2,3,2,2,3,2,3,2,1,1,1,2,2,2],
	[2,0,0,2,0,2,3,0,1,1,2,1,2,3,2,1,2,1,0,2,2,1,2],
	[2,3,1,0,1,1,1,3,0,2,2,2,2,2,2,2,1,1,0,2,2,2,3],
	[2,0,0,3,3,0,3,0,0,2,2,1,2,1,3,0,2,1,2,0,2,2,1],
	[0,0,0,2,0,2,1,0,2,2,2,2,2,2,1,2,1,2,0,0,0,2,1],
	[0,0,0,2,2,0,3,0,0,1,2,0,2,3,2,0,2,2,1,0,0,2,2],
	[0,3,3,0,2,3,3,2,2,1,1,3,1,0,0,2,0,2,0,3,0,0,1],
	[0,3,1,1,2,2,0,2,3,1,1,3,2,1,1,1,0,2,0,3,0,2,1]
   ];   
kriterien=["Augmented Reality","Bewertungsportale","Blogs", "Chatbots","Digitale Bezahlsysteme",
"Emails","externer E-Marketplace","Foren","Instant Messenger","Live-Chat","Mobile Apps","Newsletter (Email)","Online-Messen",
"eigener Online-Shop","Service-Plattformen","Social Media","Sprachassistenten","SEM (Suchmaschinen-Marketing",
"Track and Trace (Sendungsverfolgung)","Videokonferenzen-Tool","Virtual Reality","Virtual Showroom","Website"]
// ----------------------------------------------
// ### FUNCTIONS 
// ----------------------------------------------
function weiter(){
    console.log("funktion weiter aufgerufen")
}

function function_back_to_question(){
    console.log("back to question")
    window.scrollTo(0,760);
}

function initialize_page() { 
	// Initialize buttons
	// button1: Fragebogen zurücksetzten -> mode="default"
	// button2: Fragebogen auswerten -> mode="check" -> mode="asses"
	//document.getElementById('check').innerText="starten"
	//document.getElementById('F1A').checked=true

	document.getElementById("check").value="Es sind 14 Fragen zu beantworten"
	document.getElementById("check1").value="Es sind 14 Fragen zu beantworten"
	document.getElementById("F1A").checked=false
	document.getElementById("F1B").checked=false
	document.getElementById("F1C").checked=false
	document.getElementById("F1D").checked=false
	document.getElementById("F2A").checked=false
	document.getElementById("F2B").checked=false
	document.getElementById("F2C").checked=false
	document.getElementById("F2D").checked=false
	document.getElementById("F3A").checked=false
	document.getElementById("F3B").checked=false
	document.getElementById("F3C").checked=false
	document.getElementById("F3D").checked=false
	document.getElementById("F4A").checked=false
	document.getElementById("F4B").checked=false
	document.getElementById("F4C").checked=false
	document.getElementById("F4D").checked=false
	document.getElementById("F5A").checked=false
	document.getElementById("F5B").checked=false
	document.getElementById("F5C").checked=false
	document.getElementById("F5D").checked=false
	document.getElementById("F6A").checked=false
	document.getElementById("F6B").checked=false
	document.getElementById("F6C").checked=false
	document.getElementById("F6D").checked=false
	document.getElementById("F7A").checked=false
	document.getElementById("F7B").checked=false
	document.getElementById("F7C").checked=false
	document.getElementById("F7D").checked=false
	document.getElementById("F8A").checked=false
	document.getElementById("F8B").checked=false
	document.getElementById("F8C").checked=false
	document.getElementById("F8D").checked=false
	document.getElementById("F9A").checked=false
	document.getElementById("F9B").checked=false
	document.getElementById("F9C").checked=false
	document.getElementById("F9D").checked=false
	document.getElementById("F10A").checked=false
	document.getElementById("F10B").checked=false
	document.getElementById("F10C").checked=false
	document.getElementById("F10D").checked=false
	document.getElementById("F11A").checked=false
	document.getElementById("F11B").checked=false
	document.getElementById("F11C").checked=false
	document.getElementById("F11D").checked=false
	document.getElementById("F12A").checked=false
	document.getElementById("F12B").checked=false
	document.getElementById("F12C").checked=false
	document.getElementById("F12D").checked=false
	document.getElementById("F13A").checked=false
	document.getElementById("F13B").checked=false
	document.getElementById("F13C").checked=false
	document.getElementById("F13D").checked=false
	document.getElementById("F14A").checked=false
	document.getElementById("F14B").checked=false
	document.getElementById("F14C").checked=false
	document.getElementById("F14D").checked=false
	
	for (i=0;i<18;i++){
        feld="Rang"+i
        document.getElementById("feld").style.backgroundColor="floralwhite"
        feld="Rat"+i
        document.getElementById("feld").style.backgroundColor="floralwhite"
        feld="Schnitt"+i
        document.getElementById("feld").style.backgroundColor="floralwhite"
        feld="Wert"+i
        document.getElementById("feld").style.backgroundColor="floralwhite"
    }
}

// Initialize buttons
//$('#button2').html("  Next Question  ")
// $('#button2').on("click", function() {
function function_button2() {
    window.scrollTo(0,780)
	document.getElementById("check").value="alle Antworten zurückgesetzt"
	document.getElementById("check1").value="alle Antworten zurückgesetzt"
	document.getElementById("F1A").checked=false
	document.getElementById("F1B").checked=false
	document.getElementById("F1C").checked=false
	document.getElementById("F1D").checked=false
	document.getElementById("F2A").checked=false
	document.getElementById("F2B").checked=false
	document.getElementById("F2C").checked=false
	document.getElementById("F2D").checked=false
	document.getElementById("F3A").checked=false
	document.getElementById("F3B").checked=false
	document.getElementById("F3C").checked=false
	document.getElementById("F3D").checked=false
	document.getElementById("F4A").checked=false
	document.getElementById("F4B").checked=false
	document.getElementById("F4C").checked=false
	document.getElementById("F4D").checked=false
	document.getElementById("F5A").checked=false
	document.getElementById("F5B").checked=false
	document.getElementById("F5C").checked=false
	document.getElementById("F5D").checked=false
	document.getElementById("F6A").checked=false
	document.getElementById("F6B").checked=false
	document.getElementById("F6C").checked=false
	document.getElementById("F6D").checked=false
	document.getElementById("F7A").checked=false
	document.getElementById("F7B").checked=false
	document.getElementById("F7C").checked=false
	document.getElementById("F7D").checked=false
	document.getElementById("F8A").checked=false
	document.getElementById("F8B").checked=false
	document.getElementById("F8C").checked=false
	document.getElementById("F8D").checked=false
	document.getElementById("F9A").checked=false
	document.getElementById("F9B").checked=false
	document.getElementById("F9C").checked=false
	document.getElementById("F9D").checked=false
	document.getElementById("F10A").checked=false
	document.getElementById("F10B").checked=false
	document.getElementById("F10C").checked=false
	document.getElementById("F10D").checked=false
	document.getElementById("F11A").checked=false
	document.getElementById("F11B").checked=false
	document.getElementById("F11C").checked=false
	document.getElementById("F11D").checked=false
	document.getElementById("F12A").checked=false
	document.getElementById("F12B").checked=false
	document.getElementById("F12C").checked=false
	document.getElementById("F12D").checked=false
	document.getElementById("F13A").checked=false
	document.getElementById("F13B").checked=false
	document.getElementById("F13C").checked=false
	document.getElementById("F13D").checked=false
	document.getElementById("F14A").checked=false
	document.getElementById("F14B").checked=false
	document.getElementById("F14C").checked=false
    document.getElementById("F14D").checked=false
    // set default color
    document.getElementById("Q1").style.backgroundColor="floralwhite"
    document.getElementById("Q2").style.backgroundColor="floralwhite"
    document.getElementById("Q3").style.backgroundColor="floralwhite"
    document.getElementById("Q4").style.backgroundColor="floralwhite"
    document.getElementById("Q5").style.backgroundColor="floralwhite"
    document.getElementById("Q6").style.backgroundColor="floralwhite"
    document.getElementById("Q7").style.backgroundColor="floralwhite"
    document.getElementById("Q8").style.backgroundColor="floralwhite"
    document.getElementById("Q9").style.backgroundColor="floralwhite"
    document.getElementById("Q10").style.backgroundColor="floralwhite"
    document.getElementById("Q11").style.backgroundColor="floralwhite"
    document.getElementById("Q12").style.backgroundColor="floralwhite"
    document.getElementById("Q13").style.backgroundColor="floralwhite"
    document.getElementById("Q14").style.backgroundColor="floralwhite"	
    
    for (i=0;i<18;i++){
        feld="Rang"+i
        document.getElementById("feld").style.backgroundColor="floralwhite"
        feld="Rat"+i
        document.getElementById("feld").style.backgroundColor="floralwhite"
        feld="Schnitt"+i
        document.getElementById("feld").style.backgroundColor="floralwhite"
        feld="Wert"+i
        document.getElementById("feld").style.backgroundColor="floralwhite"
    }
}    

// gotostart  buttons
//$('#button0').html("  scroll down to quickcheck questionaire  ")
function function_button0() {
	window.scrollBy({ top: 750, left: 0, behavior: "smooth" })	
}

// Initialize buttons
//$('#button1').html("  Next Question  ")
//$('#button1').on("click", function() {
function count() {

    j=0
	document.getElementById('check').value="Bitte die 14 Fragen beantworten"
	document.getElementById('check1').value="Bitte die 14 Fragen beantworten"
	for (var i = 1; i <= 14; i++){
			antwort[i]=1
    }
    // set default color
    document.getElementById("Q1").style.backgroundColor="floralwhite"
    document.getElementById("Q2").style.backgroundColor="floralwhite"
    document.getElementById("Q3").style.backgroundColor="floralwhite"
    document.getElementById("Q4").style.backgroundColor="floralwhite"
    document.getElementById("Q5").style.backgroundColor="floralwhite"
    document.getElementById("Q6").style.backgroundColor="floralwhite"
    document.getElementById("Q7").style.backgroundColor="floralwhite"
    document.getElementById("Q8").style.backgroundColor="floralwhite"
    document.getElementById("Q9").style.backgroundColor="floralwhite"
    document.getElementById("Q10").style.backgroundColor="floralwhite"
    document.getElementById("Q11").style.backgroundColor="floralwhite"
    document.getElementById("Q12").style.backgroundColor="floralwhite"
    document.getElementById("Q13").style.backgroundColor="floralwhite"
    document.getElementById("Q14").style.backgroundColor="floralwhite"


    // test ob alle Fragen beantwortet muss getriggert werden durch neue Eingabe
		if (document.getElementsByName("F1")[0].checked==false && document.getElementsByName("F1")[1].checked==false && document.getElementsByName("F1")[2].checked==false && document.getElementsByName("F1")[3].checked==false) {
        	antwort[1]=0
        	document.getElementById("Q1").style.backgroundColor="lightpink"
    	}
	
    	if (document.getElementsByName("F2")[0].checked==false && document.getElementsByName("F2")[1].checked==false && document.getElementsByName("F2")[2].checked==false && document.getElementsByName("F2")[3].checked==false) {
        	antwort[2]=0
        	document.getElementById("Q2").style.backgroundColor="lightpink"        
    	}

    	if (document.getElementsByName("F3")[0].checked==false && document.getElementsByName("F3")[1].checked==false && document.getElementsByName("F3")[2].checked==false && document.getElementsByName("F3")[3].checked==false) {
        	antwort[3]=0
        	document.getElementById("Q3").style.backgroundColor="lightpink" 
    	}

    	if (document.getElementsByName("F4")[0].checked==false && document.getElementsByName("F4")[1].checked==false && document.getElementsByName("F4")[2].checked==false && document.getElementsByName("F4")[3].checked==false) {
        	antwort[4]=0
        	document.getElementById("Q4").style.backgroundColor="lightpink" 
    	}

    	if (document.getElementsByName("F5")[0].checked==false && document.getElementsByName("F5")[1].checked==false && document.getElementsByName("F5")[2].checked==false && document.getElementsByName("F5")[3].checked==false) {
        	antwort[5]=0
        	document.getElementById("Q5").style.backgroundColor="lightpink" 
    	}

    	if (document.getElementsByName("F6")[0].checked==false && document.getElementsByName("F6")[1].checked==false && document.getElementsByName("F6")[2].checked==false && document.getElementsByName("F6")[3].checked==false) {
        	antwort[6]=0
        	document.getElementById("Q6").style.backgroundColor="lightpink" 
    	}
 
    	if (document.getElementsByName("F7")[0].checked==false && document.getElementsByName("F7")[1].checked==false && document.getElementsByName("F7")[2].checked==false && document.getElementsByName("F7")[3].checked==false) {
        	antwort[7]=0
        	document.getElementById("Q7").style.backgroundColor="lightpink" 
    	}
	
    	if (document.getElementsByName("F8")[0].checked==false && document.getElementsByName("F8")[1].checked==false && document.getElementsByName("F8")[2].checked==false && document.getElementsByName("F8")[3].checked==false) {
        	antwort[8]=0
        	document.getElementById("Q8").style.backgroundColor="lightpink" 
    	}
	
    	if (document.getElementsByName("F9")[0].checked==false && document.getElementsByName("F9")[1].checked==false && document.getElementsByName("F9")[2].checked==false && document.getElementsByName("F9")[3].checked==false) {
        	antwort[9]=0
        	document.getElementById("Q9").style.backgroundColor="lightpink" 
    	}
	
    	if (document.getElementsByName("F10")[0].checked==false && document.getElementsByName("F10")[1].checked==false && document.getElementsByName("F10")[2].checked==false && document.getElementsByName("F10")[3].checked==false) {
        	antwort[10]=0
        	document.getElementById("Q10").style.backgroundColor="lightpink" 
    	}
	
    	if (document.getElementsByName("F11")[0].checked==false && document.getElementsByName("F11")[1].checked==false && document.getElementsByName("F11")[2].checked==false && document.getElementsByName("F11")[3].checked==false) {
        	antwort[11]=0
        	document.getElementById("Q11").style.backgroundColor="lightpink" 
    	}

    	if (document.getElementsByName("F12")[0].checked==false && document.getElementsByName("F12")[1].checked==false && document.getElementsByName("F12")[2].checked==false && document.getElementsByName("F12")[3].checked==false) {
        	antwort[12]=0
        	document.getElementById("Q12").style.backgroundColor="lightpink" 
    	}

    	if (document.getElementsByName("F13")[0].checked==false && document.getElementsByName("F13")[1].checked==false && document.getElementsByName("F13")[2].checked==false && document.getElementsByName("F13")[3].checked==false) {
        	antwort[13]=0
        	document.getElementById("Q13").style.backgroundColor="lightpink" 
    	}

    	if (document.getElementsByName("F14")[0].checked==false && document.getElementsByName("F14")[1].checked==false && document.getElementsByName("F14")[2].checked==false && document.getElementsByName("F14")[3].checked==false) {
        	antwort[14]=0
        	document.getElementById("Q14").style.backgroundColor="lightpink" 
    	}
		// anzeige der fehlenden Fragen
		// var j=0
		check_string=""
		for (var i = 1; i <= 14; i++){
			if (antwort[i]==0){
				check_string=check_string + antwort[i]
				j=j+1
			}
		}
        
	// loopuntil all questions checked
	// *******************************

	if (j>0){
		document.getElementById('check').value="Bislang " + (14- j) + " Fragen von 14 beantworten"
		document.getElementById('check1').value="Bislang " + (14- j) + " Fragen von 14 beantworten"
		}
	else{
        document.getElementById('check').value="alle Fragen ok "
		document.getElementById('check1').value="alle Fragen ok "

	// identifikation der Antwort und Anzeigen und sprung zu Result
	// target = "#Result";
	// $('html,body').animate({scrollTop: $(target)},'slow');
		//window.scrollBy({ top: 600, left: 0, behavior: "smooth" })
		window.scrollTo(0,2875)
		for (i=0;i<4;i++){
			if (document.getElementsByName("F1")[i].checked==true) {
				antwort[1]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F2")[i].checked==true) {
				antwort[2]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F3")[i].checked==true) {
				antwort[3]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F4")[i].checked==true) {
				antwort[4]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F5")[i].checked==true) {
				antwort[5]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F6")[i].checked==true) {
				antwort[6]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F7")[i].checked==true) {
				antwort[7]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F8")[i].checked==true) {
				antwort[8]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F9")[i].checked==true) {
				antwort[9]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F10")[i].checked==true) {
				antwort[10]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F11")[i].checked==true) {
				antwort[11]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F12")[i].checked==true) {
				antwort[12]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F13")[i].checked==true) {
				antwort[13]=i}
			}
		for (i=0;i<4;i++){
			if (document.getElementsByName("F14")[i].checked==true) {
				antwort[14]=i}
			}
		for (i=1;i<15;i++){
				if (antwort[i]==0) {antwort[i]=6}
				if (antwort[i]==1) {antwort[i]=4}
				if (antwort[i]==2) {antwort[i]=2}
				if (antwort[i]==3) {antwort[i]=0}
			}
		// erweiterung auf 23 Kundendimensioen
		for (i=0;i<23;i++){
			sum[i]=0
			sum_max[i]=0
			for (ij=1;ij<15;ij++){
				sum[i]=sum[i]+antwort[ij]*bewertung[ij-1][i]
				sum_max[i]=sum_max[i]+6*bewertung[ij-1][i]}
		}

		console.log(" antwort: ",antwort, "sum", sum," sum_max ", sum_max)

		// Bestimmung des %-Erfüllungsgrades
		for (i=0;i<23;i++){
			ergebnis[i]=sum[i]/sum_max[i]
        }	

        // kopieren in mehrdimensionale Matrix
        var ergebnis_matrix = new Array(23);

        for (var i = 0; i < 23; i++) {
            ergebnis_matrix[i] = new Array(3);
        }
        
        for (i=0;i<23;i++){
                ergebnis_matrix[i][0]=kriterien[i]
                wert=ergebnis[i]*100   
                ergebnis_matrix[i][1]=wert
                if (wert>=80) {
                    ergebnis_matrix[i][2]= "Sehr empfehlenswert"
                }
                if (wert<80) {
                    ergebnis_matrix[i][2]= "empfehlenswert"
                }
                if (wert<65) {
                    ergebnis_matrix[i][2]= "bedingt empfehlenswert"
                }
                if (wert<50) {
                    ergebnis_matrix[i][2]= "eher uninteressant"
                }
        }
        console.log("ergebnis ", ergebnis_matrix)

        // Sortierung der Rangfolge (Größe) nach
		ergebnis_matrix.sort(function(a,b){
            return b[1]-a[1]
        })
        // empfehlung und farbige Markierung
        
        console.log("ergebnis ", ergebnis)
		for (i=0;i<18;i++){
			feld="Rang"+i
			document.getElementById(feld).value=i+1
			feld="Schnitt"+i
			document.getElementById(feld).value=ergebnis_matrix[i][0]
            feld="Wert"+i
            wert=ergebnis_matrix[i][1]
            document.getElementById(feld).value=wert.toFixed(1) + "% der möglichen Punkte"
            feld="Rat"+i
            document.getElementById(feld).value=ergebnis_matrix[i][2]
        }
        for (i=0;i<23;i++){
            feld="Rat"+i
            if (document.getElementById(feld).value=="Sehr empfehlenswert")
            {
                document.getElementById(feld).style.backgroundColor='rgb(146,208,63)'
                feld="Schnitt"+i
                document.getElementById(feld).style.backgroundColor='rgb(146,208,63)'
                feld="Wert"+i
                document.getElementById(feld).style.backgroundColor='rgb(146,208,63)'
                feld="Rang"+i
                document.getElementById(feld).style.backgroundColor='rgb(146,208,63)'
            }
            feld="Rat"+i
            if (document.getElementById(feld).value=="empfehlenswert")
            {
                document.getElementById(feld).style.backgroundColor='rgb(197,224,180)'
                feld="Schnitt"+i
                document.getElementById(feld).style.backgroundColor='rgb(197,224,180)'
                feld="Wert"+i
                document.getElementById(feld).style.backgroundColor='rgb(197,224,180)'
                feld="Rang"+i
                document.getElementById(feld).style.backgroundColor='rgb(197,224,180)'   
            }	
            feld="Rat"+i
            if (document.getElementById(feld).value=="bedingt empfehlenswert")
            {
                document.getElementById(feld).style.backgroundColor='rgb(251,229,214)'
                feld="Schnitt"+i
                document.getElementById(feld).style.backgroundColor='rgb(251,229,214)'
                feld="Wert"+i
                document.getElementById(feld).style.backgroundColor='rgb(251,229,214)'
                feld="Rang"+i
                document.getElementById(feld).style.backgroundColor='rgb(251,229,214)'
            }
            feld="Rat"+i
            if (document.getElementById(feld).value=="eher uninteressant")
            {
                document.getElementById(feld).style.backgroundColor='rgb(248,203,173)'
                feld="Schnitt"+i
                document.getElementById(feld).style.backgroundColor='rgb(248,203,173)'
                feld="Wert"+i
                document.getElementById(feld).style.backgroundColor='rgb(248,203,173)'
                feld="Rang"+i
                document.getElementById(feld).style.backgroundColor='rgb(248,203,173)'
            }
		}

	}
}

// check for  results buttons
// $('#button2').on("click", function() {
	function function_button1() {
		j=0
		document.getElementById('check').value="Bitte die 14 Fragen beantworten"
		document.getElementById('check1').value="Bitte die 14 Fragen beantworten"
		for (var i = 1; i <= 14; i++){
				antwort[i]=1
		}
        window.scrollTo(0,780)
		// set default color
		document.getElementById("Q1").style.backgroundColor="floralwhite"
		document.getElementById("Q2").style.backgroundColor="floralwhite"
		document.getElementById("Q3").style.backgroundColor="floralwhite"
		document.getElementById("Q4").style.backgroundColor="floralwhite"
		document.getElementById("Q5").style.backgroundColor="floralwhite"
		document.getElementById("Q6").style.backgroundColor="floralwhite"
		document.getElementById("Q7").style.backgroundColor="floralwhite"
		document.getElementById("Q8").style.backgroundColor="floralwhite"
		document.getElementById("Q9").style.backgroundColor="floralwhite"
		document.getElementById("Q10").style.backgroundColor="floralwhite"
		document.getElementById("Q11").style.backgroundColor="floralwhite"
		document.getElementById("Q12").style.backgroundColor="floralwhite"
		document.getElementById("Q13").style.backgroundColor="floralwhite"
		document.getElementById("Q14").style.backgroundColor="floralwhite"
	
	
		// test ob alle Fragen beantwortet muss getriggert werden durch neue Eingabe
			if (document.getElementsByName("F1")[0].checked==false && document.getElementsByName("F1")[1].checked==false && document.getElementsByName("F1")[2].checked==false && document.getElementsByName("F1")[3].checked==false) {
				antwort[1]=0
				document.getElementById("Q1").style.backgroundColor="lightpink"
			}
		
			if (document.getElementsByName("F2")[0].checked==false && document.getElementsByName("F2")[1].checked==false && document.getElementsByName("F2")[2].checked==false && document.getElementsByName("F2")[3].checked==false) {
				antwort[2]=0
				document.getElementById("Q2").style.backgroundColor="lightpink"        
			}
	
			if (document.getElementsByName("F3")[0].checked==false && document.getElementsByName("F3")[1].checked==false && document.getElementsByName("F3")[2].checked==false && document.getElementsByName("F3")[3].checked==false) {
				antwort[3]=0
				document.getElementById("Q3").style.backgroundColor="lightpink" 
			}
	
			if (document.getElementsByName("F4")[0].checked==false && document.getElementsByName("F4")[1].checked==false && document.getElementsByName("F4")[2].checked==false && document.getElementsByName("F4")[3].checked==false) {
				antwort[4]=0
				document.getElementById("Q4").style.backgroundColor="lightpink" 
			}
	
			if (document.getElementsByName("F5")[0].checked==false && document.getElementsByName("F5")[1].checked==false && document.getElementsByName("F5")[2].checked==false && document.getElementsByName("F5")[3].checked==false) {
				antwort[5]=0
				document.getElementById("Q5").style.backgroundColor="lightpink" 
			}
	
			if (document.getElementsByName("F6")[0].checked==false && document.getElementsByName("F6")[1].checked==false && document.getElementsByName("F6")[2].checked==false && document.getElementsByName("F6")[3].checked==false) {
				antwort[6]=0
				document.getElementById("Q6").style.backgroundColor="lightpink" 
			}
	 
			if (document.getElementsByName("F7")[0].checked==false && document.getElementsByName("F7")[1].checked==false && document.getElementsByName("F7")[2].checked==false && document.getElementsByName("F7")[3].checked==false) {
				antwort[7]=0
				document.getElementById("Q7").style.backgroundColor="lightpink" 
			}
		
			if (document.getElementsByName("F8")[0].checked==false && document.getElementsByName("F8")[1].checked==false && document.getElementsByName("F8")[2].checked==false && document.getElementsByName("F8")[3].checked==false) {
				antwort[8]=0
				document.getElementById("Q8").style.backgroundColor="lightpink" 
			}
		
			if (document.getElementsByName("F9")[0].checked==false && document.getElementsByName("F9")[1].checked==false && document.getElementsByName("F9")[2].checked==false && document.getElementsByName("F9")[3].checked==false) {
				antwort[9]=0
				document.getElementById("Q9").style.backgroundColor="lightpink" 
			}
		
			if (document.getElementsByName("F10")[0].checked==false && document.getElementsByName("F10")[1].checked==false && document.getElementsByName("F10")[2].checked==false && document.getElementsByName("F10")[3].checked==false) {
				antwort[10]=0
				document.getElementById("Q10").style.backgroundColor="lightpink" 
			}
		
			if (document.getElementsByName("F11")[0].checked==false && document.getElementsByName("F11")[1].checked==false && document.getElementsByName("F11")[2].checked==false && document.getElementsByName("F11")[3].checked==false) {
				antwort[11]=0
				document.getElementById("Q11").style.backgroundColor="lightpink" 
			}
	
			if (document.getElementsByName("F12")[0].checked==false && document.getElementsByName("F12")[1].checked==false && document.getElementsByName("F12")[2].checked==false && document.getElementsByName("F12")[3].checked==false) {
				antwort[12]=0
				document.getElementById("Q12").style.backgroundColor="lightpink" 
			}
	
			if (document.getElementsByName("F13")[0].checked==false && document.getElementsByName("F13")[1].checked==false && document.getElementsByName("F13")[2].checked==false && document.getElementsByName("F13")[3].checked==false) {
				antwort[13]=0
				document.getElementById("Q13").style.backgroundColor="lightpink" 
			}
	
			if (document.getElementsByName("F14")[0].checked==false && document.getElementsByName("F14")[1].checked==false && document.getElementsByName("F14")[2].checked==false && document.getElementsByName("F14")[3].checked==false) {
				antwort[14]=0
				document.getElementById("Q14").style.backgroundColor="lightpink" 
			}
			// anzeige der fehlenden Fragen
			// var j=0
			check_string=""
			for (var i = 1; i <= 14; i++){
				if (antwort[i]==0){
					check_string=check_string + antwort[i]
					j=j+1
				}
			}
			
		// loopuntil all questions checked
		// *******************************
	
		if (j>0){
			document.getElementById('check').value="Bislang " + (14- j) + " Fragen von 14 beantworten"
			document.getElementById('check1').value="Bislang " + (14- j) + " Fragen von 14 beantworten"
			}
		else{
			document.getElementById('check').value="alle Fragen ok "
			document.getElementById('check1').value="alle Fragen ok "
		// identifikation der Antwort und Anzeigen und sprung zu Result
		// target = "#Result";
		// $('html,body').animate({scrollTop: $(target)},'slow');
			//window.scrollBy({ top: 600, left: 0, behavior: "smooth" })
			window.scrollTo(0,2875)
			for (i=0;i<4;i++){
				if (document.getElementsByName("F1")[i].checked==true) {
					antwort[1]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F2")[i].checked==true) {
					antwort[2]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F3")[i].checked==true) {
					antwort[3]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F4")[i].checked==true) {
					antwort[4]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F5")[i].checked==true) {
					antwort[5]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F6")[i].checked==true) {
					antwort[6]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F7")[i].checked==true) {
					antwort[7]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F8")[i].checked==true) {
					antwort[8]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F9")[i].checked==true) {
					antwort[9]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F10")[i].checked==true) {
					antwort[10]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F11")[i].checked==true) {
					antwort[11]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F12")[i].checked==true) {
					antwort[12]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F13")[i].checked==true) {
					antwort[13]=i}
				}
			for (i=0;i<4;i++){
				if (document.getElementsByName("F14")[i].checked==true) {
					antwort[14]=i}
				}
			for (i=1;i<15;i++){
					if (antwort[i]==0) {antwort[i]=6}
					if (antwort[i]==1) {antwort[i]=4}
					if (antwort[i]==2) {antwort[i]=2}
					if (antwort[i]==3) {antwort[i]=0}
				}
			for (i=0;i<23;i++){
				sum[i]=0
				sum_max[i]=0
				for (ij=1;ij<15;ij++){
					sum[i]=sum[i]+antwort[ij]*bewertung[ij-1][i]
					sum_max[i]=sum_max[i]+6*bewertung[ij-1][i]}
			}
	
			console.log(" antwort: ",antwort, "sum", sum," sum_max ", sum_max)
	
			// Bestimmung des %-Erfüllungsgrades
			for (i=0;i<23;i++){
				ergebnis[i]=sum[i]/sum_max[i]
			}	
	
			// kopieren in mehrdimensionale Matrix
			var ergebnis_matrix = new Array(18);
	
			for (var i = 0; i < 23; i++) {
				ergebnis_matrix[i] = new Array(3);
			}
			
			for (i=0;i<23;i++){
					ergebnis_matrix[i][0]=kriterien[i]
					wert=ergebnis[i]*100   
					ergebnis_matrix[i][1]=wert
					if (wert>=80) {
						ergebnis_matrix[i][2]= "Sehr empfehlenswert"
					}
					if (wert<80) {
						ergebnis_matrix[i][2]= "empfehlenswert"
					}
					if (wert<65) {
						ergebnis_matrix[i][2]= "bedingt empfehlenswert"
					}
					if (wert<50) {
						ergebnis_matrix[i][2]= "eher uninteressant"
					}
			}

			// Sortierung der Rangfolge (Größe) nach
			ergebnis_matrix.sort(function(a,b){
				return b[1]-a[1]
			})
			// empfehlung und farbige Markierung
			
			console.log("ergebnis ", ergebnis)
			for (i=0;i<23;i++){
				feld="Rang"+i
				document.getElementById(feld).value=i+1
				feld="Schnitt"+i
				document.getElementById(feld).value=ergebnis_matrix[i][0]
				feld="Wert"+i
				wert=ergebnis_matrix[i][1]
				document.getElementById(feld).value=wert.toFixed(1) + "% der möglichen Punkte"
				feld="Rat"+i
				document.getElementById(feld).value=ergebnis_matrix[i][2]
			}
			for (i=0;i<23;i++){
				feld="Rat"+i
				if (document.getElementById(feld).value=="Sehr empfehlenswert")
				{
					document.getElementById(feld).style.backgroundColor='rgb(146,208,63)'
					feld="Schnitt"+i
					document.getElementById(feld).style.backgroundColor='rgb(146,208,63)'
					feld="Wert"+i
					document.getElementById(feld).style.backgroundColor='rgb(146,208,63)'
					feld="Rang"+i
					document.getElementById(feld).style.backgroundColor='rgb(146,208,63)'
				}
				feld="Rat"+i
				if (document.getElementById(feld).value=="empfehlenswert")
				{
					document.getElementById(feld).style.backgroundColor='rgb(197,224,180)'
					feld="Schnitt"+i
					document.getElementById(feld).style.backgroundColor='rgb(197,224,180)'
					feld="Wert"+i
					document.getElementById(feld).style.backgroundColor='rgb(197,224,180)'
					feld="Rang"+i
					document.getElementById(feld).style.backgroundColor='rgb(197,224,180)'   
				}	
				feld="Rat"+i
				if (document.getElementById(feld).value=="bedingt empfehlenswert")
				{
					document.getElementById(feld).style.backgroundColor='rgb(251,229,214)'
					feld="Schnitt"+i
					document.getElementById(feld).style.backgroundColor='rgb(251,229,214)'
					feld="Wert"+i
					document.getElementById(feld).style.backgroundColor='rgb(251,229,214)'
					feld="Rang"+i
					document.getElementById(feld).style.backgroundColor='rgb(251,229,214)'
				}
				feld="Rat"+i
				if (document.getElementById(feld).value=="eher uninteressant")
				{
					document.getElementById(feld).style.backgroundColor='rgb(248,203,173)'
					feld="Schnitt"+i
					document.getElementById(feld).style.backgroundColor='rgb(248,203,173)'
					feld="Wert"+i
					document.getElementById(feld).style.backgroundColor='rgb(248,203,173)'
					feld="Rang"+i
					document.getElementById(feld).style.backgroundColor='rgb(248,203,173)'
				}
			}
	
		}

}

// ----------------------------------------
// ### EXECUTE 
// ----------------------------------------
initialize_page() 
// (B) WRITE TO FILE
fs.writeFile("FOOBAR.txt", "Foo bar!", "utf8", function(error, data){
  console.log("Write complete");
  console.log(error);
  console.log(data);
});

// ---------------------------------------
