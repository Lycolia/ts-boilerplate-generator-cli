import assert from 'node:assert';
import { describe, it } from 'node:test';
import { ProjectCreator } from '.';
import { Git } from '../../system/Git';
import { MyFile } from '../../system/MyFile';
import { Npm } from '../../system/Npm';

describe('createProject', () => {
  it('getDestDirWithValidateが例外をスローしたときに例外がスローされること', (t) => {
    t.mock.method(ProjectCreator, 'getDestDirWithValidate', () => {
      throw new Error('error getDestDirWithValidate');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, new Error('error getDestDirWithValidate'));
  });

  it('Git.cloneが例外をスローしたときに例外がスローされること', (t) => {
    t.mock.method(Git, 'clone', () => {
      throw new Error('error Git.clone');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, new Error('error Git.clone'));
  });

  it('MyFile.renameDirが例外をスローしたときに例外がスローされること', (t) => {
    // 結合処理なのでモックしておく（実際に動くと例外が飛ぶため
    t.mock.method(Git, 'clone', () => {});

    t.mock.method(MyFile, 'renameDir', () => {
      throw new Error('error MyFile.renameDir');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, new Error('error MyFile.renameDir'));
  });

  it('cleanupが例外をスローしたときに例外がスローされること', (t) => {
    // 結合処理なのでモックしておく（実際に動くと例外が飛ぶため
    t.mock.method(Git, 'clone', () => {});
    t.mock.method(MyFile, 'renameDir', () => {});

    t.mock.method(ProjectCreator, 'cleanup', () => {
      throw new Error('error cleanup');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, new Error('error cleanup'));
  });

  it('updateReadMeが例外をスローしたときに例外がスローされること', (t) => {
    // 結合処理なのでモックしておく（実際に動くと例外が飛ぶため
    t.mock.method(Git, 'clone', () => {});
    t.mock.method(MyFile, 'renameDir', () => {});

    t.mock.method(ProjectCreator, 'updateReadMe', () => {
      throw new Error('error updateReadMe');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, new Error('error updateReadMe'));
  });

  it('updatePackageJsonが例外をスローしたときに例外がスローされること', (t) => {
    // 結合処理なのでモックしておく（実際に動くと例外が飛ぶため
    t.mock.method(Git, 'clone', () => {});
    t.mock.method(MyFile, 'renameDir', () => {});
    t.mock.method(ProjectCreator, 'updateReadMe', () => {});

    t.mock.method(ProjectCreator, 'updatePackageJson', () => {
      throw new Error('error updatePackageJson');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, new Error('error updatePackageJson'));
  });

  it('Npm.installが例外をスローしたときに例外がスローされること', (t) => {
    // 結合処理なのでモックしておく（実際に動くと例外が飛ぶため
    t.mock.method(Git, 'clone', () => {});
    t.mock.method(MyFile, 'renameDir', () => {});
    t.mock.method(ProjectCreator, 'updateReadMe', () => {});
    t.mock.method(ProjectCreator, 'updatePackageJson', () => {});

    t.mock.method(Npm, 'install', () => {
      throw new Error('error Npm.install');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, new Error('error Npm.install'));
  });

  it('Git.initが例外をスローしたときに例外がスローされること', (t) => {
    // 結合処理なのでモックしておく（実際に動くと例外が飛ぶため
    t.mock.method(Git, 'clone', () => {});
    t.mock.method(MyFile, 'renameDir', () => {});
    t.mock.method(ProjectCreator, 'updateReadMe', () => {});
    t.mock.method(ProjectCreator, 'updatePackageJson', () => {});
    t.mock.method(Npm, 'install', () => {});

    t.mock.method(Git, 'init', () => {
      throw new Error('error Git.init');
    });

    assert.throws(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }, new Error('error Git.init'));
  });
});
