#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
const fs = require('fs');
var _ = require('lodash');
var htmlparser = require('htmlparser2');
const cheerio = require('cheerio')

var html = '<div class="form-container container column is-half-desktop is-three-quarters-touch"><div class="field"><label class="label is-large">Your Name</label><div class="control"><input class="input is-large" type="text" placeholder="Your name and surname" v-model="form.name"></div></div><div class="field"><label class="label is-large">Role</label><div class="control"><input class="input is-large" type="text" placeholder="Your job description" v-model="form.role"></div></div><div class="field"><label class="label is-large">Email</label><div class="control"><input class="input is-large" type="text" placeholder="Your email address" v-model="form.email"></div></div>      <div class="button req-demo is-large" @click="sendForm()" >Send!</div>   </div>'
// var html = '<div id="a"> Hello </div>'
// const $ = cheerio.load(html);

var $;
fs.readFile('./RequestDemo.vue', function (err, html) {
    if (err) {
        // handle error
    } else {
        //   var $html = $(html.toString());
        $ = cheerio.load(html.toString());
        // var doc = $(html.toString());
        $('html').each(function (i, node) {
            walk(node);
        });

        console.log($('html').html());
        // console.log(html.toString());
    }
});


// function walk(elem) {
//     var type = $(elem).type;
//     var nodes = $(elem).childNodes;
//     if (nodes) {
//         if (elem.name != 'script' && elem.name != 'i18n') {
//             // for (var i = 0; i < nodes.length; i++) {
//             nodes.each(function(i, elem){
//                 var node = $(this);
//                 // var node = nodes[i];
//                 var nodeType = elem.type;
//                 var name = elem.name;
//                 // console.log(chalk.red('////////////////'), node.type, node.name, 'Childn:', node.children);
//                 if (name != 'script' && name != 'i18n' && name != 'style') {
//                     if (nodeType == 'text') {
//                         console.log(chalk.red(node.data));
//                         node.text("%%" + node.text + '%%');
//                     } else {
//                         walk(node);
//                     }
//                 }
//             });
//         }
//     }

// }

function walk(elem) {
    var type = $(elem).type;
    var nodes = elem.childNodes;
    if (nodes) {
        if (elem.name != 'script' && elem.name != 'i18n') {
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i], nodeType = node.type, name = node.name;
                // console.log(chalk.red('////////////////'), node.type, node.name, 'Childn:', node.children);
                if (node.name != 'script' && node.name != 'i18n' && node.name != 'style') {
                    if (nodeType == 'text') {
                        // console.log(chalk.red(node.data));
                        if(node.data.replace(/\n/g, '').trim() != ''){
                            node.data = "%%" + node.data + '%%';
                        }
                        // console.log(node);
                    } else {
                        walk(node);
                    }
                }
            }
        }
    }

}



// program
//     .version('0.0.1')
//     .usage('<keywords>')
//     .parse(process.argv);

// if (!program.args.length) {
//     program.help();
// } else {




//     // function getTextNodesIn(elem, opt_fnFilter) {
//     //     var textNodes = [];
//     //     if (elem) {
//     //         for (var nodes = elem.children, i = nodes.length; i--;) {
//     //             var node = nodes[i], nodeType = node.type;
//     //             if (nodeType == 'text') {
//     //                 if (!opt_fnFilter || opt_fnFilter(node, elem)) {
//     //                     textNodes.push(node.data);
//     //                 }
//     //             }
//     //             else {
//     //                 textNodes = textNodes.concat(getTextNodesIn(node, opt_fnFilter));
//     //             }
//     //         }
//     //     }
//     //     return textNodes;
//     // }

// }