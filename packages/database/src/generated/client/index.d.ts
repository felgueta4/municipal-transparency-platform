
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Municipality
 * Municipality: Entidad municipal
 */
export type Municipality = $Result.DefaultSelection<Prisma.$MunicipalityPayload>
/**
 * Model FiscalYear
 * FiscalYear: Año fiscal
 */
export type FiscalYear = $Result.DefaultSelection<Prisma.$FiscalYearPayload>
/**
 * Model Budget
 * Budget: Presupuesto planificado por categoría
 */
export type Budget = $Result.DefaultSelection<Prisma.$BudgetPayload>
/**
 * Model Expenditure
 * Expenditure: Gasto ejecutado
 */
export type Expenditure = $Result.DefaultSelection<Prisma.$ExpenditurePayload>
/**
 * Model Project
 * Project: Proyecto municipal
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model FundingSource
 * FundingSource: Fuente de financiamiento
 */
export type FundingSource = $Result.DefaultSelection<Prisma.$FundingSourcePayload>
/**
 * Model Supplier
 * Supplier: Proveedor o contratista
 */
export type Supplier = $Result.DefaultSelection<Prisma.$SupplierPayload>
/**
 * Model Dataset
 * Dataset: Conjunto de datos a ingerir
 */
export type Dataset = $Result.DefaultSelection<Prisma.$DatasetPayload>
/**
 * Model IngestionRun
 * IngestionRun: Ejecución de ingesta
 */
export type IngestionRun = $Result.DefaultSelection<Prisma.$IngestionRunPayload>
/**
 * Model User
 * User: Usuario del sistema
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model QueryAudit
 * QueryAudit: Auditoría de consultas
 */
export type QueryAudit = $Result.DefaultSelection<Prisma.$QueryAuditPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Municipalities
 * const municipalities = await prisma.municipality.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Municipalities
   * const municipalities = await prisma.municipality.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.municipality`: Exposes CRUD operations for the **Municipality** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Municipalities
    * const municipalities = await prisma.municipality.findMany()
    * ```
    */
  get municipality(): Prisma.MunicipalityDelegate<ExtArgs>;

  /**
   * `prisma.fiscalYear`: Exposes CRUD operations for the **FiscalYear** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FiscalYears
    * const fiscalYears = await prisma.fiscalYear.findMany()
    * ```
    */
  get fiscalYear(): Prisma.FiscalYearDelegate<ExtArgs>;

  /**
   * `prisma.budget`: Exposes CRUD operations for the **Budget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Budgets
    * const budgets = await prisma.budget.findMany()
    * ```
    */
  get budget(): Prisma.BudgetDelegate<ExtArgs>;

  /**
   * `prisma.expenditure`: Exposes CRUD operations for the **Expenditure** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenditures
    * const expenditures = await prisma.expenditure.findMany()
    * ```
    */
  get expenditure(): Prisma.ExpenditureDelegate<ExtArgs>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs>;

  /**
   * `prisma.fundingSource`: Exposes CRUD operations for the **FundingSource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FundingSources
    * const fundingSources = await prisma.fundingSource.findMany()
    * ```
    */
  get fundingSource(): Prisma.FundingSourceDelegate<ExtArgs>;

  /**
   * `prisma.supplier`: Exposes CRUD operations for the **Supplier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suppliers
    * const suppliers = await prisma.supplier.findMany()
    * ```
    */
  get supplier(): Prisma.SupplierDelegate<ExtArgs>;

  /**
   * `prisma.dataset`: Exposes CRUD operations for the **Dataset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Datasets
    * const datasets = await prisma.dataset.findMany()
    * ```
    */
  get dataset(): Prisma.DatasetDelegate<ExtArgs>;

  /**
   * `prisma.ingestionRun`: Exposes CRUD operations for the **IngestionRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IngestionRuns
    * const ingestionRuns = await prisma.ingestionRun.findMany()
    * ```
    */
  get ingestionRun(): Prisma.IngestionRunDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.queryAudit`: Exposes CRUD operations for the **QueryAudit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QueryAudits
    * const queryAudits = await prisma.queryAudit.findMany()
    * ```
    */
  get queryAudit(): Prisma.QueryAuditDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Municipality: 'Municipality',
    FiscalYear: 'FiscalYear',
    Budget: 'Budget',
    Expenditure: 'Expenditure',
    Project: 'Project',
    FundingSource: 'FundingSource',
    Supplier: 'Supplier',
    Dataset: 'Dataset',
    IngestionRun: 'IngestionRun',
    User: 'User',
    QueryAudit: 'QueryAudit'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "municipality" | "fiscalYear" | "budget" | "expenditure" | "project" | "fundingSource" | "supplier" | "dataset" | "ingestionRun" | "user" | "queryAudit"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Municipality: {
        payload: Prisma.$MunicipalityPayload<ExtArgs>
        fields: Prisma.MunicipalityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MunicipalityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MunicipalityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MunicipalityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MunicipalityPayload>
          }
          findFirst: {
            args: Prisma.MunicipalityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MunicipalityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MunicipalityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MunicipalityPayload>
          }
          findMany: {
            args: Prisma.MunicipalityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MunicipalityPayload>[]
          }
          create: {
            args: Prisma.MunicipalityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MunicipalityPayload>
          }
          createMany: {
            args: Prisma.MunicipalityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MunicipalityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MunicipalityPayload>[]
          }
          delete: {
            args: Prisma.MunicipalityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MunicipalityPayload>
          }
          update: {
            args: Prisma.MunicipalityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MunicipalityPayload>
          }
          deleteMany: {
            args: Prisma.MunicipalityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MunicipalityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MunicipalityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MunicipalityPayload>
          }
          aggregate: {
            args: Prisma.MunicipalityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMunicipality>
          }
          groupBy: {
            args: Prisma.MunicipalityGroupByArgs<ExtArgs>
            result: $Utils.Optional<MunicipalityGroupByOutputType>[]
          }
          count: {
            args: Prisma.MunicipalityCountArgs<ExtArgs>
            result: $Utils.Optional<MunicipalityCountAggregateOutputType> | number
          }
        }
      }
      FiscalYear: {
        payload: Prisma.$FiscalYearPayload<ExtArgs>
        fields: Prisma.FiscalYearFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FiscalYearFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalYearPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FiscalYearFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalYearPayload>
          }
          findFirst: {
            args: Prisma.FiscalYearFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalYearPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FiscalYearFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalYearPayload>
          }
          findMany: {
            args: Prisma.FiscalYearFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalYearPayload>[]
          }
          create: {
            args: Prisma.FiscalYearCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalYearPayload>
          }
          createMany: {
            args: Prisma.FiscalYearCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FiscalYearCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalYearPayload>[]
          }
          delete: {
            args: Prisma.FiscalYearDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalYearPayload>
          }
          update: {
            args: Prisma.FiscalYearUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalYearPayload>
          }
          deleteMany: {
            args: Prisma.FiscalYearDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FiscalYearUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FiscalYearUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalYearPayload>
          }
          aggregate: {
            args: Prisma.FiscalYearAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFiscalYear>
          }
          groupBy: {
            args: Prisma.FiscalYearGroupByArgs<ExtArgs>
            result: $Utils.Optional<FiscalYearGroupByOutputType>[]
          }
          count: {
            args: Prisma.FiscalYearCountArgs<ExtArgs>
            result: $Utils.Optional<FiscalYearCountAggregateOutputType> | number
          }
        }
      }
      Budget: {
        payload: Prisma.$BudgetPayload<ExtArgs>
        fields: Prisma.BudgetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BudgetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BudgetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          findFirst: {
            args: Prisma.BudgetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BudgetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          findMany: {
            args: Prisma.BudgetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>[]
          }
          create: {
            args: Prisma.BudgetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          createMany: {
            args: Prisma.BudgetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BudgetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>[]
          }
          delete: {
            args: Prisma.BudgetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          update: {
            args: Prisma.BudgetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          deleteMany: {
            args: Prisma.BudgetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BudgetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BudgetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          aggregate: {
            args: Prisma.BudgetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBudget>
          }
          groupBy: {
            args: Prisma.BudgetGroupByArgs<ExtArgs>
            result: $Utils.Optional<BudgetGroupByOutputType>[]
          }
          count: {
            args: Prisma.BudgetCountArgs<ExtArgs>
            result: $Utils.Optional<BudgetCountAggregateOutputType> | number
          }
        }
      }
      Expenditure: {
        payload: Prisma.$ExpenditurePayload<ExtArgs>
        fields: Prisma.ExpenditureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenditureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenditurePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenditureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenditurePayload>
          }
          findFirst: {
            args: Prisma.ExpenditureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenditurePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenditureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenditurePayload>
          }
          findMany: {
            args: Prisma.ExpenditureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenditurePayload>[]
          }
          create: {
            args: Prisma.ExpenditureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenditurePayload>
          }
          createMany: {
            args: Prisma.ExpenditureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenditureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenditurePayload>[]
          }
          delete: {
            args: Prisma.ExpenditureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenditurePayload>
          }
          update: {
            args: Prisma.ExpenditureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenditurePayload>
          }
          deleteMany: {
            args: Prisma.ExpenditureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenditureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExpenditureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenditurePayload>
          }
          aggregate: {
            args: Prisma.ExpenditureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpenditure>
          }
          groupBy: {
            args: Prisma.ExpenditureGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenditureGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenditureCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenditureCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      FundingSource: {
        payload: Prisma.$FundingSourcePayload<ExtArgs>
        fields: Prisma.FundingSourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FundingSourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FundingSourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSourcePayload>
          }
          findFirst: {
            args: Prisma.FundingSourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FundingSourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSourcePayload>
          }
          findMany: {
            args: Prisma.FundingSourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSourcePayload>[]
          }
          create: {
            args: Prisma.FundingSourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSourcePayload>
          }
          createMany: {
            args: Prisma.FundingSourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FundingSourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSourcePayload>[]
          }
          delete: {
            args: Prisma.FundingSourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSourcePayload>
          }
          update: {
            args: Prisma.FundingSourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSourcePayload>
          }
          deleteMany: {
            args: Prisma.FundingSourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FundingSourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FundingSourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSourcePayload>
          }
          aggregate: {
            args: Prisma.FundingSourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFundingSource>
          }
          groupBy: {
            args: Prisma.FundingSourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<FundingSourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.FundingSourceCountArgs<ExtArgs>
            result: $Utils.Optional<FundingSourceCountAggregateOutputType> | number
          }
        }
      }
      Supplier: {
        payload: Prisma.$SupplierPayload<ExtArgs>
        fields: Prisma.SupplierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplierFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplierFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findFirst: {
            args: Prisma.SupplierFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplierFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findMany: {
            args: Prisma.SupplierFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          create: {
            args: Prisma.SupplierCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          createMany: {
            args: Prisma.SupplierCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupplierCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          delete: {
            args: Prisma.SupplierDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          update: {
            args: Prisma.SupplierUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          deleteMany: {
            args: Prisma.SupplierDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplierUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupplierUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          aggregate: {
            args: Prisma.SupplierAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplier>
          }
          groupBy: {
            args: Prisma.SupplierGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplierGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplierCountArgs<ExtArgs>
            result: $Utils.Optional<SupplierCountAggregateOutputType> | number
          }
        }
      }
      Dataset: {
        payload: Prisma.$DatasetPayload<ExtArgs>
        fields: Prisma.DatasetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DatasetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DatasetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          findFirst: {
            args: Prisma.DatasetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DatasetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          findMany: {
            args: Prisma.DatasetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>[]
          }
          create: {
            args: Prisma.DatasetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          createMany: {
            args: Prisma.DatasetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DatasetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>[]
          }
          delete: {
            args: Prisma.DatasetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          update: {
            args: Prisma.DatasetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          deleteMany: {
            args: Prisma.DatasetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DatasetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DatasetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          aggregate: {
            args: Prisma.DatasetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDataset>
          }
          groupBy: {
            args: Prisma.DatasetGroupByArgs<ExtArgs>
            result: $Utils.Optional<DatasetGroupByOutputType>[]
          }
          count: {
            args: Prisma.DatasetCountArgs<ExtArgs>
            result: $Utils.Optional<DatasetCountAggregateOutputType> | number
          }
        }
      }
      IngestionRun: {
        payload: Prisma.$IngestionRunPayload<ExtArgs>
        fields: Prisma.IngestionRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IngestionRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestionRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IngestionRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestionRunPayload>
          }
          findFirst: {
            args: Prisma.IngestionRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestionRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IngestionRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestionRunPayload>
          }
          findMany: {
            args: Prisma.IngestionRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestionRunPayload>[]
          }
          create: {
            args: Prisma.IngestionRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestionRunPayload>
          }
          createMany: {
            args: Prisma.IngestionRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IngestionRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestionRunPayload>[]
          }
          delete: {
            args: Prisma.IngestionRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestionRunPayload>
          }
          update: {
            args: Prisma.IngestionRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestionRunPayload>
          }
          deleteMany: {
            args: Prisma.IngestionRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IngestionRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.IngestionRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestionRunPayload>
          }
          aggregate: {
            args: Prisma.IngestionRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIngestionRun>
          }
          groupBy: {
            args: Prisma.IngestionRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<IngestionRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.IngestionRunCountArgs<ExtArgs>
            result: $Utils.Optional<IngestionRunCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      QueryAudit: {
        payload: Prisma.$QueryAuditPayload<ExtArgs>
        fields: Prisma.QueryAuditFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QueryAuditFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryAuditPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QueryAuditFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryAuditPayload>
          }
          findFirst: {
            args: Prisma.QueryAuditFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryAuditPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QueryAuditFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryAuditPayload>
          }
          findMany: {
            args: Prisma.QueryAuditFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryAuditPayload>[]
          }
          create: {
            args: Prisma.QueryAuditCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryAuditPayload>
          }
          createMany: {
            args: Prisma.QueryAuditCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QueryAuditCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryAuditPayload>[]
          }
          delete: {
            args: Prisma.QueryAuditDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryAuditPayload>
          }
          update: {
            args: Prisma.QueryAuditUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryAuditPayload>
          }
          deleteMany: {
            args: Prisma.QueryAuditDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QueryAuditUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QueryAuditUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryAuditPayload>
          }
          aggregate: {
            args: Prisma.QueryAuditAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQueryAudit>
          }
          groupBy: {
            args: Prisma.QueryAuditGroupByArgs<ExtArgs>
            result: $Utils.Optional<QueryAuditGroupByOutputType>[]
          }
          count: {
            args: Prisma.QueryAuditCountArgs<ExtArgs>
            result: $Utils.Optional<QueryAuditCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MunicipalityCountOutputType
   */

  export type MunicipalityCountOutputType = {
    budgets: number
    expenditures: number
    projects: number
    users: number
  }

  export type MunicipalityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgets?: boolean | MunicipalityCountOutputTypeCountBudgetsArgs
    expenditures?: boolean | MunicipalityCountOutputTypeCountExpendituresArgs
    projects?: boolean | MunicipalityCountOutputTypeCountProjectsArgs
    users?: boolean | MunicipalityCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * MunicipalityCountOutputType without action
   */
  export type MunicipalityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MunicipalityCountOutputType
     */
    select?: MunicipalityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MunicipalityCountOutputType without action
   */
  export type MunicipalityCountOutputTypeCountBudgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
  }

  /**
   * MunicipalityCountOutputType without action
   */
  export type MunicipalityCountOutputTypeCountExpendituresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenditureWhereInput
  }

  /**
   * MunicipalityCountOutputType without action
   */
  export type MunicipalityCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * MunicipalityCountOutputType without action
   */
  export type MunicipalityCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type FiscalYearCountOutputType
   */

  export type FiscalYearCountOutputType = {
    budgets: number
    expenditures: number
  }

  export type FiscalYearCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgets?: boolean | FiscalYearCountOutputTypeCountBudgetsArgs
    expenditures?: boolean | FiscalYearCountOutputTypeCountExpendituresArgs
  }

  // Custom InputTypes
  /**
   * FiscalYearCountOutputType without action
   */
  export type FiscalYearCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalYearCountOutputType
     */
    select?: FiscalYearCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FiscalYearCountOutputType without action
   */
  export type FiscalYearCountOutputTypeCountBudgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
  }

  /**
   * FiscalYearCountOutputType without action
   */
  export type FiscalYearCountOutputTypeCountExpendituresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenditureWhereInput
  }


  /**
   * Count Type FundingSourceCountOutputType
   */

  export type FundingSourceCountOutputType = {
    projects: number
  }

  export type FundingSourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | FundingSourceCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * FundingSourceCountOutputType without action
   */
  export type FundingSourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSourceCountOutputType
     */
    select?: FundingSourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FundingSourceCountOutputType without action
   */
  export type FundingSourceCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type SupplierCountOutputType
   */

  export type SupplierCountOutputType = {
    expenditures: number
  }

  export type SupplierCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expenditures?: boolean | SupplierCountOutputTypeCountExpendituresArgs
  }

  // Custom InputTypes
  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierCountOutputType
     */
    select?: SupplierCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeCountExpendituresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenditureWhereInput
  }


  /**
   * Count Type DatasetCountOutputType
   */

  export type DatasetCountOutputType = {
    ingestionRuns: number
  }

  export type DatasetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ingestionRuns?: boolean | DatasetCountOutputTypeCountIngestionRunsArgs
  }

  // Custom InputTypes
  /**
   * DatasetCountOutputType without action
   */
  export type DatasetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatasetCountOutputType
     */
    select?: DatasetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DatasetCountOutputType without action
   */
  export type DatasetCountOutputTypeCountIngestionRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IngestionRunWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Municipality
   */

  export type AggregateMunicipality = {
    _count: MunicipalityCountAggregateOutputType | null
    _min: MunicipalityMinAggregateOutputType | null
    _max: MunicipalityMaxAggregateOutputType | null
  }

  export type MunicipalityMinAggregateOutputType = {
    id: string | null
    name: string | null
    country: string | null
    region: string | null
    locale: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MunicipalityMaxAggregateOutputType = {
    id: string | null
    name: string | null
    country: string | null
    region: string | null
    locale: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MunicipalityCountAggregateOutputType = {
    id: number
    name: number
    country: number
    region: number
    locale: number
    timezone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MunicipalityMinAggregateInputType = {
    id?: true
    name?: true
    country?: true
    region?: true
    locale?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MunicipalityMaxAggregateInputType = {
    id?: true
    name?: true
    country?: true
    region?: true
    locale?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MunicipalityCountAggregateInputType = {
    id?: true
    name?: true
    country?: true
    region?: true
    locale?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MunicipalityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Municipality to aggregate.
     */
    where?: MunicipalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Municipalities to fetch.
     */
    orderBy?: MunicipalityOrderByWithRelationInput | MunicipalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MunicipalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Municipalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Municipalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Municipalities
    **/
    _count?: true | MunicipalityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MunicipalityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MunicipalityMaxAggregateInputType
  }

  export type GetMunicipalityAggregateType<T extends MunicipalityAggregateArgs> = {
        [P in keyof T & keyof AggregateMunicipality]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMunicipality[P]>
      : GetScalarType<T[P], AggregateMunicipality[P]>
  }




  export type MunicipalityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MunicipalityWhereInput
    orderBy?: MunicipalityOrderByWithAggregationInput | MunicipalityOrderByWithAggregationInput[]
    by: MunicipalityScalarFieldEnum[] | MunicipalityScalarFieldEnum
    having?: MunicipalityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MunicipalityCountAggregateInputType | true
    _min?: MunicipalityMinAggregateInputType
    _max?: MunicipalityMaxAggregateInputType
  }

  export type MunicipalityGroupByOutputType = {
    id: string
    name: string
    country: string
    region: string
    locale: string
    timezone: string
    createdAt: Date
    updatedAt: Date
    _count: MunicipalityCountAggregateOutputType | null
    _min: MunicipalityMinAggregateOutputType | null
    _max: MunicipalityMaxAggregateOutputType | null
  }

  type GetMunicipalityGroupByPayload<T extends MunicipalityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MunicipalityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MunicipalityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MunicipalityGroupByOutputType[P]>
            : GetScalarType<T[P], MunicipalityGroupByOutputType[P]>
        }
      >
    >


  export type MunicipalitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    country?: boolean
    region?: boolean
    locale?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgets?: boolean | Municipality$budgetsArgs<ExtArgs>
    expenditures?: boolean | Municipality$expendituresArgs<ExtArgs>
    projects?: boolean | Municipality$projectsArgs<ExtArgs>
    users?: boolean | Municipality$usersArgs<ExtArgs>
    _count?: boolean | MunicipalityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["municipality"]>

  export type MunicipalitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    country?: boolean
    region?: boolean
    locale?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["municipality"]>

  export type MunicipalitySelectScalar = {
    id?: boolean
    name?: boolean
    country?: boolean
    region?: boolean
    locale?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MunicipalityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgets?: boolean | Municipality$budgetsArgs<ExtArgs>
    expenditures?: boolean | Municipality$expendituresArgs<ExtArgs>
    projects?: boolean | Municipality$projectsArgs<ExtArgs>
    users?: boolean | Municipality$usersArgs<ExtArgs>
    _count?: boolean | MunicipalityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MunicipalityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MunicipalityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Municipality"
    objects: {
      budgets: Prisma.$BudgetPayload<ExtArgs>[]
      expenditures: Prisma.$ExpenditurePayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      country: string
      region: string
      locale: string
      timezone: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["municipality"]>
    composites: {}
  }

  type MunicipalityGetPayload<S extends boolean | null | undefined | MunicipalityDefaultArgs> = $Result.GetResult<Prisma.$MunicipalityPayload, S>

  type MunicipalityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MunicipalityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MunicipalityCountAggregateInputType | true
    }

  export interface MunicipalityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Municipality'], meta: { name: 'Municipality' } }
    /**
     * Find zero or one Municipality that matches the filter.
     * @param {MunicipalityFindUniqueArgs} args - Arguments to find a Municipality
     * @example
     * // Get one Municipality
     * const municipality = await prisma.municipality.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MunicipalityFindUniqueArgs>(args: SelectSubset<T, MunicipalityFindUniqueArgs<ExtArgs>>): Prisma__MunicipalityClient<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Municipality that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MunicipalityFindUniqueOrThrowArgs} args - Arguments to find a Municipality
     * @example
     * // Get one Municipality
     * const municipality = await prisma.municipality.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MunicipalityFindUniqueOrThrowArgs>(args: SelectSubset<T, MunicipalityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MunicipalityClient<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Municipality that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MunicipalityFindFirstArgs} args - Arguments to find a Municipality
     * @example
     * // Get one Municipality
     * const municipality = await prisma.municipality.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MunicipalityFindFirstArgs>(args?: SelectSubset<T, MunicipalityFindFirstArgs<ExtArgs>>): Prisma__MunicipalityClient<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Municipality that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MunicipalityFindFirstOrThrowArgs} args - Arguments to find a Municipality
     * @example
     * // Get one Municipality
     * const municipality = await prisma.municipality.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MunicipalityFindFirstOrThrowArgs>(args?: SelectSubset<T, MunicipalityFindFirstOrThrowArgs<ExtArgs>>): Prisma__MunicipalityClient<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Municipalities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MunicipalityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Municipalities
     * const municipalities = await prisma.municipality.findMany()
     * 
     * // Get first 10 Municipalities
     * const municipalities = await prisma.municipality.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const municipalityWithIdOnly = await prisma.municipality.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MunicipalityFindManyArgs>(args?: SelectSubset<T, MunicipalityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Municipality.
     * @param {MunicipalityCreateArgs} args - Arguments to create a Municipality.
     * @example
     * // Create one Municipality
     * const Municipality = await prisma.municipality.create({
     *   data: {
     *     // ... data to create a Municipality
     *   }
     * })
     * 
     */
    create<T extends MunicipalityCreateArgs>(args: SelectSubset<T, MunicipalityCreateArgs<ExtArgs>>): Prisma__MunicipalityClient<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Municipalities.
     * @param {MunicipalityCreateManyArgs} args - Arguments to create many Municipalities.
     * @example
     * // Create many Municipalities
     * const municipality = await prisma.municipality.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MunicipalityCreateManyArgs>(args?: SelectSubset<T, MunicipalityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Municipalities and returns the data saved in the database.
     * @param {MunicipalityCreateManyAndReturnArgs} args - Arguments to create many Municipalities.
     * @example
     * // Create many Municipalities
     * const municipality = await prisma.municipality.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Municipalities and only return the `id`
     * const municipalityWithIdOnly = await prisma.municipality.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MunicipalityCreateManyAndReturnArgs>(args?: SelectSubset<T, MunicipalityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Municipality.
     * @param {MunicipalityDeleteArgs} args - Arguments to delete one Municipality.
     * @example
     * // Delete one Municipality
     * const Municipality = await prisma.municipality.delete({
     *   where: {
     *     // ... filter to delete one Municipality
     *   }
     * })
     * 
     */
    delete<T extends MunicipalityDeleteArgs>(args: SelectSubset<T, MunicipalityDeleteArgs<ExtArgs>>): Prisma__MunicipalityClient<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Municipality.
     * @param {MunicipalityUpdateArgs} args - Arguments to update one Municipality.
     * @example
     * // Update one Municipality
     * const municipality = await prisma.municipality.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MunicipalityUpdateArgs>(args: SelectSubset<T, MunicipalityUpdateArgs<ExtArgs>>): Prisma__MunicipalityClient<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Municipalities.
     * @param {MunicipalityDeleteManyArgs} args - Arguments to filter Municipalities to delete.
     * @example
     * // Delete a few Municipalities
     * const { count } = await prisma.municipality.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MunicipalityDeleteManyArgs>(args?: SelectSubset<T, MunicipalityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Municipalities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MunicipalityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Municipalities
     * const municipality = await prisma.municipality.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MunicipalityUpdateManyArgs>(args: SelectSubset<T, MunicipalityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Municipality.
     * @param {MunicipalityUpsertArgs} args - Arguments to update or create a Municipality.
     * @example
     * // Update or create a Municipality
     * const municipality = await prisma.municipality.upsert({
     *   create: {
     *     // ... data to create a Municipality
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Municipality we want to update
     *   }
     * })
     */
    upsert<T extends MunicipalityUpsertArgs>(args: SelectSubset<T, MunicipalityUpsertArgs<ExtArgs>>): Prisma__MunicipalityClient<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Municipalities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MunicipalityCountArgs} args - Arguments to filter Municipalities to count.
     * @example
     * // Count the number of Municipalities
     * const count = await prisma.municipality.count({
     *   where: {
     *     // ... the filter for the Municipalities we want to count
     *   }
     * })
    **/
    count<T extends MunicipalityCountArgs>(
      args?: Subset<T, MunicipalityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MunicipalityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Municipality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MunicipalityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MunicipalityAggregateArgs>(args: Subset<T, MunicipalityAggregateArgs>): Prisma.PrismaPromise<GetMunicipalityAggregateType<T>>

    /**
     * Group by Municipality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MunicipalityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MunicipalityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MunicipalityGroupByArgs['orderBy'] }
        : { orderBy?: MunicipalityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MunicipalityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMunicipalityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Municipality model
   */
  readonly fields: MunicipalityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Municipality.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MunicipalityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    budgets<T extends Municipality$budgetsArgs<ExtArgs> = {}>(args?: Subset<T, Municipality$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany"> | Null>
    expenditures<T extends Municipality$expendituresArgs<ExtArgs> = {}>(args?: Subset<T, Municipality$expendituresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "findMany"> | Null>
    projects<T extends Municipality$projectsArgs<ExtArgs> = {}>(args?: Subset<T, Municipality$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany"> | Null>
    users<T extends Municipality$usersArgs<ExtArgs> = {}>(args?: Subset<T, Municipality$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Municipality model
   */ 
  interface MunicipalityFieldRefs {
    readonly id: FieldRef<"Municipality", 'String'>
    readonly name: FieldRef<"Municipality", 'String'>
    readonly country: FieldRef<"Municipality", 'String'>
    readonly region: FieldRef<"Municipality", 'String'>
    readonly locale: FieldRef<"Municipality", 'String'>
    readonly timezone: FieldRef<"Municipality", 'String'>
    readonly createdAt: FieldRef<"Municipality", 'DateTime'>
    readonly updatedAt: FieldRef<"Municipality", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Municipality findUnique
   */
  export type MunicipalityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Municipality
     */
    select?: MunicipalitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MunicipalityInclude<ExtArgs> | null
    /**
     * Filter, which Municipality to fetch.
     */
    where: MunicipalityWhereUniqueInput
  }

  /**
   * Municipality findUniqueOrThrow
   */
  export type MunicipalityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Municipality
     */
    select?: MunicipalitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MunicipalityInclude<ExtArgs> | null
    /**
     * Filter, which Municipality to fetch.
     */
    where: MunicipalityWhereUniqueInput
  }

  /**
   * Municipality findFirst
   */
  export type MunicipalityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Municipality
     */
    select?: MunicipalitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MunicipalityInclude<ExtArgs> | null
    /**
     * Filter, which Municipality to fetch.
     */
    where?: MunicipalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Municipalities to fetch.
     */
    orderBy?: MunicipalityOrderByWithRelationInput | MunicipalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Municipalities.
     */
    cursor?: MunicipalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Municipalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Municipalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Municipalities.
     */
    distinct?: MunicipalityScalarFieldEnum | MunicipalityScalarFieldEnum[]
  }

  /**
   * Municipality findFirstOrThrow
   */
  export type MunicipalityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Municipality
     */
    select?: MunicipalitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MunicipalityInclude<ExtArgs> | null
    /**
     * Filter, which Municipality to fetch.
     */
    where?: MunicipalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Municipalities to fetch.
     */
    orderBy?: MunicipalityOrderByWithRelationInput | MunicipalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Municipalities.
     */
    cursor?: MunicipalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Municipalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Municipalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Municipalities.
     */
    distinct?: MunicipalityScalarFieldEnum | MunicipalityScalarFieldEnum[]
  }

  /**
   * Municipality findMany
   */
  export type MunicipalityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Municipality
     */
    select?: MunicipalitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MunicipalityInclude<ExtArgs> | null
    /**
     * Filter, which Municipalities to fetch.
     */
    where?: MunicipalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Municipalities to fetch.
     */
    orderBy?: MunicipalityOrderByWithRelationInput | MunicipalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Municipalities.
     */
    cursor?: MunicipalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Municipalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Municipalities.
     */
    skip?: number
    distinct?: MunicipalityScalarFieldEnum | MunicipalityScalarFieldEnum[]
  }

  /**
   * Municipality create
   */
  export type MunicipalityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Municipality
     */
    select?: MunicipalitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MunicipalityInclude<ExtArgs> | null
    /**
     * The data needed to create a Municipality.
     */
    data: XOR<MunicipalityCreateInput, MunicipalityUncheckedCreateInput>
  }

  /**
   * Municipality createMany
   */
  export type MunicipalityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Municipalities.
     */
    data: MunicipalityCreateManyInput | MunicipalityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Municipality createManyAndReturn
   */
  export type MunicipalityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Municipality
     */
    select?: MunicipalitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Municipalities.
     */
    data: MunicipalityCreateManyInput | MunicipalityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Municipality update
   */
  export type MunicipalityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Municipality
     */
    select?: MunicipalitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MunicipalityInclude<ExtArgs> | null
    /**
     * The data needed to update a Municipality.
     */
    data: XOR<MunicipalityUpdateInput, MunicipalityUncheckedUpdateInput>
    /**
     * Choose, which Municipality to update.
     */
    where: MunicipalityWhereUniqueInput
  }

  /**
   * Municipality updateMany
   */
  export type MunicipalityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Municipalities.
     */
    data: XOR<MunicipalityUpdateManyMutationInput, MunicipalityUncheckedUpdateManyInput>
    /**
     * Filter which Municipalities to update
     */
    where?: MunicipalityWhereInput
  }

  /**
   * Municipality upsert
   */
  export type MunicipalityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Municipality
     */
    select?: MunicipalitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MunicipalityInclude<ExtArgs> | null
    /**
     * The filter to search for the Municipality to update in case it exists.
     */
    where: MunicipalityWhereUniqueInput
    /**
     * In case the Municipality found by the `where` argument doesn't exist, create a new Municipality with this data.
     */
    create: XOR<MunicipalityCreateInput, MunicipalityUncheckedCreateInput>
    /**
     * In case the Municipality was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MunicipalityUpdateInput, MunicipalityUncheckedUpdateInput>
  }

  /**
   * Municipality delete
   */
  export type MunicipalityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Municipality
     */
    select?: MunicipalitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MunicipalityInclude<ExtArgs> | null
    /**
     * Filter which Municipality to delete.
     */
    where: MunicipalityWhereUniqueInput
  }

  /**
   * Municipality deleteMany
   */
  export type MunicipalityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Municipalities to delete
     */
    where?: MunicipalityWhereInput
  }

  /**
   * Municipality.budgets
   */
  export type Municipality$budgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    cursor?: BudgetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Municipality.expenditures
   */
  export type Municipality$expendituresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
    where?: ExpenditureWhereInput
    orderBy?: ExpenditureOrderByWithRelationInput | ExpenditureOrderByWithRelationInput[]
    cursor?: ExpenditureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenditureScalarFieldEnum | ExpenditureScalarFieldEnum[]
  }

  /**
   * Municipality.projects
   */
  export type Municipality$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Municipality.users
   */
  export type Municipality$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Municipality without action
   */
  export type MunicipalityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Municipality
     */
    select?: MunicipalitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MunicipalityInclude<ExtArgs> | null
  }


  /**
   * Model FiscalYear
   */

  export type AggregateFiscalYear = {
    _count: FiscalYearCountAggregateOutputType | null
    _avg: FiscalYearAvgAggregateOutputType | null
    _sum: FiscalYearSumAggregateOutputType | null
    _min: FiscalYearMinAggregateOutputType | null
    _max: FiscalYearMaxAggregateOutputType | null
  }

  export type FiscalYearAvgAggregateOutputType = {
    year: number | null
  }

  export type FiscalYearSumAggregateOutputType = {
    year: number | null
  }

  export type FiscalYearMinAggregateOutputType = {
    id: string | null
    year: number | null
    status: string | null
    lockedAt: Date | null
  }

  export type FiscalYearMaxAggregateOutputType = {
    id: string | null
    year: number | null
    status: string | null
    lockedAt: Date | null
  }

  export type FiscalYearCountAggregateOutputType = {
    id: number
    year: number
    status: number
    lockedAt: number
    _all: number
  }


  export type FiscalYearAvgAggregateInputType = {
    year?: true
  }

  export type FiscalYearSumAggregateInputType = {
    year?: true
  }

  export type FiscalYearMinAggregateInputType = {
    id?: true
    year?: true
    status?: true
    lockedAt?: true
  }

  export type FiscalYearMaxAggregateInputType = {
    id?: true
    year?: true
    status?: true
    lockedAt?: true
  }

  export type FiscalYearCountAggregateInputType = {
    id?: true
    year?: true
    status?: true
    lockedAt?: true
    _all?: true
  }

  export type FiscalYearAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FiscalYear to aggregate.
     */
    where?: FiscalYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FiscalYears to fetch.
     */
    orderBy?: FiscalYearOrderByWithRelationInput | FiscalYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FiscalYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FiscalYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FiscalYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FiscalYears
    **/
    _count?: true | FiscalYearCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FiscalYearAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FiscalYearSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FiscalYearMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FiscalYearMaxAggregateInputType
  }

  export type GetFiscalYearAggregateType<T extends FiscalYearAggregateArgs> = {
        [P in keyof T & keyof AggregateFiscalYear]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFiscalYear[P]>
      : GetScalarType<T[P], AggregateFiscalYear[P]>
  }




  export type FiscalYearGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FiscalYearWhereInput
    orderBy?: FiscalYearOrderByWithAggregationInput | FiscalYearOrderByWithAggregationInput[]
    by: FiscalYearScalarFieldEnum[] | FiscalYearScalarFieldEnum
    having?: FiscalYearScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FiscalYearCountAggregateInputType | true
    _avg?: FiscalYearAvgAggregateInputType
    _sum?: FiscalYearSumAggregateInputType
    _min?: FiscalYearMinAggregateInputType
    _max?: FiscalYearMaxAggregateInputType
  }

  export type FiscalYearGroupByOutputType = {
    id: string
    year: number
    status: string
    lockedAt: Date | null
    _count: FiscalYearCountAggregateOutputType | null
    _avg: FiscalYearAvgAggregateOutputType | null
    _sum: FiscalYearSumAggregateOutputType | null
    _min: FiscalYearMinAggregateOutputType | null
    _max: FiscalYearMaxAggregateOutputType | null
  }

  type GetFiscalYearGroupByPayload<T extends FiscalYearGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FiscalYearGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FiscalYearGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FiscalYearGroupByOutputType[P]>
            : GetScalarType<T[P], FiscalYearGroupByOutputType[P]>
        }
      >
    >


  export type FiscalYearSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    status?: boolean
    lockedAt?: boolean
    budgets?: boolean | FiscalYear$budgetsArgs<ExtArgs>
    expenditures?: boolean | FiscalYear$expendituresArgs<ExtArgs>
    _count?: boolean | FiscalYearCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fiscalYear"]>

  export type FiscalYearSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    status?: boolean
    lockedAt?: boolean
  }, ExtArgs["result"]["fiscalYear"]>

  export type FiscalYearSelectScalar = {
    id?: boolean
    year?: boolean
    status?: boolean
    lockedAt?: boolean
  }

  export type FiscalYearInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgets?: boolean | FiscalYear$budgetsArgs<ExtArgs>
    expenditures?: boolean | FiscalYear$expendituresArgs<ExtArgs>
    _count?: boolean | FiscalYearCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FiscalYearIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FiscalYearPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FiscalYear"
    objects: {
      budgets: Prisma.$BudgetPayload<ExtArgs>[]
      expenditures: Prisma.$ExpenditurePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      year: number
      status: string
      lockedAt: Date | null
    }, ExtArgs["result"]["fiscalYear"]>
    composites: {}
  }

  type FiscalYearGetPayload<S extends boolean | null | undefined | FiscalYearDefaultArgs> = $Result.GetResult<Prisma.$FiscalYearPayload, S>

  type FiscalYearCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FiscalYearFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FiscalYearCountAggregateInputType | true
    }

  export interface FiscalYearDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FiscalYear'], meta: { name: 'FiscalYear' } }
    /**
     * Find zero or one FiscalYear that matches the filter.
     * @param {FiscalYearFindUniqueArgs} args - Arguments to find a FiscalYear
     * @example
     * // Get one FiscalYear
     * const fiscalYear = await prisma.fiscalYear.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FiscalYearFindUniqueArgs>(args: SelectSubset<T, FiscalYearFindUniqueArgs<ExtArgs>>): Prisma__FiscalYearClient<$Result.GetResult<Prisma.$FiscalYearPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FiscalYear that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FiscalYearFindUniqueOrThrowArgs} args - Arguments to find a FiscalYear
     * @example
     * // Get one FiscalYear
     * const fiscalYear = await prisma.fiscalYear.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FiscalYearFindUniqueOrThrowArgs>(args: SelectSubset<T, FiscalYearFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FiscalYearClient<$Result.GetResult<Prisma.$FiscalYearPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FiscalYear that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalYearFindFirstArgs} args - Arguments to find a FiscalYear
     * @example
     * // Get one FiscalYear
     * const fiscalYear = await prisma.fiscalYear.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FiscalYearFindFirstArgs>(args?: SelectSubset<T, FiscalYearFindFirstArgs<ExtArgs>>): Prisma__FiscalYearClient<$Result.GetResult<Prisma.$FiscalYearPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FiscalYear that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalYearFindFirstOrThrowArgs} args - Arguments to find a FiscalYear
     * @example
     * // Get one FiscalYear
     * const fiscalYear = await prisma.fiscalYear.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FiscalYearFindFirstOrThrowArgs>(args?: SelectSubset<T, FiscalYearFindFirstOrThrowArgs<ExtArgs>>): Prisma__FiscalYearClient<$Result.GetResult<Prisma.$FiscalYearPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FiscalYears that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalYearFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FiscalYears
     * const fiscalYears = await prisma.fiscalYear.findMany()
     * 
     * // Get first 10 FiscalYears
     * const fiscalYears = await prisma.fiscalYear.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fiscalYearWithIdOnly = await prisma.fiscalYear.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FiscalYearFindManyArgs>(args?: SelectSubset<T, FiscalYearFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FiscalYearPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FiscalYear.
     * @param {FiscalYearCreateArgs} args - Arguments to create a FiscalYear.
     * @example
     * // Create one FiscalYear
     * const FiscalYear = await prisma.fiscalYear.create({
     *   data: {
     *     // ... data to create a FiscalYear
     *   }
     * })
     * 
     */
    create<T extends FiscalYearCreateArgs>(args: SelectSubset<T, FiscalYearCreateArgs<ExtArgs>>): Prisma__FiscalYearClient<$Result.GetResult<Prisma.$FiscalYearPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FiscalYears.
     * @param {FiscalYearCreateManyArgs} args - Arguments to create many FiscalYears.
     * @example
     * // Create many FiscalYears
     * const fiscalYear = await prisma.fiscalYear.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FiscalYearCreateManyArgs>(args?: SelectSubset<T, FiscalYearCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FiscalYears and returns the data saved in the database.
     * @param {FiscalYearCreateManyAndReturnArgs} args - Arguments to create many FiscalYears.
     * @example
     * // Create many FiscalYears
     * const fiscalYear = await prisma.fiscalYear.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FiscalYears and only return the `id`
     * const fiscalYearWithIdOnly = await prisma.fiscalYear.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FiscalYearCreateManyAndReturnArgs>(args?: SelectSubset<T, FiscalYearCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FiscalYearPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FiscalYear.
     * @param {FiscalYearDeleteArgs} args - Arguments to delete one FiscalYear.
     * @example
     * // Delete one FiscalYear
     * const FiscalYear = await prisma.fiscalYear.delete({
     *   where: {
     *     // ... filter to delete one FiscalYear
     *   }
     * })
     * 
     */
    delete<T extends FiscalYearDeleteArgs>(args: SelectSubset<T, FiscalYearDeleteArgs<ExtArgs>>): Prisma__FiscalYearClient<$Result.GetResult<Prisma.$FiscalYearPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FiscalYear.
     * @param {FiscalYearUpdateArgs} args - Arguments to update one FiscalYear.
     * @example
     * // Update one FiscalYear
     * const fiscalYear = await prisma.fiscalYear.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FiscalYearUpdateArgs>(args: SelectSubset<T, FiscalYearUpdateArgs<ExtArgs>>): Prisma__FiscalYearClient<$Result.GetResult<Prisma.$FiscalYearPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FiscalYears.
     * @param {FiscalYearDeleteManyArgs} args - Arguments to filter FiscalYears to delete.
     * @example
     * // Delete a few FiscalYears
     * const { count } = await prisma.fiscalYear.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FiscalYearDeleteManyArgs>(args?: SelectSubset<T, FiscalYearDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FiscalYears.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalYearUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FiscalYears
     * const fiscalYear = await prisma.fiscalYear.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FiscalYearUpdateManyArgs>(args: SelectSubset<T, FiscalYearUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FiscalYear.
     * @param {FiscalYearUpsertArgs} args - Arguments to update or create a FiscalYear.
     * @example
     * // Update or create a FiscalYear
     * const fiscalYear = await prisma.fiscalYear.upsert({
     *   create: {
     *     // ... data to create a FiscalYear
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FiscalYear we want to update
     *   }
     * })
     */
    upsert<T extends FiscalYearUpsertArgs>(args: SelectSubset<T, FiscalYearUpsertArgs<ExtArgs>>): Prisma__FiscalYearClient<$Result.GetResult<Prisma.$FiscalYearPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FiscalYears.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalYearCountArgs} args - Arguments to filter FiscalYears to count.
     * @example
     * // Count the number of FiscalYears
     * const count = await prisma.fiscalYear.count({
     *   where: {
     *     // ... the filter for the FiscalYears we want to count
     *   }
     * })
    **/
    count<T extends FiscalYearCountArgs>(
      args?: Subset<T, FiscalYearCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FiscalYearCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FiscalYear.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalYearAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FiscalYearAggregateArgs>(args: Subset<T, FiscalYearAggregateArgs>): Prisma.PrismaPromise<GetFiscalYearAggregateType<T>>

    /**
     * Group by FiscalYear.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalYearGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FiscalYearGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FiscalYearGroupByArgs['orderBy'] }
        : { orderBy?: FiscalYearGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FiscalYearGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFiscalYearGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FiscalYear model
   */
  readonly fields: FiscalYearFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FiscalYear.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FiscalYearClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    budgets<T extends FiscalYear$budgetsArgs<ExtArgs> = {}>(args?: Subset<T, FiscalYear$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany"> | Null>
    expenditures<T extends FiscalYear$expendituresArgs<ExtArgs> = {}>(args?: Subset<T, FiscalYear$expendituresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FiscalYear model
   */ 
  interface FiscalYearFieldRefs {
    readonly id: FieldRef<"FiscalYear", 'String'>
    readonly year: FieldRef<"FiscalYear", 'Int'>
    readonly status: FieldRef<"FiscalYear", 'String'>
    readonly lockedAt: FieldRef<"FiscalYear", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FiscalYear findUnique
   */
  export type FiscalYearFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalYear
     */
    select?: FiscalYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalYearInclude<ExtArgs> | null
    /**
     * Filter, which FiscalYear to fetch.
     */
    where: FiscalYearWhereUniqueInput
  }

  /**
   * FiscalYear findUniqueOrThrow
   */
  export type FiscalYearFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalYear
     */
    select?: FiscalYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalYearInclude<ExtArgs> | null
    /**
     * Filter, which FiscalYear to fetch.
     */
    where: FiscalYearWhereUniqueInput
  }

  /**
   * FiscalYear findFirst
   */
  export type FiscalYearFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalYear
     */
    select?: FiscalYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalYearInclude<ExtArgs> | null
    /**
     * Filter, which FiscalYear to fetch.
     */
    where?: FiscalYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FiscalYears to fetch.
     */
    orderBy?: FiscalYearOrderByWithRelationInput | FiscalYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FiscalYears.
     */
    cursor?: FiscalYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FiscalYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FiscalYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FiscalYears.
     */
    distinct?: FiscalYearScalarFieldEnum | FiscalYearScalarFieldEnum[]
  }

  /**
   * FiscalYear findFirstOrThrow
   */
  export type FiscalYearFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalYear
     */
    select?: FiscalYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalYearInclude<ExtArgs> | null
    /**
     * Filter, which FiscalYear to fetch.
     */
    where?: FiscalYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FiscalYears to fetch.
     */
    orderBy?: FiscalYearOrderByWithRelationInput | FiscalYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FiscalYears.
     */
    cursor?: FiscalYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FiscalYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FiscalYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FiscalYears.
     */
    distinct?: FiscalYearScalarFieldEnum | FiscalYearScalarFieldEnum[]
  }

  /**
   * FiscalYear findMany
   */
  export type FiscalYearFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalYear
     */
    select?: FiscalYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalYearInclude<ExtArgs> | null
    /**
     * Filter, which FiscalYears to fetch.
     */
    where?: FiscalYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FiscalYears to fetch.
     */
    orderBy?: FiscalYearOrderByWithRelationInput | FiscalYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FiscalYears.
     */
    cursor?: FiscalYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FiscalYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FiscalYears.
     */
    skip?: number
    distinct?: FiscalYearScalarFieldEnum | FiscalYearScalarFieldEnum[]
  }

  /**
   * FiscalYear create
   */
  export type FiscalYearCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalYear
     */
    select?: FiscalYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalYearInclude<ExtArgs> | null
    /**
     * The data needed to create a FiscalYear.
     */
    data: XOR<FiscalYearCreateInput, FiscalYearUncheckedCreateInput>
  }

  /**
   * FiscalYear createMany
   */
  export type FiscalYearCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FiscalYears.
     */
    data: FiscalYearCreateManyInput | FiscalYearCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FiscalYear createManyAndReturn
   */
  export type FiscalYearCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalYear
     */
    select?: FiscalYearSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FiscalYears.
     */
    data: FiscalYearCreateManyInput | FiscalYearCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FiscalYear update
   */
  export type FiscalYearUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalYear
     */
    select?: FiscalYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalYearInclude<ExtArgs> | null
    /**
     * The data needed to update a FiscalYear.
     */
    data: XOR<FiscalYearUpdateInput, FiscalYearUncheckedUpdateInput>
    /**
     * Choose, which FiscalYear to update.
     */
    where: FiscalYearWhereUniqueInput
  }

  /**
   * FiscalYear updateMany
   */
  export type FiscalYearUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FiscalYears.
     */
    data: XOR<FiscalYearUpdateManyMutationInput, FiscalYearUncheckedUpdateManyInput>
    /**
     * Filter which FiscalYears to update
     */
    where?: FiscalYearWhereInput
  }

  /**
   * FiscalYear upsert
   */
  export type FiscalYearUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalYear
     */
    select?: FiscalYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalYearInclude<ExtArgs> | null
    /**
     * The filter to search for the FiscalYear to update in case it exists.
     */
    where: FiscalYearWhereUniqueInput
    /**
     * In case the FiscalYear found by the `where` argument doesn't exist, create a new FiscalYear with this data.
     */
    create: XOR<FiscalYearCreateInput, FiscalYearUncheckedCreateInput>
    /**
     * In case the FiscalYear was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FiscalYearUpdateInput, FiscalYearUncheckedUpdateInput>
  }

  /**
   * FiscalYear delete
   */
  export type FiscalYearDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalYear
     */
    select?: FiscalYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalYearInclude<ExtArgs> | null
    /**
     * Filter which FiscalYear to delete.
     */
    where: FiscalYearWhereUniqueInput
  }

  /**
   * FiscalYear deleteMany
   */
  export type FiscalYearDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FiscalYears to delete
     */
    where?: FiscalYearWhereInput
  }

  /**
   * FiscalYear.budgets
   */
  export type FiscalYear$budgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    cursor?: BudgetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * FiscalYear.expenditures
   */
  export type FiscalYear$expendituresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
    where?: ExpenditureWhereInput
    orderBy?: ExpenditureOrderByWithRelationInput | ExpenditureOrderByWithRelationInput[]
    cursor?: ExpenditureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenditureScalarFieldEnum | ExpenditureScalarFieldEnum[]
  }

  /**
   * FiscalYear without action
   */
  export type FiscalYearDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalYear
     */
    select?: FiscalYearSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalYearInclude<ExtArgs> | null
  }


  /**
   * Model Budget
   */

  export type AggregateBudget = {
    _count: BudgetCountAggregateOutputType | null
    _avg: BudgetAvgAggregateOutputType | null
    _sum: BudgetSumAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  export type BudgetAvgAggregateOutputType = {
    amountPlanned: Decimal | null
  }

  export type BudgetSumAggregateOutputType = {
    amountPlanned: Decimal | null
  }

  export type BudgetMinAggregateOutputType = {
    id: string | null
    municipalityId: string | null
    fiscalYearId: string | null
    department: string | null
    program: string | null
    category: string | null
    subcategory: string | null
    amountPlanned: Decimal | null
    currency: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BudgetMaxAggregateOutputType = {
    id: string | null
    municipalityId: string | null
    fiscalYearId: string | null
    department: string | null
    program: string | null
    category: string | null
    subcategory: string | null
    amountPlanned: Decimal | null
    currency: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BudgetCountAggregateOutputType = {
    id: number
    municipalityId: number
    fiscalYearId: number
    department: number
    program: number
    category: number
    subcategory: number
    amountPlanned: number
    currency: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BudgetAvgAggregateInputType = {
    amountPlanned?: true
  }

  export type BudgetSumAggregateInputType = {
    amountPlanned?: true
  }

  export type BudgetMinAggregateInputType = {
    id?: true
    municipalityId?: true
    fiscalYearId?: true
    department?: true
    program?: true
    category?: true
    subcategory?: true
    amountPlanned?: true
    currency?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BudgetMaxAggregateInputType = {
    id?: true
    municipalityId?: true
    fiscalYearId?: true
    department?: true
    program?: true
    category?: true
    subcategory?: true
    amountPlanned?: true
    currency?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BudgetCountAggregateInputType = {
    id?: true
    municipalityId?: true
    fiscalYearId?: true
    department?: true
    program?: true
    category?: true
    subcategory?: true
    amountPlanned?: true
    currency?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BudgetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Budget to aggregate.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Budgets
    **/
    _count?: true | BudgetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BudgetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BudgetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetMaxAggregateInputType
  }

  export type GetBudgetAggregateType<T extends BudgetAggregateArgs> = {
        [P in keyof T & keyof AggregateBudget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudget[P]>
      : GetScalarType<T[P], AggregateBudget[P]>
  }




  export type BudgetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithAggregationInput | BudgetOrderByWithAggregationInput[]
    by: BudgetScalarFieldEnum[] | BudgetScalarFieldEnum
    having?: BudgetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetCountAggregateInputType | true
    _avg?: BudgetAvgAggregateInputType
    _sum?: BudgetSumAggregateInputType
    _min?: BudgetMinAggregateInputType
    _max?: BudgetMaxAggregateInputType
  }

  export type BudgetGroupByOutputType = {
    id: string
    municipalityId: string
    fiscalYearId: string
    department: string
    program: string
    category: string
    subcategory: string
    amountPlanned: Decimal
    currency: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: BudgetCountAggregateOutputType | null
    _avg: BudgetAvgAggregateOutputType | null
    _sum: BudgetSumAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  type GetBudgetGroupByPayload<T extends BudgetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BudgetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BudgetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetGroupByOutputType[P]>
        }
      >
    >


  export type BudgetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    municipalityId?: boolean
    fiscalYearId?: boolean
    department?: boolean
    program?: boolean
    category?: boolean
    subcategory?: boolean
    amountPlanned?: boolean
    currency?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    municipality?: boolean | MunicipalityDefaultArgs<ExtArgs>
    fiscalYear?: boolean | FiscalYearDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budget"]>

  export type BudgetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    municipalityId?: boolean
    fiscalYearId?: boolean
    department?: boolean
    program?: boolean
    category?: boolean
    subcategory?: boolean
    amountPlanned?: boolean
    currency?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    municipality?: boolean | MunicipalityDefaultArgs<ExtArgs>
    fiscalYear?: boolean | FiscalYearDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budget"]>

  export type BudgetSelectScalar = {
    id?: boolean
    municipalityId?: boolean
    fiscalYearId?: boolean
    department?: boolean
    program?: boolean
    category?: boolean
    subcategory?: boolean
    amountPlanned?: boolean
    currency?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BudgetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    municipality?: boolean | MunicipalityDefaultArgs<ExtArgs>
    fiscalYear?: boolean | FiscalYearDefaultArgs<ExtArgs>
  }
  export type BudgetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    municipality?: boolean | MunicipalityDefaultArgs<ExtArgs>
    fiscalYear?: boolean | FiscalYearDefaultArgs<ExtArgs>
  }

  export type $BudgetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Budget"
    objects: {
      municipality: Prisma.$MunicipalityPayload<ExtArgs>
      fiscalYear: Prisma.$FiscalYearPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      municipalityId: string
      fiscalYearId: string
      department: string
      program: string
      category: string
      subcategory: string
      amountPlanned: Prisma.Decimal
      currency: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["budget"]>
    composites: {}
  }

  type BudgetGetPayload<S extends boolean | null | undefined | BudgetDefaultArgs> = $Result.GetResult<Prisma.$BudgetPayload, S>

  type BudgetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BudgetFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BudgetCountAggregateInputType | true
    }

  export interface BudgetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Budget'], meta: { name: 'Budget' } }
    /**
     * Find zero or one Budget that matches the filter.
     * @param {BudgetFindUniqueArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BudgetFindUniqueArgs>(args: SelectSubset<T, BudgetFindUniqueArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Budget that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BudgetFindUniqueOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BudgetFindUniqueOrThrowArgs>(args: SelectSubset<T, BudgetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Budget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BudgetFindFirstArgs>(args?: SelectSubset<T, BudgetFindFirstArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Budget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BudgetFindFirstOrThrowArgs>(args?: SelectSubset<T, BudgetFindFirstOrThrowArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Budgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Budgets
     * const budgets = await prisma.budget.findMany()
     * 
     * // Get first 10 Budgets
     * const budgets = await prisma.budget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetWithIdOnly = await prisma.budget.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BudgetFindManyArgs>(args?: SelectSubset<T, BudgetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Budget.
     * @param {BudgetCreateArgs} args - Arguments to create a Budget.
     * @example
     * // Create one Budget
     * const Budget = await prisma.budget.create({
     *   data: {
     *     // ... data to create a Budget
     *   }
     * })
     * 
     */
    create<T extends BudgetCreateArgs>(args: SelectSubset<T, BudgetCreateArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Budgets.
     * @param {BudgetCreateManyArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budget = await prisma.budget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BudgetCreateManyArgs>(args?: SelectSubset<T, BudgetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Budgets and returns the data saved in the database.
     * @param {BudgetCreateManyAndReturnArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budget = await prisma.budget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Budgets and only return the `id`
     * const budgetWithIdOnly = await prisma.budget.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BudgetCreateManyAndReturnArgs>(args?: SelectSubset<T, BudgetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Budget.
     * @param {BudgetDeleteArgs} args - Arguments to delete one Budget.
     * @example
     * // Delete one Budget
     * const Budget = await prisma.budget.delete({
     *   where: {
     *     // ... filter to delete one Budget
     *   }
     * })
     * 
     */
    delete<T extends BudgetDeleteArgs>(args: SelectSubset<T, BudgetDeleteArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Budget.
     * @param {BudgetUpdateArgs} args - Arguments to update one Budget.
     * @example
     * // Update one Budget
     * const budget = await prisma.budget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BudgetUpdateArgs>(args: SelectSubset<T, BudgetUpdateArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Budgets.
     * @param {BudgetDeleteManyArgs} args - Arguments to filter Budgets to delete.
     * @example
     * // Delete a few Budgets
     * const { count } = await prisma.budget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BudgetDeleteManyArgs>(args?: SelectSubset<T, BudgetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Budgets
     * const budget = await prisma.budget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BudgetUpdateManyArgs>(args: SelectSubset<T, BudgetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Budget.
     * @param {BudgetUpsertArgs} args - Arguments to update or create a Budget.
     * @example
     * // Update or create a Budget
     * const budget = await prisma.budget.upsert({
     *   create: {
     *     // ... data to create a Budget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Budget we want to update
     *   }
     * })
     */
    upsert<T extends BudgetUpsertArgs>(args: SelectSubset<T, BudgetUpsertArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCountArgs} args - Arguments to filter Budgets to count.
     * @example
     * // Count the number of Budgets
     * const count = await prisma.budget.count({
     *   where: {
     *     // ... the filter for the Budgets we want to count
     *   }
     * })
    **/
    count<T extends BudgetCountArgs>(
      args?: Subset<T, BudgetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BudgetAggregateArgs>(args: Subset<T, BudgetAggregateArgs>): Prisma.PrismaPromise<GetBudgetAggregateType<T>>

    /**
     * Group by Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BudgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetGroupByArgs['orderBy'] }
        : { orderBy?: BudgetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BudgetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Budget model
   */
  readonly fields: BudgetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Budget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BudgetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    municipality<T extends MunicipalityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MunicipalityDefaultArgs<ExtArgs>>): Prisma__MunicipalityClient<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    fiscalYear<T extends FiscalYearDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FiscalYearDefaultArgs<ExtArgs>>): Prisma__FiscalYearClient<$Result.GetResult<Prisma.$FiscalYearPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Budget model
   */ 
  interface BudgetFieldRefs {
    readonly id: FieldRef<"Budget", 'String'>
    readonly municipalityId: FieldRef<"Budget", 'String'>
    readonly fiscalYearId: FieldRef<"Budget", 'String'>
    readonly department: FieldRef<"Budget", 'String'>
    readonly program: FieldRef<"Budget", 'String'>
    readonly category: FieldRef<"Budget", 'String'>
    readonly subcategory: FieldRef<"Budget", 'String'>
    readonly amountPlanned: FieldRef<"Budget", 'Decimal'>
    readonly currency: FieldRef<"Budget", 'String'>
    readonly notes: FieldRef<"Budget", 'String'>
    readonly createdAt: FieldRef<"Budget", 'DateTime'>
    readonly updatedAt: FieldRef<"Budget", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Budget findUnique
   */
  export type BudgetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget findUniqueOrThrow
   */
  export type BudgetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget findFirst
   */
  export type BudgetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
     */
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget findFirstOrThrow
   */
  export type BudgetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
     */
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget findMany
   */
  export type BudgetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budgets to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget create
   */
  export type BudgetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The data needed to create a Budget.
     */
    data: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
  }

  /**
   * Budget createMany
   */
  export type BudgetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Budgets.
     */
    data: BudgetCreateManyInput | BudgetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Budget createManyAndReturn
   */
  export type BudgetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Budgets.
     */
    data: BudgetCreateManyInput | BudgetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Budget update
   */
  export type BudgetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The data needed to update a Budget.
     */
    data: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
    /**
     * Choose, which Budget to update.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget updateMany
   */
  export type BudgetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Budgets.
     */
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyInput>
    /**
     * Filter which Budgets to update
     */
    where?: BudgetWhereInput
  }

  /**
   * Budget upsert
   */
  export type BudgetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The filter to search for the Budget to update in case it exists.
     */
    where: BudgetWhereUniqueInput
    /**
     * In case the Budget found by the `where` argument doesn't exist, create a new Budget with this data.
     */
    create: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
    /**
     * In case the Budget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
  }

  /**
   * Budget delete
   */
  export type BudgetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter which Budget to delete.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget deleteMany
   */
  export type BudgetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Budgets to delete
     */
    where?: BudgetWhereInput
  }

  /**
   * Budget without action
   */
  export type BudgetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
  }


  /**
   * Model Expenditure
   */

  export type AggregateExpenditure = {
    _count: ExpenditureCountAggregateOutputType | null
    _avg: ExpenditureAvgAggregateOutputType | null
    _sum: ExpenditureSumAggregateOutputType | null
    _min: ExpenditureMinAggregateOutputType | null
    _max: ExpenditureMaxAggregateOutputType | null
  }

  export type ExpenditureAvgAggregateOutputType = {
    amountActual: Decimal | null
  }

  export type ExpenditureSumAggregateOutputType = {
    amountActual: Decimal | null
  }

  export type ExpenditureMinAggregateOutputType = {
    id: string | null
    municipalityId: string | null
    fiscalYearId: string | null
    date: Date | null
    department: string | null
    program: string | null
    category: string | null
    subcategory: string | null
    concept: string | null
    amountActual: Decimal | null
    currency: string | null
    supplierId: string | null
    procurementRef: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExpenditureMaxAggregateOutputType = {
    id: string | null
    municipalityId: string | null
    fiscalYearId: string | null
    date: Date | null
    department: string | null
    program: string | null
    category: string | null
    subcategory: string | null
    concept: string | null
    amountActual: Decimal | null
    currency: string | null
    supplierId: string | null
    procurementRef: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExpenditureCountAggregateOutputType = {
    id: number
    municipalityId: number
    fiscalYearId: number
    date: number
    department: number
    program: number
    category: number
    subcategory: number
    concept: number
    amountActual: number
    currency: number
    supplierId: number
    procurementRef: number
    location: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExpenditureAvgAggregateInputType = {
    amountActual?: true
  }

  export type ExpenditureSumAggregateInputType = {
    amountActual?: true
  }

  export type ExpenditureMinAggregateInputType = {
    id?: true
    municipalityId?: true
    fiscalYearId?: true
    date?: true
    department?: true
    program?: true
    category?: true
    subcategory?: true
    concept?: true
    amountActual?: true
    currency?: true
    supplierId?: true
    procurementRef?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExpenditureMaxAggregateInputType = {
    id?: true
    municipalityId?: true
    fiscalYearId?: true
    date?: true
    department?: true
    program?: true
    category?: true
    subcategory?: true
    concept?: true
    amountActual?: true
    currency?: true
    supplierId?: true
    procurementRef?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExpenditureCountAggregateInputType = {
    id?: true
    municipalityId?: true
    fiscalYearId?: true
    date?: true
    department?: true
    program?: true
    category?: true
    subcategory?: true
    concept?: true
    amountActual?: true
    currency?: true
    supplierId?: true
    procurementRef?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExpenditureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenditure to aggregate.
     */
    where?: ExpenditureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenditures to fetch.
     */
    orderBy?: ExpenditureOrderByWithRelationInput | ExpenditureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenditureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenditures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenditures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expenditures
    **/
    _count?: true | ExpenditureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenditureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenditureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenditureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenditureMaxAggregateInputType
  }

  export type GetExpenditureAggregateType<T extends ExpenditureAggregateArgs> = {
        [P in keyof T & keyof AggregateExpenditure]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpenditure[P]>
      : GetScalarType<T[P], AggregateExpenditure[P]>
  }




  export type ExpenditureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenditureWhereInput
    orderBy?: ExpenditureOrderByWithAggregationInput | ExpenditureOrderByWithAggregationInput[]
    by: ExpenditureScalarFieldEnum[] | ExpenditureScalarFieldEnum
    having?: ExpenditureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenditureCountAggregateInputType | true
    _avg?: ExpenditureAvgAggregateInputType
    _sum?: ExpenditureSumAggregateInputType
    _min?: ExpenditureMinAggregateInputType
    _max?: ExpenditureMaxAggregateInputType
  }

  export type ExpenditureGroupByOutputType = {
    id: string
    municipalityId: string
    fiscalYearId: string
    date: Date
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal
    currency: string
    supplierId: string | null
    procurementRef: string | null
    location: string | null
    createdAt: Date
    updatedAt: Date
    _count: ExpenditureCountAggregateOutputType | null
    _avg: ExpenditureAvgAggregateOutputType | null
    _sum: ExpenditureSumAggregateOutputType | null
    _min: ExpenditureMinAggregateOutputType | null
    _max: ExpenditureMaxAggregateOutputType | null
  }

  type GetExpenditureGroupByPayload<T extends ExpenditureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenditureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenditureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenditureGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenditureGroupByOutputType[P]>
        }
      >
    >


  export type ExpenditureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    municipalityId?: boolean
    fiscalYearId?: boolean
    date?: boolean
    department?: boolean
    program?: boolean
    category?: boolean
    subcategory?: boolean
    concept?: boolean
    amountActual?: boolean
    currency?: boolean
    supplierId?: boolean
    procurementRef?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    municipality?: boolean | MunicipalityDefaultArgs<ExtArgs>
    fiscalYear?: boolean | FiscalYearDefaultArgs<ExtArgs>
    supplier?: boolean | Expenditure$supplierArgs<ExtArgs>
  }, ExtArgs["result"]["expenditure"]>

  export type ExpenditureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    municipalityId?: boolean
    fiscalYearId?: boolean
    date?: boolean
    department?: boolean
    program?: boolean
    category?: boolean
    subcategory?: boolean
    concept?: boolean
    amountActual?: boolean
    currency?: boolean
    supplierId?: boolean
    procurementRef?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    municipality?: boolean | MunicipalityDefaultArgs<ExtArgs>
    fiscalYear?: boolean | FiscalYearDefaultArgs<ExtArgs>
    supplier?: boolean | Expenditure$supplierArgs<ExtArgs>
  }, ExtArgs["result"]["expenditure"]>

  export type ExpenditureSelectScalar = {
    id?: boolean
    municipalityId?: boolean
    fiscalYearId?: boolean
    date?: boolean
    department?: boolean
    program?: boolean
    category?: boolean
    subcategory?: boolean
    concept?: boolean
    amountActual?: boolean
    currency?: boolean
    supplierId?: boolean
    procurementRef?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExpenditureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    municipality?: boolean | MunicipalityDefaultArgs<ExtArgs>
    fiscalYear?: boolean | FiscalYearDefaultArgs<ExtArgs>
    supplier?: boolean | Expenditure$supplierArgs<ExtArgs>
  }
  export type ExpenditureIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    municipality?: boolean | MunicipalityDefaultArgs<ExtArgs>
    fiscalYear?: boolean | FiscalYearDefaultArgs<ExtArgs>
    supplier?: boolean | Expenditure$supplierArgs<ExtArgs>
  }

  export type $ExpenditurePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Expenditure"
    objects: {
      municipality: Prisma.$MunicipalityPayload<ExtArgs>
      fiscalYear: Prisma.$FiscalYearPayload<ExtArgs>
      supplier: Prisma.$SupplierPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      municipalityId: string
      fiscalYearId: string
      date: Date
      department: string
      program: string
      category: string
      subcategory: string
      concept: string
      amountActual: Prisma.Decimal
      currency: string
      supplierId: string | null
      procurementRef: string | null
      location: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["expenditure"]>
    composites: {}
  }

  type ExpenditureGetPayload<S extends boolean | null | undefined | ExpenditureDefaultArgs> = $Result.GetResult<Prisma.$ExpenditurePayload, S>

  type ExpenditureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExpenditureFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExpenditureCountAggregateInputType | true
    }

  export interface ExpenditureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Expenditure'], meta: { name: 'Expenditure' } }
    /**
     * Find zero or one Expenditure that matches the filter.
     * @param {ExpenditureFindUniqueArgs} args - Arguments to find a Expenditure
     * @example
     * // Get one Expenditure
     * const expenditure = await prisma.expenditure.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenditureFindUniqueArgs>(args: SelectSubset<T, ExpenditureFindUniqueArgs<ExtArgs>>): Prisma__ExpenditureClient<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Expenditure that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExpenditureFindUniqueOrThrowArgs} args - Arguments to find a Expenditure
     * @example
     * // Get one Expenditure
     * const expenditure = await prisma.expenditure.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenditureFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenditureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenditureClient<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Expenditure that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenditureFindFirstArgs} args - Arguments to find a Expenditure
     * @example
     * // Get one Expenditure
     * const expenditure = await prisma.expenditure.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenditureFindFirstArgs>(args?: SelectSubset<T, ExpenditureFindFirstArgs<ExtArgs>>): Prisma__ExpenditureClient<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Expenditure that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenditureFindFirstOrThrowArgs} args - Arguments to find a Expenditure
     * @example
     * // Get one Expenditure
     * const expenditure = await prisma.expenditure.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenditureFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenditureFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenditureClient<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Expenditures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenditureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenditures
     * const expenditures = await prisma.expenditure.findMany()
     * 
     * // Get first 10 Expenditures
     * const expenditures = await prisma.expenditure.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenditureWithIdOnly = await prisma.expenditure.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenditureFindManyArgs>(args?: SelectSubset<T, ExpenditureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Expenditure.
     * @param {ExpenditureCreateArgs} args - Arguments to create a Expenditure.
     * @example
     * // Create one Expenditure
     * const Expenditure = await prisma.expenditure.create({
     *   data: {
     *     // ... data to create a Expenditure
     *   }
     * })
     * 
     */
    create<T extends ExpenditureCreateArgs>(args: SelectSubset<T, ExpenditureCreateArgs<ExtArgs>>): Prisma__ExpenditureClient<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Expenditures.
     * @param {ExpenditureCreateManyArgs} args - Arguments to create many Expenditures.
     * @example
     * // Create many Expenditures
     * const expenditure = await prisma.expenditure.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenditureCreateManyArgs>(args?: SelectSubset<T, ExpenditureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenditures and returns the data saved in the database.
     * @param {ExpenditureCreateManyAndReturnArgs} args - Arguments to create many Expenditures.
     * @example
     * // Create many Expenditures
     * const expenditure = await prisma.expenditure.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenditures and only return the `id`
     * const expenditureWithIdOnly = await prisma.expenditure.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenditureCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenditureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Expenditure.
     * @param {ExpenditureDeleteArgs} args - Arguments to delete one Expenditure.
     * @example
     * // Delete one Expenditure
     * const Expenditure = await prisma.expenditure.delete({
     *   where: {
     *     // ... filter to delete one Expenditure
     *   }
     * })
     * 
     */
    delete<T extends ExpenditureDeleteArgs>(args: SelectSubset<T, ExpenditureDeleteArgs<ExtArgs>>): Prisma__ExpenditureClient<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Expenditure.
     * @param {ExpenditureUpdateArgs} args - Arguments to update one Expenditure.
     * @example
     * // Update one Expenditure
     * const expenditure = await prisma.expenditure.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenditureUpdateArgs>(args: SelectSubset<T, ExpenditureUpdateArgs<ExtArgs>>): Prisma__ExpenditureClient<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Expenditures.
     * @param {ExpenditureDeleteManyArgs} args - Arguments to filter Expenditures to delete.
     * @example
     * // Delete a few Expenditures
     * const { count } = await prisma.expenditure.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenditureDeleteManyArgs>(args?: SelectSubset<T, ExpenditureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenditures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenditureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenditures
     * const expenditure = await prisma.expenditure.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenditureUpdateManyArgs>(args: SelectSubset<T, ExpenditureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Expenditure.
     * @param {ExpenditureUpsertArgs} args - Arguments to update or create a Expenditure.
     * @example
     * // Update or create a Expenditure
     * const expenditure = await prisma.expenditure.upsert({
     *   create: {
     *     // ... data to create a Expenditure
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expenditure we want to update
     *   }
     * })
     */
    upsert<T extends ExpenditureUpsertArgs>(args: SelectSubset<T, ExpenditureUpsertArgs<ExtArgs>>): Prisma__ExpenditureClient<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Expenditures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenditureCountArgs} args - Arguments to filter Expenditures to count.
     * @example
     * // Count the number of Expenditures
     * const count = await prisma.expenditure.count({
     *   where: {
     *     // ... the filter for the Expenditures we want to count
     *   }
     * })
    **/
    count<T extends ExpenditureCountArgs>(
      args?: Subset<T, ExpenditureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenditureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expenditure.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenditureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenditureAggregateArgs>(args: Subset<T, ExpenditureAggregateArgs>): Prisma.PrismaPromise<GetExpenditureAggregateType<T>>

    /**
     * Group by Expenditure.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenditureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenditureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenditureGroupByArgs['orderBy'] }
        : { orderBy?: ExpenditureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenditureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenditureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Expenditure model
   */
  readonly fields: ExpenditureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Expenditure.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenditureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    municipality<T extends MunicipalityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MunicipalityDefaultArgs<ExtArgs>>): Prisma__MunicipalityClient<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    fiscalYear<T extends FiscalYearDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FiscalYearDefaultArgs<ExtArgs>>): Prisma__FiscalYearClient<$Result.GetResult<Prisma.$FiscalYearPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    supplier<T extends Expenditure$supplierArgs<ExtArgs> = {}>(args?: Subset<T, Expenditure$supplierArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Expenditure model
   */ 
  interface ExpenditureFieldRefs {
    readonly id: FieldRef<"Expenditure", 'String'>
    readonly municipalityId: FieldRef<"Expenditure", 'String'>
    readonly fiscalYearId: FieldRef<"Expenditure", 'String'>
    readonly date: FieldRef<"Expenditure", 'DateTime'>
    readonly department: FieldRef<"Expenditure", 'String'>
    readonly program: FieldRef<"Expenditure", 'String'>
    readonly category: FieldRef<"Expenditure", 'String'>
    readonly subcategory: FieldRef<"Expenditure", 'String'>
    readonly concept: FieldRef<"Expenditure", 'String'>
    readonly amountActual: FieldRef<"Expenditure", 'Decimal'>
    readonly currency: FieldRef<"Expenditure", 'String'>
    readonly supplierId: FieldRef<"Expenditure", 'String'>
    readonly procurementRef: FieldRef<"Expenditure", 'String'>
    readonly location: FieldRef<"Expenditure", 'String'>
    readonly createdAt: FieldRef<"Expenditure", 'DateTime'>
    readonly updatedAt: FieldRef<"Expenditure", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Expenditure findUnique
   */
  export type ExpenditureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
    /**
     * Filter, which Expenditure to fetch.
     */
    where: ExpenditureWhereUniqueInput
  }

  /**
   * Expenditure findUniqueOrThrow
   */
  export type ExpenditureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
    /**
     * Filter, which Expenditure to fetch.
     */
    where: ExpenditureWhereUniqueInput
  }

  /**
   * Expenditure findFirst
   */
  export type ExpenditureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
    /**
     * Filter, which Expenditure to fetch.
     */
    where?: ExpenditureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenditures to fetch.
     */
    orderBy?: ExpenditureOrderByWithRelationInput | ExpenditureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenditures.
     */
    cursor?: ExpenditureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenditures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenditures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenditures.
     */
    distinct?: ExpenditureScalarFieldEnum | ExpenditureScalarFieldEnum[]
  }

  /**
   * Expenditure findFirstOrThrow
   */
  export type ExpenditureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
    /**
     * Filter, which Expenditure to fetch.
     */
    where?: ExpenditureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenditures to fetch.
     */
    orderBy?: ExpenditureOrderByWithRelationInput | ExpenditureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenditures.
     */
    cursor?: ExpenditureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenditures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenditures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenditures.
     */
    distinct?: ExpenditureScalarFieldEnum | ExpenditureScalarFieldEnum[]
  }

  /**
   * Expenditure findMany
   */
  export type ExpenditureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
    /**
     * Filter, which Expenditures to fetch.
     */
    where?: ExpenditureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenditures to fetch.
     */
    orderBy?: ExpenditureOrderByWithRelationInput | ExpenditureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expenditures.
     */
    cursor?: ExpenditureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenditures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenditures.
     */
    skip?: number
    distinct?: ExpenditureScalarFieldEnum | ExpenditureScalarFieldEnum[]
  }

  /**
   * Expenditure create
   */
  export type ExpenditureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
    /**
     * The data needed to create a Expenditure.
     */
    data: XOR<ExpenditureCreateInput, ExpenditureUncheckedCreateInput>
  }

  /**
   * Expenditure createMany
   */
  export type ExpenditureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Expenditures.
     */
    data: ExpenditureCreateManyInput | ExpenditureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Expenditure createManyAndReturn
   */
  export type ExpenditureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Expenditures.
     */
    data: ExpenditureCreateManyInput | ExpenditureCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expenditure update
   */
  export type ExpenditureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
    /**
     * The data needed to update a Expenditure.
     */
    data: XOR<ExpenditureUpdateInput, ExpenditureUncheckedUpdateInput>
    /**
     * Choose, which Expenditure to update.
     */
    where: ExpenditureWhereUniqueInput
  }

  /**
   * Expenditure updateMany
   */
  export type ExpenditureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Expenditures.
     */
    data: XOR<ExpenditureUpdateManyMutationInput, ExpenditureUncheckedUpdateManyInput>
    /**
     * Filter which Expenditures to update
     */
    where?: ExpenditureWhereInput
  }

  /**
   * Expenditure upsert
   */
  export type ExpenditureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
    /**
     * The filter to search for the Expenditure to update in case it exists.
     */
    where: ExpenditureWhereUniqueInput
    /**
     * In case the Expenditure found by the `where` argument doesn't exist, create a new Expenditure with this data.
     */
    create: XOR<ExpenditureCreateInput, ExpenditureUncheckedCreateInput>
    /**
     * In case the Expenditure was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenditureUpdateInput, ExpenditureUncheckedUpdateInput>
  }

  /**
   * Expenditure delete
   */
  export type ExpenditureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
    /**
     * Filter which Expenditure to delete.
     */
    where: ExpenditureWhereUniqueInput
  }

  /**
   * Expenditure deleteMany
   */
  export type ExpenditureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenditures to delete
     */
    where?: ExpenditureWhereInput
  }

  /**
   * Expenditure.supplier
   */
  export type Expenditure$supplierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    where?: SupplierWhereInput
  }

  /**
   * Expenditure without action
   */
  export type ExpenditureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    requestedBudget: Decimal | null
    approvedBudget: Decimal | null
  }

  export type ProjectSumAggregateOutputType = {
    requestedBudget: Decimal | null
    approvedBudget: Decimal | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    municipalityId: string | null
    title: string | null
    description: string | null
    status: string | null
    startDate: Date | null
    endDate: Date | null
    department: string | null
    category: string | null
    requestedBudget: Decimal | null
    approvedBudget: Decimal | null
    fundingSourceId: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    municipalityId: string | null
    title: string | null
    description: string | null
    status: string | null
    startDate: Date | null
    endDate: Date | null
    department: string | null
    category: string | null
    requestedBudget: Decimal | null
    approvedBudget: Decimal | null
    fundingSourceId: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    municipalityId: number
    title: number
    description: number
    status: number
    startDate: number
    endDate: number
    department: number
    category: number
    requestedBudget: number
    approvedBudget: number
    fundingSourceId: number
    location: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    requestedBudget?: true
    approvedBudget?: true
  }

  export type ProjectSumAggregateInputType = {
    requestedBudget?: true
    approvedBudget?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    municipalityId?: true
    title?: true
    description?: true
    status?: true
    startDate?: true
    endDate?: true
    department?: true
    category?: true
    requestedBudget?: true
    approvedBudget?: true
    fundingSourceId?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    municipalityId?: true
    title?: true
    description?: true
    status?: true
    startDate?: true
    endDate?: true
    department?: true
    category?: true
    requestedBudget?: true
    approvedBudget?: true
    fundingSourceId?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    municipalityId?: true
    title?: true
    description?: true
    status?: true
    startDate?: true
    endDate?: true
    department?: true
    category?: true
    requestedBudget?: true
    approvedBudget?: true
    fundingSourceId?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    municipalityId: string
    title: string
    description: string
    status: string
    startDate: Date | null
    endDate: Date | null
    department: string
    category: string
    requestedBudget: Decimal | null
    approvedBudget: Decimal | null
    fundingSourceId: string | null
    location: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    municipalityId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    department?: boolean
    category?: boolean
    requestedBudget?: boolean
    approvedBudget?: boolean
    fundingSourceId?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    municipality?: boolean | MunicipalityDefaultArgs<ExtArgs>
    fundingSource?: boolean | Project$fundingSourceArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    municipalityId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    department?: boolean
    category?: boolean
    requestedBudget?: boolean
    approvedBudget?: boolean
    fundingSourceId?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    municipality?: boolean | MunicipalityDefaultArgs<ExtArgs>
    fundingSource?: boolean | Project$fundingSourceArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    municipalityId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    department?: boolean
    category?: boolean
    requestedBudget?: boolean
    approvedBudget?: boolean
    fundingSourceId?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    municipality?: boolean | MunicipalityDefaultArgs<ExtArgs>
    fundingSource?: boolean | Project$fundingSourceArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    municipality?: boolean | MunicipalityDefaultArgs<ExtArgs>
    fundingSource?: boolean | Project$fundingSourceArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      municipality: Prisma.$MunicipalityPayload<ExtArgs>
      fundingSource: Prisma.$FundingSourcePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      municipalityId: string
      title: string
      description: string
      status: string
      startDate: Date | null
      endDate: Date | null
      department: string
      category: string
      requestedBudget: Prisma.Decimal | null
      approvedBudget: Prisma.Decimal | null
      fundingSourceId: string | null
      location: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    municipality<T extends MunicipalityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MunicipalityDefaultArgs<ExtArgs>>): Prisma__MunicipalityClient<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    fundingSource<T extends Project$fundingSourceArgs<ExtArgs> = {}>(args?: Subset<T, Project$fundingSourceArgs<ExtArgs>>): Prisma__FundingSourceClient<$Result.GetResult<Prisma.$FundingSourcePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */ 
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly municipalityId: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'String'>
    readonly startDate: FieldRef<"Project", 'DateTime'>
    readonly endDate: FieldRef<"Project", 'DateTime'>
    readonly department: FieldRef<"Project", 'String'>
    readonly category: FieldRef<"Project", 'String'>
    readonly requestedBudget: FieldRef<"Project", 'Decimal'>
    readonly approvedBudget: FieldRef<"Project", 'Decimal'>
    readonly fundingSourceId: FieldRef<"Project", 'String'>
    readonly location: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
  }

  /**
   * Project.fundingSource
   */
  export type Project$fundingSourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSource
     */
    select?: FundingSourceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingSourceInclude<ExtArgs> | null
    where?: FundingSourceWhereInput
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model FundingSource
   */

  export type AggregateFundingSource = {
    _count: FundingSourceCountAggregateOutputType | null
    _min: FundingSourceMinAggregateOutputType | null
    _max: FundingSourceMaxAggregateOutputType | null
  }

  export type FundingSourceMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FundingSourceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FundingSourceCountAggregateOutputType = {
    id: number
    name: number
    type: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FundingSourceMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FundingSourceMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FundingSourceCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FundingSourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingSource to aggregate.
     */
    where?: FundingSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingSources to fetch.
     */
    orderBy?: FundingSourceOrderByWithRelationInput | FundingSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FundingSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FundingSources
    **/
    _count?: true | FundingSourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FundingSourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FundingSourceMaxAggregateInputType
  }

  export type GetFundingSourceAggregateType<T extends FundingSourceAggregateArgs> = {
        [P in keyof T & keyof AggregateFundingSource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFundingSource[P]>
      : GetScalarType<T[P], AggregateFundingSource[P]>
  }




  export type FundingSourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FundingSourceWhereInput
    orderBy?: FundingSourceOrderByWithAggregationInput | FundingSourceOrderByWithAggregationInput[]
    by: FundingSourceScalarFieldEnum[] | FundingSourceScalarFieldEnum
    having?: FundingSourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FundingSourceCountAggregateInputType | true
    _min?: FundingSourceMinAggregateInputType
    _max?: FundingSourceMaxAggregateInputType
  }

  export type FundingSourceGroupByOutputType = {
    id: string
    name: string
    type: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: FundingSourceCountAggregateOutputType | null
    _min: FundingSourceMinAggregateOutputType | null
    _max: FundingSourceMaxAggregateOutputType | null
  }

  type GetFundingSourceGroupByPayload<T extends FundingSourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FundingSourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FundingSourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FundingSourceGroupByOutputType[P]>
            : GetScalarType<T[P], FundingSourceGroupByOutputType[P]>
        }
      >
    >


  export type FundingSourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projects?: boolean | FundingSource$projectsArgs<ExtArgs>
    _count?: boolean | FundingSourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fundingSource"]>

  export type FundingSourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fundingSource"]>

  export type FundingSourceSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FundingSourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | FundingSource$projectsArgs<ExtArgs>
    _count?: boolean | FundingSourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FundingSourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FundingSourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FundingSource"
    objects: {
      projects: Prisma.$ProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fundingSource"]>
    composites: {}
  }

  type FundingSourceGetPayload<S extends boolean | null | undefined | FundingSourceDefaultArgs> = $Result.GetResult<Prisma.$FundingSourcePayload, S>

  type FundingSourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FundingSourceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FundingSourceCountAggregateInputType | true
    }

  export interface FundingSourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FundingSource'], meta: { name: 'FundingSource' } }
    /**
     * Find zero or one FundingSource that matches the filter.
     * @param {FundingSourceFindUniqueArgs} args - Arguments to find a FundingSource
     * @example
     * // Get one FundingSource
     * const fundingSource = await prisma.fundingSource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FundingSourceFindUniqueArgs>(args: SelectSubset<T, FundingSourceFindUniqueArgs<ExtArgs>>): Prisma__FundingSourceClient<$Result.GetResult<Prisma.$FundingSourcePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FundingSource that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FundingSourceFindUniqueOrThrowArgs} args - Arguments to find a FundingSource
     * @example
     * // Get one FundingSource
     * const fundingSource = await prisma.fundingSource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FundingSourceFindUniqueOrThrowArgs>(args: SelectSubset<T, FundingSourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FundingSourceClient<$Result.GetResult<Prisma.$FundingSourcePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FundingSource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSourceFindFirstArgs} args - Arguments to find a FundingSource
     * @example
     * // Get one FundingSource
     * const fundingSource = await prisma.fundingSource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FundingSourceFindFirstArgs>(args?: SelectSubset<T, FundingSourceFindFirstArgs<ExtArgs>>): Prisma__FundingSourceClient<$Result.GetResult<Prisma.$FundingSourcePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FundingSource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSourceFindFirstOrThrowArgs} args - Arguments to find a FundingSource
     * @example
     * // Get one FundingSource
     * const fundingSource = await prisma.fundingSource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FundingSourceFindFirstOrThrowArgs>(args?: SelectSubset<T, FundingSourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__FundingSourceClient<$Result.GetResult<Prisma.$FundingSourcePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FundingSources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FundingSources
     * const fundingSources = await prisma.fundingSource.findMany()
     * 
     * // Get first 10 FundingSources
     * const fundingSources = await prisma.fundingSource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fundingSourceWithIdOnly = await prisma.fundingSource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FundingSourceFindManyArgs>(args?: SelectSubset<T, FundingSourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingSourcePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FundingSource.
     * @param {FundingSourceCreateArgs} args - Arguments to create a FundingSource.
     * @example
     * // Create one FundingSource
     * const FundingSource = await prisma.fundingSource.create({
     *   data: {
     *     // ... data to create a FundingSource
     *   }
     * })
     * 
     */
    create<T extends FundingSourceCreateArgs>(args: SelectSubset<T, FundingSourceCreateArgs<ExtArgs>>): Prisma__FundingSourceClient<$Result.GetResult<Prisma.$FundingSourcePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FundingSources.
     * @param {FundingSourceCreateManyArgs} args - Arguments to create many FundingSources.
     * @example
     * // Create many FundingSources
     * const fundingSource = await prisma.fundingSource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FundingSourceCreateManyArgs>(args?: SelectSubset<T, FundingSourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FundingSources and returns the data saved in the database.
     * @param {FundingSourceCreateManyAndReturnArgs} args - Arguments to create many FundingSources.
     * @example
     * // Create many FundingSources
     * const fundingSource = await prisma.fundingSource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FundingSources and only return the `id`
     * const fundingSourceWithIdOnly = await prisma.fundingSource.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FundingSourceCreateManyAndReturnArgs>(args?: SelectSubset<T, FundingSourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingSourcePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FundingSource.
     * @param {FundingSourceDeleteArgs} args - Arguments to delete one FundingSource.
     * @example
     * // Delete one FundingSource
     * const FundingSource = await prisma.fundingSource.delete({
     *   where: {
     *     // ... filter to delete one FundingSource
     *   }
     * })
     * 
     */
    delete<T extends FundingSourceDeleteArgs>(args: SelectSubset<T, FundingSourceDeleteArgs<ExtArgs>>): Prisma__FundingSourceClient<$Result.GetResult<Prisma.$FundingSourcePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FundingSource.
     * @param {FundingSourceUpdateArgs} args - Arguments to update one FundingSource.
     * @example
     * // Update one FundingSource
     * const fundingSource = await prisma.fundingSource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FundingSourceUpdateArgs>(args: SelectSubset<T, FundingSourceUpdateArgs<ExtArgs>>): Prisma__FundingSourceClient<$Result.GetResult<Prisma.$FundingSourcePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FundingSources.
     * @param {FundingSourceDeleteManyArgs} args - Arguments to filter FundingSources to delete.
     * @example
     * // Delete a few FundingSources
     * const { count } = await prisma.fundingSource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FundingSourceDeleteManyArgs>(args?: SelectSubset<T, FundingSourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FundingSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FundingSources
     * const fundingSource = await prisma.fundingSource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FundingSourceUpdateManyArgs>(args: SelectSubset<T, FundingSourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FundingSource.
     * @param {FundingSourceUpsertArgs} args - Arguments to update or create a FundingSource.
     * @example
     * // Update or create a FundingSource
     * const fundingSource = await prisma.fundingSource.upsert({
     *   create: {
     *     // ... data to create a FundingSource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FundingSource we want to update
     *   }
     * })
     */
    upsert<T extends FundingSourceUpsertArgs>(args: SelectSubset<T, FundingSourceUpsertArgs<ExtArgs>>): Prisma__FundingSourceClient<$Result.GetResult<Prisma.$FundingSourcePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FundingSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSourceCountArgs} args - Arguments to filter FundingSources to count.
     * @example
     * // Count the number of FundingSources
     * const count = await prisma.fundingSource.count({
     *   where: {
     *     // ... the filter for the FundingSources we want to count
     *   }
     * })
    **/
    count<T extends FundingSourceCountArgs>(
      args?: Subset<T, FundingSourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FundingSourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FundingSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FundingSourceAggregateArgs>(args: Subset<T, FundingSourceAggregateArgs>): Prisma.PrismaPromise<GetFundingSourceAggregateType<T>>

    /**
     * Group by FundingSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FundingSourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FundingSourceGroupByArgs['orderBy'] }
        : { orderBy?: FundingSourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FundingSourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFundingSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FundingSource model
   */
  readonly fields: FundingSourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FundingSource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FundingSourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends FundingSource$projectsArgs<ExtArgs> = {}>(args?: Subset<T, FundingSource$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FundingSource model
   */ 
  interface FundingSourceFieldRefs {
    readonly id: FieldRef<"FundingSource", 'String'>
    readonly name: FieldRef<"FundingSource", 'String'>
    readonly type: FieldRef<"FundingSource", 'String'>
    readonly description: FieldRef<"FundingSource", 'String'>
    readonly createdAt: FieldRef<"FundingSource", 'DateTime'>
    readonly updatedAt: FieldRef<"FundingSource", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FundingSource findUnique
   */
  export type FundingSourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSource
     */
    select?: FundingSourceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingSourceInclude<ExtArgs> | null
    /**
     * Filter, which FundingSource to fetch.
     */
    where: FundingSourceWhereUniqueInput
  }

  /**
   * FundingSource findUniqueOrThrow
   */
  export type FundingSourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSource
     */
    select?: FundingSourceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingSourceInclude<ExtArgs> | null
    /**
     * Filter, which FundingSource to fetch.
     */
    where: FundingSourceWhereUniqueInput
  }

  /**
   * FundingSource findFirst
   */
  export type FundingSourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSource
     */
    select?: FundingSourceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingSourceInclude<ExtArgs> | null
    /**
     * Filter, which FundingSource to fetch.
     */
    where?: FundingSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingSources to fetch.
     */
    orderBy?: FundingSourceOrderByWithRelationInput | FundingSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingSources.
     */
    cursor?: FundingSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingSources.
     */
    distinct?: FundingSourceScalarFieldEnum | FundingSourceScalarFieldEnum[]
  }

  /**
   * FundingSource findFirstOrThrow
   */
  export type FundingSourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSource
     */
    select?: FundingSourceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingSourceInclude<ExtArgs> | null
    /**
     * Filter, which FundingSource to fetch.
     */
    where?: FundingSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingSources to fetch.
     */
    orderBy?: FundingSourceOrderByWithRelationInput | FundingSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingSources.
     */
    cursor?: FundingSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingSources.
     */
    distinct?: FundingSourceScalarFieldEnum | FundingSourceScalarFieldEnum[]
  }

  /**
   * FundingSource findMany
   */
  export type FundingSourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSource
     */
    select?: FundingSourceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingSourceInclude<ExtArgs> | null
    /**
     * Filter, which FundingSources to fetch.
     */
    where?: FundingSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingSources to fetch.
     */
    orderBy?: FundingSourceOrderByWithRelationInput | FundingSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FundingSources.
     */
    cursor?: FundingSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingSources.
     */
    skip?: number
    distinct?: FundingSourceScalarFieldEnum | FundingSourceScalarFieldEnum[]
  }

  /**
   * FundingSource create
   */
  export type FundingSourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSource
     */
    select?: FundingSourceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingSourceInclude<ExtArgs> | null
    /**
     * The data needed to create a FundingSource.
     */
    data: XOR<FundingSourceCreateInput, FundingSourceUncheckedCreateInput>
  }

  /**
   * FundingSource createMany
   */
  export type FundingSourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FundingSources.
     */
    data: FundingSourceCreateManyInput | FundingSourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FundingSource createManyAndReturn
   */
  export type FundingSourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSource
     */
    select?: FundingSourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FundingSources.
     */
    data: FundingSourceCreateManyInput | FundingSourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FundingSource update
   */
  export type FundingSourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSource
     */
    select?: FundingSourceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingSourceInclude<ExtArgs> | null
    /**
     * The data needed to update a FundingSource.
     */
    data: XOR<FundingSourceUpdateInput, FundingSourceUncheckedUpdateInput>
    /**
     * Choose, which FundingSource to update.
     */
    where: FundingSourceWhereUniqueInput
  }

  /**
   * FundingSource updateMany
   */
  export type FundingSourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FundingSources.
     */
    data: XOR<FundingSourceUpdateManyMutationInput, FundingSourceUncheckedUpdateManyInput>
    /**
     * Filter which FundingSources to update
     */
    where?: FundingSourceWhereInput
  }

  /**
   * FundingSource upsert
   */
  export type FundingSourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSource
     */
    select?: FundingSourceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingSourceInclude<ExtArgs> | null
    /**
     * The filter to search for the FundingSource to update in case it exists.
     */
    where: FundingSourceWhereUniqueInput
    /**
     * In case the FundingSource found by the `where` argument doesn't exist, create a new FundingSource with this data.
     */
    create: XOR<FundingSourceCreateInput, FundingSourceUncheckedCreateInput>
    /**
     * In case the FundingSource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FundingSourceUpdateInput, FundingSourceUncheckedUpdateInput>
  }

  /**
   * FundingSource delete
   */
  export type FundingSourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSource
     */
    select?: FundingSourceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingSourceInclude<ExtArgs> | null
    /**
     * Filter which FundingSource to delete.
     */
    where: FundingSourceWhereUniqueInput
  }

  /**
   * FundingSource deleteMany
   */
  export type FundingSourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingSources to delete
     */
    where?: FundingSourceWhereInput
  }

  /**
   * FundingSource.projects
   */
  export type FundingSource$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * FundingSource without action
   */
  export type FundingSourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSource
     */
    select?: FundingSourceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingSourceInclude<ExtArgs> | null
  }


  /**
   * Model Supplier
   */

  export type AggregateSupplier = {
    _count: SupplierCountAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  export type SupplierMinAggregateOutputType = {
    id: string | null
    name: string | null
    taxId: string | null
    sector: string | null
    locality: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierMaxAggregateOutputType = {
    id: string | null
    name: string | null
    taxId: string | null
    sector: string | null
    locality: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierCountAggregateOutputType = {
    id: number
    name: number
    taxId: number
    sector: number
    locality: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SupplierMinAggregateInputType = {
    id?: true
    name?: true
    taxId?: true
    sector?: true
    locality?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierMaxAggregateInputType = {
    id?: true
    name?: true
    taxId?: true
    sector?: true
    locality?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierCountAggregateInputType = {
    id?: true
    name?: true
    taxId?: true
    sector?: true
    locality?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SupplierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Supplier to aggregate.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suppliers
    **/
    _count?: true | SupplierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplierMaxAggregateInputType
  }

  export type GetSupplierAggregateType<T extends SupplierAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplier[P]>
      : GetScalarType<T[P], AggregateSupplier[P]>
  }




  export type SupplierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplierWhereInput
    orderBy?: SupplierOrderByWithAggregationInput | SupplierOrderByWithAggregationInput[]
    by: SupplierScalarFieldEnum[] | SupplierScalarFieldEnum
    having?: SupplierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplierCountAggregateInputType | true
    _min?: SupplierMinAggregateInputType
    _max?: SupplierMaxAggregateInputType
  }

  export type SupplierGroupByOutputType = {
    id: string
    name: string
    taxId: string | null
    sector: string | null
    locality: string | null
    createdAt: Date
    updatedAt: Date
    _count: SupplierCountAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  type GetSupplierGroupByPayload<T extends SupplierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplierGroupByOutputType[P]>
            : GetScalarType<T[P], SupplierGroupByOutputType[P]>
        }
      >
    >


  export type SupplierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    taxId?: boolean
    sector?: boolean
    locality?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expenditures?: boolean | Supplier$expendituresArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplier"]>

  export type SupplierSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    taxId?: boolean
    sector?: boolean
    locality?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["supplier"]>

  export type SupplierSelectScalar = {
    id?: boolean
    name?: boolean
    taxId?: boolean
    sector?: boolean
    locality?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SupplierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expenditures?: boolean | Supplier$expendituresArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SupplierIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SupplierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Supplier"
    objects: {
      expenditures: Prisma.$ExpenditurePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      taxId: string | null
      sector: string | null
      locality: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["supplier"]>
    composites: {}
  }

  type SupplierGetPayload<S extends boolean | null | undefined | SupplierDefaultArgs> = $Result.GetResult<Prisma.$SupplierPayload, S>

  type SupplierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SupplierFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SupplierCountAggregateInputType | true
    }

  export interface SupplierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Supplier'], meta: { name: 'Supplier' } }
    /**
     * Find zero or one Supplier that matches the filter.
     * @param {SupplierFindUniqueArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplierFindUniqueArgs>(args: SelectSubset<T, SupplierFindUniqueArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Supplier that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SupplierFindUniqueOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplierFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplierFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Supplier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplierFindFirstArgs>(args?: SelectSubset<T, SupplierFindFirstArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Supplier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplierFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplierFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Suppliers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suppliers
     * const suppliers = await prisma.supplier.findMany()
     * 
     * // Get first 10 Suppliers
     * const suppliers = await prisma.supplier.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplierWithIdOnly = await prisma.supplier.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplierFindManyArgs>(args?: SelectSubset<T, SupplierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Supplier.
     * @param {SupplierCreateArgs} args - Arguments to create a Supplier.
     * @example
     * // Create one Supplier
     * const Supplier = await prisma.supplier.create({
     *   data: {
     *     // ... data to create a Supplier
     *   }
     * })
     * 
     */
    create<T extends SupplierCreateArgs>(args: SelectSubset<T, SupplierCreateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Suppliers.
     * @param {SupplierCreateManyArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplierCreateManyArgs>(args?: SelectSubset<T, SupplierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Suppliers and returns the data saved in the database.
     * @param {SupplierCreateManyAndReturnArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Suppliers and only return the `id`
     * const supplierWithIdOnly = await prisma.supplier.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupplierCreateManyAndReturnArgs>(args?: SelectSubset<T, SupplierCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Supplier.
     * @param {SupplierDeleteArgs} args - Arguments to delete one Supplier.
     * @example
     * // Delete one Supplier
     * const Supplier = await prisma.supplier.delete({
     *   where: {
     *     // ... filter to delete one Supplier
     *   }
     * })
     * 
     */
    delete<T extends SupplierDeleteArgs>(args: SelectSubset<T, SupplierDeleteArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Supplier.
     * @param {SupplierUpdateArgs} args - Arguments to update one Supplier.
     * @example
     * // Update one Supplier
     * const supplier = await prisma.supplier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplierUpdateArgs>(args: SelectSubset<T, SupplierUpdateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Suppliers.
     * @param {SupplierDeleteManyArgs} args - Arguments to filter Suppliers to delete.
     * @example
     * // Delete a few Suppliers
     * const { count } = await prisma.supplier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplierDeleteManyArgs>(args?: SelectSubset<T, SupplierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suppliers
     * const supplier = await prisma.supplier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplierUpdateManyArgs>(args: SelectSubset<T, SupplierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Supplier.
     * @param {SupplierUpsertArgs} args - Arguments to update or create a Supplier.
     * @example
     * // Update or create a Supplier
     * const supplier = await prisma.supplier.upsert({
     *   create: {
     *     // ... data to create a Supplier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Supplier we want to update
     *   }
     * })
     */
    upsert<T extends SupplierUpsertArgs>(args: SelectSubset<T, SupplierUpsertArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierCountArgs} args - Arguments to filter Suppliers to count.
     * @example
     * // Count the number of Suppliers
     * const count = await prisma.supplier.count({
     *   where: {
     *     // ... the filter for the Suppliers we want to count
     *   }
     * })
    **/
    count<T extends SupplierCountArgs>(
      args?: Subset<T, SupplierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupplierAggregateArgs>(args: Subset<T, SupplierAggregateArgs>): Prisma.PrismaPromise<GetSupplierAggregateType<T>>

    /**
     * Group by Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupplierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplierGroupByArgs['orderBy'] }
        : { orderBy?: SupplierGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupplierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Supplier model
   */
  readonly fields: SupplierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Supplier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    expenditures<T extends Supplier$expendituresArgs<ExtArgs> = {}>(args?: Subset<T, Supplier$expendituresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenditurePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Supplier model
   */ 
  interface SupplierFieldRefs {
    readonly id: FieldRef<"Supplier", 'String'>
    readonly name: FieldRef<"Supplier", 'String'>
    readonly taxId: FieldRef<"Supplier", 'String'>
    readonly sector: FieldRef<"Supplier", 'String'>
    readonly locality: FieldRef<"Supplier", 'String'>
    readonly createdAt: FieldRef<"Supplier", 'DateTime'>
    readonly updatedAt: FieldRef<"Supplier", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Supplier findUnique
   */
  export type SupplierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findUniqueOrThrow
   */
  export type SupplierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findFirst
   */
  export type SupplierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findFirstOrThrow
   */
  export type SupplierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findMany
   */
  export type SupplierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Suppliers to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier create
   */
  export type SupplierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to create a Supplier.
     */
    data: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
  }

  /**
   * Supplier createMany
   */
  export type SupplierCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Supplier createManyAndReturn
   */
  export type SupplierCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Supplier update
   */
  export type SupplierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to update a Supplier.
     */
    data: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
    /**
     * Choose, which Supplier to update.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier updateMany
   */
  export type SupplierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suppliers.
     */
    data: XOR<SupplierUpdateManyMutationInput, SupplierUncheckedUpdateManyInput>
    /**
     * Filter which Suppliers to update
     */
    where?: SupplierWhereInput
  }

  /**
   * Supplier upsert
   */
  export type SupplierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The filter to search for the Supplier to update in case it exists.
     */
    where: SupplierWhereUniqueInput
    /**
     * In case the Supplier found by the `where` argument doesn't exist, create a new Supplier with this data.
     */
    create: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
    /**
     * In case the Supplier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
  }

  /**
   * Supplier delete
   */
  export type SupplierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter which Supplier to delete.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier deleteMany
   */
  export type SupplierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suppliers to delete
     */
    where?: SupplierWhereInput
  }

  /**
   * Supplier.expenditures
   */
  export type Supplier$expendituresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenditure
     */
    select?: ExpenditureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenditureInclude<ExtArgs> | null
    where?: ExpenditureWhereInput
    orderBy?: ExpenditureOrderByWithRelationInput | ExpenditureOrderByWithRelationInput[]
    cursor?: ExpenditureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenditureScalarFieldEnum | ExpenditureScalarFieldEnum[]
  }

  /**
   * Supplier without action
   */
  export type SupplierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
  }


  /**
   * Model Dataset
   */

  export type AggregateDataset = {
    _count: DatasetCountAggregateOutputType | null
    _min: DatasetMinAggregateOutputType | null
    _max: DatasetMaxAggregateOutputType | null
  }

  export type DatasetMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    sourceUri: string | null
    refreshSchedule: string | null
    schemaVersion: string | null
    lastIngestedAt: Date | null
    checksum: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DatasetMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    sourceUri: string | null
    refreshSchedule: string | null
    schemaVersion: string | null
    lastIngestedAt: Date | null
    checksum: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DatasetCountAggregateOutputType = {
    id: number
    name: number
    type: number
    sourceUri: number
    refreshSchedule: number
    schemaVersion: number
    lastIngestedAt: number
    checksum: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DatasetMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    sourceUri?: true
    refreshSchedule?: true
    schemaVersion?: true
    lastIngestedAt?: true
    checksum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DatasetMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    sourceUri?: true
    refreshSchedule?: true
    schemaVersion?: true
    lastIngestedAt?: true
    checksum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DatasetCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    sourceUri?: true
    refreshSchedule?: true
    schemaVersion?: true
    lastIngestedAt?: true
    checksum?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DatasetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dataset to aggregate.
     */
    where?: DatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datasets to fetch.
     */
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Datasets
    **/
    _count?: true | DatasetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DatasetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DatasetMaxAggregateInputType
  }

  export type GetDatasetAggregateType<T extends DatasetAggregateArgs> = {
        [P in keyof T & keyof AggregateDataset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDataset[P]>
      : GetScalarType<T[P], AggregateDataset[P]>
  }




  export type DatasetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DatasetWhereInput
    orderBy?: DatasetOrderByWithAggregationInput | DatasetOrderByWithAggregationInput[]
    by: DatasetScalarFieldEnum[] | DatasetScalarFieldEnum
    having?: DatasetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DatasetCountAggregateInputType | true
    _min?: DatasetMinAggregateInputType
    _max?: DatasetMaxAggregateInputType
  }

  export type DatasetGroupByOutputType = {
    id: string
    name: string
    type: string
    sourceUri: string | null
    refreshSchedule: string | null
    schemaVersion: string | null
    lastIngestedAt: Date | null
    checksum: string | null
    createdAt: Date
    updatedAt: Date
    _count: DatasetCountAggregateOutputType | null
    _min: DatasetMinAggregateOutputType | null
    _max: DatasetMaxAggregateOutputType | null
  }

  type GetDatasetGroupByPayload<T extends DatasetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DatasetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DatasetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DatasetGroupByOutputType[P]>
            : GetScalarType<T[P], DatasetGroupByOutputType[P]>
        }
      >
    >


  export type DatasetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    sourceUri?: boolean
    refreshSchedule?: boolean
    schemaVersion?: boolean
    lastIngestedAt?: boolean
    checksum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ingestionRuns?: boolean | Dataset$ingestionRunsArgs<ExtArgs>
    _count?: boolean | DatasetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataset"]>

  export type DatasetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    sourceUri?: boolean
    refreshSchedule?: boolean
    schemaVersion?: boolean
    lastIngestedAt?: boolean
    checksum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dataset"]>

  export type DatasetSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    sourceUri?: boolean
    refreshSchedule?: boolean
    schemaVersion?: boolean
    lastIngestedAt?: boolean
    checksum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DatasetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ingestionRuns?: boolean | Dataset$ingestionRunsArgs<ExtArgs>
    _count?: boolean | DatasetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DatasetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DatasetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dataset"
    objects: {
      ingestionRuns: Prisma.$IngestionRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: string
      sourceUri: string | null
      refreshSchedule: string | null
      schemaVersion: string | null
      lastIngestedAt: Date | null
      checksum: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dataset"]>
    composites: {}
  }

  type DatasetGetPayload<S extends boolean | null | undefined | DatasetDefaultArgs> = $Result.GetResult<Prisma.$DatasetPayload, S>

  type DatasetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DatasetFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DatasetCountAggregateInputType | true
    }

  export interface DatasetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dataset'], meta: { name: 'Dataset' } }
    /**
     * Find zero or one Dataset that matches the filter.
     * @param {DatasetFindUniqueArgs} args - Arguments to find a Dataset
     * @example
     * // Get one Dataset
     * const dataset = await prisma.dataset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DatasetFindUniqueArgs>(args: SelectSubset<T, DatasetFindUniqueArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Dataset that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DatasetFindUniqueOrThrowArgs} args - Arguments to find a Dataset
     * @example
     * // Get one Dataset
     * const dataset = await prisma.dataset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DatasetFindUniqueOrThrowArgs>(args: SelectSubset<T, DatasetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Dataset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetFindFirstArgs} args - Arguments to find a Dataset
     * @example
     * // Get one Dataset
     * const dataset = await prisma.dataset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DatasetFindFirstArgs>(args?: SelectSubset<T, DatasetFindFirstArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Dataset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetFindFirstOrThrowArgs} args - Arguments to find a Dataset
     * @example
     * // Get one Dataset
     * const dataset = await prisma.dataset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DatasetFindFirstOrThrowArgs>(args?: SelectSubset<T, DatasetFindFirstOrThrowArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Datasets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Datasets
     * const datasets = await prisma.dataset.findMany()
     * 
     * // Get first 10 Datasets
     * const datasets = await prisma.dataset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const datasetWithIdOnly = await prisma.dataset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DatasetFindManyArgs>(args?: SelectSubset<T, DatasetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Dataset.
     * @param {DatasetCreateArgs} args - Arguments to create a Dataset.
     * @example
     * // Create one Dataset
     * const Dataset = await prisma.dataset.create({
     *   data: {
     *     // ... data to create a Dataset
     *   }
     * })
     * 
     */
    create<T extends DatasetCreateArgs>(args: SelectSubset<T, DatasetCreateArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Datasets.
     * @param {DatasetCreateManyArgs} args - Arguments to create many Datasets.
     * @example
     * // Create many Datasets
     * const dataset = await prisma.dataset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DatasetCreateManyArgs>(args?: SelectSubset<T, DatasetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Datasets and returns the data saved in the database.
     * @param {DatasetCreateManyAndReturnArgs} args - Arguments to create many Datasets.
     * @example
     * // Create many Datasets
     * const dataset = await prisma.dataset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Datasets and only return the `id`
     * const datasetWithIdOnly = await prisma.dataset.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DatasetCreateManyAndReturnArgs>(args?: SelectSubset<T, DatasetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Dataset.
     * @param {DatasetDeleteArgs} args - Arguments to delete one Dataset.
     * @example
     * // Delete one Dataset
     * const Dataset = await prisma.dataset.delete({
     *   where: {
     *     // ... filter to delete one Dataset
     *   }
     * })
     * 
     */
    delete<T extends DatasetDeleteArgs>(args: SelectSubset<T, DatasetDeleteArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Dataset.
     * @param {DatasetUpdateArgs} args - Arguments to update one Dataset.
     * @example
     * // Update one Dataset
     * const dataset = await prisma.dataset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DatasetUpdateArgs>(args: SelectSubset<T, DatasetUpdateArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Datasets.
     * @param {DatasetDeleteManyArgs} args - Arguments to filter Datasets to delete.
     * @example
     * // Delete a few Datasets
     * const { count } = await prisma.dataset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DatasetDeleteManyArgs>(args?: SelectSubset<T, DatasetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Datasets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Datasets
     * const dataset = await prisma.dataset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DatasetUpdateManyArgs>(args: SelectSubset<T, DatasetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Dataset.
     * @param {DatasetUpsertArgs} args - Arguments to update or create a Dataset.
     * @example
     * // Update or create a Dataset
     * const dataset = await prisma.dataset.upsert({
     *   create: {
     *     // ... data to create a Dataset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dataset we want to update
     *   }
     * })
     */
    upsert<T extends DatasetUpsertArgs>(args: SelectSubset<T, DatasetUpsertArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Datasets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetCountArgs} args - Arguments to filter Datasets to count.
     * @example
     * // Count the number of Datasets
     * const count = await prisma.dataset.count({
     *   where: {
     *     // ... the filter for the Datasets we want to count
     *   }
     * })
    **/
    count<T extends DatasetCountArgs>(
      args?: Subset<T, DatasetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DatasetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dataset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DatasetAggregateArgs>(args: Subset<T, DatasetAggregateArgs>): Prisma.PrismaPromise<GetDatasetAggregateType<T>>

    /**
     * Group by Dataset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DatasetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DatasetGroupByArgs['orderBy'] }
        : { orderBy?: DatasetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DatasetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDatasetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dataset model
   */
  readonly fields: DatasetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dataset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DatasetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ingestionRuns<T extends Dataset$ingestionRunsArgs<ExtArgs> = {}>(args?: Subset<T, Dataset$ingestionRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngestionRunPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dataset model
   */ 
  interface DatasetFieldRefs {
    readonly id: FieldRef<"Dataset", 'String'>
    readonly name: FieldRef<"Dataset", 'String'>
    readonly type: FieldRef<"Dataset", 'String'>
    readonly sourceUri: FieldRef<"Dataset", 'String'>
    readonly refreshSchedule: FieldRef<"Dataset", 'String'>
    readonly schemaVersion: FieldRef<"Dataset", 'String'>
    readonly lastIngestedAt: FieldRef<"Dataset", 'DateTime'>
    readonly checksum: FieldRef<"Dataset", 'String'>
    readonly createdAt: FieldRef<"Dataset", 'DateTime'>
    readonly updatedAt: FieldRef<"Dataset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Dataset findUnique
   */
  export type DatasetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Dataset to fetch.
     */
    where: DatasetWhereUniqueInput
  }

  /**
   * Dataset findUniqueOrThrow
   */
  export type DatasetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Dataset to fetch.
     */
    where: DatasetWhereUniqueInput
  }

  /**
   * Dataset findFirst
   */
  export type DatasetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Dataset to fetch.
     */
    where?: DatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datasets to fetch.
     */
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Datasets.
     */
    cursor?: DatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Datasets.
     */
    distinct?: DatasetScalarFieldEnum | DatasetScalarFieldEnum[]
  }

  /**
   * Dataset findFirstOrThrow
   */
  export type DatasetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Dataset to fetch.
     */
    where?: DatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datasets to fetch.
     */
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Datasets.
     */
    cursor?: DatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Datasets.
     */
    distinct?: DatasetScalarFieldEnum | DatasetScalarFieldEnum[]
  }

  /**
   * Dataset findMany
   */
  export type DatasetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Datasets to fetch.
     */
    where?: DatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datasets to fetch.
     */
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Datasets.
     */
    cursor?: DatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datasets.
     */
    skip?: number
    distinct?: DatasetScalarFieldEnum | DatasetScalarFieldEnum[]
  }

  /**
   * Dataset create
   */
  export type DatasetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * The data needed to create a Dataset.
     */
    data: XOR<DatasetCreateInput, DatasetUncheckedCreateInput>
  }

  /**
   * Dataset createMany
   */
  export type DatasetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Datasets.
     */
    data: DatasetCreateManyInput | DatasetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dataset createManyAndReturn
   */
  export type DatasetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Datasets.
     */
    data: DatasetCreateManyInput | DatasetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dataset update
   */
  export type DatasetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * The data needed to update a Dataset.
     */
    data: XOR<DatasetUpdateInput, DatasetUncheckedUpdateInput>
    /**
     * Choose, which Dataset to update.
     */
    where: DatasetWhereUniqueInput
  }

  /**
   * Dataset updateMany
   */
  export type DatasetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Datasets.
     */
    data: XOR<DatasetUpdateManyMutationInput, DatasetUncheckedUpdateManyInput>
    /**
     * Filter which Datasets to update
     */
    where?: DatasetWhereInput
  }

  /**
   * Dataset upsert
   */
  export type DatasetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * The filter to search for the Dataset to update in case it exists.
     */
    where: DatasetWhereUniqueInput
    /**
     * In case the Dataset found by the `where` argument doesn't exist, create a new Dataset with this data.
     */
    create: XOR<DatasetCreateInput, DatasetUncheckedCreateInput>
    /**
     * In case the Dataset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DatasetUpdateInput, DatasetUncheckedUpdateInput>
  }

  /**
   * Dataset delete
   */
  export type DatasetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter which Dataset to delete.
     */
    where: DatasetWhereUniqueInput
  }

  /**
   * Dataset deleteMany
   */
  export type DatasetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Datasets to delete
     */
    where?: DatasetWhereInput
  }

  /**
   * Dataset.ingestionRuns
   */
  export type Dataset$ingestionRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestionRun
     */
    select?: IngestionRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestionRunInclude<ExtArgs> | null
    where?: IngestionRunWhereInput
    orderBy?: IngestionRunOrderByWithRelationInput | IngestionRunOrderByWithRelationInput[]
    cursor?: IngestionRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IngestionRunScalarFieldEnum | IngestionRunScalarFieldEnum[]
  }

  /**
   * Dataset without action
   */
  export type DatasetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
  }


  /**
   * Model IngestionRun
   */

  export type AggregateIngestionRun = {
    _count: IngestionRunCountAggregateOutputType | null
    _avg: IngestionRunAvgAggregateOutputType | null
    _sum: IngestionRunSumAggregateOutputType | null
    _min: IngestionRunMinAggregateOutputType | null
    _max: IngestionRunMaxAggregateOutputType | null
  }

  export type IngestionRunAvgAggregateOutputType = {
    rowsIngested: number | null
    rowsInvalid: number | null
  }

  export type IngestionRunSumAggregateOutputType = {
    rowsIngested: number | null
    rowsInvalid: number | null
  }

  export type IngestionRunMinAggregateOutputType = {
    id: string | null
    datasetId: string | null
    status: string | null
    startedAt: Date | null
    finishedAt: Date | null
    rowsIngested: number | null
    rowsInvalid: number | null
    logUri: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IngestionRunMaxAggregateOutputType = {
    id: string | null
    datasetId: string | null
    status: string | null
    startedAt: Date | null
    finishedAt: Date | null
    rowsIngested: number | null
    rowsInvalid: number | null
    logUri: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IngestionRunCountAggregateOutputType = {
    id: number
    datasetId: number
    status: number
    startedAt: number
    finishedAt: number
    rowsIngested: number
    rowsInvalid: number
    logUri: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type IngestionRunAvgAggregateInputType = {
    rowsIngested?: true
    rowsInvalid?: true
  }

  export type IngestionRunSumAggregateInputType = {
    rowsIngested?: true
    rowsInvalid?: true
  }

  export type IngestionRunMinAggregateInputType = {
    id?: true
    datasetId?: true
    status?: true
    startedAt?: true
    finishedAt?: true
    rowsIngested?: true
    rowsInvalid?: true
    logUri?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IngestionRunMaxAggregateInputType = {
    id?: true
    datasetId?: true
    status?: true
    startedAt?: true
    finishedAt?: true
    rowsIngested?: true
    rowsInvalid?: true
    logUri?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IngestionRunCountAggregateInputType = {
    id?: true
    datasetId?: true
    status?: true
    startedAt?: true
    finishedAt?: true
    rowsIngested?: true
    rowsInvalid?: true
    logUri?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type IngestionRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IngestionRun to aggregate.
     */
    where?: IngestionRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IngestionRuns to fetch.
     */
    orderBy?: IngestionRunOrderByWithRelationInput | IngestionRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IngestionRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IngestionRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IngestionRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IngestionRuns
    **/
    _count?: true | IngestionRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IngestionRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IngestionRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IngestionRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IngestionRunMaxAggregateInputType
  }

  export type GetIngestionRunAggregateType<T extends IngestionRunAggregateArgs> = {
        [P in keyof T & keyof AggregateIngestionRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIngestionRun[P]>
      : GetScalarType<T[P], AggregateIngestionRun[P]>
  }




  export type IngestionRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IngestionRunWhereInput
    orderBy?: IngestionRunOrderByWithAggregationInput | IngestionRunOrderByWithAggregationInput[]
    by: IngestionRunScalarFieldEnum[] | IngestionRunScalarFieldEnum
    having?: IngestionRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IngestionRunCountAggregateInputType | true
    _avg?: IngestionRunAvgAggregateInputType
    _sum?: IngestionRunSumAggregateInputType
    _min?: IngestionRunMinAggregateInputType
    _max?: IngestionRunMaxAggregateInputType
  }

  export type IngestionRunGroupByOutputType = {
    id: string
    datasetId: string
    status: string
    startedAt: Date
    finishedAt: Date | null
    rowsIngested: number
    rowsInvalid: number
    logUri: string | null
    createdAt: Date
    updatedAt: Date
    _count: IngestionRunCountAggregateOutputType | null
    _avg: IngestionRunAvgAggregateOutputType | null
    _sum: IngestionRunSumAggregateOutputType | null
    _min: IngestionRunMinAggregateOutputType | null
    _max: IngestionRunMaxAggregateOutputType | null
  }

  type GetIngestionRunGroupByPayload<T extends IngestionRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IngestionRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IngestionRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IngestionRunGroupByOutputType[P]>
            : GetScalarType<T[P], IngestionRunGroupByOutputType[P]>
        }
      >
    >


  export type IngestionRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    datasetId?: boolean
    status?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    rowsIngested?: boolean
    rowsInvalid?: boolean
    logUri?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ingestionRun"]>

  export type IngestionRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    datasetId?: boolean
    status?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    rowsIngested?: boolean
    rowsInvalid?: boolean
    logUri?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ingestionRun"]>

  export type IngestionRunSelectScalar = {
    id?: boolean
    datasetId?: boolean
    status?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    rowsIngested?: boolean
    rowsInvalid?: boolean
    logUri?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type IngestionRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
  }
  export type IngestionRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
  }

  export type $IngestionRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IngestionRun"
    objects: {
      dataset: Prisma.$DatasetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      datasetId: string
      status: string
      startedAt: Date
      finishedAt: Date | null
      rowsIngested: number
      rowsInvalid: number
      logUri: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ingestionRun"]>
    composites: {}
  }

  type IngestionRunGetPayload<S extends boolean | null | undefined | IngestionRunDefaultArgs> = $Result.GetResult<Prisma.$IngestionRunPayload, S>

  type IngestionRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<IngestionRunFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: IngestionRunCountAggregateInputType | true
    }

  export interface IngestionRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IngestionRun'], meta: { name: 'IngestionRun' } }
    /**
     * Find zero or one IngestionRun that matches the filter.
     * @param {IngestionRunFindUniqueArgs} args - Arguments to find a IngestionRun
     * @example
     * // Get one IngestionRun
     * const ingestionRun = await prisma.ingestionRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IngestionRunFindUniqueArgs>(args: SelectSubset<T, IngestionRunFindUniqueArgs<ExtArgs>>): Prisma__IngestionRunClient<$Result.GetResult<Prisma.$IngestionRunPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one IngestionRun that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {IngestionRunFindUniqueOrThrowArgs} args - Arguments to find a IngestionRun
     * @example
     * // Get one IngestionRun
     * const ingestionRun = await prisma.ingestionRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IngestionRunFindUniqueOrThrowArgs>(args: SelectSubset<T, IngestionRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IngestionRunClient<$Result.GetResult<Prisma.$IngestionRunPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first IngestionRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestionRunFindFirstArgs} args - Arguments to find a IngestionRun
     * @example
     * // Get one IngestionRun
     * const ingestionRun = await prisma.ingestionRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IngestionRunFindFirstArgs>(args?: SelectSubset<T, IngestionRunFindFirstArgs<ExtArgs>>): Prisma__IngestionRunClient<$Result.GetResult<Prisma.$IngestionRunPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first IngestionRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestionRunFindFirstOrThrowArgs} args - Arguments to find a IngestionRun
     * @example
     * // Get one IngestionRun
     * const ingestionRun = await prisma.ingestionRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IngestionRunFindFirstOrThrowArgs>(args?: SelectSubset<T, IngestionRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__IngestionRunClient<$Result.GetResult<Prisma.$IngestionRunPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more IngestionRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestionRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IngestionRuns
     * const ingestionRuns = await prisma.ingestionRun.findMany()
     * 
     * // Get first 10 IngestionRuns
     * const ingestionRuns = await prisma.ingestionRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ingestionRunWithIdOnly = await prisma.ingestionRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IngestionRunFindManyArgs>(args?: SelectSubset<T, IngestionRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngestionRunPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a IngestionRun.
     * @param {IngestionRunCreateArgs} args - Arguments to create a IngestionRun.
     * @example
     * // Create one IngestionRun
     * const IngestionRun = await prisma.ingestionRun.create({
     *   data: {
     *     // ... data to create a IngestionRun
     *   }
     * })
     * 
     */
    create<T extends IngestionRunCreateArgs>(args: SelectSubset<T, IngestionRunCreateArgs<ExtArgs>>): Prisma__IngestionRunClient<$Result.GetResult<Prisma.$IngestionRunPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many IngestionRuns.
     * @param {IngestionRunCreateManyArgs} args - Arguments to create many IngestionRuns.
     * @example
     * // Create many IngestionRuns
     * const ingestionRun = await prisma.ingestionRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IngestionRunCreateManyArgs>(args?: SelectSubset<T, IngestionRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IngestionRuns and returns the data saved in the database.
     * @param {IngestionRunCreateManyAndReturnArgs} args - Arguments to create many IngestionRuns.
     * @example
     * // Create many IngestionRuns
     * const ingestionRun = await prisma.ingestionRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IngestionRuns and only return the `id`
     * const ingestionRunWithIdOnly = await prisma.ingestionRun.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IngestionRunCreateManyAndReturnArgs>(args?: SelectSubset<T, IngestionRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngestionRunPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a IngestionRun.
     * @param {IngestionRunDeleteArgs} args - Arguments to delete one IngestionRun.
     * @example
     * // Delete one IngestionRun
     * const IngestionRun = await prisma.ingestionRun.delete({
     *   where: {
     *     // ... filter to delete one IngestionRun
     *   }
     * })
     * 
     */
    delete<T extends IngestionRunDeleteArgs>(args: SelectSubset<T, IngestionRunDeleteArgs<ExtArgs>>): Prisma__IngestionRunClient<$Result.GetResult<Prisma.$IngestionRunPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one IngestionRun.
     * @param {IngestionRunUpdateArgs} args - Arguments to update one IngestionRun.
     * @example
     * // Update one IngestionRun
     * const ingestionRun = await prisma.ingestionRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IngestionRunUpdateArgs>(args: SelectSubset<T, IngestionRunUpdateArgs<ExtArgs>>): Prisma__IngestionRunClient<$Result.GetResult<Prisma.$IngestionRunPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more IngestionRuns.
     * @param {IngestionRunDeleteManyArgs} args - Arguments to filter IngestionRuns to delete.
     * @example
     * // Delete a few IngestionRuns
     * const { count } = await prisma.ingestionRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IngestionRunDeleteManyArgs>(args?: SelectSubset<T, IngestionRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IngestionRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestionRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IngestionRuns
     * const ingestionRun = await prisma.ingestionRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IngestionRunUpdateManyArgs>(args: SelectSubset<T, IngestionRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one IngestionRun.
     * @param {IngestionRunUpsertArgs} args - Arguments to update or create a IngestionRun.
     * @example
     * // Update or create a IngestionRun
     * const ingestionRun = await prisma.ingestionRun.upsert({
     *   create: {
     *     // ... data to create a IngestionRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IngestionRun we want to update
     *   }
     * })
     */
    upsert<T extends IngestionRunUpsertArgs>(args: SelectSubset<T, IngestionRunUpsertArgs<ExtArgs>>): Prisma__IngestionRunClient<$Result.GetResult<Prisma.$IngestionRunPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of IngestionRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestionRunCountArgs} args - Arguments to filter IngestionRuns to count.
     * @example
     * // Count the number of IngestionRuns
     * const count = await prisma.ingestionRun.count({
     *   where: {
     *     // ... the filter for the IngestionRuns we want to count
     *   }
     * })
    **/
    count<T extends IngestionRunCountArgs>(
      args?: Subset<T, IngestionRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IngestionRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IngestionRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestionRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IngestionRunAggregateArgs>(args: Subset<T, IngestionRunAggregateArgs>): Prisma.PrismaPromise<GetIngestionRunAggregateType<T>>

    /**
     * Group by IngestionRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestionRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IngestionRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IngestionRunGroupByArgs['orderBy'] }
        : { orderBy?: IngestionRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IngestionRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngestionRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IngestionRun model
   */
  readonly fields: IngestionRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IngestionRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IngestionRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dataset<T extends DatasetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DatasetDefaultArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IngestionRun model
   */ 
  interface IngestionRunFieldRefs {
    readonly id: FieldRef<"IngestionRun", 'String'>
    readonly datasetId: FieldRef<"IngestionRun", 'String'>
    readonly status: FieldRef<"IngestionRun", 'String'>
    readonly startedAt: FieldRef<"IngestionRun", 'DateTime'>
    readonly finishedAt: FieldRef<"IngestionRun", 'DateTime'>
    readonly rowsIngested: FieldRef<"IngestionRun", 'Int'>
    readonly rowsInvalid: FieldRef<"IngestionRun", 'Int'>
    readonly logUri: FieldRef<"IngestionRun", 'String'>
    readonly createdAt: FieldRef<"IngestionRun", 'DateTime'>
    readonly updatedAt: FieldRef<"IngestionRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IngestionRun findUnique
   */
  export type IngestionRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestionRun
     */
    select?: IngestionRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestionRunInclude<ExtArgs> | null
    /**
     * Filter, which IngestionRun to fetch.
     */
    where: IngestionRunWhereUniqueInput
  }

  /**
   * IngestionRun findUniqueOrThrow
   */
  export type IngestionRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestionRun
     */
    select?: IngestionRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestionRunInclude<ExtArgs> | null
    /**
     * Filter, which IngestionRun to fetch.
     */
    where: IngestionRunWhereUniqueInput
  }

  /**
   * IngestionRun findFirst
   */
  export type IngestionRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestionRun
     */
    select?: IngestionRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestionRunInclude<ExtArgs> | null
    /**
     * Filter, which IngestionRun to fetch.
     */
    where?: IngestionRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IngestionRuns to fetch.
     */
    orderBy?: IngestionRunOrderByWithRelationInput | IngestionRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IngestionRuns.
     */
    cursor?: IngestionRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IngestionRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IngestionRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IngestionRuns.
     */
    distinct?: IngestionRunScalarFieldEnum | IngestionRunScalarFieldEnum[]
  }

  /**
   * IngestionRun findFirstOrThrow
   */
  export type IngestionRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestionRun
     */
    select?: IngestionRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestionRunInclude<ExtArgs> | null
    /**
     * Filter, which IngestionRun to fetch.
     */
    where?: IngestionRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IngestionRuns to fetch.
     */
    orderBy?: IngestionRunOrderByWithRelationInput | IngestionRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IngestionRuns.
     */
    cursor?: IngestionRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IngestionRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IngestionRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IngestionRuns.
     */
    distinct?: IngestionRunScalarFieldEnum | IngestionRunScalarFieldEnum[]
  }

  /**
   * IngestionRun findMany
   */
  export type IngestionRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestionRun
     */
    select?: IngestionRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestionRunInclude<ExtArgs> | null
    /**
     * Filter, which IngestionRuns to fetch.
     */
    where?: IngestionRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IngestionRuns to fetch.
     */
    orderBy?: IngestionRunOrderByWithRelationInput | IngestionRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IngestionRuns.
     */
    cursor?: IngestionRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IngestionRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IngestionRuns.
     */
    skip?: number
    distinct?: IngestionRunScalarFieldEnum | IngestionRunScalarFieldEnum[]
  }

  /**
   * IngestionRun create
   */
  export type IngestionRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestionRun
     */
    select?: IngestionRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestionRunInclude<ExtArgs> | null
    /**
     * The data needed to create a IngestionRun.
     */
    data: XOR<IngestionRunCreateInput, IngestionRunUncheckedCreateInput>
  }

  /**
   * IngestionRun createMany
   */
  export type IngestionRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IngestionRuns.
     */
    data: IngestionRunCreateManyInput | IngestionRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IngestionRun createManyAndReturn
   */
  export type IngestionRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestionRun
     */
    select?: IngestionRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many IngestionRuns.
     */
    data: IngestionRunCreateManyInput | IngestionRunCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestionRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IngestionRun update
   */
  export type IngestionRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestionRun
     */
    select?: IngestionRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestionRunInclude<ExtArgs> | null
    /**
     * The data needed to update a IngestionRun.
     */
    data: XOR<IngestionRunUpdateInput, IngestionRunUncheckedUpdateInput>
    /**
     * Choose, which IngestionRun to update.
     */
    where: IngestionRunWhereUniqueInput
  }

  /**
   * IngestionRun updateMany
   */
  export type IngestionRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IngestionRuns.
     */
    data: XOR<IngestionRunUpdateManyMutationInput, IngestionRunUncheckedUpdateManyInput>
    /**
     * Filter which IngestionRuns to update
     */
    where?: IngestionRunWhereInput
  }

  /**
   * IngestionRun upsert
   */
  export type IngestionRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestionRun
     */
    select?: IngestionRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestionRunInclude<ExtArgs> | null
    /**
     * The filter to search for the IngestionRun to update in case it exists.
     */
    where: IngestionRunWhereUniqueInput
    /**
     * In case the IngestionRun found by the `where` argument doesn't exist, create a new IngestionRun with this data.
     */
    create: XOR<IngestionRunCreateInput, IngestionRunUncheckedCreateInput>
    /**
     * In case the IngestionRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IngestionRunUpdateInput, IngestionRunUncheckedUpdateInput>
  }

  /**
   * IngestionRun delete
   */
  export type IngestionRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestionRun
     */
    select?: IngestionRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestionRunInclude<ExtArgs> | null
    /**
     * Filter which IngestionRun to delete.
     */
    where: IngestionRunWhereUniqueInput
  }

  /**
   * IngestionRun deleteMany
   */
  export type IngestionRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IngestionRuns to delete
     */
    where?: IngestionRunWhereInput
  }

  /**
   * IngestionRun without action
   */
  export type IngestionRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestionRun
     */
    select?: IngestionRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestionRunInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    municipalityId: string | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    municipalityId: string | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    role: number
    municipalityId: number
    lastLoginAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    municipalityId?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    municipalityId?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    municipalityId?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    role: string
    municipalityId: string | null
    lastLoginAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    municipalityId?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    municipality?: boolean | User$municipalityArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    municipalityId?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    municipality?: boolean | User$municipalityArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    municipalityId?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    municipality?: boolean | User$municipalityArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    municipality?: boolean | User$municipalityArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      municipality: Prisma.$MunicipalityPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      role: string
      municipalityId: string | null
      lastLoginAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    municipality<T extends User$municipalityArgs<ExtArgs> = {}>(args?: Subset<T, User$municipalityArgs<ExtArgs>>): Prisma__MunicipalityClient<$Result.GetResult<Prisma.$MunicipalityPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly municipalityId: FieldRef<"User", 'String'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.municipality
   */
  export type User$municipalityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Municipality
     */
    select?: MunicipalitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MunicipalityInclude<ExtArgs> | null
    where?: MunicipalityWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model QueryAudit
   */

  export type AggregateQueryAudit = {
    _count: QueryAuditCountAggregateOutputType | null
    _avg: QueryAuditAvgAggregateOutputType | null
    _sum: QueryAuditSumAggregateOutputType | null
    _min: QueryAuditMinAggregateOutputType | null
    _max: QueryAuditMaxAggregateOutputType | null
  }

  export type QueryAuditAvgAggregateOutputType = {
    rowsReturned: number | null
    latencyMs: number | null
  }

  export type QueryAuditSumAggregateOutputType = {
    rowsReturned: number | null
    latencyMs: number | null
  }

  export type QueryAuditMinAggregateOutputType = {
    id: string | null
    userType: string | null
    nlQuery: string | null
    compiledQuery: string | null
    rowsReturned: number | null
    latencyMs: number | null
    timestamp: Date | null
  }

  export type QueryAuditMaxAggregateOutputType = {
    id: string | null
    userType: string | null
    nlQuery: string | null
    compiledQuery: string | null
    rowsReturned: number | null
    latencyMs: number | null
    timestamp: Date | null
  }

  export type QueryAuditCountAggregateOutputType = {
    id: number
    userType: number
    nlQuery: number
    compiledQuery: number
    chartSpec: number
    filtersJson: number
    datasetsUsed: number
    rowsReturned: number
    latencyMs: number
    timestamp: number
    _all: number
  }


  export type QueryAuditAvgAggregateInputType = {
    rowsReturned?: true
    latencyMs?: true
  }

  export type QueryAuditSumAggregateInputType = {
    rowsReturned?: true
    latencyMs?: true
  }

  export type QueryAuditMinAggregateInputType = {
    id?: true
    userType?: true
    nlQuery?: true
    compiledQuery?: true
    rowsReturned?: true
    latencyMs?: true
    timestamp?: true
  }

  export type QueryAuditMaxAggregateInputType = {
    id?: true
    userType?: true
    nlQuery?: true
    compiledQuery?: true
    rowsReturned?: true
    latencyMs?: true
    timestamp?: true
  }

  export type QueryAuditCountAggregateInputType = {
    id?: true
    userType?: true
    nlQuery?: true
    compiledQuery?: true
    chartSpec?: true
    filtersJson?: true
    datasetsUsed?: true
    rowsReturned?: true
    latencyMs?: true
    timestamp?: true
    _all?: true
  }

  export type QueryAuditAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueryAudit to aggregate.
     */
    where?: QueryAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueryAudits to fetch.
     */
    orderBy?: QueryAuditOrderByWithRelationInput | QueryAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QueryAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueryAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueryAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QueryAudits
    **/
    _count?: true | QueryAuditCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QueryAuditAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QueryAuditSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QueryAuditMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QueryAuditMaxAggregateInputType
  }

  export type GetQueryAuditAggregateType<T extends QueryAuditAggregateArgs> = {
        [P in keyof T & keyof AggregateQueryAudit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQueryAudit[P]>
      : GetScalarType<T[P], AggregateQueryAudit[P]>
  }




  export type QueryAuditGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueryAuditWhereInput
    orderBy?: QueryAuditOrderByWithAggregationInput | QueryAuditOrderByWithAggregationInput[]
    by: QueryAuditScalarFieldEnum[] | QueryAuditScalarFieldEnum
    having?: QueryAuditScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QueryAuditCountAggregateInputType | true
    _avg?: QueryAuditAvgAggregateInputType
    _sum?: QueryAuditSumAggregateInputType
    _min?: QueryAuditMinAggregateInputType
    _max?: QueryAuditMaxAggregateInputType
  }

  export type QueryAuditGroupByOutputType = {
    id: string
    userType: string
    nlQuery: string | null
    compiledQuery: string | null
    chartSpec: JsonValue | null
    filtersJson: JsonValue | null
    datasetsUsed: string[]
    rowsReturned: number | null
    latencyMs: number | null
    timestamp: Date
    _count: QueryAuditCountAggregateOutputType | null
    _avg: QueryAuditAvgAggregateOutputType | null
    _sum: QueryAuditSumAggregateOutputType | null
    _min: QueryAuditMinAggregateOutputType | null
    _max: QueryAuditMaxAggregateOutputType | null
  }

  type GetQueryAuditGroupByPayload<T extends QueryAuditGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QueryAuditGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QueryAuditGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QueryAuditGroupByOutputType[P]>
            : GetScalarType<T[P], QueryAuditGroupByOutputType[P]>
        }
      >
    >


  export type QueryAuditSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userType?: boolean
    nlQuery?: boolean
    compiledQuery?: boolean
    chartSpec?: boolean
    filtersJson?: boolean
    datasetsUsed?: boolean
    rowsReturned?: boolean
    latencyMs?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["queryAudit"]>

  export type QueryAuditSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userType?: boolean
    nlQuery?: boolean
    compiledQuery?: boolean
    chartSpec?: boolean
    filtersJson?: boolean
    datasetsUsed?: boolean
    rowsReturned?: boolean
    latencyMs?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["queryAudit"]>

  export type QueryAuditSelectScalar = {
    id?: boolean
    userType?: boolean
    nlQuery?: boolean
    compiledQuery?: boolean
    chartSpec?: boolean
    filtersJson?: boolean
    datasetsUsed?: boolean
    rowsReturned?: boolean
    latencyMs?: boolean
    timestamp?: boolean
  }


  export type $QueryAuditPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QueryAudit"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userType: string
      nlQuery: string | null
      compiledQuery: string | null
      chartSpec: Prisma.JsonValue | null
      filtersJson: Prisma.JsonValue | null
      datasetsUsed: string[]
      rowsReturned: number | null
      latencyMs: number | null
      timestamp: Date
    }, ExtArgs["result"]["queryAudit"]>
    composites: {}
  }

  type QueryAuditGetPayload<S extends boolean | null | undefined | QueryAuditDefaultArgs> = $Result.GetResult<Prisma.$QueryAuditPayload, S>

  type QueryAuditCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QueryAuditFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QueryAuditCountAggregateInputType | true
    }

  export interface QueryAuditDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QueryAudit'], meta: { name: 'QueryAudit' } }
    /**
     * Find zero or one QueryAudit that matches the filter.
     * @param {QueryAuditFindUniqueArgs} args - Arguments to find a QueryAudit
     * @example
     * // Get one QueryAudit
     * const queryAudit = await prisma.queryAudit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QueryAuditFindUniqueArgs>(args: SelectSubset<T, QueryAuditFindUniqueArgs<ExtArgs>>): Prisma__QueryAuditClient<$Result.GetResult<Prisma.$QueryAuditPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one QueryAudit that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QueryAuditFindUniqueOrThrowArgs} args - Arguments to find a QueryAudit
     * @example
     * // Get one QueryAudit
     * const queryAudit = await prisma.queryAudit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QueryAuditFindUniqueOrThrowArgs>(args: SelectSubset<T, QueryAuditFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QueryAuditClient<$Result.GetResult<Prisma.$QueryAuditPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first QueryAudit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryAuditFindFirstArgs} args - Arguments to find a QueryAudit
     * @example
     * // Get one QueryAudit
     * const queryAudit = await prisma.queryAudit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QueryAuditFindFirstArgs>(args?: SelectSubset<T, QueryAuditFindFirstArgs<ExtArgs>>): Prisma__QueryAuditClient<$Result.GetResult<Prisma.$QueryAuditPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first QueryAudit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryAuditFindFirstOrThrowArgs} args - Arguments to find a QueryAudit
     * @example
     * // Get one QueryAudit
     * const queryAudit = await prisma.queryAudit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QueryAuditFindFirstOrThrowArgs>(args?: SelectSubset<T, QueryAuditFindFirstOrThrowArgs<ExtArgs>>): Prisma__QueryAuditClient<$Result.GetResult<Prisma.$QueryAuditPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more QueryAudits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryAuditFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QueryAudits
     * const queryAudits = await prisma.queryAudit.findMany()
     * 
     * // Get first 10 QueryAudits
     * const queryAudits = await prisma.queryAudit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const queryAuditWithIdOnly = await prisma.queryAudit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QueryAuditFindManyArgs>(args?: SelectSubset<T, QueryAuditFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueryAuditPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a QueryAudit.
     * @param {QueryAuditCreateArgs} args - Arguments to create a QueryAudit.
     * @example
     * // Create one QueryAudit
     * const QueryAudit = await prisma.queryAudit.create({
     *   data: {
     *     // ... data to create a QueryAudit
     *   }
     * })
     * 
     */
    create<T extends QueryAuditCreateArgs>(args: SelectSubset<T, QueryAuditCreateArgs<ExtArgs>>): Prisma__QueryAuditClient<$Result.GetResult<Prisma.$QueryAuditPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many QueryAudits.
     * @param {QueryAuditCreateManyArgs} args - Arguments to create many QueryAudits.
     * @example
     * // Create many QueryAudits
     * const queryAudit = await prisma.queryAudit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QueryAuditCreateManyArgs>(args?: SelectSubset<T, QueryAuditCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QueryAudits and returns the data saved in the database.
     * @param {QueryAuditCreateManyAndReturnArgs} args - Arguments to create many QueryAudits.
     * @example
     * // Create many QueryAudits
     * const queryAudit = await prisma.queryAudit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QueryAudits and only return the `id`
     * const queryAuditWithIdOnly = await prisma.queryAudit.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QueryAuditCreateManyAndReturnArgs>(args?: SelectSubset<T, QueryAuditCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueryAuditPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a QueryAudit.
     * @param {QueryAuditDeleteArgs} args - Arguments to delete one QueryAudit.
     * @example
     * // Delete one QueryAudit
     * const QueryAudit = await prisma.queryAudit.delete({
     *   where: {
     *     // ... filter to delete one QueryAudit
     *   }
     * })
     * 
     */
    delete<T extends QueryAuditDeleteArgs>(args: SelectSubset<T, QueryAuditDeleteArgs<ExtArgs>>): Prisma__QueryAuditClient<$Result.GetResult<Prisma.$QueryAuditPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one QueryAudit.
     * @param {QueryAuditUpdateArgs} args - Arguments to update one QueryAudit.
     * @example
     * // Update one QueryAudit
     * const queryAudit = await prisma.queryAudit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QueryAuditUpdateArgs>(args: SelectSubset<T, QueryAuditUpdateArgs<ExtArgs>>): Prisma__QueryAuditClient<$Result.GetResult<Prisma.$QueryAuditPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more QueryAudits.
     * @param {QueryAuditDeleteManyArgs} args - Arguments to filter QueryAudits to delete.
     * @example
     * // Delete a few QueryAudits
     * const { count } = await prisma.queryAudit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QueryAuditDeleteManyArgs>(args?: SelectSubset<T, QueryAuditDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueryAudits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryAuditUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QueryAudits
     * const queryAudit = await prisma.queryAudit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QueryAuditUpdateManyArgs>(args: SelectSubset<T, QueryAuditUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QueryAudit.
     * @param {QueryAuditUpsertArgs} args - Arguments to update or create a QueryAudit.
     * @example
     * // Update or create a QueryAudit
     * const queryAudit = await prisma.queryAudit.upsert({
     *   create: {
     *     // ... data to create a QueryAudit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QueryAudit we want to update
     *   }
     * })
     */
    upsert<T extends QueryAuditUpsertArgs>(args: SelectSubset<T, QueryAuditUpsertArgs<ExtArgs>>): Prisma__QueryAuditClient<$Result.GetResult<Prisma.$QueryAuditPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of QueryAudits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryAuditCountArgs} args - Arguments to filter QueryAudits to count.
     * @example
     * // Count the number of QueryAudits
     * const count = await prisma.queryAudit.count({
     *   where: {
     *     // ... the filter for the QueryAudits we want to count
     *   }
     * })
    **/
    count<T extends QueryAuditCountArgs>(
      args?: Subset<T, QueryAuditCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QueryAuditCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QueryAudit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryAuditAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QueryAuditAggregateArgs>(args: Subset<T, QueryAuditAggregateArgs>): Prisma.PrismaPromise<GetQueryAuditAggregateType<T>>

    /**
     * Group by QueryAudit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryAuditGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QueryAuditGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QueryAuditGroupByArgs['orderBy'] }
        : { orderBy?: QueryAuditGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QueryAuditGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueryAuditGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QueryAudit model
   */
  readonly fields: QueryAuditFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QueryAudit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QueryAuditClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QueryAudit model
   */ 
  interface QueryAuditFieldRefs {
    readonly id: FieldRef<"QueryAudit", 'String'>
    readonly userType: FieldRef<"QueryAudit", 'String'>
    readonly nlQuery: FieldRef<"QueryAudit", 'String'>
    readonly compiledQuery: FieldRef<"QueryAudit", 'String'>
    readonly chartSpec: FieldRef<"QueryAudit", 'Json'>
    readonly filtersJson: FieldRef<"QueryAudit", 'Json'>
    readonly datasetsUsed: FieldRef<"QueryAudit", 'String[]'>
    readonly rowsReturned: FieldRef<"QueryAudit", 'Int'>
    readonly latencyMs: FieldRef<"QueryAudit", 'Int'>
    readonly timestamp: FieldRef<"QueryAudit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QueryAudit findUnique
   */
  export type QueryAuditFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryAudit
     */
    select?: QueryAuditSelect<ExtArgs> | null
    /**
     * Filter, which QueryAudit to fetch.
     */
    where: QueryAuditWhereUniqueInput
  }

  /**
   * QueryAudit findUniqueOrThrow
   */
  export type QueryAuditFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryAudit
     */
    select?: QueryAuditSelect<ExtArgs> | null
    /**
     * Filter, which QueryAudit to fetch.
     */
    where: QueryAuditWhereUniqueInput
  }

  /**
   * QueryAudit findFirst
   */
  export type QueryAuditFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryAudit
     */
    select?: QueryAuditSelect<ExtArgs> | null
    /**
     * Filter, which QueryAudit to fetch.
     */
    where?: QueryAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueryAudits to fetch.
     */
    orderBy?: QueryAuditOrderByWithRelationInput | QueryAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueryAudits.
     */
    cursor?: QueryAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueryAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueryAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueryAudits.
     */
    distinct?: QueryAuditScalarFieldEnum | QueryAuditScalarFieldEnum[]
  }

  /**
   * QueryAudit findFirstOrThrow
   */
  export type QueryAuditFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryAudit
     */
    select?: QueryAuditSelect<ExtArgs> | null
    /**
     * Filter, which QueryAudit to fetch.
     */
    where?: QueryAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueryAudits to fetch.
     */
    orderBy?: QueryAuditOrderByWithRelationInput | QueryAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueryAudits.
     */
    cursor?: QueryAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueryAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueryAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueryAudits.
     */
    distinct?: QueryAuditScalarFieldEnum | QueryAuditScalarFieldEnum[]
  }

  /**
   * QueryAudit findMany
   */
  export type QueryAuditFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryAudit
     */
    select?: QueryAuditSelect<ExtArgs> | null
    /**
     * Filter, which QueryAudits to fetch.
     */
    where?: QueryAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueryAudits to fetch.
     */
    orderBy?: QueryAuditOrderByWithRelationInput | QueryAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QueryAudits.
     */
    cursor?: QueryAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueryAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueryAudits.
     */
    skip?: number
    distinct?: QueryAuditScalarFieldEnum | QueryAuditScalarFieldEnum[]
  }

  /**
   * QueryAudit create
   */
  export type QueryAuditCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryAudit
     */
    select?: QueryAuditSelect<ExtArgs> | null
    /**
     * The data needed to create a QueryAudit.
     */
    data: XOR<QueryAuditCreateInput, QueryAuditUncheckedCreateInput>
  }

  /**
   * QueryAudit createMany
   */
  export type QueryAuditCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QueryAudits.
     */
    data: QueryAuditCreateManyInput | QueryAuditCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QueryAudit createManyAndReturn
   */
  export type QueryAuditCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryAudit
     */
    select?: QueryAuditSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many QueryAudits.
     */
    data: QueryAuditCreateManyInput | QueryAuditCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QueryAudit update
   */
  export type QueryAuditUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryAudit
     */
    select?: QueryAuditSelect<ExtArgs> | null
    /**
     * The data needed to update a QueryAudit.
     */
    data: XOR<QueryAuditUpdateInput, QueryAuditUncheckedUpdateInput>
    /**
     * Choose, which QueryAudit to update.
     */
    where: QueryAuditWhereUniqueInput
  }

  /**
   * QueryAudit updateMany
   */
  export type QueryAuditUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QueryAudits.
     */
    data: XOR<QueryAuditUpdateManyMutationInput, QueryAuditUncheckedUpdateManyInput>
    /**
     * Filter which QueryAudits to update
     */
    where?: QueryAuditWhereInput
  }

  /**
   * QueryAudit upsert
   */
  export type QueryAuditUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryAudit
     */
    select?: QueryAuditSelect<ExtArgs> | null
    /**
     * The filter to search for the QueryAudit to update in case it exists.
     */
    where: QueryAuditWhereUniqueInput
    /**
     * In case the QueryAudit found by the `where` argument doesn't exist, create a new QueryAudit with this data.
     */
    create: XOR<QueryAuditCreateInput, QueryAuditUncheckedCreateInput>
    /**
     * In case the QueryAudit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QueryAuditUpdateInput, QueryAuditUncheckedUpdateInput>
  }

  /**
   * QueryAudit delete
   */
  export type QueryAuditDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryAudit
     */
    select?: QueryAuditSelect<ExtArgs> | null
    /**
     * Filter which QueryAudit to delete.
     */
    where: QueryAuditWhereUniqueInput
  }

  /**
   * QueryAudit deleteMany
   */
  export type QueryAuditDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueryAudits to delete
     */
    where?: QueryAuditWhereInput
  }

  /**
   * QueryAudit without action
   */
  export type QueryAuditDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryAudit
     */
    select?: QueryAuditSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MunicipalityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    country: 'country',
    region: 'region',
    locale: 'locale',
    timezone: 'timezone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MunicipalityScalarFieldEnum = (typeof MunicipalityScalarFieldEnum)[keyof typeof MunicipalityScalarFieldEnum]


  export const FiscalYearScalarFieldEnum: {
    id: 'id',
    year: 'year',
    status: 'status',
    lockedAt: 'lockedAt'
  };

  export type FiscalYearScalarFieldEnum = (typeof FiscalYearScalarFieldEnum)[keyof typeof FiscalYearScalarFieldEnum]


  export const BudgetScalarFieldEnum: {
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

  export type BudgetScalarFieldEnum = (typeof BudgetScalarFieldEnum)[keyof typeof BudgetScalarFieldEnum]


  export const ExpenditureScalarFieldEnum: {
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

  export type ExpenditureScalarFieldEnum = (typeof ExpenditureScalarFieldEnum)[keyof typeof ExpenditureScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
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

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const FundingSourceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FundingSourceScalarFieldEnum = (typeof FundingSourceScalarFieldEnum)[keyof typeof FundingSourceScalarFieldEnum]


  export const SupplierScalarFieldEnum: {
    id: 'id',
    name: 'name',
    taxId: 'taxId',
    sector: 'sector',
    locality: 'locality',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum]


  export const DatasetScalarFieldEnum: {
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

  export type DatasetScalarFieldEnum = (typeof DatasetScalarFieldEnum)[keyof typeof DatasetScalarFieldEnum]


  export const IngestionRunScalarFieldEnum: {
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

  export type IngestionRunScalarFieldEnum = (typeof IngestionRunScalarFieldEnum)[keyof typeof IngestionRunScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    municipalityId: 'municipalityId',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const QueryAuditScalarFieldEnum: {
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

  export type QueryAuditScalarFieldEnum = (typeof QueryAuditScalarFieldEnum)[keyof typeof QueryAuditScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MunicipalityWhereInput = {
    AND?: MunicipalityWhereInput | MunicipalityWhereInput[]
    OR?: MunicipalityWhereInput[]
    NOT?: MunicipalityWhereInput | MunicipalityWhereInput[]
    id?: StringFilter<"Municipality"> | string
    name?: StringFilter<"Municipality"> | string
    country?: StringFilter<"Municipality"> | string
    region?: StringFilter<"Municipality"> | string
    locale?: StringFilter<"Municipality"> | string
    timezone?: StringFilter<"Municipality"> | string
    createdAt?: DateTimeFilter<"Municipality"> | Date | string
    updatedAt?: DateTimeFilter<"Municipality"> | Date | string
    budgets?: BudgetListRelationFilter
    expenditures?: ExpenditureListRelationFilter
    projects?: ProjectListRelationFilter
    users?: UserListRelationFilter
  }

  export type MunicipalityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    region?: SortOrder
    locale?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgets?: BudgetOrderByRelationAggregateInput
    expenditures?: ExpenditureOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    users?: UserOrderByRelationAggregateInput
  }

  export type MunicipalityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MunicipalityWhereInput | MunicipalityWhereInput[]
    OR?: MunicipalityWhereInput[]
    NOT?: MunicipalityWhereInput | MunicipalityWhereInput[]
    name?: StringFilter<"Municipality"> | string
    country?: StringFilter<"Municipality"> | string
    region?: StringFilter<"Municipality"> | string
    locale?: StringFilter<"Municipality"> | string
    timezone?: StringFilter<"Municipality"> | string
    createdAt?: DateTimeFilter<"Municipality"> | Date | string
    updatedAt?: DateTimeFilter<"Municipality"> | Date | string
    budgets?: BudgetListRelationFilter
    expenditures?: ExpenditureListRelationFilter
    projects?: ProjectListRelationFilter
    users?: UserListRelationFilter
  }, "id">

  export type MunicipalityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    region?: SortOrder
    locale?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MunicipalityCountOrderByAggregateInput
    _max?: MunicipalityMaxOrderByAggregateInput
    _min?: MunicipalityMinOrderByAggregateInput
  }

  export type MunicipalityScalarWhereWithAggregatesInput = {
    AND?: MunicipalityScalarWhereWithAggregatesInput | MunicipalityScalarWhereWithAggregatesInput[]
    OR?: MunicipalityScalarWhereWithAggregatesInput[]
    NOT?: MunicipalityScalarWhereWithAggregatesInput | MunicipalityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Municipality"> | string
    name?: StringWithAggregatesFilter<"Municipality"> | string
    country?: StringWithAggregatesFilter<"Municipality"> | string
    region?: StringWithAggregatesFilter<"Municipality"> | string
    locale?: StringWithAggregatesFilter<"Municipality"> | string
    timezone?: StringWithAggregatesFilter<"Municipality"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Municipality"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Municipality"> | Date | string
  }

  export type FiscalYearWhereInput = {
    AND?: FiscalYearWhereInput | FiscalYearWhereInput[]
    OR?: FiscalYearWhereInput[]
    NOT?: FiscalYearWhereInput | FiscalYearWhereInput[]
    id?: StringFilter<"FiscalYear"> | string
    year?: IntFilter<"FiscalYear"> | number
    status?: StringFilter<"FiscalYear"> | string
    lockedAt?: DateTimeNullableFilter<"FiscalYear"> | Date | string | null
    budgets?: BudgetListRelationFilter
    expenditures?: ExpenditureListRelationFilter
  }

  export type FiscalYearOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    status?: SortOrder
    lockedAt?: SortOrderInput | SortOrder
    budgets?: BudgetOrderByRelationAggregateInput
    expenditures?: ExpenditureOrderByRelationAggregateInput
  }

  export type FiscalYearWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    year?: number
    AND?: FiscalYearWhereInput | FiscalYearWhereInput[]
    OR?: FiscalYearWhereInput[]
    NOT?: FiscalYearWhereInput | FiscalYearWhereInput[]
    status?: StringFilter<"FiscalYear"> | string
    lockedAt?: DateTimeNullableFilter<"FiscalYear"> | Date | string | null
    budgets?: BudgetListRelationFilter
    expenditures?: ExpenditureListRelationFilter
  }, "id" | "year">

  export type FiscalYearOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    status?: SortOrder
    lockedAt?: SortOrderInput | SortOrder
    _count?: FiscalYearCountOrderByAggregateInput
    _avg?: FiscalYearAvgOrderByAggregateInput
    _max?: FiscalYearMaxOrderByAggregateInput
    _min?: FiscalYearMinOrderByAggregateInput
    _sum?: FiscalYearSumOrderByAggregateInput
  }

  export type FiscalYearScalarWhereWithAggregatesInput = {
    AND?: FiscalYearScalarWhereWithAggregatesInput | FiscalYearScalarWhereWithAggregatesInput[]
    OR?: FiscalYearScalarWhereWithAggregatesInput[]
    NOT?: FiscalYearScalarWhereWithAggregatesInput | FiscalYearScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FiscalYear"> | string
    year?: IntWithAggregatesFilter<"FiscalYear"> | number
    status?: StringWithAggregatesFilter<"FiscalYear"> | string
    lockedAt?: DateTimeNullableWithAggregatesFilter<"FiscalYear"> | Date | string | null
  }

  export type BudgetWhereInput = {
    AND?: BudgetWhereInput | BudgetWhereInput[]
    OR?: BudgetWhereInput[]
    NOT?: BudgetWhereInput | BudgetWhereInput[]
    id?: StringFilter<"Budget"> | string
    municipalityId?: StringFilter<"Budget"> | string
    fiscalYearId?: StringFilter<"Budget"> | string
    department?: StringFilter<"Budget"> | string
    program?: StringFilter<"Budget"> | string
    category?: StringFilter<"Budget"> | string
    subcategory?: StringFilter<"Budget"> | string
    amountPlanned?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Budget"> | string
    notes?: StringNullableFilter<"Budget"> | string | null
    createdAt?: DateTimeFilter<"Budget"> | Date | string
    updatedAt?: DateTimeFilter<"Budget"> | Date | string
    municipality?: XOR<MunicipalityRelationFilter, MunicipalityWhereInput>
    fiscalYear?: XOR<FiscalYearRelationFilter, FiscalYearWhereInput>
  }

  export type BudgetOrderByWithRelationInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    fiscalYearId?: SortOrder
    department?: SortOrder
    program?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    amountPlanned?: SortOrder
    currency?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    municipality?: MunicipalityOrderByWithRelationInput
    fiscalYear?: FiscalYearOrderByWithRelationInput
  }

  export type BudgetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BudgetWhereInput | BudgetWhereInput[]
    OR?: BudgetWhereInput[]
    NOT?: BudgetWhereInput | BudgetWhereInput[]
    municipalityId?: StringFilter<"Budget"> | string
    fiscalYearId?: StringFilter<"Budget"> | string
    department?: StringFilter<"Budget"> | string
    program?: StringFilter<"Budget"> | string
    category?: StringFilter<"Budget"> | string
    subcategory?: StringFilter<"Budget"> | string
    amountPlanned?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Budget"> | string
    notes?: StringNullableFilter<"Budget"> | string | null
    createdAt?: DateTimeFilter<"Budget"> | Date | string
    updatedAt?: DateTimeFilter<"Budget"> | Date | string
    municipality?: XOR<MunicipalityRelationFilter, MunicipalityWhereInput>
    fiscalYear?: XOR<FiscalYearRelationFilter, FiscalYearWhereInput>
  }, "id">

  export type BudgetOrderByWithAggregationInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    fiscalYearId?: SortOrder
    department?: SortOrder
    program?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    amountPlanned?: SortOrder
    currency?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BudgetCountOrderByAggregateInput
    _avg?: BudgetAvgOrderByAggregateInput
    _max?: BudgetMaxOrderByAggregateInput
    _min?: BudgetMinOrderByAggregateInput
    _sum?: BudgetSumOrderByAggregateInput
  }

  export type BudgetScalarWhereWithAggregatesInput = {
    AND?: BudgetScalarWhereWithAggregatesInput | BudgetScalarWhereWithAggregatesInput[]
    OR?: BudgetScalarWhereWithAggregatesInput[]
    NOT?: BudgetScalarWhereWithAggregatesInput | BudgetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Budget"> | string
    municipalityId?: StringWithAggregatesFilter<"Budget"> | string
    fiscalYearId?: StringWithAggregatesFilter<"Budget"> | string
    department?: StringWithAggregatesFilter<"Budget"> | string
    program?: StringWithAggregatesFilter<"Budget"> | string
    category?: StringWithAggregatesFilter<"Budget"> | string
    subcategory?: StringWithAggregatesFilter<"Budget"> | string
    amountPlanned?: DecimalWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"Budget"> | string
    notes?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Budget"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Budget"> | Date | string
  }

  export type ExpenditureWhereInput = {
    AND?: ExpenditureWhereInput | ExpenditureWhereInput[]
    OR?: ExpenditureWhereInput[]
    NOT?: ExpenditureWhereInput | ExpenditureWhereInput[]
    id?: StringFilter<"Expenditure"> | string
    municipalityId?: StringFilter<"Expenditure"> | string
    fiscalYearId?: StringFilter<"Expenditure"> | string
    date?: DateTimeFilter<"Expenditure"> | Date | string
    department?: StringFilter<"Expenditure"> | string
    program?: StringFilter<"Expenditure"> | string
    category?: StringFilter<"Expenditure"> | string
    subcategory?: StringFilter<"Expenditure"> | string
    concept?: StringFilter<"Expenditure"> | string
    amountActual?: DecimalFilter<"Expenditure"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Expenditure"> | string
    supplierId?: StringNullableFilter<"Expenditure"> | string | null
    procurementRef?: StringNullableFilter<"Expenditure"> | string | null
    location?: StringNullableFilter<"Expenditure"> | string | null
    createdAt?: DateTimeFilter<"Expenditure"> | Date | string
    updatedAt?: DateTimeFilter<"Expenditure"> | Date | string
    municipality?: XOR<MunicipalityRelationFilter, MunicipalityWhereInput>
    fiscalYear?: XOR<FiscalYearRelationFilter, FiscalYearWhereInput>
    supplier?: XOR<SupplierNullableRelationFilter, SupplierWhereInput> | null
  }

  export type ExpenditureOrderByWithRelationInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    fiscalYearId?: SortOrder
    date?: SortOrder
    department?: SortOrder
    program?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    concept?: SortOrder
    amountActual?: SortOrder
    currency?: SortOrder
    supplierId?: SortOrderInput | SortOrder
    procurementRef?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    municipality?: MunicipalityOrderByWithRelationInput
    fiscalYear?: FiscalYearOrderByWithRelationInput
    supplier?: SupplierOrderByWithRelationInput
  }

  export type ExpenditureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExpenditureWhereInput | ExpenditureWhereInput[]
    OR?: ExpenditureWhereInput[]
    NOT?: ExpenditureWhereInput | ExpenditureWhereInput[]
    municipalityId?: StringFilter<"Expenditure"> | string
    fiscalYearId?: StringFilter<"Expenditure"> | string
    date?: DateTimeFilter<"Expenditure"> | Date | string
    department?: StringFilter<"Expenditure"> | string
    program?: StringFilter<"Expenditure"> | string
    category?: StringFilter<"Expenditure"> | string
    subcategory?: StringFilter<"Expenditure"> | string
    concept?: StringFilter<"Expenditure"> | string
    amountActual?: DecimalFilter<"Expenditure"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Expenditure"> | string
    supplierId?: StringNullableFilter<"Expenditure"> | string | null
    procurementRef?: StringNullableFilter<"Expenditure"> | string | null
    location?: StringNullableFilter<"Expenditure"> | string | null
    createdAt?: DateTimeFilter<"Expenditure"> | Date | string
    updatedAt?: DateTimeFilter<"Expenditure"> | Date | string
    municipality?: XOR<MunicipalityRelationFilter, MunicipalityWhereInput>
    fiscalYear?: XOR<FiscalYearRelationFilter, FiscalYearWhereInput>
    supplier?: XOR<SupplierNullableRelationFilter, SupplierWhereInput> | null
  }, "id">

  export type ExpenditureOrderByWithAggregationInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    fiscalYearId?: SortOrder
    date?: SortOrder
    department?: SortOrder
    program?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    concept?: SortOrder
    amountActual?: SortOrder
    currency?: SortOrder
    supplierId?: SortOrderInput | SortOrder
    procurementRef?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExpenditureCountOrderByAggregateInput
    _avg?: ExpenditureAvgOrderByAggregateInput
    _max?: ExpenditureMaxOrderByAggregateInput
    _min?: ExpenditureMinOrderByAggregateInput
    _sum?: ExpenditureSumOrderByAggregateInput
  }

  export type ExpenditureScalarWhereWithAggregatesInput = {
    AND?: ExpenditureScalarWhereWithAggregatesInput | ExpenditureScalarWhereWithAggregatesInput[]
    OR?: ExpenditureScalarWhereWithAggregatesInput[]
    NOT?: ExpenditureScalarWhereWithAggregatesInput | ExpenditureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Expenditure"> | string
    municipalityId?: StringWithAggregatesFilter<"Expenditure"> | string
    fiscalYearId?: StringWithAggregatesFilter<"Expenditure"> | string
    date?: DateTimeWithAggregatesFilter<"Expenditure"> | Date | string
    department?: StringWithAggregatesFilter<"Expenditure"> | string
    program?: StringWithAggregatesFilter<"Expenditure"> | string
    category?: StringWithAggregatesFilter<"Expenditure"> | string
    subcategory?: StringWithAggregatesFilter<"Expenditure"> | string
    concept?: StringWithAggregatesFilter<"Expenditure"> | string
    amountActual?: DecimalWithAggregatesFilter<"Expenditure"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"Expenditure"> | string
    supplierId?: StringNullableWithAggregatesFilter<"Expenditure"> | string | null
    procurementRef?: StringNullableWithAggregatesFilter<"Expenditure"> | string | null
    location?: StringNullableWithAggregatesFilter<"Expenditure"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Expenditure"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Expenditure"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    municipalityId?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    status?: StringFilter<"Project"> | string
    startDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    department?: StringFilter<"Project"> | string
    category?: StringFilter<"Project"> | string
    requestedBudget?: DecimalNullableFilter<"Project"> | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: DecimalNullableFilter<"Project"> | Decimal | DecimalJsLike | number | string | null
    fundingSourceId?: StringNullableFilter<"Project"> | string | null
    location?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    municipality?: XOR<MunicipalityRelationFilter, MunicipalityWhereInput>
    fundingSource?: XOR<FundingSourceNullableRelationFilter, FundingSourceWhereInput> | null
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    department?: SortOrder
    category?: SortOrder
    requestedBudget?: SortOrderInput | SortOrder
    approvedBudget?: SortOrderInput | SortOrder
    fundingSourceId?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    municipality?: MunicipalityOrderByWithRelationInput
    fundingSource?: FundingSourceOrderByWithRelationInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    municipalityId?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    status?: StringFilter<"Project"> | string
    startDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    department?: StringFilter<"Project"> | string
    category?: StringFilter<"Project"> | string
    requestedBudget?: DecimalNullableFilter<"Project"> | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: DecimalNullableFilter<"Project"> | Decimal | DecimalJsLike | number | string | null
    fundingSourceId?: StringNullableFilter<"Project"> | string | null
    location?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    municipality?: XOR<MunicipalityRelationFilter, MunicipalityWhereInput>
    fundingSource?: XOR<FundingSourceNullableRelationFilter, FundingSourceWhereInput> | null
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    department?: SortOrder
    category?: SortOrder
    requestedBudget?: SortOrderInput | SortOrder
    approvedBudget?: SortOrderInput | SortOrder
    fundingSourceId?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    municipalityId?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    description?: StringWithAggregatesFilter<"Project"> | string
    status?: StringWithAggregatesFilter<"Project"> | string
    startDate?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    department?: StringWithAggregatesFilter<"Project"> | string
    category?: StringWithAggregatesFilter<"Project"> | string
    requestedBudget?: DecimalNullableWithAggregatesFilter<"Project"> | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: DecimalNullableWithAggregatesFilter<"Project"> | Decimal | DecimalJsLike | number | string | null
    fundingSourceId?: StringNullableWithAggregatesFilter<"Project"> | string | null
    location?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type FundingSourceWhereInput = {
    AND?: FundingSourceWhereInput | FundingSourceWhereInput[]
    OR?: FundingSourceWhereInput[]
    NOT?: FundingSourceWhereInput | FundingSourceWhereInput[]
    id?: StringFilter<"FundingSource"> | string
    name?: StringFilter<"FundingSource"> | string
    type?: StringFilter<"FundingSource"> | string
    description?: StringNullableFilter<"FundingSource"> | string | null
    createdAt?: DateTimeFilter<"FundingSource"> | Date | string
    updatedAt?: DateTimeFilter<"FundingSource"> | Date | string
    projects?: ProjectListRelationFilter
  }

  export type FundingSourceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projects?: ProjectOrderByRelationAggregateInput
  }

  export type FundingSourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FundingSourceWhereInput | FundingSourceWhereInput[]
    OR?: FundingSourceWhereInput[]
    NOT?: FundingSourceWhereInput | FundingSourceWhereInput[]
    name?: StringFilter<"FundingSource"> | string
    type?: StringFilter<"FundingSource"> | string
    description?: StringNullableFilter<"FundingSource"> | string | null
    createdAt?: DateTimeFilter<"FundingSource"> | Date | string
    updatedAt?: DateTimeFilter<"FundingSource"> | Date | string
    projects?: ProjectListRelationFilter
  }, "id">

  export type FundingSourceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FundingSourceCountOrderByAggregateInput
    _max?: FundingSourceMaxOrderByAggregateInput
    _min?: FundingSourceMinOrderByAggregateInput
  }

  export type FundingSourceScalarWhereWithAggregatesInput = {
    AND?: FundingSourceScalarWhereWithAggregatesInput | FundingSourceScalarWhereWithAggregatesInput[]
    OR?: FundingSourceScalarWhereWithAggregatesInput[]
    NOT?: FundingSourceScalarWhereWithAggregatesInput | FundingSourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FundingSource"> | string
    name?: StringWithAggregatesFilter<"FundingSource"> | string
    type?: StringWithAggregatesFilter<"FundingSource"> | string
    description?: StringNullableWithAggregatesFilter<"FundingSource"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FundingSource"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FundingSource"> | Date | string
  }

  export type SupplierWhereInput = {
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    id?: StringFilter<"Supplier"> | string
    name?: StringFilter<"Supplier"> | string
    taxId?: StringNullableFilter<"Supplier"> | string | null
    sector?: StringNullableFilter<"Supplier"> | string | null
    locality?: StringNullableFilter<"Supplier"> | string | null
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeFilter<"Supplier"> | Date | string
    expenditures?: ExpenditureListRelationFilter
  }

  export type SupplierOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    taxId?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    locality?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expenditures?: ExpenditureOrderByRelationAggregateInput
  }

  export type SupplierWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    taxId?: string
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    name?: StringFilter<"Supplier"> | string
    sector?: StringNullableFilter<"Supplier"> | string | null
    locality?: StringNullableFilter<"Supplier"> | string | null
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeFilter<"Supplier"> | Date | string
    expenditures?: ExpenditureListRelationFilter
  }, "id" | "taxId">

  export type SupplierOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    taxId?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    locality?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SupplierCountOrderByAggregateInput
    _max?: SupplierMaxOrderByAggregateInput
    _min?: SupplierMinOrderByAggregateInput
  }

  export type SupplierScalarWhereWithAggregatesInput = {
    AND?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    OR?: SupplierScalarWhereWithAggregatesInput[]
    NOT?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Supplier"> | string
    name?: StringWithAggregatesFilter<"Supplier"> | string
    taxId?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    sector?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    locality?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
  }

  export type DatasetWhereInput = {
    AND?: DatasetWhereInput | DatasetWhereInput[]
    OR?: DatasetWhereInput[]
    NOT?: DatasetWhereInput | DatasetWhereInput[]
    id?: StringFilter<"Dataset"> | string
    name?: StringFilter<"Dataset"> | string
    type?: StringFilter<"Dataset"> | string
    sourceUri?: StringNullableFilter<"Dataset"> | string | null
    refreshSchedule?: StringNullableFilter<"Dataset"> | string | null
    schemaVersion?: StringNullableFilter<"Dataset"> | string | null
    lastIngestedAt?: DateTimeNullableFilter<"Dataset"> | Date | string | null
    checksum?: StringNullableFilter<"Dataset"> | string | null
    createdAt?: DateTimeFilter<"Dataset"> | Date | string
    updatedAt?: DateTimeFilter<"Dataset"> | Date | string
    ingestionRuns?: IngestionRunListRelationFilter
  }

  export type DatasetOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    sourceUri?: SortOrderInput | SortOrder
    refreshSchedule?: SortOrderInput | SortOrder
    schemaVersion?: SortOrderInput | SortOrder
    lastIngestedAt?: SortOrderInput | SortOrder
    checksum?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ingestionRuns?: IngestionRunOrderByRelationAggregateInput
  }

  export type DatasetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DatasetWhereInput | DatasetWhereInput[]
    OR?: DatasetWhereInput[]
    NOT?: DatasetWhereInput | DatasetWhereInput[]
    name?: StringFilter<"Dataset"> | string
    type?: StringFilter<"Dataset"> | string
    sourceUri?: StringNullableFilter<"Dataset"> | string | null
    refreshSchedule?: StringNullableFilter<"Dataset"> | string | null
    schemaVersion?: StringNullableFilter<"Dataset"> | string | null
    lastIngestedAt?: DateTimeNullableFilter<"Dataset"> | Date | string | null
    checksum?: StringNullableFilter<"Dataset"> | string | null
    createdAt?: DateTimeFilter<"Dataset"> | Date | string
    updatedAt?: DateTimeFilter<"Dataset"> | Date | string
    ingestionRuns?: IngestionRunListRelationFilter
  }, "id">

  export type DatasetOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    sourceUri?: SortOrderInput | SortOrder
    refreshSchedule?: SortOrderInput | SortOrder
    schemaVersion?: SortOrderInput | SortOrder
    lastIngestedAt?: SortOrderInput | SortOrder
    checksum?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DatasetCountOrderByAggregateInput
    _max?: DatasetMaxOrderByAggregateInput
    _min?: DatasetMinOrderByAggregateInput
  }

  export type DatasetScalarWhereWithAggregatesInput = {
    AND?: DatasetScalarWhereWithAggregatesInput | DatasetScalarWhereWithAggregatesInput[]
    OR?: DatasetScalarWhereWithAggregatesInput[]
    NOT?: DatasetScalarWhereWithAggregatesInput | DatasetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Dataset"> | string
    name?: StringWithAggregatesFilter<"Dataset"> | string
    type?: StringWithAggregatesFilter<"Dataset"> | string
    sourceUri?: StringNullableWithAggregatesFilter<"Dataset"> | string | null
    refreshSchedule?: StringNullableWithAggregatesFilter<"Dataset"> | string | null
    schemaVersion?: StringNullableWithAggregatesFilter<"Dataset"> | string | null
    lastIngestedAt?: DateTimeNullableWithAggregatesFilter<"Dataset"> | Date | string | null
    checksum?: StringNullableWithAggregatesFilter<"Dataset"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Dataset"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Dataset"> | Date | string
  }

  export type IngestionRunWhereInput = {
    AND?: IngestionRunWhereInput | IngestionRunWhereInput[]
    OR?: IngestionRunWhereInput[]
    NOT?: IngestionRunWhereInput | IngestionRunWhereInput[]
    id?: StringFilter<"IngestionRun"> | string
    datasetId?: StringFilter<"IngestionRun"> | string
    status?: StringFilter<"IngestionRun"> | string
    startedAt?: DateTimeFilter<"IngestionRun"> | Date | string
    finishedAt?: DateTimeNullableFilter<"IngestionRun"> | Date | string | null
    rowsIngested?: IntFilter<"IngestionRun"> | number
    rowsInvalid?: IntFilter<"IngestionRun"> | number
    logUri?: StringNullableFilter<"IngestionRun"> | string | null
    createdAt?: DateTimeFilter<"IngestionRun"> | Date | string
    updatedAt?: DateTimeFilter<"IngestionRun"> | Date | string
    dataset?: XOR<DatasetRelationFilter, DatasetWhereInput>
  }

  export type IngestionRunOrderByWithRelationInput = {
    id?: SortOrder
    datasetId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    rowsIngested?: SortOrder
    rowsInvalid?: SortOrder
    logUri?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dataset?: DatasetOrderByWithRelationInput
  }

  export type IngestionRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: IngestionRunWhereInput | IngestionRunWhereInput[]
    OR?: IngestionRunWhereInput[]
    NOT?: IngestionRunWhereInput | IngestionRunWhereInput[]
    datasetId?: StringFilter<"IngestionRun"> | string
    status?: StringFilter<"IngestionRun"> | string
    startedAt?: DateTimeFilter<"IngestionRun"> | Date | string
    finishedAt?: DateTimeNullableFilter<"IngestionRun"> | Date | string | null
    rowsIngested?: IntFilter<"IngestionRun"> | number
    rowsInvalid?: IntFilter<"IngestionRun"> | number
    logUri?: StringNullableFilter<"IngestionRun"> | string | null
    createdAt?: DateTimeFilter<"IngestionRun"> | Date | string
    updatedAt?: DateTimeFilter<"IngestionRun"> | Date | string
    dataset?: XOR<DatasetRelationFilter, DatasetWhereInput>
  }, "id">

  export type IngestionRunOrderByWithAggregationInput = {
    id?: SortOrder
    datasetId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    rowsIngested?: SortOrder
    rowsInvalid?: SortOrder
    logUri?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: IngestionRunCountOrderByAggregateInput
    _avg?: IngestionRunAvgOrderByAggregateInput
    _max?: IngestionRunMaxOrderByAggregateInput
    _min?: IngestionRunMinOrderByAggregateInput
    _sum?: IngestionRunSumOrderByAggregateInput
  }

  export type IngestionRunScalarWhereWithAggregatesInput = {
    AND?: IngestionRunScalarWhereWithAggregatesInput | IngestionRunScalarWhereWithAggregatesInput[]
    OR?: IngestionRunScalarWhereWithAggregatesInput[]
    NOT?: IngestionRunScalarWhereWithAggregatesInput | IngestionRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IngestionRun"> | string
    datasetId?: StringWithAggregatesFilter<"IngestionRun"> | string
    status?: StringWithAggregatesFilter<"IngestionRun"> | string
    startedAt?: DateTimeWithAggregatesFilter<"IngestionRun"> | Date | string
    finishedAt?: DateTimeNullableWithAggregatesFilter<"IngestionRun"> | Date | string | null
    rowsIngested?: IntWithAggregatesFilter<"IngestionRun"> | number
    rowsInvalid?: IntWithAggregatesFilter<"IngestionRun"> | number
    logUri?: StringNullableWithAggregatesFilter<"IngestionRun"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"IngestionRun"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"IngestionRun"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    municipalityId?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    municipality?: XOR<MunicipalityNullableRelationFilter, MunicipalityWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    municipalityId?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    municipality?: MunicipalityOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    municipalityId?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    municipality?: XOR<MunicipalityNullableRelationFilter, MunicipalityWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    municipalityId?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    municipalityId?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type QueryAuditWhereInput = {
    AND?: QueryAuditWhereInput | QueryAuditWhereInput[]
    OR?: QueryAuditWhereInput[]
    NOT?: QueryAuditWhereInput | QueryAuditWhereInput[]
    id?: StringFilter<"QueryAudit"> | string
    userType?: StringFilter<"QueryAudit"> | string
    nlQuery?: StringNullableFilter<"QueryAudit"> | string | null
    compiledQuery?: StringNullableFilter<"QueryAudit"> | string | null
    chartSpec?: JsonNullableFilter<"QueryAudit">
    filtersJson?: JsonNullableFilter<"QueryAudit">
    datasetsUsed?: StringNullableListFilter<"QueryAudit">
    rowsReturned?: IntNullableFilter<"QueryAudit"> | number | null
    latencyMs?: IntNullableFilter<"QueryAudit"> | number | null
    timestamp?: DateTimeFilter<"QueryAudit"> | Date | string
  }

  export type QueryAuditOrderByWithRelationInput = {
    id?: SortOrder
    userType?: SortOrder
    nlQuery?: SortOrderInput | SortOrder
    compiledQuery?: SortOrderInput | SortOrder
    chartSpec?: SortOrderInput | SortOrder
    filtersJson?: SortOrderInput | SortOrder
    datasetsUsed?: SortOrder
    rowsReturned?: SortOrderInput | SortOrder
    latencyMs?: SortOrderInput | SortOrder
    timestamp?: SortOrder
  }

  export type QueryAuditWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QueryAuditWhereInput | QueryAuditWhereInput[]
    OR?: QueryAuditWhereInput[]
    NOT?: QueryAuditWhereInput | QueryAuditWhereInput[]
    userType?: StringFilter<"QueryAudit"> | string
    nlQuery?: StringNullableFilter<"QueryAudit"> | string | null
    compiledQuery?: StringNullableFilter<"QueryAudit"> | string | null
    chartSpec?: JsonNullableFilter<"QueryAudit">
    filtersJson?: JsonNullableFilter<"QueryAudit">
    datasetsUsed?: StringNullableListFilter<"QueryAudit">
    rowsReturned?: IntNullableFilter<"QueryAudit"> | number | null
    latencyMs?: IntNullableFilter<"QueryAudit"> | number | null
    timestamp?: DateTimeFilter<"QueryAudit"> | Date | string
  }, "id">

  export type QueryAuditOrderByWithAggregationInput = {
    id?: SortOrder
    userType?: SortOrder
    nlQuery?: SortOrderInput | SortOrder
    compiledQuery?: SortOrderInput | SortOrder
    chartSpec?: SortOrderInput | SortOrder
    filtersJson?: SortOrderInput | SortOrder
    datasetsUsed?: SortOrder
    rowsReturned?: SortOrderInput | SortOrder
    latencyMs?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: QueryAuditCountOrderByAggregateInput
    _avg?: QueryAuditAvgOrderByAggregateInput
    _max?: QueryAuditMaxOrderByAggregateInput
    _min?: QueryAuditMinOrderByAggregateInput
    _sum?: QueryAuditSumOrderByAggregateInput
  }

  export type QueryAuditScalarWhereWithAggregatesInput = {
    AND?: QueryAuditScalarWhereWithAggregatesInput | QueryAuditScalarWhereWithAggregatesInput[]
    OR?: QueryAuditScalarWhereWithAggregatesInput[]
    NOT?: QueryAuditScalarWhereWithAggregatesInput | QueryAuditScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QueryAudit"> | string
    userType?: StringWithAggregatesFilter<"QueryAudit"> | string
    nlQuery?: StringNullableWithAggregatesFilter<"QueryAudit"> | string | null
    compiledQuery?: StringNullableWithAggregatesFilter<"QueryAudit"> | string | null
    chartSpec?: JsonNullableWithAggregatesFilter<"QueryAudit">
    filtersJson?: JsonNullableWithAggregatesFilter<"QueryAudit">
    datasetsUsed?: StringNullableListFilter<"QueryAudit">
    rowsReturned?: IntNullableWithAggregatesFilter<"QueryAudit"> | number | null
    latencyMs?: IntNullableWithAggregatesFilter<"QueryAudit"> | number | null
    timestamp?: DateTimeWithAggregatesFilter<"QueryAudit"> | Date | string
  }

  export type MunicipalityCreateInput = {
    id?: string
    name: string
    country?: string
    region: string
    locale?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetCreateNestedManyWithoutMunicipalityInput
    expenditures?: ExpenditureCreateNestedManyWithoutMunicipalityInput
    projects?: ProjectCreateNestedManyWithoutMunicipalityInput
    users?: UserCreateNestedManyWithoutMunicipalityInput
  }

  export type MunicipalityUncheckedCreateInput = {
    id?: string
    name: string
    country?: string
    region: string
    locale?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetUncheckedCreateNestedManyWithoutMunicipalityInput
    expenditures?: ExpenditureUncheckedCreateNestedManyWithoutMunicipalityInput
    projects?: ProjectUncheckedCreateNestedManyWithoutMunicipalityInput
    users?: UserUncheckedCreateNestedManyWithoutMunicipalityInput
  }

  export type MunicipalityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUpdateManyWithoutMunicipalityNestedInput
    expenditures?: ExpenditureUpdateManyWithoutMunicipalityNestedInput
    projects?: ProjectUpdateManyWithoutMunicipalityNestedInput
    users?: UserUpdateManyWithoutMunicipalityNestedInput
  }

  export type MunicipalityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUncheckedUpdateManyWithoutMunicipalityNestedInput
    expenditures?: ExpenditureUncheckedUpdateManyWithoutMunicipalityNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutMunicipalityNestedInput
    users?: UserUncheckedUpdateManyWithoutMunicipalityNestedInput
  }

  export type MunicipalityCreateManyInput = {
    id?: string
    name: string
    country?: string
    region: string
    locale?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MunicipalityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MunicipalityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FiscalYearCreateInput = {
    id?: string
    year: number
    status?: string
    lockedAt?: Date | string | null
    budgets?: BudgetCreateNestedManyWithoutFiscalYearInput
    expenditures?: ExpenditureCreateNestedManyWithoutFiscalYearInput
  }

  export type FiscalYearUncheckedCreateInput = {
    id?: string
    year: number
    status?: string
    lockedAt?: Date | string | null
    budgets?: BudgetUncheckedCreateNestedManyWithoutFiscalYearInput
    expenditures?: ExpenditureUncheckedCreateNestedManyWithoutFiscalYearInput
  }

  export type FiscalYearUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budgets?: BudgetUpdateManyWithoutFiscalYearNestedInput
    expenditures?: ExpenditureUpdateManyWithoutFiscalYearNestedInput
  }

  export type FiscalYearUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budgets?: BudgetUncheckedUpdateManyWithoutFiscalYearNestedInput
    expenditures?: ExpenditureUncheckedUpdateManyWithoutFiscalYearNestedInput
  }

  export type FiscalYearCreateManyInput = {
    id?: string
    year: number
    status?: string
    lockedAt?: Date | string | null
  }

  export type FiscalYearUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FiscalYearUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetCreateInput = {
    id?: string
    department: string
    program: string
    category: string
    subcategory: string
    amountPlanned: Decimal | DecimalJsLike | number | string
    currency?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    municipality: MunicipalityCreateNestedOneWithoutBudgetsInput
    fiscalYear: FiscalYearCreateNestedOneWithoutBudgetsInput
  }

  export type BudgetUncheckedCreateInput = {
    id?: string
    municipalityId: string
    fiscalYearId: string
    department: string
    program: string
    category: string
    subcategory: string
    amountPlanned: Decimal | DecimalJsLike | number | string
    currency?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BudgetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    amountPlanned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    municipality?: MunicipalityUpdateOneRequiredWithoutBudgetsNestedInput
    fiscalYear?: FiscalYearUpdateOneRequiredWithoutBudgetsNestedInput
  }

  export type BudgetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    fiscalYearId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    amountPlanned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetCreateManyInput = {
    id?: string
    municipalityId: string
    fiscalYearId: string
    department: string
    program: string
    category: string
    subcategory: string
    amountPlanned: Decimal | DecimalJsLike | number | string
    currency?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BudgetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    amountPlanned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    fiscalYearId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    amountPlanned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenditureCreateInput = {
    id?: string
    date: Date | string
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal | DecimalJsLike | number | string
    currency?: string
    procurementRef?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    municipality: MunicipalityCreateNestedOneWithoutExpendituresInput
    fiscalYear: FiscalYearCreateNestedOneWithoutExpendituresInput
    supplier?: SupplierCreateNestedOneWithoutExpendituresInput
  }

  export type ExpenditureUncheckedCreateInput = {
    id?: string
    municipalityId: string
    fiscalYearId: string
    date: Date | string
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal | DecimalJsLike | number | string
    currency?: string
    supplierId?: string | null
    procurementRef?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenditureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    municipality?: MunicipalityUpdateOneRequiredWithoutExpendituresNestedInput
    fiscalYear?: FiscalYearUpdateOneRequiredWithoutExpendituresNestedInput
    supplier?: SupplierUpdateOneWithoutExpendituresNestedInput
  }

  export type ExpenditureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    fiscalYearId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenditureCreateManyInput = {
    id?: string
    municipalityId: string
    fiscalYearId: string
    date: Date | string
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal | DecimalJsLike | number | string
    currency?: string
    supplierId?: string | null
    procurementRef?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenditureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenditureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    fiscalYearId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    title: string
    description: string
    status: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    department: string
    category: string
    requestedBudget?: Decimal | DecimalJsLike | number | string | null
    approvedBudget?: Decimal | DecimalJsLike | number | string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    municipality: MunicipalityCreateNestedOneWithoutProjectsInput
    fundingSource?: FundingSourceCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    municipalityId: string
    title: string
    description: string
    status: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    department: string
    category: string
    requestedBudget?: Decimal | DecimalJsLike | number | string | null
    approvedBudget?: Decimal | DecimalJsLike | number | string | null
    fundingSourceId?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requestedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    municipality?: MunicipalityUpdateOneRequiredWithoutProjectsNestedInput
    fundingSource?: FundingSourceUpdateOneWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requestedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fundingSourceId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateManyInput = {
    id?: string
    municipalityId: string
    title: string
    description: string
    status: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    department: string
    category: string
    requestedBudget?: Decimal | DecimalJsLike | number | string | null
    approvedBudget?: Decimal | DecimalJsLike | number | string | null
    fundingSourceId?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requestedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requestedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fundingSourceId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingSourceCreateInput = {
    id?: string
    name: string
    type: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutFundingSourceInput
  }

  export type FundingSourceUncheckedCreateInput = {
    id?: string
    name: string
    type: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutFundingSourceInput
  }

  export type FundingSourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutFundingSourceNestedInput
  }

  export type FundingSourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutFundingSourceNestedInput
  }

  export type FundingSourceCreateManyInput = {
    id?: string
    name: string
    type: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FundingSourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingSourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierCreateInput = {
    id?: string
    name: string
    taxId?: string | null
    sector?: string | null
    locality?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    expenditures?: ExpenditureCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUncheckedCreateInput = {
    id?: string
    name: string
    taxId?: string | null
    sector?: string | null
    locality?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    expenditures?: ExpenditureUncheckedCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenditures?: ExpenditureUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenditures?: ExpenditureUncheckedUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierCreateManyInput = {
    id?: string
    name: string
    taxId?: string | null
    sector?: string | null
    locality?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DatasetCreateInput = {
    id?: string
    name: string
    type: string
    sourceUri?: string | null
    refreshSchedule?: string | null
    schemaVersion?: string | null
    lastIngestedAt?: Date | string | null
    checksum?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ingestionRuns?: IngestionRunCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUncheckedCreateInput = {
    id?: string
    name: string
    type: string
    sourceUri?: string | null
    refreshSchedule?: string | null
    schemaVersion?: string | null
    lastIngestedAt?: Date | string | null
    checksum?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ingestionRuns?: IngestionRunUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sourceUri?: NullableStringFieldUpdateOperationsInput | string | null
    refreshSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    schemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    lastIngestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingestionRuns?: IngestionRunUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sourceUri?: NullableStringFieldUpdateOperationsInput | string | null
    refreshSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    schemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    lastIngestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingestionRuns?: IngestionRunUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetCreateManyInput = {
    id?: string
    name: string
    type: string
    sourceUri?: string | null
    refreshSchedule?: string | null
    schemaVersion?: string | null
    lastIngestedAt?: Date | string | null
    checksum?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DatasetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sourceUri?: NullableStringFieldUpdateOperationsInput | string | null
    refreshSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    schemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    lastIngestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DatasetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sourceUri?: NullableStringFieldUpdateOperationsInput | string | null
    refreshSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    schemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    lastIngestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngestionRunCreateInput = {
    id?: string
    status: string
    startedAt?: Date | string
    finishedAt?: Date | string | null
    rowsIngested?: number
    rowsInvalid?: number
    logUri?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dataset: DatasetCreateNestedOneWithoutIngestionRunsInput
  }

  export type IngestionRunUncheckedCreateInput = {
    id?: string
    datasetId: string
    status: string
    startedAt?: Date | string
    finishedAt?: Date | string | null
    rowsIngested?: number
    rowsInvalid?: number
    logUri?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IngestionRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rowsIngested?: IntFieldUpdateOperationsInput | number
    rowsInvalid?: IntFieldUpdateOperationsInput | number
    logUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: DatasetUpdateOneRequiredWithoutIngestionRunsNestedInput
  }

  export type IngestionRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rowsIngested?: IntFieldUpdateOperationsInput | number
    rowsInvalid?: IntFieldUpdateOperationsInput | number
    logUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngestionRunCreateManyInput = {
    id?: string
    datasetId: string
    status: string
    startedAt?: Date | string
    finishedAt?: Date | string | null
    rowsIngested?: number
    rowsInvalid?: number
    logUri?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IngestionRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rowsIngested?: IntFieldUpdateOperationsInput | number
    rowsInvalid?: IntFieldUpdateOperationsInput | number
    logUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngestionRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rowsIngested?: IntFieldUpdateOperationsInput | number
    rowsInvalid?: IntFieldUpdateOperationsInput | number
    logUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role: string
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    municipality?: MunicipalityCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role: string
    municipalityId?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    municipality?: MunicipalityUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    municipalityId?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    role: string
    municipalityId?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    municipalityId?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryAuditCreateInput = {
    id?: string
    userType: string
    nlQuery?: string | null
    compiledQuery?: string | null
    chartSpec?: NullableJsonNullValueInput | InputJsonValue
    filtersJson?: NullableJsonNullValueInput | InputJsonValue
    datasetsUsed?: QueryAuditCreatedatasetsUsedInput | string[]
    rowsReturned?: number | null
    latencyMs?: number | null
    timestamp?: Date | string
  }

  export type QueryAuditUncheckedCreateInput = {
    id?: string
    userType: string
    nlQuery?: string | null
    compiledQuery?: string | null
    chartSpec?: NullableJsonNullValueInput | InputJsonValue
    filtersJson?: NullableJsonNullValueInput | InputJsonValue
    datasetsUsed?: QueryAuditCreatedatasetsUsedInput | string[]
    rowsReturned?: number | null
    latencyMs?: number | null
    timestamp?: Date | string
  }

  export type QueryAuditUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userType?: StringFieldUpdateOperationsInput | string
    nlQuery?: NullableStringFieldUpdateOperationsInput | string | null
    compiledQuery?: NullableStringFieldUpdateOperationsInput | string | null
    chartSpec?: NullableJsonNullValueInput | InputJsonValue
    filtersJson?: NullableJsonNullValueInput | InputJsonValue
    datasetsUsed?: QueryAuditUpdatedatasetsUsedInput | string[]
    rowsReturned?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryAuditUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userType?: StringFieldUpdateOperationsInput | string
    nlQuery?: NullableStringFieldUpdateOperationsInput | string | null
    compiledQuery?: NullableStringFieldUpdateOperationsInput | string | null
    chartSpec?: NullableJsonNullValueInput | InputJsonValue
    filtersJson?: NullableJsonNullValueInput | InputJsonValue
    datasetsUsed?: QueryAuditUpdatedatasetsUsedInput | string[]
    rowsReturned?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryAuditCreateManyInput = {
    id?: string
    userType: string
    nlQuery?: string | null
    compiledQuery?: string | null
    chartSpec?: NullableJsonNullValueInput | InputJsonValue
    filtersJson?: NullableJsonNullValueInput | InputJsonValue
    datasetsUsed?: QueryAuditCreatedatasetsUsedInput | string[]
    rowsReturned?: number | null
    latencyMs?: number | null
    timestamp?: Date | string
  }

  export type QueryAuditUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userType?: StringFieldUpdateOperationsInput | string
    nlQuery?: NullableStringFieldUpdateOperationsInput | string | null
    compiledQuery?: NullableStringFieldUpdateOperationsInput | string | null
    chartSpec?: NullableJsonNullValueInput | InputJsonValue
    filtersJson?: NullableJsonNullValueInput | InputJsonValue
    datasetsUsed?: QueryAuditUpdatedatasetsUsedInput | string[]
    rowsReturned?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryAuditUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userType?: StringFieldUpdateOperationsInput | string
    nlQuery?: NullableStringFieldUpdateOperationsInput | string | null
    compiledQuery?: NullableStringFieldUpdateOperationsInput | string | null
    chartSpec?: NullableJsonNullValueInput | InputJsonValue
    filtersJson?: NullableJsonNullValueInput | InputJsonValue
    datasetsUsed?: QueryAuditUpdatedatasetsUsedInput | string[]
    rowsReturned?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BudgetListRelationFilter = {
    every?: BudgetWhereInput
    some?: BudgetWhereInput
    none?: BudgetWhereInput
  }

  export type ExpenditureListRelationFilter = {
    every?: ExpenditureWhereInput
    some?: ExpenditureWhereInput
    none?: ExpenditureWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type BudgetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpenditureOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MunicipalityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    region?: SortOrder
    locale?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MunicipalityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    region?: SortOrder
    locale?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MunicipalityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    country?: SortOrder
    region?: SortOrder
    locale?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FiscalYearCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    status?: SortOrder
    lockedAt?: SortOrder
  }

  export type FiscalYearAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type FiscalYearMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    status?: SortOrder
    lockedAt?: SortOrder
  }

  export type FiscalYearMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    status?: SortOrder
    lockedAt?: SortOrder
  }

  export type FiscalYearSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type MunicipalityRelationFilter = {
    is?: MunicipalityWhereInput
    isNot?: MunicipalityWhereInput
  }

  export type FiscalYearRelationFilter = {
    is?: FiscalYearWhereInput
    isNot?: FiscalYearWhereInput
  }

  export type BudgetCountOrderByAggregateInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    fiscalYearId?: SortOrder
    department?: SortOrder
    program?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    amountPlanned?: SortOrder
    currency?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BudgetAvgOrderByAggregateInput = {
    amountPlanned?: SortOrder
  }

  export type BudgetMaxOrderByAggregateInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    fiscalYearId?: SortOrder
    department?: SortOrder
    program?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    amountPlanned?: SortOrder
    currency?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BudgetMinOrderByAggregateInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    fiscalYearId?: SortOrder
    department?: SortOrder
    program?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    amountPlanned?: SortOrder
    currency?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BudgetSumOrderByAggregateInput = {
    amountPlanned?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type SupplierNullableRelationFilter = {
    is?: SupplierWhereInput | null
    isNot?: SupplierWhereInput | null
  }

  export type ExpenditureCountOrderByAggregateInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    fiscalYearId?: SortOrder
    date?: SortOrder
    department?: SortOrder
    program?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    concept?: SortOrder
    amountActual?: SortOrder
    currency?: SortOrder
    supplierId?: SortOrder
    procurementRef?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenditureAvgOrderByAggregateInput = {
    amountActual?: SortOrder
  }

  export type ExpenditureMaxOrderByAggregateInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    fiscalYearId?: SortOrder
    date?: SortOrder
    department?: SortOrder
    program?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    concept?: SortOrder
    amountActual?: SortOrder
    currency?: SortOrder
    supplierId?: SortOrder
    procurementRef?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenditureMinOrderByAggregateInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    fiscalYearId?: SortOrder
    date?: SortOrder
    department?: SortOrder
    program?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    concept?: SortOrder
    amountActual?: SortOrder
    currency?: SortOrder
    supplierId?: SortOrder
    procurementRef?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenditureSumOrderByAggregateInput = {
    amountActual?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type FundingSourceNullableRelationFilter = {
    is?: FundingSourceWhereInput | null
    isNot?: FundingSourceWhereInput | null
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    department?: SortOrder
    category?: SortOrder
    requestedBudget?: SortOrder
    approvedBudget?: SortOrder
    fundingSourceId?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    requestedBudget?: SortOrder
    approvedBudget?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    department?: SortOrder
    category?: SortOrder
    requestedBudget?: SortOrder
    approvedBudget?: SortOrder
    fundingSourceId?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    municipalityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    department?: SortOrder
    category?: SortOrder
    requestedBudget?: SortOrder
    approvedBudget?: SortOrder
    fundingSourceId?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    requestedBudget?: SortOrder
    approvedBudget?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type FundingSourceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FundingSourceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FundingSourceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    taxId?: SortOrder
    sector?: SortOrder
    locality?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    taxId?: SortOrder
    sector?: SortOrder
    locality?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    taxId?: SortOrder
    sector?: SortOrder
    locality?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IngestionRunListRelationFilter = {
    every?: IngestionRunWhereInput
    some?: IngestionRunWhereInput
    none?: IngestionRunWhereInput
  }

  export type IngestionRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DatasetCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    sourceUri?: SortOrder
    refreshSchedule?: SortOrder
    schemaVersion?: SortOrder
    lastIngestedAt?: SortOrder
    checksum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DatasetMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    sourceUri?: SortOrder
    refreshSchedule?: SortOrder
    schemaVersion?: SortOrder
    lastIngestedAt?: SortOrder
    checksum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DatasetMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    sourceUri?: SortOrder
    refreshSchedule?: SortOrder
    schemaVersion?: SortOrder
    lastIngestedAt?: SortOrder
    checksum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DatasetRelationFilter = {
    is?: DatasetWhereInput
    isNot?: DatasetWhereInput
  }

  export type IngestionRunCountOrderByAggregateInput = {
    id?: SortOrder
    datasetId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    rowsIngested?: SortOrder
    rowsInvalid?: SortOrder
    logUri?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IngestionRunAvgOrderByAggregateInput = {
    rowsIngested?: SortOrder
    rowsInvalid?: SortOrder
  }

  export type IngestionRunMaxOrderByAggregateInput = {
    id?: SortOrder
    datasetId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    rowsIngested?: SortOrder
    rowsInvalid?: SortOrder
    logUri?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IngestionRunMinOrderByAggregateInput = {
    id?: SortOrder
    datasetId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    rowsIngested?: SortOrder
    rowsInvalid?: SortOrder
    logUri?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IngestionRunSumOrderByAggregateInput = {
    rowsIngested?: SortOrder
    rowsInvalid?: SortOrder
  }

  export type MunicipalityNullableRelationFilter = {
    is?: MunicipalityWhereInput | null
    isNot?: MunicipalityWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    municipalityId?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    municipalityId?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    municipalityId?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type QueryAuditCountOrderByAggregateInput = {
    id?: SortOrder
    userType?: SortOrder
    nlQuery?: SortOrder
    compiledQuery?: SortOrder
    chartSpec?: SortOrder
    filtersJson?: SortOrder
    datasetsUsed?: SortOrder
    rowsReturned?: SortOrder
    latencyMs?: SortOrder
    timestamp?: SortOrder
  }

  export type QueryAuditAvgOrderByAggregateInput = {
    rowsReturned?: SortOrder
    latencyMs?: SortOrder
  }

  export type QueryAuditMaxOrderByAggregateInput = {
    id?: SortOrder
    userType?: SortOrder
    nlQuery?: SortOrder
    compiledQuery?: SortOrder
    rowsReturned?: SortOrder
    latencyMs?: SortOrder
    timestamp?: SortOrder
  }

  export type QueryAuditMinOrderByAggregateInput = {
    id?: SortOrder
    userType?: SortOrder
    nlQuery?: SortOrder
    compiledQuery?: SortOrder
    rowsReturned?: SortOrder
    latencyMs?: SortOrder
    timestamp?: SortOrder
  }

  export type QueryAuditSumOrderByAggregateInput = {
    rowsReturned?: SortOrder
    latencyMs?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BudgetCreateNestedManyWithoutMunicipalityInput = {
    create?: XOR<BudgetCreateWithoutMunicipalityInput, BudgetUncheckedCreateWithoutMunicipalityInput> | BudgetCreateWithoutMunicipalityInput[] | BudgetUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutMunicipalityInput | BudgetCreateOrConnectWithoutMunicipalityInput[]
    createMany?: BudgetCreateManyMunicipalityInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type ExpenditureCreateNestedManyWithoutMunicipalityInput = {
    create?: XOR<ExpenditureCreateWithoutMunicipalityInput, ExpenditureUncheckedCreateWithoutMunicipalityInput> | ExpenditureCreateWithoutMunicipalityInput[] | ExpenditureUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: ExpenditureCreateOrConnectWithoutMunicipalityInput | ExpenditureCreateOrConnectWithoutMunicipalityInput[]
    createMany?: ExpenditureCreateManyMunicipalityInputEnvelope
    connect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutMunicipalityInput = {
    create?: XOR<ProjectCreateWithoutMunicipalityInput, ProjectUncheckedCreateWithoutMunicipalityInput> | ProjectCreateWithoutMunicipalityInput[] | ProjectUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutMunicipalityInput | ProjectCreateOrConnectWithoutMunicipalityInput[]
    createMany?: ProjectCreateManyMunicipalityInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutMunicipalityInput = {
    create?: XOR<UserCreateWithoutMunicipalityInput, UserUncheckedCreateWithoutMunicipalityInput> | UserCreateWithoutMunicipalityInput[] | UserUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: UserCreateOrConnectWithoutMunicipalityInput | UserCreateOrConnectWithoutMunicipalityInput[]
    createMany?: UserCreateManyMunicipalityInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type BudgetUncheckedCreateNestedManyWithoutMunicipalityInput = {
    create?: XOR<BudgetCreateWithoutMunicipalityInput, BudgetUncheckedCreateWithoutMunicipalityInput> | BudgetCreateWithoutMunicipalityInput[] | BudgetUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutMunicipalityInput | BudgetCreateOrConnectWithoutMunicipalityInput[]
    createMany?: BudgetCreateManyMunicipalityInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type ExpenditureUncheckedCreateNestedManyWithoutMunicipalityInput = {
    create?: XOR<ExpenditureCreateWithoutMunicipalityInput, ExpenditureUncheckedCreateWithoutMunicipalityInput> | ExpenditureCreateWithoutMunicipalityInput[] | ExpenditureUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: ExpenditureCreateOrConnectWithoutMunicipalityInput | ExpenditureCreateOrConnectWithoutMunicipalityInput[]
    createMany?: ExpenditureCreateManyMunicipalityInputEnvelope
    connect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutMunicipalityInput = {
    create?: XOR<ProjectCreateWithoutMunicipalityInput, ProjectUncheckedCreateWithoutMunicipalityInput> | ProjectCreateWithoutMunicipalityInput[] | ProjectUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutMunicipalityInput | ProjectCreateOrConnectWithoutMunicipalityInput[]
    createMany?: ProjectCreateManyMunicipalityInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutMunicipalityInput = {
    create?: XOR<UserCreateWithoutMunicipalityInput, UserUncheckedCreateWithoutMunicipalityInput> | UserCreateWithoutMunicipalityInput[] | UserUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: UserCreateOrConnectWithoutMunicipalityInput | UserCreateOrConnectWithoutMunicipalityInput[]
    createMany?: UserCreateManyMunicipalityInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BudgetUpdateManyWithoutMunicipalityNestedInput = {
    create?: XOR<BudgetCreateWithoutMunicipalityInput, BudgetUncheckedCreateWithoutMunicipalityInput> | BudgetCreateWithoutMunicipalityInput[] | BudgetUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutMunicipalityInput | BudgetCreateOrConnectWithoutMunicipalityInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutMunicipalityInput | BudgetUpsertWithWhereUniqueWithoutMunicipalityInput[]
    createMany?: BudgetCreateManyMunicipalityInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutMunicipalityInput | BudgetUpdateWithWhereUniqueWithoutMunicipalityInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutMunicipalityInput | BudgetUpdateManyWithWhereWithoutMunicipalityInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type ExpenditureUpdateManyWithoutMunicipalityNestedInput = {
    create?: XOR<ExpenditureCreateWithoutMunicipalityInput, ExpenditureUncheckedCreateWithoutMunicipalityInput> | ExpenditureCreateWithoutMunicipalityInput[] | ExpenditureUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: ExpenditureCreateOrConnectWithoutMunicipalityInput | ExpenditureCreateOrConnectWithoutMunicipalityInput[]
    upsert?: ExpenditureUpsertWithWhereUniqueWithoutMunicipalityInput | ExpenditureUpsertWithWhereUniqueWithoutMunicipalityInput[]
    createMany?: ExpenditureCreateManyMunicipalityInputEnvelope
    set?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    disconnect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    delete?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    connect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    update?: ExpenditureUpdateWithWhereUniqueWithoutMunicipalityInput | ExpenditureUpdateWithWhereUniqueWithoutMunicipalityInput[]
    updateMany?: ExpenditureUpdateManyWithWhereWithoutMunicipalityInput | ExpenditureUpdateManyWithWhereWithoutMunicipalityInput[]
    deleteMany?: ExpenditureScalarWhereInput | ExpenditureScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutMunicipalityNestedInput = {
    create?: XOR<ProjectCreateWithoutMunicipalityInput, ProjectUncheckedCreateWithoutMunicipalityInput> | ProjectCreateWithoutMunicipalityInput[] | ProjectUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutMunicipalityInput | ProjectCreateOrConnectWithoutMunicipalityInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutMunicipalityInput | ProjectUpsertWithWhereUniqueWithoutMunicipalityInput[]
    createMany?: ProjectCreateManyMunicipalityInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutMunicipalityInput | ProjectUpdateWithWhereUniqueWithoutMunicipalityInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutMunicipalityInput | ProjectUpdateManyWithWhereWithoutMunicipalityInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserUpdateManyWithoutMunicipalityNestedInput = {
    create?: XOR<UserCreateWithoutMunicipalityInput, UserUncheckedCreateWithoutMunicipalityInput> | UserCreateWithoutMunicipalityInput[] | UserUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: UserCreateOrConnectWithoutMunicipalityInput | UserCreateOrConnectWithoutMunicipalityInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutMunicipalityInput | UserUpsertWithWhereUniqueWithoutMunicipalityInput[]
    createMany?: UserCreateManyMunicipalityInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutMunicipalityInput | UserUpdateWithWhereUniqueWithoutMunicipalityInput[]
    updateMany?: UserUpdateManyWithWhereWithoutMunicipalityInput | UserUpdateManyWithWhereWithoutMunicipalityInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type BudgetUncheckedUpdateManyWithoutMunicipalityNestedInput = {
    create?: XOR<BudgetCreateWithoutMunicipalityInput, BudgetUncheckedCreateWithoutMunicipalityInput> | BudgetCreateWithoutMunicipalityInput[] | BudgetUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutMunicipalityInput | BudgetCreateOrConnectWithoutMunicipalityInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutMunicipalityInput | BudgetUpsertWithWhereUniqueWithoutMunicipalityInput[]
    createMany?: BudgetCreateManyMunicipalityInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutMunicipalityInput | BudgetUpdateWithWhereUniqueWithoutMunicipalityInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutMunicipalityInput | BudgetUpdateManyWithWhereWithoutMunicipalityInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type ExpenditureUncheckedUpdateManyWithoutMunicipalityNestedInput = {
    create?: XOR<ExpenditureCreateWithoutMunicipalityInput, ExpenditureUncheckedCreateWithoutMunicipalityInput> | ExpenditureCreateWithoutMunicipalityInput[] | ExpenditureUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: ExpenditureCreateOrConnectWithoutMunicipalityInput | ExpenditureCreateOrConnectWithoutMunicipalityInput[]
    upsert?: ExpenditureUpsertWithWhereUniqueWithoutMunicipalityInput | ExpenditureUpsertWithWhereUniqueWithoutMunicipalityInput[]
    createMany?: ExpenditureCreateManyMunicipalityInputEnvelope
    set?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    disconnect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    delete?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    connect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    update?: ExpenditureUpdateWithWhereUniqueWithoutMunicipalityInput | ExpenditureUpdateWithWhereUniqueWithoutMunicipalityInput[]
    updateMany?: ExpenditureUpdateManyWithWhereWithoutMunicipalityInput | ExpenditureUpdateManyWithWhereWithoutMunicipalityInput[]
    deleteMany?: ExpenditureScalarWhereInput | ExpenditureScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutMunicipalityNestedInput = {
    create?: XOR<ProjectCreateWithoutMunicipalityInput, ProjectUncheckedCreateWithoutMunicipalityInput> | ProjectCreateWithoutMunicipalityInput[] | ProjectUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutMunicipalityInput | ProjectCreateOrConnectWithoutMunicipalityInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutMunicipalityInput | ProjectUpsertWithWhereUniqueWithoutMunicipalityInput[]
    createMany?: ProjectCreateManyMunicipalityInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutMunicipalityInput | ProjectUpdateWithWhereUniqueWithoutMunicipalityInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutMunicipalityInput | ProjectUpdateManyWithWhereWithoutMunicipalityInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutMunicipalityNestedInput = {
    create?: XOR<UserCreateWithoutMunicipalityInput, UserUncheckedCreateWithoutMunicipalityInput> | UserCreateWithoutMunicipalityInput[] | UserUncheckedCreateWithoutMunicipalityInput[]
    connectOrCreate?: UserCreateOrConnectWithoutMunicipalityInput | UserCreateOrConnectWithoutMunicipalityInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutMunicipalityInput | UserUpsertWithWhereUniqueWithoutMunicipalityInput[]
    createMany?: UserCreateManyMunicipalityInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutMunicipalityInput | UserUpdateWithWhereUniqueWithoutMunicipalityInput[]
    updateMany?: UserUpdateManyWithWhereWithoutMunicipalityInput | UserUpdateManyWithWhereWithoutMunicipalityInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type BudgetCreateNestedManyWithoutFiscalYearInput = {
    create?: XOR<BudgetCreateWithoutFiscalYearInput, BudgetUncheckedCreateWithoutFiscalYearInput> | BudgetCreateWithoutFiscalYearInput[] | BudgetUncheckedCreateWithoutFiscalYearInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutFiscalYearInput | BudgetCreateOrConnectWithoutFiscalYearInput[]
    createMany?: BudgetCreateManyFiscalYearInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type ExpenditureCreateNestedManyWithoutFiscalYearInput = {
    create?: XOR<ExpenditureCreateWithoutFiscalYearInput, ExpenditureUncheckedCreateWithoutFiscalYearInput> | ExpenditureCreateWithoutFiscalYearInput[] | ExpenditureUncheckedCreateWithoutFiscalYearInput[]
    connectOrCreate?: ExpenditureCreateOrConnectWithoutFiscalYearInput | ExpenditureCreateOrConnectWithoutFiscalYearInput[]
    createMany?: ExpenditureCreateManyFiscalYearInputEnvelope
    connect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
  }

  export type BudgetUncheckedCreateNestedManyWithoutFiscalYearInput = {
    create?: XOR<BudgetCreateWithoutFiscalYearInput, BudgetUncheckedCreateWithoutFiscalYearInput> | BudgetCreateWithoutFiscalYearInput[] | BudgetUncheckedCreateWithoutFiscalYearInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutFiscalYearInput | BudgetCreateOrConnectWithoutFiscalYearInput[]
    createMany?: BudgetCreateManyFiscalYearInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type ExpenditureUncheckedCreateNestedManyWithoutFiscalYearInput = {
    create?: XOR<ExpenditureCreateWithoutFiscalYearInput, ExpenditureUncheckedCreateWithoutFiscalYearInput> | ExpenditureCreateWithoutFiscalYearInput[] | ExpenditureUncheckedCreateWithoutFiscalYearInput[]
    connectOrCreate?: ExpenditureCreateOrConnectWithoutFiscalYearInput | ExpenditureCreateOrConnectWithoutFiscalYearInput[]
    createMany?: ExpenditureCreateManyFiscalYearInputEnvelope
    connect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BudgetUpdateManyWithoutFiscalYearNestedInput = {
    create?: XOR<BudgetCreateWithoutFiscalYearInput, BudgetUncheckedCreateWithoutFiscalYearInput> | BudgetCreateWithoutFiscalYearInput[] | BudgetUncheckedCreateWithoutFiscalYearInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutFiscalYearInput | BudgetCreateOrConnectWithoutFiscalYearInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutFiscalYearInput | BudgetUpsertWithWhereUniqueWithoutFiscalYearInput[]
    createMany?: BudgetCreateManyFiscalYearInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutFiscalYearInput | BudgetUpdateWithWhereUniqueWithoutFiscalYearInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutFiscalYearInput | BudgetUpdateManyWithWhereWithoutFiscalYearInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type ExpenditureUpdateManyWithoutFiscalYearNestedInput = {
    create?: XOR<ExpenditureCreateWithoutFiscalYearInput, ExpenditureUncheckedCreateWithoutFiscalYearInput> | ExpenditureCreateWithoutFiscalYearInput[] | ExpenditureUncheckedCreateWithoutFiscalYearInput[]
    connectOrCreate?: ExpenditureCreateOrConnectWithoutFiscalYearInput | ExpenditureCreateOrConnectWithoutFiscalYearInput[]
    upsert?: ExpenditureUpsertWithWhereUniqueWithoutFiscalYearInput | ExpenditureUpsertWithWhereUniqueWithoutFiscalYearInput[]
    createMany?: ExpenditureCreateManyFiscalYearInputEnvelope
    set?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    disconnect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    delete?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    connect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    update?: ExpenditureUpdateWithWhereUniqueWithoutFiscalYearInput | ExpenditureUpdateWithWhereUniqueWithoutFiscalYearInput[]
    updateMany?: ExpenditureUpdateManyWithWhereWithoutFiscalYearInput | ExpenditureUpdateManyWithWhereWithoutFiscalYearInput[]
    deleteMany?: ExpenditureScalarWhereInput | ExpenditureScalarWhereInput[]
  }

  export type BudgetUncheckedUpdateManyWithoutFiscalYearNestedInput = {
    create?: XOR<BudgetCreateWithoutFiscalYearInput, BudgetUncheckedCreateWithoutFiscalYearInput> | BudgetCreateWithoutFiscalYearInput[] | BudgetUncheckedCreateWithoutFiscalYearInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutFiscalYearInput | BudgetCreateOrConnectWithoutFiscalYearInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutFiscalYearInput | BudgetUpsertWithWhereUniqueWithoutFiscalYearInput[]
    createMany?: BudgetCreateManyFiscalYearInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutFiscalYearInput | BudgetUpdateWithWhereUniqueWithoutFiscalYearInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutFiscalYearInput | BudgetUpdateManyWithWhereWithoutFiscalYearInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type ExpenditureUncheckedUpdateManyWithoutFiscalYearNestedInput = {
    create?: XOR<ExpenditureCreateWithoutFiscalYearInput, ExpenditureUncheckedCreateWithoutFiscalYearInput> | ExpenditureCreateWithoutFiscalYearInput[] | ExpenditureUncheckedCreateWithoutFiscalYearInput[]
    connectOrCreate?: ExpenditureCreateOrConnectWithoutFiscalYearInput | ExpenditureCreateOrConnectWithoutFiscalYearInput[]
    upsert?: ExpenditureUpsertWithWhereUniqueWithoutFiscalYearInput | ExpenditureUpsertWithWhereUniqueWithoutFiscalYearInput[]
    createMany?: ExpenditureCreateManyFiscalYearInputEnvelope
    set?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    disconnect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    delete?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    connect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    update?: ExpenditureUpdateWithWhereUniqueWithoutFiscalYearInput | ExpenditureUpdateWithWhereUniqueWithoutFiscalYearInput[]
    updateMany?: ExpenditureUpdateManyWithWhereWithoutFiscalYearInput | ExpenditureUpdateManyWithWhereWithoutFiscalYearInput[]
    deleteMany?: ExpenditureScalarWhereInput | ExpenditureScalarWhereInput[]
  }

  export type MunicipalityCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<MunicipalityCreateWithoutBudgetsInput, MunicipalityUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: MunicipalityCreateOrConnectWithoutBudgetsInput
    connect?: MunicipalityWhereUniqueInput
  }

  export type FiscalYearCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<FiscalYearCreateWithoutBudgetsInput, FiscalYearUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: FiscalYearCreateOrConnectWithoutBudgetsInput
    connect?: FiscalYearWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MunicipalityUpdateOneRequiredWithoutBudgetsNestedInput = {
    create?: XOR<MunicipalityCreateWithoutBudgetsInput, MunicipalityUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: MunicipalityCreateOrConnectWithoutBudgetsInput
    upsert?: MunicipalityUpsertWithoutBudgetsInput
    connect?: MunicipalityWhereUniqueInput
    update?: XOR<XOR<MunicipalityUpdateToOneWithWhereWithoutBudgetsInput, MunicipalityUpdateWithoutBudgetsInput>, MunicipalityUncheckedUpdateWithoutBudgetsInput>
  }

  export type FiscalYearUpdateOneRequiredWithoutBudgetsNestedInput = {
    create?: XOR<FiscalYearCreateWithoutBudgetsInput, FiscalYearUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: FiscalYearCreateOrConnectWithoutBudgetsInput
    upsert?: FiscalYearUpsertWithoutBudgetsInput
    connect?: FiscalYearWhereUniqueInput
    update?: XOR<XOR<FiscalYearUpdateToOneWithWhereWithoutBudgetsInput, FiscalYearUpdateWithoutBudgetsInput>, FiscalYearUncheckedUpdateWithoutBudgetsInput>
  }

  export type MunicipalityCreateNestedOneWithoutExpendituresInput = {
    create?: XOR<MunicipalityCreateWithoutExpendituresInput, MunicipalityUncheckedCreateWithoutExpendituresInput>
    connectOrCreate?: MunicipalityCreateOrConnectWithoutExpendituresInput
    connect?: MunicipalityWhereUniqueInput
  }

  export type FiscalYearCreateNestedOneWithoutExpendituresInput = {
    create?: XOR<FiscalYearCreateWithoutExpendituresInput, FiscalYearUncheckedCreateWithoutExpendituresInput>
    connectOrCreate?: FiscalYearCreateOrConnectWithoutExpendituresInput
    connect?: FiscalYearWhereUniqueInput
  }

  export type SupplierCreateNestedOneWithoutExpendituresInput = {
    create?: XOR<SupplierCreateWithoutExpendituresInput, SupplierUncheckedCreateWithoutExpendituresInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutExpendituresInput
    connect?: SupplierWhereUniqueInput
  }

  export type MunicipalityUpdateOneRequiredWithoutExpendituresNestedInput = {
    create?: XOR<MunicipalityCreateWithoutExpendituresInput, MunicipalityUncheckedCreateWithoutExpendituresInput>
    connectOrCreate?: MunicipalityCreateOrConnectWithoutExpendituresInput
    upsert?: MunicipalityUpsertWithoutExpendituresInput
    connect?: MunicipalityWhereUniqueInput
    update?: XOR<XOR<MunicipalityUpdateToOneWithWhereWithoutExpendituresInput, MunicipalityUpdateWithoutExpendituresInput>, MunicipalityUncheckedUpdateWithoutExpendituresInput>
  }

  export type FiscalYearUpdateOneRequiredWithoutExpendituresNestedInput = {
    create?: XOR<FiscalYearCreateWithoutExpendituresInput, FiscalYearUncheckedCreateWithoutExpendituresInput>
    connectOrCreate?: FiscalYearCreateOrConnectWithoutExpendituresInput
    upsert?: FiscalYearUpsertWithoutExpendituresInput
    connect?: FiscalYearWhereUniqueInput
    update?: XOR<XOR<FiscalYearUpdateToOneWithWhereWithoutExpendituresInput, FiscalYearUpdateWithoutExpendituresInput>, FiscalYearUncheckedUpdateWithoutExpendituresInput>
  }

  export type SupplierUpdateOneWithoutExpendituresNestedInput = {
    create?: XOR<SupplierCreateWithoutExpendituresInput, SupplierUncheckedCreateWithoutExpendituresInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutExpendituresInput
    upsert?: SupplierUpsertWithoutExpendituresInput
    disconnect?: SupplierWhereInput | boolean
    delete?: SupplierWhereInput | boolean
    connect?: SupplierWhereUniqueInput
    update?: XOR<XOR<SupplierUpdateToOneWithWhereWithoutExpendituresInput, SupplierUpdateWithoutExpendituresInput>, SupplierUncheckedUpdateWithoutExpendituresInput>
  }

  export type MunicipalityCreateNestedOneWithoutProjectsInput = {
    create?: XOR<MunicipalityCreateWithoutProjectsInput, MunicipalityUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: MunicipalityCreateOrConnectWithoutProjectsInput
    connect?: MunicipalityWhereUniqueInput
  }

  export type FundingSourceCreateNestedOneWithoutProjectsInput = {
    create?: XOR<FundingSourceCreateWithoutProjectsInput, FundingSourceUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: FundingSourceCreateOrConnectWithoutProjectsInput
    connect?: FundingSourceWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type MunicipalityUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<MunicipalityCreateWithoutProjectsInput, MunicipalityUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: MunicipalityCreateOrConnectWithoutProjectsInput
    upsert?: MunicipalityUpsertWithoutProjectsInput
    connect?: MunicipalityWhereUniqueInput
    update?: XOR<XOR<MunicipalityUpdateToOneWithWhereWithoutProjectsInput, MunicipalityUpdateWithoutProjectsInput>, MunicipalityUncheckedUpdateWithoutProjectsInput>
  }

  export type FundingSourceUpdateOneWithoutProjectsNestedInput = {
    create?: XOR<FundingSourceCreateWithoutProjectsInput, FundingSourceUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: FundingSourceCreateOrConnectWithoutProjectsInput
    upsert?: FundingSourceUpsertWithoutProjectsInput
    disconnect?: FundingSourceWhereInput | boolean
    delete?: FundingSourceWhereInput | boolean
    connect?: FundingSourceWhereUniqueInput
    update?: XOR<XOR<FundingSourceUpdateToOneWithWhereWithoutProjectsInput, FundingSourceUpdateWithoutProjectsInput>, FundingSourceUncheckedUpdateWithoutProjectsInput>
  }

  export type ProjectCreateNestedManyWithoutFundingSourceInput = {
    create?: XOR<ProjectCreateWithoutFundingSourceInput, ProjectUncheckedCreateWithoutFundingSourceInput> | ProjectCreateWithoutFundingSourceInput[] | ProjectUncheckedCreateWithoutFundingSourceInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutFundingSourceInput | ProjectCreateOrConnectWithoutFundingSourceInput[]
    createMany?: ProjectCreateManyFundingSourceInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutFundingSourceInput = {
    create?: XOR<ProjectCreateWithoutFundingSourceInput, ProjectUncheckedCreateWithoutFundingSourceInput> | ProjectCreateWithoutFundingSourceInput[] | ProjectUncheckedCreateWithoutFundingSourceInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutFundingSourceInput | ProjectCreateOrConnectWithoutFundingSourceInput[]
    createMany?: ProjectCreateManyFundingSourceInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUpdateManyWithoutFundingSourceNestedInput = {
    create?: XOR<ProjectCreateWithoutFundingSourceInput, ProjectUncheckedCreateWithoutFundingSourceInput> | ProjectCreateWithoutFundingSourceInput[] | ProjectUncheckedCreateWithoutFundingSourceInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutFundingSourceInput | ProjectCreateOrConnectWithoutFundingSourceInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutFundingSourceInput | ProjectUpsertWithWhereUniqueWithoutFundingSourceInput[]
    createMany?: ProjectCreateManyFundingSourceInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutFundingSourceInput | ProjectUpdateWithWhereUniqueWithoutFundingSourceInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutFundingSourceInput | ProjectUpdateManyWithWhereWithoutFundingSourceInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutFundingSourceNestedInput = {
    create?: XOR<ProjectCreateWithoutFundingSourceInput, ProjectUncheckedCreateWithoutFundingSourceInput> | ProjectCreateWithoutFundingSourceInput[] | ProjectUncheckedCreateWithoutFundingSourceInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutFundingSourceInput | ProjectCreateOrConnectWithoutFundingSourceInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutFundingSourceInput | ProjectUpsertWithWhereUniqueWithoutFundingSourceInput[]
    createMany?: ProjectCreateManyFundingSourceInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutFundingSourceInput | ProjectUpdateWithWhereUniqueWithoutFundingSourceInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutFundingSourceInput | ProjectUpdateManyWithWhereWithoutFundingSourceInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ExpenditureCreateNestedManyWithoutSupplierInput = {
    create?: XOR<ExpenditureCreateWithoutSupplierInput, ExpenditureUncheckedCreateWithoutSupplierInput> | ExpenditureCreateWithoutSupplierInput[] | ExpenditureUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: ExpenditureCreateOrConnectWithoutSupplierInput | ExpenditureCreateOrConnectWithoutSupplierInput[]
    createMany?: ExpenditureCreateManySupplierInputEnvelope
    connect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
  }

  export type ExpenditureUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: XOR<ExpenditureCreateWithoutSupplierInput, ExpenditureUncheckedCreateWithoutSupplierInput> | ExpenditureCreateWithoutSupplierInput[] | ExpenditureUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: ExpenditureCreateOrConnectWithoutSupplierInput | ExpenditureCreateOrConnectWithoutSupplierInput[]
    createMany?: ExpenditureCreateManySupplierInputEnvelope
    connect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
  }

  export type ExpenditureUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<ExpenditureCreateWithoutSupplierInput, ExpenditureUncheckedCreateWithoutSupplierInput> | ExpenditureCreateWithoutSupplierInput[] | ExpenditureUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: ExpenditureCreateOrConnectWithoutSupplierInput | ExpenditureCreateOrConnectWithoutSupplierInput[]
    upsert?: ExpenditureUpsertWithWhereUniqueWithoutSupplierInput | ExpenditureUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: ExpenditureCreateManySupplierInputEnvelope
    set?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    disconnect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    delete?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    connect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    update?: ExpenditureUpdateWithWhereUniqueWithoutSupplierInput | ExpenditureUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: ExpenditureUpdateManyWithWhereWithoutSupplierInput | ExpenditureUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: ExpenditureScalarWhereInput | ExpenditureScalarWhereInput[]
  }

  export type ExpenditureUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<ExpenditureCreateWithoutSupplierInput, ExpenditureUncheckedCreateWithoutSupplierInput> | ExpenditureCreateWithoutSupplierInput[] | ExpenditureUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: ExpenditureCreateOrConnectWithoutSupplierInput | ExpenditureCreateOrConnectWithoutSupplierInput[]
    upsert?: ExpenditureUpsertWithWhereUniqueWithoutSupplierInput | ExpenditureUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: ExpenditureCreateManySupplierInputEnvelope
    set?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    disconnect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    delete?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    connect?: ExpenditureWhereUniqueInput | ExpenditureWhereUniqueInput[]
    update?: ExpenditureUpdateWithWhereUniqueWithoutSupplierInput | ExpenditureUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: ExpenditureUpdateManyWithWhereWithoutSupplierInput | ExpenditureUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: ExpenditureScalarWhereInput | ExpenditureScalarWhereInput[]
  }

  export type IngestionRunCreateNestedManyWithoutDatasetInput = {
    create?: XOR<IngestionRunCreateWithoutDatasetInput, IngestionRunUncheckedCreateWithoutDatasetInput> | IngestionRunCreateWithoutDatasetInput[] | IngestionRunUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: IngestionRunCreateOrConnectWithoutDatasetInput | IngestionRunCreateOrConnectWithoutDatasetInput[]
    createMany?: IngestionRunCreateManyDatasetInputEnvelope
    connect?: IngestionRunWhereUniqueInput | IngestionRunWhereUniqueInput[]
  }

  export type IngestionRunUncheckedCreateNestedManyWithoutDatasetInput = {
    create?: XOR<IngestionRunCreateWithoutDatasetInput, IngestionRunUncheckedCreateWithoutDatasetInput> | IngestionRunCreateWithoutDatasetInput[] | IngestionRunUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: IngestionRunCreateOrConnectWithoutDatasetInput | IngestionRunCreateOrConnectWithoutDatasetInput[]
    createMany?: IngestionRunCreateManyDatasetInputEnvelope
    connect?: IngestionRunWhereUniqueInput | IngestionRunWhereUniqueInput[]
  }

  export type IngestionRunUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<IngestionRunCreateWithoutDatasetInput, IngestionRunUncheckedCreateWithoutDatasetInput> | IngestionRunCreateWithoutDatasetInput[] | IngestionRunUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: IngestionRunCreateOrConnectWithoutDatasetInput | IngestionRunCreateOrConnectWithoutDatasetInput[]
    upsert?: IngestionRunUpsertWithWhereUniqueWithoutDatasetInput | IngestionRunUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: IngestionRunCreateManyDatasetInputEnvelope
    set?: IngestionRunWhereUniqueInput | IngestionRunWhereUniqueInput[]
    disconnect?: IngestionRunWhereUniqueInput | IngestionRunWhereUniqueInput[]
    delete?: IngestionRunWhereUniqueInput | IngestionRunWhereUniqueInput[]
    connect?: IngestionRunWhereUniqueInput | IngestionRunWhereUniqueInput[]
    update?: IngestionRunUpdateWithWhereUniqueWithoutDatasetInput | IngestionRunUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: IngestionRunUpdateManyWithWhereWithoutDatasetInput | IngestionRunUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: IngestionRunScalarWhereInput | IngestionRunScalarWhereInput[]
  }

  export type IngestionRunUncheckedUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<IngestionRunCreateWithoutDatasetInput, IngestionRunUncheckedCreateWithoutDatasetInput> | IngestionRunCreateWithoutDatasetInput[] | IngestionRunUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: IngestionRunCreateOrConnectWithoutDatasetInput | IngestionRunCreateOrConnectWithoutDatasetInput[]
    upsert?: IngestionRunUpsertWithWhereUniqueWithoutDatasetInput | IngestionRunUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: IngestionRunCreateManyDatasetInputEnvelope
    set?: IngestionRunWhereUniqueInput | IngestionRunWhereUniqueInput[]
    disconnect?: IngestionRunWhereUniqueInput | IngestionRunWhereUniqueInput[]
    delete?: IngestionRunWhereUniqueInput | IngestionRunWhereUniqueInput[]
    connect?: IngestionRunWhereUniqueInput | IngestionRunWhereUniqueInput[]
    update?: IngestionRunUpdateWithWhereUniqueWithoutDatasetInput | IngestionRunUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: IngestionRunUpdateManyWithWhereWithoutDatasetInput | IngestionRunUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: IngestionRunScalarWhereInput | IngestionRunScalarWhereInput[]
  }

  export type DatasetCreateNestedOneWithoutIngestionRunsInput = {
    create?: XOR<DatasetCreateWithoutIngestionRunsInput, DatasetUncheckedCreateWithoutIngestionRunsInput>
    connectOrCreate?: DatasetCreateOrConnectWithoutIngestionRunsInput
    connect?: DatasetWhereUniqueInput
  }

  export type DatasetUpdateOneRequiredWithoutIngestionRunsNestedInput = {
    create?: XOR<DatasetCreateWithoutIngestionRunsInput, DatasetUncheckedCreateWithoutIngestionRunsInput>
    connectOrCreate?: DatasetCreateOrConnectWithoutIngestionRunsInput
    upsert?: DatasetUpsertWithoutIngestionRunsInput
    connect?: DatasetWhereUniqueInput
    update?: XOR<XOR<DatasetUpdateToOneWithWhereWithoutIngestionRunsInput, DatasetUpdateWithoutIngestionRunsInput>, DatasetUncheckedUpdateWithoutIngestionRunsInput>
  }

  export type MunicipalityCreateNestedOneWithoutUsersInput = {
    create?: XOR<MunicipalityCreateWithoutUsersInput, MunicipalityUncheckedCreateWithoutUsersInput>
    connectOrCreate?: MunicipalityCreateOrConnectWithoutUsersInput
    connect?: MunicipalityWhereUniqueInput
  }

  export type MunicipalityUpdateOneWithoutUsersNestedInput = {
    create?: XOR<MunicipalityCreateWithoutUsersInput, MunicipalityUncheckedCreateWithoutUsersInput>
    connectOrCreate?: MunicipalityCreateOrConnectWithoutUsersInput
    upsert?: MunicipalityUpsertWithoutUsersInput
    disconnect?: MunicipalityWhereInput | boolean
    delete?: MunicipalityWhereInput | boolean
    connect?: MunicipalityWhereUniqueInput
    update?: XOR<XOR<MunicipalityUpdateToOneWithWhereWithoutUsersInput, MunicipalityUpdateWithoutUsersInput>, MunicipalityUncheckedUpdateWithoutUsersInput>
  }

  export type QueryAuditCreatedatasetsUsedInput = {
    set: string[]
  }

  export type QueryAuditUpdatedatasetsUsedInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BudgetCreateWithoutMunicipalityInput = {
    id?: string
    department: string
    program: string
    category: string
    subcategory: string
    amountPlanned: Decimal | DecimalJsLike | number | string
    currency?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalYear: FiscalYearCreateNestedOneWithoutBudgetsInput
  }

  export type BudgetUncheckedCreateWithoutMunicipalityInput = {
    id?: string
    fiscalYearId: string
    department: string
    program: string
    category: string
    subcategory: string
    amountPlanned: Decimal | DecimalJsLike | number | string
    currency?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BudgetCreateOrConnectWithoutMunicipalityInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutMunicipalityInput, BudgetUncheckedCreateWithoutMunicipalityInput>
  }

  export type BudgetCreateManyMunicipalityInputEnvelope = {
    data: BudgetCreateManyMunicipalityInput | BudgetCreateManyMunicipalityInput[]
    skipDuplicates?: boolean
  }

  export type ExpenditureCreateWithoutMunicipalityInput = {
    id?: string
    date: Date | string
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal | DecimalJsLike | number | string
    currency?: string
    procurementRef?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalYear: FiscalYearCreateNestedOneWithoutExpendituresInput
    supplier?: SupplierCreateNestedOneWithoutExpendituresInput
  }

  export type ExpenditureUncheckedCreateWithoutMunicipalityInput = {
    id?: string
    fiscalYearId: string
    date: Date | string
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal | DecimalJsLike | number | string
    currency?: string
    supplierId?: string | null
    procurementRef?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenditureCreateOrConnectWithoutMunicipalityInput = {
    where: ExpenditureWhereUniqueInput
    create: XOR<ExpenditureCreateWithoutMunicipalityInput, ExpenditureUncheckedCreateWithoutMunicipalityInput>
  }

  export type ExpenditureCreateManyMunicipalityInputEnvelope = {
    data: ExpenditureCreateManyMunicipalityInput | ExpenditureCreateManyMunicipalityInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutMunicipalityInput = {
    id?: string
    title: string
    description: string
    status: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    department: string
    category: string
    requestedBudget?: Decimal | DecimalJsLike | number | string | null
    approvedBudget?: Decimal | DecimalJsLike | number | string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fundingSource?: FundingSourceCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutMunicipalityInput = {
    id?: string
    title: string
    description: string
    status: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    department: string
    category: string
    requestedBudget?: Decimal | DecimalJsLike | number | string | null
    approvedBudget?: Decimal | DecimalJsLike | number | string | null
    fundingSourceId?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateOrConnectWithoutMunicipalityInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutMunicipalityInput, ProjectUncheckedCreateWithoutMunicipalityInput>
  }

  export type ProjectCreateManyMunicipalityInputEnvelope = {
    data: ProjectCreateManyMunicipalityInput | ProjectCreateManyMunicipalityInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutMunicipalityInput = {
    id?: string
    email: string
    passwordHash: string
    role: string
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutMunicipalityInput = {
    id?: string
    email: string
    passwordHash: string
    role: string
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutMunicipalityInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMunicipalityInput, UserUncheckedCreateWithoutMunicipalityInput>
  }

  export type UserCreateManyMunicipalityInputEnvelope = {
    data: UserCreateManyMunicipalityInput | UserCreateManyMunicipalityInput[]
    skipDuplicates?: boolean
  }

  export type BudgetUpsertWithWhereUniqueWithoutMunicipalityInput = {
    where: BudgetWhereUniqueInput
    update: XOR<BudgetUpdateWithoutMunicipalityInput, BudgetUncheckedUpdateWithoutMunicipalityInput>
    create: XOR<BudgetCreateWithoutMunicipalityInput, BudgetUncheckedCreateWithoutMunicipalityInput>
  }

  export type BudgetUpdateWithWhereUniqueWithoutMunicipalityInput = {
    where: BudgetWhereUniqueInput
    data: XOR<BudgetUpdateWithoutMunicipalityInput, BudgetUncheckedUpdateWithoutMunicipalityInput>
  }

  export type BudgetUpdateManyWithWhereWithoutMunicipalityInput = {
    where: BudgetScalarWhereInput
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyWithoutMunicipalityInput>
  }

  export type BudgetScalarWhereInput = {
    AND?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
    OR?: BudgetScalarWhereInput[]
    NOT?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
    id?: StringFilter<"Budget"> | string
    municipalityId?: StringFilter<"Budget"> | string
    fiscalYearId?: StringFilter<"Budget"> | string
    department?: StringFilter<"Budget"> | string
    program?: StringFilter<"Budget"> | string
    category?: StringFilter<"Budget"> | string
    subcategory?: StringFilter<"Budget"> | string
    amountPlanned?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Budget"> | string
    notes?: StringNullableFilter<"Budget"> | string | null
    createdAt?: DateTimeFilter<"Budget"> | Date | string
    updatedAt?: DateTimeFilter<"Budget"> | Date | string
  }

  export type ExpenditureUpsertWithWhereUniqueWithoutMunicipalityInput = {
    where: ExpenditureWhereUniqueInput
    update: XOR<ExpenditureUpdateWithoutMunicipalityInput, ExpenditureUncheckedUpdateWithoutMunicipalityInput>
    create: XOR<ExpenditureCreateWithoutMunicipalityInput, ExpenditureUncheckedCreateWithoutMunicipalityInput>
  }

  export type ExpenditureUpdateWithWhereUniqueWithoutMunicipalityInput = {
    where: ExpenditureWhereUniqueInput
    data: XOR<ExpenditureUpdateWithoutMunicipalityInput, ExpenditureUncheckedUpdateWithoutMunicipalityInput>
  }

  export type ExpenditureUpdateManyWithWhereWithoutMunicipalityInput = {
    where: ExpenditureScalarWhereInput
    data: XOR<ExpenditureUpdateManyMutationInput, ExpenditureUncheckedUpdateManyWithoutMunicipalityInput>
  }

  export type ExpenditureScalarWhereInput = {
    AND?: ExpenditureScalarWhereInput | ExpenditureScalarWhereInput[]
    OR?: ExpenditureScalarWhereInput[]
    NOT?: ExpenditureScalarWhereInput | ExpenditureScalarWhereInput[]
    id?: StringFilter<"Expenditure"> | string
    municipalityId?: StringFilter<"Expenditure"> | string
    fiscalYearId?: StringFilter<"Expenditure"> | string
    date?: DateTimeFilter<"Expenditure"> | Date | string
    department?: StringFilter<"Expenditure"> | string
    program?: StringFilter<"Expenditure"> | string
    category?: StringFilter<"Expenditure"> | string
    subcategory?: StringFilter<"Expenditure"> | string
    concept?: StringFilter<"Expenditure"> | string
    amountActual?: DecimalFilter<"Expenditure"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Expenditure"> | string
    supplierId?: StringNullableFilter<"Expenditure"> | string | null
    procurementRef?: StringNullableFilter<"Expenditure"> | string | null
    location?: StringNullableFilter<"Expenditure"> | string | null
    createdAt?: DateTimeFilter<"Expenditure"> | Date | string
    updatedAt?: DateTimeFilter<"Expenditure"> | Date | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutMunicipalityInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutMunicipalityInput, ProjectUncheckedUpdateWithoutMunicipalityInput>
    create: XOR<ProjectCreateWithoutMunicipalityInput, ProjectUncheckedCreateWithoutMunicipalityInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutMunicipalityInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutMunicipalityInput, ProjectUncheckedUpdateWithoutMunicipalityInput>
  }

  export type ProjectUpdateManyWithWhereWithoutMunicipalityInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutMunicipalityInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    municipalityId?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    status?: StringFilter<"Project"> | string
    startDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    department?: StringFilter<"Project"> | string
    category?: StringFilter<"Project"> | string
    requestedBudget?: DecimalNullableFilter<"Project"> | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: DecimalNullableFilter<"Project"> | Decimal | DecimalJsLike | number | string | null
    fundingSourceId?: StringNullableFilter<"Project"> | string | null
    location?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type UserUpsertWithWhereUniqueWithoutMunicipalityInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutMunicipalityInput, UserUncheckedUpdateWithoutMunicipalityInput>
    create: XOR<UserCreateWithoutMunicipalityInput, UserUncheckedCreateWithoutMunicipalityInput>
  }

  export type UserUpdateWithWhereUniqueWithoutMunicipalityInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutMunicipalityInput, UserUncheckedUpdateWithoutMunicipalityInput>
  }

  export type UserUpdateManyWithWhereWithoutMunicipalityInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutMunicipalityInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    municipalityId?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type BudgetCreateWithoutFiscalYearInput = {
    id?: string
    department: string
    program: string
    category: string
    subcategory: string
    amountPlanned: Decimal | DecimalJsLike | number | string
    currency?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    municipality: MunicipalityCreateNestedOneWithoutBudgetsInput
  }

  export type BudgetUncheckedCreateWithoutFiscalYearInput = {
    id?: string
    municipalityId: string
    department: string
    program: string
    category: string
    subcategory: string
    amountPlanned: Decimal | DecimalJsLike | number | string
    currency?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BudgetCreateOrConnectWithoutFiscalYearInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutFiscalYearInput, BudgetUncheckedCreateWithoutFiscalYearInput>
  }

  export type BudgetCreateManyFiscalYearInputEnvelope = {
    data: BudgetCreateManyFiscalYearInput | BudgetCreateManyFiscalYearInput[]
    skipDuplicates?: boolean
  }

  export type ExpenditureCreateWithoutFiscalYearInput = {
    id?: string
    date: Date | string
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal | DecimalJsLike | number | string
    currency?: string
    procurementRef?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    municipality: MunicipalityCreateNestedOneWithoutExpendituresInput
    supplier?: SupplierCreateNestedOneWithoutExpendituresInput
  }

  export type ExpenditureUncheckedCreateWithoutFiscalYearInput = {
    id?: string
    municipalityId: string
    date: Date | string
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal | DecimalJsLike | number | string
    currency?: string
    supplierId?: string | null
    procurementRef?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenditureCreateOrConnectWithoutFiscalYearInput = {
    where: ExpenditureWhereUniqueInput
    create: XOR<ExpenditureCreateWithoutFiscalYearInput, ExpenditureUncheckedCreateWithoutFiscalYearInput>
  }

  export type ExpenditureCreateManyFiscalYearInputEnvelope = {
    data: ExpenditureCreateManyFiscalYearInput | ExpenditureCreateManyFiscalYearInput[]
    skipDuplicates?: boolean
  }

  export type BudgetUpsertWithWhereUniqueWithoutFiscalYearInput = {
    where: BudgetWhereUniqueInput
    update: XOR<BudgetUpdateWithoutFiscalYearInput, BudgetUncheckedUpdateWithoutFiscalYearInput>
    create: XOR<BudgetCreateWithoutFiscalYearInput, BudgetUncheckedCreateWithoutFiscalYearInput>
  }

  export type BudgetUpdateWithWhereUniqueWithoutFiscalYearInput = {
    where: BudgetWhereUniqueInput
    data: XOR<BudgetUpdateWithoutFiscalYearInput, BudgetUncheckedUpdateWithoutFiscalYearInput>
  }

  export type BudgetUpdateManyWithWhereWithoutFiscalYearInput = {
    where: BudgetScalarWhereInput
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyWithoutFiscalYearInput>
  }

  export type ExpenditureUpsertWithWhereUniqueWithoutFiscalYearInput = {
    where: ExpenditureWhereUniqueInput
    update: XOR<ExpenditureUpdateWithoutFiscalYearInput, ExpenditureUncheckedUpdateWithoutFiscalYearInput>
    create: XOR<ExpenditureCreateWithoutFiscalYearInput, ExpenditureUncheckedCreateWithoutFiscalYearInput>
  }

  export type ExpenditureUpdateWithWhereUniqueWithoutFiscalYearInput = {
    where: ExpenditureWhereUniqueInput
    data: XOR<ExpenditureUpdateWithoutFiscalYearInput, ExpenditureUncheckedUpdateWithoutFiscalYearInput>
  }

  export type ExpenditureUpdateManyWithWhereWithoutFiscalYearInput = {
    where: ExpenditureScalarWhereInput
    data: XOR<ExpenditureUpdateManyMutationInput, ExpenditureUncheckedUpdateManyWithoutFiscalYearInput>
  }

  export type MunicipalityCreateWithoutBudgetsInput = {
    id?: string
    name: string
    country?: string
    region: string
    locale?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    expenditures?: ExpenditureCreateNestedManyWithoutMunicipalityInput
    projects?: ProjectCreateNestedManyWithoutMunicipalityInput
    users?: UserCreateNestedManyWithoutMunicipalityInput
  }

  export type MunicipalityUncheckedCreateWithoutBudgetsInput = {
    id?: string
    name: string
    country?: string
    region: string
    locale?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    expenditures?: ExpenditureUncheckedCreateNestedManyWithoutMunicipalityInput
    projects?: ProjectUncheckedCreateNestedManyWithoutMunicipalityInput
    users?: UserUncheckedCreateNestedManyWithoutMunicipalityInput
  }

  export type MunicipalityCreateOrConnectWithoutBudgetsInput = {
    where: MunicipalityWhereUniqueInput
    create: XOR<MunicipalityCreateWithoutBudgetsInput, MunicipalityUncheckedCreateWithoutBudgetsInput>
  }

  export type FiscalYearCreateWithoutBudgetsInput = {
    id?: string
    year: number
    status?: string
    lockedAt?: Date | string | null
    expenditures?: ExpenditureCreateNestedManyWithoutFiscalYearInput
  }

  export type FiscalYearUncheckedCreateWithoutBudgetsInput = {
    id?: string
    year: number
    status?: string
    lockedAt?: Date | string | null
    expenditures?: ExpenditureUncheckedCreateNestedManyWithoutFiscalYearInput
  }

  export type FiscalYearCreateOrConnectWithoutBudgetsInput = {
    where: FiscalYearWhereUniqueInput
    create: XOR<FiscalYearCreateWithoutBudgetsInput, FiscalYearUncheckedCreateWithoutBudgetsInput>
  }

  export type MunicipalityUpsertWithoutBudgetsInput = {
    update: XOR<MunicipalityUpdateWithoutBudgetsInput, MunicipalityUncheckedUpdateWithoutBudgetsInput>
    create: XOR<MunicipalityCreateWithoutBudgetsInput, MunicipalityUncheckedCreateWithoutBudgetsInput>
    where?: MunicipalityWhereInput
  }

  export type MunicipalityUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: MunicipalityWhereInput
    data: XOR<MunicipalityUpdateWithoutBudgetsInput, MunicipalityUncheckedUpdateWithoutBudgetsInput>
  }

  export type MunicipalityUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenditures?: ExpenditureUpdateManyWithoutMunicipalityNestedInput
    projects?: ProjectUpdateManyWithoutMunicipalityNestedInput
    users?: UserUpdateManyWithoutMunicipalityNestedInput
  }

  export type MunicipalityUncheckedUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenditures?: ExpenditureUncheckedUpdateManyWithoutMunicipalityNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutMunicipalityNestedInput
    users?: UserUncheckedUpdateManyWithoutMunicipalityNestedInput
  }

  export type FiscalYearUpsertWithoutBudgetsInput = {
    update: XOR<FiscalYearUpdateWithoutBudgetsInput, FiscalYearUncheckedUpdateWithoutBudgetsInput>
    create: XOR<FiscalYearCreateWithoutBudgetsInput, FiscalYearUncheckedCreateWithoutBudgetsInput>
    where?: FiscalYearWhereInput
  }

  export type FiscalYearUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: FiscalYearWhereInput
    data: XOR<FiscalYearUpdateWithoutBudgetsInput, FiscalYearUncheckedUpdateWithoutBudgetsInput>
  }

  export type FiscalYearUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expenditures?: ExpenditureUpdateManyWithoutFiscalYearNestedInput
  }

  export type FiscalYearUncheckedUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expenditures?: ExpenditureUncheckedUpdateManyWithoutFiscalYearNestedInput
  }

  export type MunicipalityCreateWithoutExpendituresInput = {
    id?: string
    name: string
    country?: string
    region: string
    locale?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetCreateNestedManyWithoutMunicipalityInput
    projects?: ProjectCreateNestedManyWithoutMunicipalityInput
    users?: UserCreateNestedManyWithoutMunicipalityInput
  }

  export type MunicipalityUncheckedCreateWithoutExpendituresInput = {
    id?: string
    name: string
    country?: string
    region: string
    locale?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetUncheckedCreateNestedManyWithoutMunicipalityInput
    projects?: ProjectUncheckedCreateNestedManyWithoutMunicipalityInput
    users?: UserUncheckedCreateNestedManyWithoutMunicipalityInput
  }

  export type MunicipalityCreateOrConnectWithoutExpendituresInput = {
    where: MunicipalityWhereUniqueInput
    create: XOR<MunicipalityCreateWithoutExpendituresInput, MunicipalityUncheckedCreateWithoutExpendituresInput>
  }

  export type FiscalYearCreateWithoutExpendituresInput = {
    id?: string
    year: number
    status?: string
    lockedAt?: Date | string | null
    budgets?: BudgetCreateNestedManyWithoutFiscalYearInput
  }

  export type FiscalYearUncheckedCreateWithoutExpendituresInput = {
    id?: string
    year: number
    status?: string
    lockedAt?: Date | string | null
    budgets?: BudgetUncheckedCreateNestedManyWithoutFiscalYearInput
  }

  export type FiscalYearCreateOrConnectWithoutExpendituresInput = {
    where: FiscalYearWhereUniqueInput
    create: XOR<FiscalYearCreateWithoutExpendituresInput, FiscalYearUncheckedCreateWithoutExpendituresInput>
  }

  export type SupplierCreateWithoutExpendituresInput = {
    id?: string
    name: string
    taxId?: string | null
    sector?: string | null
    locality?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierUncheckedCreateWithoutExpendituresInput = {
    id?: string
    name: string
    taxId?: string | null
    sector?: string | null
    locality?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierCreateOrConnectWithoutExpendituresInput = {
    where: SupplierWhereUniqueInput
    create: XOR<SupplierCreateWithoutExpendituresInput, SupplierUncheckedCreateWithoutExpendituresInput>
  }

  export type MunicipalityUpsertWithoutExpendituresInput = {
    update: XOR<MunicipalityUpdateWithoutExpendituresInput, MunicipalityUncheckedUpdateWithoutExpendituresInput>
    create: XOR<MunicipalityCreateWithoutExpendituresInput, MunicipalityUncheckedCreateWithoutExpendituresInput>
    where?: MunicipalityWhereInput
  }

  export type MunicipalityUpdateToOneWithWhereWithoutExpendituresInput = {
    where?: MunicipalityWhereInput
    data: XOR<MunicipalityUpdateWithoutExpendituresInput, MunicipalityUncheckedUpdateWithoutExpendituresInput>
  }

  export type MunicipalityUpdateWithoutExpendituresInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUpdateManyWithoutMunicipalityNestedInput
    projects?: ProjectUpdateManyWithoutMunicipalityNestedInput
    users?: UserUpdateManyWithoutMunicipalityNestedInput
  }

  export type MunicipalityUncheckedUpdateWithoutExpendituresInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUncheckedUpdateManyWithoutMunicipalityNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutMunicipalityNestedInput
    users?: UserUncheckedUpdateManyWithoutMunicipalityNestedInput
  }

  export type FiscalYearUpsertWithoutExpendituresInput = {
    update: XOR<FiscalYearUpdateWithoutExpendituresInput, FiscalYearUncheckedUpdateWithoutExpendituresInput>
    create: XOR<FiscalYearCreateWithoutExpendituresInput, FiscalYearUncheckedCreateWithoutExpendituresInput>
    where?: FiscalYearWhereInput
  }

  export type FiscalYearUpdateToOneWithWhereWithoutExpendituresInput = {
    where?: FiscalYearWhereInput
    data: XOR<FiscalYearUpdateWithoutExpendituresInput, FiscalYearUncheckedUpdateWithoutExpendituresInput>
  }

  export type FiscalYearUpdateWithoutExpendituresInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budgets?: BudgetUpdateManyWithoutFiscalYearNestedInput
  }

  export type FiscalYearUncheckedUpdateWithoutExpendituresInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budgets?: BudgetUncheckedUpdateManyWithoutFiscalYearNestedInput
  }

  export type SupplierUpsertWithoutExpendituresInput = {
    update: XOR<SupplierUpdateWithoutExpendituresInput, SupplierUncheckedUpdateWithoutExpendituresInput>
    create: XOR<SupplierCreateWithoutExpendituresInput, SupplierUncheckedCreateWithoutExpendituresInput>
    where?: SupplierWhereInput
  }

  export type SupplierUpdateToOneWithWhereWithoutExpendituresInput = {
    where?: SupplierWhereInput
    data: XOR<SupplierUpdateWithoutExpendituresInput, SupplierUncheckedUpdateWithoutExpendituresInput>
  }

  export type SupplierUpdateWithoutExpendituresInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateWithoutExpendituresInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    taxId?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MunicipalityCreateWithoutProjectsInput = {
    id?: string
    name: string
    country?: string
    region: string
    locale?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetCreateNestedManyWithoutMunicipalityInput
    expenditures?: ExpenditureCreateNestedManyWithoutMunicipalityInput
    users?: UserCreateNestedManyWithoutMunicipalityInput
  }

  export type MunicipalityUncheckedCreateWithoutProjectsInput = {
    id?: string
    name: string
    country?: string
    region: string
    locale?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetUncheckedCreateNestedManyWithoutMunicipalityInput
    expenditures?: ExpenditureUncheckedCreateNestedManyWithoutMunicipalityInput
    users?: UserUncheckedCreateNestedManyWithoutMunicipalityInput
  }

  export type MunicipalityCreateOrConnectWithoutProjectsInput = {
    where: MunicipalityWhereUniqueInput
    create: XOR<MunicipalityCreateWithoutProjectsInput, MunicipalityUncheckedCreateWithoutProjectsInput>
  }

  export type FundingSourceCreateWithoutProjectsInput = {
    id?: string
    name: string
    type: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FundingSourceUncheckedCreateWithoutProjectsInput = {
    id?: string
    name: string
    type: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FundingSourceCreateOrConnectWithoutProjectsInput = {
    where: FundingSourceWhereUniqueInput
    create: XOR<FundingSourceCreateWithoutProjectsInput, FundingSourceUncheckedCreateWithoutProjectsInput>
  }

  export type MunicipalityUpsertWithoutProjectsInput = {
    update: XOR<MunicipalityUpdateWithoutProjectsInput, MunicipalityUncheckedUpdateWithoutProjectsInput>
    create: XOR<MunicipalityCreateWithoutProjectsInput, MunicipalityUncheckedCreateWithoutProjectsInput>
    where?: MunicipalityWhereInput
  }

  export type MunicipalityUpdateToOneWithWhereWithoutProjectsInput = {
    where?: MunicipalityWhereInput
    data: XOR<MunicipalityUpdateWithoutProjectsInput, MunicipalityUncheckedUpdateWithoutProjectsInput>
  }

  export type MunicipalityUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUpdateManyWithoutMunicipalityNestedInput
    expenditures?: ExpenditureUpdateManyWithoutMunicipalityNestedInput
    users?: UserUpdateManyWithoutMunicipalityNestedInput
  }

  export type MunicipalityUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUncheckedUpdateManyWithoutMunicipalityNestedInput
    expenditures?: ExpenditureUncheckedUpdateManyWithoutMunicipalityNestedInput
    users?: UserUncheckedUpdateManyWithoutMunicipalityNestedInput
  }

  export type FundingSourceUpsertWithoutProjectsInput = {
    update: XOR<FundingSourceUpdateWithoutProjectsInput, FundingSourceUncheckedUpdateWithoutProjectsInput>
    create: XOR<FundingSourceCreateWithoutProjectsInput, FundingSourceUncheckedCreateWithoutProjectsInput>
    where?: FundingSourceWhereInput
  }

  export type FundingSourceUpdateToOneWithWhereWithoutProjectsInput = {
    where?: FundingSourceWhereInput
    data: XOR<FundingSourceUpdateWithoutProjectsInput, FundingSourceUncheckedUpdateWithoutProjectsInput>
  }

  export type FundingSourceUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingSourceUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateWithoutFundingSourceInput = {
    id?: string
    title: string
    description: string
    status: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    department: string
    category: string
    requestedBudget?: Decimal | DecimalJsLike | number | string | null
    approvedBudget?: Decimal | DecimalJsLike | number | string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    municipality: MunicipalityCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutFundingSourceInput = {
    id?: string
    municipalityId: string
    title: string
    description: string
    status: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    department: string
    category: string
    requestedBudget?: Decimal | DecimalJsLike | number | string | null
    approvedBudget?: Decimal | DecimalJsLike | number | string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateOrConnectWithoutFundingSourceInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutFundingSourceInput, ProjectUncheckedCreateWithoutFundingSourceInput>
  }

  export type ProjectCreateManyFundingSourceInputEnvelope = {
    data: ProjectCreateManyFundingSourceInput | ProjectCreateManyFundingSourceInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithWhereUniqueWithoutFundingSourceInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutFundingSourceInput, ProjectUncheckedUpdateWithoutFundingSourceInput>
    create: XOR<ProjectCreateWithoutFundingSourceInput, ProjectUncheckedCreateWithoutFundingSourceInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutFundingSourceInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutFundingSourceInput, ProjectUncheckedUpdateWithoutFundingSourceInput>
  }

  export type ProjectUpdateManyWithWhereWithoutFundingSourceInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutFundingSourceInput>
  }

  export type ExpenditureCreateWithoutSupplierInput = {
    id?: string
    date: Date | string
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal | DecimalJsLike | number | string
    currency?: string
    procurementRef?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    municipality: MunicipalityCreateNestedOneWithoutExpendituresInput
    fiscalYear: FiscalYearCreateNestedOneWithoutExpendituresInput
  }

  export type ExpenditureUncheckedCreateWithoutSupplierInput = {
    id?: string
    municipalityId: string
    fiscalYearId: string
    date: Date | string
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal | DecimalJsLike | number | string
    currency?: string
    procurementRef?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenditureCreateOrConnectWithoutSupplierInput = {
    where: ExpenditureWhereUniqueInput
    create: XOR<ExpenditureCreateWithoutSupplierInput, ExpenditureUncheckedCreateWithoutSupplierInput>
  }

  export type ExpenditureCreateManySupplierInputEnvelope = {
    data: ExpenditureCreateManySupplierInput | ExpenditureCreateManySupplierInput[]
    skipDuplicates?: boolean
  }

  export type ExpenditureUpsertWithWhereUniqueWithoutSupplierInput = {
    where: ExpenditureWhereUniqueInput
    update: XOR<ExpenditureUpdateWithoutSupplierInput, ExpenditureUncheckedUpdateWithoutSupplierInput>
    create: XOR<ExpenditureCreateWithoutSupplierInput, ExpenditureUncheckedCreateWithoutSupplierInput>
  }

  export type ExpenditureUpdateWithWhereUniqueWithoutSupplierInput = {
    where: ExpenditureWhereUniqueInput
    data: XOR<ExpenditureUpdateWithoutSupplierInput, ExpenditureUncheckedUpdateWithoutSupplierInput>
  }

  export type ExpenditureUpdateManyWithWhereWithoutSupplierInput = {
    where: ExpenditureScalarWhereInput
    data: XOR<ExpenditureUpdateManyMutationInput, ExpenditureUncheckedUpdateManyWithoutSupplierInput>
  }

  export type IngestionRunCreateWithoutDatasetInput = {
    id?: string
    status: string
    startedAt?: Date | string
    finishedAt?: Date | string | null
    rowsIngested?: number
    rowsInvalid?: number
    logUri?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IngestionRunUncheckedCreateWithoutDatasetInput = {
    id?: string
    status: string
    startedAt?: Date | string
    finishedAt?: Date | string | null
    rowsIngested?: number
    rowsInvalid?: number
    logUri?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IngestionRunCreateOrConnectWithoutDatasetInput = {
    where: IngestionRunWhereUniqueInput
    create: XOR<IngestionRunCreateWithoutDatasetInput, IngestionRunUncheckedCreateWithoutDatasetInput>
  }

  export type IngestionRunCreateManyDatasetInputEnvelope = {
    data: IngestionRunCreateManyDatasetInput | IngestionRunCreateManyDatasetInput[]
    skipDuplicates?: boolean
  }

  export type IngestionRunUpsertWithWhereUniqueWithoutDatasetInput = {
    where: IngestionRunWhereUniqueInput
    update: XOR<IngestionRunUpdateWithoutDatasetInput, IngestionRunUncheckedUpdateWithoutDatasetInput>
    create: XOR<IngestionRunCreateWithoutDatasetInput, IngestionRunUncheckedCreateWithoutDatasetInput>
  }

  export type IngestionRunUpdateWithWhereUniqueWithoutDatasetInput = {
    where: IngestionRunWhereUniqueInput
    data: XOR<IngestionRunUpdateWithoutDatasetInput, IngestionRunUncheckedUpdateWithoutDatasetInput>
  }

  export type IngestionRunUpdateManyWithWhereWithoutDatasetInput = {
    where: IngestionRunScalarWhereInput
    data: XOR<IngestionRunUpdateManyMutationInput, IngestionRunUncheckedUpdateManyWithoutDatasetInput>
  }

  export type IngestionRunScalarWhereInput = {
    AND?: IngestionRunScalarWhereInput | IngestionRunScalarWhereInput[]
    OR?: IngestionRunScalarWhereInput[]
    NOT?: IngestionRunScalarWhereInput | IngestionRunScalarWhereInput[]
    id?: StringFilter<"IngestionRun"> | string
    datasetId?: StringFilter<"IngestionRun"> | string
    status?: StringFilter<"IngestionRun"> | string
    startedAt?: DateTimeFilter<"IngestionRun"> | Date | string
    finishedAt?: DateTimeNullableFilter<"IngestionRun"> | Date | string | null
    rowsIngested?: IntFilter<"IngestionRun"> | number
    rowsInvalid?: IntFilter<"IngestionRun"> | number
    logUri?: StringNullableFilter<"IngestionRun"> | string | null
    createdAt?: DateTimeFilter<"IngestionRun"> | Date | string
    updatedAt?: DateTimeFilter<"IngestionRun"> | Date | string
  }

  export type DatasetCreateWithoutIngestionRunsInput = {
    id?: string
    name: string
    type: string
    sourceUri?: string | null
    refreshSchedule?: string | null
    schemaVersion?: string | null
    lastIngestedAt?: Date | string | null
    checksum?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DatasetUncheckedCreateWithoutIngestionRunsInput = {
    id?: string
    name: string
    type: string
    sourceUri?: string | null
    refreshSchedule?: string | null
    schemaVersion?: string | null
    lastIngestedAt?: Date | string | null
    checksum?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DatasetCreateOrConnectWithoutIngestionRunsInput = {
    where: DatasetWhereUniqueInput
    create: XOR<DatasetCreateWithoutIngestionRunsInput, DatasetUncheckedCreateWithoutIngestionRunsInput>
  }

  export type DatasetUpsertWithoutIngestionRunsInput = {
    update: XOR<DatasetUpdateWithoutIngestionRunsInput, DatasetUncheckedUpdateWithoutIngestionRunsInput>
    create: XOR<DatasetCreateWithoutIngestionRunsInput, DatasetUncheckedCreateWithoutIngestionRunsInput>
    where?: DatasetWhereInput
  }

  export type DatasetUpdateToOneWithWhereWithoutIngestionRunsInput = {
    where?: DatasetWhereInput
    data: XOR<DatasetUpdateWithoutIngestionRunsInput, DatasetUncheckedUpdateWithoutIngestionRunsInput>
  }

  export type DatasetUpdateWithoutIngestionRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sourceUri?: NullableStringFieldUpdateOperationsInput | string | null
    refreshSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    schemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    lastIngestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DatasetUncheckedUpdateWithoutIngestionRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sourceUri?: NullableStringFieldUpdateOperationsInput | string | null
    refreshSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    schemaVersion?: NullableStringFieldUpdateOperationsInput | string | null
    lastIngestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MunicipalityCreateWithoutUsersInput = {
    id?: string
    name: string
    country?: string
    region: string
    locale?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetCreateNestedManyWithoutMunicipalityInput
    expenditures?: ExpenditureCreateNestedManyWithoutMunicipalityInput
    projects?: ProjectCreateNestedManyWithoutMunicipalityInput
  }

  export type MunicipalityUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    country?: string
    region: string
    locale?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgets?: BudgetUncheckedCreateNestedManyWithoutMunicipalityInput
    expenditures?: ExpenditureUncheckedCreateNestedManyWithoutMunicipalityInput
    projects?: ProjectUncheckedCreateNestedManyWithoutMunicipalityInput
  }

  export type MunicipalityCreateOrConnectWithoutUsersInput = {
    where: MunicipalityWhereUniqueInput
    create: XOR<MunicipalityCreateWithoutUsersInput, MunicipalityUncheckedCreateWithoutUsersInput>
  }

  export type MunicipalityUpsertWithoutUsersInput = {
    update: XOR<MunicipalityUpdateWithoutUsersInput, MunicipalityUncheckedUpdateWithoutUsersInput>
    create: XOR<MunicipalityCreateWithoutUsersInput, MunicipalityUncheckedCreateWithoutUsersInput>
    where?: MunicipalityWhereInput
  }

  export type MunicipalityUpdateToOneWithWhereWithoutUsersInput = {
    where?: MunicipalityWhereInput
    data: XOR<MunicipalityUpdateWithoutUsersInput, MunicipalityUncheckedUpdateWithoutUsersInput>
  }

  export type MunicipalityUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUpdateManyWithoutMunicipalityNestedInput
    expenditures?: ExpenditureUpdateManyWithoutMunicipalityNestedInput
    projects?: ProjectUpdateManyWithoutMunicipalityNestedInput
  }

  export type MunicipalityUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgets?: BudgetUncheckedUpdateManyWithoutMunicipalityNestedInput
    expenditures?: ExpenditureUncheckedUpdateManyWithoutMunicipalityNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutMunicipalityNestedInput
  }

  export type BudgetCreateManyMunicipalityInput = {
    id?: string
    fiscalYearId: string
    department: string
    program: string
    category: string
    subcategory: string
    amountPlanned: Decimal | DecimalJsLike | number | string
    currency?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenditureCreateManyMunicipalityInput = {
    id?: string
    fiscalYearId: string
    date: Date | string
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal | DecimalJsLike | number | string
    currency?: string
    supplierId?: string | null
    procurementRef?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateManyMunicipalityInput = {
    id?: string
    title: string
    description: string
    status: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    department: string
    category: string
    requestedBudget?: Decimal | DecimalJsLike | number | string | null
    approvedBudget?: Decimal | DecimalJsLike | number | string | null
    fundingSourceId?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateManyMunicipalityInput = {
    id?: string
    email: string
    passwordHash: string
    role: string
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BudgetUpdateWithoutMunicipalityInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    amountPlanned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalYear?: FiscalYearUpdateOneRequiredWithoutBudgetsNestedInput
  }

  export type BudgetUncheckedUpdateWithoutMunicipalityInput = {
    id?: StringFieldUpdateOperationsInput | string
    fiscalYearId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    amountPlanned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetUncheckedUpdateManyWithoutMunicipalityInput = {
    id?: StringFieldUpdateOperationsInput | string
    fiscalYearId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    amountPlanned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenditureUpdateWithoutMunicipalityInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalYear?: FiscalYearUpdateOneRequiredWithoutExpendituresNestedInput
    supplier?: SupplierUpdateOneWithoutExpendituresNestedInput
  }

  export type ExpenditureUncheckedUpdateWithoutMunicipalityInput = {
    id?: StringFieldUpdateOperationsInput | string
    fiscalYearId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenditureUncheckedUpdateManyWithoutMunicipalityInput = {
    id?: StringFieldUpdateOperationsInput | string
    fiscalYearId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutMunicipalityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requestedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fundingSource?: FundingSourceUpdateOneWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutMunicipalityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requestedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fundingSourceId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyWithoutMunicipalityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requestedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fundingSourceId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutMunicipalityInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutMunicipalityInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyWithoutMunicipalityInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetCreateManyFiscalYearInput = {
    id?: string
    municipalityId: string
    department: string
    program: string
    category: string
    subcategory: string
    amountPlanned: Decimal | DecimalJsLike | number | string
    currency?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenditureCreateManyFiscalYearInput = {
    id?: string
    municipalityId: string
    date: Date | string
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal | DecimalJsLike | number | string
    currency?: string
    supplierId?: string | null
    procurementRef?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BudgetUpdateWithoutFiscalYearInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    amountPlanned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    municipality?: MunicipalityUpdateOneRequiredWithoutBudgetsNestedInput
  }

  export type BudgetUncheckedUpdateWithoutFiscalYearInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    amountPlanned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetUncheckedUpdateManyWithoutFiscalYearInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    amountPlanned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenditureUpdateWithoutFiscalYearInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    municipality?: MunicipalityUpdateOneRequiredWithoutExpendituresNestedInput
    supplier?: SupplierUpdateOneWithoutExpendituresNestedInput
  }

  export type ExpenditureUncheckedUpdateWithoutFiscalYearInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenditureUncheckedUpdateManyWithoutFiscalYearInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateManyFundingSourceInput = {
    id?: string
    municipalityId: string
    title: string
    description: string
    status: string
    startDate?: Date | string | null
    endDate?: Date | string | null
    department: string
    category: string
    requestedBudget?: Decimal | DecimalJsLike | number | string | null
    approvedBudget?: Decimal | DecimalJsLike | number | string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateWithoutFundingSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requestedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    municipality?: MunicipalityUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutFundingSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requestedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyWithoutFundingSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    requestedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenditureCreateManySupplierInput = {
    id?: string
    municipalityId: string
    fiscalYearId: string
    date: Date | string
    department: string
    program: string
    category: string
    subcategory: string
    concept: string
    amountActual: Decimal | DecimalJsLike | number | string
    currency?: string
    procurementRef?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenditureUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    municipality?: MunicipalityUpdateOneRequiredWithoutExpendituresNestedInput
    fiscalYear?: FiscalYearUpdateOneRequiredWithoutExpendituresNestedInput
  }

  export type ExpenditureUncheckedUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    fiscalYearId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenditureUncheckedUpdateManyWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    municipalityId?: StringFieldUpdateOperationsInput | string
    fiscalYearId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    concept?: StringFieldUpdateOperationsInput | string
    amountActual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    procurementRef?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngestionRunCreateManyDatasetInput = {
    id?: string
    status: string
    startedAt?: Date | string
    finishedAt?: Date | string | null
    rowsIngested?: number
    rowsInvalid?: number
    logUri?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IngestionRunUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rowsIngested?: IntFieldUpdateOperationsInput | number
    rowsInvalid?: IntFieldUpdateOperationsInput | number
    logUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngestionRunUncheckedUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rowsIngested?: IntFieldUpdateOperationsInput | number
    rowsInvalid?: IntFieldUpdateOperationsInput | number
    logUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngestionRunUncheckedUpdateManyWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rowsIngested?: IntFieldUpdateOperationsInput | number
    rowsInvalid?: IntFieldUpdateOperationsInput | number
    logUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use MunicipalityCountOutputTypeDefaultArgs instead
     */
    export type MunicipalityCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MunicipalityCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FiscalYearCountOutputTypeDefaultArgs instead
     */
    export type FiscalYearCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FiscalYearCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FundingSourceCountOutputTypeDefaultArgs instead
     */
    export type FundingSourceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FundingSourceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupplierCountOutputTypeDefaultArgs instead
     */
    export type SupplierCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupplierCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DatasetCountOutputTypeDefaultArgs instead
     */
    export type DatasetCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DatasetCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MunicipalityDefaultArgs instead
     */
    export type MunicipalityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MunicipalityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FiscalYearDefaultArgs instead
     */
    export type FiscalYearArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FiscalYearDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BudgetDefaultArgs instead
     */
    export type BudgetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BudgetDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExpenditureDefaultArgs instead
     */
    export type ExpenditureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExpenditureDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProjectDefaultArgs instead
     */
    export type ProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProjectDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FundingSourceDefaultArgs instead
     */
    export type FundingSourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FundingSourceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupplierDefaultArgs instead
     */
    export type SupplierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupplierDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DatasetDefaultArgs instead
     */
    export type DatasetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DatasetDefaultArgs<ExtArgs>
    /**
     * @deprecated Use IngestionRunDefaultArgs instead
     */
    export type IngestionRunArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = IngestionRunDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QueryAuditDefaultArgs instead
     */
    export type QueryAuditArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QueryAuditDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}