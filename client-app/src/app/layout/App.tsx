import { Fragment, useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import Activitydashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponment from './LoadingComponment';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const {activityStore} = useStore();

  const [activities, setActivities] =useState<Activity[]>([]);
  const [selectedActivity,setSelectActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false);
  const [submitting,setSubmitting] =useState(false);

  useEffect(() => {
   activityStore.loadActivities();
  },[activityStore])

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

  if (activityStore.loadingInitial) return <LoadingComponment content='Loading app' />
  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <Activitydashboard 
        activities={activityStore.activities}
        createOrEdit={handleDCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        submitting={submitting}
        />
      </Container>
      
    </Fragment>
    
  )
}

export default observer(App)
