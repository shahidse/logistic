import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
type Props = {
  width?: number,
  height?: number
}
export default function CustomPieCahrt({
  width = 400,
  height = 200
}: Props) {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={width}
      height={height}
    />
  );
}
