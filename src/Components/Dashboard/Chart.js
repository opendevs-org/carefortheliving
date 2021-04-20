import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts/lib';
import Title from './Title';

function createData(day, amount) {
  return { day, amount };
}

function weekDate(days) {
  let todayDate = new Date();
  todayDate.setDate(todayDate.getDate()-days);
  let date = todayDate.getDate()
  let month = todayDate.getMonth()+1
  let day = todayDate.getDay()
  const daysString = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  let dayInWords = daysString[day]
  return String(date).concat('/', String(month), ' ', String(dayInWords))
}

const weekDay = [
  weekDate(6),
  weekDate(5),
  weekDate(4),
  weekDate(3),
  weekDate(2),
  weekDate(1),
  weekDate(0),
]

const data = [
  createData(weekDay[0], 500),
  createData(weekDay[1], 300),
  createData(weekDay[2], 800),
  createData(weekDay[3], 800),
  createData(weekDay[4], 1500),
  createData(weekDay[5], 2000),
  createData(weekDay[6], 200),
];

export default function Chart(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>This Week</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 16,
            left: 24,
          }}
        >
          <XAxis dataKey="day" stroke={theme.palette.text.secondary} dy={0}>
          </XAxis>
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Amount
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}