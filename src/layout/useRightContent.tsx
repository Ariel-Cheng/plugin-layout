import React, { useCallback } from 'react';
import { Avatar, Dropdown, Menu, Icon, Spin } from 'antd';
import './style.less';
import { ILayoutRuntimeConfig } from '../../types/interface.d';

export default function useRightContent(
  runtimeLayout: ILayoutRuntimeConfig,
  loading: boolean,
  initialState: any,
) {
  const rightContentRender = useCallback(() => {
    if (runtimeLayout.rightRender) {
      return runtimeLayout.rightRender(initialState);
    }

    const menu = (
      <Menu className="umi-plugin-layout-menu">
        <Menu.Item key="logout" onClick={runtimeLayout.logout}>
          <Icon type="logout" />
          退出登陆
        </Menu.Item>
      </Menu>
    );

    const avatar = (
      <span className="umi-plugin-layout-action umi-plugin-layout-account">
        <Avatar
          size="small"
          className="umi-plugin-layout-avatar"
          src={
            initialState.avatar ||
            'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
          }
          alt="avatar"
        />
        <span className="umi-plugin-layout-name">{initialState && initialState.name}</span>
      </span>
    );

    if (loading) {
      return (
        <div className="umi-plugin-layout-right">
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        </div>
      );
    }

    return (
      <div className="umi-plugin-layout-right">
        {runtimeLayout.logout ? (
          <Dropdown overlay={menu} overlayClassName="umi-plugin-layout-container">
            {avatar}
          </Dropdown>
        ) : (
          avatar
        )}
      </div>
    );
  }, [initialState, loading]);

  return rightContentRender;
}
