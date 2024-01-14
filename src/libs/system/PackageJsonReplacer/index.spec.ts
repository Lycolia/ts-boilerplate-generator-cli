import { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { PackageJsonReplacer } from '.';
import { ProjectOption } from '../../../models/ProjectOptions';

describe('replace', () => {
  const pkgJson = {
    name: 'pkg-name',
    version: '1.2.3',
    description: 'pkg-desc',
    author: 'pkg-author',
    license: 'pkg-lic',
    repository: {
      type: 'aaa',
      url: 'bbb',
    },
    keywords: ['aaa', 'bbb', 'ccc'],
    dependencies: {
      foo: '^0.0.3',
      bar: '^0.2.3',
      baz: '^1.2.3',
    },
  };
  const prjOpt: ProjectOption = {
    projectName: 'pkg-name',
    description: 'pkg-desc',
    author: 'pkg-author',
    license: 'pkg-lic',
    type: 'ts-cli',
  };
  const expect = {
    name: prjOpt.projectName,
    version: '0.1.0',
    description: prjOpt.description,
    author: prjOpt.author,
    license: prjOpt.license,
    repository: {
      type: '',
      url: '',
    },
    keywords: [],
    dependencies: {
      foo: '^0.0.3',
      bar: '^0.2.3',
      baz: '^1.2.3',
    },
  };
  it('第一引数の値が第二引数の値で正しく置換されること', () => {
    const actual = PackageJsonReplacer.replace(pkgJson, prjOpt);

    assert.deepStrictEqual(actual, expect);
  });
});
