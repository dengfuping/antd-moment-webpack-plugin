const generateRegExp = /generate\/dayjs/;
const updateResource = (resource) => {
  resource.request = resource.request.replace('dayjs', 'moment');
};
const plugin = 'AntdMomentWebpackPlugin';
class Plugin {
  apply(compiler) {
    const { alias } = compiler.options.resolve;
    if (alias) {
      alias.dayjs = 'moment';
    } else {
      compiler.options.resolve.alias = {
        dayjs: 'moment',
      };
    }
    compiler.hooks.normalModuleFactory.tap(plugin, (factory) => {
      factory.hooks.beforeResolve.tap(plugin, (result) => {
        if (generateRegExp.test(result.request)) {
          updateResource(result);
        }
      });
      factory.hooks.afterResolve.tap(plugin, (result) => {
        const createData = result.createData;
        if (generateRegExp.test(createData.resource)) {
          updateResource(result);
        }
      });
    });
  }
};
module.exports = Plugin;
