const ExcelJs = require("exceljs");
const {test, expect, request} = require('@playwright/test');


async function writeExcelTest(searhcText,replaceText,change,filePath) {
    
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet, searhcText);
  
  const cell = worksheet.getCell(output.row, output.column+change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel (worksheet,searhcText,)

{ 
    let output = {row: -1, column: -1};
    worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searhcText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
};


test('Upload downloadexcel',  async ({page}) => 
{
    const textSearch = 'Mango';
    const updateValue = '500';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', {name: 'Download'}).click();
    await downloadPromise;
    writeExcelTest(textSearch,updateValue,{rowChange:0, colChange:2},"C:/Users/Williams Ciavato/Downloads/download.xlsx");
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("C:/Users/Williams Ciavato/Downloads/download.xlsx");
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has : textLocator});
    await expect (desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});