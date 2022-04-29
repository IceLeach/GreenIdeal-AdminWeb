import React, { useMemo, useState } from 'react';
import { Input, Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import styles from './index.less';

interface SearchTreeProps {
  treeData: DataNode[];
  activeKey?: (string | number)[];
  onNodeClick: (nodeData: any) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

const loop = (data: any[], searchValue: string) => {
  return data
    .map((item: any) => ({ ...item }))
    .filter((filterItem: any) => {
      filterItem.children =
        filterItem.children && loop(filterItem.children, searchValue);
      let flag = false;
      if (filterItem.name) {
        flag = filterItem.name.indexOf(searchValue) !== -1;
      }
      return flag || !!(filterItem.children && filterItem.children.length);
    });
};

const SearchTree: React.FC<SearchTreeProps> = (props) => {
  const {
    treeData,
    activeKey = [],
    onNodeClick,
    placeholder,
    className,
    style,
  } = props;
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const filterTreeData = useMemo(() => {
    if (searchValue) {
      const tranferTreeData = loop(treeData, searchValue);
      return tranferTreeData;
    } else {
      return treeData;
    }
  }, [searchValue, treeData]);
  const treeActiveKey = useMemo(() => activeKey, [activeKey]);

  return (
    <div
      className={
        className ? `${styles.searchTree} ${className}` : styles.searchTree
      }
      style={style}
    >
      <Input.Search
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onSearch={(value) => {
          setSearchValue(value);
        }}
        allowClear
      />
      <Tree
        defaultExpandAll
        treeData={filterTreeData}
        titleRender={(nodeData: any) => {
          // console.log('nodeData', nodeData)
          return (
            <div
              className={
                treeActiveKey.includes(nodeData.key) ? styles.activeNode : ''
              }
              onClick={() => onNodeClick(nodeData)}
            >
              <span title={nodeData.title}>{nodeData.title}</span>
            </div>
          );
        }}
        selectable={false}
      />
    </div>
  );
};

export default SearchTree;
