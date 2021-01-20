import { createServer } from "http";
import { parse } from "url";
import { appendFile, readFile } from "fs";

createServer((request, response) => {
    let address = request.url,
      x = parse(address, true),
      filePath = "";
    appendFile(
      "log.txt",
      "URL: " + address + "\nTime: " + new Date() + "\n\n",
      (error) => {
        if (error) {
          throw error;
        } else {
          console.log("Added to Log");
        }
      }
    );

    if (x.pathname.includes("documentation")) {
      filePath = __dirname + "/documentation.html";
    } else {
      filePath = "index.html";
    }

    readFile(filePath, (error, data) => {
      if (error) {
        throw error;
      }
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.write(data);
      response.end("Hello Node!");
    });
  })
  .listen(8081);

console.log("My first Node test server is running out of port 8081.");
