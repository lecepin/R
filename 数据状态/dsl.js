export default [
  {
    id: "PageHeader_a8758f9d",
    componentName: "PageHeader",
    props: {
      title: {
        type: "JSStatement",
        value: "state.title", // 有state. 方便替换操作
      },
      subTitle: {
        type: "JSStatement",
        value: "state.subTitle",
      },
    },
    css: "background: yellow;",
  },
  {
    id: "Space_f935a7d4",
    componentName: "Space",
    props: {
      direction: "vertical",
    },
    css: "padding: 20px;",
    children: [
      {
        id: "Input_axe30776",
        componentName: "Input",
        props: { placeholder: "Basic usage" },
        css: "",
      },
      {
        id: "Switch_a8e30776",
        componentName: "Switch",
        props: {
          checkedChildren: "开启",
          unCheckedChildren: "关闭",
          defaultChecked: true,
        },
        css: "background: green;",
      },
      {
        componentName: "Button",
        props: {
          type: "primary",
        },
        children: ["按钮一"],
      },
      {
        componentName: "Steps",
        props: {
          current: 1,
          direction: "vertical",
        },
        children: [
          {
            componentName: "Steps.Step",
            props: {
              title: "第一步我们要做这件事",
            },
          },
          {
            componentName: "Steps.Step",
            props: {
              title: "第2步我们要做那件事",
            },
          },
          {
            componentName: "Steps.Step",
            props: {
              title: "第三步最后一件事",
            },
          },
        ],
      },
    ],
  },
];
