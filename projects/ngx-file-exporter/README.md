# NgxFileExporter

A simple, lightweight, and powerful Angular library to export data to Excel files. It wraps `exceljs` and `file-saver` to provide an easy-to-use service for generating professional Excel reports with custom styling, headers, and column formatting.

## Features

- 🚀 **Easy to use**: Just inject the service and call one method.
- 🎨 **Customizable**: simple configuration for headers, column widths, and formats.
- 💅 **Styling**: Support for custom header colors and font styles.
- 🔍 **Auto-filter**: Automatically add filters to your Excel sheets.
- 📦 **Zero-config**: `exceljs` and `file-saver` are automatically installed as dependencies.

## Installation

Run the following command to install the library:

```bash
npm install ngx-file-exporter
```

No need to install `exceljs` or `file-saver` manually, they are included!

## Usage

### 1. Import `NgxFileExporterService`

Inject the service into your component.

```typescript
import { Component, inject } from '@angular/core';
import { NgxFileExporterService, ExportOptions } from 'ngx-file-exporter';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<button (click)="export()">Export to Excel</button>`
})
export class AppComponent {
  private exporter = inject(NgxFileExporterService);

  data = [
    { id: 1, name: 'John Doe', salary: 50000, joined: new Date('2023-01-15') },
    { id: 2, name: 'Jane Smith', salary: 65000, joined: new Date('2023-02-20') },
  ];

  export() {
    const options: ExportOptions = {
      fileName: 'employees',
      sheetName: 'Employee Data',
      headerStyle: {
        fillColor: 'FF0078D7', // ARGB Hex code without #
        fontColor: 'FFFFFFFF'
      },
      columns: [
        { key: 'id', header: 'ID', width: 10 },
        { key: 'name', header: 'Full Name', width: 25 },
        { key: 'salary', header: 'Salary', width: 15, format: 'currency' },
        { key: 'joined', header: 'Join Date', width: 15, format: 'date' }
      ],
      autoFilter: true
    };

    this.exporter.exportToExcel(this.data, options);
  }
}
```

## API Reference

### `exportToExcel(data: any[], options: ExportOptions): Promise<void>`

Generates and downloads the Excel file.

### `ExportOptions` Interface

| Property | Type | Description |
|----------|------|-------------|
| `fileName` | `string` | **Required.** Name of the file to download (without extension). |
| `sheetName` | `string` | Name of the worksheet. Defaults to 'Data'. |
| `headerStyle` | `object` | Styling for the header row. |
| `headerStyle.fillColor` | `string` | ARGB Hex color for background (e.g., 'FF0000FF'). |
| `headerStyle.fontColor` | `string` | ARGB Hex color for font (e.g., 'FFFFFFFF'). |
| `columns` | `ColumnDefinition[]` | Configuration for each column. |
| `autoFilter` | `boolean` | Enable auto-filter on the header row. |

### `ColumnDefinition` Interface

| Property | Type | Description |
|----------|------|-------------|
| `key` | `string` | **Required.** The key in your data object to map to this column. |
| `header` | `string` | The text to display in the header. Defaults to the key. |
| `width` | `number` | Width of the column. |
| `format` | `string` | Format preset: `'currency'`, `'percent'`, `'date'`, or a custom Excel format string (e.g., `'#,##0.00'`). |

## License

MIT
