Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

$(document).ready(fetchData);

async function fetchData() {
    refresh();
    var cur_code = getParameterByName("cur_code");
    var value = Number(getParameterByName("value"));
    if (isNaN(value)) return console.error("Invalid value");
    var curAPI = new CurrencyAPI(cur_code);
    var result = await curAPI.fetchAll();

    var resultantList = [];
    for (var bankName in result) {
        resultantList.push({
            name: bankName,
            value: (value / result[bankName]).format(2),
        });
    }

    resultantList.sort((a, b) => Number(a.value) - Number(b.value));

    // console.log(resultantList);
    refresh(resultantList);
}

function refresh(list = []) {
    $(".content-container").empty();
    list.map((rec, index) => {
        var element = `<div class="content-item">
        <div class="overlay"></div>
        <div class="content">
            <div class="rank">${index + 1}</div>
            <div class="bank-name">${rec.name}</div>
            <div class="rate">HK$ ${rec.value}</div>
            <div class="location"><a href="${LOOKUP_WEBSITE[rec.name]}">Exchange</a></div>
        </div>
    </div>`;
        var dom = $.parseHTML(element);
        $(".content-container").append(dom);
    });
}

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const LOOKUP_WEBSITE = {
    BOCHK: "https://www.bochk.com/whk/rates/exchangeRatesForCurrency/exchangeRatesForCurrency-input.action?lang=hk",
    HangSengBank: "https://www.hangseng.com/zh-hk/rates/foreign-currency-notes-exchange-rates/",
    HSBC: "https://www.personal.hsbc.com.hk/1/2/chinese/hk/investments/mkt-info/fcy",
};
