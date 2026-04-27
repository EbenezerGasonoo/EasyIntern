
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

exports.Prisma.UserScalarFieldEnum = {
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
  scheduledAccountDeletionAt: 'scheduledAccountDeletionAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserPreferenceScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  profileVisibility: 'profileVisibility',
  showContactInfo: 'showContactInfo',
  notifyJobRecommendations: 'notifyJobRecommendations',
  notifyApplicationUpdates: 'notifyApplicationUpdates',
  notifyNewApplicants: 'notifyNewApplicants',
  notificationChannelEmail: 'notificationChannelEmail',
  notificationChannelInApp: 'notificationChannelInApp',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompanyScalarFieldEnum = {
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

exports.Prisma.InternScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  studentId: 'studentId',
  enrollmentYear: 'enrollmentYear',
  course: 'course',
  graduationDate: 'graduationDate',
  studentVerificationStatus: 'studentVerificationStatus',
  studentVerificationNotes: 'studentVerificationNotes',
  universityId: 'universityId',
  dateOfBirth: 'dateOfBirth',
  ghanaCardNumber: 'ghanaCardNumber',
  ghanaCardDocument: 'ghanaCardDocument',
  schoolAffiliationDocument: 'schoolAffiliationDocument',
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

exports.Prisma.UniversityScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  website: 'website',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UniversityStudentCatalogScalarFieldEnum = {
  id: 'id',
  universityId: 'universityId',
  enrollmentYear: 'enrollmentYear',
  studentId: 'studentId',
  course: 'course',
  graduationDate: 'graduationDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StudentVerificationRequestScalarFieldEnum = {
  id: 'id',
  internId: 'internId',
  universityId: 'universityId',
  catalogRecordId: 'catalogRecordId',
  status: 'status',
  requestedStudentId: 'requestedStudentId',
  requestedEnrollmentYear: 'requestedEnrollmentYear',
  requestedCourse: 'requestedCourse',
  requestedGraduationDate: 'requestedGraduationDate',
  notes: 'notes',
  reviewedAt: 'reviewedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobScalarFieldEnum = {
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

exports.Prisma.ApplicationScalarFieldEnum = {
  id: 'id',
  jobId: 'jobId',
  internId: 'internId',
  status: 'status',
  coverLetter: 'coverLetter',
  appliedAt: 'appliedAt',
  reviewedAt: 'reviewedAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  message: 'message',
  type: 'type',
  isRead: 'isRead',
  createdAt: 'createdAt'
};

exports.Prisma.SupportTicketScalarFieldEnum = {
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

exports.Prisma.AuditLogScalarFieldEnum = {
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

exports.Prisma.SmtpConfigurationScalarFieldEnum = {
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

exports.Prisma.AdminSettingScalarFieldEnum = {
  id: 'id',
  key: 'key',
  value: 'value',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
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
exports.UserType = exports.$Enums.UserType = {
  COMPANY: 'COMPANY',
  INTERN: 'INTERN',
  UNIVERSITY: 'UNIVERSITY',
  ADMIN: 'ADMIN'
};

exports.AdminRole = exports.$Enums.AdminRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  OPS_ADMIN: 'OPS_ADMIN',
  SUPPORT_ADMIN: 'SUPPORT_ADMIN'
};

exports.StudentVerificationStatus = exports.$Enums.StudentVerificationStatus = {
  NOT_SUBMITTED: 'NOT_SUBMITTED',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

exports.ApplicationStatus = exports.$Enums.ApplicationStatus = {
  PENDING: 'PENDING',
  REVIEWED: 'REVIEWED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

exports.TicketCategory = exports.$Enums.TicketCategory = {
  ACCOUNT: 'ACCOUNT',
  BILLING: 'BILLING',
  APPLICATION: 'APPLICATION',
  JOB_POST: 'JOB_POST',
  VERIFICATION: 'VERIFICATION',
  TECHNICAL: 'TECHNICAL',
  OTHER: 'OTHER'
};

exports.TicketPriority = exports.$Enums.TicketPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.TicketStatus = exports.$Enums.TicketStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED'
};

exports.Prisma.ModelName = {
  User: 'User',
  UserPreference: 'UserPreference',
  Company: 'Company',
  Intern: 'Intern',
  University: 'University',
  UniversityStudentCatalog: 'UniversityStudentCatalog',
  StudentVerificationRequest: 'StudentVerificationRequest',
  Job: 'Job',
  Application: 'Application',
  Notification: 'Notification',
  SupportTicket: 'SupportTicket',
  AuditLog: 'AuditLog',
  SmtpConfiguration: 'SmtpConfiguration',
  AdminSetting: 'AdminSetting'
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
