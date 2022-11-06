import { NextApiRequest, NextApiResponse } from 'next'
import academicCalendar from 'src/nus/academicCalendar'
import { AcadWeekInfo } from 'src/nus/types'

const type2Str = (t: AcadWeekInfo['type']): string =>
  t === null || t === 'Instructional' ? '' : t

const num2Str = (t: AcadWeekInfo['num']): string => (t === null ? '' : `${t}`)

const sem2Str = (t: AcadWeekInfo['sem']): string =>
  t === null ? '' : t.replace(/Semester /, 'S')

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const week = academicCalendar.getAcadWeekInfo(new Date())

  const c = {
    sem: sem2Str(week.sem),
    num: num2Str(week.num),
    type: type2Str(week.type),
  }

  const display = `${c.sem}   ${c.type} Week ${c.num}`

  res.status(200).send(display)
}
