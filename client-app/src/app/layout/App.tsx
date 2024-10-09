import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import Activitydashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';


function App() {
  const [activities, setActivities] =useState<Activity[]>([]);
  const [selectedActivity,setSelectActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response =>{
        console.log(response)
        setActivities(response.data)
      })
  },[])

  function handleSelectedActivitiy(id:string) {
    setSelectActivity(activities.find(x=> x.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id? handleSelectedActivitiy(id) : handleCancelSelectedActivity();
    setEditMode(true);
  } 

  function handleFormClose() {
    setEditMode(false);
  }

  function handleDCreateOrEditActivity(activity:Activity) {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id),activity])
    : setActivities([...activities,{...activity,id:uuid()}]);
    setEditMode(false);
    setSelectActivity(activity);
  }
  
  function handleDeleteActivity(id:string) {
    setActivities([...activities.filter(x => x.id!==id)])
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <Activitydashboard 
        activities={activities}
        selectedActivity = {selectedActivity}
        selectActivity={handleSelectedActivitiy}
        cancelSelectedActivity={handleCancelSelectedActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleDCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        />
      </Container>
      
    </Fragment>
    
  )
}

export default App
