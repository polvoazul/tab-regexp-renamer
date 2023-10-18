// License: WTFPL - http://www.wtfpl.net/about/

function set_title() {
  const url = window.location.href
  const rule = {
    regex: 'name=([^&]*)',
    regex_flags: 'i',
    title: "$1" // obeys https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_the_replacement
  }
  match = url.match(RegExp(rule.regex, rule.regex_flags))
  if(!match) return
  const new_title = url.replace(RegExp('^.*' + rule.regex + '.*$', rule.regex_flags), rule.title)
  document.title = new_title
  return new_title
}

window.title_renamer = setInterval(set_title, 10000)
