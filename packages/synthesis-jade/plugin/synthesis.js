import { parseHtml, handleTags } from 'meteor/mwc:synthesis-compiler';
import { CachingHtmlCompiler } from 'meteor/caching-html-compiler';
import jade from 'jade';

class PolymerCachingHtmlCompiler extends CachingHtmlCompiler {

  getCacheKey(inputFile) {
    return inputFile.getSourceHash();
  }

  compileOneFile(inputFile) {
    const contents = inputFile.getContentsAsString();
    let packagePrefix = '';

    if (inputFile.getPackageName()) {
      packagePrefix += `/packages/${inputFile.getPackageName()}/`;
    }

    const inputPath = packagePrefix + inputFile.getPathInPackage();
    // files inside folders with names demo/test/docs are skipped.
    if (inputPath.match(/\/(demo|test|docs).*\//) && !process.env.FORCESYNTHESIS) {
      return null;
    }
    try {
      const fn = jade.compile(contents, {
        filename: inputFile.getPathInPackage(),
      });
      const parsedJade = fn();
      const tags = this.tagScannerFunc({
        sourceName: inputPath,
        contents: parsedJade,
      });
      const result = this.tagHandlerFunc(tags);
      return result;
    } catch (e) {
      throw e;
    }
  }
}

Plugin.registerCompiler({
  extensions: ['jade'],
  archMatching: 'web',
  isTemplate: true,
}, () => new PolymerCachingHtmlCompiler('synthesis-jade', parseHtml, handleTags));

