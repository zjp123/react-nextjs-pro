// 创建简单的组件
import { FC } from 'react';

const Template: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <h3>包裹的template</h3>
      <div>{children}</div>
    </>
  );
};

export default Template;
