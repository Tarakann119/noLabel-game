import React, { FC } from 'react';
import classNames from 'classnames';
import './index.scss';

type HeaderH1Props = {
  label: string;
};

const HeaderH1: FC<HeaderH1Props> = ({ label }) => {
  return <h1 className={classNames('h1')}>{label}</h1>;
};

export default HeaderH1;
