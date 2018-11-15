class CurrencyAPI {
    constructor(targetCurrency) {
        this.targetCurrency = targetCurrency;
    }

    // async fetchAll() {
    //     try {
    //         var endpoint = 'http://35.241.126.74/api/get-rate?cur_code=' + this.targetCurrency;
    //         var result = await fetch(endpoint, {
    //             method: "GET"
    //             // headers: {
    //             //     Accept: "application/json"
    //             // },
    //         }).then(res => res.json());
    //         var bankCurrencyDictionary = {};
    //         result.forEach((rec) => {
    //             if (bankCurrencyDictionary[rec.bank]) return;
    //             bankCurrencyDictionary[rec.bank] = rec.rate;
    //         });
    //         return bankCurrencyDictionary;

    //     } catch (exception) {
    //         console.error(`[ERROR] Exception catched in CurrencyAPI::fetchAll.`);
    //         console.error(exception);
    //         return {};
    //     }
    // }

    async fetchAll(){
        var bankCurrencyDictionary = {};
        await $.ajax({
            type: 'GET',
            url: 'http://35.241.126.74/api/get-rate?cur_code=' + this.targetCurrency,
            success: function(data){
                for(var i = 0; i < data.length; i++){
                    // var id = data[i]["id"];
                    var bank = data[i]["bank"];
                    var rate = Math.round(data[i]["rate"] * 100000) / 100000;
                    bankCurrencyDictionary[bank] = rate;
                };
            },
            error: function(request, status, error){
                alert(error);
            }
        });
        return bankCurrencyDictionary;
    }
}

window.CurrencyAPI = CurrencyAPI;

test();

async function test() {
    var curAPI = new CurrencyAPI("USD");
    var result = await curAPI.fetchAll();

    alert(JSON.stringify(result));

    var rateHSBC = result.HSBC;
    var rateHSB = result.HangSengBank;

    alert(rateHSBC);
}
