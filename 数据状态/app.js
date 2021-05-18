import React from "react";
import { toLower } from "lodash";
import renderUtils from "./utils/render";
import * as antd from "antd";

import "antd/dist/antd.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.componentMap = {};

    // 转换antd到组件表
    Object.entries(antd).map((item) => {
      if (
        (typeof item[1] == "function" || typeof item[1] == "object") &&
        /^[A-Z]/.test(item[0])
      ) {
        this.componentMap[item[0]] = item[1];
        Object.entries(item[1]).map((_item) => {
          if (
            (typeof _item[1] == "function" || typeof _item[1] == "object") &&
            /^[A-Z]/.test(_item[0])
          ) {
            this.componentMap[item[0] + "." + _item[0]] = _item[1];
          }
        });
      }
    });

    // mock state
    this.state = {
      title: "我是一个state的标题",
    };
  }

  componentDidMount() {
    renderUtils.appendStyle(renderUtils.renderStyle(this.props.schema));
  }

  render() {
    const { schema } = this.props;

    return (
      <div className="App">
        {renderUtils.renderSchema(
          this.props.schema,
          this.componentMap,
          this.state
        )}

        <button
          onClick={() => {
            this.setState({
              title: Date.now(),
            });
          }}
        >
          xxxx
        </button>
      </div>
    );
  }
}

export default App;
