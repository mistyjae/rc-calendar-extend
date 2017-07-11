/**
 * Created by xlm on 2017/7/6.
 */
import React from 'react';
import 'rc-calendar/assets/index.css'
import 'styles/index.css'
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import KeyCode from 'rc-util/lib/KeyCode';
import YearPanel from 'rc-calendar/lib/year/YearPanel';
import CalendarMixin from 'rc-calendar/lib/mixin/CalendarMixin';
import CommonMixin from 'rc-calendar/lib/mixin/CommonMixin';

const YearCalendar = createReactClass({
    propTypes: {
        monthCellRender: PropTypes.func,
        dateCellRender: PropTypes.func,
    },
    mixins: [CommonMixin, CalendarMixin],

    onKeyDown(event) {
        const keyCode = event.keyCode;
        const ctrlKey = event.ctrlKey || event.metaKey;
        const stateValue = this.state.value;
        const { disabledDate } = this.props;
        let value = stateValue;
        switch (keyCode) {
            case KeyCode.DOWN:
                value = stateValue.clone();
                value.add(3, 'months');
                break;
            case KeyCode.UP:
                value = stateValue.clone();
                value.add(-3, 'months');
                break;
            case KeyCode.LEFT:
                value = stateValue.clone();
                if (ctrlKey) {
                    value.add(-1, 'years');
                } else {
                    value.add(-1, 'months');
                }
                break;
            case KeyCode.RIGHT:
                value = stateValue.clone();
                if (ctrlKey) {
                    value.add(1, 'years');
                } else {
                    value.add(1, 'months');
                }
                break;
            case KeyCode.ENTER:
                if (!disabledDate || !disabledDate(stateValue)) {
                    this.onSelect(stateValue);
                }
                event.preventDefault();
                return 1;
            default:
                return undefined;
        }
        if (value !== stateValue) {
            this.setValue(value);
            event.preventDefault();
            return 1;
        }
    },

    render() {
        const props = this.props;
        const children = (
            <YearPanel
                locale={props.locale}
                disabledDate={props.disabledDate}
                style={{ position: 'relative' }}
                value={this.state.value}
                cellRender={props.monthCellRender}
                contentRender={props.monthCellContentRender}
                rootPrefixCls={props.prefixCls}
                onChange={this.setValue}
                onSelect={this.onSelect}
            />
        );
        return this.renderRoot({
            children,
        });
    },
});

export default YearCalendar;
