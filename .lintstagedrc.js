module.exports = {
  'src/**/*.{ts,html}': (files) => [
    // This is because angular-cli just DOES NOT play well with MOST other OSS libs.
    // Resorting to this to make the files enumerate as required by the CLI
    `ng lint --fix ${files
      .map((file) => `--lint-file-patterns ${file}`)
      .join(' ')}`,
    `git add ${files.join(' ')}`
  ],
  'backend/**/*.js': (files) => [
    `eslint --fix ${files.join(' ')}`,
    `git add ${files.join(' ')}`
  ]
};
