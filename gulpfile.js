/**
 * Created by lidongliang on 2015/12/30.
 */

//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),//css文件压缩
//当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
//压缩js文件
//    uglify = require('gulp-uglify'),
//文件合并
//    concat = require('gulp-concat'),
//- 对文件名加MD5后缀
    rev = require('gulp-rev'),
//- 路径替换(替换html中引用地址);
    revCollector = require('gulp-rev-collector'),
//雪碧图
//    spriter = require('gulp-css-spriter'),
    //html压缩
    //htmlmin = require('gulp-htmlmin'),
    //重命名
    rename=require('gulp-rename');

//定义一个testSass任务（自定义任务名称）
gulp.task('testSass', function () {
    gulp.src('src/sass/*.scss')//该任务针对的文件,多个文件以数组形式传入
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')
        }))//有异常时处理
        .pipe(sass()) //该任务调用的模块
        //.pipe(concat('index.min.css'))//合并文件
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('./dist/resource/css')) //将会在src/css下生成index.css
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev'));
});

//处理文件替换
gulp.task('rev', function () {
    gulp.src(['./rev/*.json', './src/html/*.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('./dist/'));                     //- 替换后的文件输出的目录
});

gulp.task('autoAll',function(){
    gulp.watch('src/**/*.scss', ['default']);
})
gulp.task('default', ['testSass', 'rev']);


//autoprefixer
//var autoprefixer=require('gulp-autoprefixer');
//gulp.task('testAutoFx', function () {
//    gulp.src('dist/resource/css/autoprefixer.css')
//        .pipe(autoprefixer({
//            browsers: [ 'Android >= 4.0','ie 6-11','Chrome 34','Firefox >= 20'],//browsers参数 https://github.com/ai/browserslist#queries
//            cascade: true, //是否美化属性值 默认：true 像这样：
//            //-webkit-transform: rotate(45deg);
//            //        transform: rotate(45deg);
//            remove:true //是否去掉不必要的前缀 默认：true
//        }))
//        .pipe(rename('autoprefixer.complete.css'))
//        .pipe(gulp.dest('dist/resource/css'));
//});

//gulp 匹配符为 ! ,* ,** ,{}

//gulp.task('testSass', function () {
//    //编译src目录下的所有scss文件
//    //除了reset.scss和test.scss（**匹配src/less的0个或多个子文件夹）
//    gulp.src(['src/sass/*.scss', '!src/sass/**/{reset,test}.scss'])
//        .pipe(sass())
//        .pipe(gulp.dest('src/css'));
//});

//生成雪碧图
//gulp.task('spriter', function () {
//    var timestamp =+ new Date();
//    gulp.src('src/sass/style.scss')
//        .pipe(sass()) //该任务调用的模块
//        .pipe(spriter({
////生成的spriter的位置
//            'spriteSheet': './dist/images/sprite' + timestamp + '.png',
////生成样式文件图片引用地址的路径
////如下将生产：backgound:url(../images/sprite20324232.png)
//            'pathToSpriteSheetFromCSS': '../images/sprite' + timestamp + '.png'
//        }))
//        .pipe(cssmin())
//        //产出路径
//        .pipe(gulp.dest('./dist/resource/css'));
//});


//js压缩任务
//gulp.task('jsmin', function () {
//    gulp.src('src/js/index.js')//该任务针对的文件,多个文件以数组形式传入,匹配符同mincss
//        .pipe(uglify({
//            mangle: true,//类型：Boolean 默认：true 是否修改变量名
//            compress: true//类型：Boolean 默认：true 是否完全压缩
//        }))
//        .pipe(gulp.dest('./dist/resource/js'));//生成地址
//});

////页面压缩
//gulp.task('testHtmlmin', function () {
//    var options = {
//        removeComments: true,//清除HTML注释
//        collapseWhitespace: true,//压缩HTML
//        collapseBooleanAttributes: true,//略省布尔属性的值 <input checked="true"/> ==> <input />
//        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
//        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
//        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
//        minifyJS: true,//压缩页面JS
//        minifyCSS: true//压缩页面CSS
//    };
//    gulp.src('src/html/*.html')
//        .pipe(htmlmin(options))
//        .pipe(gulp.dest('dist/html'));
//});


//gulp.task('default', ['testSass', 'rev', 'jsmin','spriter']); //定义默认任务

//定义监控事件,在有修改时自动调用事件
//gulp.task('testWatch', function () {
//    gulp.watch('src/**/*.scss', ['testSass']); //当所有less文件发生改变时，调用testSass任务
//http://www.w3ctech.com/topic/134Building 相关watch事件或方法
//});


//浏览器自动更新
//var browserSync = require('browser-sync');
//
//gulp.task('browser-sync', function () {
//    var files = [
//        'dist/**/*.html',
//        'dist/**/*.css',
//        'dist/**/*.png',
//        'dist/**/*.js'
//    ];
//    browserSync.init(files, {
//        server: {
//            baseDir: './dist'
//        }
//    });
//});


//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径


//压缩css文件，重命名
//gulp.task('uglifycss', function () {
//    gulp.src('D:/Company/project2/PPD.Static.Web/wealth/css/activity/spring.css')//该任务针对的文件,多个文件以数组形式传入
//        .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
//        .pipe(rename('spring.min2.css'))
//        .pipe(gulp.dest('D:/Company/project2/PPD.Static.Web/wealth/css/activity'))
//});