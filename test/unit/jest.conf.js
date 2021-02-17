const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    // モジュールが使用するファイル拡張子の配列を指定。ファイル拡張子を省略することができる
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    // 単一モジュールで画像やスタイルのようなリソースをスタブさせるために利用する正規表現パターン
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    // ソースファイルを変換する同期処理を行う関数を提供するモジュールするパスへのマップを正規表現で指定する。
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  testPathIgnorePatterns: [
    // テストしないディレクトリを指定
    '<rootDir>/test/e2e'
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'], // Jest がスナップショットに利用するシリアライザーのモジュールのパスのリストを指定
  setupzsFiles: ['<rootDir>/test/unit/setup'], // テスト前にテスト環境の構成やセットアップを行うためのモジュールへのパスを指定
  mapCoverage: true, // 出力先ファイルの設定。
  coverageDirectory: '<rootDir>/test/unit/coverage', // カバレッジ情報を出力するファイルを格納するディレクトリ
  collectCoverageFrom: [
    // カバレッジ情報を取得する対象ファイルを指定する globパターン の配列を指定。
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**'
  ]
}
