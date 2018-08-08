const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  initializing() {
    this.props = {
      package: {},
      path: ""
    };
  }
  info() {
    this.log(`this react project start install...`);
  }
  prompting() {
    let prompts = [
      {
        type: "string",
        name: "name",
        message: "you react project name",
        default: path.basename(process.cwd())
      },
      {
        type: "string",
        name: "author",
        message: "you react project author",
        default: ""
      },
      {
        type: "string",
        name: "main",
        message: "you react project main file",
        default: "index.js"
      },
      {
        type: "string",
        name: "license",
        message: "you react project license",
        default: "MIT"
      },
      {
        type: "string",
        name: "version",
        message: "you react project version",
        default: "1.0.0"
      },
      {
        type: "string",
        name: "keywords",
        message: "you react project keywords",
        default: ""
      },
      {
        type: "string",
        name: "description",
        message: "you react project description",
        default: ""
      }
    ];
    return this.prompt(prompts).then(props =>
      Object.assign(this.props.package, props)
    );
  }

  writing() {
    let pkg = Object.assign({}, this.props.package);
    pkg.keywords = this.props.package.keywords.split(" ") || [];
    this.fs.copy(path.join(__dirname, "templates", "gitignore"), ".gitignore");
    this.fs.copy(path.join(__dirname, "templates", "babelrc"), ".babelrc");
    this.fs.copy(path.join(__dirname, "templates", "README.md"), "README.md");
    this.fs.copy(
      path.join(__dirname, "templates", "webpack.common.js"),
      "webpack.common.js"
    );
    this.fs.copy(path.join(__dirname, "templates", "src/"), "src/");
    this.fs.copy(path.join(__dirname, "templates", "config/"), "config/");
    this.fs.copy(path.join(__dirname, "templates", "dist/"), "dist/");

    pkg.scripts = {
      dev: "webpack --config ./webpack.config.dev.js && node server.js",
      build: "webpack"
    };
    this.fs.writeJSON(this.destinationPath("package.json"), pkg);
  }

  install() {
    this.npmInstall(
      [
        "babel-preset-env",
        "prop-types",
        "react",
        "react-dom",
        "react-redux",
        "react-router-dom",
        "redux"
      ],
      { save: true }
    );
    this.npmInstall(
      [
        "babel-core",
        "babel-loader",
        "babel-preset-react",
        "babel-preset-stage-2",
        "css-loader",
        "mini-css-extract-plugin",
        "node-sass",
        "react-hot-loader",
        "sass-loader",
        "style-loader",
        "uglifyjs-webpack-plugin",
        "webpack",
        "webpack-cli",
        "webpack-dev-server",
        "webpack-merge"
      ],
      { saveDev: true }
    );
  }

  end() {
    this.log(`project create complete!!!`);
  }

  install() {
    this.installDependencies();
  }
};
