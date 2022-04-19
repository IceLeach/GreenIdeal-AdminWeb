import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <>
      <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
        欢迎使用系统
        <div>
          <a href='/grapheditor'>Graph Editor</a>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
