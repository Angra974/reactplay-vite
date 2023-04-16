import {  useEffect } from 'react';
import useContributors from 'common/hooks/useContributors';
import useFetch from 'common/hooks/useFetch';

const Contributors = ({sorted = false}) => {
  let { data, error, isLoading } = useFetch(
          `${process.env.REACT_APP_PLAY_API_URL}/react-play/contributors`
        )

  if(data) {
    data  = data.filter((contributor) => contributor.type !== 'Bot');
    if(sorted) {
      data = data.sort((a, b) => b.contributions - a.contributions)
    }
  }

  return (
    <>
      <h2 className="title-primary">
        <strong>
          <span>Big Thanks</span>
        </strong>
        <br /> to All Contributors!
      </h2>
      <ul className="list-contributors">
        {data &&
          data.map((contributor) => (
            <li
              className="contributor"
              data-testid={`contributor-${contributor.id}`}
              key={contributor.id}
            >
              <a
                className="contributor-anchor"
                href={contributor.html_url}
                rel="noopener noreferrer"
                target="_blank"
                title={`${contributor.login}(${contributor.contributions} contributions)`}
              >
                <img
                  alt={contributor.login}
                  className="contributor-thumb"
                  loading="lazy"
                  src={contributor.avatar_url}
                />
              </a>
            </li>
          ))}

      </ul>
    </>
  );
};

export default Contributors;
