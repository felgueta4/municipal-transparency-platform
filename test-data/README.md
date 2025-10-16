
# Test Data for Upload Functionality

This directory contains sample test files for testing the file upload functionality of the Municipal Transparency Platform.

## File Formats

Three file formats are supported:
- **CSV** - Comma-separated values
- **XLSX** - Microsoft Excel (not included here, but can be created from CSV)
- **JSON** - JavaScript Object Notation

## Sample Files

### Budgets
- `budgets/sample_budgets.csv` - Sample budget data in CSV format
- `budgets/sample_budgets.json` - Sample budget data in JSON format

**Required columns:**
- fiscalYear (number)
- department (string)
- program (string)
- category (string)
- subcategory (string)
- amountPlanned (number)

**Optional columns:**
- currency (string, default: CLP)
- notes (string)

### Expenditures
- `expenditures/sample_expenditures.csv` - Sample expenditure data in CSV format
- `expenditures/sample_expenditures.json` - Sample expenditure data in JSON format

**Required columns:**
- date (DD-MM-YYYY or YYYY-MM-DD)
- fiscalYear (number)
- department (string)
- program (string)
- category (string)
- subcategory (string)
- concept (string)
- amountActual (number)

**Optional columns:**
- currency (string, default: CLP)
- supplierName (string)
- supplierTaxId (string)
- procurementRef (string)
- location (string)

### Projects
- `projects/sample_projects.csv` - Sample project data in CSV format
- `projects/sample_projects.json` - Sample project data in JSON format

**Required columns:**
- title (string)
- description (string)
- status (string: planificado, en_progreso, completado, cancelado, suspendido)
- department (string)
- category (string)

**Optional columns:**
- startDate (DD-MM-YYYY or YYYY-MM-DD)
- endDate (DD-MM-YYYY or YYYY-MM-DD)
- requestedBudget (number)
- approvedBudget (number)
- fundingSourceName (string)
- location (string)

## Date Formats

The system accepts multiple date formats:
- Chilean format: DD-MM-YYYY (e.g., 15-01-2024)
- ISO format: YYYY-MM-DD (e.g., 2024-01-15)
- Both forward slash and hyphen separators are accepted

## Currency Formats

Amounts can be specified in various formats:
- Plain numbers: 1234567
- With thousand separators: 1.234.567 or 1,234,567
- With currency symbols: $1.234.567 or CLP 1.234.567

The system will automatically parse and normalize these values.

## Testing

To test the upload functionality:

1. Start the backend server:
   ```bash
   cd apps/api
   npm run dev
   ```

2. Login to get an access token:
   ```bash
   curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "admin@santiago.cl", "password": "demo12345"}'
   ```

3. Upload a file:
   ```bash
   curl -X POST http://localhost:3001/api/upload/budgets \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -F "file=@test-data/budgets/sample_budgets.csv"
   ```

4. View the results in the response, which will show:
   - Total records processed
   - Successful inserts
   - Failed records with error details

## Creating Excel Files

To create Excel files from the CSV samples:
1. Open the CSV file in Microsoft Excel or LibreOffice Calc
2. Save as .xlsx format
3. Use the .xlsx file for testing

Or use a command-line tool like `csv2xlsx`:
```bash
npm install -g csv2xlsx
csv2xlsx budgets/sample_budgets.csv budgets/sample_budgets.xlsx
```
