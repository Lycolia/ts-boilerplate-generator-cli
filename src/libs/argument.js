exports.getProjectName = () => {
  return process.argv.length > 2 ? process.argv.argv[2] : null;
};
