import React from 'react';
import { ChartCanvas, Chart } from 'stock-react-chart';
import { LineSeries } from 'stock-react-chart/lib/series';
import { XAxis, YAxis } from 'stock-react-chart/lib/axes';
import { scaleTime } from 'd3-scale';
import { timeParse } from 'd3-time-format';
import data from './data';

const parseDate = timeParse('%Y-%m-%d');
const parsedData = data.map(d => ({ ...d, date: parseDate(d.date) }));

export default function App() {
  return (
    <div>
      <ChartCanvas
        width={600}
        height={400}
        data={parsedData}
        seriesName="Demo"
        xAccessor={d => d.date}
        xScale={scaleTime()}
        xExtents={[parsedData[0].date, parsedData[parsedData.length - 1].date]}
      >
        <Chart id={0} yExtents={d => d.close}>
          <LineSeries yAccessor={d => d.close} />
          <XAxis />
          <YAxis />
        </Chart>
      </ChartCanvas>
    </div>
  );
}
