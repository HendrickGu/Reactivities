import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponment from "../../../app/layout/LoadingComponment";


export default observer( function Activitydashboard() {
    const {activityStore} = useStore();
    const {selectedActivity,editMode} = activityStore
    


    useEffect(() => {
     activityStore.loadActivities();
    },[activityStore])
  
  
  
    if (activityStore.loadingInitial) return <LoadingComponment content='Loading app' />
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails />}
                    {editMode&&
                <ActivityForm/>}

            </Grid.Column>
        </Grid>
    )
})