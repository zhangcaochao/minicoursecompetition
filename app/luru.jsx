import React from 'react';
import {render} from 'react-dom';
import Main from './Main/Main';
import Luru from './luru/luru.react';
import style from './app.less';

const ele = document.createElement('div');
document.body.appendChild(ele);
render(<Luru className={style.luru}/>, ele)
