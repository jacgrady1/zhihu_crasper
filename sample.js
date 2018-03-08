var fs = require('fs');
var casper = require('casper').create();
var links;
var root = 'https://www.zhihu.com/question/168380213';
var audioFolder = './audios/';


casper.start();


casper.open('https://www.zhihu.com/question/168380213').then(function() {
    this.echo('1 First Page: ' + this.fetchText('met'));
});

casper.thenOpen('https://www.zhihu.com/question/268380213').then(function() {
    this.echo('2 First Page: ' + this.getTitle());
});

// casper.then(function() {
//     var readingTitle = this.fetchText('h4').trim();
//     this.echo('First Page: ' + readingTitle);
// });



// casper.start('https://www.zhihu.com/question/268380213');
// casper.then(function() {
//     this.echo(this);
// });

casper.run();
// var total = 3000000;

// for(var i = 0; i < )



// 
// casper.each(roots, function(self, outroot) {
//     this.thenOpen(outroot, function() {
//         this.then(function () {
//             links = this.evaluate(function (){
//             // Scrape the links from top-right nav of the website
//                 var links = document.querySelectorAll('a.question-title');
//                 return Array.prototype.map.call(links, function (e) {
//                     return e.getAttribute('href')
//                 });
//             });
//             this.each(links, function(self,link){
//                 this.thenOpen(root+link, function() {
//                     var info = this.fetchText('span.title-text');
//                     console.log('info: ', info);
//                     var numbers = info.match(/TPO (.*?) - Question (.*)/);
//                     var tpoId = parseInt(numbers[1]);
//                     var taskId = parseInt(numbers[2])
// 
//                     var readingTitle = null;
//                     var readingTxt = null;
//                     var listeningTxt = null;
//                     if (taskId === 3 || taskId === 4) {
//                         var readingTitle = this.fetchText('h4.item-sub-title').trim();
//                         var readingTxt = this.fetchText('.item-read p.item-desc').trim();
//                         var listeningTxt = this.fetchText('ol.list').trim().replace(/ +(?= )/g,'');
//                         var rawUrl = this.getElementAttribute('#jp_container_1', 'data-url');
//                         var fileName = 'tpo'+tpoId+'-'+'task'+taskId+'.mp3';
//                         this.download(rawUrl, audioFolder+fileName);
//                     } else if (taskId ===5 || taskId ===6) {
//                         var listeningTxt = this.fetchText('ol.list').trim().replace(/ +(?= )/g,'');
//                         var rawUrl = this.getElementAttribute('#jp_container_1', 'data-url');
//                         var fileName = 'tpo'+tpoId+'-'+'task'+taskId+'.mp3';
//                         this.download(rawUrl, audioFolder+fileName);
//                     }
// 
//                     var questionTxt = this.fetchText('.item-question p.item-desc').trim();
// 
//                     output.push({
//                         tpoId: tpoId,
//                         taskId: taskId,
//                         questionTxt : questionTxt,
//                         readingTitle: readingTitle,
//                         readingTxt: readingTxt,
//                         listeningTxt: listeningTxt
//                     });
//                 });
//             })
//         });
//         // this.then(function(){
//         //     var outputJSON = JSON.stringify(output);
//         //     fs.write("output.json", outputJSON, 'a');
//         //     console.log('done!');
//         // })
//     })
// });
// 
// 
// casper.then(function(){
//     var outputJSON = JSON.stringify(output);
//     fs.write("new_output.json", outputJSON, 'a');
//     console.log('done!');
// })
// 
// casper.run();
