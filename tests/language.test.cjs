const {test}=require('node:test');
const assert=require('node:assert/strict');
const ts=require('typescript'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const cache=new Map();
function load(relative){
 const filename=path.resolve(__dirname,'..',relative);
 if(cache.has(filename))return cache.get(filename).exports;
 const module={exports:{}};cache.set(filename,module);
 const code=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020}}).outputText;
 const localRequire=id=>{if(id.endsWith('.css'))return {default:{}};if(!id.startsWith('.'))return require(id);const base=path.resolve(path.dirname(filename),id);return load(path.relative(path.resolve(__dirname,'..'),fs.existsSync(base+'.ts')?base+'.ts':fs.existsSync(base+'.tsx')?base+'.tsx':path.join(base,'index.ts')));};
 vm.runInNewContext('(function(require,module,exports){'+code+'\n})',{console})(localRequire,module,module.exports);return module.exports;
}
const {translate,bookTitle,fixedBookLanguage,localizeBook}=load('app/i18n/index.ts');
const {studentBookCatalog}=load('app/data/nctbBooks.ts');
const {chapterPairs}=load('app/i18n/chapterPairs.ts');
test('teacher desk uses exact English labels and reverses to Bangla',()=>{
 for(const [bn,en] of [['তোমার শ্রেণিগুলো','Your classes'],['শিক্ষকের পাঠ ডেস্ক',"Teacher's lesson desk"],['পরিকল্পনা করো। শেখাও। বুঝতে সাহায্য করো।','Plan. Teach. Help students understand.'],['পানীয় বেছে নাও','Choose a drink'],['আমার নোট','My notes']]){assert.equal(translate(bn,'en'),en);assert.equal(translate(en,'bn'),bn);}
});
test('all non-language book titles change in both directions',()=>{
 for(const books of Object.values(studentBookCatalog))for(const book of books){assert.equal(bookTitle(book,'en'),fixedBookLanguage(book.id)?book.title:book.englishTitle);assert.equal(bookTitle(book,'bn'),book.title);}
});
test('Bangla and English books retain their original language',()=>{
 for(const id of ['charupath','saptabarna','sahitya-kanika','anandapath','bangla-grammar','bangla-literature','bangla-sahapath','bangla-language-grammar','english-for-today','english-grammar'])assert.ok(fixedBookLanguage(id));
 const book=studentBookCatalog['8'].find(book=>book.id==='sahitya-kanika');assert.strictEqual(localizeBook(book,'en'),book);
});
test('all non-language chapter headings have an English translation',()=>{
 for(const [en,bn] of chapterPairs)assert.equal(translate(bn,'en'),en);
});
test('dynamic labels translate numbers, composed labels and actions',()=>{
 assert.equal(translate('১৪টি বই · NCTB ২০২৬','en'),'14 books · NCTB 2026');
 assert.equal(translate('Class 8 new folder খোলো','en'),'Open Class 8 folder');
 assert.equal(translate('Class 8 new খোলো','en'),'Open Class 8');
 assert.equal(translate('বিজ্ঞান PDF খোলো','en'),'Open Science PDF');
});
test('the teacher desk server render has no hardcoded Bangla UI',()=>{
 const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
 const Teacher=load('app/teacher-dashboard/page.tsx').default;
 const html=renderToStaticMarkup(React.createElement(Teacher));
 const text=html.replace(/<[^>]*>/g,'');assert.equal(/[\u0980-\u09ff]/.test(text),false,text);
});

test('localization never changes book identifiers, routes, sources or category values',()=>{
 for(const books of Object.values(studentBookCatalog))for(const book of books)for(const lang of ['en','bn']){
  const localized=localizeBook(book,lang);for(const key of ['id','pdfPath','accent','category','englishTitle'])assert.equal(localized[key],book[key]);
 }
});
