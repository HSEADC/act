const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    gallery: './src/scripts/gallery.js',
    articles: './src/scripts/articles.js',
    authors: './src/scripts/authors.js',
    similar: './src/scripts/similar.js',
    breakdown: './src/scripts/breakdown.js',
    landing: './src/scripts/landing.js',
    search: './src/scripts/search-vanila.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/images',
          to: 'images'
        }
      ]
    }),

    // Главная
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index', 'gallery']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/styleguide.html',
      filename: './styleguide.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/about_us.html',
      filename: './about_us.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/articles.html',
      filename: './articles.html',
      chunks: ['index', 'articles']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/authors.html',
      filename: './authors.html',
      chunks: ['index', 'authors']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/authors/AshThorp.html',
      filename: './authors/AshThorp.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/authors/Beeple.html',
      filename: './authors/Beeple.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/authors/Gmunk.html',
      filename: './authors/Gmunk.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/authors/QuentinDeronz.html',
      filename: './authors/QuentinDeronz.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/authors/SaadMoosajee.html',
      filename: './authors/SaadMoosajee.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/authors/WarrenFu.html',
      filename: './authors/WarrenFu.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/authors/TobiasGremmler.html',
      filename: './authors/TobiasGremmler.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/authors/АnnaSOD.html',
      filename: './authors/АnnaSOD.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/authors/Ohzeon.html',
      filename: './authors/Ohzeon.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/supernova.html',
      filename: './videos/supernova.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/animeMe.html',
      filename: './videos/animeMe.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/avatarTheWeekend.html',
      filename: './videos/avatarTheWeekend.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/collapset69.html',
      filename: './videos/collapset69.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/dday.html',
      filename: './videos/dday.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/feelThePop.html',
      filename: './videos/feelThePop.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/flow.html',
      filename: './videos/flow.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/girlsNeverDie.html',
      filename: './videos/girlsNeverDie.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/goWona.html',
      filename: './videos/goWona.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/KPOPclip1.html',
      filename: './videos/KPOPclip1.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/KPOPclip2.html',
      filename: './videos/KPOPclip2.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/nihilistbluesBMTH.html',
      filename: './videos/nihilistbluesBMTH.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/readyforlove.html',
      filename: './videos/readyforlove.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/shinigamieyes.html',
      filename: './videos/shinigamieyes.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/terminalslam.html',
      filename: './videos/terminalslam.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/theFlood.html',
      filename: './videos/theFlood.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/triggerTheBoys.html',
      filename: './videos/triggerTheBoys.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/wokeUpXG.html',
      filename: './videos/wokeUpXG.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/zolloc1.html',
      filename: './videos/zolloc1.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/zolloc2.html',
      filename: './videos/zolloc2.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/zolloc3.html',
      filename: './videos/zolloc3.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/videos/armageddon.html',
      filename: './videos/armageddon.html',
      chunks: ['index', 'similar']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/error404.html',
      filename: './error404.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/error505.html',
      filename: './error505.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/articles/reviews/vonDutch.html',
      filename: './articles/reviews/vonDutch.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/articles/reviews/vrEffects.html',
      filename: './articles/reviews/vrEffects.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/articles/breakdowns/supernova.html',
      filename: './articles/breakdowns/supernova.html',
      chunks: ['index', 'breakdown']
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/landing.html',
      filename: './landing.html',
      chunks: ['index', 'landing']
    }),

    new HtmlWebpackPlugin({
      template: './src/search.html',
      filename: './search.html',
      chunks: ['index', 'search']
      // 'search' для ванилы
    }),



    //  new HtmlWebpackPlugin({
    //    template: './src/articles/breakdowns/breakdown.html',
    //   filename: './articles/breakdowns/breakdown.html'
    //  }),

    // new HtmlWebpackPlugin({
    //   template: './src/articles/reviews/review.html',
    //   filename: './articles/reviews/review.html'
    //  })

    // Internal pages
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   scriptLoading: 'blocking',
    //   template: './src/pages/page.html',
    //   filename: './pages/page.html',
    //   chunks: ['page']
    // }),

    // Partials
       new HtmlWebpackPartialsPlugin([
       {
         path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
         priority: 'replace'
       }
     ])
  ],
  optimization: {
    // minimizer: [new CssMinimizerPlugin()]
  }
}
