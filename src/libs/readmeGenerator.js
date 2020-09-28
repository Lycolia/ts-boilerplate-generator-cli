//@ts-check
const readme = `

## How to using

- Lunch commands

  - \`npm run build\`
  - \`npm run serve\`
  - \`npm run dev\`
    - serve on hot reloading
`;

/**
 * @param {string} projectName
 */
export function getReadme(projectName) {
  return `# ${projectName}\n\n- ${projectName}${readme}`;
}
