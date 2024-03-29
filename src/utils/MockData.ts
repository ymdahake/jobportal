import { Data } from "../models/Job";

const d = new Date();
const newDate=d.setDate(d.getDate()-30);

export const jobsData :Data[] =[
    {jobId:'1',
    title:'Date Executive Assistant To CEO (8-10 yrs)-1',
    company:'TCS',
    description:'Date Executive Assistant To CEO (8-10 yrs)-1',
    location:'Chennai',
    remote:'Yes',
    level:'Expert',
    hrEmail:'abc@gmail.com',
    dateOfPosting :d.toDateString(),
    postedBy:'Agency' },

    {jobId:'2',
    title:'Yulu - Financial Planning & Analysis Role (7-14 yrs)',
    company:'TCS',
    description:'Yulu - Financial Planning & Analysis Role (7-14 yrs)',
    location:'Hydrabad',
    remote:'Yes',
    level:'Fresher',
    hrEmail:'ravi@gmail.com',
    dateOfPosting : new Date().toDateString(),
    postedBy:'Business POC'

},

    {jobId:'3',
    title:'Yulu - Financial Planning & Analysis Role (7-14 yrs)',
    company:'TCS',
    description:'Yulu - Financial Planning & Analysis Role (7-14 yrs)',
    location:'Mumbai',
    remote:'Yes',
    level:'Fresher',
    hrEmail:'ganesh@gmail.com',
    dateOfPosting : new Date().toDateString(),
    postedBy:'Agency'},

    {jobId:'4',
    title:'Manager - Finance - FMCG/FMCD/Retail (5-7 yrs)',
    company:'TCS',
    description:'Manager - Finance - FMCG/FMCD/Retail (5-7 yrs)',
    location:'Chennai',
    remote:'Yes',
    level:'Fresher',
    hrEmail:'ramesh@gmail.com',
    dateOfPosting : new Date().toDateString(),
    postedBy:'Company HR'},

    {jobId:'5',
    title:'Manager - Financial Planning & Analysis (4-9 yrs)',
    company:'TCS',
    description:'Manager - Financial Planning & Analysis (4-9 yrs)',
    location:'Banglore',
    remote:'Yes',
    level:'Fresher',
    hrEmail:'gaesh@gmail.com',
    dateOfPosting : new Date().toDateString(),
    postedBy:'Agency'},

    {jobId:'6',
    title:'Financial Planning Analyst - BFS (2-4 yrs)',
    company:'TCS',
    description:'Manager - Financial Planning & Analysis (4-9 yrs)',
    location:'Banglore',
    remote:'Yes',
    level:'Fresher',
    hrEmail:'gaesh@gmail.com',
    dateOfPosting : new Date().toDateString(),
    postedBy:'Company HR'},

    {jobId:'7',
    title:'Chalo - Manager - Financial Planning & Analysis (3-5 yrs)',
    company:'TCS',
    description:'Manager - Financial Planning & Analysis (4-9 yrs)',
    location:'Banglore',
    remote:'Yes',
    level:'Fresher',
    hrEmail:'gaesh@gmail.com',
    dateOfPosting : new Date().toDateString(),
    postedBy:'Agency'},

    {jobId:'8',
    title:'Train Executive Assistant To CEO (8-10 yrs)-1',
    company:'TCS',
    description:'Manager - Financial Planning & Analysis (4-9 yrs)',
    location:'Banglore',
    remote:'Yes',
    level:'Fresher',
    hrEmail:'gaesh@gmail.com',
    dateOfPosting : new Date().toDateString(),
    postedBy:'Agency'},

    {jobId:'9',
    title:'Honda company Credit - Business Planning Role (3-10 yrs)',
    company:'Honda',
    description:'Senior - Financial Planning & Analysis (4-9 yrs)',
    location:'Banglore',
    remote:'Yes',
    level:'Fresher',
    hrEmail:'gaesh@gmail.com',
    dateOfPosting : new Date().toDateString(),
    postedBy:'Agency'},

    {jobId:'10',
    title:'Senior director - Financial Planning & Analysis (4-9 yrs)',
    company:'Axis',
    description:'Manager - Financial Planning & Analysis (4-9 yrs)',
    location:'Banglore',
    remote:'Yes',
    level:'Fresher',
    hrEmail:'gaesh@gmail.com',
    dateOfPosting : new Date().toDateString(),
    postedBy:'Agency'},

    {jobId:'11',
    title:'CEO - Financial Planning & Analysis (4-9 yrs)',
    company:'TCS',
    description:'CEO  - Financial Planning & Analysis (4-9 yrs)',
    location:'Banglore',
    remote:'Yes',
    level:'Fresher',
    hrEmail:'gaesh@gmail.com',
    dateOfPosting : new Date().toDateString(),
    postedBy:'Agency'},

    {jobId:'12',
    title:'Assistant Manager - Financial Planning & Analysis (4-9 yrs)',
    company:'TCS',
    description:'Assistant Manager - Financial Planning & Analysis (4-9 yrs)',
    location:'Banglore',
    remote:'Yes',
    level:'Fresher',
    hrEmail:'gaesh@gmail.com',
    dateOfPosting : new Date().toDateString(),
    postedBy:'Agency'},

    {jobId:'13',
    title:'Supporting maanger - Financial Planning & Analysis (4-9 yrs)',
    company:'TCS',
    description:'Manager - Financial Planning & Analysis (4-9 yrs)',
    location:'Banglore',
    remote:'Yes',
    level:'Fresher',
    hrEmail:'gaesh@gmail.com',
    dateOfPosting : new Date().toDateString(),
    postedBy:'Agency'},
    
     
]