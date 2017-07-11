# rc-calendar-extend
    > extensions of yearPicker and seasonPicker to rc-calendar

# 安装
    > $ npm install rc-calendar-extend --save

# 使用
   * 引用(详细例子参考examples/index.js)
   ```
   import { YearCalendar, SeasonCalendar, DatePicker, zhCN, enUS } from 'rc-calendar-extend'

   render() {
       const calendar = <YearCalendar locale={zhCN} style={{ zIndex: 1000, height: '310px'  }} />
       const Scalendar = <SeasonCalendar locale={zhCN} style={{ zIndex: 1000, height: '310px' }} />
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
   ```
   * API：参考http://react-component.github.io/calendar/
