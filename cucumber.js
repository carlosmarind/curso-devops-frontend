const config = {
  paths: ['tests/acceptance/features/**/*.feature'],
  require: ['tests/acceptance/step_definitions/**/*.ts'],
  requireModule: ['@swc-node/register'],
  format: [
    'progress-bar',
    'html:tests/reports/cucumber_report.html',
  ],
  timeout: 10000, // tiempo máximo por paso (ms)
  formatOptions: {
    snippetInterface: 'async-await',
  },
};

export default config