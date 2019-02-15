// Require returns an object containing functions exported from the testmodule js file. This object is then assigned to the module variable.

var module = require('./testModule');

module.direAuRevoir();
module.remercier();

// Same with the markdown module installed with npm

var markdown = require('markdown').markdown;

console.log(markdown.toHTML('Un paragraphe en **markdown**!'));