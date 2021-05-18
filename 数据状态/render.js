import React from "react";
import { toLower } from "lodash";

// 递归渲染 Schema
function renderStyle(schema) {
  if (!schema) {
    return "";
  }

  return (Array.isArray(schema) ? schema : [schema])
    .map((item) => {
      if (item.css && item.id) {
        return `.${item.id}{${item.css}}` + "\n" + renderStyle(item.children);
      }
    })
    .join("");
}

// 替换 JS表达式
function replaceJSStatement(value, state) {
  if (isJSStatement(value)) {
    // return eval(value.value.replace(/state./g, "this.state."));
    const result = eval(value.value);

    if (result === undefined) {
      console.error(`数据状态 ${value.value} 未发现`);
      return value.value;
    }

    return result;
  }

  return value;
}

// 是否 JS 表达式
function isJSStatement(value) {
  return value?.type == "JSStatement";
}

// 解析props
function parseProps(props, state) {
  const result = {};

  Object.keys(props).map((key) => {
    result[key] = replaceJSStatement(props[key], state);
  });

  return result;
}

// 渲染 Schema
function renderSchema(schema, components, state) {
  if (!schema) {
    return null;
  }

  return (Array.isArray(schema) ? schema : [schema]).map((item) => {
    if (item.componentName) {
      // 如果 children 只是一个字符串的话，不进行任何包装
      return React.createElement(
        components[item.componentName] || toLower(item.componentName),
        { ...parseProps(item.props, state), className: item.id },
        renderSchema(item.children, components, state)
      );
    }

    return item; // 直接反回字符串
  });
}

// 添加样式
function appendStyle(css) {
  const el = document.createElement("style");

  el.setAttribute("type", "text/css");
  el.setAttribute("id", "aaaa");
  el.innerHTML = css;

  document.getElementsByTagName("head")[0].appendChild(el);
}

export default {
  renderStyle,
  replaceJSStatement,
  renderSchema,
  appendStyle,
};
