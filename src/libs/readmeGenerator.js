//@ts-check
const readme = `

## How to using

- Lunch commands

  - \`npm run build\`
  - \`npm run serve\`
  - \`npm run dev\`
    - serve on hot reloading
  - \`npm run test\`
    - run jest
`;

/**
 * @param {string} projectName
 * @param {string} projectDesc
 */
exports.getReadme = (projectName, projectDesc) => {
  return `# ${projectName}\n\n- ${projectDesc}${readme}`;
};
