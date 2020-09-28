//@ts-check
const prompts = require('prompts');
const validateNpmPackageName = require('validate-npm-package-name');
const { infoLog, warnLog } = require('./log');
const { exitCode } = require('./exitCodes');

/**
 * Dialog inputs
 */
const inputs = [
  {
    type: 'text',
    name: 'packageName',
    message: 'package name',
    validate: (value) => {
      const ctx = validateNpmPackageName(value);
      if (ctx.validForNewPackages) {
        return true;
      } else {
        return (ctx.errors || []).concat(ctx.warnings || []).join(' and ');
      }
    },
  },
  {
    type: 'text',
    name: 'description',
    message: 'description',
  },
  {
    type: 'text',
    name: 'author',
    message: 'author',
  },
];

/**
 * Cancel prompt
 */
const onWizardCancel = () => {
  warnLog(exitCode.cancelledCreatePj.subject);
  infoLog(exitCode.cancelledCreatePj.message);
  process.exit(exitCode.cancelledCreatePj.code);
};

// Dialoging prompts
prompts({
  type: 'confirm',
  name: 'doNext',
  message: 'Would run initial wizard?',
  initial: false,
}).then((res) => {
  if (res.doNext) {
    // @ts-ignore
    prompts(inputs, { onCancel: onWizardCancel }).then((result) => {
      console.log(result);
    });
  }
});

/**
 * Entry point
 */
exports.startGenerator = () => {
  // TODO: Dialoging prompts here!
};
