// https://stackoverflow.com/questions/27272029/how-to-create-a-regexp-to-find-all-strings-in-js-files-or-json
const REG_EXP = /(['"])(?:\\\1|(?!\1).)*?\1/g;

function find (str, cb, withQuotes = false) {
  let res = REG_EXP.exec (str);

  while (res) {
    cb (withQuotes ? res[0] : res[0].slice (1, res[0].length - 1), res.index);
    res = REG_EXP.exec (str);
  }
}

function replace (str, cb, withQuotes = false, allOccurrences = false) {
  let output = str;

  function _replace (res, index) {
    if (allOccurrences) {
      output = output.split (res).join (cb (res, index));
    } else {
      output = output.replace (res, cb (res, index));
    }
  }

  find (str, _replace, withQuotes);

  return output;
}

module.exports.find = find;
module.exports.replace = replace;
