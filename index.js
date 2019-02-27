module.exports = {
  "release": {
    "branch": "master"
  },
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "parserOpts": {
          "noteKeywords": [
            "BREAKING CHANGE",
            "BREAKING CHANGES",
            "BREAKING"
          ]
        }
      }
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        "preset": "angular",
        "parserOpts": {
          "noteKeywords": [
            "BREAKING CHANGE",
            "BREAKING CHANGES",
            "BREAKING"
          ]
        },
        "writerOpts": {
          "headerPartial": "{{#if isPatch~}}\n  ##\n{{~else~}}\n  #\n{{~/if}} {{#if @root.linkCompare~}}\n  [Release {{version}}](\n  {{~#if @root.repository~}}\n    {{~#if @root.host}}\n      {{~@root.host}}/\n    {{~/if}}\n    {{~#if @root.owner}}\n      {{~@root.owner}}/\n    {{~/if}}\n    {{~@root.repository}}\n  {{~else}}\n    {{~@root.repoUrl}}\n  {{~/if~}}\n  /compare/{{previousTag}}...{{currentTag}})\n{{~else}}\n  Release {{~version}}\n{{~/if}} {{~#if title}} \"{{title}}\"{{~/if}}",
          "commitsSort": [
            "scope",
            "subject"
          ]
        }
      }
    ],
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        "npmPublish": false
      }
    ],
    [
      "@semantic-release/git",
      {
        "message": "chore(release): ${nextRelease.version}"
      }
    ],
    "@semantic-release/github",
    [
      "@semantic-release/exec",
      {
        "successCmd": "node_modules/.bin/sentry-cli releases new ${nextRelease.version} && node_modules/.bin/sentry-cli releases set-commits ${nextRelease.version} --auto && node_modules/.bin/sentry-cli releases finalize ${nextRelease.version} # Disabled for now # node_modules/.bin/sentry-cli releases files ${nextRelease.version} upload-sourcemaps build/js --ext map --rewrite &&"
      }
    ]
  ]
};