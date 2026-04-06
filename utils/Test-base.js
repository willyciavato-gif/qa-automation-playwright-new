const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder : {
            username: 'willy.ciavato@gmail.com',
            password: 'Tiburones91.',
            productName: 'ADIDAS ORIGINAL'
        }

    }
)