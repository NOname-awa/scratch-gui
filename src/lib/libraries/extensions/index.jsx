import Null from './null/null.svg';

import React from 'react';
import { FormattedMessage } from 'react-intl';

import musicIconURL from './music/music.png';
import musicInsetIconURL from './music/music-small.svg';

import penIconURL from './pen/pen.png';
import penInsetIconURL from './pen/pen-small.svg';

import textURL from './text/text.png';
import textIconURL from './text/icon.svg';

import videoSensingIconURL from './videoSensing/video-sensing.png';
import videoSensingInsetIconURL from './videoSensing/video-sensing-small.svg';

import text2speechIconURL from './text2speech/text2speech.png';
import text2speechInsetIconURL from './text2speech/text2speech-small.svg';

import translateIconURL from './translate/translate.png';
import translateInsetIconURL from './translate/translate-small.png';

import makeymakeyIconURL from './makeymakey/makeymakey.png';
import makeymakeyInsetIconURL from './makeymakey/makeymakey-small.svg';

import gcbg from './gc/gc.svg';
import gci from './gc/gci.svg';

import databg from './data/data.png';
import dataI from './data/dataI.png';

import operationIcon from './operation/operation.png';

import controlIcon from './Control/Control.png';

import sensingIcon from './sensing/sensing.svg';

import regular_expressionIcon from './regular_expression/regular_expression.png';

import jsIcon from './js/js.png';

import customExtensionIcon from './custom/custom.svg';

import box2dIcon from './box2d/box2d.svg';
import box2dI from './box2d/box2d_Icon.svg';

export default [
    {
        name: (
            <FormattedMessage
                defaultMessage="Custom Extension"
                description="Name of library item to load a custom extension from a remote source"
                id="tw.customExtension.name"
            />
        ),
        extensionId: '',
        iconURL: customExtensionIcon,
        description: (
            <FormattedMessage
                defaultMessage="Load custom extensions from URLs, files, or JavaScript source code."
                description="Description of library item to load a custom extension from a custom source"
                id="tw.customExtension.description"
            />
        ),
        tags: ['tool'],
        internetConnectionRequired: true,
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        extensionId: 'pen',
        iconURL: penIconURL,
        insetIconURL: penInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        tags: ['scratch'],
        featured: true,
        collaborator: 'ScratchTeam & 大主教大祭司 & NOname'
    },
    {
        name: '运动',
        extensionId: 'MOTION',
        iconURL: Null,
        description: '运动扩展',
        tags: ['operation'],
        featured: true
    },
    {
        name: '动画文字',
        extensionId: 'text',
        iconURL: textURL,
        insetIconURL: textIconURL,
        description: "把角色变成动画文字。",
        collaborator: 'ScratchLab & GarboMuffin',
        tags: ['scratch', 'tool'],
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        extensionId: 'music',
        iconURL: musicIconURL,
        insetIconURL: musicInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        tags: ['scratch'],
        featured: true
    },
    {
        name: '控制',
        extensionId: 'CONTROL',
        iconURL: controlIcon,
        description: '控制扩展',
        tags: ['operation'],
        featured: true
    },
    {
        name: '侦测',
        extensionId: 'SENSING',
        iconURL: sensingIcon,
        description: '侦测扩展',
        tags: ['tool'],
        featured: true
    },
    {
        name: '运算',
        extensionId: 'OPERATION',
        iconURL: operationIcon,
        description: '高级运算，包含了数学、字符串、位运算、二维图形运算等。',
        tags: ['operation'],
        featured: true
    },
    {
        name: '物理引擎',
        collaborator: 'griffpatch',
        extensionId: 'box2d',
        iconURL: box2dIcon,
        insetIconURL: box2dI,
        description: '模拟 2D 刚体物体运动的引擎，帮你创造一个符合现实物理法则的二维世界。',
        tags: ['tool', 'other'],

        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' extension"
                id="gui.extension.videosensing.name"
            />
        ),
        extensionId: 'videoSensing',
        iconURL: videoSensingIconURL,
        insetIconURL: videoSensingInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense motion with the camera."
                description="Description for the 'Video Sensing' extension"
                id="gui.extension.videosensing.description"
            />
        ),
        tags: ['scratch', 'tool'],
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Text to Speech"
                description="Name for the Text to Speech extension"
                id="gui.extension.text2speech.name"
            />
        ),
        extensionId: 'text2speech',
        collaborator: 'Amazon Web Services',
        iconURL: text2speechIconURL,
        insetIconURL: text2speechInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make your projects talk."
                description="Description for the Text to speech extension"
                id="gui.extension.text2speech.description"
            />
        ),
        tags: ['scratch', 'tool'],
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Translate"
                description="Name for the Translate extension"
                id="gui.extension.translate.name"
            />
        ),
        extensionId: 'translate',
        collaborator: 'Google',
        iconURL: translateIconURL,
        insetIconURL: translateInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Translate text into many languages."
                description="Description for the Translate extension"
                id="gui.extension.translate.description"
            />
        ),
        tags: ['scratch', 'tool'],
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Makey Makey',
        extensionId: 'makeymakey',
        collaborator: 'JoyLabz',
        iconURL: makeymakeyIconURL,
        insetIconURL: makeymakeyInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make anything into a key."
                description="Description for the 'Makey Makey' extension"
                id="gui.extension.makeymakey.description"
            />
        ),
        tags: ['scratch', 'tool'],
        featured: true
    },
    {
        name: '数据',
        extensionId: 'Data',
        insetIconURL: dataI,
        iconURL: databg,
        description: '数据处理。',
        tags: ['operation'],
        featured: true
    },
    {
        name: '数据 New',
        extensionId: 'DATA',
        insetIconURL: dataI,
        iconURL: databg,
        description: '数据处理。',
        tags: ['operation'],
        featured: true
    },
    {
        name: '正则表达式',
        extensionId: 'RegularExpression',
        iconURL: regular_expressionIcon,
        description: '完成正则表达式相关的操作。',
        tags: ['operation', 'tool'],
        featured: true
    },
    {
        name: 'JS',
        extensionId: 'JavaScript',
        iconURL: jsIcon,
        description: 'JS',
        tags: ['tool'],
        featured: true
    }
];