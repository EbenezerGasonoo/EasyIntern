
/**
 * Client
**/

import * as runtime from './runtime/binary.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model Intern
 * 
 */
export type Intern = $Result.DefaultSelection<Prisma.$InternPayload>
/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model Application
 * 
 */
export type Application = $Result.DefaultSelection<Prisma.$ApplicationPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model SupportTicket
 * 
 */
export type SupportTicket = $Result.DefaultSelection<Prisma.$SupportTicketPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model SmtpConfiguration
 * 
 */
export type SmtpConfiguration = $Result.DefaultSelection<Prisma.$SmtpConfigurationPayload>
/**
 * Model AdminSetting
 * 
 */
export type AdminSetting = $Result.DefaultSelection<Prisma.$AdminSettingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserType: {
  COMPANY: 'COMPANY',
  INTERN: 'INTERN',
  ADMIN: 'ADMIN'
};

export type UserType = (typeof UserType)[keyof typeof UserType]


export const AdminRole: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  OPS_ADMIN: 'OPS_ADMIN',
  SUPPORT_ADMIN: 'SUPPORT_ADMIN'
};

export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole]


export const ApplicationStatus: {
  PENDING: 'PENDING',
  REVIEWED: 'REVIEWED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]


export const TicketCategory: {
  ACCOUNT: 'ACCOUNT',
  BILLING: 'BILLING',
  APPLICATION: 'APPLICATION',
  JOB_POST: 'JOB_POST',
  VERIFICATION: 'VERIFICATION',
  TECHNICAL: 'TECHNICAL',
  OTHER: 'OTHER'
};

export type TicketCategory = (typeof TicketCategory)[keyof typeof TicketCategory]


export const TicketPriority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority]


export const TicketStatus: {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED'
};

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]

}

export type UserType = $Enums.UserType

export const UserType: typeof $Enums.UserType

export type AdminRole = $Enums.AdminRole

export const AdminRole: typeof $Enums.AdminRole

export type ApplicationStatus = $Enums.ApplicationStatus

export const ApplicationStatus: typeof $Enums.ApplicationStatus

export type TicketCategory = $Enums.TicketCategory

export const TicketCategory: typeof $Enums.TicketCategory

export type TicketPriority = $Enums.TicketPriority

export const TicketPriority: typeof $Enums.TicketPriority

export type TicketStatus = $Enums.TicketStatus

export const TicketStatus: typeof $Enums.TicketStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => $Utils.JsPromise<void> : Prisma.LogEvent) => void): void;

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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs>;

  /**
   * `prisma.intern`: Exposes CRUD operations for the **Intern** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Interns
    * const interns = await prisma.intern.findMany()
    * ```
    */
  get intern(): Prisma.InternDelegate<ExtArgs>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs>;

  /**
   * `prisma.application`: Exposes CRUD operations for the **Application** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Applications
    * const applications = await prisma.application.findMany()
    * ```
    */
  get application(): Prisma.ApplicationDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.supportTicket`: Exposes CRUD operations for the **SupportTicket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupportTickets
    * const supportTickets = await prisma.supportTicket.findMany()
    * ```
    */
  get supportTicket(): Prisma.SupportTicketDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.smtpConfiguration`: Exposes CRUD operations for the **SmtpConfiguration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SmtpConfigurations
    * const smtpConfigurations = await prisma.smtpConfiguration.findMany()
    * ```
    */
  get smtpConfiguration(): Prisma.SmtpConfigurationDelegate<ExtArgs>;

  /**
   * `prisma.adminSetting`: Exposes CRUD operations for the **AdminSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminSettings
    * const adminSettings = await prisma.adminSetting.findMany()
    * ```
    */
  get adminSetting(): Prisma.AdminSettingDelegate<ExtArgs>;
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
    User: 'User',
    Company: 'Company',
    Intern: 'Intern',
    Job: 'Job',
    Application: 'Application',
    Notification: 'Notification',
    SupportTicket: 'SupportTicket',
    AuditLog: 'AuditLog',
    SmtpConfiguration: 'SmtpConfiguration',
    AdminSetting: 'AdminSetting'
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
      modelProps: "user" | "company" | "intern" | "job" | "application" | "notification" | "supportTicket" | "auditLog" | "smtpConfiguration" | "adminSetting"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      Intern: {
        payload: Prisma.$InternPayload<ExtArgs>
        fields: Prisma.InternFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InternFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InternFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternPayload>
          }
          findFirst: {
            args: Prisma.InternFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InternFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternPayload>
          }
          findMany: {
            args: Prisma.InternFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternPayload>[]
          }
          create: {
            args: Prisma.InternCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternPayload>
          }
          createMany: {
            args: Prisma.InternCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InternDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternPayload>
          }
          update: {
            args: Prisma.InternUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternPayload>
          }
          deleteMany: {
            args: Prisma.InternDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InternUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InternUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternPayload>
          }
          aggregate: {
            args: Prisma.InternAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIntern>
          }
          groupBy: {
            args: Prisma.InternGroupByArgs<ExtArgs>
            result: $Utils.Optional<InternGroupByOutputType>[]
          }
          count: {
            args: Prisma.InternCountArgs<ExtArgs>
            result: $Utils.Optional<InternCountAggregateOutputType> | number
          }
        }
      }
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      Application: {
        payload: Prisma.$ApplicationPayload<ExtArgs>
        fields: Prisma.ApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findFirst: {
            args: Prisma.ApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findMany: {
            args: Prisma.ApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          create: {
            args: Prisma.ApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          createMany: {
            args: Prisma.ApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          update: {
            args: Prisma.ApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          deleteMany: {
            args: Prisma.ApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          aggregate: {
            args: Prisma.ApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplication>
          }
          groupBy: {
            args: Prisma.ApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicationCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      SupportTicket: {
        payload: Prisma.$SupportTicketPayload<ExtArgs>
        fields: Prisma.SupportTicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupportTicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupportTicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          findFirst: {
            args: Prisma.SupportTicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupportTicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          findMany: {
            args: Prisma.SupportTicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>[]
          }
          create: {
            args: Prisma.SupportTicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          createMany: {
            args: Prisma.SupportTicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SupportTicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          update: {
            args: Prisma.SupportTicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          deleteMany: {
            args: Prisma.SupportTicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupportTicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupportTicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          aggregate: {
            args: Prisma.SupportTicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupportTicket>
          }
          groupBy: {
            args: Prisma.SupportTicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupportTicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupportTicketCountArgs<ExtArgs>
            result: $Utils.Optional<SupportTicketCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      SmtpConfiguration: {
        payload: Prisma.$SmtpConfigurationPayload<ExtArgs>
        fields: Prisma.SmtpConfigurationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SmtpConfigurationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmtpConfigurationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SmtpConfigurationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmtpConfigurationPayload>
          }
          findFirst: {
            args: Prisma.SmtpConfigurationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmtpConfigurationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SmtpConfigurationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmtpConfigurationPayload>
          }
          findMany: {
            args: Prisma.SmtpConfigurationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmtpConfigurationPayload>[]
          }
          create: {
            args: Prisma.SmtpConfigurationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmtpConfigurationPayload>
          }
          createMany: {
            args: Prisma.SmtpConfigurationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SmtpConfigurationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmtpConfigurationPayload>
          }
          update: {
            args: Prisma.SmtpConfigurationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmtpConfigurationPayload>
          }
          deleteMany: {
            args: Prisma.SmtpConfigurationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SmtpConfigurationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SmtpConfigurationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmtpConfigurationPayload>
          }
          aggregate: {
            args: Prisma.SmtpConfigurationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSmtpConfiguration>
          }
          groupBy: {
            args: Prisma.SmtpConfigurationGroupByArgs<ExtArgs>
            result: $Utils.Optional<SmtpConfigurationGroupByOutputType>[]
          }
          count: {
            args: Prisma.SmtpConfigurationCountArgs<ExtArgs>
            result: $Utils.Optional<SmtpConfigurationCountAggregateOutputType> | number
          }
        }
      }
      AdminSetting: {
        payload: Prisma.$AdminSettingPayload<ExtArgs>
        fields: Prisma.AdminSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>
          }
          findFirst: {
            args: Prisma.AdminSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>
          }
          findMany: {
            args: Prisma.AdminSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>[]
          }
          create: {
            args: Prisma.AdminSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>
          }
          createMany: {
            args: Prisma.AdminSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AdminSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>
          }
          update: {
            args: Prisma.AdminSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>
          }
          deleteMany: {
            args: Prisma.AdminSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>
          }
          aggregate: {
            args: Prisma.AdminSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminSetting>
          }
          groupBy: {
            args: Prisma.AdminSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminSettingCountArgs<ExtArgs>
            result: $Utils.Optional<AdminSettingCountAggregateOutputType> | number
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    notifications: number
    supportTickets: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    supportTickets?: boolean | UserCountOutputTypeCountSupportTicketsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSupportTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    jobs: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | CompanyCountOutputTypeCountJobsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }


  /**
   * Count Type InternCountOutputType
   */

  export type InternCountOutputType = {
    applications: number
  }

  export type InternCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | InternCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * InternCountOutputType without action
   */
  export type InternCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternCountOutputType
     */
    select?: InternCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InternCountOutputType without action
   */
  export type InternCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }


  /**
   * Count Type JobCountOutputType
   */

  export type JobCountOutputType = {
    applications: number
  }

  export type JobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | JobCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCountOutputType
     */
    select?: JobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }


  /**
   * Models
   */

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
    password: string | null
    userType: $Enums.UserType | null
    isEmailVerified: boolean | null
    isAdmin: boolean | null
    adminRole: $Enums.AdminRole | null
    verificationToken: string | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    isSuspended: boolean | null
    suspensionReason: string | null
    suspendedAt: Date | null
    softBannedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    userType: $Enums.UserType | null
    isEmailVerified: boolean | null
    isAdmin: boolean | null
    adminRole: $Enums.AdminRole | null
    verificationToken: string | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    isSuspended: boolean | null
    suspensionReason: string | null
    suspendedAt: Date | null
    softBannedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    userType: number
    isEmailVerified: number
    isAdmin: number
    adminRole: number
    verificationToken: number
    resetToken: number
    resetTokenExpiry: number
    isSuspended: number
    suspensionReason: number
    suspendedAt: number
    softBannedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    userType?: true
    isEmailVerified?: true
    isAdmin?: true
    adminRole?: true
    verificationToken?: true
    resetToken?: true
    resetTokenExpiry?: true
    isSuspended?: true
    suspensionReason?: true
    suspendedAt?: true
    softBannedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    userType?: true
    isEmailVerified?: true
    isAdmin?: true
    adminRole?: true
    verificationToken?: true
    resetToken?: true
    resetTokenExpiry?: true
    isSuspended?: true
    suspensionReason?: true
    suspendedAt?: true
    softBannedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    userType?: true
    isEmailVerified?: true
    isAdmin?: true
    adminRole?: true
    verificationToken?: true
    resetToken?: true
    resetTokenExpiry?: true
    isSuspended?: true
    suspensionReason?: true
    suspendedAt?: true
    softBannedAt?: true
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
    password: string
    userType: $Enums.UserType
    isEmailVerified: boolean
    isAdmin: boolean
    adminRole: $Enums.AdminRole | null
    verificationToken: string | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    isSuspended: boolean
    suspensionReason: string | null
    suspendedAt: Date | null
    softBannedAt: Date | null
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
    password?: boolean
    userType?: boolean
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: boolean
    verificationToken?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    isSuspended?: boolean
    suspensionReason?: boolean
    suspendedAt?: boolean
    softBannedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
    intern?: boolean | User$internArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    supportTickets?: boolean | User$supportTicketsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    userType?: boolean
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: boolean
    verificationToken?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    isSuspended?: boolean
    suspensionReason?: boolean
    suspendedAt?: boolean
    softBannedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
    intern?: boolean | User$internArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    supportTickets?: boolean | User$supportTicketsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs> | null
      intern: Prisma.$InternPayload<ExtArgs> | null
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      supportTickets: Prisma.$SupportTicketPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      userType: $Enums.UserType
      isEmailVerified: boolean
      isAdmin: boolean
      adminRole: $Enums.AdminRole | null
      verificationToken: string | null
      resetToken: string | null
      resetTokenExpiry: Date | null
      isSuspended: boolean
      suspensionReason: string | null
      suspendedAt: Date | null
      softBannedAt: Date | null
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
    company<T extends User$companyArgs<ExtArgs> = {}>(args?: Subset<T, User$companyArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    intern<T extends User$internArgs<ExtArgs> = {}>(args?: Subset<T, User$internArgs<ExtArgs>>): Prisma__InternClient<$Result.GetResult<Prisma.$InternPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany"> | Null>
    supportTickets<T extends User$supportTicketsArgs<ExtArgs> = {}>(args?: Subset<T, User$supportTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany"> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly password: FieldRef<"User", 'String'>
    readonly userType: FieldRef<"User", 'UserType'>
    readonly isEmailVerified: FieldRef<"User", 'Boolean'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly adminRole: FieldRef<"User", 'AdminRole'>
    readonly verificationToken: FieldRef<"User", 'String'>
    readonly resetToken: FieldRef<"User", 'String'>
    readonly resetTokenExpiry: FieldRef<"User", 'DateTime'>
    readonly isSuspended: FieldRef<"User", 'Boolean'>
    readonly suspensionReason: FieldRef<"User", 'String'>
    readonly suspendedAt: FieldRef<"User", 'DateTime'>
    readonly softBannedAt: FieldRef<"User", 'DateTime'>
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
   * User.company
   */
  export type User$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
  }

  /**
   * User.intern
   */
  export type User$internArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intern
     */
    select?: InternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternInclude<ExtArgs> | null
    where?: InternWhereInput
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.supportTickets
   */
  export type User$supportTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    cursor?: SupportTicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
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
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    website: string | null
    industry: string | null
    location: string | null
    phone: string | null
    logo: string | null
    companyTaxId: string | null
    isVerified: boolean | null
    registrationDoc: string | null
    internIntake: string | null
    mapLocation: string | null
    benefits: string | null
    hiringPriorities: string | null
    candidateRequirements: string | null
    hiringWorkflow: string | null
    companySize: string | null
    contactEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    website: string | null
    industry: string | null
    location: string | null
    phone: string | null
    logo: string | null
    companyTaxId: string | null
    isVerified: boolean | null
    registrationDoc: string | null
    internIntake: string | null
    mapLocation: string | null
    benefits: string | null
    hiringPriorities: string | null
    candidateRequirements: string | null
    hiringWorkflow: string | null
    companySize: string | null
    contactEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    description: number
    website: number
    industry: number
    location: number
    phone: number
    logo: number
    companyTaxId: number
    isVerified: number
    registrationDoc: number
    internIntake: number
    mapLocation: number
    benefits: number
    hiringPriorities: number
    candidateRequirements: number
    hiringWorkflow: number
    companySize: number
    contactEmail: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    website?: true
    industry?: true
    location?: true
    phone?: true
    logo?: true
    companyTaxId?: true
    isVerified?: true
    registrationDoc?: true
    internIntake?: true
    mapLocation?: true
    benefits?: true
    hiringPriorities?: true
    candidateRequirements?: true
    hiringWorkflow?: true
    companySize?: true
    contactEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    website?: true
    industry?: true
    location?: true
    phone?: true
    logo?: true
    companyTaxId?: true
    isVerified?: true
    registrationDoc?: true
    internIntake?: true
    mapLocation?: true
    benefits?: true
    hiringPriorities?: true
    candidateRequirements?: true
    hiringWorkflow?: true
    companySize?: true
    contactEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    website?: true
    industry?: true
    location?: true
    phone?: true
    logo?: true
    companyTaxId?: true
    isVerified?: true
    registrationDoc?: true
    internIntake?: true
    mapLocation?: true
    benefits?: true
    hiringPriorities?: true
    candidateRequirements?: true
    hiringWorkflow?: true
    companySize?: true
    contactEmail?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    userId: string
    name: string
    description: string | null
    website: string | null
    industry: string | null
    location: string | null
    phone: string | null
    logo: string | null
    companyTaxId: string | null
    isVerified: boolean
    registrationDoc: string | null
    internIntake: string | null
    mapLocation: string | null
    benefits: string | null
    hiringPriorities: string | null
    candidateRequirements: string | null
    hiringWorkflow: string | null
    companySize: string | null
    contactEmail: string | null
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    website?: boolean
    industry?: boolean
    location?: boolean
    phone?: boolean
    logo?: boolean
    companyTaxId?: boolean
    isVerified?: boolean
    registrationDoc?: boolean
    internIntake?: boolean
    mapLocation?: boolean
    benefits?: boolean
    hiringPriorities?: boolean
    candidateRequirements?: boolean
    hiringWorkflow?: boolean
    companySize?: boolean
    contactEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>


  export type CompanySelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    website?: boolean
    industry?: boolean
    location?: boolean
    phone?: boolean
    logo?: boolean
    companyTaxId?: boolean
    isVerified?: boolean
    registrationDoc?: boolean
    internIntake?: boolean
    mapLocation?: boolean
    benefits?: boolean
    hiringPriorities?: boolean
    candidateRequirements?: boolean
    hiringWorkflow?: boolean
    companySize?: boolean
    contactEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      jobs: Prisma.$JobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      description: string | null
      website: string | null
      industry: string | null
      location: string | null
      phone: string | null
      logo: string | null
      companyTaxId: string | null
      isVerified: boolean
      registrationDoc: string | null
      internIntake: string | null
      mapLocation: string | null
      benefits: string | null
      hiringPriorities: string | null
      candidateRequirements: string | null
      hiringWorkflow: string | null
      companySize: string | null
      contactEmail: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
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
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    jobs<T extends Company$jobsArgs<ExtArgs> = {}>(args?: Subset<T, Company$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Company model
   */ 
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly userId: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly description: FieldRef<"Company", 'String'>
    readonly website: FieldRef<"Company", 'String'>
    readonly industry: FieldRef<"Company", 'String'>
    readonly location: FieldRef<"Company", 'String'>
    readonly phone: FieldRef<"Company", 'String'>
    readonly logo: FieldRef<"Company", 'String'>
    readonly companyTaxId: FieldRef<"Company", 'String'>
    readonly isVerified: FieldRef<"Company", 'Boolean'>
    readonly registrationDoc: FieldRef<"Company", 'String'>
    readonly internIntake: FieldRef<"Company", 'String'>
    readonly mapLocation: FieldRef<"Company", 'String'>
    readonly benefits: FieldRef<"Company", 'String'>
    readonly hiringPriorities: FieldRef<"Company", 'String'>
    readonly candidateRequirements: FieldRef<"Company", 'String'>
    readonly hiringWorkflow: FieldRef<"Company", 'String'>
    readonly companySize: FieldRef<"Company", 'String'>
    readonly contactEmail: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
  }

  /**
   * Company.jobs
   */
  export type Company$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model Intern
   */

  export type AggregateIntern = {
    _count: InternCountAggregateOutputType | null
    _min: InternMinAggregateOutputType | null
    _max: InternMaxAggregateOutputType | null
  }

  export type InternMinAggregateOutputType = {
    id: string | null
    userId: string | null
    studentId: string | null
    dateOfBirth: Date | null
    ghanaCardNumber: string | null
    ghanaCardDocument: string | null
    isVerified: boolean | null
    notifyIndustryJobs: boolean | null
    preferredIndustry: string | null
    firstName: string | null
    lastName: string | null
    bio: string | null
    phone: string | null
    education: string | null
    educationWebsite: string | null
    location: string | null
    resume: string | null
    profilePic: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InternMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    studentId: string | null
    dateOfBirth: Date | null
    ghanaCardNumber: string | null
    ghanaCardDocument: string | null
    isVerified: boolean | null
    notifyIndustryJobs: boolean | null
    preferredIndustry: string | null
    firstName: string | null
    lastName: string | null
    bio: string | null
    phone: string | null
    education: string | null
    educationWebsite: string | null
    location: string | null
    resume: string | null
    profilePic: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InternCountAggregateOutputType = {
    id: number
    userId: number
    studentId: number
    dateOfBirth: number
    ghanaCardNumber: number
    ghanaCardDocument: number
    isVerified: number
    notifyIndustryJobs: number
    preferredIndustry: number
    firstName: number
    lastName: number
    bio: number
    phone: number
    skills: number
    education: number
    educationWebsite: number
    experience: number
    location: number
    resume: number
    profilePic: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InternMinAggregateInputType = {
    id?: true
    userId?: true
    studentId?: true
    dateOfBirth?: true
    ghanaCardNumber?: true
    ghanaCardDocument?: true
    isVerified?: true
    notifyIndustryJobs?: true
    preferredIndustry?: true
    firstName?: true
    lastName?: true
    bio?: true
    phone?: true
    education?: true
    educationWebsite?: true
    location?: true
    resume?: true
    profilePic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InternMaxAggregateInputType = {
    id?: true
    userId?: true
    studentId?: true
    dateOfBirth?: true
    ghanaCardNumber?: true
    ghanaCardDocument?: true
    isVerified?: true
    notifyIndustryJobs?: true
    preferredIndustry?: true
    firstName?: true
    lastName?: true
    bio?: true
    phone?: true
    education?: true
    educationWebsite?: true
    location?: true
    resume?: true
    profilePic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InternCountAggregateInputType = {
    id?: true
    userId?: true
    studentId?: true
    dateOfBirth?: true
    ghanaCardNumber?: true
    ghanaCardDocument?: true
    isVerified?: true
    notifyIndustryJobs?: true
    preferredIndustry?: true
    firstName?: true
    lastName?: true
    bio?: true
    phone?: true
    skills?: true
    education?: true
    educationWebsite?: true
    experience?: true
    location?: true
    resume?: true
    profilePic?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InternAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Intern to aggregate.
     */
    where?: InternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interns to fetch.
     */
    orderBy?: InternOrderByWithRelationInput | InternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Interns
    **/
    _count?: true | InternCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InternMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InternMaxAggregateInputType
  }

  export type GetInternAggregateType<T extends InternAggregateArgs> = {
        [P in keyof T & keyof AggregateIntern]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIntern[P]>
      : GetScalarType<T[P], AggregateIntern[P]>
  }




  export type InternGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InternWhereInput
    orderBy?: InternOrderByWithAggregationInput | InternOrderByWithAggregationInput[]
    by: InternScalarFieldEnum[] | InternScalarFieldEnum
    having?: InternScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InternCountAggregateInputType | true
    _min?: InternMinAggregateInputType
    _max?: InternMaxAggregateInputType
  }

  export type InternGroupByOutputType = {
    id: string
    userId: string
    studentId: string | null
    dateOfBirth: Date | null
    ghanaCardNumber: string | null
    ghanaCardDocument: string | null
    isVerified: boolean
    notifyIndustryJobs: boolean
    preferredIndustry: string | null
    firstName: string
    lastName: string
    bio: string | null
    phone: string | null
    skills: JsonValue
    education: string | null
    educationWebsite: string | null
    experience: JsonValue | null
    location: string | null
    resume: string | null
    profilePic: string | null
    createdAt: Date
    updatedAt: Date
    _count: InternCountAggregateOutputType | null
    _min: InternMinAggregateOutputType | null
    _max: InternMaxAggregateOutputType | null
  }

  type GetInternGroupByPayload<T extends InternGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InternGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InternGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InternGroupByOutputType[P]>
            : GetScalarType<T[P], InternGroupByOutputType[P]>
        }
      >
    >


  export type InternSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    studentId?: boolean
    dateOfBirth?: boolean
    ghanaCardNumber?: boolean
    ghanaCardDocument?: boolean
    isVerified?: boolean
    notifyIndustryJobs?: boolean
    preferredIndustry?: boolean
    firstName?: boolean
    lastName?: boolean
    bio?: boolean
    phone?: boolean
    skills?: boolean
    education?: boolean
    educationWebsite?: boolean
    experience?: boolean
    location?: boolean
    resume?: boolean
    profilePic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    applications?: boolean | Intern$applicationsArgs<ExtArgs>
    _count?: boolean | InternCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["intern"]>


  export type InternSelectScalar = {
    id?: boolean
    userId?: boolean
    studentId?: boolean
    dateOfBirth?: boolean
    ghanaCardNumber?: boolean
    ghanaCardDocument?: boolean
    isVerified?: boolean
    notifyIndustryJobs?: boolean
    preferredIndustry?: boolean
    firstName?: boolean
    lastName?: boolean
    bio?: boolean
    phone?: boolean
    skills?: boolean
    education?: boolean
    educationWebsite?: boolean
    experience?: boolean
    location?: boolean
    resume?: boolean
    profilePic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InternInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    applications?: boolean | Intern$applicationsArgs<ExtArgs>
    _count?: boolean | InternCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $InternPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Intern"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      studentId: string | null
      dateOfBirth: Date | null
      ghanaCardNumber: string | null
      ghanaCardDocument: string | null
      isVerified: boolean
      notifyIndustryJobs: boolean
      preferredIndustry: string | null
      firstName: string
      lastName: string
      bio: string | null
      phone: string | null
      skills: Prisma.JsonValue
      education: string | null
      educationWebsite: string | null
      experience: Prisma.JsonValue | null
      location: string | null
      resume: string | null
      profilePic: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["intern"]>
    composites: {}
  }

  type InternGetPayload<S extends boolean | null | undefined | InternDefaultArgs> = $Result.GetResult<Prisma.$InternPayload, S>

  type InternCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InternFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InternCountAggregateInputType | true
    }

  export interface InternDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Intern'], meta: { name: 'Intern' } }
    /**
     * Find zero or one Intern that matches the filter.
     * @param {InternFindUniqueArgs} args - Arguments to find a Intern
     * @example
     * // Get one Intern
     * const intern = await prisma.intern.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InternFindUniqueArgs>(args: SelectSubset<T, InternFindUniqueArgs<ExtArgs>>): Prisma__InternClient<$Result.GetResult<Prisma.$InternPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Intern that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InternFindUniqueOrThrowArgs} args - Arguments to find a Intern
     * @example
     * // Get one Intern
     * const intern = await prisma.intern.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InternFindUniqueOrThrowArgs>(args: SelectSubset<T, InternFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InternClient<$Result.GetResult<Prisma.$InternPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Intern that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternFindFirstArgs} args - Arguments to find a Intern
     * @example
     * // Get one Intern
     * const intern = await prisma.intern.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InternFindFirstArgs>(args?: SelectSubset<T, InternFindFirstArgs<ExtArgs>>): Prisma__InternClient<$Result.GetResult<Prisma.$InternPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Intern that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternFindFirstOrThrowArgs} args - Arguments to find a Intern
     * @example
     * // Get one Intern
     * const intern = await prisma.intern.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InternFindFirstOrThrowArgs>(args?: SelectSubset<T, InternFindFirstOrThrowArgs<ExtArgs>>): Prisma__InternClient<$Result.GetResult<Prisma.$InternPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Interns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Interns
     * const interns = await prisma.intern.findMany()
     * 
     * // Get first 10 Interns
     * const interns = await prisma.intern.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const internWithIdOnly = await prisma.intern.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InternFindManyArgs>(args?: SelectSubset<T, InternFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InternPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Intern.
     * @param {InternCreateArgs} args - Arguments to create a Intern.
     * @example
     * // Create one Intern
     * const Intern = await prisma.intern.create({
     *   data: {
     *     // ... data to create a Intern
     *   }
     * })
     * 
     */
    create<T extends InternCreateArgs>(args: SelectSubset<T, InternCreateArgs<ExtArgs>>): Prisma__InternClient<$Result.GetResult<Prisma.$InternPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Interns.
     * @param {InternCreateManyArgs} args - Arguments to create many Interns.
     * @example
     * // Create many Interns
     * const intern = await prisma.intern.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InternCreateManyArgs>(args?: SelectSubset<T, InternCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Intern.
     * @param {InternDeleteArgs} args - Arguments to delete one Intern.
     * @example
     * // Delete one Intern
     * const Intern = await prisma.intern.delete({
     *   where: {
     *     // ... filter to delete one Intern
     *   }
     * })
     * 
     */
    delete<T extends InternDeleteArgs>(args: SelectSubset<T, InternDeleteArgs<ExtArgs>>): Prisma__InternClient<$Result.GetResult<Prisma.$InternPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Intern.
     * @param {InternUpdateArgs} args - Arguments to update one Intern.
     * @example
     * // Update one Intern
     * const intern = await prisma.intern.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InternUpdateArgs>(args: SelectSubset<T, InternUpdateArgs<ExtArgs>>): Prisma__InternClient<$Result.GetResult<Prisma.$InternPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Interns.
     * @param {InternDeleteManyArgs} args - Arguments to filter Interns to delete.
     * @example
     * // Delete a few Interns
     * const { count } = await prisma.intern.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InternDeleteManyArgs>(args?: SelectSubset<T, InternDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Interns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Interns
     * const intern = await prisma.intern.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InternUpdateManyArgs>(args: SelectSubset<T, InternUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Intern.
     * @param {InternUpsertArgs} args - Arguments to update or create a Intern.
     * @example
     * // Update or create a Intern
     * const intern = await prisma.intern.upsert({
     *   create: {
     *     // ... data to create a Intern
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Intern we want to update
     *   }
     * })
     */
    upsert<T extends InternUpsertArgs>(args: SelectSubset<T, InternUpsertArgs<ExtArgs>>): Prisma__InternClient<$Result.GetResult<Prisma.$InternPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Interns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternCountArgs} args - Arguments to filter Interns to count.
     * @example
     * // Count the number of Interns
     * const count = await prisma.intern.count({
     *   where: {
     *     // ... the filter for the Interns we want to count
     *   }
     * })
    **/
    count<T extends InternCountArgs>(
      args?: Subset<T, InternCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InternCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Intern.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InternAggregateArgs>(args: Subset<T, InternAggregateArgs>): Prisma.PrismaPromise<GetInternAggregateType<T>>

    /**
     * Group by Intern.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternGroupByArgs} args - Group by arguments.
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
      T extends InternGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InternGroupByArgs['orderBy'] }
        : { orderBy?: InternGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InternGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInternGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Intern model
   */
  readonly fields: InternFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Intern.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InternClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    applications<T extends Intern$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Intern$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Intern model
   */ 
  interface InternFieldRefs {
    readonly id: FieldRef<"Intern", 'String'>
    readonly userId: FieldRef<"Intern", 'String'>
    readonly studentId: FieldRef<"Intern", 'String'>
    readonly dateOfBirth: FieldRef<"Intern", 'DateTime'>
    readonly ghanaCardNumber: FieldRef<"Intern", 'String'>
    readonly ghanaCardDocument: FieldRef<"Intern", 'String'>
    readonly isVerified: FieldRef<"Intern", 'Boolean'>
    readonly notifyIndustryJobs: FieldRef<"Intern", 'Boolean'>
    readonly preferredIndustry: FieldRef<"Intern", 'String'>
    readonly firstName: FieldRef<"Intern", 'String'>
    readonly lastName: FieldRef<"Intern", 'String'>
    readonly bio: FieldRef<"Intern", 'String'>
    readonly phone: FieldRef<"Intern", 'String'>
    readonly skills: FieldRef<"Intern", 'Json'>
    readonly education: FieldRef<"Intern", 'String'>
    readonly educationWebsite: FieldRef<"Intern", 'String'>
    readonly experience: FieldRef<"Intern", 'Json'>
    readonly location: FieldRef<"Intern", 'String'>
    readonly resume: FieldRef<"Intern", 'String'>
    readonly profilePic: FieldRef<"Intern", 'String'>
    readonly createdAt: FieldRef<"Intern", 'DateTime'>
    readonly updatedAt: FieldRef<"Intern", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Intern findUnique
   */
  export type InternFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intern
     */
    select?: InternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternInclude<ExtArgs> | null
    /**
     * Filter, which Intern to fetch.
     */
    where: InternWhereUniqueInput
  }

  /**
   * Intern findUniqueOrThrow
   */
  export type InternFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intern
     */
    select?: InternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternInclude<ExtArgs> | null
    /**
     * Filter, which Intern to fetch.
     */
    where: InternWhereUniqueInput
  }

  /**
   * Intern findFirst
   */
  export type InternFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intern
     */
    select?: InternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternInclude<ExtArgs> | null
    /**
     * Filter, which Intern to fetch.
     */
    where?: InternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interns to fetch.
     */
    orderBy?: InternOrderByWithRelationInput | InternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Interns.
     */
    cursor?: InternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Interns.
     */
    distinct?: InternScalarFieldEnum | InternScalarFieldEnum[]
  }

  /**
   * Intern findFirstOrThrow
   */
  export type InternFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intern
     */
    select?: InternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternInclude<ExtArgs> | null
    /**
     * Filter, which Intern to fetch.
     */
    where?: InternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interns to fetch.
     */
    orderBy?: InternOrderByWithRelationInput | InternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Interns.
     */
    cursor?: InternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Interns.
     */
    distinct?: InternScalarFieldEnum | InternScalarFieldEnum[]
  }

  /**
   * Intern findMany
   */
  export type InternFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intern
     */
    select?: InternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternInclude<ExtArgs> | null
    /**
     * Filter, which Interns to fetch.
     */
    where?: InternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interns to fetch.
     */
    orderBy?: InternOrderByWithRelationInput | InternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Interns.
     */
    cursor?: InternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interns.
     */
    skip?: number
    distinct?: InternScalarFieldEnum | InternScalarFieldEnum[]
  }

  /**
   * Intern create
   */
  export type InternCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intern
     */
    select?: InternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternInclude<ExtArgs> | null
    /**
     * The data needed to create a Intern.
     */
    data: XOR<InternCreateInput, InternUncheckedCreateInput>
  }

  /**
   * Intern createMany
   */
  export type InternCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Interns.
     */
    data: InternCreateManyInput | InternCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Intern update
   */
  export type InternUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intern
     */
    select?: InternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternInclude<ExtArgs> | null
    /**
     * The data needed to update a Intern.
     */
    data: XOR<InternUpdateInput, InternUncheckedUpdateInput>
    /**
     * Choose, which Intern to update.
     */
    where: InternWhereUniqueInput
  }

  /**
   * Intern updateMany
   */
  export type InternUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Interns.
     */
    data: XOR<InternUpdateManyMutationInput, InternUncheckedUpdateManyInput>
    /**
     * Filter which Interns to update
     */
    where?: InternWhereInput
  }

  /**
   * Intern upsert
   */
  export type InternUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intern
     */
    select?: InternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternInclude<ExtArgs> | null
    /**
     * The filter to search for the Intern to update in case it exists.
     */
    where: InternWhereUniqueInput
    /**
     * In case the Intern found by the `where` argument doesn't exist, create a new Intern with this data.
     */
    create: XOR<InternCreateInput, InternUncheckedCreateInput>
    /**
     * In case the Intern was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InternUpdateInput, InternUncheckedUpdateInput>
  }

  /**
   * Intern delete
   */
  export type InternDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intern
     */
    select?: InternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternInclude<ExtArgs> | null
    /**
     * Filter which Intern to delete.
     */
    where: InternWhereUniqueInput
  }

  /**
   * Intern deleteMany
   */
  export type InternDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Interns to delete
     */
    where?: InternWhereInput
  }

  /**
   * Intern.applications
   */
  export type Intern$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Intern without action
   */
  export type InternDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intern
     */
    select?: InternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternInclude<ExtArgs> | null
  }


  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    title: string | null
    description: string | null
    location: string | null
    remote: boolean | null
    duration: string | null
    stipend: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    title: string | null
    description: string | null
    location: string | null
    remote: boolean | null
    duration: string | null
    stipend: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    companyId: number
    title: number
    description: number
    requirements: number
    responsibilities: number
    benefits: number
    location: number
    remote: number
    duration: number
    stipend: number
    skills: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobMinAggregateInputType = {
    id?: true
    companyId?: true
    title?: true
    description?: true
    location?: true
    remote?: true
    duration?: true
    stipend?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    companyId?: true
    title?: true
    description?: true
    location?: true
    remote?: true
    duration?: true
    stipend?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    companyId?: true
    title?: true
    description?: true
    requirements?: true
    responsibilities?: true
    benefits?: true
    location?: true
    remote?: true
    duration?: true
    stipend?: true
    skills?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: string
    companyId: string
    title: string
    description: string
    requirements: JsonValue
    responsibilities: JsonValue
    benefits: JsonValue
    location: string | null
    remote: boolean
    duration: string | null
    stipend: string | null
    skills: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: JobCountAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    title?: boolean
    description?: boolean
    requirements?: boolean
    responsibilities?: boolean
    benefits?: boolean
    location?: boolean
    remote?: boolean
    duration?: boolean
    stipend?: boolean
    skills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    applications?: boolean | Job$applicationsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>


  export type JobSelectScalar = {
    id?: boolean
    companyId?: boolean
    title?: boolean
    description?: boolean
    requirements?: boolean
    responsibilities?: boolean
    benefits?: boolean
    location?: boolean
    remote?: boolean
    duration?: boolean
    stipend?: boolean
    skills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    applications?: boolean | Job$applicationsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      title: string
      description: string
      requirements: Prisma.JsonValue
      responsibilities: Prisma.JsonValue
      benefits: Prisma.JsonValue
      location: string | null
      remote: boolean
      duration: string | null
      stipend: string | null
      skills: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
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
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    applications<T extends Job$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Job$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Job model
   */ 
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'String'>
    readonly companyId: FieldRef<"Job", 'String'>
    readonly title: FieldRef<"Job", 'String'>
    readonly description: FieldRef<"Job", 'String'>
    readonly requirements: FieldRef<"Job", 'Json'>
    readonly responsibilities: FieldRef<"Job", 'Json'>
    readonly benefits: FieldRef<"Job", 'Json'>
    readonly location: FieldRef<"Job", 'String'>
    readonly remote: FieldRef<"Job", 'Boolean'>
    readonly duration: FieldRef<"Job", 'String'>
    readonly stipend: FieldRef<"Job", 'String'>
    readonly skills: FieldRef<"Job", 'Json'>
    readonly createdAt: FieldRef<"Job", 'DateTime'>
    readonly updatedAt: FieldRef<"Job", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
  }

  /**
   * Job.applications
   */
  export type Job$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model Application
   */

  export type AggregateApplication = {
    _count: ApplicationCountAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  export type ApplicationMinAggregateOutputType = {
    id: string | null
    jobId: string | null
    internId: string | null
    status: $Enums.ApplicationStatus | null
    coverLetter: string | null
    appliedAt: Date | null
    reviewedAt: Date | null
    updatedAt: Date | null
  }

  export type ApplicationMaxAggregateOutputType = {
    id: string | null
    jobId: string | null
    internId: string | null
    status: $Enums.ApplicationStatus | null
    coverLetter: string | null
    appliedAt: Date | null
    reviewedAt: Date | null
    updatedAt: Date | null
  }

  export type ApplicationCountAggregateOutputType = {
    id: number
    jobId: number
    internId: number
    status: number
    coverLetter: number
    appliedAt: number
    reviewedAt: number
    updatedAt: number
    _all: number
  }


  export type ApplicationMinAggregateInputType = {
    id?: true
    jobId?: true
    internId?: true
    status?: true
    coverLetter?: true
    appliedAt?: true
    reviewedAt?: true
    updatedAt?: true
  }

  export type ApplicationMaxAggregateInputType = {
    id?: true
    jobId?: true
    internId?: true
    status?: true
    coverLetter?: true
    appliedAt?: true
    reviewedAt?: true
    updatedAt?: true
  }

  export type ApplicationCountAggregateInputType = {
    id?: true
    jobId?: true
    internId?: true
    status?: true
    coverLetter?: true
    appliedAt?: true
    reviewedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Application to aggregate.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Applications
    **/
    _count?: true | ApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicationMaxAggregateInputType
  }

  export type GetApplicationAggregateType<T extends ApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplication[P]>
      : GetScalarType<T[P], AggregateApplication[P]>
  }




  export type ApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithAggregationInput | ApplicationOrderByWithAggregationInput[]
    by: ApplicationScalarFieldEnum[] | ApplicationScalarFieldEnum
    having?: ApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicationCountAggregateInputType | true
    _min?: ApplicationMinAggregateInputType
    _max?: ApplicationMaxAggregateInputType
  }

  export type ApplicationGroupByOutputType = {
    id: string
    jobId: string
    internId: string
    status: $Enums.ApplicationStatus
    coverLetter: string | null
    appliedAt: Date
    reviewedAt: Date | null
    updatedAt: Date
    _count: ApplicationCountAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  type GetApplicationGroupByPayload<T extends ApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
        }
      >
    >


  export type ApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    internId?: boolean
    status?: boolean
    coverLetter?: boolean
    appliedAt?: boolean
    reviewedAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    intern?: boolean | InternDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>


  export type ApplicationSelectScalar = {
    id?: boolean
    jobId?: boolean
    internId?: boolean
    status?: boolean
    coverLetter?: boolean
    appliedAt?: boolean
    reviewedAt?: boolean
    updatedAt?: boolean
  }

  export type ApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    intern?: boolean | InternDefaultArgs<ExtArgs>
  }

  export type $ApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Application"
    objects: {
      job: Prisma.$JobPayload<ExtArgs>
      intern: Prisma.$InternPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: string
      internId: string
      status: $Enums.ApplicationStatus
      coverLetter: string | null
      appliedAt: Date
      reviewedAt: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["application"]>
    composites: {}
  }

  type ApplicationGetPayload<S extends boolean | null | undefined | ApplicationDefaultArgs> = $Result.GetResult<Prisma.$ApplicationPayload, S>

  type ApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ApplicationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ApplicationCountAggregateInputType | true
    }

  export interface ApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Application'], meta: { name: 'Application' } }
    /**
     * Find zero or one Application that matches the filter.
     * @param {ApplicationFindUniqueArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicationFindUniqueArgs>(args: SelectSubset<T, ApplicationFindUniqueArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Application that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ApplicationFindUniqueOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Application that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicationFindFirstArgs>(args?: SelectSubset<T, ApplicationFindFirstArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Application that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Applications
     * const applications = await prisma.application.findMany()
     * 
     * // Get first 10 Applications
     * const applications = await prisma.application.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const applicationWithIdOnly = await prisma.application.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApplicationFindManyArgs>(args?: SelectSubset<T, ApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Application.
     * @param {ApplicationCreateArgs} args - Arguments to create a Application.
     * @example
     * // Create one Application
     * const Application = await prisma.application.create({
     *   data: {
     *     // ... data to create a Application
     *   }
     * })
     * 
     */
    create<T extends ApplicationCreateArgs>(args: SelectSubset<T, ApplicationCreateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Applications.
     * @param {ApplicationCreateManyArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicationCreateManyArgs>(args?: SelectSubset<T, ApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Application.
     * @param {ApplicationDeleteArgs} args - Arguments to delete one Application.
     * @example
     * // Delete one Application
     * const Application = await prisma.application.delete({
     *   where: {
     *     // ... filter to delete one Application
     *   }
     * })
     * 
     */
    delete<T extends ApplicationDeleteArgs>(args: SelectSubset<T, ApplicationDeleteArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Application.
     * @param {ApplicationUpdateArgs} args - Arguments to update one Application.
     * @example
     * // Update one Application
     * const application = await prisma.application.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicationUpdateArgs>(args: SelectSubset<T, ApplicationUpdateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Applications.
     * @param {ApplicationDeleteManyArgs} args - Arguments to filter Applications to delete.
     * @example
     * // Delete a few Applications
     * const { count } = await prisma.application.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicationDeleteManyArgs>(args?: SelectSubset<T, ApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicationUpdateManyArgs>(args: SelectSubset<T, ApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Application.
     * @param {ApplicationUpsertArgs} args - Arguments to update or create a Application.
     * @example
     * // Update or create a Application
     * const application = await prisma.application.upsert({
     *   create: {
     *     // ... data to create a Application
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Application we want to update
     *   }
     * })
     */
    upsert<T extends ApplicationUpsertArgs>(args: SelectSubset<T, ApplicationUpsertArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationCountArgs} args - Arguments to filter Applications to count.
     * @example
     * // Count the number of Applications
     * const count = await prisma.application.count({
     *   where: {
     *     // ... the filter for the Applications we want to count
     *   }
     * })
    **/
    count<T extends ApplicationCountArgs>(
      args?: Subset<T, ApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApplicationAggregateArgs>(args: Subset<T, ApplicationAggregateArgs>): Prisma.PrismaPromise<GetApplicationAggregateType<T>>

    /**
     * Group by Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationGroupByArgs} args - Group by arguments.
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
      T extends ApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicationGroupByArgs['orderBy'] }
        : { orderBy?: ApplicationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Application model
   */
  readonly fields: ApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Application.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDefaultArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    intern<T extends InternDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InternDefaultArgs<ExtArgs>>): Prisma__InternClient<$Result.GetResult<Prisma.$InternPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Application model
   */ 
  interface ApplicationFieldRefs {
    readonly id: FieldRef<"Application", 'String'>
    readonly jobId: FieldRef<"Application", 'String'>
    readonly internId: FieldRef<"Application", 'String'>
    readonly status: FieldRef<"Application", 'ApplicationStatus'>
    readonly coverLetter: FieldRef<"Application", 'String'>
    readonly appliedAt: FieldRef<"Application", 'DateTime'>
    readonly reviewedAt: FieldRef<"Application", 'DateTime'>
    readonly updatedAt: FieldRef<"Application", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Application findUnique
   */
  export type ApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findUniqueOrThrow
   */
  export type ApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findFirst
   */
  export type ApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findFirstOrThrow
   */
  export type ApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findMany
   */
  export type ApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Applications to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application create
   */
  export type ApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a Application.
     */
    data: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
  }

  /**
   * Application createMany
   */
  export type ApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Application update
   */
  export type ApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a Application.
     */
    data: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
    /**
     * Choose, which Application to update.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application updateMany
   */
  export type ApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput
  }

  /**
   * Application upsert
   */
  export type ApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the Application to update in case it exists.
     */
    where: ApplicationWhereUniqueInput
    /**
     * In case the Application found by the `where` argument doesn't exist, create a new Application with this data.
     */
    create: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
    /**
     * In case the Application was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
  }

  /**
   * Application delete
   */
  export type ApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter which Application to delete.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application deleteMany
   */
  export type ApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Applications to delete
     */
    where?: ApplicationWhereInput
  }

  /**
   * Application without action
   */
  export type ApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    message: string | null
    type: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    message: string | null
    type: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    message: number
    type: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    message?: true
    type?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    message?: true
    type?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    message?: true
    type?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    message: string
    type: string
    isRead: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>


  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      message: string
      type: string
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
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
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model SupportTicket
   */

  export type AggregateSupportTicket = {
    _count: SupportTicketCountAggregateOutputType | null
    _min: SupportTicketMinAggregateOutputType | null
    _max: SupportTicketMaxAggregateOutputType | null
  }

  export type SupportTicketMinAggregateOutputType = {
    id: string | null
    requesterUserId: string | null
    requesterEmail: string | null
    subject: string | null
    description: string | null
    category: $Enums.TicketCategory | null
    priority: $Enums.TicketPriority | null
    status: $Enums.TicketStatus | null
    ownerAdminEmail: string | null
    dueAt: Date | null
    internalNotes: string | null
    slaBreached: boolean | null
    firstResponseAt: Date | null
    resolvedAt: Date | null
    lastActivityAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupportTicketMaxAggregateOutputType = {
    id: string | null
    requesterUserId: string | null
    requesterEmail: string | null
    subject: string | null
    description: string | null
    category: $Enums.TicketCategory | null
    priority: $Enums.TicketPriority | null
    status: $Enums.TicketStatus | null
    ownerAdminEmail: string | null
    dueAt: Date | null
    internalNotes: string | null
    slaBreached: boolean | null
    firstResponseAt: Date | null
    resolvedAt: Date | null
    lastActivityAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupportTicketCountAggregateOutputType = {
    id: number
    requesterUserId: number
    requesterEmail: number
    subject: number
    description: number
    category: number
    priority: number
    status: number
    ownerAdminEmail: number
    dueAt: number
    internalNotes: number
    slaBreached: number
    firstResponseAt: number
    resolvedAt: number
    lastActivityAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SupportTicketMinAggregateInputType = {
    id?: true
    requesterUserId?: true
    requesterEmail?: true
    subject?: true
    description?: true
    category?: true
    priority?: true
    status?: true
    ownerAdminEmail?: true
    dueAt?: true
    internalNotes?: true
    slaBreached?: true
    firstResponseAt?: true
    resolvedAt?: true
    lastActivityAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupportTicketMaxAggregateInputType = {
    id?: true
    requesterUserId?: true
    requesterEmail?: true
    subject?: true
    description?: true
    category?: true
    priority?: true
    status?: true
    ownerAdminEmail?: true
    dueAt?: true
    internalNotes?: true
    slaBreached?: true
    firstResponseAt?: true
    resolvedAt?: true
    lastActivityAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupportTicketCountAggregateInputType = {
    id?: true
    requesterUserId?: true
    requesterEmail?: true
    subject?: true
    description?: true
    category?: true
    priority?: true
    status?: true
    ownerAdminEmail?: true
    dueAt?: true
    internalNotes?: true
    slaBreached?: true
    firstResponseAt?: true
    resolvedAt?: true
    lastActivityAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SupportTicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportTicket to aggregate.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupportTickets
    **/
    _count?: true | SupportTicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupportTicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupportTicketMaxAggregateInputType
  }

  export type GetSupportTicketAggregateType<T extends SupportTicketAggregateArgs> = {
        [P in keyof T & keyof AggregateSupportTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupportTicket[P]>
      : GetScalarType<T[P], AggregateSupportTicket[P]>
  }




  export type SupportTicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithAggregationInput | SupportTicketOrderByWithAggregationInput[]
    by: SupportTicketScalarFieldEnum[] | SupportTicketScalarFieldEnum
    having?: SupportTicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupportTicketCountAggregateInputType | true
    _min?: SupportTicketMinAggregateInputType
    _max?: SupportTicketMaxAggregateInputType
  }

  export type SupportTicketGroupByOutputType = {
    id: string
    requesterUserId: string | null
    requesterEmail: string | null
    subject: string
    description: string
    category: $Enums.TicketCategory
    priority: $Enums.TicketPriority
    status: $Enums.TicketStatus
    ownerAdminEmail: string | null
    dueAt: Date | null
    internalNotes: string | null
    slaBreached: boolean
    firstResponseAt: Date | null
    resolvedAt: Date | null
    lastActivityAt: Date
    createdAt: Date
    updatedAt: Date
    _count: SupportTicketCountAggregateOutputType | null
    _min: SupportTicketMinAggregateOutputType | null
    _max: SupportTicketMaxAggregateOutputType | null
  }

  type GetSupportTicketGroupByPayload<T extends SupportTicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupportTicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupportTicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupportTicketGroupByOutputType[P]>
            : GetScalarType<T[P], SupportTicketGroupByOutputType[P]>
        }
      >
    >


  export type SupportTicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requesterUserId?: boolean
    requesterEmail?: boolean
    subject?: boolean
    description?: boolean
    category?: boolean
    priority?: boolean
    status?: boolean
    ownerAdminEmail?: boolean
    dueAt?: boolean
    internalNotes?: boolean
    slaBreached?: boolean
    firstResponseAt?: boolean
    resolvedAt?: boolean
    lastActivityAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requester?: boolean | SupportTicket$requesterArgs<ExtArgs>
  }, ExtArgs["result"]["supportTicket"]>


  export type SupportTicketSelectScalar = {
    id?: boolean
    requesterUserId?: boolean
    requesterEmail?: boolean
    subject?: boolean
    description?: boolean
    category?: boolean
    priority?: boolean
    status?: boolean
    ownerAdminEmail?: boolean
    dueAt?: boolean
    internalNotes?: boolean
    slaBreached?: boolean
    firstResponseAt?: boolean
    resolvedAt?: boolean
    lastActivityAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SupportTicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | SupportTicket$requesterArgs<ExtArgs>
  }

  export type $SupportTicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupportTicket"
    objects: {
      requester: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requesterUserId: string | null
      requesterEmail: string | null
      subject: string
      description: string
      category: $Enums.TicketCategory
      priority: $Enums.TicketPriority
      status: $Enums.TicketStatus
      ownerAdminEmail: string | null
      dueAt: Date | null
      internalNotes: string | null
      slaBreached: boolean
      firstResponseAt: Date | null
      resolvedAt: Date | null
      lastActivityAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["supportTicket"]>
    composites: {}
  }

  type SupportTicketGetPayload<S extends boolean | null | undefined | SupportTicketDefaultArgs> = $Result.GetResult<Prisma.$SupportTicketPayload, S>

  type SupportTicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SupportTicketFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SupportTicketCountAggregateInputType | true
    }

  export interface SupportTicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupportTicket'], meta: { name: 'SupportTicket' } }
    /**
     * Find zero or one SupportTicket that matches the filter.
     * @param {SupportTicketFindUniqueArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupportTicketFindUniqueArgs>(args: SelectSubset<T, SupportTicketFindUniqueArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SupportTicket that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SupportTicketFindUniqueOrThrowArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupportTicketFindUniqueOrThrowArgs>(args: SelectSubset<T, SupportTicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SupportTicket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindFirstArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupportTicketFindFirstArgs>(args?: SelectSubset<T, SupportTicketFindFirstArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SupportTicket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindFirstOrThrowArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupportTicketFindFirstOrThrowArgs>(args?: SelectSubset<T, SupportTicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SupportTickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupportTickets
     * const supportTickets = await prisma.supportTicket.findMany()
     * 
     * // Get first 10 SupportTickets
     * const supportTickets = await prisma.supportTicket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supportTicketWithIdOnly = await prisma.supportTicket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupportTicketFindManyArgs>(args?: SelectSubset<T, SupportTicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SupportTicket.
     * @param {SupportTicketCreateArgs} args - Arguments to create a SupportTicket.
     * @example
     * // Create one SupportTicket
     * const SupportTicket = await prisma.supportTicket.create({
     *   data: {
     *     // ... data to create a SupportTicket
     *   }
     * })
     * 
     */
    create<T extends SupportTicketCreateArgs>(args: SelectSubset<T, SupportTicketCreateArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SupportTickets.
     * @param {SupportTicketCreateManyArgs} args - Arguments to create many SupportTickets.
     * @example
     * // Create many SupportTickets
     * const supportTicket = await prisma.supportTicket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupportTicketCreateManyArgs>(args?: SelectSubset<T, SupportTicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SupportTicket.
     * @param {SupportTicketDeleteArgs} args - Arguments to delete one SupportTicket.
     * @example
     * // Delete one SupportTicket
     * const SupportTicket = await prisma.supportTicket.delete({
     *   where: {
     *     // ... filter to delete one SupportTicket
     *   }
     * })
     * 
     */
    delete<T extends SupportTicketDeleteArgs>(args: SelectSubset<T, SupportTicketDeleteArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SupportTicket.
     * @param {SupportTicketUpdateArgs} args - Arguments to update one SupportTicket.
     * @example
     * // Update one SupportTicket
     * const supportTicket = await prisma.supportTicket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupportTicketUpdateArgs>(args: SelectSubset<T, SupportTicketUpdateArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SupportTickets.
     * @param {SupportTicketDeleteManyArgs} args - Arguments to filter SupportTickets to delete.
     * @example
     * // Delete a few SupportTickets
     * const { count } = await prisma.supportTicket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupportTicketDeleteManyArgs>(args?: SelectSubset<T, SupportTicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupportTickets
     * const supportTicket = await prisma.supportTicket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupportTicketUpdateManyArgs>(args: SelectSubset<T, SupportTicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SupportTicket.
     * @param {SupportTicketUpsertArgs} args - Arguments to update or create a SupportTicket.
     * @example
     * // Update or create a SupportTicket
     * const supportTicket = await prisma.supportTicket.upsert({
     *   create: {
     *     // ... data to create a SupportTicket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupportTicket we want to update
     *   }
     * })
     */
    upsert<T extends SupportTicketUpsertArgs>(args: SelectSubset<T, SupportTicketUpsertArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SupportTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketCountArgs} args - Arguments to filter SupportTickets to count.
     * @example
     * // Count the number of SupportTickets
     * const count = await prisma.supportTicket.count({
     *   where: {
     *     // ... the filter for the SupportTickets we want to count
     *   }
     * })
    **/
    count<T extends SupportTicketCountArgs>(
      args?: Subset<T, SupportTicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupportTicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupportTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SupportTicketAggregateArgs>(args: Subset<T, SupportTicketAggregateArgs>): Prisma.PrismaPromise<GetSupportTicketAggregateType<T>>

    /**
     * Group by SupportTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketGroupByArgs} args - Group by arguments.
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
      T extends SupportTicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupportTicketGroupByArgs['orderBy'] }
        : { orderBy?: SupportTicketGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SupportTicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupportTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupportTicket model
   */
  readonly fields: SupportTicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupportTicket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupportTicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requester<T extends SupportTicket$requesterArgs<ExtArgs> = {}>(args?: Subset<T, SupportTicket$requesterArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the SupportTicket model
   */ 
  interface SupportTicketFieldRefs {
    readonly id: FieldRef<"SupportTicket", 'String'>
    readonly requesterUserId: FieldRef<"SupportTicket", 'String'>
    readonly requesterEmail: FieldRef<"SupportTicket", 'String'>
    readonly subject: FieldRef<"SupportTicket", 'String'>
    readonly description: FieldRef<"SupportTicket", 'String'>
    readonly category: FieldRef<"SupportTicket", 'TicketCategory'>
    readonly priority: FieldRef<"SupportTicket", 'TicketPriority'>
    readonly status: FieldRef<"SupportTicket", 'TicketStatus'>
    readonly ownerAdminEmail: FieldRef<"SupportTicket", 'String'>
    readonly dueAt: FieldRef<"SupportTicket", 'DateTime'>
    readonly internalNotes: FieldRef<"SupportTicket", 'String'>
    readonly slaBreached: FieldRef<"SupportTicket", 'Boolean'>
    readonly firstResponseAt: FieldRef<"SupportTicket", 'DateTime'>
    readonly resolvedAt: FieldRef<"SupportTicket", 'DateTime'>
    readonly lastActivityAt: FieldRef<"SupportTicket", 'DateTime'>
    readonly createdAt: FieldRef<"SupportTicket", 'DateTime'>
    readonly updatedAt: FieldRef<"SupportTicket", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SupportTicket findUnique
   */
  export type SupportTicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket findUniqueOrThrow
   */
  export type SupportTicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket findFirst
   */
  export type SupportTicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportTickets.
     */
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket findFirstOrThrow
   */
  export type SupportTicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportTickets.
     */
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket findMany
   */
  export type SupportTicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTickets to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket create
   */
  export type SupportTicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The data needed to create a SupportTicket.
     */
    data: XOR<SupportTicketCreateInput, SupportTicketUncheckedCreateInput>
  }

  /**
   * SupportTicket createMany
   */
  export type SupportTicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupportTickets.
     */
    data: SupportTicketCreateManyInput | SupportTicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportTicket update
   */
  export type SupportTicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The data needed to update a SupportTicket.
     */
    data: XOR<SupportTicketUpdateInput, SupportTicketUncheckedUpdateInput>
    /**
     * Choose, which SupportTicket to update.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket updateMany
   */
  export type SupportTicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupportTickets.
     */
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyInput>
    /**
     * Filter which SupportTickets to update
     */
    where?: SupportTicketWhereInput
  }

  /**
   * SupportTicket upsert
   */
  export type SupportTicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The filter to search for the SupportTicket to update in case it exists.
     */
    where: SupportTicketWhereUniqueInput
    /**
     * In case the SupportTicket found by the `where` argument doesn't exist, create a new SupportTicket with this data.
     */
    create: XOR<SupportTicketCreateInput, SupportTicketUncheckedCreateInput>
    /**
     * In case the SupportTicket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupportTicketUpdateInput, SupportTicketUncheckedUpdateInput>
  }

  /**
   * SupportTicket delete
   */
  export type SupportTicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter which SupportTicket to delete.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket deleteMany
   */
  export type SupportTicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportTickets to delete
     */
    where?: SupportTicketWhereInput
  }

  /**
   * SupportTicket.requester
   */
  export type SupportTicket$requesterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * SupportTicket without action
   */
  export type SupportTicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    actorUserId: string | null
    actorEmail: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    reason: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    actorUserId: string | null
    actorEmail: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    reason: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    actorUserId: number
    actorEmail: number
    action: number
    entityType: number
    entityId: number
    reason: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    actorUserId?: true
    actorEmail?: true
    action?: true
    entityType?: true
    entityId?: true
    reason?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    actorUserId?: true
    actorEmail?: true
    action?: true
    entityType?: true
    entityId?: true
    reason?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    actorUserId?: true
    actorEmail?: true
    action?: true
    entityType?: true
    entityId?: true
    reason?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    actorUserId: string | null
    actorEmail: string | null
    action: string
    entityType: string
    entityId: string | null
    reason: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorUserId?: boolean
    actorEmail?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    reason?: boolean
    metadata?: boolean
    createdAt?: boolean
    actor?: boolean | AuditLog$actorArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>


  export type AuditLogSelectScalar = {
    id?: boolean
    actorUserId?: boolean
    actorEmail?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    reason?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actor?: boolean | AuditLog$actorArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      actor: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      actorUserId: string | null
      actorEmail: string | null
      action: string
      entityType: string
      entityId: string | null
      reason: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    actor<T extends AuditLog$actorArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$actorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly actorUserId: FieldRef<"AuditLog", 'String'>
    readonly actorEmail: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly reason: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog.actor
   */
  export type AuditLog$actorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model SmtpConfiguration
   */

  export type AggregateSmtpConfiguration = {
    _count: SmtpConfigurationCountAggregateOutputType | null
    _avg: SmtpConfigurationAvgAggregateOutputType | null
    _sum: SmtpConfigurationSumAggregateOutputType | null
    _min: SmtpConfigurationMinAggregateOutputType | null
    _max: SmtpConfigurationMaxAggregateOutputType | null
  }

  export type SmtpConfigurationAvgAggregateOutputType = {
    port: number | null
  }

  export type SmtpConfigurationSumAggregateOutputType = {
    port: number | null
  }

  export type SmtpConfigurationMinAggregateOutputType = {
    id: string | null
    host: string | null
    port: number | null
    secure: boolean | null
    username: string | null
    password: string | null
    fromName: string | null
    fromEmail: string | null
    isActive: boolean | null
    updatedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SmtpConfigurationMaxAggregateOutputType = {
    id: string | null
    host: string | null
    port: number | null
    secure: boolean | null
    username: string | null
    password: string | null
    fromName: string | null
    fromEmail: string | null
    isActive: boolean | null
    updatedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SmtpConfigurationCountAggregateOutputType = {
    id: number
    host: number
    port: number
    secure: number
    username: number
    password: number
    fromName: number
    fromEmail: number
    isActive: number
    updatedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SmtpConfigurationAvgAggregateInputType = {
    port?: true
  }

  export type SmtpConfigurationSumAggregateInputType = {
    port?: true
  }

  export type SmtpConfigurationMinAggregateInputType = {
    id?: true
    host?: true
    port?: true
    secure?: true
    username?: true
    password?: true
    fromName?: true
    fromEmail?: true
    isActive?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SmtpConfigurationMaxAggregateInputType = {
    id?: true
    host?: true
    port?: true
    secure?: true
    username?: true
    password?: true
    fromName?: true
    fromEmail?: true
    isActive?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SmtpConfigurationCountAggregateInputType = {
    id?: true
    host?: true
    port?: true
    secure?: true
    username?: true
    password?: true
    fromName?: true
    fromEmail?: true
    isActive?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SmtpConfigurationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SmtpConfiguration to aggregate.
     */
    where?: SmtpConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SmtpConfigurations to fetch.
     */
    orderBy?: SmtpConfigurationOrderByWithRelationInput | SmtpConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SmtpConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SmtpConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SmtpConfigurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SmtpConfigurations
    **/
    _count?: true | SmtpConfigurationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SmtpConfigurationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SmtpConfigurationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SmtpConfigurationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SmtpConfigurationMaxAggregateInputType
  }

  export type GetSmtpConfigurationAggregateType<T extends SmtpConfigurationAggregateArgs> = {
        [P in keyof T & keyof AggregateSmtpConfiguration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSmtpConfiguration[P]>
      : GetScalarType<T[P], AggregateSmtpConfiguration[P]>
  }




  export type SmtpConfigurationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SmtpConfigurationWhereInput
    orderBy?: SmtpConfigurationOrderByWithAggregationInput | SmtpConfigurationOrderByWithAggregationInput[]
    by: SmtpConfigurationScalarFieldEnum[] | SmtpConfigurationScalarFieldEnum
    having?: SmtpConfigurationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SmtpConfigurationCountAggregateInputType | true
    _avg?: SmtpConfigurationAvgAggregateInputType
    _sum?: SmtpConfigurationSumAggregateInputType
    _min?: SmtpConfigurationMinAggregateInputType
    _max?: SmtpConfigurationMaxAggregateInputType
  }

  export type SmtpConfigurationGroupByOutputType = {
    id: string
    host: string
    port: number
    secure: boolean
    username: string
    password: string
    fromName: string
    fromEmail: string
    isActive: boolean
    updatedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: SmtpConfigurationCountAggregateOutputType | null
    _avg: SmtpConfigurationAvgAggregateOutputType | null
    _sum: SmtpConfigurationSumAggregateOutputType | null
    _min: SmtpConfigurationMinAggregateOutputType | null
    _max: SmtpConfigurationMaxAggregateOutputType | null
  }

  type GetSmtpConfigurationGroupByPayload<T extends SmtpConfigurationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SmtpConfigurationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SmtpConfigurationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SmtpConfigurationGroupByOutputType[P]>
            : GetScalarType<T[P], SmtpConfigurationGroupByOutputType[P]>
        }
      >
    >


  export type SmtpConfigurationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    host?: boolean
    port?: boolean
    secure?: boolean
    username?: boolean
    password?: boolean
    fromName?: boolean
    fromEmail?: boolean
    isActive?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["smtpConfiguration"]>


  export type SmtpConfigurationSelectScalar = {
    id?: boolean
    host?: boolean
    port?: boolean
    secure?: boolean
    username?: boolean
    password?: boolean
    fromName?: boolean
    fromEmail?: boolean
    isActive?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $SmtpConfigurationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SmtpConfiguration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      host: string
      port: number
      secure: boolean
      username: string
      password: string
      fromName: string
      fromEmail: string
      isActive: boolean
      updatedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["smtpConfiguration"]>
    composites: {}
  }

  type SmtpConfigurationGetPayload<S extends boolean | null | undefined | SmtpConfigurationDefaultArgs> = $Result.GetResult<Prisma.$SmtpConfigurationPayload, S>

  type SmtpConfigurationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SmtpConfigurationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SmtpConfigurationCountAggregateInputType | true
    }

  export interface SmtpConfigurationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SmtpConfiguration'], meta: { name: 'SmtpConfiguration' } }
    /**
     * Find zero or one SmtpConfiguration that matches the filter.
     * @param {SmtpConfigurationFindUniqueArgs} args - Arguments to find a SmtpConfiguration
     * @example
     * // Get one SmtpConfiguration
     * const smtpConfiguration = await prisma.smtpConfiguration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SmtpConfigurationFindUniqueArgs>(args: SelectSubset<T, SmtpConfigurationFindUniqueArgs<ExtArgs>>): Prisma__SmtpConfigurationClient<$Result.GetResult<Prisma.$SmtpConfigurationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SmtpConfiguration that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SmtpConfigurationFindUniqueOrThrowArgs} args - Arguments to find a SmtpConfiguration
     * @example
     * // Get one SmtpConfiguration
     * const smtpConfiguration = await prisma.smtpConfiguration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SmtpConfigurationFindUniqueOrThrowArgs>(args: SelectSubset<T, SmtpConfigurationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SmtpConfigurationClient<$Result.GetResult<Prisma.$SmtpConfigurationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SmtpConfiguration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmtpConfigurationFindFirstArgs} args - Arguments to find a SmtpConfiguration
     * @example
     * // Get one SmtpConfiguration
     * const smtpConfiguration = await prisma.smtpConfiguration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SmtpConfigurationFindFirstArgs>(args?: SelectSubset<T, SmtpConfigurationFindFirstArgs<ExtArgs>>): Prisma__SmtpConfigurationClient<$Result.GetResult<Prisma.$SmtpConfigurationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SmtpConfiguration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmtpConfigurationFindFirstOrThrowArgs} args - Arguments to find a SmtpConfiguration
     * @example
     * // Get one SmtpConfiguration
     * const smtpConfiguration = await prisma.smtpConfiguration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SmtpConfigurationFindFirstOrThrowArgs>(args?: SelectSubset<T, SmtpConfigurationFindFirstOrThrowArgs<ExtArgs>>): Prisma__SmtpConfigurationClient<$Result.GetResult<Prisma.$SmtpConfigurationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SmtpConfigurations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmtpConfigurationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SmtpConfigurations
     * const smtpConfigurations = await prisma.smtpConfiguration.findMany()
     * 
     * // Get first 10 SmtpConfigurations
     * const smtpConfigurations = await prisma.smtpConfiguration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const smtpConfigurationWithIdOnly = await prisma.smtpConfiguration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SmtpConfigurationFindManyArgs>(args?: SelectSubset<T, SmtpConfigurationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SmtpConfigurationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SmtpConfiguration.
     * @param {SmtpConfigurationCreateArgs} args - Arguments to create a SmtpConfiguration.
     * @example
     * // Create one SmtpConfiguration
     * const SmtpConfiguration = await prisma.smtpConfiguration.create({
     *   data: {
     *     // ... data to create a SmtpConfiguration
     *   }
     * })
     * 
     */
    create<T extends SmtpConfigurationCreateArgs>(args: SelectSubset<T, SmtpConfigurationCreateArgs<ExtArgs>>): Prisma__SmtpConfigurationClient<$Result.GetResult<Prisma.$SmtpConfigurationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SmtpConfigurations.
     * @param {SmtpConfigurationCreateManyArgs} args - Arguments to create many SmtpConfigurations.
     * @example
     * // Create many SmtpConfigurations
     * const smtpConfiguration = await prisma.smtpConfiguration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SmtpConfigurationCreateManyArgs>(args?: SelectSubset<T, SmtpConfigurationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SmtpConfiguration.
     * @param {SmtpConfigurationDeleteArgs} args - Arguments to delete one SmtpConfiguration.
     * @example
     * // Delete one SmtpConfiguration
     * const SmtpConfiguration = await prisma.smtpConfiguration.delete({
     *   where: {
     *     // ... filter to delete one SmtpConfiguration
     *   }
     * })
     * 
     */
    delete<T extends SmtpConfigurationDeleteArgs>(args: SelectSubset<T, SmtpConfigurationDeleteArgs<ExtArgs>>): Prisma__SmtpConfigurationClient<$Result.GetResult<Prisma.$SmtpConfigurationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SmtpConfiguration.
     * @param {SmtpConfigurationUpdateArgs} args - Arguments to update one SmtpConfiguration.
     * @example
     * // Update one SmtpConfiguration
     * const smtpConfiguration = await prisma.smtpConfiguration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SmtpConfigurationUpdateArgs>(args: SelectSubset<T, SmtpConfigurationUpdateArgs<ExtArgs>>): Prisma__SmtpConfigurationClient<$Result.GetResult<Prisma.$SmtpConfigurationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SmtpConfigurations.
     * @param {SmtpConfigurationDeleteManyArgs} args - Arguments to filter SmtpConfigurations to delete.
     * @example
     * // Delete a few SmtpConfigurations
     * const { count } = await prisma.smtpConfiguration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SmtpConfigurationDeleteManyArgs>(args?: SelectSubset<T, SmtpConfigurationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SmtpConfigurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmtpConfigurationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SmtpConfigurations
     * const smtpConfiguration = await prisma.smtpConfiguration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SmtpConfigurationUpdateManyArgs>(args: SelectSubset<T, SmtpConfigurationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SmtpConfiguration.
     * @param {SmtpConfigurationUpsertArgs} args - Arguments to update or create a SmtpConfiguration.
     * @example
     * // Update or create a SmtpConfiguration
     * const smtpConfiguration = await prisma.smtpConfiguration.upsert({
     *   create: {
     *     // ... data to create a SmtpConfiguration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SmtpConfiguration we want to update
     *   }
     * })
     */
    upsert<T extends SmtpConfigurationUpsertArgs>(args: SelectSubset<T, SmtpConfigurationUpsertArgs<ExtArgs>>): Prisma__SmtpConfigurationClient<$Result.GetResult<Prisma.$SmtpConfigurationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SmtpConfigurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmtpConfigurationCountArgs} args - Arguments to filter SmtpConfigurations to count.
     * @example
     * // Count the number of SmtpConfigurations
     * const count = await prisma.smtpConfiguration.count({
     *   where: {
     *     // ... the filter for the SmtpConfigurations we want to count
     *   }
     * })
    **/
    count<T extends SmtpConfigurationCountArgs>(
      args?: Subset<T, SmtpConfigurationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SmtpConfigurationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SmtpConfiguration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmtpConfigurationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SmtpConfigurationAggregateArgs>(args: Subset<T, SmtpConfigurationAggregateArgs>): Prisma.PrismaPromise<GetSmtpConfigurationAggregateType<T>>

    /**
     * Group by SmtpConfiguration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmtpConfigurationGroupByArgs} args - Group by arguments.
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
      T extends SmtpConfigurationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SmtpConfigurationGroupByArgs['orderBy'] }
        : { orderBy?: SmtpConfigurationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SmtpConfigurationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSmtpConfigurationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SmtpConfiguration model
   */
  readonly fields: SmtpConfigurationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SmtpConfiguration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SmtpConfigurationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SmtpConfiguration model
   */ 
  interface SmtpConfigurationFieldRefs {
    readonly id: FieldRef<"SmtpConfiguration", 'String'>
    readonly host: FieldRef<"SmtpConfiguration", 'String'>
    readonly port: FieldRef<"SmtpConfiguration", 'Int'>
    readonly secure: FieldRef<"SmtpConfiguration", 'Boolean'>
    readonly username: FieldRef<"SmtpConfiguration", 'String'>
    readonly password: FieldRef<"SmtpConfiguration", 'String'>
    readonly fromName: FieldRef<"SmtpConfiguration", 'String'>
    readonly fromEmail: FieldRef<"SmtpConfiguration", 'String'>
    readonly isActive: FieldRef<"SmtpConfiguration", 'Boolean'>
    readonly updatedBy: FieldRef<"SmtpConfiguration", 'String'>
    readonly createdAt: FieldRef<"SmtpConfiguration", 'DateTime'>
    readonly updatedAt: FieldRef<"SmtpConfiguration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SmtpConfiguration findUnique
   */
  export type SmtpConfigurationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmtpConfiguration
     */
    select?: SmtpConfigurationSelect<ExtArgs> | null
    /**
     * Filter, which SmtpConfiguration to fetch.
     */
    where: SmtpConfigurationWhereUniqueInput
  }

  /**
   * SmtpConfiguration findUniqueOrThrow
   */
  export type SmtpConfigurationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmtpConfiguration
     */
    select?: SmtpConfigurationSelect<ExtArgs> | null
    /**
     * Filter, which SmtpConfiguration to fetch.
     */
    where: SmtpConfigurationWhereUniqueInput
  }

  /**
   * SmtpConfiguration findFirst
   */
  export type SmtpConfigurationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmtpConfiguration
     */
    select?: SmtpConfigurationSelect<ExtArgs> | null
    /**
     * Filter, which SmtpConfiguration to fetch.
     */
    where?: SmtpConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SmtpConfigurations to fetch.
     */
    orderBy?: SmtpConfigurationOrderByWithRelationInput | SmtpConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SmtpConfigurations.
     */
    cursor?: SmtpConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SmtpConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SmtpConfigurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SmtpConfigurations.
     */
    distinct?: SmtpConfigurationScalarFieldEnum | SmtpConfigurationScalarFieldEnum[]
  }

  /**
   * SmtpConfiguration findFirstOrThrow
   */
  export type SmtpConfigurationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmtpConfiguration
     */
    select?: SmtpConfigurationSelect<ExtArgs> | null
    /**
     * Filter, which SmtpConfiguration to fetch.
     */
    where?: SmtpConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SmtpConfigurations to fetch.
     */
    orderBy?: SmtpConfigurationOrderByWithRelationInput | SmtpConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SmtpConfigurations.
     */
    cursor?: SmtpConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SmtpConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SmtpConfigurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SmtpConfigurations.
     */
    distinct?: SmtpConfigurationScalarFieldEnum | SmtpConfigurationScalarFieldEnum[]
  }

  /**
   * SmtpConfiguration findMany
   */
  export type SmtpConfigurationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmtpConfiguration
     */
    select?: SmtpConfigurationSelect<ExtArgs> | null
    /**
     * Filter, which SmtpConfigurations to fetch.
     */
    where?: SmtpConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SmtpConfigurations to fetch.
     */
    orderBy?: SmtpConfigurationOrderByWithRelationInput | SmtpConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SmtpConfigurations.
     */
    cursor?: SmtpConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SmtpConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SmtpConfigurations.
     */
    skip?: number
    distinct?: SmtpConfigurationScalarFieldEnum | SmtpConfigurationScalarFieldEnum[]
  }

  /**
   * SmtpConfiguration create
   */
  export type SmtpConfigurationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmtpConfiguration
     */
    select?: SmtpConfigurationSelect<ExtArgs> | null
    /**
     * The data needed to create a SmtpConfiguration.
     */
    data: XOR<SmtpConfigurationCreateInput, SmtpConfigurationUncheckedCreateInput>
  }

  /**
   * SmtpConfiguration createMany
   */
  export type SmtpConfigurationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SmtpConfigurations.
     */
    data: SmtpConfigurationCreateManyInput | SmtpConfigurationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SmtpConfiguration update
   */
  export type SmtpConfigurationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmtpConfiguration
     */
    select?: SmtpConfigurationSelect<ExtArgs> | null
    /**
     * The data needed to update a SmtpConfiguration.
     */
    data: XOR<SmtpConfigurationUpdateInput, SmtpConfigurationUncheckedUpdateInput>
    /**
     * Choose, which SmtpConfiguration to update.
     */
    where: SmtpConfigurationWhereUniqueInput
  }

  /**
   * SmtpConfiguration updateMany
   */
  export type SmtpConfigurationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SmtpConfigurations.
     */
    data: XOR<SmtpConfigurationUpdateManyMutationInput, SmtpConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which SmtpConfigurations to update
     */
    where?: SmtpConfigurationWhereInput
  }

  /**
   * SmtpConfiguration upsert
   */
  export type SmtpConfigurationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmtpConfiguration
     */
    select?: SmtpConfigurationSelect<ExtArgs> | null
    /**
     * The filter to search for the SmtpConfiguration to update in case it exists.
     */
    where: SmtpConfigurationWhereUniqueInput
    /**
     * In case the SmtpConfiguration found by the `where` argument doesn't exist, create a new SmtpConfiguration with this data.
     */
    create: XOR<SmtpConfigurationCreateInput, SmtpConfigurationUncheckedCreateInput>
    /**
     * In case the SmtpConfiguration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SmtpConfigurationUpdateInput, SmtpConfigurationUncheckedUpdateInput>
  }

  /**
   * SmtpConfiguration delete
   */
  export type SmtpConfigurationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmtpConfiguration
     */
    select?: SmtpConfigurationSelect<ExtArgs> | null
    /**
     * Filter which SmtpConfiguration to delete.
     */
    where: SmtpConfigurationWhereUniqueInput
  }

  /**
   * SmtpConfiguration deleteMany
   */
  export type SmtpConfigurationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SmtpConfigurations to delete
     */
    where?: SmtpConfigurationWhereInput
  }

  /**
   * SmtpConfiguration without action
   */
  export type SmtpConfigurationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmtpConfiguration
     */
    select?: SmtpConfigurationSelect<ExtArgs> | null
  }


  /**
   * Model AdminSetting
   */

  export type AggregateAdminSetting = {
    _count: AdminSettingCountAggregateOutputType | null
    _min: AdminSettingMinAggregateOutputType | null
    _max: AdminSettingMaxAggregateOutputType | null
  }

  export type AdminSettingMinAggregateOutputType = {
    id: string | null
    key: string | null
    updatedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminSettingMaxAggregateOutputType = {
    id: string | null
    key: string | null
    updatedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminSettingCountAggregateOutputType = {
    id: number
    key: number
    value: number
    updatedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminSettingMinAggregateInputType = {
    id?: true
    key?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminSettingMaxAggregateInputType = {
    id?: true
    key?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminSettingCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminSetting to aggregate.
     */
    where?: AdminSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingOrderByWithRelationInput | AdminSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminSettings
    **/
    _count?: true | AdminSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminSettingMaxAggregateInputType
  }

  export type GetAdminSettingAggregateType<T extends AdminSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminSetting[P]>
      : GetScalarType<T[P], AggregateAdminSetting[P]>
  }




  export type AdminSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminSettingWhereInput
    orderBy?: AdminSettingOrderByWithAggregationInput | AdminSettingOrderByWithAggregationInput[]
    by: AdminSettingScalarFieldEnum[] | AdminSettingScalarFieldEnum
    having?: AdminSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminSettingCountAggregateInputType | true
    _min?: AdminSettingMinAggregateInputType
    _max?: AdminSettingMaxAggregateInputType
  }

  export type AdminSettingGroupByOutputType = {
    id: string
    key: string
    value: JsonValue
    updatedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: AdminSettingCountAggregateOutputType | null
    _min: AdminSettingMinAggregateOutputType | null
    _max: AdminSettingMaxAggregateOutputType | null
  }

  type GetAdminSettingGroupByPayload<T extends AdminSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminSettingGroupByOutputType[P]>
            : GetScalarType<T[P], AdminSettingGroupByOutputType[P]>
        }
      >
    >


  export type AdminSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminSetting"]>


  export type AdminSettingSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $AdminSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: Prisma.JsonValue
      updatedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adminSetting"]>
    composites: {}
  }

  type AdminSettingGetPayload<S extends boolean | null | undefined | AdminSettingDefaultArgs> = $Result.GetResult<Prisma.$AdminSettingPayload, S>

  type AdminSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminSettingCountAggregateInputType | true
    }

  export interface AdminSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminSetting'], meta: { name: 'AdminSetting' } }
    /**
     * Find zero or one AdminSetting that matches the filter.
     * @param {AdminSettingFindUniqueArgs} args - Arguments to find a AdminSetting
     * @example
     * // Get one AdminSetting
     * const adminSetting = await prisma.adminSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminSettingFindUniqueArgs>(args: SelectSubset<T, AdminSettingFindUniqueArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AdminSetting that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminSettingFindUniqueOrThrowArgs} args - Arguments to find a AdminSetting
     * @example
     * // Get one AdminSetting
     * const adminSetting = await prisma.adminSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AdminSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingFindFirstArgs} args - Arguments to find a AdminSetting
     * @example
     * // Get one AdminSetting
     * const adminSetting = await prisma.adminSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminSettingFindFirstArgs>(args?: SelectSubset<T, AdminSettingFindFirstArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AdminSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingFindFirstOrThrowArgs} args - Arguments to find a AdminSetting
     * @example
     * // Get one AdminSetting
     * const adminSetting = await prisma.adminSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AdminSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminSettings
     * const adminSettings = await prisma.adminSetting.findMany()
     * 
     * // Get first 10 AdminSettings
     * const adminSettings = await prisma.adminSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminSettingWithIdOnly = await prisma.adminSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminSettingFindManyArgs>(args?: SelectSubset<T, AdminSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AdminSetting.
     * @param {AdminSettingCreateArgs} args - Arguments to create a AdminSetting.
     * @example
     * // Create one AdminSetting
     * const AdminSetting = await prisma.adminSetting.create({
     *   data: {
     *     // ... data to create a AdminSetting
     *   }
     * })
     * 
     */
    create<T extends AdminSettingCreateArgs>(args: SelectSubset<T, AdminSettingCreateArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AdminSettings.
     * @param {AdminSettingCreateManyArgs} args - Arguments to create many AdminSettings.
     * @example
     * // Create many AdminSettings
     * const adminSetting = await prisma.adminSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminSettingCreateManyArgs>(args?: SelectSubset<T, AdminSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AdminSetting.
     * @param {AdminSettingDeleteArgs} args - Arguments to delete one AdminSetting.
     * @example
     * // Delete one AdminSetting
     * const AdminSetting = await prisma.adminSetting.delete({
     *   where: {
     *     // ... filter to delete one AdminSetting
     *   }
     * })
     * 
     */
    delete<T extends AdminSettingDeleteArgs>(args: SelectSubset<T, AdminSettingDeleteArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AdminSetting.
     * @param {AdminSettingUpdateArgs} args - Arguments to update one AdminSetting.
     * @example
     * // Update one AdminSetting
     * const adminSetting = await prisma.adminSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminSettingUpdateArgs>(args: SelectSubset<T, AdminSettingUpdateArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AdminSettings.
     * @param {AdminSettingDeleteManyArgs} args - Arguments to filter AdminSettings to delete.
     * @example
     * // Delete a few AdminSettings
     * const { count } = await prisma.adminSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminSettingDeleteManyArgs>(args?: SelectSubset<T, AdminSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminSettings
     * const adminSetting = await prisma.adminSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminSettingUpdateManyArgs>(args: SelectSubset<T, AdminSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminSetting.
     * @param {AdminSettingUpsertArgs} args - Arguments to update or create a AdminSetting.
     * @example
     * // Update or create a AdminSetting
     * const adminSetting = await prisma.adminSetting.upsert({
     *   create: {
     *     // ... data to create a AdminSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminSetting we want to update
     *   }
     * })
     */
    upsert<T extends AdminSettingUpsertArgs>(args: SelectSubset<T, AdminSettingUpsertArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingCountArgs} args - Arguments to filter AdminSettings to count.
     * @example
     * // Count the number of AdminSettings
     * const count = await prisma.adminSetting.count({
     *   where: {
     *     // ... the filter for the AdminSettings we want to count
     *   }
     * })
    **/
    count<T extends AdminSettingCountArgs>(
      args?: Subset<T, AdminSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminSettingAggregateArgs>(args: Subset<T, AdminSettingAggregateArgs>): Prisma.PrismaPromise<GetAdminSettingAggregateType<T>>

    /**
     * Group by AdminSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingGroupByArgs} args - Group by arguments.
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
      T extends AdminSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminSettingGroupByArgs['orderBy'] }
        : { orderBy?: AdminSettingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminSetting model
   */
  readonly fields: AdminSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AdminSetting model
   */ 
  interface AdminSettingFieldRefs {
    readonly id: FieldRef<"AdminSetting", 'String'>
    readonly key: FieldRef<"AdminSetting", 'String'>
    readonly value: FieldRef<"AdminSetting", 'Json'>
    readonly updatedBy: FieldRef<"AdminSetting", 'String'>
    readonly createdAt: FieldRef<"AdminSetting", 'DateTime'>
    readonly updatedAt: FieldRef<"AdminSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminSetting findUnique
   */
  export type AdminSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Filter, which AdminSetting to fetch.
     */
    where: AdminSettingWhereUniqueInput
  }

  /**
   * AdminSetting findUniqueOrThrow
   */
  export type AdminSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Filter, which AdminSetting to fetch.
     */
    where: AdminSettingWhereUniqueInput
  }

  /**
   * AdminSetting findFirst
   */
  export type AdminSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Filter, which AdminSetting to fetch.
     */
    where?: AdminSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingOrderByWithRelationInput | AdminSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminSettings.
     */
    cursor?: AdminSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminSettings.
     */
    distinct?: AdminSettingScalarFieldEnum | AdminSettingScalarFieldEnum[]
  }

  /**
   * AdminSetting findFirstOrThrow
   */
  export type AdminSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Filter, which AdminSetting to fetch.
     */
    where?: AdminSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingOrderByWithRelationInput | AdminSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminSettings.
     */
    cursor?: AdminSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminSettings.
     */
    distinct?: AdminSettingScalarFieldEnum | AdminSettingScalarFieldEnum[]
  }

  /**
   * AdminSetting findMany
   */
  export type AdminSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where?: AdminSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingOrderByWithRelationInput | AdminSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminSettings.
     */
    cursor?: AdminSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    distinct?: AdminSettingScalarFieldEnum | AdminSettingScalarFieldEnum[]
  }

  /**
   * AdminSetting create
   */
  export type AdminSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * The data needed to create a AdminSetting.
     */
    data: XOR<AdminSettingCreateInput, AdminSettingUncheckedCreateInput>
  }

  /**
   * AdminSetting createMany
   */
  export type AdminSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminSettings.
     */
    data: AdminSettingCreateManyInput | AdminSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminSetting update
   */
  export type AdminSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * The data needed to update a AdminSetting.
     */
    data: XOR<AdminSettingUpdateInput, AdminSettingUncheckedUpdateInput>
    /**
     * Choose, which AdminSetting to update.
     */
    where: AdminSettingWhereUniqueInput
  }

  /**
   * AdminSetting updateMany
   */
  export type AdminSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminSettings.
     */
    data: XOR<AdminSettingUpdateManyMutationInput, AdminSettingUncheckedUpdateManyInput>
    /**
     * Filter which AdminSettings to update
     */
    where?: AdminSettingWhereInput
  }

  /**
   * AdminSetting upsert
   */
  export type AdminSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * The filter to search for the AdminSetting to update in case it exists.
     */
    where: AdminSettingWhereUniqueInput
    /**
     * In case the AdminSetting found by the `where` argument doesn't exist, create a new AdminSetting with this data.
     */
    create: XOR<AdminSettingCreateInput, AdminSettingUncheckedCreateInput>
    /**
     * In case the AdminSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminSettingUpdateInput, AdminSettingUncheckedUpdateInput>
  }

  /**
   * AdminSetting delete
   */
  export type AdminSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Filter which AdminSetting to delete.
     */
    where: AdminSettingWhereUniqueInput
  }

  /**
   * AdminSetting deleteMany
   */
  export type AdminSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminSettings to delete
     */
    where?: AdminSettingWhereInput
  }

  /**
   * AdminSetting without action
   */
  export type AdminSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    userType: 'userType',
    isEmailVerified: 'isEmailVerified',
    isAdmin: 'isAdmin',
    adminRole: 'adminRole',
    verificationToken: 'verificationToken',
    resetToken: 'resetToken',
    resetTokenExpiry: 'resetTokenExpiry',
    isSuspended: 'isSuspended',
    suspensionReason: 'suspensionReason',
    suspendedAt: 'suspendedAt',
    softBannedAt: 'softBannedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    description: 'description',
    website: 'website',
    industry: 'industry',
    location: 'location',
    phone: 'phone',
    logo: 'logo',
    companyTaxId: 'companyTaxId',
    isVerified: 'isVerified',
    registrationDoc: 'registrationDoc',
    internIntake: 'internIntake',
    mapLocation: 'mapLocation',
    benefits: 'benefits',
    hiringPriorities: 'hiringPriorities',
    candidateRequirements: 'candidateRequirements',
    hiringWorkflow: 'hiringWorkflow',
    companySize: 'companySize',
    contactEmail: 'contactEmail',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const InternScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    studentId: 'studentId',
    dateOfBirth: 'dateOfBirth',
    ghanaCardNumber: 'ghanaCardNumber',
    ghanaCardDocument: 'ghanaCardDocument',
    isVerified: 'isVerified',
    notifyIndustryJobs: 'notifyIndustryJobs',
    preferredIndustry: 'preferredIndustry',
    firstName: 'firstName',
    lastName: 'lastName',
    bio: 'bio',
    phone: 'phone',
    skills: 'skills',
    education: 'education',
    educationWebsite: 'educationWebsite',
    experience: 'experience',
    location: 'location',
    resume: 'resume',
    profilePic: 'profilePic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InternScalarFieldEnum = (typeof InternScalarFieldEnum)[keyof typeof InternScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    title: 'title',
    description: 'description',
    requirements: 'requirements',
    responsibilities: 'responsibilities',
    benefits: 'benefits',
    location: 'location',
    remote: 'remote',
    duration: 'duration',
    stipend: 'stipend',
    skills: 'skills',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const ApplicationScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    internId: 'internId',
    status: 'status',
    coverLetter: 'coverLetter',
    appliedAt: 'appliedAt',
    reviewedAt: 'reviewedAt',
    updatedAt: 'updatedAt'
  };

  export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    message: 'message',
    type: 'type',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SupportTicketScalarFieldEnum: {
    id: 'id',
    requesterUserId: 'requesterUserId',
    requesterEmail: 'requesterEmail',
    subject: 'subject',
    description: 'description',
    category: 'category',
    priority: 'priority',
    status: 'status',
    ownerAdminEmail: 'ownerAdminEmail',
    dueAt: 'dueAt',
    internalNotes: 'internalNotes',
    slaBreached: 'slaBreached',
    firstResponseAt: 'firstResponseAt',
    resolvedAt: 'resolvedAt',
    lastActivityAt: 'lastActivityAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SupportTicketScalarFieldEnum = (typeof SupportTicketScalarFieldEnum)[keyof typeof SupportTicketScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    actorUserId: 'actorUserId',
    actorEmail: 'actorEmail',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    reason: 'reason',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SmtpConfigurationScalarFieldEnum: {
    id: 'id',
    host: 'host',
    port: 'port',
    secure: 'secure',
    username: 'username',
    password: 'password',
    fromName: 'fromName',
    fromEmail: 'fromEmail',
    isActive: 'isActive',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SmtpConfigurationScalarFieldEnum = (typeof SmtpConfigurationScalarFieldEnum)[keyof typeof SmtpConfigurationScalarFieldEnum]


  export const AdminSettingScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminSettingScalarFieldEnum = (typeof AdminSettingScalarFieldEnum)[keyof typeof AdminSettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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
   * Reference to a field of type 'UserType'
   */
  export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'AdminRole'
   */
  export type EnumAdminRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRole'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'ApplicationStatus'
   */
  export type EnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus'>
    


  /**
   * Reference to a field of type 'TicketCategory'
   */
  export type EnumTicketCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketCategory'>
    


  /**
   * Reference to a field of type 'TicketPriority'
   */
  export type EnumTicketPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketPriority'>
    


  /**
   * Reference to a field of type 'TicketStatus'
   */
  export type EnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    isEmailVerified?: BoolFilter<"User"> | boolean
    isAdmin?: BoolFilter<"User"> | boolean
    adminRole?: EnumAdminRoleNullableFilter<"User"> | $Enums.AdminRole | null
    verificationToken?: StringNullableFilter<"User"> | string | null
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    isSuspended?: BoolFilter<"User"> | boolean
    suspensionReason?: StringNullableFilter<"User"> | string | null
    suspendedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    softBannedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyNullableRelationFilter, CompanyWhereInput> | null
    intern?: XOR<InternNullableRelationFilter, InternWhereInput> | null
    notifications?: NotificationListRelationFilter
    supportTickets?: SupportTicketListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    isEmailVerified?: SortOrder
    isAdmin?: SortOrder
    adminRole?: SortOrderInput | SortOrder
    verificationToken?: SortOrderInput | SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    isSuspended?: SortOrder
    suspensionReason?: SortOrderInput | SortOrder
    suspendedAt?: SortOrderInput | SortOrder
    softBannedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    intern?: InternOrderByWithRelationInput
    notifications?: NotificationOrderByRelationAggregateInput
    supportTickets?: SupportTicketOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    isEmailVerified?: BoolFilter<"User"> | boolean
    isAdmin?: BoolFilter<"User"> | boolean
    adminRole?: EnumAdminRoleNullableFilter<"User"> | $Enums.AdminRole | null
    verificationToken?: StringNullableFilter<"User"> | string | null
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    isSuspended?: BoolFilter<"User"> | boolean
    suspensionReason?: StringNullableFilter<"User"> | string | null
    suspendedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    softBannedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyNullableRelationFilter, CompanyWhereInput> | null
    intern?: XOR<InternNullableRelationFilter, InternWhereInput> | null
    notifications?: NotificationListRelationFilter
    supportTickets?: SupportTicketListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    isEmailVerified?: SortOrder
    isAdmin?: SortOrder
    adminRole?: SortOrderInput | SortOrder
    verificationToken?: SortOrderInput | SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    isSuspended?: SortOrder
    suspensionReason?: SortOrderInput | SortOrder
    suspendedAt?: SortOrderInput | SortOrder
    softBannedAt?: SortOrderInput | SortOrder
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
    password?: StringWithAggregatesFilter<"User"> | string
    userType?: EnumUserTypeWithAggregatesFilter<"User"> | $Enums.UserType
    isEmailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    adminRole?: EnumAdminRoleNullableWithAggregatesFilter<"User"> | $Enums.AdminRole | null
    verificationToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isSuspended?: BoolWithAggregatesFilter<"User"> | boolean
    suspensionReason?: StringNullableWithAggregatesFilter<"User"> | string | null
    suspendedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    softBannedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    userId?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    description?: StringNullableFilter<"Company"> | string | null
    website?: StringNullableFilter<"Company"> | string | null
    industry?: StringNullableFilter<"Company"> | string | null
    location?: StringNullableFilter<"Company"> | string | null
    phone?: StringNullableFilter<"Company"> | string | null
    logo?: StringNullableFilter<"Company"> | string | null
    companyTaxId?: StringNullableFilter<"Company"> | string | null
    isVerified?: BoolFilter<"Company"> | boolean
    registrationDoc?: StringNullableFilter<"Company"> | string | null
    internIntake?: StringNullableFilter<"Company"> | string | null
    mapLocation?: StringNullableFilter<"Company"> | string | null
    benefits?: StringNullableFilter<"Company"> | string | null
    hiringPriorities?: StringNullableFilter<"Company"> | string | null
    candidateRequirements?: StringNullableFilter<"Company"> | string | null
    hiringWorkflow?: StringNullableFilter<"Company"> | string | null
    companySize?: StringNullableFilter<"Company"> | string | null
    contactEmail?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    jobs?: JobListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    companyTaxId?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    registrationDoc?: SortOrderInput | SortOrder
    internIntake?: SortOrderInput | SortOrder
    mapLocation?: SortOrderInput | SortOrder
    benefits?: SortOrderInput | SortOrder
    hiringPriorities?: SortOrderInput | SortOrder
    candidateRequirements?: SortOrderInput | SortOrder
    hiringWorkflow?: SortOrderInput | SortOrder
    companySize?: SortOrderInput | SortOrder
    contactEmail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    jobs?: JobOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    name?: StringFilter<"Company"> | string
    description?: StringNullableFilter<"Company"> | string | null
    website?: StringNullableFilter<"Company"> | string | null
    industry?: StringNullableFilter<"Company"> | string | null
    location?: StringNullableFilter<"Company"> | string | null
    phone?: StringNullableFilter<"Company"> | string | null
    logo?: StringNullableFilter<"Company"> | string | null
    companyTaxId?: StringNullableFilter<"Company"> | string | null
    isVerified?: BoolFilter<"Company"> | boolean
    registrationDoc?: StringNullableFilter<"Company"> | string | null
    internIntake?: StringNullableFilter<"Company"> | string | null
    mapLocation?: StringNullableFilter<"Company"> | string | null
    benefits?: StringNullableFilter<"Company"> | string | null
    hiringPriorities?: StringNullableFilter<"Company"> | string | null
    candidateRequirements?: StringNullableFilter<"Company"> | string | null
    hiringWorkflow?: StringNullableFilter<"Company"> | string | null
    companySize?: StringNullableFilter<"Company"> | string | null
    contactEmail?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    jobs?: JobListRelationFilter
  }, "id" | "userId">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    companyTaxId?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    registrationDoc?: SortOrderInput | SortOrder
    internIntake?: SortOrderInput | SortOrder
    mapLocation?: SortOrderInput | SortOrder
    benefits?: SortOrderInput | SortOrder
    hiringPriorities?: SortOrderInput | SortOrder
    candidateRequirements?: SortOrderInput | SortOrder
    hiringWorkflow?: SortOrderInput | SortOrder
    companySize?: SortOrderInput | SortOrder
    contactEmail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    userId?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
    description?: StringNullableWithAggregatesFilter<"Company"> | string | null
    website?: StringNullableWithAggregatesFilter<"Company"> | string | null
    industry?: StringNullableWithAggregatesFilter<"Company"> | string | null
    location?: StringNullableWithAggregatesFilter<"Company"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Company"> | string | null
    logo?: StringNullableWithAggregatesFilter<"Company"> | string | null
    companyTaxId?: StringNullableWithAggregatesFilter<"Company"> | string | null
    isVerified?: BoolWithAggregatesFilter<"Company"> | boolean
    registrationDoc?: StringNullableWithAggregatesFilter<"Company"> | string | null
    internIntake?: StringNullableWithAggregatesFilter<"Company"> | string | null
    mapLocation?: StringNullableWithAggregatesFilter<"Company"> | string | null
    benefits?: StringNullableWithAggregatesFilter<"Company"> | string | null
    hiringPriorities?: StringNullableWithAggregatesFilter<"Company"> | string | null
    candidateRequirements?: StringNullableWithAggregatesFilter<"Company"> | string | null
    hiringWorkflow?: StringNullableWithAggregatesFilter<"Company"> | string | null
    companySize?: StringNullableWithAggregatesFilter<"Company"> | string | null
    contactEmail?: StringNullableWithAggregatesFilter<"Company"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type InternWhereInput = {
    AND?: InternWhereInput | InternWhereInput[]
    OR?: InternWhereInput[]
    NOT?: InternWhereInput | InternWhereInput[]
    id?: StringFilter<"Intern"> | string
    userId?: StringFilter<"Intern"> | string
    studentId?: StringNullableFilter<"Intern"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Intern"> | Date | string | null
    ghanaCardNumber?: StringNullableFilter<"Intern"> | string | null
    ghanaCardDocument?: StringNullableFilter<"Intern"> | string | null
    isVerified?: BoolFilter<"Intern"> | boolean
    notifyIndustryJobs?: BoolFilter<"Intern"> | boolean
    preferredIndustry?: StringNullableFilter<"Intern"> | string | null
    firstName?: StringFilter<"Intern"> | string
    lastName?: StringFilter<"Intern"> | string
    bio?: StringNullableFilter<"Intern"> | string | null
    phone?: StringNullableFilter<"Intern"> | string | null
    skills?: JsonFilter<"Intern">
    education?: StringNullableFilter<"Intern"> | string | null
    educationWebsite?: StringNullableFilter<"Intern"> | string | null
    experience?: JsonNullableFilter<"Intern">
    location?: StringNullableFilter<"Intern"> | string | null
    resume?: StringNullableFilter<"Intern"> | string | null
    profilePic?: StringNullableFilter<"Intern"> | string | null
    createdAt?: DateTimeFilter<"Intern"> | Date | string
    updatedAt?: DateTimeFilter<"Intern"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    applications?: ApplicationListRelationFilter
  }

  export type InternOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    studentId?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    ghanaCardNumber?: SortOrderInput | SortOrder
    ghanaCardDocument?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    notifyIndustryJobs?: SortOrder
    preferredIndustry?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    bio?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    skills?: SortOrder
    education?: SortOrderInput | SortOrder
    educationWebsite?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    resume?: SortOrderInput | SortOrder
    profilePic?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    applications?: ApplicationOrderByRelationAggregateInput
  }

  export type InternWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: InternWhereInput | InternWhereInput[]
    OR?: InternWhereInput[]
    NOT?: InternWhereInput | InternWhereInput[]
    studentId?: StringNullableFilter<"Intern"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Intern"> | Date | string | null
    ghanaCardNumber?: StringNullableFilter<"Intern"> | string | null
    ghanaCardDocument?: StringNullableFilter<"Intern"> | string | null
    isVerified?: BoolFilter<"Intern"> | boolean
    notifyIndustryJobs?: BoolFilter<"Intern"> | boolean
    preferredIndustry?: StringNullableFilter<"Intern"> | string | null
    firstName?: StringFilter<"Intern"> | string
    lastName?: StringFilter<"Intern"> | string
    bio?: StringNullableFilter<"Intern"> | string | null
    phone?: StringNullableFilter<"Intern"> | string | null
    skills?: JsonFilter<"Intern">
    education?: StringNullableFilter<"Intern"> | string | null
    educationWebsite?: StringNullableFilter<"Intern"> | string | null
    experience?: JsonNullableFilter<"Intern">
    location?: StringNullableFilter<"Intern"> | string | null
    resume?: StringNullableFilter<"Intern"> | string | null
    profilePic?: StringNullableFilter<"Intern"> | string | null
    createdAt?: DateTimeFilter<"Intern"> | Date | string
    updatedAt?: DateTimeFilter<"Intern"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    applications?: ApplicationListRelationFilter
  }, "id" | "userId">

  export type InternOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    studentId?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    ghanaCardNumber?: SortOrderInput | SortOrder
    ghanaCardDocument?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    notifyIndustryJobs?: SortOrder
    preferredIndustry?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    bio?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    skills?: SortOrder
    education?: SortOrderInput | SortOrder
    educationWebsite?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    resume?: SortOrderInput | SortOrder
    profilePic?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InternCountOrderByAggregateInput
    _max?: InternMaxOrderByAggregateInput
    _min?: InternMinOrderByAggregateInput
  }

  export type InternScalarWhereWithAggregatesInput = {
    AND?: InternScalarWhereWithAggregatesInput | InternScalarWhereWithAggregatesInput[]
    OR?: InternScalarWhereWithAggregatesInput[]
    NOT?: InternScalarWhereWithAggregatesInput | InternScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Intern"> | string
    userId?: StringWithAggregatesFilter<"Intern"> | string
    studentId?: StringNullableWithAggregatesFilter<"Intern"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"Intern"> | Date | string | null
    ghanaCardNumber?: StringNullableWithAggregatesFilter<"Intern"> | string | null
    ghanaCardDocument?: StringNullableWithAggregatesFilter<"Intern"> | string | null
    isVerified?: BoolWithAggregatesFilter<"Intern"> | boolean
    notifyIndustryJobs?: BoolWithAggregatesFilter<"Intern"> | boolean
    preferredIndustry?: StringNullableWithAggregatesFilter<"Intern"> | string | null
    firstName?: StringWithAggregatesFilter<"Intern"> | string
    lastName?: StringWithAggregatesFilter<"Intern"> | string
    bio?: StringNullableWithAggregatesFilter<"Intern"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Intern"> | string | null
    skills?: JsonWithAggregatesFilter<"Intern">
    education?: StringNullableWithAggregatesFilter<"Intern"> | string | null
    educationWebsite?: StringNullableWithAggregatesFilter<"Intern"> | string | null
    experience?: JsonNullableWithAggregatesFilter<"Intern">
    location?: StringNullableWithAggregatesFilter<"Intern"> | string | null
    resume?: StringNullableWithAggregatesFilter<"Intern"> | string | null
    profilePic?: StringNullableWithAggregatesFilter<"Intern"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Intern"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Intern"> | Date | string
  }

  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: StringFilter<"Job"> | string
    companyId?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    requirements?: JsonFilter<"Job">
    responsibilities?: JsonFilter<"Job">
    benefits?: JsonFilter<"Job">
    location?: StringNullableFilter<"Job"> | string | null
    remote?: BoolFilter<"Job"> | boolean
    duration?: StringNullableFilter<"Job"> | string | null
    stipend?: StringNullableFilter<"Job"> | string | null
    skills?: JsonFilter<"Job">
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
    applications?: ApplicationListRelationFilter
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    requirements?: SortOrder
    responsibilities?: SortOrder
    benefits?: SortOrder
    location?: SortOrderInput | SortOrder
    remote?: SortOrder
    duration?: SortOrderInput | SortOrder
    stipend?: SortOrderInput | SortOrder
    skills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    applications?: ApplicationOrderByRelationAggregateInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    companyId?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    requirements?: JsonFilter<"Job">
    responsibilities?: JsonFilter<"Job">
    benefits?: JsonFilter<"Job">
    location?: StringNullableFilter<"Job"> | string | null
    remote?: BoolFilter<"Job"> | boolean
    duration?: StringNullableFilter<"Job"> | string | null
    stipend?: StringNullableFilter<"Job"> | string | null
    skills?: JsonFilter<"Job">
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
    applications?: ApplicationListRelationFilter
  }, "id">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    requirements?: SortOrder
    responsibilities?: SortOrder
    benefits?: SortOrder
    location?: SortOrderInput | SortOrder
    remote?: SortOrder
    duration?: SortOrderInput | SortOrder
    stipend?: SortOrderInput | SortOrder
    skills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobCountOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Job"> | string
    companyId?: StringWithAggregatesFilter<"Job"> | string
    title?: StringWithAggregatesFilter<"Job"> | string
    description?: StringWithAggregatesFilter<"Job"> | string
    requirements?: JsonWithAggregatesFilter<"Job">
    responsibilities?: JsonWithAggregatesFilter<"Job">
    benefits?: JsonWithAggregatesFilter<"Job">
    location?: StringNullableWithAggregatesFilter<"Job"> | string | null
    remote?: BoolWithAggregatesFilter<"Job"> | boolean
    duration?: StringNullableWithAggregatesFilter<"Job"> | string | null
    stipend?: StringNullableWithAggregatesFilter<"Job"> | string | null
    skills?: JsonWithAggregatesFilter<"Job">
    createdAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
  }

  export type ApplicationWhereInput = {
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    id?: StringFilter<"Application"> | string
    jobId?: StringFilter<"Application"> | string
    internId?: StringFilter<"Application"> | string
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus
    coverLetter?: StringNullableFilter<"Application"> | string | null
    appliedAt?: DateTimeFilter<"Application"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"Application"> | Date | string | null
    updatedAt?: DateTimeFilter<"Application"> | Date | string
    job?: XOR<JobRelationFilter, JobWhereInput>
    intern?: XOR<InternRelationFilter, InternWhereInput>
  }

  export type ApplicationOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    internId?: SortOrder
    status?: SortOrder
    coverLetter?: SortOrderInput | SortOrder
    appliedAt?: SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    job?: JobOrderByWithRelationInput
    intern?: InternOrderByWithRelationInput
  }

  export type ApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    jobId_internId?: ApplicationJobIdInternIdCompoundUniqueInput
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    jobId?: StringFilter<"Application"> | string
    internId?: StringFilter<"Application"> | string
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus
    coverLetter?: StringNullableFilter<"Application"> | string | null
    appliedAt?: DateTimeFilter<"Application"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"Application"> | Date | string | null
    updatedAt?: DateTimeFilter<"Application"> | Date | string
    job?: XOR<JobRelationFilter, JobWhereInput>
    intern?: XOR<InternRelationFilter, InternWhereInput>
  }, "id" | "jobId_internId">

  export type ApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    internId?: SortOrder
    status?: SortOrder
    coverLetter?: SortOrderInput | SortOrder
    appliedAt?: SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: ApplicationCountOrderByAggregateInput
    _max?: ApplicationMaxOrderByAggregateInput
    _min?: ApplicationMinOrderByAggregateInput
  }

  export type ApplicationScalarWhereWithAggregatesInput = {
    AND?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    OR?: ApplicationScalarWhereWithAggregatesInput[]
    NOT?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Application"> | string
    jobId?: StringWithAggregatesFilter<"Application"> | string
    internId?: StringWithAggregatesFilter<"Application"> | string
    status?: EnumApplicationStatusWithAggregatesFilter<"Application"> | $Enums.ApplicationStatus
    coverLetter?: StringNullableWithAggregatesFilter<"Application"> | string | null
    appliedAt?: DateTimeWithAggregatesFilter<"Application"> | Date | string
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"Application"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"Application"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type SupportTicketWhereInput = {
    AND?: SupportTicketWhereInput | SupportTicketWhereInput[]
    OR?: SupportTicketWhereInput[]
    NOT?: SupportTicketWhereInput | SupportTicketWhereInput[]
    id?: StringFilter<"SupportTicket"> | string
    requesterUserId?: StringNullableFilter<"SupportTicket"> | string | null
    requesterEmail?: StringNullableFilter<"SupportTicket"> | string | null
    subject?: StringFilter<"SupportTicket"> | string
    description?: StringFilter<"SupportTicket"> | string
    category?: EnumTicketCategoryFilter<"SupportTicket"> | $Enums.TicketCategory
    priority?: EnumTicketPriorityFilter<"SupportTicket"> | $Enums.TicketPriority
    status?: EnumTicketStatusFilter<"SupportTicket"> | $Enums.TicketStatus
    ownerAdminEmail?: StringNullableFilter<"SupportTicket"> | string | null
    dueAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    internalNotes?: StringNullableFilter<"SupportTicket"> | string | null
    slaBreached?: BoolFilter<"SupportTicket"> | boolean
    firstResponseAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    lastActivityAt?: DateTimeFilter<"SupportTicket"> | Date | string
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeFilter<"SupportTicket"> | Date | string
    requester?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type SupportTicketOrderByWithRelationInput = {
    id?: SortOrder
    requesterUserId?: SortOrderInput | SortOrder
    requesterEmail?: SortOrderInput | SortOrder
    subject?: SortOrder
    description?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    ownerAdminEmail?: SortOrderInput | SortOrder
    dueAt?: SortOrderInput | SortOrder
    internalNotes?: SortOrderInput | SortOrder
    slaBreached?: SortOrder
    firstResponseAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    lastActivityAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    requester?: UserOrderByWithRelationInput
  }

  export type SupportTicketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SupportTicketWhereInput | SupportTicketWhereInput[]
    OR?: SupportTicketWhereInput[]
    NOT?: SupportTicketWhereInput | SupportTicketWhereInput[]
    requesterUserId?: StringNullableFilter<"SupportTicket"> | string | null
    requesterEmail?: StringNullableFilter<"SupportTicket"> | string | null
    subject?: StringFilter<"SupportTicket"> | string
    description?: StringFilter<"SupportTicket"> | string
    category?: EnumTicketCategoryFilter<"SupportTicket"> | $Enums.TicketCategory
    priority?: EnumTicketPriorityFilter<"SupportTicket"> | $Enums.TicketPriority
    status?: EnumTicketStatusFilter<"SupportTicket"> | $Enums.TicketStatus
    ownerAdminEmail?: StringNullableFilter<"SupportTicket"> | string | null
    dueAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    internalNotes?: StringNullableFilter<"SupportTicket"> | string | null
    slaBreached?: BoolFilter<"SupportTicket"> | boolean
    firstResponseAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    lastActivityAt?: DateTimeFilter<"SupportTicket"> | Date | string
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeFilter<"SupportTicket"> | Date | string
    requester?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type SupportTicketOrderByWithAggregationInput = {
    id?: SortOrder
    requesterUserId?: SortOrderInput | SortOrder
    requesterEmail?: SortOrderInput | SortOrder
    subject?: SortOrder
    description?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    ownerAdminEmail?: SortOrderInput | SortOrder
    dueAt?: SortOrderInput | SortOrder
    internalNotes?: SortOrderInput | SortOrder
    slaBreached?: SortOrder
    firstResponseAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    lastActivityAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SupportTicketCountOrderByAggregateInput
    _max?: SupportTicketMaxOrderByAggregateInput
    _min?: SupportTicketMinOrderByAggregateInput
  }

  export type SupportTicketScalarWhereWithAggregatesInput = {
    AND?: SupportTicketScalarWhereWithAggregatesInput | SupportTicketScalarWhereWithAggregatesInput[]
    OR?: SupportTicketScalarWhereWithAggregatesInput[]
    NOT?: SupportTicketScalarWhereWithAggregatesInput | SupportTicketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SupportTicket"> | string
    requesterUserId?: StringNullableWithAggregatesFilter<"SupportTicket"> | string | null
    requesterEmail?: StringNullableWithAggregatesFilter<"SupportTicket"> | string | null
    subject?: StringWithAggregatesFilter<"SupportTicket"> | string
    description?: StringWithAggregatesFilter<"SupportTicket"> | string
    category?: EnumTicketCategoryWithAggregatesFilter<"SupportTicket"> | $Enums.TicketCategory
    priority?: EnumTicketPriorityWithAggregatesFilter<"SupportTicket"> | $Enums.TicketPriority
    status?: EnumTicketStatusWithAggregatesFilter<"SupportTicket"> | $Enums.TicketStatus
    ownerAdminEmail?: StringNullableWithAggregatesFilter<"SupportTicket"> | string | null
    dueAt?: DateTimeNullableWithAggregatesFilter<"SupportTicket"> | Date | string | null
    internalNotes?: StringNullableWithAggregatesFilter<"SupportTicket"> | string | null
    slaBreached?: BoolWithAggregatesFilter<"SupportTicket"> | boolean
    firstResponseAt?: DateTimeNullableWithAggregatesFilter<"SupportTicket"> | Date | string | null
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"SupportTicket"> | Date | string | null
    lastActivityAt?: DateTimeWithAggregatesFilter<"SupportTicket"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SupportTicket"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    actorUserId?: StringNullableFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    reason?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    actor?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    actorUserId?: SortOrderInput | SortOrder
    actorEmail?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    actor?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    actorUserId?: StringNullableFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    reason?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    actor?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    actorUserId?: SortOrderInput | SortOrder
    actorEmail?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    actorUserId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    reason?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"AuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type SmtpConfigurationWhereInput = {
    AND?: SmtpConfigurationWhereInput | SmtpConfigurationWhereInput[]
    OR?: SmtpConfigurationWhereInput[]
    NOT?: SmtpConfigurationWhereInput | SmtpConfigurationWhereInput[]
    id?: StringFilter<"SmtpConfiguration"> | string
    host?: StringFilter<"SmtpConfiguration"> | string
    port?: IntFilter<"SmtpConfiguration"> | number
    secure?: BoolFilter<"SmtpConfiguration"> | boolean
    username?: StringFilter<"SmtpConfiguration"> | string
    password?: StringFilter<"SmtpConfiguration"> | string
    fromName?: StringFilter<"SmtpConfiguration"> | string
    fromEmail?: StringFilter<"SmtpConfiguration"> | string
    isActive?: BoolFilter<"SmtpConfiguration"> | boolean
    updatedBy?: StringNullableFilter<"SmtpConfiguration"> | string | null
    createdAt?: DateTimeFilter<"SmtpConfiguration"> | Date | string
    updatedAt?: DateTimeFilter<"SmtpConfiguration"> | Date | string
  }

  export type SmtpConfigurationOrderByWithRelationInput = {
    id?: SortOrder
    host?: SortOrder
    port?: SortOrder
    secure?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    isActive?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SmtpConfigurationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SmtpConfigurationWhereInput | SmtpConfigurationWhereInput[]
    OR?: SmtpConfigurationWhereInput[]
    NOT?: SmtpConfigurationWhereInput | SmtpConfigurationWhereInput[]
    host?: StringFilter<"SmtpConfiguration"> | string
    port?: IntFilter<"SmtpConfiguration"> | number
    secure?: BoolFilter<"SmtpConfiguration"> | boolean
    username?: StringFilter<"SmtpConfiguration"> | string
    password?: StringFilter<"SmtpConfiguration"> | string
    fromName?: StringFilter<"SmtpConfiguration"> | string
    fromEmail?: StringFilter<"SmtpConfiguration"> | string
    isActive?: BoolFilter<"SmtpConfiguration"> | boolean
    updatedBy?: StringNullableFilter<"SmtpConfiguration"> | string | null
    createdAt?: DateTimeFilter<"SmtpConfiguration"> | Date | string
    updatedAt?: DateTimeFilter<"SmtpConfiguration"> | Date | string
  }, "id">

  export type SmtpConfigurationOrderByWithAggregationInput = {
    id?: SortOrder
    host?: SortOrder
    port?: SortOrder
    secure?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    isActive?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SmtpConfigurationCountOrderByAggregateInput
    _avg?: SmtpConfigurationAvgOrderByAggregateInput
    _max?: SmtpConfigurationMaxOrderByAggregateInput
    _min?: SmtpConfigurationMinOrderByAggregateInput
    _sum?: SmtpConfigurationSumOrderByAggregateInput
  }

  export type SmtpConfigurationScalarWhereWithAggregatesInput = {
    AND?: SmtpConfigurationScalarWhereWithAggregatesInput | SmtpConfigurationScalarWhereWithAggregatesInput[]
    OR?: SmtpConfigurationScalarWhereWithAggregatesInput[]
    NOT?: SmtpConfigurationScalarWhereWithAggregatesInput | SmtpConfigurationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SmtpConfiguration"> | string
    host?: StringWithAggregatesFilter<"SmtpConfiguration"> | string
    port?: IntWithAggregatesFilter<"SmtpConfiguration"> | number
    secure?: BoolWithAggregatesFilter<"SmtpConfiguration"> | boolean
    username?: StringWithAggregatesFilter<"SmtpConfiguration"> | string
    password?: StringWithAggregatesFilter<"SmtpConfiguration"> | string
    fromName?: StringWithAggregatesFilter<"SmtpConfiguration"> | string
    fromEmail?: StringWithAggregatesFilter<"SmtpConfiguration"> | string
    isActive?: BoolWithAggregatesFilter<"SmtpConfiguration"> | boolean
    updatedBy?: StringNullableWithAggregatesFilter<"SmtpConfiguration"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SmtpConfiguration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SmtpConfiguration"> | Date | string
  }

  export type AdminSettingWhereInput = {
    AND?: AdminSettingWhereInput | AdminSettingWhereInput[]
    OR?: AdminSettingWhereInput[]
    NOT?: AdminSettingWhereInput | AdminSettingWhereInput[]
    id?: StringFilter<"AdminSetting"> | string
    key?: StringFilter<"AdminSetting"> | string
    value?: JsonFilter<"AdminSetting">
    updatedBy?: StringNullableFilter<"AdminSetting"> | string | null
    createdAt?: DateTimeFilter<"AdminSetting"> | Date | string
    updatedAt?: DateTimeFilter<"AdminSetting"> | Date | string
  }

  export type AdminSettingOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: AdminSettingWhereInput | AdminSettingWhereInput[]
    OR?: AdminSettingWhereInput[]
    NOT?: AdminSettingWhereInput | AdminSettingWhereInput[]
    value?: JsonFilter<"AdminSetting">
    updatedBy?: StringNullableFilter<"AdminSetting"> | string | null
    createdAt?: DateTimeFilter<"AdminSetting"> | Date | string
    updatedAt?: DateTimeFilter<"AdminSetting"> | Date | string
  }, "id" | "key">

  export type AdminSettingOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminSettingCountOrderByAggregateInput
    _max?: AdminSettingMaxOrderByAggregateInput
    _min?: AdminSettingMinOrderByAggregateInput
  }

  export type AdminSettingScalarWhereWithAggregatesInput = {
    AND?: AdminSettingScalarWhereWithAggregatesInput | AdminSettingScalarWhereWithAggregatesInput[]
    OR?: AdminSettingScalarWhereWithAggregatesInput[]
    NOT?: AdminSettingScalarWhereWithAggregatesInput | AdminSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminSetting"> | string
    key?: StringWithAggregatesFilter<"AdminSetting"> | string
    value?: JsonWithAggregatesFilter<"AdminSetting">
    updatedBy?: StringNullableWithAggregatesFilter<"AdminSetting"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AdminSetting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminSetting"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUserInput
    intern?: InternCreateNestedOneWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutRequesterInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyUncheckedCreateNestedOneWithoutUserInput
    intern?: InternUncheckedCreateNestedOneWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutRequesterInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUserNestedInput
    intern?: InternUpdateOneWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutRequesterNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUncheckedUpdateOneWithoutUserNestedInput
    intern?: InternUncheckedUpdateOneWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutRequesterNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    name: string
    description?: string | null
    website?: string | null
    industry?: string | null
    location?: string | null
    phone?: string | null
    logo?: string | null
    companyTaxId?: string | null
    isVerified?: boolean
    registrationDoc?: string | null
    internIntake?: string | null
    mapLocation?: string | null
    benefits?: string | null
    hiringPriorities?: string | null
    candidateRequirements?: string | null
    hiringWorkflow?: string | null
    companySize?: string | null
    contactEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    website?: string | null
    industry?: string | null
    location?: string | null
    phone?: string | null
    logo?: string | null
    companyTaxId?: string | null
    isVerified?: boolean
    registrationDoc?: string | null
    internIntake?: string | null
    mapLocation?: string | null
    benefits?: string | null
    hiringPriorities?: string | null
    candidateRequirements?: string | null
    hiringWorkflow?: string | null
    companySize?: string | null
    contactEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    companyTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    registrationDoc?: NullableStringFieldUpdateOperationsInput | string | null
    internIntake?: NullableStringFieldUpdateOperationsInput | string | null
    mapLocation?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: NullableStringFieldUpdateOperationsInput | string | null
    hiringPriorities?: NullableStringFieldUpdateOperationsInput | string | null
    candidateRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    hiringWorkflow?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    companyTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    registrationDoc?: NullableStringFieldUpdateOperationsInput | string | null
    internIntake?: NullableStringFieldUpdateOperationsInput | string | null
    mapLocation?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: NullableStringFieldUpdateOperationsInput | string | null
    hiringPriorities?: NullableStringFieldUpdateOperationsInput | string | null
    candidateRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    hiringWorkflow?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    website?: string | null
    industry?: string | null
    location?: string | null
    phone?: string | null
    logo?: string | null
    companyTaxId?: string | null
    isVerified?: boolean
    registrationDoc?: string | null
    internIntake?: string | null
    mapLocation?: string | null
    benefits?: string | null
    hiringPriorities?: string | null
    candidateRequirements?: string | null
    hiringWorkflow?: string | null
    companySize?: string | null
    contactEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    companyTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    registrationDoc?: NullableStringFieldUpdateOperationsInput | string | null
    internIntake?: NullableStringFieldUpdateOperationsInput | string | null
    mapLocation?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: NullableStringFieldUpdateOperationsInput | string | null
    hiringPriorities?: NullableStringFieldUpdateOperationsInput | string | null
    candidateRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    hiringWorkflow?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    companyTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    registrationDoc?: NullableStringFieldUpdateOperationsInput | string | null
    internIntake?: NullableStringFieldUpdateOperationsInput | string | null
    mapLocation?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: NullableStringFieldUpdateOperationsInput | string | null
    hiringPriorities?: NullableStringFieldUpdateOperationsInput | string | null
    candidateRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    hiringWorkflow?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InternCreateInput = {
    id?: string
    studentId?: string | null
    dateOfBirth?: Date | string | null
    ghanaCardNumber?: string | null
    ghanaCardDocument?: string | null
    isVerified?: boolean
    notifyIndustryJobs?: boolean
    preferredIndustry?: string | null
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    skills: JsonNullValueInput | InputJsonValue
    education?: string | null
    educationWebsite?: string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: string | null
    resume?: string | null
    profilePic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInternInput
    applications?: ApplicationCreateNestedManyWithoutInternInput
  }

  export type InternUncheckedCreateInput = {
    id?: string
    userId: string
    studentId?: string | null
    dateOfBirth?: Date | string | null
    ghanaCardNumber?: string | null
    ghanaCardDocument?: string | null
    isVerified?: boolean
    notifyIndustryJobs?: boolean
    preferredIndustry?: string | null
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    skills: JsonNullValueInput | InputJsonValue
    education?: string | null
    educationWebsite?: string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: string | null
    resume?: string | null
    profilePic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutInternInput
  }

  export type InternUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ghanaCardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ghanaCardDocument?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    notifyIndustryJobs?: BoolFieldUpdateOperationsInput | boolean
    preferredIndustry?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    education?: NullableStringFieldUpdateOperationsInput | string | null
    educationWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInternNestedInput
    applications?: ApplicationUpdateManyWithoutInternNestedInput
  }

  export type InternUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ghanaCardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ghanaCardDocument?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    notifyIndustryJobs?: BoolFieldUpdateOperationsInput | boolean
    preferredIndustry?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    education?: NullableStringFieldUpdateOperationsInput | string | null
    educationWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutInternNestedInput
  }

  export type InternCreateManyInput = {
    id?: string
    userId: string
    studentId?: string | null
    dateOfBirth?: Date | string | null
    ghanaCardNumber?: string | null
    ghanaCardDocument?: string | null
    isVerified?: boolean
    notifyIndustryJobs?: boolean
    preferredIndustry?: string | null
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    skills: JsonNullValueInput | InputJsonValue
    education?: string | null
    educationWebsite?: string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: string | null
    resume?: string | null
    profilePic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InternUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ghanaCardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ghanaCardDocument?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    notifyIndustryJobs?: BoolFieldUpdateOperationsInput | boolean
    preferredIndustry?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    education?: NullableStringFieldUpdateOperationsInput | string | null
    educationWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InternUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ghanaCardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ghanaCardDocument?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    notifyIndustryJobs?: BoolFieldUpdateOperationsInput | boolean
    preferredIndustry?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    education?: NullableStringFieldUpdateOperationsInput | string | null
    educationWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateInput = {
    id?: string
    title: string
    description: string
    requirements: JsonNullValueInput | InputJsonValue
    responsibilities: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    location?: string | null
    remote?: boolean
    duration?: string | null
    stipend?: string | null
    skills: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
    applications?: ApplicationCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateInput = {
    id?: string
    companyId: string
    title: string
    description: string
    requirements: JsonNullValueInput | InputJsonValue
    responsibilities: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    location?: string | null
    remote?: boolean
    duration?: string | null
    stipend?: string | null
    skills: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    responsibilities?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
    applications?: ApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    responsibilities?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobCreateManyInput = {
    id?: string
    companyId: string
    title: string
    description: string
    requirements: JsonNullValueInput | InputJsonValue
    responsibilities: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    location?: string | null
    remote?: boolean
    duration?: string | null
    stipend?: string | null
    skills: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    responsibilities?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    responsibilities?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    coverLetter?: string | null
    appliedAt?: Date | string
    reviewedAt?: Date | string | null
    updatedAt?: Date | string
    job: JobCreateNestedOneWithoutApplicationsInput
    intern: InternCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateInput = {
    id?: string
    jobId: string
    internId: string
    status?: $Enums.ApplicationStatus
    coverLetter?: string | null
    appliedAt?: Date | string
    reviewedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
    intern?: InternUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    internId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyInput = {
    id?: string
    jobId: string
    internId: string
    status?: $Enums.ApplicationStatus
    coverLetter?: string | null
    appliedAt?: Date | string
    reviewedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    internId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    message: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    message: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    message: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketCreateInput = {
    id?: string
    requesterEmail?: string | null
    subject: string
    description: string
    category?: $Enums.TicketCategory
    priority?: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    ownerAdminEmail?: string | null
    dueAt?: Date | string | null
    internalNotes?: string | null
    slaBreached?: boolean
    firstResponseAt?: Date | string | null
    resolvedAt?: Date | string | null
    lastActivityAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    requester?: UserCreateNestedOneWithoutSupportTicketsInput
  }

  export type SupportTicketUncheckedCreateInput = {
    id?: string
    requesterUserId?: string | null
    requesterEmail?: string | null
    subject: string
    description: string
    category?: $Enums.TicketCategory
    priority?: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    ownerAdminEmail?: string | null
    dueAt?: Date | string | null
    internalNotes?: string | null
    slaBreached?: boolean
    firstResponseAt?: Date | string | null
    resolvedAt?: Date | string | null
    lastActivityAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportTicketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ownerAdminEmail?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    slaBreached?: BoolFieldUpdateOperationsInput | boolean
    firstResponseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requester?: UserUpdateOneWithoutSupportTicketsNestedInput
  }

  export type SupportTicketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterUserId?: NullableStringFieldUpdateOperationsInput | string | null
    requesterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ownerAdminEmail?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    slaBreached?: BoolFieldUpdateOperationsInput | boolean
    firstResponseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketCreateManyInput = {
    id?: string
    requesterUserId?: string | null
    requesterEmail?: string | null
    subject: string
    description: string
    category?: $Enums.TicketCategory
    priority?: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    ownerAdminEmail?: string | null
    dueAt?: Date | string | null
    internalNotes?: string | null
    slaBreached?: boolean
    firstResponseAt?: Date | string | null
    resolvedAt?: Date | string | null
    lastActivityAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportTicketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ownerAdminEmail?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    slaBreached?: BoolFieldUpdateOperationsInput | boolean
    firstResponseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterUserId?: NullableStringFieldUpdateOperationsInput | string | null
    requesterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ownerAdminEmail?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    slaBreached?: BoolFieldUpdateOperationsInput | boolean
    firstResponseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    reason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    actor?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    reason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    actorUserId?: string | null
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    reason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SmtpConfigurationCreateInput = {
    id?: string
    host: string
    port?: number
    secure?: boolean
    username: string
    password: string
    fromName?: string
    fromEmail: string
    isActive?: boolean
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SmtpConfigurationUncheckedCreateInput = {
    id?: string
    host: string
    port?: number
    secure?: boolean
    username: string
    password: string
    fromName?: string
    fromEmail: string
    isActive?: boolean
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SmtpConfigurationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    secure?: BoolFieldUpdateOperationsInput | boolean
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SmtpConfigurationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    secure?: BoolFieldUpdateOperationsInput | boolean
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SmtpConfigurationCreateManyInput = {
    id?: string
    host: string
    port?: number
    secure?: boolean
    username: string
    password: string
    fromName?: string
    fromEmail: string
    isActive?: boolean
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SmtpConfigurationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    secure?: BoolFieldUpdateOperationsInput | boolean
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SmtpConfigurationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    secure?: BoolFieldUpdateOperationsInput | boolean
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fromName?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminSettingUncheckedCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingCreateManyInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[]
    notIn?: $Enums.UserType[]
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumAdminRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.AdminRole[] | null
    notIn?: $Enums.AdminRole[] | null
    not?: NestedEnumAdminRoleNullableFilter<$PrismaModel> | $Enums.AdminRole | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CompanyNullableRelationFilter = {
    is?: CompanyWhereInput | null
    isNot?: CompanyWhereInput | null
  }

  export type InternNullableRelationFilter = {
    is?: InternWhereInput | null
    isNot?: InternWhereInput | null
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SupportTicketListRelationFilter = {
    every?: SupportTicketWhereInput
    some?: SupportTicketWhereInput
    none?: SupportTicketWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupportTicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    isEmailVerified?: SortOrder
    isAdmin?: SortOrder
    adminRole?: SortOrder
    verificationToken?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    isSuspended?: SortOrder
    suspensionReason?: SortOrder
    suspendedAt?: SortOrder
    softBannedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    isEmailVerified?: SortOrder
    isAdmin?: SortOrder
    adminRole?: SortOrder
    verificationToken?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    isSuspended?: SortOrder
    suspensionReason?: SortOrder
    suspendedAt?: SortOrder
    softBannedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    isEmailVerified?: SortOrder
    isAdmin?: SortOrder
    adminRole?: SortOrder
    verificationToken?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    isSuspended?: SortOrder
    suspensionReason?: SortOrder
    suspendedAt?: SortOrder
    softBannedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type EnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[]
    notIn?: $Enums.UserType[]
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumAdminRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.AdminRole[] | null
    notIn?: $Enums.AdminRole[] | null
    not?: NestedEnumAdminRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAdminRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumAdminRoleNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    website?: SortOrder
    industry?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    logo?: SortOrder
    companyTaxId?: SortOrder
    isVerified?: SortOrder
    registrationDoc?: SortOrder
    internIntake?: SortOrder
    mapLocation?: SortOrder
    benefits?: SortOrder
    hiringPriorities?: SortOrder
    candidateRequirements?: SortOrder
    hiringWorkflow?: SortOrder
    companySize?: SortOrder
    contactEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    website?: SortOrder
    industry?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    logo?: SortOrder
    companyTaxId?: SortOrder
    isVerified?: SortOrder
    registrationDoc?: SortOrder
    internIntake?: SortOrder
    mapLocation?: SortOrder
    benefits?: SortOrder
    hiringPriorities?: SortOrder
    candidateRequirements?: SortOrder
    hiringWorkflow?: SortOrder
    companySize?: SortOrder
    contactEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    website?: SortOrder
    industry?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    logo?: SortOrder
    companyTaxId?: SortOrder
    isVerified?: SortOrder
    registrationDoc?: SortOrder
    internIntake?: SortOrder
    mapLocation?: SortOrder
    benefits?: SortOrder
    hiringPriorities?: SortOrder
    candidateRequirements?: SortOrder
    hiringWorkflow?: SortOrder
    companySize?: SortOrder
    contactEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ApplicationListRelationFilter = {
    every?: ApplicationWhereInput
    some?: ApplicationWhereInput
    none?: ApplicationWhereInput
  }

  export type ApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InternCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    studentId?: SortOrder
    dateOfBirth?: SortOrder
    ghanaCardNumber?: SortOrder
    ghanaCardDocument?: SortOrder
    isVerified?: SortOrder
    notifyIndustryJobs?: SortOrder
    preferredIndustry?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    skills?: SortOrder
    education?: SortOrder
    educationWebsite?: SortOrder
    experience?: SortOrder
    location?: SortOrder
    resume?: SortOrder
    profilePic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InternMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    studentId?: SortOrder
    dateOfBirth?: SortOrder
    ghanaCardNumber?: SortOrder
    ghanaCardDocument?: SortOrder
    isVerified?: SortOrder
    notifyIndustryJobs?: SortOrder
    preferredIndustry?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    education?: SortOrder
    educationWebsite?: SortOrder
    location?: SortOrder
    resume?: SortOrder
    profilePic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InternMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    studentId?: SortOrder
    dateOfBirth?: SortOrder
    ghanaCardNumber?: SortOrder
    ghanaCardDocument?: SortOrder
    isVerified?: SortOrder
    notifyIndustryJobs?: SortOrder
    preferredIndustry?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    education?: SortOrder
    educationWebsite?: SortOrder
    location?: SortOrder
    resume?: SortOrder
    profilePic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type CompanyRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    requirements?: SortOrder
    responsibilities?: SortOrder
    benefits?: SortOrder
    location?: SortOrder
    remote?: SortOrder
    duration?: SortOrder
    stipend?: SortOrder
    skills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    remote?: SortOrder
    duration?: SortOrder
    stipend?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    remote?: SortOrder
    duration?: SortOrder
    stipend?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[]
    notIn?: $Enums.ApplicationStatus[]
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type JobRelationFilter = {
    is?: JobWhereInput
    isNot?: JobWhereInput
  }

  export type InternRelationFilter = {
    is?: InternWhereInput
    isNot?: InternWhereInput
  }

  export type ApplicationJobIdInternIdCompoundUniqueInput = {
    jobId: string
    internId: string
  }

  export type ApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    internId?: SortOrder
    status?: SortOrder
    coverLetter?: SortOrder
    appliedAt?: SortOrder
    reviewedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    internId?: SortOrder
    status?: SortOrder
    coverLetter?: SortOrder
    appliedAt?: SortOrder
    reviewedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    internId?: SortOrder
    status?: SortOrder
    coverLetter?: SortOrder
    appliedAt?: SortOrder
    reviewedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[]
    notIn?: $Enums.ApplicationStatus[]
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumTicketCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketCategory | EnumTicketCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TicketCategory[]
    notIn?: $Enums.TicketCategory[]
    not?: NestedEnumTicketCategoryFilter<$PrismaModel> | $Enums.TicketCategory
  }

  export type EnumTicketPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[]
    notIn?: $Enums.TicketPriority[]
    not?: NestedEnumTicketPriorityFilter<$PrismaModel> | $Enums.TicketPriority
  }

  export type EnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[]
    notIn?: $Enums.TicketStatus[]
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SupportTicketCountOrderByAggregateInput = {
    id?: SortOrder
    requesterUserId?: SortOrder
    requesterEmail?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    ownerAdminEmail?: SortOrder
    dueAt?: SortOrder
    internalNotes?: SortOrder
    slaBreached?: SortOrder
    firstResponseAt?: SortOrder
    resolvedAt?: SortOrder
    lastActivityAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupportTicketMaxOrderByAggregateInput = {
    id?: SortOrder
    requesterUserId?: SortOrder
    requesterEmail?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    ownerAdminEmail?: SortOrder
    dueAt?: SortOrder
    internalNotes?: SortOrder
    slaBreached?: SortOrder
    firstResponseAt?: SortOrder
    resolvedAt?: SortOrder
    lastActivityAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupportTicketMinOrderByAggregateInput = {
    id?: SortOrder
    requesterUserId?: SortOrder
    requesterEmail?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    ownerAdminEmail?: SortOrder
    dueAt?: SortOrder
    internalNotes?: SortOrder
    slaBreached?: SortOrder
    firstResponseAt?: SortOrder
    resolvedAt?: SortOrder
    lastActivityAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTicketCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketCategory | EnumTicketCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TicketCategory[]
    notIn?: $Enums.TicketCategory[]
    not?: NestedEnumTicketCategoryWithAggregatesFilter<$PrismaModel> | $Enums.TicketCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketCategoryFilter<$PrismaModel>
    _max?: NestedEnumTicketCategoryFilter<$PrismaModel>
  }

  export type EnumTicketPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[]
    notIn?: $Enums.TicketPriority[]
    not?: NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TicketPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketPriorityFilter<$PrismaModel>
    _max?: NestedEnumTicketPriorityFilter<$PrismaModel>
  }

  export type EnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[]
    notIn?: $Enums.TicketStatus[]
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    actorUserId?: SortOrder
    actorEmail?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    reason?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    actorUserId?: SortOrder
    actorEmail?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    actorUserId?: SortOrder
    actorEmail?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type SmtpConfigurationCountOrderByAggregateInput = {
    id?: SortOrder
    host?: SortOrder
    port?: SortOrder
    secure?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    isActive?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SmtpConfigurationAvgOrderByAggregateInput = {
    port?: SortOrder
  }

  export type SmtpConfigurationMaxOrderByAggregateInput = {
    id?: SortOrder
    host?: SortOrder
    port?: SortOrder
    secure?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    isActive?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SmtpConfigurationMinOrderByAggregateInput = {
    id?: SortOrder
    host?: SortOrder
    port?: SortOrder
    secure?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fromName?: SortOrder
    fromEmail?: SortOrder
    isActive?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SmtpConfigurationSumOrderByAggregateInput = {
    port?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type AdminSettingCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSettingMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyCreateNestedOneWithoutUserInput = {
    create?: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUserInput
    connect?: CompanyWhereUniqueInput
  }

  export type InternCreateNestedOneWithoutUserInput = {
    create?: XOR<InternCreateWithoutUserInput, InternUncheckedCreateWithoutUserInput>
    connectOrCreate?: InternCreateOrConnectWithoutUserInput
    connect?: InternWhereUniqueInput
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type SupportTicketCreateNestedManyWithoutRequesterInput = {
    create?: XOR<SupportTicketCreateWithoutRequesterInput, SupportTicketUncheckedCreateWithoutRequesterInput> | SupportTicketCreateWithoutRequesterInput[] | SupportTicketUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutRequesterInput | SupportTicketCreateOrConnectWithoutRequesterInput[]
    createMany?: SupportTicketCreateManyRequesterInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutActorInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type CompanyUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUserInput
    connect?: CompanyWhereUniqueInput
  }

  export type InternUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<InternCreateWithoutUserInput, InternUncheckedCreateWithoutUserInput>
    connectOrCreate?: InternCreateOrConnectWithoutUserInput
    connect?: InternWhereUniqueInput
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type SupportTicketUncheckedCreateNestedManyWithoutRequesterInput = {
    create?: XOR<SupportTicketCreateWithoutRequesterInput, SupportTicketUncheckedCreateWithoutRequesterInput> | SupportTicketCreateWithoutRequesterInput[] | SupportTicketUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutRequesterInput | SupportTicketCreateOrConnectWithoutRequesterInput[]
    createMany?: SupportTicketCreateManyRequesterInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutActorInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableEnumAdminRoleFieldUpdateOperationsInput = {
    set?: $Enums.AdminRole | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CompanyUpdateOneWithoutUserNestedInput = {
    create?: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUserInput
    upsert?: CompanyUpsertWithoutUserInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUserInput, CompanyUpdateWithoutUserInput>, CompanyUncheckedUpdateWithoutUserInput>
  }

  export type InternUpdateOneWithoutUserNestedInput = {
    create?: XOR<InternCreateWithoutUserInput, InternUncheckedCreateWithoutUserInput>
    connectOrCreate?: InternCreateOrConnectWithoutUserInput
    upsert?: InternUpsertWithoutUserInput
    disconnect?: InternWhereInput | boolean
    delete?: InternWhereInput | boolean
    connect?: InternWhereUniqueInput
    update?: XOR<XOR<InternUpdateToOneWithWhereWithoutUserInput, InternUpdateWithoutUserInput>, InternUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type SupportTicketUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<SupportTicketCreateWithoutRequesterInput, SupportTicketUncheckedCreateWithoutRequesterInput> | SupportTicketCreateWithoutRequesterInput[] | SupportTicketUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutRequesterInput | SupportTicketCreateOrConnectWithoutRequesterInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutRequesterInput | SupportTicketUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: SupportTicketCreateManyRequesterInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutRequesterInput | SupportTicketUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutRequesterInput | SupportTicketUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutActorNestedInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutActorInput | AuditLogUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutActorInput | AuditLogUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutActorInput | AuditLogUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type CompanyUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUserInput
    upsert?: CompanyUpsertWithoutUserInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUserInput, CompanyUpdateWithoutUserInput>, CompanyUncheckedUpdateWithoutUserInput>
  }

  export type InternUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<InternCreateWithoutUserInput, InternUncheckedCreateWithoutUserInput>
    connectOrCreate?: InternCreateOrConnectWithoutUserInput
    upsert?: InternUpsertWithoutUserInput
    disconnect?: InternWhereInput | boolean
    delete?: InternWhereInput | boolean
    connect?: InternWhereUniqueInput
    update?: XOR<XOR<InternUpdateToOneWithWhereWithoutUserInput, InternUpdateWithoutUserInput>, InternUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type SupportTicketUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<SupportTicketCreateWithoutRequesterInput, SupportTicketUncheckedCreateWithoutRequesterInput> | SupportTicketCreateWithoutRequesterInput[] | SupportTicketUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutRequesterInput | SupportTicketCreateOrConnectWithoutRequesterInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutRequesterInput | SupportTicketUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: SupportTicketCreateManyRequesterInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutRequesterInput | SupportTicketUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutRequesterInput | SupportTicketUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutActorNestedInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutActorInput | AuditLogUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutActorInput | AuditLogUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutActorInput | AuditLogUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput
    connect?: UserWhereUniqueInput
  }

  export type JobCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput
    upsert?: UserUpsertWithoutCompanyInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCompanyInput, UserUpdateWithoutCompanyInput>, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type JobUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutCompanyInput | JobUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutCompanyInput | JobUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobUpdateManyWithWhereWithoutCompanyInput | JobUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutCompanyInput | JobUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutCompanyInput | JobUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobUpdateManyWithWhereWithoutCompanyInput | JobUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutInternInput = {
    create?: XOR<UserCreateWithoutInternInput, UserUncheckedCreateWithoutInternInput>
    connectOrCreate?: UserCreateOrConnectWithoutInternInput
    connect?: UserWhereUniqueInput
  }

  export type ApplicationCreateNestedManyWithoutInternInput = {
    create?: XOR<ApplicationCreateWithoutInternInput, ApplicationUncheckedCreateWithoutInternInput> | ApplicationCreateWithoutInternInput[] | ApplicationUncheckedCreateWithoutInternInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutInternInput | ApplicationCreateOrConnectWithoutInternInput[]
    createMany?: ApplicationCreateManyInternInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutInternInput = {
    create?: XOR<ApplicationCreateWithoutInternInput, ApplicationUncheckedCreateWithoutInternInput> | ApplicationCreateWithoutInternInput[] | ApplicationUncheckedCreateWithoutInternInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutInternInput | ApplicationCreateOrConnectWithoutInternInput[]
    createMany?: ApplicationCreateManyInternInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutInternNestedInput = {
    create?: XOR<UserCreateWithoutInternInput, UserUncheckedCreateWithoutInternInput>
    connectOrCreate?: UserCreateOrConnectWithoutInternInput
    upsert?: UserUpsertWithoutInternInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInternInput, UserUpdateWithoutInternInput>, UserUncheckedUpdateWithoutInternInput>
  }

  export type ApplicationUpdateManyWithoutInternNestedInput = {
    create?: XOR<ApplicationCreateWithoutInternInput, ApplicationUncheckedCreateWithoutInternInput> | ApplicationCreateWithoutInternInput[] | ApplicationUncheckedCreateWithoutInternInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutInternInput | ApplicationCreateOrConnectWithoutInternInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutInternInput | ApplicationUpsertWithWhereUniqueWithoutInternInput[]
    createMany?: ApplicationCreateManyInternInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutInternInput | ApplicationUpdateWithWhereUniqueWithoutInternInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutInternInput | ApplicationUpdateManyWithWhereWithoutInternInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutInternNestedInput = {
    create?: XOR<ApplicationCreateWithoutInternInput, ApplicationUncheckedCreateWithoutInternInput> | ApplicationCreateWithoutInternInput[] | ApplicationUncheckedCreateWithoutInternInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutInternInput | ApplicationCreateOrConnectWithoutInternInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutInternInput | ApplicationUpsertWithWhereUniqueWithoutInternInput[]
    createMany?: ApplicationCreateManyInternInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutInternInput | ApplicationUpdateWithWhereUniqueWithoutInternInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutInternInput | ApplicationUpdateManyWithWhereWithoutInternInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutJobsInput = {
    create?: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobsInput
    connect?: CompanyWhereUniqueInput
  }

  export type ApplicationCreateNestedManyWithoutJobInput = {
    create?: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput> | ApplicationCreateWithoutJobInput[] | ApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutJobInput | ApplicationCreateOrConnectWithoutJobInput[]
    createMany?: ApplicationCreateManyJobInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput> | ApplicationCreateWithoutJobInput[] | ApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutJobInput | ApplicationCreateOrConnectWithoutJobInput[]
    createMany?: ApplicationCreateManyJobInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type CompanyUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobsInput
    upsert?: CompanyUpsertWithoutJobsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutJobsInput, CompanyUpdateWithoutJobsInput>, CompanyUncheckedUpdateWithoutJobsInput>
  }

  export type ApplicationUpdateManyWithoutJobNestedInput = {
    create?: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput> | ApplicationCreateWithoutJobInput[] | ApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutJobInput | ApplicationCreateOrConnectWithoutJobInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutJobInput | ApplicationUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ApplicationCreateManyJobInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutJobInput | ApplicationUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutJobInput | ApplicationUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput> | ApplicationCreateWithoutJobInput[] | ApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutJobInput | ApplicationCreateOrConnectWithoutJobInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutJobInput | ApplicationUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ApplicationCreateManyJobInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutJobInput | ApplicationUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutJobInput | ApplicationUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type JobCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobCreateOrConnectWithoutApplicationsInput
    connect?: JobWhereUniqueInput
  }

  export type InternCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<InternCreateWithoutApplicationsInput, InternUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: InternCreateOrConnectWithoutApplicationsInput
    connect?: InternWhereUniqueInput
  }

  export type EnumApplicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApplicationStatus
  }

  export type JobUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobCreateOrConnectWithoutApplicationsInput
    upsert?: JobUpsertWithoutApplicationsInput
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutApplicationsInput, JobUpdateWithoutApplicationsInput>, JobUncheckedUpdateWithoutApplicationsInput>
  }

  export type InternUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<InternCreateWithoutApplicationsInput, InternUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: InternCreateOrConnectWithoutApplicationsInput
    upsert?: InternUpsertWithoutApplicationsInput
    connect?: InternWhereUniqueInput
    update?: XOR<XOR<InternUpdateToOneWithWhereWithoutApplicationsInput, InternUpdateWithoutApplicationsInput>, InternUncheckedUpdateWithoutApplicationsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutSupportTicketsInput = {
    create?: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupportTicketsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTicketCategoryFieldUpdateOperationsInput = {
    set?: $Enums.TicketCategory
  }

  export type EnumTicketPriorityFieldUpdateOperationsInput = {
    set?: $Enums.TicketPriority
  }

  export type EnumTicketStatusFieldUpdateOperationsInput = {
    set?: $Enums.TicketStatus
  }

  export type UserUpdateOneWithoutSupportTicketsNestedInput = {
    create?: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupportTicketsInput
    upsert?: UserUpsertWithoutSupportTicketsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSupportTicketsInput, UserUpdateWithoutSupportTicketsInput>, UserUncheckedUpdateWithoutSupportTicketsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[]
    notIn?: $Enums.UserType[]
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumAdminRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.AdminRole[] | null
    notIn?: $Enums.AdminRole[] | null
    not?: NestedEnumAdminRoleNullableFilter<$PrismaModel> | $Enums.AdminRole | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[]
    notIn?: $Enums.UserType[]
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumAdminRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.AdminRole[] | null
    notIn?: $Enums.AdminRole[] | null
    not?: NestedEnumAdminRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAdminRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumAdminRoleNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[]
    notIn?: $Enums.ApplicationStatus[]
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[]
    notIn?: $Enums.ApplicationStatus[]
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type NestedEnumTicketCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketCategory | EnumTicketCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TicketCategory[]
    notIn?: $Enums.TicketCategory[]
    not?: NestedEnumTicketCategoryFilter<$PrismaModel> | $Enums.TicketCategory
  }

  export type NestedEnumTicketPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[]
    notIn?: $Enums.TicketPriority[]
    not?: NestedEnumTicketPriorityFilter<$PrismaModel> | $Enums.TicketPriority
  }

  export type NestedEnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[]
    notIn?: $Enums.TicketStatus[]
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type NestedEnumTicketCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketCategory | EnumTicketCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TicketCategory[]
    notIn?: $Enums.TicketCategory[]
    not?: NestedEnumTicketCategoryWithAggregatesFilter<$PrismaModel> | $Enums.TicketCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketCategoryFilter<$PrismaModel>
    _max?: NestedEnumTicketCategoryFilter<$PrismaModel>
  }

  export type NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[]
    notIn?: $Enums.TicketPriority[]
    not?: NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TicketPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketPriorityFilter<$PrismaModel>
    _max?: NestedEnumTicketPriorityFilter<$PrismaModel>
  }

  export type NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[]
    notIn?: $Enums.TicketStatus[]
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type CompanyCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    website?: string | null
    industry?: string | null
    location?: string | null
    phone?: string | null
    logo?: string | null
    companyTaxId?: string | null
    isVerified?: boolean
    registrationDoc?: string | null
    internIntake?: string | null
    mapLocation?: string | null
    benefits?: string | null
    hiringPriorities?: string | null
    candidateRequirements?: string | null
    hiringWorkflow?: string | null
    companySize?: string | null
    contactEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    website?: string | null
    industry?: string | null
    location?: string | null
    phone?: string | null
    logo?: string | null
    companyTaxId?: string | null
    isVerified?: boolean
    registrationDoc?: string | null
    internIntake?: string | null
    mapLocation?: string | null
    benefits?: string | null
    hiringPriorities?: string | null
    candidateRequirements?: string | null
    hiringWorkflow?: string | null
    companySize?: string | null
    contactEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutUserInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
  }

  export type InternCreateWithoutUserInput = {
    id?: string
    studentId?: string | null
    dateOfBirth?: Date | string | null
    ghanaCardNumber?: string | null
    ghanaCardDocument?: string | null
    isVerified?: boolean
    notifyIndustryJobs?: boolean
    preferredIndustry?: string | null
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    skills: JsonNullValueInput | InputJsonValue
    education?: string | null
    educationWebsite?: string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: string | null
    resume?: string | null
    profilePic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationCreateNestedManyWithoutInternInput
  }

  export type InternUncheckedCreateWithoutUserInput = {
    id?: string
    studentId?: string | null
    dateOfBirth?: Date | string | null
    ghanaCardNumber?: string | null
    ghanaCardDocument?: string | null
    isVerified?: boolean
    notifyIndustryJobs?: boolean
    preferredIndustry?: string | null
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    skills: JsonNullValueInput | InputJsonValue
    education?: string | null
    educationWebsite?: string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: string | null
    resume?: string | null
    profilePic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutInternInput
  }

  export type InternCreateOrConnectWithoutUserInput = {
    where: InternWhereUniqueInput
    create: XOR<InternCreateWithoutUserInput, InternUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    message: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    message: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SupportTicketCreateWithoutRequesterInput = {
    id?: string
    requesterEmail?: string | null
    subject: string
    description: string
    category?: $Enums.TicketCategory
    priority?: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    ownerAdminEmail?: string | null
    dueAt?: Date | string | null
    internalNotes?: string | null
    slaBreached?: boolean
    firstResponseAt?: Date | string | null
    resolvedAt?: Date | string | null
    lastActivityAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportTicketUncheckedCreateWithoutRequesterInput = {
    id?: string
    requesterEmail?: string | null
    subject: string
    description: string
    category?: $Enums.TicketCategory
    priority?: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    ownerAdminEmail?: string | null
    dueAt?: Date | string | null
    internalNotes?: string | null
    slaBreached?: boolean
    firstResponseAt?: Date | string | null
    resolvedAt?: Date | string | null
    lastActivityAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportTicketCreateOrConnectWithoutRequesterInput = {
    where: SupportTicketWhereUniqueInput
    create: XOR<SupportTicketCreateWithoutRequesterInput, SupportTicketUncheckedCreateWithoutRequesterInput>
  }

  export type SupportTicketCreateManyRequesterInputEnvelope = {
    data: SupportTicketCreateManyRequesterInput | SupportTicketCreateManyRequesterInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutActorInput = {
    id?: string
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    reason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutActorInput = {
    id?: string
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    reason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput>
  }

  export type AuditLogCreateManyActorInputEnvelope = {
    data: AuditLogCreateManyActorInput | AuditLogCreateManyActorInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutUserInput = {
    update: XOR<CompanyUpdateWithoutUserInput, CompanyUncheckedUpdateWithoutUserInput>
    create: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUserInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUserInput, CompanyUncheckedUpdateWithoutUserInput>
  }

  export type CompanyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    companyTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    registrationDoc?: NullableStringFieldUpdateOperationsInput | string | null
    internIntake?: NullableStringFieldUpdateOperationsInput | string | null
    mapLocation?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: NullableStringFieldUpdateOperationsInput | string | null
    hiringPriorities?: NullableStringFieldUpdateOperationsInput | string | null
    candidateRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    hiringWorkflow?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    companyTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    registrationDoc?: NullableStringFieldUpdateOperationsInput | string | null
    internIntake?: NullableStringFieldUpdateOperationsInput | string | null
    mapLocation?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: NullableStringFieldUpdateOperationsInput | string | null
    hiringPriorities?: NullableStringFieldUpdateOperationsInput | string | null
    candidateRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    hiringWorkflow?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type InternUpsertWithoutUserInput = {
    update: XOR<InternUpdateWithoutUserInput, InternUncheckedUpdateWithoutUserInput>
    create: XOR<InternCreateWithoutUserInput, InternUncheckedCreateWithoutUserInput>
    where?: InternWhereInput
  }

  export type InternUpdateToOneWithWhereWithoutUserInput = {
    where?: InternWhereInput
    data: XOR<InternUpdateWithoutUserInput, InternUncheckedUpdateWithoutUserInput>
  }

  export type InternUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ghanaCardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ghanaCardDocument?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    notifyIndustryJobs?: BoolFieldUpdateOperationsInput | boolean
    preferredIndustry?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    education?: NullableStringFieldUpdateOperationsInput | string | null
    educationWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUpdateManyWithoutInternNestedInput
  }

  export type InternUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ghanaCardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ghanaCardDocument?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    notifyIndustryJobs?: BoolFieldUpdateOperationsInput | boolean
    preferredIndustry?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    education?: NullableStringFieldUpdateOperationsInput | string | null
    educationWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutInternNestedInput
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type SupportTicketUpsertWithWhereUniqueWithoutRequesterInput = {
    where: SupportTicketWhereUniqueInput
    update: XOR<SupportTicketUpdateWithoutRequesterInput, SupportTicketUncheckedUpdateWithoutRequesterInput>
    create: XOR<SupportTicketCreateWithoutRequesterInput, SupportTicketUncheckedCreateWithoutRequesterInput>
  }

  export type SupportTicketUpdateWithWhereUniqueWithoutRequesterInput = {
    where: SupportTicketWhereUniqueInput
    data: XOR<SupportTicketUpdateWithoutRequesterInput, SupportTicketUncheckedUpdateWithoutRequesterInput>
  }

  export type SupportTicketUpdateManyWithWhereWithoutRequesterInput = {
    where: SupportTicketScalarWhereInput
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyWithoutRequesterInput>
  }

  export type SupportTicketScalarWhereInput = {
    AND?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
    OR?: SupportTicketScalarWhereInput[]
    NOT?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
    id?: StringFilter<"SupportTicket"> | string
    requesterUserId?: StringNullableFilter<"SupportTicket"> | string | null
    requesterEmail?: StringNullableFilter<"SupportTicket"> | string | null
    subject?: StringFilter<"SupportTicket"> | string
    description?: StringFilter<"SupportTicket"> | string
    category?: EnumTicketCategoryFilter<"SupportTicket"> | $Enums.TicketCategory
    priority?: EnumTicketPriorityFilter<"SupportTicket"> | $Enums.TicketPriority
    status?: EnumTicketStatusFilter<"SupportTicket"> | $Enums.TicketStatus
    ownerAdminEmail?: StringNullableFilter<"SupportTicket"> | string | null
    dueAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    internalNotes?: StringNullableFilter<"SupportTicket"> | string | null
    slaBreached?: BoolFilter<"SupportTicket"> | boolean
    firstResponseAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    lastActivityAt?: DateTimeFilter<"SupportTicket"> | Date | string
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeFilter<"SupportTicket"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutActorInput, AuditLogUncheckedUpdateWithoutActorInput>
    create: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutActorInput, AuditLogUncheckedUpdateWithoutActorInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutActorInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutActorInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    actorUserId?: StringNullableFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    reason?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type UserCreateWithoutCompanyInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    intern?: InternCreateNestedOneWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutRequesterInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutCompanyInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    intern?: InternUncheckedCreateNestedOneWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutRequesterInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutCompanyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type JobCreateWithoutCompanyInput = {
    id?: string
    title: string
    description: string
    requirements: JsonNullValueInput | InputJsonValue
    responsibilities: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    location?: string | null
    remote?: boolean
    duration?: string | null
    stipend?: string | null
    skills: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutCompanyInput = {
    id?: string
    title: string
    description: string
    requirements: JsonNullValueInput | InputJsonValue
    responsibilities: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    location?: string | null
    remote?: boolean
    duration?: string | null
    stipend?: string | null
    skills: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutCompanyInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput>
  }

  export type JobCreateManyCompanyInputEnvelope = {
    data: JobCreateManyCompanyInput | JobCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCompanyInput = {
    update: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCompanyInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type UserUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intern?: InternUpdateOneWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutRequesterNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intern?: InternUncheckedUpdateOneWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutRequesterNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
  }

  export type JobUpsertWithWhereUniqueWithoutCompanyInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutCompanyInput, JobUncheckedUpdateWithoutCompanyInput>
    create: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput>
  }

  export type JobUpdateWithWhereUniqueWithoutCompanyInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutCompanyInput, JobUncheckedUpdateWithoutCompanyInput>
  }

  export type JobUpdateManyWithWhereWithoutCompanyInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutCompanyInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: StringFilter<"Job"> | string
    companyId?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    requirements?: JsonFilter<"Job">
    responsibilities?: JsonFilter<"Job">
    benefits?: JsonFilter<"Job">
    location?: StringNullableFilter<"Job"> | string | null
    remote?: BoolFilter<"Job"> | boolean
    duration?: StringNullableFilter<"Job"> | string | null
    stipend?: StringNullableFilter<"Job"> | string | null
    skills?: JsonFilter<"Job">
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
  }

  export type UserCreateWithoutInternInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutRequesterInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutInternInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyUncheckedCreateNestedOneWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutRequesterInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutInternInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInternInput, UserUncheckedCreateWithoutInternInput>
  }

  export type ApplicationCreateWithoutInternInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    coverLetter?: string | null
    appliedAt?: Date | string
    reviewedAt?: Date | string | null
    updatedAt?: Date | string
    job: JobCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateWithoutInternInput = {
    id?: string
    jobId: string
    status?: $Enums.ApplicationStatus
    coverLetter?: string | null
    appliedAt?: Date | string
    reviewedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ApplicationCreateOrConnectWithoutInternInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutInternInput, ApplicationUncheckedCreateWithoutInternInput>
  }

  export type ApplicationCreateManyInternInputEnvelope = {
    data: ApplicationCreateManyInternInput | ApplicationCreateManyInternInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutInternInput = {
    update: XOR<UserUpdateWithoutInternInput, UserUncheckedUpdateWithoutInternInput>
    create: XOR<UserCreateWithoutInternInput, UserUncheckedCreateWithoutInternInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInternInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInternInput, UserUncheckedUpdateWithoutInternInput>
  }

  export type UserUpdateWithoutInternInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutRequesterNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutInternInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUncheckedUpdateOneWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutRequesterNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
  }

  export type ApplicationUpsertWithWhereUniqueWithoutInternInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutInternInput, ApplicationUncheckedUpdateWithoutInternInput>
    create: XOR<ApplicationCreateWithoutInternInput, ApplicationUncheckedCreateWithoutInternInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutInternInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutInternInput, ApplicationUncheckedUpdateWithoutInternInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutInternInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutInternInput>
  }

  export type ApplicationScalarWhereInput = {
    AND?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    OR?: ApplicationScalarWhereInput[]
    NOT?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    id?: StringFilter<"Application"> | string
    jobId?: StringFilter<"Application"> | string
    internId?: StringFilter<"Application"> | string
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus
    coverLetter?: StringNullableFilter<"Application"> | string | null
    appliedAt?: DateTimeFilter<"Application"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"Application"> | Date | string | null
    updatedAt?: DateTimeFilter<"Application"> | Date | string
  }

  export type CompanyCreateWithoutJobsInput = {
    id?: string
    name: string
    description?: string | null
    website?: string | null
    industry?: string | null
    location?: string | null
    phone?: string | null
    logo?: string | null
    companyTaxId?: string | null
    isVerified?: boolean
    registrationDoc?: string | null
    internIntake?: string | null
    mapLocation?: string | null
    benefits?: string | null
    hiringPriorities?: string | null
    candidateRequirements?: string | null
    hiringWorkflow?: string | null
    companySize?: string | null
    contactEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutJobsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    website?: string | null
    industry?: string | null
    location?: string | null
    phone?: string | null
    logo?: string | null
    companyTaxId?: string | null
    isVerified?: boolean
    registrationDoc?: string | null
    internIntake?: string | null
    mapLocation?: string | null
    benefits?: string | null
    hiringPriorities?: string | null
    candidateRequirements?: string | null
    hiringWorkflow?: string | null
    companySize?: string | null
    contactEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyCreateOrConnectWithoutJobsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
  }

  export type ApplicationCreateWithoutJobInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    coverLetter?: string | null
    appliedAt?: Date | string
    reviewedAt?: Date | string | null
    updatedAt?: Date | string
    intern: InternCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateWithoutJobInput = {
    id?: string
    internId: string
    status?: $Enums.ApplicationStatus
    coverLetter?: string | null
    appliedAt?: Date | string
    reviewedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ApplicationCreateOrConnectWithoutJobInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput>
  }

  export type ApplicationCreateManyJobInputEnvelope = {
    data: ApplicationCreateManyJobInput | ApplicationCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutJobsInput = {
    update: XOR<CompanyUpdateWithoutJobsInput, CompanyUncheckedUpdateWithoutJobsInput>
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutJobsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutJobsInput, CompanyUncheckedUpdateWithoutJobsInput>
  }

  export type CompanyUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    companyTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    registrationDoc?: NullableStringFieldUpdateOperationsInput | string | null
    internIntake?: NullableStringFieldUpdateOperationsInput | string | null
    mapLocation?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: NullableStringFieldUpdateOperationsInput | string | null
    hiringPriorities?: NullableStringFieldUpdateOperationsInput | string | null
    candidateRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    hiringWorkflow?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    companyTaxId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    registrationDoc?: NullableStringFieldUpdateOperationsInput | string | null
    internIntake?: NullableStringFieldUpdateOperationsInput | string | null
    mapLocation?: NullableStringFieldUpdateOperationsInput | string | null
    benefits?: NullableStringFieldUpdateOperationsInput | string | null
    hiringPriorities?: NullableStringFieldUpdateOperationsInput | string | null
    candidateRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    hiringWorkflow?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUpsertWithWhereUniqueWithoutJobInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutJobInput, ApplicationUncheckedUpdateWithoutJobInput>
    create: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutJobInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutJobInput, ApplicationUncheckedUpdateWithoutJobInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutJobInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutJobInput>
  }

  export type JobCreateWithoutApplicationsInput = {
    id?: string
    title: string
    description: string
    requirements: JsonNullValueInput | InputJsonValue
    responsibilities: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    location?: string | null
    remote?: boolean
    duration?: string | null
    stipend?: string | null
    skills: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
  }

  export type JobUncheckedCreateWithoutApplicationsInput = {
    id?: string
    companyId: string
    title: string
    description: string
    requirements: JsonNullValueInput | InputJsonValue
    responsibilities: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    location?: string | null
    remote?: boolean
    duration?: string | null
    stipend?: string | null
    skills: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobCreateOrConnectWithoutApplicationsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
  }

  export type InternCreateWithoutApplicationsInput = {
    id?: string
    studentId?: string | null
    dateOfBirth?: Date | string | null
    ghanaCardNumber?: string | null
    ghanaCardDocument?: string | null
    isVerified?: boolean
    notifyIndustryJobs?: boolean
    preferredIndustry?: string | null
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    skills: JsonNullValueInput | InputJsonValue
    education?: string | null
    educationWebsite?: string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: string | null
    resume?: string | null
    profilePic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInternInput
  }

  export type InternUncheckedCreateWithoutApplicationsInput = {
    id?: string
    userId: string
    studentId?: string | null
    dateOfBirth?: Date | string | null
    ghanaCardNumber?: string | null
    ghanaCardDocument?: string | null
    isVerified?: boolean
    notifyIndustryJobs?: boolean
    preferredIndustry?: string | null
    firstName: string
    lastName: string
    bio?: string | null
    phone?: string | null
    skills: JsonNullValueInput | InputJsonValue
    education?: string | null
    educationWebsite?: string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: string | null
    resume?: string | null
    profilePic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InternCreateOrConnectWithoutApplicationsInput = {
    where: InternWhereUniqueInput
    create: XOR<InternCreateWithoutApplicationsInput, InternUncheckedCreateWithoutApplicationsInput>
  }

  export type JobUpsertWithoutApplicationsInput = {
    update: XOR<JobUpdateWithoutApplicationsInput, JobUncheckedUpdateWithoutApplicationsInput>
    create: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutApplicationsInput, JobUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    responsibilities?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
  }

  export type JobUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    responsibilities?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InternUpsertWithoutApplicationsInput = {
    update: XOR<InternUpdateWithoutApplicationsInput, InternUncheckedUpdateWithoutApplicationsInput>
    create: XOR<InternCreateWithoutApplicationsInput, InternUncheckedCreateWithoutApplicationsInput>
    where?: InternWhereInput
  }

  export type InternUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: InternWhereInput
    data: XOR<InternUpdateWithoutApplicationsInput, InternUncheckedUpdateWithoutApplicationsInput>
  }

  export type InternUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ghanaCardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ghanaCardDocument?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    notifyIndustryJobs?: BoolFieldUpdateOperationsInput | boolean
    preferredIndustry?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    education?: NullableStringFieldUpdateOperationsInput | string | null
    educationWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInternNestedInput
  }

  export type InternUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ghanaCardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ghanaCardDocument?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    notifyIndustryJobs?: BoolFieldUpdateOperationsInput | boolean
    preferredIndustry?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    education?: NullableStringFieldUpdateOperationsInput | string | null
    educationWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableJsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUserInput
    intern?: InternCreateNestedOneWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutRequesterInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyUncheckedCreateNestedOneWithoutUserInput
    intern?: InternUncheckedCreateNestedOneWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutRequesterInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUserNestedInput
    intern?: InternUpdateOneWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutRequesterNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUncheckedUpdateOneWithoutUserNestedInput
    intern?: InternUncheckedUpdateOneWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutRequesterNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
  }

  export type UserCreateWithoutSupportTicketsInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUserInput
    intern?: InternCreateNestedOneWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutSupportTicketsInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyUncheckedCreateNestedOneWithoutUserInput
    intern?: InternUncheckedCreateNestedOneWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutSupportTicketsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
  }

  export type UserUpsertWithoutSupportTicketsInput = {
    update: XOR<UserUpdateWithoutSupportTicketsInput, UserUncheckedUpdateWithoutSupportTicketsInput>
    create: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSupportTicketsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSupportTicketsInput, UserUncheckedUpdateWithoutSupportTicketsInput>
  }

  export type UserUpdateWithoutSupportTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUserNestedInput
    intern?: InternUpdateOneWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutSupportTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUncheckedUpdateOneWithoutUserNestedInput
    intern?: InternUncheckedUpdateOneWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUserInput
    intern?: InternCreateNestedOneWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutRequesterInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    password: string
    userType: $Enums.UserType
    isEmailVerified?: boolean
    isAdmin?: boolean
    adminRole?: $Enums.AdminRole | null
    verificationToken?: string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    isSuspended?: boolean
    suspensionReason?: string | null
    suspendedAt?: Date | string | null
    softBannedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyUncheckedCreateNestedOneWithoutUserInput
    intern?: InternUncheckedCreateNestedOneWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutRequesterInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUserNestedInput
    intern?: InternUpdateOneWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutRequesterNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    adminRole?: NullableEnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    softBannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUncheckedUpdateOneWithoutUserNestedInput
    intern?: InternUncheckedUpdateOneWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutRequesterNestedInput
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    message: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type SupportTicketCreateManyRequesterInput = {
    id?: string
    requesterEmail?: string | null
    subject: string
    description: string
    category?: $Enums.TicketCategory
    priority?: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    ownerAdminEmail?: string | null
    dueAt?: Date | string | null
    internalNotes?: string | null
    slaBreached?: boolean
    firstResponseAt?: Date | string | null
    resolvedAt?: Date | string | null
    lastActivityAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyActorInput = {
    id?: string
    actorEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    reason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUpdateWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ownerAdminEmail?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    slaBreached?: BoolFieldUpdateOperationsInput | boolean
    firstResponseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ownerAdminEmail?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    slaBreached?: BoolFieldUpdateOperationsInput | boolean
    firstResponseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateManyWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ownerAdminEmail?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    slaBreached?: BoolFieldUpdateOperationsInput | boolean
    firstResponseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateManyCompanyInput = {
    id?: string
    title: string
    description: string
    requirements: JsonNullValueInput | InputJsonValue
    responsibilities: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    location?: string | null
    remote?: boolean
    duration?: string | null
    stipend?: string | null
    skills: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    responsibilities?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    responsibilities?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    responsibilities?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    location?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyInternInput = {
    id?: string
    jobId: string
    status?: $Enums.ApplicationStatus
    coverLetter?: string | null
    appliedAt?: Date | string
    reviewedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ApplicationUpdateWithoutInternInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutInternInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyWithoutInternInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyJobInput = {
    id?: string
    internId: string
    status?: $Enums.ApplicationStatus
    coverLetter?: string | null
    appliedAt?: Date | string
    reviewedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ApplicationUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intern?: InternUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    internId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    internId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompanyCountOutputTypeDefaultArgs instead
     */
    export type CompanyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InternCountOutputTypeDefaultArgs instead
     */
    export type InternCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InternCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobCountOutputTypeDefaultArgs instead
     */
    export type JobCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompanyDefaultArgs instead
     */
    export type CompanyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InternDefaultArgs instead
     */
    export type InternArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InternDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobDefaultArgs instead
     */
    export type JobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ApplicationDefaultArgs instead
     */
    export type ApplicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ApplicationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupportTicketDefaultArgs instead
     */
    export type SupportTicketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupportTicketDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SmtpConfigurationDefaultArgs instead
     */
    export type SmtpConfigurationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SmtpConfigurationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminSettingDefaultArgs instead
     */
    export type AdminSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminSettingDefaultArgs<ExtArgs>

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