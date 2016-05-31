$(document).ready(function()
{
	//setup jquery widgets
	$("#date").datepicker().datepicker("setDate", new Date());
	$("#submitFlight").button();
	$("#exitProgram").button();
	$("#hoursAccordion").accordion();
	$("#aircraftHoursTabs").tabs();
	$("#myAircraftTabs").tabs();

	//setup input fields
	//var todaysDate = new Date();
	//var todaysDateString = todaysDate.getUTCDate() + "/" + (todaysDate.getUTCMonth() + 1) + "/" + todaysDate.getUTCFullYear();
	//console.log(" date: " + todaysDateString);
	//$("#date").val(todaysDateString);

	//load flight hours
	$.getJSON("getHours", function(result){
		$.each(result, function(i, field)
		{
			console.log("i: " + i + " field: " + field);

			//flight hours
			if(i == "totalFlightHours")
			{
				$("#" + i).text("Flight Hours: " + field.toFixed(1));
			}
			else if(i == "primaryHours")
			{
				$("#" + i).text("PIC: " + field.toFixed(1));
			}
			else if(i == "secondaryHours")
			{
				$("#" + i).text("SIC: " + field.toFixed(1));
			}
			else if(i == "instructorHours")
			{
				$("#" + i).text("Instructor: " + field.toFixed(1));
			}
			else if(i == "evaluatorHours")
			{
				$("#" + i).text("Evaluator: " + field.toFixed(1));
			}
			else if(i == "instrumentHours")
			{
				$("#" + i).text("Instrument: " + field.toFixed(1));
			}
			else if(i == "dualReceivedHours")
			{
				$("#" + i).text("Dual Received: " + field.toFixed(1));
			}
			else if(i == "nightHours")
			{
				$("#" + i).text("Night: " + field.toFixed(1));	
			}
			else if(i == "nightHours")
			{
				$("#" + i).text("Night: " + field.toFixed(1));	
			}

			//sim stuff
			else if(i == "simulatorHours")
			{
				$("#" + i).text("Simulator Hours: " + field.toFixed(1));
			}
			else if(i == "simulatedInstrumentHours")
			{
				$("#" + i).text("Instrument: " + field.toFixed(1));	
			}
			else if(i == "simulatorInstructorHours")
			{
				$("#" + i).text("Instructor: " + field.toFixed(1));	
			}

			//military hours
			else if(i == "nvgHours")
			{
				$("#" + i).text("NVG: " + field.toFixed(1));
			}
			else if(i == "combatHours")
			{
				$("#" + i).text("Combat: " + field.toFixed(1));
			}
			else if(i == "combatSupportHours")
			{
				$("#" + i).text("Combat Support: " + field.toFixed(1));
			}
			else if(i == "otherHours")
			{
				$("#" + i).text("Other: " + field.toFixed(1));
			}
			//todo: add more fields
		});
	});

	//User mouses over "Log It!" Button
	// $("#submitFlight").hover(function()
	// {
	// 	$("#submitFlight").css("border-color","white");
	// },
	// function()
	// {
	// 	$("#submitFlight").css("border-color","black");
	// });

	//User clicks on "Log It!" Button
	$("#submitFlight").click(function(event)
	{
		event.preventDefault();	//keep it from URL redirecting

		$.post("logFlight",
			{
				date: $("#date").val(),
				tail: $("#tail").val(),
				type: $("#type").val(),
				origin: $("#origin").val(),
				destination: $("#destination").val(),
				takeoff: $("#takeoffTime").val(),
				duration: $("#duration").val(),
				remarks: $("#remarks").val()
			},
			function(data, status)
			{
				alert("Message: " + data.errorMessage + "\nStatus: " + status);
			}, "json"
		);

		//$("#submitFlight").text("Logged!");
	});

	$("#exitProgram").click(function(event)
	{
		event.preventDefault();

		if(confirm("Are you sure you want to exit?"))
		{
			$.post("exitProgram");

			//wait a potato to allow the post() to send the exit signal to the server before closing tab
			setTimeout(function(){close();}, 500);
		}
	});

	//Change "Log It!" button label back after user mouses out of the window
	// $("#addFlight").mouseleave(function()
	// {
	// 	$("#submitFlight").text("Log It!");
	// });
});