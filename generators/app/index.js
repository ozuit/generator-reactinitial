const path = require("path");
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
    this.fs.copy(path.join(__dirname, "templates", ".gitignore"), ".gitignore");
    this.fs.copy(path.join(__dirname, "templates", ".babelrc"), ".babelrc");
    this.fs.copy(path.join(__dirname, "templates", "README.md"), "README.md");
    this.fs.copy(
      path.join(__dirname, "templates", "webpack.common.js"),
      "webpack.common.js"
    );
    this.fs.copy(path.join(__dirname, "templates", "src/"), "src/");
    this.fs.copy(path.join(__dirname, "templates", "config/"), "config/");
    this.fs.copy(path.join(__dirname, "templates", "dist/"), "dist/");

    pkg.scripts = {
      start: "webpack-dev-server --open --config config/webpack.dev.js",
      build: "webpack --config config/webpack.prod.js"
    };

    pkg.devDependencies = {
      "babel-core": "^6.26.3",
      "babel-loader": "^7.1.5",
      "babel-preset-react": "^6.24.1",
      "babel-preset-stage-2": "^6.24.1",
      "css-loader": "^1.0.0",
      "mini-css-extract-plugin": "^0.4.1",
      "node-sass": "^4.9.2",
      "react-hot-loader": "^4.3.3",
      "sass-loader": "^7.1.0",
      "style-loader": "^0.21.0",
      "uglifyjs-webpack-plugin": "^1.2.7",
      webpack: "^4.15.1",
      "webpack-cli": "^3.0.8",
      "webpack-dev-server": "^3.1.4",
      "webpack-merge": "^4.1.3"
    };

    pkg.dependencies = {
      "babel-preset-env": "^1.7.0",
      "prop-types": "^15.6.2",
      react: "^16.4.1",
      "react-dom": "^16.4.1",
      "react-redux": "^5.0.7",
      "react-router-dom": "^4.3.1",
      redux: "^4.0.0"
    };

    this.fs.writeJSON(this.destinationPath("package.json"), pkg);
  }

  install() {
    this.installDependencies();
  }

  end() {
    this.log(`project create complete!!!`);
  }
};
