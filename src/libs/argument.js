exports.getProjectName = () => {
  return process.argv.length > 3 ? process.argv[2] : null;
};
