module.exports = {
  // 对所有JS/TS/TSX/JSX文件运行ESLint
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
  // 对CSS/SCSS文件运行Stylelint
  '**/*.{css,scss}': ['stylelint --fix'],
  // 对所有支持的文件运行Prettier格式化
  '**/*.{js,jsx,ts,tsx,json,css,scss,md}': ['prettier --write'],
};
