$(document).ready(function(){
    var app = new Vue({
        el: '.result_middle',
        data: {
          resultTitle: 'Your results are ready.',
          queryCurrency: 'JPY',
          resultCurrency: 'HKD',
          resultBoxClass: 'result_box_item',
          resultWin: [
              {winClass: 'first', resultRank: '1st'},
              {winClass: 'second', resultRank: '2nd'},
              {winClass: 'third', resultRank: '3rd'}
          ],
          resultLose: [
              {resultRank: '4th'},
              {resultRank: '5th'},
              {resultRank: '6th'},
              {resultRank: '7th'},
              {resultRank: '8th'},
              {resultRank: '9th'},
              {resultRank: '10th'},
          ]
        }
    });
});

