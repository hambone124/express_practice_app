const express = require("express"),
      app = express(),
      os = require("os"),
      ip = os.networkInterfaces().eth0[0].address;

function appendLog(event) {
  const dateString = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  console.log(`${dateString}: ${event}`);
}

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/paper", express.static("node_modules/paper/dist"));
app.use("/semantic", express.static("node_modules/semantic-ui-css"));

app.get("/", (req, res) => {
	res.redirect("/buttons");
});

app.get("/buttons", (req, res) => {
  res.render("buttons");
});

app.get("/snake", (req, res) => {
  res.render("snake");
});

app.get("/gameoflife", (req, res) => {
  res.render("gameoflife");
});

app.get("/binaryclock", (req, res) => {
  res.render("binaryclock");
});

app.listen(3000, ip, () => {
	appendLog(`testapp launched at ${ip}`);
});