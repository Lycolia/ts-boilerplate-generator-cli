import assert from 'node:assert';
import { describe, it } from 'node:test';
import { ProjectCreator } from '.';
import { Git } from '../../system/Git';
import { MyFile } from '../../system/MyFile';
import { Npm } from '../../system/Npm';

describe('createProject', () => {
  it('getDestDirWithValidateが例外をスローしたときに例外がスローされること', (t) => {
    t.mock.method(ProjectCreator, 'getDestDirWithValidate', () => {
      throw new Error('test');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, Error);
  });

  it('Git.cloneが例外をスローしたときに例外がスローされること', (t) => {
    t.mock.method(Git, 'clone', () => {
      throw new Error('test');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, {});
  });

  it('MyFile.renameDirが例外をスローしたときに例外がスローされること', (t) => {
    t.mock.method(MyFile, 'renameDir', () => {
      throw new Error('test');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, Error);
  });

  it('cleanupが例外をスローしたときに例外がスローされること', (t) => {
    t.mock.method(ProjectCreator, 'cleanup', () => {
      throw new Error('test');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, Error);
  });

  it('updateReadMeが例外をスローしたときに例外がスローされること', (t) => {
    t.mock.method(ProjectCreator, 'updateReadMe', () => {
      throw new Error('test');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, Error);
  });

  it('updatePackageJsonが例外をスローしたときに例外がスローされること', (t) => {
    t.mock.method(ProjectCreator, 'updatePackageJson', () => {
      throw new Error('test');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, Error);
  });

  it('Npm.installが例外をスローしたときに例外がスローされること', (t) => {
    t.mock.method(Npm, 'install', () => {
      throw new Error('test');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, Error);
  });

  it('Git.initが例外をスローしたときに例外がスローされること', (t) => {
    t.mock.method(Git, 'init', () => {
      throw new Error('test');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, Error);
  });
});
