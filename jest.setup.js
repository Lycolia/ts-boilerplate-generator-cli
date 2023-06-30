module.exports = async () => {
  // jestのCLIオプションでテストが壊れるのを防止
  process.argv.length = 2;
};
