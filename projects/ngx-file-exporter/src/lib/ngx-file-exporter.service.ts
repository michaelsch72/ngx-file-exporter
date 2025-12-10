import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ExportOptions } from './export-options.interface';

@Injectable({
    providedIn: 'root'
})
export class NgxFileExporterService {

    constructor() { }

    async exportToExcel(data: any[], options: ExportOptions): Promise<void> {
        const workbook = new ExcelJS.Workbook();
        const sheetName = options.sheetName || 'Data';
        const worksheet = workbook.addWorksheet(sheetName);

        if (!data || data.length === 0) {
            console.warn('No data to export');
            return;
        }

        // Get headers from first object
        // Determine headers and keys
        let headers: string[] = [];
        let keys: string[] = [];
        let columnsConfig: any[] = [];

        if (options.columns && options.columns.length > 0) {
            headers = options.columns.map(col => col.header || col.key);
            keys = options.columns.map(col => col.key);
            columnsConfig = options.columns;
        } else {
            headers = Object.keys(data[0]);
            keys = headers;
        }

        const headerRow = worksheet.addRow(headers);

        // Apply Auto Filter
        if (options.autoFilter) {
            worksheet.autoFilter = {
                from: { row: 1, column: 1 },
                to: { row: 1, column: headers.length }
            };
        }

        // Style headers
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: options.headerStyle?.fillColor?.replace('#', '') || 'FF4472C4' } // Default blue
            };
            cell.font = {
                bold: true,
                color: { argb: options.headerStyle?.fontColor?.replace('#', '') || 'FFFFFFFF' } // Default white
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        // Add data
        data.forEach(item => {
            const row: any[] = [];
            keys.forEach(key => {
                row.push(item[key]);
            });
            const addedRow = worksheet.addRow(row);

            // Apply formatting if columns are defined
            if (options.columns) {
                addedRow.eachCell((cell, colNumber) => {
                    const colDef = options.columns![colNumber - 1];
                    if (colDef && colDef.format) {
                        switch (colDef.format) {
                            case 'currency':
                                cell.numFmt = '"$"#,##0.00';
                                break;
                            case 'percent':
                                cell.numFmt = '0.00%';
                                break;
                            case 'date':
                                cell.numFmt = 'dd/mm/yyyy';
                                break;
                            default:
                                cell.numFmt = colDef.format;
                        }
                    }
                });
            }
        });

        // Auto-width columns
        worksheet.columns.forEach((column, index) => {
            if (options.columns && options.columns[index] && options.columns[index].width) {
                column.width = options.columns[index].width;
            } else if (options.columnWidths && options.columnWidths[index]) {
                column.width = options.columnWidths[index];
            } else {
                let maxLength = 0;
                column.eachCell!({ includeEmpty: true }, (cell) => {
                    const columnLength = cell.value ? cell.value.toString().length : 10;
                    if (columnLength > maxLength) {
                        maxLength = columnLength;
                    }
                });
                column.width = maxLength + 2;
            }
        });

        // Generate buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Save file
        const fileName = options.fileName.endsWith('.xlsx') ? options.fileName : `${options.fileName}.xlsx`;
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fileName);
    }
}
