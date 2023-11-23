import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { useState } from 'react';
import peopleFromServer from './people.json';

const filterPeople = (people, searchQuery, sexFilter) => {
  if (!searchQuery && !sexFilter) {
    return people;
  }

  return people.filter(person => {
    const preparedSearchQuery = searchQuery.toLowerCase();
    const preparedName = person.name.toLowerCase();

    const isMatchSearchQuery = preparedSearchQuery
      ? preparedName.includes(preparedSearchQuery)
      : true;

    const isMatchSexFilter = sexFilter
      ? person.sex === sexFilter
      : true;

    return isMatchSearchQuery && isMatchSexFilter;
  });
};

const sortPeople = (people, sortBy) => {
  if (!sortBy) {
    return people;
  }

  return [...people].sort((a, b) => {
    const aField = a[sortBy];
    const bField = b[sortBy];

    if (typeof aField === 'string' && typeof bField === 'string') {
      return aField.localeCompare(bField);
    }

    if (typeof aField === 'number' && typeof bField === 'number') {
      return aField - bField;
    }

    return 0;
  });
};

const gerPeopleForRender = (people, options) => {
  const {
    searchQuery,
    sexFilter,
    sortBy,
  } = options;

  const filteredPeopele = filterPeople(people, searchQuery, sexFilter);
  const sortedpeople = sortPeople(filteredPeopele, sortBy);

  return sortedpeople;
};

export const App = () => {
  const [people, setPeople] = useState(peopleFromServer);
  const [selectedPersonSlugs, setSelectedPersonSlugs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sexFilter, setSexFilter] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const isSomeFiltersActive = searchQuery || sexFilter || sortBy;

  const toggleSelect = (slug) => {
    if (selectedPersonSlugs.includes(slug)) {
      const newSelectedSlugs = selectedPersonSlugs.filter(
        s => s !== slug,
      );

      setSelectedPersonSlugs(newSelectedSlugs);

      return;
    }

    setSelectedPersonSlugs([...selectedPersonSlugs, slug]);
  };

  const peopleForRender = gerPeopleForRender(
    people,
    { searchQuery, sexFilter, sortBy },
  );

  const clearFilters = () => {
    setSearchQuery('');
    setSexFilter(null);
    setSortBy(null);
  };

  return (
    <div className="box">
      <h1 className="title">People table</h1>

      <button
        type="button"
        disabled={!isSomeFiltersActive}
        onClick={clearFilters}
      >
        Reset filters
      </button>

      <input
        type="search"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />

      <div style={{ display: 'flex', marginTop: '16px' }}>
        <button
          style={{ marginRight: '16px' }}
          type="button"
          onClick={() => setSexFilter(null)}
          className={cn({ btnActive: !sexFilter })}
        >
          All
        </button>

        <button
          style={{ marginRight: '16px' }}
          type="button"
          onClick={() => setSexFilter('m')}
          className={cn({ btnActive: sexFilter === 'm' })}
        >
          m
        </button>

        <button
          style={{ marginRight: '16px' }}
          type="button"
          onClick={() => setSexFilter('f')}
          className={cn({ btnActive: sexFilter === 'f' })}
        >
          f
        </button>
      </div>

      <table className="table is-striped is-narrow">
        <thead>
          <tr>
            <th />
            <th
              onClick={() => setSortBy('name')}
              className={cn({ thActive: sortBy === 'name' })}
            >
              name
            </th>
            <th
              onClick={() => setSortBy('sex')}
              className={cn({ thActive: sortBy === 'sex' })}
            >
              sex
            </th>
            <th
              onClick={() => setSortBy('born')}
              className={cn({ thActive: sortBy === 'born' })}
            >
              born
            </th>
          </tr>
        </thead>

        <tbody>
          {peopleForRender.map((person) => {
            const isSelected = selectedPersonSlugs.includes(person.slug);

            return (
              <tr
                key={person.slug}
                className={cn({
                  'has-background-warning': isSelected,
                })}
              >
                <td>
                  <button
                    type="button"
                    onClick={() => toggleSelect(person.slug)}
                  >
                    {isSelected
                      ? '-'
                      : '+'}
                  </button>
                </td>
                <td>{person.name}</td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
