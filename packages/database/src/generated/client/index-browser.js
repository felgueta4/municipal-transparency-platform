
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.MunicipalityScalarFieldEnum = {
  id: 'id',
  name: 'name',
  country: 'country',
  region: 'region',
  locale: 'locale',
  timezone: 'timezone',
  softwareVersion: 'softwareVersion',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FiscalYearScalarFieldEnum = {
  id: 'id',
  year: 'year',
  status: 'status',
  lockedAt: 'lockedAt'
};

exports.Prisma.BudgetScalarFieldEnum = {
  id: 'id',
  municipalityId: 'municipalityId',
  fiscalYearId: 'fiscalYearId',
  department: 'department',
  program: 'program',
  category: 'category',
  subcategory: 'subcategory',
  amountPlanned: 'amountPlanned',
  currency: 'currency',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExpenditureScalarFieldEnum = {
  id: 'id',
  municipalityId: 'municipalityId',
  fiscalYearId: 'fiscalYearId',
  date: 'date',
  department: 'department',
  program: 'program',
  category: 'category',
  subcategory: 'subcategory',
  concept: 'concept',
  amountActual: 'amountActual',
  currency: 'currency',
  supplierId: 'supplierId',
  procurementRef: 'procurementRef',
  location: 'location',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  municipalityId: 'municipalityId',
  title: 'title',
  description: 'description',
  status: 'status',
  startDate: 'startDate',
  endDate: 'endDate',
  department: 'department',
  category: 'category',
  requestedBudget: 'requestedBudget',
  approvedBudget: 'approvedBudget',
  fundingSourceId: 'fundingSourceId',
  location: 'location',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FundingSourceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SupplierScalarFieldEnum = {
  id: 'id',
  name: 'name',
  taxId: 'taxId',
  sector: 'sector',
  locality: 'locality',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContractScalarFieldEnum = {
  id: 'id',
  municipalityId: 'municipalityId',
  supplierId: 'supplierId',
  title: 'title',
  description: 'description',
  amount: 'amount',
  currency: 'currency',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  contractNumber: 'contractNumber',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DatasetScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  sourceUri: 'sourceUri',
  refreshSchedule: 'refreshSchedule',
  schemaVersion: 'schemaVersion',
  lastIngestedAt: 'lastIngestedAt',
  checksum: 'checksum',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IngestionRunScalarFieldEnum = {
  id: 'id',
  datasetId: 'datasetId',
  status: 'status',
  startedAt: 'startedAt',
  finishedAt: 'finishedAt',
  rowsIngested: 'rowsIngested',
  rowsInvalid: 'rowsInvalid',
  logUri: 'logUri',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ConnectorConfigScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  description: 'description',
  baseUrl: 'baseUrl',
  apiKey: 'apiKey',
  authType: 'authType',
  authConfig: 'authConfig',
  config: 'config',
  headers: 'headers',
  timeout: 'timeout',
  retryCount: 'retryCount',
  rateLimit: 'rateLimit',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ConnectorLogScalarFieldEnum = {
  id: 'id',
  connectorConfigId: 'connectorConfigId',
  endpoint: 'endpoint',
  method: 'method',
  requestHeaders: 'requestHeaders',
  requestBody: 'requestBody',
  responseStatus: 'responseStatus',
  responseHeaders: 'responseHeaders',
  responseBody: 'responseBody',
  duration: 'duration',
  error: 'error',
  createdAt: 'createdAt'
};

exports.Prisma.SoftwareVersionScalarFieldEnum = {
  id: 'id',
  version: 'version',
  name: 'name',
  description: 'description',
  changelog: 'changelog',
  releaseDate: 'releaseDate',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VersionHistoryScalarFieldEnum = {
  id: 'id',
  municipalityId: 'municipalityId',
  fromVersion: 'fromVersion',
  toVersion: 'toVersion',
  updatedBy: 'updatedBy',
  notes: 'notes',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  passwordHash: 'passwordHash',
  role: 'role',
  municipalityId: 'municipalityId',
  lastLoginAt: 'lastLoginAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QueryAuditScalarFieldEnum = {
  id: 'id',
  userType: 'userType',
  nlQuery: 'nlQuery',
  compiledQuery: 'compiledQuery',
  chartSpec: 'chartSpec',
  filtersJson: 'filtersJson',
  datasetsUsed: 'datasetsUsed',
  rowsReturned: 'rowsReturned',
  latencyMs: 'latencyMs',
  timestamp: 'timestamp'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  Municipality: 'Municipality',
  FiscalYear: 'FiscalYear',
  Budget: 'Budget',
  Expenditure: 'Expenditure',
  Project: 'Project',
  FundingSource: 'FundingSource',
  Supplier: 'Supplier',
  Contract: 'Contract',
  Dataset: 'Dataset',
  IngestionRun: 'IngestionRun',
  ConnectorConfig: 'ConnectorConfig',
  ConnectorLog: 'ConnectorLog',
  SoftwareVersion: 'SoftwareVersion',
  VersionHistory: 'VersionHistory',
  User: 'User',
  QueryAudit: 'QueryAudit'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
