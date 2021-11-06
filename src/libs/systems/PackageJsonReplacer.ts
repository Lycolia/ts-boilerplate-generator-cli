import { ProjectOption } from '../../models/ProjectOptions';

type PackageJson = {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  url: string;
};

/**
 * @param pkgJson
 * @param projectOpt
 */
export const replacePackageJson = (
  pkgJson: PackageJson,
  projectOpt: ProjectOption
) => {
  pkgJson.url = '';
  return {
    ...pkgJson,
    ...projectOpt,
  };
};
