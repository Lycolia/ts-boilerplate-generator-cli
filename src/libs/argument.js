exports.getProjectName = () => {
  return process.argv.length > 2 ? process.argv[2] : null;
};
