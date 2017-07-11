process.env.__DEV__ && console.log('======= dev dev dev ========')
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { YearCalendar, SeasonCalendar, MonthCalendar, DatePicker, zhCN, enUS } from 'rc-calendar-extend'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/en-gb'

const format = {
    year: 'YYYY',
    month: 'YYYY-MM',
    season: 'YYYY-M'
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            season: '',
            month: '',
            year: ''
        }
    }

    onChange(key, value) {
        console.log(`DatePicker change: ${value && value.format(format[key])}`)
        this.setState({
            [key]: value
        })
    }

    render() {
        const calendar = <YearCalendar locale={zhCN} style={{ zIndex: 1000, height: '310px'  }} />
        const Scalendar = <SeasonCalendar locale={zhCN} style={{ zIndex: 1000, height: '310px' }} />
        const MCalendar = <MonthCalendar locale={zhCN} style={{ zIndex: 1000, height: '310px' }} />
        return (
            <div>
                <DatePicker
                    animation='slide-up'
                    disabled={false}
                    calendar={calendar}
                    value={this.state.year}
                    onChange={this.onChange.bind(this, 'year')}
                >
                    {
                        ({ value }) => {
                            return (<input
                                style={{ width: 200 }}
                                readOnly
                                disabled={false}
                                value={value && value.format(format['year'])}
                                placeholder='请选择年份'
                            />)
                        }
                    }
                </DatePicker>
                <DatePicker
                    animation='slide-up'
                    disabled={false}
                    calendar={MCalendar}
                    value={this.state.month}
                    onChange={this.onChange.bind(this, 'month')}
                >
                    {
                        ({ value }) => {
                            return (<input
                                style={{ width: 200 }}
                                readOnly
                                disabled={false}
                                value={value && value.format(format['month'])}
                                placeholder='请选择月份'
                            />)
                        }
                    }
                </DatePicker>
                <DatePicker
                    animation='slide-up'
                    disabled={false}
                    calendar={Scalendar}
                    value={this.state.season}
                    onChange={this.onChange.bind(this, 'season')}
                >
                    {
                        ({ value }) => {
                            return (<input
                                style={{ width: 200 }}
                                readOnly
                                disabled={false}
                                value={value && value.format(format['season'])}
                                placeholder='请选择季度'
                            />)
                        }
                    }
                </DatePicker>
            </div>
        )
    }
}

render(
    <App />,
    document.getElementById('root')
)
