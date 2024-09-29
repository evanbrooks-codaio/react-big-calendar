import React, { Fragment, useState, useEffect, useMemo } from 'react'
import {
  Calendar,
  momentLocalizer,
  luxonLocalizer,
  Views,
} from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'
import { DateTime, Settings } from 'luxon'
import DemoLink from '../../DemoLink.component'
import TimezoneSelect from '../TimezoneSelect'

// Pick a timezone east of the browser's current state
const defaultTZ = 'America/New_York'
const defaultDateStr = '2024-09-28'

const multiWeekEvent = {
  id: 13,
  title: 'Multi-week event, Sep 10 to 24',
  // Render multiple weeks segments
  start: new Date(2024, 8, 10, 12, 0, 0),
  end: new Date(2024, 8, 24, 12, 0, 0),
}

export function MomentMultiWeek() {
  const [timezone, setTimezone] = useState(defaultTZ)

  const { defaultDate, getNow, localizer, myEvents, scrollToTime } =
    useMemo(() => {
      moment.tz.setDefault(timezone)
      return {
        defaultDate: moment(defaultDateStr, 'YYYY-MM-DD').toDate(),
        getNow: () => moment().toDate(),
        localizer: momentLocalizer(moment),
        myEvents: [multiWeekEvent],
        scrollToTime: moment().toDate(),
      }
    }, [timezone])

  useEffect(() => {
    return () => {
      moment.tz.setDefault() // reset to browser TZ on unmount
    }
  }, [])

  return (
    <Fragment>
      <DemoLink fileName="timezones">
        <TimezoneSelect
          defaultTZ={defaultTZ}
          setTimezone={setTimezone}
          timezone={timezone}
          title={`This calendar uses the 'momentLocalizer'`}
        />
      </DemoLink>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={myEvents}
          getNow={getNow}
          localizer={localizer}
          scrollToTime={scrollToTime}
        />
      </div>
    </Fragment>
  )
}

export function LuxonMultiWeek() {
  const [timezone, setTimezone] = useState(defaultTZ)

  const { defaultDate, getNow, localizer, myEvents, scrollToTime } =
    useMemo(() => {
      Settings.defaultZone = timezone
      return {
        defaultDate: DateTime.fromISO(defaultDateStr).toJSDate(),
        getNow: () => DateTime.local().toJSDate(),
        localizer: luxonLocalizer(DateTime),
        myEvents: [multiWeekEvent],
        scrollToTime: DateTime.local().toJSDate(),
      }
    }, [timezone])

  useEffect(() => {
    return () => {
      Settings.defaultZone = defaultTZ // reset to browser TZ on unmount
    }
  }, [])

  return (
    <Fragment>
      <DemoLink fileName="luxon">
        <TimezoneSelect
          defaultTZ={defaultTZ}
          setTimezone={setTimezone}
          timezone={timezone}
          title={`This calendar uses the 'luxonLocalizer'`}
        />
      </DemoLink>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={myEvents}
          getNow={getNow}
          localizer={localizer}
          scrollToTime={scrollToTime}
        />
      </div>
    </Fragment>
  )
}
