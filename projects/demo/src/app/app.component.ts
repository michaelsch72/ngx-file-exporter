import { Component, inject } from '@angular/core';
import { NgxFileExporterService, ExportOptions } from 'ngx-file-exporter';
import { AppService } from './app';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1>Ngx File Exporter Demo</h1>
      <p>Click the button below to export data to Excel.</p>
      <button (click)="exportData()" style="padding: 10px 20px; font-size: 16px; cursor: pointer; background-color: #0078D7; color: white; border: none; border-radius: 4px;">
        Export Data
      </button>
    </div>
  `,
  styles: []
})
export class AppComponent {
  private exporter = inject(NgxFileExporterService);
  private appService = inject(AppService);
  data: any[] = [];

  ngOnInit(): void {
    this.appService.getData().subscribe((res) => {
      res.map((item: any) => {
        return {
          id: item.id,
          name: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          images: item.images
        }
      })
      this.data = res;
    });
  }

  exportData() {
    const options: ExportOptions = {
      fileName: 'users-export',
      sheetName: 'User Data',
      columns: [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Name' },
        { key: 'price', header: 'Price' },
        { key: 'description', header: 'Description' },
        { key: 'category', header: 'Category' },
        { key: 'images', header: 'Images' }
      ],
      autoFilter: true,
      headerStyle: {
        fillColor: 'FF0078D7', // Custom blue
        fontColor: 'FFFFFFFF'
      }
    };

    this.exporter.exportToExcel(this.data, options);
  }
}
