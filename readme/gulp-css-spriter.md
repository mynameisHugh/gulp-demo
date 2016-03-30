# gulp-css-spriter 

## 使用 
    spriter = require('gulp-css-spriter');
    
        //生成雪碧图
        gulp.task('spriter', function () {
            var timestamp =+ new Date();
            gulp.src('src/sass/style.scss')
                .pipe(sass()) //该任务调用的模块
                .pipe(spriter({
                    'spriteSheet': './dist/images/sprite' + timestamp + '.png',//生成的spriter的位置
        
                    'pathToSpriteSheetFromCSS': '../images/sprite' + timestamp + '.png' //生成样式文件图片引用地址的路径,如下将生产：backgound:url(../images/sprite20324232.png)
                }))
                .pipe(cssmin())
                .pipe(gulp.dest('./dist/resource/css'));//产出路径
        });

## 技巧

#### gulp-css-spriter默认会对样式文件里，所有的background/background-image的图片合并，但实际项目中，我们不是所有的图片都需要合并。

    background-image:url(../slice/p1-3.png?__spriter);//有?__spriter后缀的合并
    background-image:url(../slice/p-cao1.png);//不合并

#### 修改下面文件可以按需合并。

    node_modules\gulp-css-spriter\lib\map-over-styles-and-transform-background-image-declarations.js

#### 48行开始的if-else if代码块中，替换为下面代码：

    //background-imagealwayshasaurl且判断url是否有?__spriter后缀
    if(transformedDeclaration.property==='background-image'&&/\?__spriter/i.test(transformedDeclaration.value)){
        transformedDeclaration.value=transformedDeclaration.value.replace('?__spriter','');
        returncb(transformedDeclaration,declarationIndex,declarations);
    }
    //Backgroundisashorthandpropertysomakesure`url()`isinthere且判断url是否有?__spriter后缀
    elseif(transformedDeclaration.property==='background'&&/\?__spriter/i.test(transformedDeclaration.value)){
        transformedDeclaration.value=transformedDeclaration.value.replace('?__spriter','');
        varhasImageValue=spriterUtil.backgroundURLRegex.test(transformedDeclaration.value);
        if(hasImageValue){
            returncb(transformedDeclaration,declarationIndex,declarations);
        }
    }