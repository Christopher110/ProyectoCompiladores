// ace.define("ace/mode/ttp_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (require, exports, module) {
//     "use strict";

//     var oop = require("../lib/oop");
//     var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    
//     var ttpHighLightRules = function () {

//         var keywords = (
//             "cocinar, cortar, freir"
//         );

//         var builtinConstants = (
//             "true|false|null"
//         );

//         var builtinFunctions = (
//             "count|min|max|avg|sum|rank|now|coalesce|main"
//         );

//         var dataTypes = (
//             "int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|" +
//             "money|real|number|integer"
//         );        

//         var keywordMapper = this.createKeywordMapper({
//             "support.function": builtinFunctions,
//             "keyword": keywords,
//             "constant.language": builtinConstants,
//             "storage.type": dataTypes
//         }, "identifier", true);

//         this.$rules = {
//             "start": [
//                 {
//                     token: "comment",
//                     regex: "\\$\\$.*$"
//                 },
//                 {
//                     token: "string", // " string
//                     regex: '".*?"'
//                 },
//                 {
//                     token: "string", // ' string
//                     regex: "'.*?'"
//                 },
//                 {
//                     token: "constant.numeric", // float
//                     regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
//                 },
//                 {
//                     token: keywordMapper,
//                     regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
//                 },
//                 {
//                     token: "keyword.operator",
//                     regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
//                 },
//                 {
//                     token: "paren.lparen",
//                     regex: "[\\(\\[{]"
//                 },
//                 {
//                     token: "paren.rparen",
//                     regex: "[\\)\\]}]"
//                 },
//                 {
//                     token: "keyword.operator",
//                     regex: ";"
//                 },
//                 {
//                     token: "text",
//                     regex: "\\s+"
//                 }
//             ]
//         };
//     };
//     oop.inherits(ttpHighLightRules, TextHighlightRules);

//     exports.ttpHighLightRules = ttpHighLightRules;

// });

// ace.define("ace/mode/ttp", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/ttp_rules"], function (require, exports, module) {
//     "use strict";

//     var oop = require("../lib/oop");
//     var TextMode = require("./text").Mode;
//     var ttpHighLightRules = require("./ttp_rules").ttpHighLightRules;

//     var Mode = function () {
//         this.HighlightRules = ttpHighLightRules;
//         this.$behaviour = this.$defaultBehaviour;
//     };
//     oop.inherits(Mode, TextMode);

//     (function () {

//         this.lineCommentStart = "*";

//         this.$id = "ace/mode/ttp";
//     }).call(Mode.prototype);
//     exports.Mode = Mode;

// }); 

// (function () {
//     ace.require(["ace/mode/ttp"], function (m) {
//         if (typeof module == "object" && typeof exports == "object" && module) {
//             module.exports = m;
//         }
//     });
// })();