import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { useState } from 'react';
import peopleFromServer from './people.json';

export const App = () => {
  const [selectedPersonSlugs, setSelectedPersonSlugs] = useState([]);

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

  return (
    <div className="box">
      <h1 className="title">People table</h1>

      <table className="table is-striped is-narrow">
        <thead>
          <tr>
            <th />
            <th>name</th>
            <th>sex</th>
            <th>born</th>
          </tr>
        </thead>

        <tbody>
          {peopleFromServer.map((person) => {
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
