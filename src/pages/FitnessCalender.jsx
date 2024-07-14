import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Calendar, LocaleConfig } from 'react-native-calendars';

const isNextDay = (date1, date2) => {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  const millisecDay = 86400000; // 24 * 60 * 60 * 1000
  return diff <= millisecDay;
}

const setMarkedDates = (dateData) => {
  
  
  const markedDates = {};
  const markColor = '#4AABFF';
  let keepGoing = false;
  let consecutiveDates = 0;
  let maxConsecutiveDates = 0;

  for (let i = 0; i < dateData.length; i++) {
    const currDate = dateData[i];
    const nextDate = dateData[i + 1];

    if (!keepGoing &&
      isNextDay(new Date(currDate), new Date(nextDate))) {
      markedDates[currDate] = { startingDay: true, color: markColor };
      keepGoing = true;
      consecutiveDates++;
    }

    else if (keepGoing &&
      !isNextDay(new Date(currDate), new Date(nextDate))) {
      markedDates[currDate] = { endingDay: true, color: markColor };
      keepGoing = false;
      consecutiveDates++;
      maxConsecutiveDates = Math.max(maxConsecutiveDates, consecutiveDates);
      consecutiveDates = 0;
    }

    else if (!keepGoing) {
      markedDates[currDate] = {
        endingDay: true,
        startingDay: true,
        color: markColor,
      };
    } else {
      markedDates[currDate] = {
        color: markColor,
      };
      consecutiveDates++;
    }
  }
  const markSpecificDates = {
    markedDates,
    maxConsecutiveDates: maxConsecutiveDates,
  };
  return markSpecificDates;

};

const FitnessCalender = ({ navigation }) => {
  const [selected, setSelected] = useState('');

  const markSpecificDates = setMarkedDates(dummy_date);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
      </View>
      <Calendar
        style={{ margin: 16, borderRadius: 8 }}
        onDayPress={day => { setSelected(day.dateString) }}
        enableSwipeMonths={true}
        monthFormat='yyyy년 M월'
        markingType="period"
        markedDates={markSpecificDates.markedDates}
        theme={{
          todayTextColor: '#402E7A',
          'stylesheet.calendar.header': {
            dayTextAtIndex0: { color: 'red' },
            dayTextAtIndex6: { color: 'blue' },
            dayTextAtIndex1: { color: 'black' },
            dayTextAtIndex2: { color: 'black' },
            dayTextAtIndex3: { color: 'black' },
            dayTextAtIndex4: { color: 'black' },
            dayTextAtIndex5: { color: 'black' },
          }
        }}
      />
      <View style={{ padding: 16, gap: 8 }}>
        <Text>{`총 ${dummy_date.length}회 운동을 완료했어요.`}</Text>
      <Text>{`최대 ${markSpecificDates.maxConsecutiveDates}일 동안 연속으로 운동했어요!`}</Text>
        <TouchableOpacity
          style={{ padding: 16, backgroundColor: '#4AABFF', borderRadius: 8 }}
          onPress={() => navigation.navigate('Add')}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            오운완 등록하기
          </Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

LocaleConfig.locales['kr'] = {
  monthNames: [],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'kr';

const dummy_date = [
  '2024-06-24',
  '2024-06-25',
  '2024-06-26',
  '2024-06-27',
  '2024-06-28',
  '2024-06-29',
  '2024-06-30',
  '2024-06-31',
  '2024-07-01',
  '2024-07-02',
  '2024-07-03',
  '2024-07-04',
  '2024-07-05',
  '2024-07-10',
  '2024-07-11',
  '2024-07-12',
];

export default FitnessCalender;