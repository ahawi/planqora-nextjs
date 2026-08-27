import { ChevronDownIcon } from '@heroicons/react/24/outline'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { TaskActivityDay } from '@/src/entities/task'
import { Card } from '@/src/shared/ui'

interface ActivityCardProps {
  activity: TaskActivityDay[]
}

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  return (
    <Card className="border-0 bg-surface-muted p-[26px] [@media(max-height:950px)]:p-5 max-[860px]:p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Активность</h2>

        <span className="flex items-center gap-2 text-xs font-bold text-secondary-400">
          Эта неделя
          <ChevronDownIcon aria-hidden="true" className="size-4 stroke-[2.5]" />
        </span>
      </div>

      <div className="mt-[22px] h-[150px] overflow-hidden rounded-[14px] bg-primary-0 px-2 pt-2 [@media(max-height:950px)]:mt-3 [@media(max-height:950px)]:h-[120px] max-[860px]:mt-4 max-[860px]:h-[130px]">
        <ResponsiveContainer height="100%" width="100%">
          <LineChart
            accessibilityLayer
            data={activity}
            margin={{
              top: 8,
              right: 14,
              bottom: 2,
              left: 0,
            }}
          >
            <CartesianGrid
              horizontal={false}
              stroke="var(--border-default)"
              strokeWidth={1}
            />

            <XAxis
              axisLine={false}
              dataKey="label"
              tick={{
                fill: 'var(--secondary-500)',
                fontSize: 11,
                fontWeight: 500,
              }}
              tickLine={false}
              tickMargin={7}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              domain={[0, (dataMax: number) => Math.max(dataMax, 3)]}
              tick={{
                fill: 'var(--secondary-500)',
                fontSize: 11,
              }}
              tickFormatter={(value: number) =>
                value === 0 ? '' : String(value)
              }
              tickLine={false}
              tickMargin={8}
              width={24}
            />

            <Tooltip
              contentStyle={{
                border: 0,
                borderRadius: '10px',
                background: 'var(--secondary-500)',
                boxShadow: '0 12px 24px rgb(20 21 34 / 18%)',
                color: 'var(--primary-0)',
                fontSize: '12px',
                padding: '8px 12px',
              }}
              cursor={{
                stroke: 'var(--border-default)',
              }}
              itemStyle={{
                color: 'var(--primary-0)',
                padding: 0,
              }}
              labelStyle={{
                display: 'none',
              }}
            />

            <Line
              activeDot={{
                fill: 'var(--primary-0)',
                r: 6,
                stroke: 'var(--primary-500)',
                strokeWidth: 5,
              }}
              dataKey="created"
              dot={false}
              name="Создано"
              stroke="var(--secondary-500)"
              strokeLinecap="round"
              strokeWidth={4}
              type="monotone"
            />

            <Line
              activeDot={{
                fill: 'var(--primary-0)',
                r: 6,
                stroke: 'var(--secondary-200)',
                strokeWidth: 5,
              }}
              dataKey="completed"
              dot={false}
              name="Завершено"
              stroke="var(--secondary-100)"
              strokeLinecap="round"
              strokeWidth={4}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
