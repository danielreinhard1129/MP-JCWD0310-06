'use client';

import useGetEventsByOrganizer from '@/hooks/api/event/useGetEventsByOrganizer';
import useGetTransactionsByOrganizer from '@/hooks/api/tx/useGetTransactions';
import { useAppSelector } from '@/redux/hooks';
import { faker } from '@faker-js/faker';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const ChartByMonth = () => {
  const { id } = useAppSelector((state) => state.user);
  const { data: event } = useGetEventsByOrganizer({ id: id });
  const { data: transaction } = useGetTransactionsByOrganizer({ id: id });

  console.log(transaction);

  // const events = Object.keys(event).map((key) => key);
  const eventsCountPerMonth = Array(12).fill(0);
  if (event) {
    Object.keys(event).forEach((key) => {
      key;
      const date = new Date(event[Number(key)].start_date);
      const month = date.getMonth();
      eventsCountPerMonth[month]++;
    });
  }
  const transactionsCountPerMonth = Array(12).fill(0);
  if (transaction) {
    Object.keys(transaction).forEach((key) => {
      key;
      const date = new Date(transaction[Number(key)].createdAt);
      const month = date.getMonth();
      transactionsCountPerMonth[month]++;
    });
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Statistic per Month',
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Event',
        data: eventsCountPerMonth,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Transaction',
        data: transactionsCountPerMonth,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Attendees',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: '#14C11A',
        backgroundColor: '#0D9111',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ChartByMonth;
