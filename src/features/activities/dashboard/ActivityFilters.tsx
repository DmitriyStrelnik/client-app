import React, { Fragment, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { Menu, Header, Search, Select } from 'semantic-ui-react';
import { Calendar } from 'react-widgets';

import agent from '../../../app/api/agent';
import { history } from '../../..';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { category } from '../../../app/common/options/categoryOptions';

const ActivityFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.activityStore;

  const [value, setValue] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    setResults([]);
    const delayDebounceFn = setTimeout(async () => {
      if (value !== '') {
        console.log(value);
        setIsLoading(true);
        const params = new URLSearchParams();
        params.append('name', value);
        const { activities } = await agent.Activities.list(params);
        setIsLoading(false);
        setResults(activities);
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [value]);

  const onChange = (e: any, data: any) => {
    if (value !== data.value) {
      setValue(data.value);
    }
  };

  return (
    <Fragment>
      <Menu vertical size={'large'} style={{ width: '100%', marginTop: 50 }}>
        <Header icon={'filter'} attached color={'teal'} content={'Filters'} />
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate('all', 'true')}
          color={'blue'}
          name={'all'}
          content={'All Activities'}
        />
        <Menu.Item
          active={predicate.has('isGoing')}
          onClick={() => setPredicate('isGoing', 'true')}
          color={'blue'}
          name={'username'}
          content={"I'm Going"}
        />
        <Menu.Item
          active={predicate.has('isHost')}
          onClick={() => setPredicate('isHost', 'true')}
          color={'blue'}
          name={'host'}
          content={"I'm hosting"}
        />
      </Menu>
      <Header
        icon={'calendar'}
        attached
        color={'teal'}
        content={'Select Date'}
      />
      <Calendar
        onChange={(date) => setPredicate('startDate', date!)}
        value={predicate.get('startDate') || new Date()}
      />
      <Select
        value={predicate.get(category)}
        onChange={(e, data) => setPredicate('category', data.value)}
        placeholder='Choose category'
        options={category}
        className='selectCategory'
      />
      <Search
        loading={isLoading}
        noResultsMessage={isLoading ? 'Loading...' : 'No results found.'}
        onResultSelect={(e, data) =>
          history.push(`/activities/${data.result.id}`)
        }
        onSearchChange={onChange}
        results={results}
        value={value}
        fluid
        className='searchActivity'
      />
    </Fragment>
  );
};

export default observer(ActivityFilters);
