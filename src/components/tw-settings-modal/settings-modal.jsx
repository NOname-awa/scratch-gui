import { defineMessages, FormattedMessage, intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import FancyCheckbox from '../tw-fancy-checkbox/checkbox.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import DocumentationLink from '../tw-documentation-link/documentation-link.jsx';
import styles from './settings-modal.css';

/* eslint-disable react/no-multi-comp */

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    title: {
        defaultMessage: 'Advanced Settings',
        description: 'Title of settings modal',
        id: 'tw.settingsModal.title'
    },
    help: {
        defaultMessage: 'Click for help',
        description: 'Hover text of help icon in settings',
        id: 'tw.settingsModal.help'
    }
});

const LearnMore = props => (
    <React.Fragment>
        {' '}
        <DocumentationLink {...props}>
            <FormattedMessage
                defaultMessage="Learn more."
                id="gui.alerts.cloudInfoLearnMore"
            />
        </DocumentationLink>
    </React.Fragment>
);

class UnwrappedSetting extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleClickHelp'
        ]);
        this.state = {
            helpVisible: false
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.active && !prevProps.active) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                helpVisible: true
            });
        }
    }
    handleClickHelp() {
        this.setState(prevState => ({
            helpVisible: !prevState.helpVisible
        }));
    }
    render() {
        return (
            <div
                className={classNames(styles.setting, {
                    [styles.active]: this.props.active
                })}
            >
                <div className={styles.label}>
                    {this.props.primary}
                    <button
                        className={styles.helpIcon}
                        onClick={this.handleClickHelp}
                        title={this.props.intl.formatMessage(messages.help)}
                    />
                </div>
                {this.state.helpVisible && (
                    <div className={styles.detail}>
                        {this.props.help}
                    </div>
                )}
                {this.props.secondary}
            </div>
        );
    }
}
UnwrappedSetting.propTypes = {
    intl: intlShape,
    active: PropTypes.bool,
    help: PropTypes.node,
    primary: PropTypes.node,
    secondary: PropTypes.node,
    slug: PropTypes.string
};
const Setting = injectIntl(UnwrappedSetting);

const BooleanSetting = ({ value, onChange, label, ...props }) => (
    <Setting
        {...props}
        active={value}
        primary={
            <label className={styles.label}>
                <FancyCheckbox
                    className={styles.checkbox}
                    checked={value}
                    onChange={onChange}
                />
                {label}
            </label>
        }
    />
);
BooleanSetting.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
    label: PropTypes.node.isRequired
};

const HighQualityPen = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="High Quality Pen"
                description="High quality pen setting"
                id="tw.settingsModal.highQualityPen"
            />
        }
        slug="high-quality-pen"
    />
);

const CustomFPS = props => (
    <BooleanSetting
        value={props.framerate !== 30}
        onChange={props.onChange}
        label={
            "60 FPS"
        }
        slug="custom-fps"
    />
);
CustomFPS.propTypes = {
    framerate: PropTypes.number,
    onChange: PropTypes.func,
    onCustomizeFramerate: PropTypes.func
};

const Interpolation = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="Interpolation"
                description="Interpolation setting"
                id="tw.settingsModal.interpolation"
            />
        }
        slug="interpolation"
    />
);

const InfiniteClones = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="Infinite Clones"
                description="Infinite Clones setting"
                id="tw.settingsModal.infiniteClones"
            />
        }
        slug="infinite-clones"
    />
);

const RemoveFencing = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="Remove Fencing"
                description="Remove Fencing setting"
                id="tw.settingsModal.removeFencing"
            />
        }
        slug="remove-fencing"
    />
);

const RemoveMiscLimits = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="Remove Miscellaneous Limits"
                description="Remove Miscellaneous Limits setting"
                id="tw.settingsModal.removeMiscLimits"
            />
        }
        slug="remove-misc-limits"
    />
);

const WarpTimer = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="Warp Timer"
                description="Warp Timer setting"
                id="tw.settingsModal.warpTimer"
            />
        }
        slug="warp-timer"
    />
);

const DisableCompiler = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="Disable Compiler"
                description="Disable Compiler setting"
                id="tw.settingsModal.disableCompiler"
            />
        }
        slug="disable-compiler"
    />
);

const CustomStageSize = ({
    customStageSizeEnabled,
    stageWidth,
    onStageWidthChange,
    stageHeight,
    onStageHeightChange
}) => (
    <Setting
        active={customStageSizeEnabled}
        primary={(
            <div className={classNames(styles.label, styles.customStageSize)}>
                <FormattedMessage
                    defaultMessage="舞台区大小："
                    description="Custom Stage Size option"
                    id="tw.settingsModal.setStageSize"
                />
                <BufferedInput
                    value={stageWidth}
                    onSubmit={onStageWidthChange}
                    className={styles.customStageSizeInput}
                    type="number"
                    min="1"
                    step="1"
                />
                <span>{'×'}</span>
                <BufferedInput
                    value={stageHeight}
                    onSubmit={onStageHeightChange}
                    className={styles.customStageSizeInput}
                    type="number"
                    min="1"
                    step="1"
                />
            </div>
        )}
        slug="custom-stage-size"
    />
);
CustomStageSize.propTypes = {
    customStageSizeEnabled: PropTypes.bool,
    stageWidth: PropTypes.number,
    onStageWidthChange: PropTypes.func,
    stageHeight: PropTypes.number,
    onStageHeightChange: PropTypes.func
};

const StoreProjectOptions = ({ onStoreProjectOptions }) => (
    <div className={styles.setting}>
        <div>
            <button
                onClick={onStoreProjectOptions}
                className={styles.button}
            >
                <FormattedMessage
                    defaultMessage="Store settings in project"
                    description="Button in settings modal"
                    id="tw.settingsModal.storeProjectOptions"
                />
            </button>
        </div>
    </div>
);
StoreProjectOptions.propTypes = {
    onStoreProjectOptions: PropTypes.func
};

const Header = props => (
    <div className={styles.header}>
        {props.children}
        <div className={styles.divider} />
    </div>
);
Header.propTypes = {
    children: PropTypes.node
};

const CustomFramerate = ({ framerate, onFramerateChange }) => (
    <div className={classNames(styles.setting, styles.customFramerate)}>
        <div className={styles.label}>
            帧率：
            <BufferedInput
                value={framerate}
                onSubmit={value => {
                    setInputValue(value);
                    vm.setFramerate(inputValue);
                }}
                className={styles.customStageSizeInput}
                type="number"
                min="0"
                max="250"
                step="1"
            />
        </div>
    </div>
);

CustomFramerate.propTypes = {
    framerate: PropTypes.number,
    onFramerateChange: PropTypes.func,
};

const SettingsModalComponent = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onClose}
        contentLabel={props.intl.formatMessage(messages.title)}
        id="settingsModal"
    >
        <Box className={styles.body}>
            {/*
            <Header>
                <FormattedMessage
                    defaultMessage="Featured"
                    description="Settings modal section"
                    id="tw.settingsModal.featured"
                />
            </Header>
            */}
            <CustomFPS
                framerate={props.framerate}
                onChange={props.onFramerateChange}
                onCustomizeFramerate={props.onCustomizeFramerate}
            />
            <a onClick={props.onCustomizeFramerate} tabIndex="0">
                <span>{'自定义帧率'}</span>
            </a>
            <Interpolation
                value={props.interpolation}
                onChange={props.onInterpolationChange}
            />
            <HighQualityPen
                value={props.highQualityPen}
                onChange={props.onHighQualityPenChange}
            />
            <WarpTimer
                value={props.warpTimer}
                onChange={props.onWarpTimerChange}
            />
            {/*<Header>
                <FormattedMessage
                    defaultMessage="Remove Limits"
                    description="Settings modal section"
                    id="tw.settingsModal.removeLimits"
                />
            </Header>*/}
            <InfiniteClones
                value={props.infiniteClones}
                onChange={props.onInfiniteClonesChange}
            />
            <RemoveFencing
                value={props.removeFencing}
                onChange={props.onRemoveFencingChange}
            />
            <RemoveMiscLimits
                value={props.removeLimits}
                onChange={props.onRemoveLimitsChange}
            />
            {/*<Header>
                <FormattedMessage
                    defaultMessage="Danger Zone"
                    description="Settings modal section"
                    id="tw.settingsModal.dangerZone"
                />
            </Header>*/}
            {!props.isEmbedded && (
                <CustomStageSize
                    {...props}
                />
            )}
            {/*<CustomFramerate
                framerate={props.framerate}
                onFramerateChange={props.onFramerateChange}
            />*/}
            <DisableCompiler
                value={props.disableCompiler}
                onChange={props.onDisableCompilerChange}
            />
            {!props.isEmbedded && (
                <StoreProjectOptions
                    {...props}
                />
            )}
        </Box>
    </Modal>
);

SettingsModalComponent.propTypes = {
    intl: intlShape,
    onClose: PropTypes.func,
    isEmbedded: PropTypes.bool,
    framerate: PropTypes.number,
    onFramerateChange: PropTypes.func,
    onCustomizeFramerate: PropTypes.func,
    highQualityPen: PropTypes.bool,
    onHighQualityPenChange: PropTypes.func,
    interpolation: PropTypes.bool,
    onInterpolationChange: PropTypes.func,
    infiniteClones: PropTypes.bool,
    onInfiniteClonesChange: PropTypes.func,
    removeFencing: PropTypes.bool,
    onRemoveFencingChange: PropTypes.func,
    removeLimits: PropTypes.bool,
    onRemoveLimitsChange: PropTypes.func,
    warpTimer: PropTypes.bool,
    onWarpTimerChange: PropTypes.func,
    disableCompiler: PropTypes.bool,
    onDisableCompilerChange: PropTypes.func
};

export default injectIntl(SettingsModalComponent);
