const maxAllowArguments = 3;

// TODO 未実装
exports.hasHelpArgument = () => {
  const argv = process.argv.slice(2, maxAllowArguments);
  return argv.find((arg) => arg.search(/-h|--help/)) ? true : false;
};

// TODO 未実装
exports.hasQuietArgument = () => {
  const argv = process.argv.slice(2, maxAllowArguments);
  return argv.find((arg) => arg === '-q') ? true : false;
};

exports.getProjectName = () => {
  const argv = process.argv.slice(2, maxAllowArguments);
  return argv ? argv.find((arg) => arg !== '-q') : null;
};
