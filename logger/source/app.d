import vibe.d;
import vibe.http.fileserver;
import vibe.inet.mimetypes;
import vibe.core.log;

import std.stdio;
import std.file;
import std.process;
import std.c.stdlib;

void index(HTTPServerRequest request, HTTPServerResponse response)
{
	response.redirect("/index.html");
}

void post(HTTPServerRequest request, HTTPServerResponse response)
{
	writeln("received request: ", request.json);
}

void getHours(HTTPServerRequest request, HTTPServerResponse response)
{
	struct HoursResult
	{
		float totalFlightHours = 0.0;
		float primaryHours = 0.0;
		float secondaryHours = 0.0;
		float instructorHours = 0.0;
		float evaluatorHours = 0.0;
		float instrumentHours = 0.0;
		float simulatedInstrumentHours = 0.0;
		float dualReceivedHours = 0.0;
		float nightHours = 0.0;
		float simulatorHours = 0.0;
		float simulatorInstructorHours = 0.0;
		float nvgHours = 0.0;
		float combatHours = 0.0;
		float combatSupportHours = 0.0;
		float otherHours = 0.0;
	}

	//load times from database/file
	response.writeJsonBody(HoursResult(0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5));
}

void getAircraftData(HTTPServerRequest request, HTTPServerResponse response)
{
	struct AircraftDataResult
	{
		string tailNumber;
		float ttaf;
	}
	response.writeJsonBody(AircraftDataResult("N43136", 4304.4));
}

void logFlight(HTTPServerRequest request, HTTPServerResponse response)
{
	writeln(" received request json: ", request.json, " params: ", request.params, " form: ", request.form);
	struct LogFlightResult
	{
		bool successful;
		string errorMessage;
	}
	response.writeJsonBody(LogFlightResult(true, "logged OK"));
}

void exitProgram(HTTPServerRequest request, HTTPServerResponse response)
{
	//exit(0);
	writeln(" Received exit signal from browser, shutting down server.");
	exitEventLoop();
}

void openBrowser()
{
	auto whichXDGOpen = executeShell("which xdg-open");
	if(whichXDGOpen.status != 0)
	{
		writeln(" xdg-open not found on system, please open http://127.0.0.1:8087 in your browser.");
	}
	else
	{
		//writeln(whichXDGOpen.output);
		auto browserCommand = whichXDGOpen.output.chomp ~ " http://127.0.0.1:8087";
		writeln(" Browser command: ", browserCommand);
		auto openBrowser = executeShell(browserCommand);
		if(openBrowser.status != 0)
		{
			writeln(" Failed to open browser automagically, please open http://127.0.0.1:8087 in your browser.");
		}
	}
}

shared static this()
{
	//setLogLevel();
	auto settings = new HTTPServerSettings;
	settings.port = 8087;
	settings.bindAddresses = ["::1", "127.0.0.1"];

	auto fSettings = new HTTPFileServerSettings;

	auto router = new URLRouter;
	router.get("/", &index);
	router.get("/getHours", &getHours);
	router.get("/getAircraftData", &getAircraftData);
	router.post("/logFlight", &logFlight);
	router.post("/exitProgram", &exitProgram);
	router.get("*", serveStaticFiles("./public/", fSettings));

	openBrowser();

	listenHTTP(settings, router);
}