import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Loader } from 'semantic-ui-react';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';


const ActivityDashboard = () => {

        const { activityStore } = useStore()
        const {loadActivities, activityRegistry, setPagingParams, pagination} = activityStore;
        const [loadingNext, setLoadingNext] = useState(false);

        function handleGetNext() {
            setLoadingNext(true);
            //console.log("totalpages:" + pagination?.totalPages + " titalItems:" + pagination?.totalItems + " currentPage:" + pagination?.currentPage)
            setPagingParams(new PagingParams(pagination!.currentPage + 1))
            loadActivities().then(() => setLoadingNext(false));
        }

        // Use Effect whit axios get of api data. Whit the useEffect we get it one time
        // insted of a infinitive loop from only the state hook.
        // Via the interface we can set the type to Activity[] array.
        useEffect(() => {
          if (activityRegistry.size <= 1) loadActivities();
        }, [activityRegistry.size, loadActivities])
      
        // We check if we are loading before going to the jsx content.
        //InfiniteScroll hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
        
        return (
            <Grid>
                <Grid.Column width='10' >
                    {activityStore.loadingInitial && !loadingNext ? (
                        <Fragment>
                            <ActivityListItemPlaceholder />
                            <ActivityListItemPlaceholder />
                        </Fragment>
                        ) : (
                         <InfiniteScroll
                            pageStart={0}
                            loadMore={handleGetNext}
                            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalItems -2}
                            initialLoad={false}
                        >
                            <ActivityList />
                        </InfiniteScroll>
                        )}
                </Grid.Column>
                <Grid.Column width='6'>
                    <ActivityFilters />
                </Grid.Column>
                <Grid.Column
                    width='10'>
                        <Loader active={loadingNext}/>

                </Grid.Column>
            </Grid>
    )
}

export default observer(ActivityDashboard)
