Package.describe({
  name: 'mwc:synthesis-assets',
  version: '0.1.5',
  summary: 'assets handling for synthesis',
  git: 'https://github.com/meteorwebcomponents/synthesis',
  documentation: 'README.md',
});

Package.onUse((api) => {
  api.versionsFrom('1.3');
  api.use('ecmascript');
  api.use('isobuild:compiler-plugin@1.0.0');
});

Package.registerBuildPlugin({
  name: 'synthesis-assets',
  use: [
    'caching-html-compiler@1.0.7',
    'ecmascript@0.4.1',
  ],
  sources: [
    'plugin/synthesis-assets.js',
  ],
});
