// License: WTFPL - http://www.wtfpl.net/about/
"use strict";


async function set_title() {
  let rules = (await chrome.storage.sync.get("rules")).rules // get all
  if(!rules) return
  rules = JSON.parse(rules)
  const url = window.location.href
  const example_rule = {
    regexp: 'name=([^&]*)',
    flags: 'i',
    title: "$1" // obeys https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_the_replacement
  }
  for (let rule of rules) {
    let match = url.match(RegExp(rule.regexp, rule.flags))
    if(!match) continue;
    const new_title = url.replace(RegExp('^.*' + rule.regexp + '.*$', rule.flags), rule.title)
    document.title = new_title
    return new_title
  }
}

window.title_set_title = set_title
window.title_renamer = setInterval(set_title, 10000) // TODO: change this brute force to events on title / href / rules
