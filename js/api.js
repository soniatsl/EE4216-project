class CurrencyAPI {
    constructor(targetCurrency = "USD") {
        this.targetCurrency = targetCurrency;
    }

    async fetchAll() {
        try {
            var endpoint = `http://35.241.126.74/api/get-rate?cur_code=${this.targetCurrency}`;
            var result = await fetch(endpoint, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                },
            }).then(res => res.json());
            var bankCurrencyDictionary = {};
            result.forEach((rec) => {
                if (bankCurrencyDictionary[rec.bank]) return;
                bankCurrencyDictionary[rec.bank] = rec.rate;
            });
            return bankCurrencyDictionary;
        } catch (exception) {
            console.error(`[ERROR] Exception catched in CurrencyAPI::fetchAll.`);
            console.error(exception);
            return {};
        }
    }
}

window.CurrencyAPI = CurrencyAPI;

async function test() {
    var curAPI = new CurrencyAPI("USD");
    var result = await curAPI.fetchAll();
    
    var rateHSBC = result.HSBC;
}
