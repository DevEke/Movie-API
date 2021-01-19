const http = require("http"),
  url = require("url"),
  fs = require("fs");

http
  .createServer((request, response) => {
    let address = request.url,
      x = url.parse(address, true),
      filePath = "";
    fs.appendFile(
      "log.txt",
      "URL: " + address + "\nTime: " + new Date() + "\n\n",
      error => {
        if (error) {
          throw error;
        } else {
          console.log("Added to Log");
        }
      }
    );

    if (x.pathName.includes("documentation")) {
      filePath = __dirname + "/documentation.html";
    } else {
      filePath = "index.html";
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        throw error;
      }
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.write(data);
      response.end();
    });
  })
  .listen(8080);

console.log("My first Node test server is running out of port 8080.");
