const ExcelJs = require("exceljs");

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

writeExcelTest("Verde",500,{rowChange:0, colChange:2},"C:/Users/Williams Ciavato/Desktop/Cursos/curso udemy playwright/Pruebadownload.xlsx");
