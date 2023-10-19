async function main() {
  document.getElementById("save").onclick = save_rules;

  let rules = (await chrome.storage.local.get("rules")).rules // get all
  rules = rules ? JSON.parse(rules) : []
  let rootDiv = document.getElementById("rules")
  console.log(rules)

  // Create the header row using a string
  var headerHtml =
    '<div class="header"><label>Regexp</label><label>Flags</label><label>Title</label></div><br>'
  rootDiv.innerHTML = headerHtml

  // Loop through the rules array and create input pairs
  const empty = {regexp: "", flags: "", title: "" }
  for (let rule of rules.concat([empty])) {
    console.log(rule)
    var rowHtml =
      '<div class="row"><input type="text" value="' +
      rule.regexp +
      '"><input type="text" style="width:30px;" value="' +
      (rule.flags || "") +
      '"><input type="text" value="' +
      rule.title +
      '"></div><br>'
    rootDiv.innerHTML += rowHtml
  }
}

async function save_rules() {
  let rows = document.querySelectorAll(".row")
  var data = []
  for (let row of rows) {
    var inputs = row.querySelectorAll("input")
    let rule = {
      regexp: inputs[0].value,
      flags: inputs[1].value,
      title: inputs[2].value,
    }
    if (!rule.regexp || !rule.title) continue
    data.push(rule)
  }
  console.log("Saving...", data)
  await chrome.storage.local.set({ rules: JSON.stringify(data) })
  document.getElementById("info").innerHTML = "Saved!"
  setTimeout(() => document.getElementById("info").innerHTML = "", 5000)
  main()
}

await main()
