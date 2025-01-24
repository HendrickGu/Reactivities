import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListitem from "./ActivityListitem";
import { Fragment } from "react/jsx-runtime";

export default observer (function ActivityList() {
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore;

    return (
        <>
            {groupedActivities.map(([group,activities]) => (
                <Fragment>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {activities.map((activity) => (
                                <ActivityListitem key={activity.id} activity={activity} />
                            ))}               
                </Fragment>
            ))}
        </>
            
    )
})