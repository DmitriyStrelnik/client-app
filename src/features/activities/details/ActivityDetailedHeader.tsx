import React, { useContext } from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { RootStoreContext } from '../../../app/stores/rootStore';

const activityImageStyle = {
  filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  const host = activity.attendees.filter(x => x.isHost)[0];
  const rootStore = useContext(RootStoreContext);
  const { attendActivity, deleteActivity, cancelAttendance, loading, target, submitting } = rootStore.activityStore;

  let buttonBlock = (
    <Button loading={loading} onClick={attendActivity} color='teal'>
      Join Activity
    </Button>
  );

  if (activity.isHost) {
    buttonBlock = (
    <>
      <Button
        as={Link}
        to={`/manage/${activity.id}`}
        color='orange'
        floated='right'
      >
      Manage Event
      </Button>
      <Button
        name={activity.id}
        loading={target === activity.id && submitting}
        onClick={e => deleteActivity(e, activity.id)}
        color='red'
        floated='left'
        content='Delete'
      />
    </>
  )}
  else if (activity.isAdmin) {
    buttonBlock = (
    <>      
      {activity.isGoing
        ? <Button loading={loading} onClick={cancelAttendance}>
          Cancel attendance
        </Button>
        : <Button loading={loading} onClick={attendActivity} color='teal'>
          Join Activity
        </Button>
      }
      <Button
        name={activity.id}
        loading={target === activity.id && submitting}
        onClick={e => deleteActivity(e, activity.id)}
        color='red'
        floated='left'
        content='Delete'
      />
    </>
  )}
  else if (activity.isGoing) {          
    buttonBlock = (
    <Button loading={loading} onClick={cancelAttendance}>
      Cancel attendance
    </Button>
  )}

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{format(activity.date, 'eeee do MMMM')}</p>
                <p>
                  Hosted by{' '}
                  <Link to={`/profile/${host.username}`}>
                    <strong>{host.displayName}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
      {buttonBlock}
        {/* { activity.isHost ? (
          <>
           <Button
            as={Link}
            to={`/manage/${activity.id}`}
            color='orange'
            floated='right'
          >
            Manage Event
          </Button>     
          <Button
            name={activity.id}
            loading={target === activity.id && submitting}
            onClick={e => deleteActivity(e, activity.id)}
            color='red'
            floated='left'
            content='Delete'
          />          
          </> 
        )
         : activity.isGoing ? (           
          <Button loading={loading} onClick={cancelAttendance}>
            Cancel attendance
          </Button>
        )  : (
          <Button loading={loading} onClick={attendActivity} color='teal'>
            Join Activity
          </Button>
        )} */}
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailedHeader);
