var http = require('http');
http.createServer(async function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    if (req.url === "/favicon.ico") {
    res.write("Not found");
    res.end();
    return;
  }
  const data = await fetch(`https://cdn.discordapp.com/attachments/1129008542398038086${req.url}`);
  if (data.status.toString().startsWith("2")) {
    const buf = await data.arrayBuffer();
    res.writeHead(data.status, { "Content-Type": data.headers.get("Content-Type") });
    res.write(Buffer.from(buf));
    res.end();
    return;
  } else {
    const text = await data.text();
    res.writeHead(data.status, { "Content-Type": data.headers.get("Content-Type") });
    res.write(text);
    res.end();
    return;
  }
}).listen(process.env.PORT || 3000);
