import React, { useState } from "react";
import { theme, Transfer, Tree } from "antd";
import { TransferDirection, TransferItem } from "antd/es/transfer";
import type { DataNode } from "antd/es/tree";

const Dashboard = () => {
  interface TreeTransferProps {
    dataSource: DataNode[];
    targetKeys: string[];
    onChange: (
      targetKeys: string[],
      direction: TransferDirection,
      moveKeys: string[]
    ) => void;
  }

  const treeData: DataNode[] = [
    {
      key: "a",
      title: "a",
      children: [
        {
          key: "aa",
          title: "aa",
          children: [
            { key: "aaa", title: "aaa" },
            { key: "aaa1", title: "aaa1" },
          ],
        },
      ],
    },
    {
      key: "b",
      title: "b",
      children: [
        {
          key: "bb",
          title: "bb",
          children: [
            { key: "bbb", title: "bbb" },
            { key: "bbb1", title: "bbb1" },
          ],
        },
      ],
    },
    {
      key: "c",
      title: "c",
      children: [
        {
          key: "cc",
          title: "cc",
          children: [
            {
              key: "ccc",
              title: "ccc",
            },
            { key: "ddd", title: "ddd" },
            { key: "dddd", title: "dddd" },
          ],
        },
      ],
    },
    {
      key: "e",
      title: "0-1-0",
      children: [
        { key: "ee", title: "0-2" },
        { key: "ee1", title: "0-3" },
        { key: "ee2", title: "0-4" },
      ],
    },
  ];
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const treeNode: DataNode[] = [];
  const convertToKeyArray = (dataArr: DataNode[]): (string | number)[] => {
    const result: (string | number)[] = [];
    dataArr.forEach((value, index, array) => {
      return result.push(value.key);
    });
    return result;
  };
  const findLeaf = (arr: (string | number)[]): (string | number)[] => {
    let leafKey: (string | number)[] = [];
    arr.forEach(
      (value: string | number, index: number, array: (string | number)[]) => {
        treeNode.forEach((valueNode, indexNode, arrayNode) => {
          if (value === valueNode.key) {
            console.log("kk");
            if (valueNode.isLeaf === true) {
              leafKey.push(valueNode.key);
            } else if (valueNode?.isLeaf && valueNode.isLeaf === false) {
              leafKey.push(
                ...findLeaf(convertToKeyArray(valueNode.children as DataNode[]))
              );
            }
          }
        });
      }
    );
    return leafKey;
  };
  const onChange = (keys: string[]) => {
    const result: (string | number)[] = findLeaf(keys);
    const keySelected: string[] = result.map((value, index, array) => {
      return value.toString();
    });

    setTargetKeys(keySelected);
  };

  // Customize Table Transfer
  const isChecked = (
    selectedKeys: (string | number)[],
    eventKey: string | number
  ) => {
    return selectedKeys.includes(eventKey);
  };
  const generateTree = (
    treeNodes: DataNode[] = [],
    checkedKeys: string[] = []
  ): DataNode[] => {
    return treeNodes.map(({ children, ...props }) => {
      const isLeaf = !(children && children?.length > 0);
      treeNode.push({
        key: props.key,
        children: children,
        isLeaf: isLeaf,
      });
      return {
        ...props,
        isLeaf: isLeaf,
        disabled: checkedKeys.includes(props.key as string),
        children: generateTree(children, checkedKeys),
      };
    });
  };

  const TreeTransfer = ({
    dataSource,
    targetKeys,
    ...restProps
  }: TreeTransferProps) => {
    const { token } = theme.useToken();

    const transferDataSource: TransferItem[] = [];
    function flatten(list: DataNode[] = []) {
      list.forEach((item) => {
        transferDataSource.push(item as TransferItem);
        flatten(item.children);
      });
    }

    flatten(dataSource);

    return (
      <Transfer
        {...restProps}
        targetKeys={targetKeys}
        dataSource={transferDataSource}
        className="tree-transfer"
        render={(item) => item.title!}
        showSelectAll={true}
      >
        {({ direction, onItemSelect, selectedKeys }) => {
          if (direction === "left") {
            const checkedKeys = [...selectedKeys, ...targetKeys];
            return (
              <div style={{ padding: token.paddingXS }}>
                <Tree
                  blockNode
                  defaultExpandAll
                  checkedKeys={checkedKeys}
                  treeData={generateTree(dataSource, targetKeys)}
                  onCheck={function (selectedKeys, info) {
                    // onItemSelect(
                    //   info.node.key as string,
                    //   info.node.isLeaf
                    //     ? !isChecked(checkedKeys, info.node.key)
                    //     : isChecked(checkedKeys, info.node.key)
                    // );
                    onItemSelect(
                      info.node.key as string,
                      !isChecked(checkedKeys, info.node.key)
                    );
                  }}
                  onSelect={function (selectedKeys, info) {
                    onItemSelect(
                      info.node.key as string,
                      info.node.isLeaf
                        ? !isChecked(checkedKeys, info.node.key)
                        : isChecked(checkedKeys, info.node.key)
                    );
                  }}
                  checkable
                  selectedKeys={selectedKeys}
                />
              </div>
            );
          }
        }}
      </Transfer>
    );
  };
  return (
    <TreeTransfer
      dataSource={treeData}
      targetKeys={targetKeys}
      onChange={onChange}
    />
  );
};
export default Dashboard;
