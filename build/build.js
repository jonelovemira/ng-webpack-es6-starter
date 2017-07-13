import gulp     from 'gulp';
import gutil    from 'gulp-util';
import path     from 'path';
import webpack  from 'webpack';
import config   from './config';
import ignore   from 'gulp-ignore';
import rimraf   from 'gulp-rimraf';
import webpackConfig from './webpack.build.config';


gulp.task('clean-dist', () => {
    return gulp.src(config.PATH_DIST + '/**/*.*') 
           .pipe(ignore('.svn/**'))
           .pipe(ignore('WEB-INF/**'))
           .pipe(rimraf());
});

gulp.task('build', ['clean-dist'], () => {
    webpackConfig.entry.app = config.WEBPACK_ENTRY;

    webpack(webpackConfig, (err, stats) => {
        if(err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            colors: true,
            chunks: false,
            errorDetails: true
        }));
    });
});