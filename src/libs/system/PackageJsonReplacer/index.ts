import { ProjectOption } from '../../../models/ProjectOptions';

type PackageJson = {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  keywords: string[];
  repository: {
    type: string;
    url: string;
  };
};

export namespace PackageJsonReplacer {
  /**
   * @param pkgJsonaa   * @param projectOpt
   */
  export const replace = (pkgJson: PackageJson, projectOpt: ProjectOption) => {
    return {
      ...pkgJson,
      repository: {
        type: '',
        url: ''
      },
      keywords: [],
      name: projectOpt.projectName,
      version: '0.1.0',
      description: projectOpt.description,
      author: projectOpt.author,
      license: projectOpt.license
    };
  };
}
