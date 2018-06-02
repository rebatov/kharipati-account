'use strict';

module.exports = {
  // Level of messages that this transport should log
  level: 'debug',
  // Boolean flag indicating whether to suppress output
  // silent: false,
  // Boolean flag indicating if we should prepend output with timestamps (default true).
  // If function is specified, its return value will be used instead of timestamps
  timestamp: true,
  // The filename of the logfile to write output to.
  filename: `${global.xRootDir}log/app.log`,
  // Max size in bytes of the logfile,
  // if the size is exceeded then a new file is created,
  // a counter will become a suffix of the log file.
  maxsize: 10485760, // 10MB
  // Limit the number of files created when the size of the logfile is exceeded
  maxFiles: 100,
  // If true, messages will be logged as JSON (default true)
  json: true,
  eol: '\n',
  prettyPrint: false,
  // Numeric indicating how many times to recurse while formatting the object
  // with util.inspect (only used with prettyPrint: true) (default null, unlimited)
  // depth: null,
  // If true, messages will be logged as JSON and formatted for logstash (default false)
  // logstash: false,
  // Boolean flag indicating if we should prepend output with level (default true)
  // showLevel: true,
  // If true, log files will be rolled based on maxsize and maxfiles, but in ascending order.
  // The filename will always have the most recent log lines.
  // The larger the appended number, the older the log file.
  // This option requires maxFiles to be set, or it will be ignored
  tailable: true,
  // The number of stream creation retry attempts before entering a failed state
  // In a failed state the transport stays active but performs a NOOP on it's log function.
  // (default 2)
  // maxRetries: 2,
  zippedArchive: true, // If true, all log files but the current one will be zipped Archive
  exitOnError: false,
};
