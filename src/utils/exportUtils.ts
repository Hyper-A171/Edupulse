
import * as XLSX from 'xlsx';

export type ExportableData = Record<string, any>[];

/**
 * Exports data to an Excel file and triggers download
 * @param data Array of objects to export
 * @param filename Name of the file without extension
 */
export const exportToExcel = (data: ExportableData, filename: string): void => {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `${filename}.xlsx`);
    
    console.log(`Exported ${data.length} records to ${filename}.xlsx`);
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error('Failed to export data');
  }
};

/**
 * For browsers or environments where xlsx library isn't available,
 * fallback to CSV export
 */
export const exportToCSV = (data: ExportableData, filename: string): void => {
  try {
    // Get headers from the first object
    const headers = Object.keys(data[0] || {});
    
    // Create CSV header row
    const csvContent = [
      headers.join(','), // Header row
      // Data rows
      ...data.map(item => 
        headers.map(header => {
          // Handle values with commas by wrapping in quotes
          const value = item[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');
    
    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set link attributes
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`Exported ${data.length} records to ${filename}.csv`);
  } catch (error) {
    console.error('CSV export failed:', error);
    throw new Error('Failed to export data as CSV');
  }
};
