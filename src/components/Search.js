import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('art');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term,
        },
      });

      setResults(data.query.search);
    };

    if (term && !results.length){
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500);
  
      return () => {
        clearTimeout(timeoutId);
      };  
    }

  }, [term]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="btn btn-primary float-right"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div className= ".container-fluid">
      <div >
        <div className="form-row justify-content-center">
          <h1>Enter Search Term</h1>
        </div>
        <div className= "form-row justify-content-center">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="ui icon input"
            />
            <i className="search icon"></i>
          </div>
      </div>
      <ul className="ui celled list">{renderedResults}</ul>
    </div>
  );
};

export default Search;
