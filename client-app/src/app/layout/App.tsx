import { Fragment, useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import Activitydashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponment from './LoadingComponment';


function App() {
  const [activities, setActivities] =useState<Activity[]>([]);
  const [selectedActivity,setSelectActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false);
  const [loading,setLoading] = useState(true);
  const [submitting,setSubmitting] =useState(false);

  useEffect(() => {
      agent.Activities.list()
      .then(response =>{
        let activities: Activity[] =[];
        response.forEach(activity=>{
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        })
        setActivities(activities);
        setLoading(false);
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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x => x.id !== activity.id),activity])
        setSelectActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities,activity])
        setSelectActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }
  
  function handleDeleteActivity(id:string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{setActivities([...activities.filter(x => x.id!==id)]);
    setSubmitting(false)
    ;})
  }

  if (loading) return <LoadingComponment content='Loading app' />
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
        submitting={submitting}
        />
      </Container>
      
    </Fragment>
    
  )
}

export default App
