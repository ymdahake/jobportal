import { User } from 'firebase/auth';
import { addDoc, doc, getDoc ,collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/Firebase.utils';
import { Data } from './../models/Job';

export const GetUserDetail = async (userAuth: User )=>{

  const docRef = doc(db, "users", userAuth.uid);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("User is exists already:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such  User document!");
  }
}

export const IsUserExistsInDB = async (userAuth: User |null )=>{
  console.log("IsUserExistsInDB called ")
  if(userAuth ==null)
  {
    return false;
  }
  const docRef = doc(db, "users", userAuth.uid);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("User exist in db")
    return true
  } else {
    console.log("User not exist in db")
     return false
  }
}



export const GetJobData = async (id :string)=>{

    const docRef = doc(db, "Jobs", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
}


export const GetAllJobData  = async ()  =>{

    const querySnapshot = await getDocs(collection(db, "Jobs"));
    const jobsData : Data[]=[];
    querySnapshot.forEach((doc) => {
        let job ={} as Data;
        job.jobId =doc.id;
        job.company=doc.data()['company'];
        job.dateOfPosting=doc.data()['dateOfPosting'];
        job.location=doc.data()['location'];
        job.description=doc.data()['description'];
        job.hrEmail=doc.data()['hrEmail'];
        job.level=doc.data()['level'];
        job.remote=doc.data()['remote'];
        job.title=doc.data()['title'];
        job.postedBy=doc.data()['postedBy'];
        jobsData.push(job);
      // doc.data() is never undefined for query doc snapshots
      
    });

    console.log("All jobs data ",jobsData)
    return jobsData;
}

export const SetJobsData =async (jobsData : Data[])=>{

    jobsData.map(async (item)=>{

        let docRef = await addDoc(collection(db, "Jobs"), {
            title: item.title,
            company: item.company,
            description: item.description,
            location: item.location,
            remote: item.remote,
            level: item.level,
            hrEmail: item.hrEmail,
            dateOfPosting :item.dateOfPosting,
            postedBy :item.postedBy
          });
          console.log("Document written with ID: ", docRef.id);
    })




}

export const GetJobsDataFromAWS=async()=>{
  const jobsData : Data[]=[];
  console.log("GetJobsDataFromAWS")
  await fetch("http://ec2-3-87-32-117.compute-1.amazonaws.com:8080/getAllJobPost?page=1&size=1000")
  .then(res=>res.json())
  .then((json)=>{
    jobsData.push(...json);
    console.log("GetJobsDataFromAWS : ",json);
    console.log("GetJobsDataFromAWS-jobsData : ",jobsData);
    
  })
  return jobsData;
}


