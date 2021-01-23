import teaching from '../../img/host.svg'
import review from '../../img/review.svg'
import student from '../../img/student.svg'

export const homeObjOne = {
    id: 'about',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Premium Platform',
    headLine: 'Sharing an experience',
    desc: 'Chivit gu mee tae ngern mee tae tong mee tae hee',
    buttonLabel: 'Get Started',
    imgStart: false,
    img: teaching,
    alt: 'car',
    dark:true,
    primary: true,
    darkText: true
}

export const homeObjTwo = {
    id: 'host',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Get Your Live Feedback',
    headLine: 'Hosting Events',
    desc: 'Chivit gu mee tae ngern mee tae tong mee tae hee, gu handsome sus2 kuy22222',
    buttonLabel: 'Host Event Now',
    imgStart: true,
    img: review,
    alt: 'car',
    dark:true,
    primary: true,
    darkText: false
}

export const homeObjThree = {
    id: 'attendee',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Response to the Quality of the Event',
    headLine: 'Participating Events',
    desc: 'Send a Live feedback to the event host to improve your quality of learning',
    buttonLabel: 'Join Event',
    imgStart: false,
    img: student,
    alt: 'car',
    dark:true,
    primary: true,
    darkText: true
}