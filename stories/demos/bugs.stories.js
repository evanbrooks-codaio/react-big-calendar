import React from 'react'
import { Calendar } from '../../src'
import { LuxonMultiWeek, MomentMultiWeek } from './exampleCode/multiWeekBug'

export default {
  title: 'Bugs',
  component: Calendar,
  parameters: {
    docs: {
      page: null,
    },
  },
}

export function MultiWeekTimezoneBugLuxon() {
  return <LuxonMultiWeek />
}

export function MultiWeekTimezoneBugMoment() {
  return <MomentMultiWeek />
}
