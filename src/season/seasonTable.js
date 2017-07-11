import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getTodayTime, getMonthName } from 'rc-calendar/lib/util/index';

const ROW = 4;
const COL = 1;

function chooseQuarter(quarter) {
    const next = this.state.value.clone();
    next.month(quarter);
    this.setAndSelectValue(next);
}

function noop() {

}

class SeasonTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value,
            });
        }
    }

    setAndSelectValue(value) {
        this.setState({
            value,
        });
        this.props.onSelect(value);
    }

    seasons() {
        const value = this.state.value;
        const current = value.clone();
        const seasons = [];
        let index = 0;
        for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
            seasons[rowIndex] = [];
            for (let colIndex = 0; colIndex < COL; colIndex++) {
                current.month(index);
                const content = index+1;
                seasons[rowIndex][colIndex] = {
                    value: index,
                    content,
                    title: content,
                };
                index++;
            }
        }
        return seasons;
    }

    render() {
        const props = this.props;
        const value = this.state.value;
        const today = getTodayTime(value);
        const seasons = this.seasons();
        const currentQuarter = value.month();
        const { prefixCls, locale, contentRender, cellRender } = props;
        const seasonsEls = seasons.map((season, index) => {
            const tds = season.map(seasonData => {
                let disabled = false;
                if (props.disabledDate) {
                    const testValue = value.clone();
                    testValue.month(seasonData.value);
                    disabled = props.disabledDate(testValue);
                }
                const classNameMap = {
                    [`${prefixCls}-cell`]: 1,
                    [`${prefixCls}-cell-disabled`]: disabled,
                    [`${prefixCls}-selected-cell`]: seasonData.value === currentQuarter,
                    [`${prefixCls}-current-cell`]: today.year() === value.year() &&
                    seasonData.value === today.month(),
                };
                let cellEl;
                if (cellRender) {
                    const currentValue = value.clone();
                    currentValue.month(seasonData.value);
                    cellEl = cellRender(currentValue, locale);
                } else {
                    let content;
                    if (contentRender) {
                        const currentValue = value.clone();
                        currentValue.month(seasonData.value);
                        content = contentRender(currentValue, locale);
                    } else {
                        content = seasonData.content;
                    }
                    cellEl = (
                        <a className={`${prefixCls}-month`}>
                            {content}
                        </a>
                    );
                }
                return (
                    <td
                        role="gridcell"
                        key={seasonData.value}
                        onClick={disabled ? null : chooseQuarter.bind(this, seasonData.value)}
                        title={seasonData.title}
                        className={classnames(classNameMap)}
                    >
                        {cellEl}
                    </td>);
            });
            return (<tr key={index} role="row">{tds}</tr>);
        });

        return (
            <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
                <tbody className={`${prefixCls}-tbody ${prefixCls}-season-tbody`}>
                {seasonsEls}
                </tbody>
            </table>
        );
    }
}

SeasonTable.defaultProps = {
    onSelect: noop,
};
SeasonTable.propTypes = {
    onSelect: PropTypes.func,
    cellRender: PropTypes.func,
    prefixCls: PropTypes.string,
    value: PropTypes.object,
};
export default SeasonTable;
