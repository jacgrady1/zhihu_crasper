var fs = require('fs');
var casper = require('casper').create();
var links;
var root = 'http://toefl.kmf.com';


function getLinks() {
// Scrape the links from top-right nav of the website
    var links = document.querySelectorAll('a.question-title');
    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href')
    });
}

var output = [];

casper.start('http://toefl.kmf.com/speaking/tpo-1');

casper.then(function () {
    links = this.evaluate(getLinks);
    this.each(links, function(self,link){
        this.thenOpen(root+link, function() {
            var info = this.fetchText('span.title-text');
            console.log('info: ', info);
            var numbers = info.match(/TPO (.*?) - Question (.*)/);
            var tpoId = parseInt(numbers[1]);
            var taskId = parseInt(numbers[2])

            var readingTitle = null;
            var readingTxt = null;
            var listeningTxt = null;
            if (taskId === 3 || taskId === 4) {
                var readingTitle = this.fetchText('h4.item-sub-title').trim();
                var readingTxt = this.fetchText('.item-read p.item-desc').trim();
                var listeningTxt = this.fetchText('ol.list').trim().replace(/ +(?= )/g,'');
                var rawUrl = this.getElementAttribute('#jp_container_1', 'data-url');
                var fileName = 'tpo'+tpoId+'-'+'task'+taskId+'.mp3';
                this.download(rawUrl, './audio/'+fileName);
            } else if (taskId ===5 || taskId ===6) {
                var listeningTxt = this.fetchText('ol.list').trim().replace(/ +(?= )/g,'');
                var rawUrl = this.getElementAttribute('#jp_container_1', 'data-url');
                var fileName = 'tpo'+tpoId+'-'+'task'+taskId+'.mp3';
                this.download(rawUrl, './audio/'+fileName);
            }

            var questionTxt = this.fetchText('.item-question p.item-desc').trim();

            output.push({
                tpoId: tpoId,
                taskId: taskId,
                questionTxt : questionTxt,
                readingTitle: readingTitle,
                readingTxt: readingTxt,
                listeningTxt: listeningTxt
            });
        });
    })


});

casper.then(function(){
    var outputJSON = JSON.stringify(output);
    fs.write("output.json", outputJSON, 'a');
    console.log('done!');
})




casper.run();
