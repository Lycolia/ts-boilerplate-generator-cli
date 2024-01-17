import { ProjectCreator } from '.';
import { Git } from '../../system/Git';
import { MyFile } from '../../system/MyFile';
import { Npm } from '../../system/Npm';

describe('createProject', () => {
  it('getDestDirWithValidateが例外をスローしたときに例外がスローされること', () => {
    jest
      .spyOn(ProjectCreator, 'getDestDirWithValidate')
      .mockImplementationOnce(() => {
        throw new Error('error getDestDirWithValidate');
      });

    expect(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }).toThrow(new Error('error getDestDirWithValidate'));
  });

  it('Git.cloneが例外をスローしたときに例外がスローされること', () => {
    jest.spyOn(Git, 'clone').mockImplementationOnce(() => {
      throw new Error('error Git.clone');
    });

    expect(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }).toThrow(new Error('error Git.clone'));
  });

  it('MyFile.renameDirが例外をスローしたときに例外がスローされること', () => {
    // 後続処理でエラーを回避するために戻り値を設定（結合観点になるのであまりよくないが…）
    jest
      .spyOn(ProjectCreator, 'getDestDirWithValidate')
      .mockReturnValue({ dirName: 'hoge', fullPath: '/path/to/hoge' });
    jest.spyOn(Git, 'clone').mockImplementationOnce(() => {});

    jest.spyOn(MyFile, 'renameDir').mockImplementation(() => {
      throw new Error('error MyFile.renameDir');
    });

    expect(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }).toThrow(new Error('error MyFile.renameDir'));
  });

  it('cleanupが例外をスローしたときに例外がスローされること', () => {
    // 後続処理でエラーを回避するために戻り値を設定（結合観点になるのであまりよくないが…）
    jest
      .spyOn(ProjectCreator, 'getDestDirWithValidate')
      .mockReturnValue({ dirName: 'hoge', fullPath: '/path/to/hoge' });
    jest.spyOn(Git, 'clone').mockImplementationOnce(() => {});
    jest.spyOn(MyFile, 'renameDir').mockImplementationOnce(() => {});

    jest.spyOn(ProjectCreator, 'cleanup').mockImplementationOnce(() => {
      throw new Error('error cleanup');
    });

    expect(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }).toThrow(new Error('error cleanup'));
  });

  it('updateReadMeが例外をスローしたときに例外がスローされること', () => {
    // 後続処理でエラーを回避するために戻り値を設定（結合観点になるのであまりよくないが…）
    jest
      .spyOn(ProjectCreator, 'getDestDirWithValidate')
      .mockReturnValue({ dirName: 'hoge', fullPath: '/path/to/hoge' });
    jest.spyOn(Git, 'clone').mockImplementationOnce(() => {});
    jest.spyOn(MyFile, 'renameDir').mockImplementationOnce(() => {});

    jest.spyOn(ProjectCreator, 'updateReadMe').mockImplementationOnce(() => {
      throw new Error('error updateReadMe');
    });

    expect(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }).toThrow(new Error('error updateReadMe'));
  });

  it('updatePackageJsonが例外をスローしたときに例外がスローされること', () => {
    // 後続処理でエラーを回避するために戻り値を設定（結合観点になるのであまりよくないが…）
    jest
      .spyOn(ProjectCreator, 'getDestDirWithValidate')
      .mockReturnValue({ dirName: 'hoge', fullPath: '/path/to/hoge' });
    jest.spyOn(Git, 'clone').mockImplementationOnce(() => {});
    jest.spyOn(MyFile, 'renameDir').mockImplementationOnce(() => {});
    jest.spyOn(ProjectCreator, 'updateReadMe').mockImplementationOnce(() => {});

    jest
      .spyOn(ProjectCreator, 'updatePackageJson')
      .mockImplementationOnce(() => {
        throw new Error('error updatePackageJson');
      });

    expect(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }).toThrow(new Error('error updatePackageJson'));
  });

  it('Npm.installが例外をスローしたときに例外がスローされること', () => {
    // 後続処理でエラーを回避するために戻り値を設定（結合観点になるのであまりよくないが…）
    jest
      .spyOn(ProjectCreator, 'getDestDirWithValidate')
      .mockReturnValue({ dirName: 'hoge', fullPath: '/path/to/hoge' });
    jest.spyOn(Git, 'clone').mockImplementationOnce(() => {});
    jest.spyOn(MyFile, 'renameDir').mockImplementationOnce(() => {});
    jest.spyOn(ProjectCreator, 'updateReadMe').mockImplementationOnce(() => {});
    jest
      .spyOn(ProjectCreator, 'updatePackageJson')
      .mockImplementationOnce(() => {});

    jest.spyOn(Npm, 'install').mockImplementationOnce(() => {
      throw new Error('error Npm.install');
    });

    expect(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }).toThrow(new Error('error Npm.install'));
  });

  it('Git.initが例外をスローしたときに例外がスローされること', () => {
    // 後続処理でエラーを回避するために戻り値を設定（結合観点になるのであまりよくないが…）
    jest
      .spyOn(ProjectCreator, 'getDestDirWithValidate')
      .mockReturnValue({ dirName: 'hoge', fullPath: '/path/to/hoge' });
    jest.spyOn(Git, 'clone').mockImplementationOnce(() => {});
    jest.spyOn(MyFile, 'renameDir').mockImplementationOnce(() => {});
    jest.spyOn(ProjectCreator, 'updateReadMe').mockImplementationOnce(() => {});
    jest
      .spyOn(ProjectCreator, 'updatePackageJson')
      .mockImplementationOnce(() => {});
    jest.spyOn(Npm, 'install').mockImplementationOnce(() => {});

    jest.spyOn(Git, 'init').mockImplementationOnce(() => {
      throw new Error('error Git.init');
    });

    expect(() => {
      ProjectCreator.createProject({
        author: 'hoge',
        description: 'piyo',
        license: 'fuga',
        projectName: 'foo',
        type: 'ts-cli',
      });
    }).toThrow(new Error('error Git.init'));
  });
});
