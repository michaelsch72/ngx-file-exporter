export interface ColumnDefinition {
  key: string;
  header?: string;
  width?: number;
  format?: string; // 'currency', 'percent', 'date', or custom format
}

export interface ExportOptions {
  fileName: string;
  sheetName?: string;
  headerStyle?: {
    fillColor?: string;
    fontColor?: string;
  };
  columnWidths?: number[];
  columns?: ColumnDefinition[];
  autoFilter?: boolean;
}
